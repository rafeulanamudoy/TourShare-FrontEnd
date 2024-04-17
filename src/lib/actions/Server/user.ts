"use server";

import { ISignInData } from "@/types/IUser";
import { cookies } from "next/headers";

import { getUserFromCookie, setCookie, verifyToken } from "./cookies";
import { Secret } from "jsonwebtoken";

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
      setCookie("accessToken", result?.data?.accessToken);
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

    if (result.success && result.data?.accessToken) {
      const payload = await verifyToken(
        result.data?.accessToken,
        process.env.JWT_SECRET as Secret
      );

      if (payload) {
        const { userEmail: email, role } = payload;

        setCookie("accessToken", result?.data?.accessToken);

        return {
          ...result,
          role: role,
          email: email,
        };
      } else {
        // Handle case where token verification failed
        console.error("Token verification failed");
        // You can handle this case according to your application's requirements
        // For example, you could redirect the user to the login page or display an error message
        return result; // Or return some predefined error response
      }
    } else {
      return result;
    }
  } catch (error) {
    console.log(error, "check error");
    throw error;
  }
}
export async function getSingleUser() {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      throw new Error("User not found in cookie");
    }
    const { _id } = user;
    const response = await fetch(`${process.env.URL}/users/${_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse JSON response
    return data;
  } catch (error) {
    throw error;
  }
}
