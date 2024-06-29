"use client";

import { useRouter } from "next/navigation";

import { ReactNode } from "react";
import toast from "react-hot-toast";

interface UserMessageProps {
  children: ReactNode;
  email: string; // Define the type of the location prop
}

export default function TeamMessageButton({
  children,
  email,
}: UserMessageProps) {
  // console.log(location, "check location");
  const { push } = useRouter();
  return (
    <button className="" onClick={() => push(`/dashboard/messages/${email}`)}>
      {children}
    </button>
  );
}
