"use client";

import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
import { acceptJoinTeam, getSingleJoinTeam } from "@/lib/actions/Server/team";
import { useAppSelector } from "@/redux/hooks";
import { useSocketContext } from "@/socket/context/SocketContext";
import { IAccept } from "@/types/ICreateTeam";
import toast from "react-hot-toast";

interface UserJoinTeamProps {
  payload: IAccept; // Define the type of the location prop
}

export default function TeamAcceptButton({ payload }: UserJoinTeamProps) {
  const state = useAppSelector((state) => state.toggle.requestValue);
  const { sendTeamRequest } = useSocketContext();
  const handleAccept = async () => {
    const requestValue = {
      members: payload.members,
      joinTeamId: payload.joinTeamId,
      status: state,
    };
    if (payload.teamId && requestValue) {
      try {
        const res = await acceptJoinTeam(payload?.teamId, requestValue);

        if (res.success && payload.joinTeamEmail) {
          const timestamp = new Date().toISOString();
          toast.success(res?.message);
          sendTeamRequest(
            payload.joinTeamEmail,
            `${res?.data?.teamName} ${state} your team`,
            ENUM_NOTIFICATION_TYPE.JOINTEAMSTATUSUPDATE,
            state,
            timestamp
          );
          // sendTeamRequest()
          console.log(res, "check response ");
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
