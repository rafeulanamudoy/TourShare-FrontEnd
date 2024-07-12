"use client";

import { useRouter } from "next/navigation";

import { ReactNode } from "react";

interface UserMessageProps {
  children: ReactNode;
  email: string; // Define the type of the location prop
}

export default function TeamMessageButton({
  children,
  email,
}: UserMessageProps) {
  const { push } = useRouter();
  return (
    <button className="" onClick={() => push(`/dashboard/messages/${email}`)}>
      {children}
    </button>
  );
}
