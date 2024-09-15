"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload, Secret, TokenExpiredError } from "jsonwebtoken";

export async function verifyToken(token: string, secret: Secret) {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
    } else {
    }
    return null;
  }
}

export async function removeCookie(name: string) {
  cookies().delete(name);
}
export async function decodeUserCookie(name: string) {
  const cookieStore = cookies();
  const user = cookieStore.get(name);

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
      return null;
    }
  } else {
    return null;
  }
}
export async function setCookie(name: string, value: string) {
  cookies().set({
    name: name,
    value: value,
    httpOnly: true,
    secure: true,
  });
}

export async function verifyJwt(token: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["verify"]
  );

  const [header, payload, signature] = token.split(".");
  const data = `${header}.${payload}`;
  const decodedSignature = Uint8Array.from(atob(signature), (c) =>
    c.charCodeAt(0)
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    decodedSignature,
    encoder.encode(data)
  );

  if (!valid) {
    throw new Error("Invalid token");
  }

  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload;
}
//
