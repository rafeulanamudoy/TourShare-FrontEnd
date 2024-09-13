"use client";

import { useRouter } from "next/navigation";

import React, { ReactNode } from "react";

interface UserMessageProps {
  children: ReactNode;
  email: string; // Define the type of the location prop
}

const TeamMessageButton = React.memo(
  ({ children, email }: UserMessageProps) => {
    const { push } = useRouter();
    return (
      <button className="" onClick={() => push(`/dashboard/messages/${email}`)}>
        {children}
      </button>
    );
  }
);
TeamMessageButton.displayName = "TeamMessageButton";

export default TeamMessageButton;
