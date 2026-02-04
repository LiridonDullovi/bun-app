import { verifyAccessToken } from "@/auth/jwt";

export async function authGuard(req: Request) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        return await verifyAccessToken(token);
    } catch {
        return null;
    }
}