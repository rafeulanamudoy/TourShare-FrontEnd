"use client";
import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
import { deleteSingleJoinTeam } from "@/lib/actions/Server/team";
import { deleteSingleUser } from "@/lib/actions/Server/user";
import { useAppSelector } from "@/redux/hooks";
import { useSocketContext } from "@/socket/context/SocketContext";

import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import toast from "react-hot-toast";
interface TeamDeleteIdProps {
  id: string;
  // Define the type of the location prop
}
export default function UserDeleteButton({ id }: TeamDeleteIdProps) {
  // console.log(location, "check location");

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) {
      return; // Don't proceed if not confirmed
    }

    try {
      const res = await deleteSingleUser(id);
      if (res.success) {
        toast.success(res.message);

        //console.log(res, "check delete  response");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("please try again");
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
