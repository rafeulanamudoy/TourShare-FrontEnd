import {
  getSingleJoinTeam,
  getSingleTeamByEmail,
} from "@/lib/actions/Server/team";
import { getSingleUser } from "@/lib/actions/Server/user";
import { IJoinPerson } from "@/types/IJoinTeam";

import React from "react";
import ChatList from "./ChatList";

export default async function ChatLists() {
  const user = await getSingleUser();

  let convirstationList: IJoinPerson[] = [];

  if (!user?.data?.email) {
    return <div>No user found.</div>;
  }

  const team = await getSingleTeamByEmail(user?.data?.email);

  const joinTeam = await getSingleJoinTeam(user?.data?.email);

  if (team?.data?.joinPeople) {
    convirstationList = team?.data?.joinPeople;
  } else {
    convirstationList = [{ joinTeamId: joinTeam?.data?.teamInfo }];
  }

  return (
    <div className="w-1/3 md:border-r-2  border-black p-4  2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px]      md:h-[calc(100vh-144px)]">
      <ChatList conversations={convirstationList} />
    </div>
  );
}
