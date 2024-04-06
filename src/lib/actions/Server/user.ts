"use server";
import { NextResponse } from "next/server";
import { ISendResponse, ISignInData } from "@/types/IUser";
import { cookies } from "next/headers";

import { verifyToken } from "./cookies";
import { Secret } from "jsonwebtoken";
import { redirect } from "next/navigation";
export async function signUp(data: FormData, role: string) {
  try {
    const response = await fetch(`${process.env.URL}/${role}/signUp`, {
      method: "POST",
      headers: {},
      body: data,
    });
    const result = await response.json();
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
  try {
    const response = await fetch(`${process.env.URL}/users/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    //console.log(result);
    if (result.success && result.data?.accessToken) {
      // console.log(result.data?.accessToken);
      // const cookieStore = cookies();
      // const theme = cookieStore.get("refreshToken");
      // console.log(theme, "check refresh token");
      const { userEmail: email, role } = await verifyToken(
        result.data?.accessToken,
        process.env.JWT_SECRET as Secret
      );

      cookies().set("accessToken", result.data?.accessToken, {
        secure: true,
        httpOnly: true,
      });

      return {
        ...result,
        role: role,
        email: email,
      };
    } else {
      return result;
    }
  } catch (error) {
    console.log(error, "check error");
    throw error;
  }
}
export async function getSingleUser(id: string) {
  try {
    const response = await fetch(`${process.env.URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse JSON response
    return data;
  } catch (error) {
    throw error;
  }
}
