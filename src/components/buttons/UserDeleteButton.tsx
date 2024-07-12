"use client";

import { deleteSingleUser } from "@/lib/actions/Server/user";

import { showToast } from "@/utilities/ToastOptions";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TeamDeleteIdProps {
  id: string;
}
export default function UserDeleteButton({ id }: TeamDeleteIdProps) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) {
      return;
    }

    try {
      const res = await deleteSingleUser(id);
      if (res.success) {
        showToast("success", res.message);
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
