"use client";
import React from "react";

import { useRouter } from "next/navigation";

interface UserJoinTeamProps {
  teamId: string;
}

export default function TeamDetailsButton({ teamId }: UserJoinTeamProps) {
  // console.log(location, "check location");
  const { push } = useRouter();
  return (
    <button
      className="border border-slate-600 submit-button  bg-[#FF914F] text-black      lg:w-[140px]"
      onClick={() => push(`/teamDetails/${teamId}/#details`)}
    >
      Details
    </button>
  );
}
