"use client";

import { acceptJoinTeam } from "@/lib/actions/Server/team";
import { useAppSelector } from "@/redux/hooks";
import { IAccept } from "@/types/ICreateTeam";
import toast from "react-hot-toast";

interface UserJoinTeamProps {
  payload: IAccept; // Define the type of the location prop
}

export default function TeamAcceptButton({ payload }: UserJoinTeamProps) {
  const state = useAppSelector((state) => state.toggle.requestValue);
  const handleAccept = async () => {
    const requestValue = {
      members: payload.members,
      joinTeamId: payload.joinTeamId,
      status: state,
    };
    if (payload.teamId && requestValue) {
      try {
        const res = await acceptJoinTeam(payload?.teamId, requestValue);
        if (res.success) {
          toast.success(res?.message);
        } else {
          const errorMessage = res?.message || "Error message not available";
          toast.error(errorMessage);
        }
      } catch (error) {
        //console.log(error, "check error ");
        toast.error("an error occuredplease refresh the page");
      }
    }
  };

  return (
    <div>
      <button
        className="bg-[#FF914F] hover:bg-[#9b5f3a] text-black font-bold py-2 px-4 rounded"
        onClick={handleAccept}
      >
        Confirm
      </button>
    </div>
  );
}
