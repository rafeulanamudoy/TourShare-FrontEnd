"use client";

import { TeamStatus } from "@/types/ICreateTeam";
import { useRouter } from "next/navigation";
interface UserJoinTeamProps {
  teamId: string;
  status: string; // Define the type of the location prop
}
export default function JoinTeamButton({ teamId, status }: UserJoinTeamProps) {
  // console.log(location, "check location");
  const { push } = useRouter();
  return (
    <button
      className="border border-slate-600 submit-button       lg:w-[140px]"
      onClick={() => push(`joinTeam/?joinId=${teamId}`)}
    >
      {status === TeamStatus.Ongoing ? "join" : "closed"}
    </button>
  );
}
