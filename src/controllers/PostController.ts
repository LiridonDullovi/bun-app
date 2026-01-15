import type { BunRequest } from "bun";

class PostController {
    index(): Response {
        const posts = [
            {id: 1, title: "First Post"},
            {id: 2, title: "Second Post"},
            {id: 3, title: "Third Post"},
        ]
        return Response.json({message: "Post index", posts});
    }

    getPost(req: BunRequest): Response {
        const postId = req.params.id;
        // Logic to retrieve post by postId
        return Response.json({message: `Post data for post with ID: ${postId}`});
    }

    createPost(req: Request): Response {
        // Logic to create a new post
        return Response.json({message: "Post created successfully"});
    }

    updatePost(req: BunRequest): Response {
        const postId = req.params.id;
        // Logic to update post by postId
        return Response.json({message: `Post with ID: ${postId} updated successfully`});
    }

    deletePost(req: BunRequest): Response {
        const postId = req.params.id;
        // Logic to delete post by postId
        return Response.json({message: `Post with ID: ${postId} deleted successfully`});
    }
}

export { PostController };