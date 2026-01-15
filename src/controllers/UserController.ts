import type { BunRequest } from "bun";

class UserController {
    index(): Response {
        const users = [
            {id: 1, name: "Alice"},
            {id: 2, name: "Bob"},
            {id: 3, name: "Charlie"},
        ]
        return Response.json({message: "User index", users});
    }

    getUser(req: BunRequest): Response {
        const userId = req.params.id;
        // Logic to retrieve user by userId
        return Response.json({message: `User data for user with ID: ${userId}`});
    }

    createUser(req: Request): Response {
        // Logic to create a new user
        return Response.json({message: "User created successfully"});
    }

    updateUser(req: BunRequest): Response {
        const userId = req.params.id;
        // Logic to update user by userId
        return Response.json({message: `User with ID: ${userId} updated successfully`});
    }

    deleteUser(req: BunRequest): Response {
        const userId = req.params.id;
        // Logic to delete user by userId
        return Response.json({message: `User with ID: ${userId} deleted successfully`});
    }
}

export { UserController };