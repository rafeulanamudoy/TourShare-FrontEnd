import { ISignInData, ISignUpData } from "../../../types/IUser";
import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (data: ISignUpData) => ({
        url: "/customer/signUp",
        method: "POST",
        body: data,
      }),
    }),
    SignIn: build.mutation({
      query: (data: ISignInData) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
