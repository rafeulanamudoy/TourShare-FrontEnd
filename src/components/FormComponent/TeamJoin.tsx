"use client";

import React, { useEffect, useRef, useState } from "react";

import { ENUM_jOIN_TEAM_STATUS, IJoinTeam } from "@/types/IJoinTeam";
import { useAppSelector } from "@/redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { JoinTeamSchema } from "@/lib/validation/yupValidation";
import { useForm } from "react-hook-form";
import Input from "@/hooks/reactHookForm/Input";
import Form from "@/hooks/reactHookForm/Form";

import { useSearchParams } from "next/navigation";
import { createJoinTeam } from "@/lib/actions/Server/team";

import { ClipLoader } from "react-spinners";
import { override1 } from "@/utilities/css";
import { useSocketContext } from "@/socket/context/SocketContext";
import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
import { UseDynamicLoading } from "@/utilities/UseDynamicLoading";
import { showToast } from "@/utilities/ToastOptions";

export default function TeamJoin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const [joinId, setJoinId] = useState<string | null>(null);
  const { sendJoinTeamRequest } = useSocketContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);

  useEffect(() => {
    const handleAsyncOp = async () => {
      const hash = window.location.hash;

      const [, queryString] = hash.split("?");
      if (queryString) {
        const params = new URLSearchParams(queryString);
        const joinId = params.get("joinId");

        setJoinId(joinId);
      } else {
        setJoinId(searchParams.get("joinId"));
      }
    };
    handleAsyncOp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { email, phoneNumber } = useAppSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(JoinTeamSchema) });
  const onSubmit = async (data: IJoinTeam) => {
    if (!joinId) {
      setError("Invalid join id.Please again Go to home and rejoin");
      return;
    }

    try {
      setLoading(true);
      const joinTeamData: IJoinTeam = {
        ...data,
        teamInfo: joinId,
        status: ENUM_jOIN_TEAM_STATUS.PENDING,
      };
      const res = await createJoinTeam(joinTeamData);

      if (res?.success) {
        showToast("success", res?.message);
        const timestamp = new Date().toISOString();

        sendJoinTeamRequest(
          res?.data?.teamInfo?.email,
          `${email} send  request to join with your team`,
          ENUM_NOTIFICATION_TYPE.JOINTEAMREQUESTSTATUS,
          timestamp
        );

        setError("");
        reset();
      } else {
        const errorMessage = res?.message;

        res.errorCode === 11000
          ? setError(
              "you can't join to   a new team  while you already join a team .to start a new journy please end your current journey ."
            )
          : setError(errorMessage);
      }
    } catch (error) {
      // console.log(error, "error from catch message");
      showToast("error", "An error occurred. Please try again later");
    } finally {
      setLoading(false);

      reset();
    }
  };
  return (
    <div
      id="joinTeam"
      className={` flex  flex-col  justify-center items-center  py-16   gap-y-16  h-auto  bg-[#FF914F]`}
    >
      <span
        className={` uppercase 2xl:text-[100px] xl:text-[70px]  lg:text-[50px]  md:text-[30px] text-[20px]    w-[75%]   text-[#2E4262] border-[#707070] border-2 bg-white 2xl:h-[160px] xl:h-[150x] lg:h-[135px] h-[120px]  mx-auto  grid justify-center items-center `}
      >
        Join Team
      </span>

      <Form
        className="  2xl:text-5xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-xs  text-[8px] capitalizecapitalize   text-white grid gap-y-16
         items-center    md:w-[70%]   "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
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
            <span>Phone </span>
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
          <label className=" col-span-2" htmlFor="groupMember">
            Group Members
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]    bg-white  p-5   border-2    border-[#707070] "
              name="groupMember"
              type="number"
              register={register}
              placeholder="current members"
              error={errors?.groupMember?.message}
              autoFocus
            />
          </div>
        </div>

        <div className="    grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="address">
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
          <label
            className=" col-span-2 grid gap-y-3"
            htmlFor="nationalIdNumber"
          >
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
        {error && (
          <span className="  text-white 2xl:text-3xl xl:text-2xl  lg:text-xl md:text-lg  capitalize sm:text-xs  text-[8px] ">
            {error}
          </span>
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
            "Join  Team"
          )}
        </button>
      </Form>
    </div>
  );
}