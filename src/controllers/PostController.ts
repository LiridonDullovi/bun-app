import type { BunRequest } from "bun";
import { Database } from "bun:sqlite";

class PostController {
    private db: Database;
    
    constructor() {
        this.db = new Database("./src/database/database.sqlite");
    }
    
    index = (): Response => {
        // return a list of posts from the database
        const posts = this.db.query("select * from posts").all();
        
        return Response.json({message: "Post index", posts});
    }

    getPost = (req: BunRequest): Response => {
        const postId = req.params.id as string;
        // return a single post by id from the database
        const post = this.db.query("select * from posts where id = ? LIMIT 1").get(postId);

        return Response.json({message: `Post data for post with ID: ${postId}`, post});
    }

    createPost = async (req: BunRequest): Promise<Response> => {
        // Logic to create a new post and store it in the database
        const post = await req.json();

        this.db.query("INSERT INTO posts (title, description, author, duration) VALUES (?, ?, ?, ?)")
                .run(
                    post.title, 
                    post.description,
                    post.author,
                    post.duration
                );
        return Response.json({message: "Post created successfully", post});
    }

    updatePost = async (req: BunRequest): Promise<Response> => {
        // Logic to update post by id in the database
        const postId = req.params.id;
        const updatedData = await req.json();

        this.db.query("UPDATE posts SET title = ?, description = ?, author = ?, duration = ? WHERE id = ?")
                .run(
                    updatedData.title,
                    updatedData.description,
                    updatedData.author,
                    updatedData.duration,
                    postId
                );

        return Response.json({message: `Post with ID: ${postId} updated successfully`, post: updatedData});
    }

    deletePost = (req: BunRequest): Response => {
        // Logic to delete post by postId in the database
        const postId = req.params.id as string;
        
        this.db.query("DELETE FROM posts WHERE id = ?").run(postId);

        return Response.json({message: `Post with ID: ${postId} deleted successfully`, postId});
    }
}

export const postController = new PostController();