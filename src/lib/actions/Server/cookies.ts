"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload, Secret, TokenExpiredError } from "jsonwebtoken";
export async function verifyToken(token: string, secret: Secret) {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error("token has expired");
    } else {
      console.error("error verifieng token ,erro.message");
    }
    return null;
  }
}

export async function removeCookie(name: string) {
  cookies().delete(name);
}
export async function getUserFromCookie() {
  const cookieStore = cookies();
  const user = cookieStore.get("accessToken");

  if (user && user.value) {
    const payload = await verifyToken(
      user.value,
      process.env.JWT_SECRET as Secret
    );

    if (payload) {
      const userEmail = payload.userEmail as string;
      const role = payload.role as string;
      const _id = payload._id as string;

      return {
        userEmail,
        role,
        _id,
      };
    } else {
      // Handle case where token verification failed
      return null;
    }
  } else {
    return null;
  }
}
export async function setCookie(name: string, value: string) {
  console.log(name, value, "check to set cookie from cookie.ts file");
  cookies().set({
    name: name,
    value: value,
    httpOnly: true,
    secure: true,
  });
}
