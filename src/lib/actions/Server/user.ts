"use server";

import { ENUM_USER_ROLE, ISignInData, IUserSchema } from "@/types/IUser";

import { getCookie, setCookie, verifyToken } from "./cookies";
import { Secret } from "jsonwebtoken";
import { revalidateTag } from "next/cache";

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
        await setCookie("accessToken", result?.data?.accessToken);
        const user = await getSingleUser();
        // console.log(user, "user from login server action");

        return user;
      } else {
        return result;
      }
    } else {
      return result;
    }
  } catch (error) {
    //console.log(error, "check error");
    // throw error;
  }
}
export async function getSingleUser() {
  try {
    const user = await getCookie("accessToken");
    if (user) {
      const { _id } = user;
      const response = await fetch(`${process.env.URL}/users/${_id}`, {
        next: { tags: ["update"] },
      });
      // console.log(response, "check response from user.ts server action file");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Parse JSON response
      return data;
    } else {
      ///  console.log("user access token not found");
    }
  } catch (error) {
    throw error;
  }
}
export async function updateSingleUser(
  data: FormData,
  id: string,
  role: ENUM_USER_ROLE
) {
  try {
    const response = await fetch(`${process.env.URL}/${role}/${id}`, {
      method: "PATCH",
      headers: {},
      body: data,
    });
    const result = await response.json();
    revalidateTag("update");
    //console.log(result);
    return result;
  } catch (error) {
    // console.log(error, "update user error from  user.ts server file");
  }
}
