"use client";
import { resendVerifyEmail, verifyEmail } from "@/lib/actions/Server/user";
import { useAppSelector } from "@/redux/hooks";
import { override1 } from "@/utilities/css";
import { showToast } from "@/utilities/ToastOptions";
import { UseDynamicLoading } from "@/utilities/UseDynamicLoading";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

import { ClipLoader } from "react-spinners";

export default function VerifyReminder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);
  const [loading, setLoading] = useState(false);

  const handleResendEmail = async () => {
    try {
      setLoading(true);
      const res = await resendVerifyEmail({ email: email as string });
      if (res.success) {
        showToast("success", res?.message);
        router.push("/signIn#signIn");
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      showToast("error", "an error occurred. please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Verify Your Email
        </h1>
        <p className="mt-4 text-gray-600 text-center">
          We have sent a verification email to your email address. Please check
          your email to verify your account.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            ref={buttonRef}
            onClick={handleResendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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
              "Resend Verification Email"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
