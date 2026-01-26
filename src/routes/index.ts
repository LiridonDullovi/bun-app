import index from "../index.html";
import { userController } from "@/controllers/UserController";
import { postController } from "@/controllers/PostController";
import type { BunRequest } from "bun";

export const routes = {
    "/api/hello": {
        async GET() {
            return Response.json({
                message: "Hello, world!",
                method: "GET",
            });
        },
        async PUT() {
            return Response.json({
                message: "Hello, world!",
                method: "PUT",
            });
        },
    },
    "/api/hello/:name": async (req: BunRequest) => {
        const name = req.params.name;
        return Response.json({
            message: `Hello, ${name}!`,
        });
    },
    "/api/users": {
        GET: userController.index,
    },
    "/api/users/:id": {
        GET: userController.getUser,
        POST: userController.createUser,
        PUT: userController.updateUser,
        DELETE: userController.deleteUser,
    },
    "/api/posts": {
        GET: postController.index,
    },
    "/api/posts/:id": {
        GET: postController.getPost,
        POST: postController.createPost,
        PUT: postController.updatePost,
        DELETE: postController.deletePost,
    },
    "/*": index,
};