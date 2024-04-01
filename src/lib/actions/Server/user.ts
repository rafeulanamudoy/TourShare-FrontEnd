"use server";

import {
  ISendResponse,
  ISignInData,
  ISignUpData,
  IUserPayload,
} from "@/types/IUser";
import { cookies } from "next/headers";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { verifyToken } from "./cookies";
export async function signUp(data: FormData, role: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/${role}/signUp`,
      {
        method: "POST",
        headers: {},
        body: data,
      }
    );
    const result: ISendResponse<IUserPayload> = await response.json();
    //
    if (result.data?.email) {
      cookies().set("accessToken", result.data?.accessToken, {
        secure: true,
        httpOnly: true,
      });
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: ISignInData) {
  // console.log(data);
  try {
    const response = await fetch(`http://localhost:5000/api/v1/users/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result: ISendResponse<IUserPayload> = await response.json();

    //
    if (result.data?.accessToken) {
      console.log(result.data?.accessToken);
      // const cookieStore = cookies();
      // const theme = cookieStore.get("refreshToken");
      // console.log(theme, "check refresh token");
      cookies().set("accessToken", result.data?.accessToken, {
        secure: true,
        httpOnly: true,
      });
      const { userEmail: email, role } = await verifyToken(
        result.data?.accessToken,
        process.env.JWT_SECRET as Secret
      );
      return {
        ...result,
        role: role,
        email: email,
      };
    }
  } catch (error) {
    throw error;
  }
}
