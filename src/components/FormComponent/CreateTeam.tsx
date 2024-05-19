"use client";

import React, { useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { Rosario as Rosario } from "next/font/google";
import Input from "@/hooks/reactHookForm/Input";
import Form from "@/hooks/reactHookForm/Form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { signUp } from "@/lib/actions/Server/user";
import toast from "react-hot-toast";
import { CreateTeamSchema, SignUpSchema } from "@/lib/validation/yupValidation";
import { override1 } from "@/utilities/css";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createTeam } from "@/lib/actions/Server/team";
import { ICreateTeam } from "@/types/ICreateTeal";
import { useUserData } from "@/hooks/user/user";

const rosario = Rosario({
  subsets: ["latin"],
  display: "swap",
});

export default function CreateTeam() {
  const [loading, setLoading] = useState(false);

  //const { userData } = useUserData();
  const { email, phoneNumber } = useAppSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateTeamSchema) });
  const onSubmit = async (data: ICreateTeam) => {
    try {
      setLoading(true);

      //console.log(data);
      const res = await createTeam(data);
      if (res?.success) {
        toast.success(res?.message);
        reset();
      } else {
        const errorMessage = res?.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      //  console.log(error, "from create team");
      toast.error("please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      id="signUp"
      className={` flex  flex-col  justify-center items-center  py-16   gap-y-16  h-auto  bg-[#FF914F]`}
    >
      <span
        className={` uppercase 2xl:text-[100px] xl:text-[70px]  lg:text-[50px]  md:text-[30px] text-[20px] block   ${rosario.className} w-[75%]   text-[#2E4262] border-[#707070] border-2 bg-white 2xl:h-[160px] xl:h-[150x] lg:h-[135px] h-[120px]  mx-auto  grid justify-center items-center `}
      >
        Create Team
      </span>
      <Form
        className="  2xl:text-5xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-xs  text-[8px] capitalize   text-white grid gap-y-16
         items-center    md:w-[70%]   "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="email">
            Destination
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white px-5  py-5   border-2   border-[#707070] "
              name="destination"
              type="text"
              placeholder="destination"
              error={errors?.destination?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="email">
            Email
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" hover:cursor-not-allowed text-[#707070] w-full  h-[3em]  bg-white px-5  py-5   border-2   border-[#707070] "
              name="email"
              type="email"
              placeholder="abcd@gmail.com"
              defaultValue={email}
              readOnly
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="    grid     grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="phoneNumber">
            <span>phone </span>
            <span>Number</span>
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070]  w-full   h-[3em]  bg-white p-5   hover:cursor-not-allowed    border-2 border-[#707070] "
              name="phoneNumber"
              type="tel"
              defaultValue={phoneNumber}
              register={register}
              readOnly
              autoFocus
            />
          </div>
        </div>
        <div className="    grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="email">
            Current Members
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]    bg-white  p-5   border-2    border-[#707070] "
              name="currentMembers"
              type="number"
              register={register}
              placeholder="current members"
              error={errors?.currentMembers?.message}
              autoFocus
            />
          </div>
        </div>
        <div className="  grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="password">
            needed Members
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" text-[#707070]
              w-full  h-[3em]  bg-white p-5    border-2 border-[#707070] "
              name="neededMembers"
              type="number"
              placeholder="needed members"
              error={errors?.neededMembers?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="      grid       grid-cols-12   justify-center items-center ">
          <label className=" col-span-2 " htmlFor="name">
            Name
          </label>

          <div className=" col-span-10     flex gap-x-5   ">
            <Input
              className=" w-full    text-[#707070] h-[3em] bg-white p-5   border-2 border-[#707070]  "
              name="startDate"
              type="date"
              error={errors?.startDate?.message}
              register={register}
              autoFocus
            />
            <span className="my-auto">To</span>
            <Input
              className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
              name="endDate"
              type="date"
              error={errors?.endDate?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>{" "}
        <div className="    grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="password">
            Address
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white p-5    border-2  mx-auto block border-[#707070] "
              name="address"
              type="text"
              placeholder="Address"
              error={errors?.address?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="  grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="password">
            <span>NationalId </span>
            <span>Number</span>
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white p-5    border-2  mx-auto block border-[#707070] "
              name="nationalIdNumber"
              type="text"
              placeholder="national id number"
              error={errors?.nationalIdNumber?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <button
          className="submit-button mx-auto w-1/2 h-[3em]"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader
              loading={loading}
              cssOverride={override1}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Create Team"
          )}
        </button>
      </Form>
    </div>
  );
}
