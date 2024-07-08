"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload, Secret, TokenExpiredError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getSingleUserById } from "./user";
export async function verifyToken(token: string, secret: Secret) {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // console.error("token has expired");
    } else {
      // console.error("error verifieng token ,erro.message");
    }
    return null;
  }
}

export async function removeCookie(name: string) {
  console.log(name, "check name");
  cookies().delete(name);
}
export async function getCookie(name: string) {
  const cookieStore = cookies();
  const user = cookieStore.get(name);
  // console.log(user, "user check");

  if (user && user.value) {
    const payload = await verifyToken(
      user.value,
      process.env.JWT_SECRET as Secret
    );
    //console.log(payload, "check payload");
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
  // console.log(name, value, "check to set cookie from cookie.ts file");
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
export async function deleteCookie() {
  "use server";

  cookies().delete("accessToken");
}
export async function removeUser() {
  const response = NextResponse.next();
  response.cookies.delete("accessToken");
  return response;
}
