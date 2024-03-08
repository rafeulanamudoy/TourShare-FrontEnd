"use client";
import React from "react";
import { Rosario } from "next/font/google";
import Input from "@/hooks/reactHookForm/Input";
import Form from "@/hooks/reactHookForm/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ISignInData } from "@/types/IUser";

const rosario = Rosario({
  subsets: ["latin"],
  display: "swap",
});
const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()

    .required("Password is required"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EmailSchema) });
  const onSubmit = async (userData: ISignInData) => {
    console.log(userData);
  };
  return (
    <div
      className={`  h-screen flex  flex-col  justify-center items-center gap-y-16  bg-[#FFBD4A]`}
    >
      <span
        className={`  uppercase 2xl:text-[100px] xl:text-[70px]  lg:text-[50px] text-[40px]    ${rosario.className}   text-[#2E4262]`}
      >
        sign In
      </span>
      <Form
        className=" 2xl:text-5xl xl:text-3xl text-xl  text-[#2E4262]  flex flex-col gap-y-10 justify-center items-center 
        bg-white border-1 w-[57.5%] h-[70%]   "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <Input
          className="bg-[#E1E1E1] w-[70%] placeholder:p-5    border-2 h-[3em]  mx-auto block border-[#707070]  "
          name="email"
          type="email"
          placeholder="email"
          error={errors.email?.message}
          register={register}
          autoFocus
        />
        <Input
          className=" bg-[#E1E1E1]  placeholder:p-5     border-2   w-[70%]     mx-auto block  h-[3em]  border-[#707070]  "
          name="password"
          type="password"
          placeholder="password"
          error={errors.password?.message}
          register={register}
          autoFocus
        />

        <input
          className="  submit-button  h-[3em]  w-[70%]   "
          type="submit"
          value="Login"
        />
      </Form>
    </div>
  );
}
