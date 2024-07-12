"use client";

import { ENUM_NOTIFICATION_TYPE } from "@/src/enums/notification";
import { deleteSingleJoinTeam } from "@/src/lib/actions/Server/team";
import { useAppSelector } from "@/src/redux/hooks";
import { useSocketContext } from "@/src/socket/context/SocketContext";
import { showToast } from "@/src/utilities/ToastOptions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TeamDeleteIdProps {
  id: string;
  teamEmail: string; // Define the type of the location prop
}
export default function JoinTeamDeleteButton({
  id,
  teamEmail,
}: TeamDeleteIdProps) {
  // console.log(location, "check location");

  const { sendJoinTeamRequest } = useSocketContext();
  const { email } = useAppSelector((state) => state.auth.user);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) {
      return; // Don't proceed if not confirmed
    }

    try {
      const res = await deleteSingleJoinTeam(id);
      if (res.success) {
        showToast("success", res.message);

        const timestamp = new Date().toISOString();
        //console.log(res, "check delete  response");
        sendJoinTeamRequest(
          teamEmail,
          `${email} cancel the request to join with your team`,
          ENUM_NOTIFICATION_TYPE.JOINTEAMREQUESTSTATUS,
          timestamp
        );
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      showToast("error", "Something Went Wrong Please Try Again!");
    }
  };
  return (
    <button onClick={handleDelete}>
      <FontAwesomeIcon
        style={{
          width: "1.5em",
          height: "2em",

          color: "red",
        }}
        icon={faTrash}
      ></FontAwesomeIcon>
    </button>
  );
}
