"use client";

import React, { ChangeEvent } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setToggoleRole } from "@/redux/features/toggle/toggleSlice";
import { ENUM_USER_ROLE } from "@/types/IUser";

interface RoleSelectProps {
  value: string;
}

export default function RoleSelect({ value }: RoleSelectProps) {
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as ENUM_USER_ROLE;
    dispatch(setToggoleRole(newStatus));
  };

  return (
    <select
      name="status"
      className="capitalize"
      defaultValue={value}
      onChange={handleChange}
    >
      <option value={ENUM_USER_ROLE.CUSTOMER}>Customer</option>

      <option value={ENUM_USER_ROLE.ADMIN}>Admin</option>
      <option value={ENUM_USER_ROLE.SUPER_ADMIN}>SuperAdmin</option>
    </select>
  );
}
