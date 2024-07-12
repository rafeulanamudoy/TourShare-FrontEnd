"use client";

import { updateSingleUser } from "@/lib/actions/Server/user";
import { useAppSelector } from "@/redux/hooks";

import { IUserSchema } from "@/types/IUser";
import { override2 } from "@/utilities/css";
import { showToast } from "@/utilities/ToastOptions";
import { UseDynamicLoading } from "@/utilities/UseDynamicLoading";

import { useRef, useState } from "react";

import { ClipLoader } from "react-spinners";

interface UserProps {
  payload: Partial<IUserSchema>; // Define the type of the location prop
}

export default function UpdateUserButton({ payload }: UserProps) {
  const role = useAppSelector((state) => state.toggle.roleValue);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);
  const handleUpdateRole = async () => {
    const formData = new FormData();
    if (payload.role) {
      formData.append("role", role);
    }
    try {
      setLoading(true);
      if (payload._id && payload.role) {
        const res = await updateSingleUser(formData, payload._id, payload.role);
        if (res.success) {
          showToast("success", res?.message);
        } else {
          showToast("error", res.message);
        }
      }
    } catch (error) {
      showToast("error", "an error occurred. please try again later");
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
            size={loaderSize}
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
