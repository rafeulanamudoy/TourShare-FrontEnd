"use client";
import React, { useRef, useState } from "react";
import { Rosario } from "next/font/google";
import { UseDynamicLoading } from "@/src/utilities/UseDynamicLoading";
import { useAppDispatch } from "@/src/redux/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInData } from "@/src/types/IUser";
import { LoginSchema } from "@/src/lib/validation/yupValidation";
import { signIn } from "@/src/lib/actions/Server/user";
import { showToast } from "@/src/utilities/ToastOptions";
import { setUser } from "@/src/redux/features/auth/authSlice";
import Form from "@/src/hooks/reactHookForm/Form";
import Input from "@/src/hooks/reactHookForm/Input";
import { ClipLoader } from "react-spinners";
import { override1 } from "@/src/utilities/css";

const rosario = Rosario({
  subsets: ["latin"],
  display: "swap",
});

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });
  const onSubmit = async (userData: ISignInData) => {
    try {
      setLoading(true);

      const res = await signIn(userData);

      if (res?.success) {
        showToast("success", "User Logged In Succesfully");

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
      } else {
        showToast("error", res.message);
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
      id="signIn"
      className={` lg:py-8  py-4  lg:gap-y-8  gap-y-4   h-auto flex  flex-col  items-center   bg-[#FFBD4A]`}
    >
      <span
        className={`  uppercase 2xl:text-[70px] xl:text-[50px]  lg:text-[40px]  md:text-[30px] sm:text-[20px] text-[15px]   ${rosario.className}   text-[#2E4262]`}
      >
        sign In
      </span>
      <Form
        className="  2xl:py-28  xl:py-24 lg:py-20  md:py-16  py-8 2xl:text-4xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-xs  text-[8px]  text-[#2E4262]      flex flex-col justify-items-center  items-center
        bg-white border-1 lg:w-[50.5%] w-[80%]    "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="w-[70%] flex flex-col items-center   lg:gap-y-10 gap-y-8">
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
            ref={buttonRef}
            className="      w-full  submit-button  h-[3em]     "
            type="submit"
            value="Login"
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
              "Sign in"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}
