"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
export async function verifyToken(token: string, secret: Secret) {
  return jwt.verify(token, secret) as JwtPayload;
}

export async function removeCookie(name: string) {
  cookies().delete(name);
}
export async function getUserFromCookie() {
  const cookieStore = cookies();
  const user = cookieStore.get("accessToken");

  if (user && user.value) {
    const { userEmail, role } = await verifyToken(
      user.value,
      process.env.JWT_SECRET as Secret
    );
    return {
      userEmail,
      role,
    };
  } else {
    return;
  }
}
