"use client";
import React, { useState } from "react";
import { Rosario } from "next/font/google";
import Input from "@/hooks/reactHookForm/Input";
import Form from "@/hooks/reactHookForm/Form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { ISignInData } from "@/types/IUser";
import { LoginSchema } from "@/lib/validation/yupValidation";
import { signIn } from "@/lib/actions/Server/user";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { override } from "@/utilities/css";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { date } from "yup";
import { Secret } from "jsonwebtoken";
import { useRouter } from "next/navigation";

const rosario = Rosario({
  subsets: ["latin"],
  display: "swap",
});

export default function UserLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  //console.log("render userLogin component");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });
  const onSubmit = async (userData: ISignInData) => {
    //   console.log(userData, "usedata");

    try {
      setLoading(true);
      const res = await signIn(userData);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);

        dispatch(
          setUser({
            user: {
              email: res.email,
              role: res.role,
            },
          })
        );
        router.push("/");
      } else {
        toast.error((res?.message as string) || "Error message not available");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the account");
    } finally {
      setLoading(false);

      reset();
    }

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
            disabled={loading}
          >
            {loading ? (
              <ClipLoader
                loading={loading}
                cssOverride={override}
                size={100}
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
