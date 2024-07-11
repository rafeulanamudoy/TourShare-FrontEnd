"use client";

import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
import { deleteSingleTeam } from "@/lib/actions/Server/team";
import { useAppSelector } from "@/redux/hooks";
import { useSocketContext } from "@/socket/context/SocketContext";
import { IJoinTeam } from "@/types/IJoinTeam";
import { showToast } from "@/utilities/ToastOptions";

import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TeamDeleteIdProps {
  id: string;
  // Define the type of the location prop
}
export default function TeamDeleteButton({ id }: TeamDeleteIdProps) {
  // console.log(location, "check location");

  const { email } = useAppSelector((state) => state.auth.user);
  const { sendDeleteCreateTeamNotifiy } = useSocketContext();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) {
      return; // Don't proceed if not confirmed
    }

    try {
      let joinPeopleEmail: any[] = [];
      const res = await deleteSingleTeam(id);
      if (res?.data?.joinPeople?.length > 0) {
        // console.log(createTeam, "create team");
        res.data.joinPeople.map((people: { joinTeamId: IJoinTeam }) =>
          joinPeopleEmail.push(people?.joinTeamId?.email)
        );
      }
      if (res.success) {
        const timestamp = new Date().toISOString();
        joinPeopleEmail.length > 0 &&
          sendDeleteCreateTeamNotifiy(
            joinPeopleEmail,
            `${res?.data?.teamName} has deleted  his team`,
            ENUM_NOTIFICATION_TYPE.DELETECREATETEAM,
            timestamp
          );
        showToast("success", res?.message);
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      showToast("error", "an error occurred. please try again later");
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
