"use server";

import { useSignUpMutation } from "@/redux/features/auth/customerApi";
import { ISignInData } from "@/types/IUser";

export async function Login(data: ISignInData) {
  return data;
}
