"use client";

import React, { ChangeEvent } from "react";
import { useAppDispatch } from "../redux/hooks";
import { ENUM_JOIN_TEAM_STATUS } from "../types/ICreateTeam";
import { setToggleTeamRequest } from "../redux/features/toggle/toggleSlice";

interface StatusSelectProps {
  value: string;
}

export default function StatusSelect({ value }: StatusSelectProps) {
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as ENUM_JOIN_TEAM_STATUS;
    dispatch(setToggleTeamRequest(newStatus));
  };

  return (
    <select
      name="status"
      className="capitalize"
      defaultValue={value}
      onChange={handleChange}
    >
      <option value={ENUM_JOIN_TEAM_STATUS.ACCEPTED}>Accept</option>
      <option value={ENUM_JOIN_TEAM_STATUS.NOTACCEPTED}>Reject</option>
      <option value={ENUM_JOIN_TEAM_STATUS.PENDING}>Pending</option>
    </select>
  );
}
