"use client";

import { ENUM_NOTIFICATION_TYPE } from "@/src/enums/notification";
import Form from "@/src/hooks/reactHookForm/Form";
import Input from "@/src/hooks/reactHookForm/Input";
import { createJoinTeam } from "@/src/lib/actions/Server/team";
import { JoinTeamSchema } from "@/src/lib/validation/yupValidation";
import { useAppSelector } from "@/src/redux/hooks";
import { useSocketContext } from "@/src/socket/context/SocketContext";
import { ENUM_jOIN_TEAM_STATUS, IJoinTeam } from "@/src/types/IJoinTeam";
import { override1 } from "@/src/utilities/css";
import { showToast } from "@/src/utilities/ToastOptions";
import { UseDynamicLoading } from "@/src/utilities/UseDynamicLoading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import SkeletonLoading from "../Loader/SkeletonLoading";

export default function TeamJoin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const [joinId, setJoinId] = useState<string | null>(null);
  const { sendJoinTeamRequest } = useSocketContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);

  const { email, phoneNumber } = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    setJoinId(searchParams.get("joinId"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      showToast("error", "An error occurred. Please try again later");
    } finally {
      setLoading(false);

      reset();
    }
  };
  // if (!email && !phoneNumber) {
  //   return <SkeletonLoading height={10} />;
  // }

  return (
    <div
      id="joinTeam"
      className={` flex  flex-col  justify-center items-center  py-16   gap-y-16  h-auto  bg-[#FF914F]`}
    >
      <span
        className={` uppercase 2xl:text-[70px] xl:text-[50px]  lg:text-[40px]  md:text-[30px] sm:text-[20px] text-[15px] 2xl:h-[120px] xl:h-[110x] lg:h-[80px] md:h-[70px] sm:h-[60px] h-[40px]    w-[75%]   text-[#2E4262] border-[#707070] border-2 bg-white  mx-auto  grid justify-center items-center `}
      >
        Join Team
      </span>

      <Form
        className="  2xl:text-4xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-xs  text-[8px] capitalizecapitalize   text-white grid 2xl:gap-y-16 xl:gap-y-14 lg:gap-y-12 md:gap-y-10 sm:gap-y-6 gap-y-4
         items-center  md:w-[70%]  w-[90%]   "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="email">
            Email
          </label>
          <div className="     col-span-10  ">
            {email ? (
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
            ) : (
              <SkeletonLoading count={1} height={100} />
            )}
          </div>
        </div>
        <div className="    grid     grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="phoneNumber">
            <span>Phone </span>
            <span>Number</span>
          </label>
          <div className="     col-span-10  ">
            {phoneNumber ? (
              <Input
                className="text-[#707070]  w-full   h-[3em]  bg-white p-5   hover:cursor-not-allowed    border-2 border-[#707070] "
                name="phoneNumber"
                type="tel"
                defaultValue={phoneNumber}
                register={register}
                readOnly
                autoFocus
              />
            ) : (
              <SkeletonLoading count={1} height={100} />
            )}
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
