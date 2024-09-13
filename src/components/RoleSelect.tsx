"use client";

import React, { ChangeEvent } from "react";
import { useAppDispatch } from "../redux/hooks";
import { ENUM_USER_ROLE } from "../types/IUser";
import { setToggoleRole } from "../redux/features/toggle/toggleSlice";

interface RoleSelectProps {
  value: string;
}

const RoleSelect = React.memo(({ value }: RoleSelectProps) => {
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
});
RoleSelect.displayName = "RoleSelect";

export default RoleSelect;
