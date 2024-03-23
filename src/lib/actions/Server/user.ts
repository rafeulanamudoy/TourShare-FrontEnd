"use server";

import {
  ISendResponse,
  ISignInData,
  ISignUpData,
  ISigninResponseData,
} from "@/types/IUser";
import { cookies } from "next/headers";
import { json } from "stream/consumers";

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
    const result: ISendResponse<ISignUpData> = await response.json();
    //
    if (result.data?.email) {
      cookies().set("userEmail", result.data?.email);
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: ISignInData) {
  console.log(data);
  try {
    const response = await fetch(`http://localhost:5000/api/v1/users/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result: ISendResponse<ISigninResponseData> = await response.json();
    console.log(result, "from signIn server");
    //
    if (result.data?.accessToken) {
      cookies().set("userEmail", result.data?.email);
    }
    return result;
  } catch (error) {
    throw error;
  }
}
