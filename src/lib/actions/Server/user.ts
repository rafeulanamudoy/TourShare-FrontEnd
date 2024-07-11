"use server";

import { ENUM_USER_ROLE, ISignInData } from "@/types/IUser";

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

    revalidateTag("createUser");
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

        return user;
      } else {
        return result;
      }
    } else {
      return result;
    }
  } catch (error) {}
}
export async function getSingleUser() {
  try {
    const user = await getCookie("accessToken");
    if (user) {
      const { _id } = user;
      const response = await fetch(`${process.env.URL}/users/${_id}`, {
        next: { tags: ["update", "verifyEmail"] },
      });

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
export async function getSingleUserById(userId: string) {
  try {
    const response = await fetch(`${process.env.URL}/users/${userId}`, {
      next: { tags: ["update", "verifyEmail"] },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Parse JSON response
    return data;
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
    revalidateTag("updateUser");
    //console.log(result);
    return result;
  } catch (error) {}
}

export async function getAllUsers() {
  try {
    const response = await fetch(`${process.env.URL}/superAdmin/users`, {
      next: { tags: ["createUser", "updateUser", "deleteSingleUser"] },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Parse JSON response
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteSingleUser(id: string) {
  try {
    const response = await fetch(`${process.env.URL}/superAdmin/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    revalidateTag("deleteSingleUser");

    return result;
  } catch (error) {}
}

export async function verifyEmail(token: string) {
  try {
    const response = await fetch(
      `${process.env.URL}/users/verify-email/?token=${token}`,
      {
        method: "PATCH",
      }
    );
    const result = await response.json();
    revalidateTag("verifyEmail");

    return result;
  } catch (error) {}
}
export async function resendVerifyEmail(data: { email: string }) {
  try {
    const response = await fetch(`${process.env.URL}/users/resend-verfyEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("verifyEmail");
    // console.log(result);
    return result;
  } catch (error) {}
}
