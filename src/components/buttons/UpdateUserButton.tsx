"use client";

import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
import { useUserData } from "@/hooks/user/user";
import { acceptJoinTeam, getSingleJoinTeam } from "@/lib/actions/Server/team";
import { updateSingleUser } from "@/lib/actions/Server/user";
import { useAppSelector } from "@/redux/hooks";
import { useSocketContext } from "@/socket/context/SocketContext";
import { IAccept } from "@/types/ICreateTeam";
import { IUserSchema } from "@/types/IUser";
import { override2 } from "@/utilities/css";
// import { UseDynamicLoaderSize } from "@/utilities/UseDynamicLoaderSize";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface UserProps {
  payload: Partial<IUserSchema>; // Define the type of the location prop
}

export default function UpdateUserButton({ payload }: UserProps) {
  const role = useAppSelector((state) => state.toggle.roleValue);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // const loaderSize = UseDynamicLoaderSize(buttonRef);
  const handleUpdateRole = async () => {
    const formData = new FormData();
    if (payload.role) {
      formData.append("role", role);
    }
    try {
      setLoading(true);
      if (payload._id && payload.role) {
        const response = await updateSingleUser(
          formData,
          payload._id,
          payload.role
        );
        if (response.success) {
          toast.success("user role updated successfully");
        }
      }
    } catch (error) {
      toast.error("an error occuredplease refresh the page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        className="bg-[#FF914F] hover:bg-[#9b5f3a] text-black font-bold py-2 px-4 rounded"
        onClick={handleUpdateRole}
      >
        {loading ? (
          <ClipLoader
            loading={loading}
            cssOverride={override2}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "Update"
        )}
      </button>
    </div>
  );
}
