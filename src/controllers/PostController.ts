import type { BunRequest } from "bun";
import { Database } from "bun:sqlite";
import type { Post, User } from "@/types";
import { verifyAccessToken } from "@/auth/jwt";

class PostController {
    private db: Database;
    
    constructor() {
        this.db = new Database("./src/database/database.sqlite");
    }
    
    index = (): Response => {
        // return a list of posts from the database
        const posts: Post[] | null = this.db.query("select posts.*, users.name as author_name, users.email as author_email from posts join users on posts.author = users.id").all() as Post[] | null;
        
        return Response.json({message: "Post index", posts});
    }

    getPost = async (req: BunRequest): Promise<Response> => {
        const postId = req.params.id as string;
        // return a single post by id from the database
        const token = req.headers.get("Authorization")?.split(" ")[1];

        const user = token ? await verifyAccessToken(token) : null;
        const post: Post | null = this.db.query("select * from posts where id = ? LIMIT 1").get(postId) as Post | null;

        if(!post){
            return Response.json({message: "Post not found"}, {status: 404});
        } else if(user && user.sub != post.author){
            return Response.json({message: "Unauthorized"}, {status: 401});
        }

        return Response.json({message: `Post data for post with ID: ${postId}`, post});
    }

    createPost = async (req: BunRequest): Promise<Response> => {
        // Logic to create a new post and store it in the database
        const post = await req.json();

        const token = req.headers.get("Authorization")?.split(" ")[1];

        const user = token ? await verifyAccessToken(token) : null;

        if(user){
            this.db.query("INSERT INTO posts (title, description, author, duration) VALUES (?, ?, ?, ?)")
                .run(
                    post.title, 
                    post.description,
                    user.sub,
                    post.duration
                );
        }else {
            return Response.json({message: "Unauthorized"}, {status: 401});
        }

        return Response.json({message: "Post created successfully", post}, {status: 201});
    }

    updatePost = async (req: BunRequest): Promise<Response> => {
        // Logic to update post by id in the database
        const postId = req.params.id as string;
        const updatedData = await req.json();

        const token = req.headers.get("Authorization")?.split(" ")[1];

        const user = token ? await verifyAccessToken(token) : null;

        const post: Post | null = this.db.query("select * from posts where id = ? LIMIT 1").get(postId) as Post | null;

        if(user && user.sub == post?.author){
            this.db.query("UPDATE posts SET title = ?, description = ?, author = ?, duration = ? WHERE id = ?")
                .run(
                    updatedData.title,
                    updatedData.description,
                    updatedData.author,
                    updatedData.duration,
                    postId
                );
        } else {
            return Response.json({message: "Unauthorized"}, {status: 401});
        }

        return Response.json({message: `Post with ID: ${postId} updated successfully`, post: updatedData});
    }

    deletePost = async (req: BunRequest): Promise<Response> => {
        // Logic to delete post by postId in the database
        const postId = req.params.id as string;
        const token = req.headers.get("Authorization")?.split(" ")[1];
        const user = token ? await verifyAccessToken(token) : null;

        const post: Post | null = this.db.query("select * from posts where id = ? LIMIT 1").get(postId) as Post | null;

        if(!user || user.sub != post?.author){
            return Response.json({message: "Unauthorized"}, {status: 401});
        }
        
        this.db.query("DELETE FROM posts WHERE id = ?").run(postId);

        return Response.json({message: `Post with ID: ${postId} deleted successfully`, postId});
    }
}

export const postController = new PostController();