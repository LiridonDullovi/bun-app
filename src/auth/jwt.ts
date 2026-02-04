import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(Bun.env.JWT_SECRET);

export async function signAccessToken(payload: Record<string, any>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
