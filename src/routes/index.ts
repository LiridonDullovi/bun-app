import index from "../index.html";
import { UserController } from "../controllers/UserController";
import { PostController } from "@/controllers/PostController";
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
        GET: (new UserController()).index,
    },
    "/api/users/:id": {
        GET: (new UserController()).getUser,
        POST: (new UserController()).createUser,
        PUT: (new UserController()).updateUser,
        DELETE: (new UserController()).deleteUser,
    },
    "/api/posts": {
        GET: (new PostController()).index,
    },
    "/api/posts/:id": {
        GET: (new PostController()).getPost,
        POST: (new PostController()).createPost,
        PUT: (new PostController()).updatePost,
        DELETE: (new PostController()).deletePost,
    },
    "/*": index,
};