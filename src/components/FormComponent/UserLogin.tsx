"use client";
import React from "react";
import { Rosario } from "next/font/google";
import Input from "@/hooks/reactHookForm/Input";
import Form from "@/hooks/reactHookForm/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ISignInData } from "@/types/IUser";

import { Login } from "@/lib/actions/Server/formActions/signIn";

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

export default function UserLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: yupResolver(EmailSchema) });
  const onSubmit = async (userData: ISignInData) => {
    const userLogin = await Login(userData);
    console.log(userLogin, "from server action");
    reset();
  };
  return (
    <div
      id="signIn"
      className={` py-16   gap-y-16     h-auto flex  flex-col  items-center   bg-[#FFBD4A]`}
    >
      <span
        className={`  uppercase 2xl:text-[100px] xl:text-[70px]  lg:text-[50px] text-[40px]    ${rosario.className}   text-[#2E4262]`}
      >
        sign In
      </span>
      <Form
        className="   py-32 2xl:text-5xl xl:text-3xl text-xl  text-[#2E4262]      flex flex-col justify-items-center  items-center
        bg-white border-1 w-[50.5%]    "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="w-[70%] flex flex-col items-center gap-y-10">
          <Input
            className="text-[#2E4262] p-5 bg-[#E1E1E1]       border-2 h-[3em] w-full border-[#707070]  "
            name="email"
            type="email"
            placeholder="email"
            error={errors.email?.message}
            register={register}
            autoFocus
          />

          <Input
            className=" bg-[#E1E1E1]  p-5     border-2     h-[3em] grid  border-[#707070] w-full  "
            name="password"
            type="password"
            placeholder="password"
            error={errors.password?.message}
            register={register}
            autoFocus
          />
          <button
            className="      w-full  submit-button  h-[3em]     "
            type="submit"
            value="Login"
            disabled={isSubmitting || !isValid}
          >
            {" "}
            login
          </button>
        </div>
      </Form>
    </div>
  );
}
