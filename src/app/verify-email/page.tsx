"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  getSingleUser,
  resendVerifyEmail,
  verifyEmail,
} from "@/lib/actions/Server/user";
import { UseDynamicLoading } from "@/utilities/UseDynamicLoading";

import { ClipLoader } from "react-spinners";
import { override1 } from "@/utilities/css";
import { showToast } from "@/utilities/ToastOptions";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [verifyloading, setVerifyLoading] = useState(false);
  const [resendLoading, sendResendLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);

  const handleVerifyEmail = async () => {
    try {
      setVerifyLoading(true);
      const res = await verifyEmail(token as string);

      if (res?.success) {
        showToast("success", res?.message);
        router.push("/signIn#signIn");
      } else {
        showToast("error", res?.message);
      }
    } catch (error) {
      showToast("error", error as string);
    } finally {
      setVerifyLoading(false);
    }
  };
  const handleResendEmail = async () => {
    try {
      sendResendLoading(true);
      const user = await getSingleUser();
      const res = await resendVerifyEmail({
        email: user?.data?.email as string,
      });
      if (res.success) {
        showToast("success", res?.message);
        router.push("/signIn#signIn");
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      showToast("error", "An error occurred. please try again later");
    } finally {
      sendResendLoading(false);
    }
  };
  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center bg-gray-100  `}
    >
      <div className=" bg-white p-8 rounded-md shadow-md w-full max-w-md ">
        <h1 className="text-[#2e4262]  2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg sm:text-base  text-sm  text-center font-bold capitalize ">
          Verify Your Email Address
        </h1>
        <hr className="leading-4 border-gray-500 w-[80%] mx-auto my-4" />
        <div className=" mt-4 text-gray-600 text-center">
          <p className="  ">in order to start using your tourshare account,</p>
          <p> you need to confirm your email address</p>
        </div>
        <div className="flex  justify-center mt-4">
          <div
            className="flex items-center  justify-center rounded-full bg-white"
            style={{
              width: "3em",
              height: "3em",
              border: "2px solid black",
            }}
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{
                width: "2em",
                height: "2em",
                color: "black",
              }}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row  items-center  gap-5 justify-center">
          <button
            onClick={handleVerifyEmail}
            ref={buttonRef}
            className="bg-blue-500 w-[50%] text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            disabled={verifyloading}
          >
            {verifyloading ? (
              <ClipLoader
                loading={verifyloading}
                cssOverride={override1}
                size={loaderSize}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Verify Email Address"
            )}
          </button>
          <button
            onClick={handleResendEmail}
            className="bg-[#2e4262] w-[50%] text-white px-4 py-2 rounded hover:bg-[#213350] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            {" "}
            {resendLoading ? (
              <ClipLoader
                loading={resendLoading}
                cssOverride={override1}
                size={loaderSize}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Resend Email"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
