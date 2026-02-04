import { signAccessToken } from "@/auth/jwt";
import type { BunRequest } from "bun";
import { Database } from "bun:sqlite";
import type { User } from "@/types";

class UserController {

    private db;
    
    constructor() {
        // Initialize database connection or any other setup here
        this.db = new Database("./src/database/database.sqlite");
    }

    index(): Response {
        const users = this.db.query("select * from users").all();
        return Response.json({message: "User index", users});
    }

    getUser(req: BunRequest): Response {
        const userId = req.params.id;
        // Logic to retrieve user by userId
        return Response.json({message: `User data for user with ID: ${userId}`});
    }

    loginUser = async (req: Request): Promise<Response> => {
        const { email, password } = await req.json();

        const user: User | null = this.db
        .prepare("SELECT * FROM users WHERE email = ? LIMIT 1")
        .get(email) as User | null;

        if (!user || !await Bun.password.verify(password, user.password)) {
            return Response.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = await signAccessToken({
            sub: user.id.toString(),
            email: user.email,
        });

        return Response.json({
            access_token: token,
            token_type: "Bearer",
        });
    }

    createUser = async (req: Request): Promise<Response> => {
        // Logic to create a new user
        const user = await req.json();

        if(user.password !== user.confirmPassword) {
            return Response.json({message: "Passwords do not match"}, {status: 400});
        }

        const hashedPassword = await Bun.password.hash(user.password, {
            algorithm: "bcrypt",
            cost: 4, // number between 4-31
        });

        this.db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
                .run(
                    user.name, 
                    user.email,
                    hashedPassword
                );
        
        return Response.json({message: "User created successfully", registerSuccess: true});
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

export const userController = new UserController();