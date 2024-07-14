"use client";

import React, { useRef, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { Rosario as Rosario } from "next/font/google";
import { useRouter } from "next/navigation";
import { UseDynamicLoading } from "@/src/utilities/UseDynamicLoading";
import { useAppDispatch } from "@/src/redux/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "@/src/lib/validation/yupValidation";
import { ENUM_USER_ROLE, ISuperAdmin } from "@/src/types/IUser";
import { signUp } from "@/src/lib/actions/Server/user";
import { showToast } from "@/src/utilities/ToastOptions";
import { setUser } from "@/src/redux/features/auth/authSlice";
import Form from "@/src/hooks/reactHookForm/Form";
import Input from "@/src/hooks/reactHookForm/Input";
import { override1 } from "@/src/utilities/css";

const rosario = Rosario({
  subsets: ["latin"],
  display: "swap",
});

export default function AdminAccountForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignUpSchema) });
  const onSubmit = async (userData: ISuperAdmin) => {
    const phoneNumber = (userData.countryCode || "") + userData.phoneNumber;

    const formData = new FormData();
    formData.append("name[firstName]", userData.name.firstName);
    formData.append("name[lastName]", userData.name.lastName);
    formData.append("email", userData.email);
    formData.append("profileImage", userData.profileImage[0]);
    formData.append("password", userData.password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("role", ENUM_USER_ROLE.ADMIN);

    try {
      setLoading(true);
      const res = await signUp(formData, ENUM_USER_ROLE.ADMIN);

      if (res?.success) {
        showToast("success", res?.message);
        if (res.data) {
          dispatch(
            setUser({
              user: {
                email: res?.data?.email,
                role: res?.data?.role,
                profileImage: res?.data?.profileImage,
                name: res?.data?.name,
                phoneNumber: res?.data?.phoneNumber,
                _id: res?.data?._id,
                emailVerified: res?.data?.emailVerified,
              },
            })
          );
          router.push("/");
        }
      } else {
        showToast("error", res?.message);
      }
    } catch (error) {
      showToast("error", "an error occurred. please try again later");
    } finally {
      setLoading(false);

      reset();
    }
  };
  return (
    <div
      id="signUp"
      className={` flex  flex-col  justify-center items-center  py-16   gap-y-16  h-auto  bg-[#FF914F]`}
    >
      <span
        className={` uppercase  2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl  text-base block   ${rosario.className} w-[75%]   text-[#2E4262] border-[#707070] border-2 bg-white 2xl:h-[160px] xl:h-[150x] lg:h-[135px] h-[120px]  mx-auto  grid justify-center items-center `}
      >
        Create Admin Account
      </span>
      <Form
        className="  2xl:text-4xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-lg text-[8px] capitalize   text-white grid gap-y-16
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
              className="text-[#707070] w-full  h-[3em]  bg-white px-5  py-5   border-2   border-[#707070] "
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
          <label className=" col-span-2" htmlFor="email">
            Profile Image
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]    bg-white  p-5   border-2    border-[#707070] "
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
                className="text-[#707070]  w-full   h-[3em]  bg-white p-5      border-2 border-[#707070] "
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
