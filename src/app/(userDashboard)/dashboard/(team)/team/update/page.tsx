import UpdateTeam from "@/components/formComponent/UpdateTeam";
import { getSingleTeam } from "@/lib/actions/Server/team";
import { getSingleUser } from "@/lib/actions/Server/user";
import React from "react";

export default async function page() {
  const {
    data: { email },
  } = await getSingleUser();

  const team = await getSingleTeam(email);

  return (
    <div className="my-10">
      <UpdateTeam team={team?.data} />
    </div>
  );
}
