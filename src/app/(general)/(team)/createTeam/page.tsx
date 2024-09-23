import TeamCreate from "@/src/components/FormComponent/TeamCreate";
import { getSingleUser } from "@/src/lib/actions/Server/user";

import React from "react";

export default async function page() {
  const user = await getSingleUser();
  const { email, phoneNumber } = user.data;

  return (
    <div>
      <main>
        <TeamCreate email={email} phoneNumber={phoneNumber} />
      </main>
    </div>
  );
}
