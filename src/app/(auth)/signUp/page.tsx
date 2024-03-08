"use client";
import React from "react";
import { Rosario } from "next/font/google";
import Input from "@/hooks/reactHookForm/Input";
import Form from "@/hooks/reactHookForm/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ISignUpData } from "@/types/IUser";

const rosario = Rosario({
  subsets: ["latin"],
  display: "swap",
});
const EmailSchema = yup.object().shape({
  firstName: yup
    .string()

    .required("First Name is required"),
  lastName: yup
    .string()

    .required("Latst Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()

    .required("Password is required"),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EmailSchema) });
  const onSubmit = async (userData: ISignUpData) => {
    console.log(userData);
  };
  return (
    <div
      className={` flex  flex-col  justify-center items-center     gap-y-16  h-screen  bg-[#FF914F]`}
    >
      <span
        className={` uppercase 2xl:text-[100px] xl:text-[70px]  lg:text-[50px] text-[40px] block   ${rosario.className} w-[71%]   text-[#2E4262] border-[#707070] border-2 bg-white 2xl:h-[160px] xl:h-[150x] lg:h-[135px] h-[120px]  mx-auto  grid justify-center items-center `}
      >
        sign up
      </span>
      <Form
        className="  2xl:text-5xl xl:text-3xl text-xl  text-[#2E4262]   grid gap-y-16 justify-center
        bg-white items-center w-full "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="   grid     grid-cols-12   justify-center items-center ">
          <label className=" col-span-2 " htmlFor="name">
            Name
          </label>

          <div className=" col-span-10 h-[3em]   flex gap-x-5   border-4">
            <Input
              className="w-full bg-white placeholder:p-5   h-full  border-2 border-[#707070]  "
              name="firstName"
              type="text"
              placeholder="First Name"
              error={errors.firstName?.message}
              register={register}
              autoFocus
            />
            <Input
              className="  w-full bg-[#E1E1E1]  placeholder:p-5 h-full    border-2 border-[#707070]  "
              name="lastName"
              type="text"
              placeholder="Last Name"
              error={errors.lastName?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>

        <div className="grid    grid-cols-12  justify-center items-center   w-full">
          <label className=" col-span-2" htmlFor="email">
            Email
          </label>
          <div className=" h-[3em]     col-span-10  border-4">
            <Input
              className="  h-full bg-white placeholder:p-5    border-2 w-full mx-auto block border-[#707070] "
              name="email"
              type="email"
              placeholder="abcd@gmail.com"
              error={errors.email?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>

        <input
          className="submit-button   mx-auto  w-1/2 h-[3em] "
          type="submit"
          value="Login"
        />
      </Form>
    </div>
  );
}
