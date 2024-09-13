"use client";
import React from "react";

import { useRouter } from "next/navigation";

interface UserJoinTeamProps {
  teamId: string;
}

const TeamDetailsButton = React.memo(({ teamId }: UserJoinTeamProps) => {
  const { push } = useRouter();
  return (
    <button
      className="border border-slate-600 submit-button  bg-[#FF914F] text-black      lg:w-[140px] w-[120px]"
      onClick={() => push(`/teamDetails/${teamId}/#details`)}
    >
      Details
    </button>
  );
});
TeamDetailsButton.displayName = "TeamDetailsButton";

export default TeamDetailsButton;
