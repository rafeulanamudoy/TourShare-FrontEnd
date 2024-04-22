"use client";

import Form from "@/hooks/reactHookForm/Form";
import Input from "@/hooks/reactHookForm/Input";
import { LoginSchema } from "@/lib/validation/yupValidation";
import { ISignInData, IUpdateUserData } from "@/types/IUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function Updata() {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });
  const onSubmit = async (userData: IUpdateUserData) => {
    console.log(userData, "usedata");
  };
  return (
    <div className=" my-10  h-1/2  grid    bg-white   w-2/3 mx-auto py-5   ">
      <Form
        className="     w-[70%] mx-auto my-auto   "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="  2xl:text-3xl   xl:text:2xl lg:text-lg   text-sm gap-5 capitalize    grid      ">
          <Input
            className="       w-full text-white h-[4em]  bg-[#31363F] p-5 rounded-md  placeholder:text-white   border-2 border-[#707070]"
            name="email"
            type="email"
            placeholder="email"
            error={errors.email?.message}
            register={register}
            autoFocus
          />

          <Input
            className="         w-full text-white h-[4em]] rounded-md  bg-[#31363F] p-5 placeholder:text-white  border-2 border-[#707070]"
            name="password"
            type="password"
            placeholder="password"
            error={errors.password?.message}
            register={register}
            autoFocus
          />
          <Input
            className="     w-full text-white h-[4em]  p-5 rounded-md bg-[#31363F] placeholder:text-white  border-2 border-[#707070]"
            name="phoneNumber"
            type="phoneNumber"
            placeholder="phoneNumber"
            error={errors.password?.message}
            register={register}
            autoFocus
          />
          <button
            className="     bg-[#FF914F] w-1/2 mx-auto h-[3em]  rounded-md "
            type="submit"
          >
            save changes
          </button>
        </div>
      </Form>
    </div>
  );
}
