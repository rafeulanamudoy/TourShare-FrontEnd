"use client";

import { TeamStatus } from "@/src/types/ICreateTeam";
import { useRouter } from "next/navigation";
interface UserJoinTeamProps {
  teamId: string;
  status: string; // Define the type of the location prop
}
export default function JoinTeamButton({ teamId, status }: UserJoinTeamProps) {
  const { push } = useRouter();
  return (
    <button
      className="border border-slate-600 submit-button bg-white text-black       lg:w-[140px] w-[120px]"
      onClick={() => push(`/joinTeam/?joinId=${teamId}#joinTeam`)}
    >
      {status === TeamStatus.Ongoing ? "join" : "closed"}
    </button>
  );
}
