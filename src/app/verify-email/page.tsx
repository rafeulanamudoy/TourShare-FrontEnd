"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { roboto } from "../styles/fonts";
import Header from "@/shared/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { verifyEmail } from "@/lib/actions/Server/user";
import { UseDynamicLoading } from "@/utilities/UseDynamicLoading";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { override1 } from "@/utilities/css";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);

  const search = searchParams.get("token");
  console.log(search);

  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      const res = await verifyEmail(token as string);
      if (res?.success) {
        toast.success(res.message);
      } else {
        const errorMessage = res?.message || "Error message not available";
        toast.error(errorMessage);
      }
    } catch (error) {
    } finally {
      setLoading(false);
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
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleVerifyEmail}
            ref={buttonRef}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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
              "Verify Email Address"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
