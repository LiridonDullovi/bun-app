import type { BunRequest } from "bun";

class PostController {
    index(): Response {
        // return a list of posts (as an example)
        const posts = [
            {id: 1, title: "First Post", description: "This is the first post", author: "Author A", duration: "5 min read"},
            {id: 2, title: "Second Post", description: "This is the second post", author: "Author B", duration: "3 min read"},
            {id: 3, title: "Third Post", description: "This is the third post", author: "Author C", duration: "7 min read"},
        ]
        return Response.json({message: "Post index", posts});
    }

    getPost(req: BunRequest): Response {
        const postId = req.params.id;
        // return a single post by id (as an example)
        const post = {
            id: postId,
            title: `Post ${postId}`,
            description: `This is the description for post ${postId}`,
            author: `Author ${postId}`,
            duration: `${Math.floor(Math.random() * 10) + 1} min read`
        }
        return Response.json({message: `Post data for post with ID: ${postId}`, post});
    }

    async createPost(req: BunRequest): Promise<Response> {
        // Logic to create a new post
        const post = await req.json();

        return Response.json({message: "Post created successfully", post});
    }

    async updatePost(req: BunRequest): Promise<Response> {
        const postId = req.params.id;
        const updatedData = await req.json();
        // Logic to update post by postId
        return Response.json({message: `Post with ID: ${postId} updated successfully`, post: updatedData});
    }

    deletePost(req: BunRequest): Response {
        const postId = req.params.id;
        // Logic to delete post by postId
        return Response.json({message: `Post with ID: ${postId} deleted successfully`, postId});
    }
}

export { PostController };