"use client";

import React, { useRef, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Rosario } from "next/font/google";
import { UseDynamicLoading } from "@/src/utilities/UseDynamicLoading";
import { SignUpSchema } from "@/src/lib/validation/yupValidation";
import { ENUM_USER_ROLE, ISignUpData } from "@/src/types/IUser";
import { signUp } from "@/src/lib/actions/Server/user";
import { showToast } from "@/src/utilities/ToastOptions";

import Form from "@/src/hooks/reactHookForm/Form";
import Input from "@/src/hooks/reactHookForm/Input";
import { override1 } from "@/src/utilities/css";

const rosario = Rosario({
  subsets: ["latin"],
  display: "swap",
});

export default function CustomerAccount() {
  const MAX_RETRIES = 3;
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignUpSchema) });
  const onSubmit = async (userData: ISignUpData) => {
    const phoneNumber = (userData.countryCode || "") + userData.phoneNumber;

    const formData = new FormData();
    formData.append("name[firstName]", userData.name.firstName);
    formData.append("name[lastName]", userData.name.lastName);
    formData.append("email", userData.email);
    formData.append("profileImage", userData.profileImage[0]);
    formData.append("password", userData.password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("role", ENUM_USER_ROLE.CUSTOMER);
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      try {
        setLoading(true);
        const res = await signUp(formData, "customer");

        if (res?.success) {
          setMessage(res.message);
          break;
        } else {
          showToast("error", res?.message);
          break;
        }
      } catch (error) {
        if (attempt < MAX_RETRIES - 1) {
        } else {
          showToast("error", "An error occurred while creating the account");
        }
      } finally {
        setLoading(false);
        attempt++;
      }
      reset();
    }
  };
  return (
    <div
      id="signUp"
      className={` flex  flex-col  justify-center items-center  py-16   gap-y-16  h-auto  bg-[#FF914F]`}
    >
      <span
        className={` 2xl:text-[70px] xl:text-[50px]  lg:text-[40px]  md:text-[30px] sm:text-[20px] text-[15px] 2xl:h-[120px] xl:h-[110x] lg:h-[80px] md:h-[70px] sm:h-[60px] h-[40px] uppercase block   ${rosario.className} md:w-[75%] w-[95%]   text-[#2E4262] border-[#707070] border-2 bg-white   mx-auto  grid justify-center items-center `}
      >
        sign up
      </span>
      <Form
        className="  2xl:text-4xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-xs  text-[8px] capitalize   text-white grid 2xl:gap-y-16 xl:gap-y-14 lg:gap-y-12 md:gap-y-10 sm:gap-y-6 gap-y-4
         items-center    md:w-[70%]  w-[90%]   "
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
              className=" w-full    text-[#707070] h-[3em] bg-white p-5   border-2 border-[#707070]  "
              name="name.firstName"
              type="text"
              placeholder="First Name"
              error={errors.name?.firstName?.message}
              register={register}
              autoFocus
            />
            <Input
              className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
              name="name.lastName"
              type="text"
              placeholder="Last Name"
              error={errors.name?.lastName?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>{" "}
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="email">
            Email
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
              name="email"
              type="email"
              placeholder="abcd@gmail.com"
              error={errors?.email?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="profileImage">
            Profile Image
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" text-[#707070]  w-full    h-[3em]  bg-white p-5      border-2 border-[#707070]   "
              name="profileImage"
              type="file"
              register={register}
              error={errors?.profileImage?.message}
              autoFocus
            />
          </div>
        </div>
        <div className=" w-full   grid     grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="phoneNumber">
            <span>phone </span>
            <span>Number</span>
          </label>
          <div className="   grid grid-cols-4   col-span-10  gap-x-5 ">
            <div className=" col-span-1">
              <Input
                className="text-[#707070]  w-full    h-[3em]  bg-white p-5      border-2 border-[#707070] "
                name="countryCode"
                type="tel"
                defaultValue={"+88"}
                register={register}
                autoFocus
                readOnly
              />
            </div>
            <div className=" col-span-3">
              <Input
                className="text-[#707070]  w-full   h-[3em]  bg-white p-5      border-2 border-[#707070] "
                name="phoneNumber"
                type="tel"
                placeholder="Your Phone Number"
                error={errors?.phoneNumber?.message}
                register={register}
                autoFocus
              />
            </div>
          </div>
        </div>
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="password">
            password
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" text-[#707070]
              w-full  h-[3em]  bg-white p-5    border-2 border-[#707070] "
              name="password"
              type="password"
              placeholder="Password"
              error={errors?.password?.message}
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
              className="text-[#707070] w-full  h-[3em]  bg-white p-5    border-2  mx-auto block border-[#707070] "
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              error={errors?.confirmPassword?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        {message && (
          <div className="mt-6 p-4 bg-green-100 border  border-green-400 text-green-700 rounded-md    w-full mx-auto text-center 2xl:text:xl xl:text-lg lg:text-xl md:text-base sm:text-xs text-[10px]">
            <p>{message}</p>
          </div>
        )}
        <button
          ref={buttonRef}
          className="submit-button mx-auto w-1/2 h-[3em]"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader
              loading={loading}
              cssOverride={override1}
              size={loaderSize}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Sign up"
          )}
        </button>
      </Form>
    </div>
  );
}
