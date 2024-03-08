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

    .required("Last Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()

    .required("phoneNumber is required"),
  password: yup
    .string()

    .required("Password is required"),
  confirmPassword: yup
    .string()

    .required("confirm Password is required"),
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
      id="signUp"
      className={` flex  flex-col  justify-center items-center  py-16   gap-y-16  h-auto  bg-[#FF914F]`}
    >
      <span
        className={` uppercase 2xl:text-[100px] xl:text-[70px]  lg:text-[50px] text-[30px] block   ${rosario.className} w-[75%]   text-[#2E4262] border-[#707070] border-2 bg-white 2xl:h-[160px] xl:h-[150x] lg:h-[135px] h-[120px]  mx-auto  grid justify-center items-center `}
      >
        sign up
      </span>
      <Form
        className="  2xl:text-5xl xl:text-3xl  lg:text-2xl md:text-xl text-[10px] capitalize   text-white grid gap-y-16
         items-center    md:w-[70%]   "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="      grid       grid-cols-12   justify-center items-center ">
          <label className=" col-span-2 " htmlFor="name">
            Name
          </label>

          <div className=" col-span-10     flex gap-x-5   ">
            <Input
              className=" w-full   h-[3em] bg-white placeholder:p-5   border-2 border-[#707070]  "
              name="firstName"
              type="text"
              placeholder="First Name"
              error={errors.firstName?.message}
              register={register}
              autoFocus
            />
            <Input
              className="  w-full  h-[3em] bg-white  placeholder:p-5    border-2 border-[#707070]  "
              name="lastName"
              type="text"
              placeholder="Last Name"
              error={errors.lastName?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>

        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="email">
            Email
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" w-full  h-[3em]  bg-white placeholder:p-5    border-2  mx-auto block border-[#707070] "
              name="email"
              type="email"
              placeholder="abcd@gmail.com"
              error={errors.email?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className=" w-full   grid     grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="phoneNumber">
            <span>phone </span>
            <span>Number</span>
          </label>
          <div className="     col-span-10  ">
            <Input
              className="  w-full   h-[3em]  bg-white placeholder:p-5      border-2 mx-auto block border-[#707070] "
              name="phoneNumber"
              type="tel"
              placeholder="+880"
              error={errors.phoneNumber?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="password">
            password
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" 
              w-full  h-[3em]  bg-white placeholder:p-5    border-2 mx-auto block border-[#707070] "
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="password">
            <span>confirm </span>
            <span>Password</span>
          </label>
          <div className="     col-span-10  ">
            <Input
              className="w-full  h-[3em]  bg-white placeholder:p-5    border-2  mx-auto block border-[#707070] "
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <input
          className="submit-button   mx-auto  w-1/2 h-[3em] "
          type="submit"
          value="Sign up"
        />
      </Form>
    </div>
  );
}
