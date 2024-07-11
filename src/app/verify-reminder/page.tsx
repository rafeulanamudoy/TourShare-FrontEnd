"use client";
import { verifyEmail } from "@/lib/actions/Server/user";
import { useRouter } from "next/navigation";
import React from "react";

import toast from "react-hot-toast";

export default function VerifyReminder() {
  const router = useRouter();

  const handleResendEmail = async () => {
    // try {
    //   if (res.ok) {
    //     toast.success("Verification email sent!");
    //   } else {
    //     toast.error("Failed to send verification email.");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred. Please try again later.");
    // }
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
            onClick={handleResendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    </div>
  );
}
