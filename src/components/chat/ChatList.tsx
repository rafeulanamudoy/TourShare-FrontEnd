"use client";
import { IJoinPerson } from "@/types/IJoinTeam";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
export type Iconversation = {
  conversations: IJoinPerson[];
};
export default function ChatList({ conversations }: Iconversation) {
  // console.log(selectedConversation);
  const router = useRouter();
  const pathname = usePathname();
  //console.log(pathname);
  const isActive = (path: string) => path === pathname;
  return (
    <div className=" md:border-b-0 border-b-2 md:w-full  w-screen md:text-start  text-center">
      <h2 className="   font-bold mb-4">Conversations List</h2>
      <ul className="grid gap-y-4">
        {conversations?.map((conversation: IJoinPerson) => (
          <li
            key={conversation?.joinTeamId?._id}
            className={`   cursor-pointer hover:bg-gray-100 ${
              isActive(`/dashboard/messages/${conversation?.joinTeamId?.email}`)
                ? "bg-[#FFFFFF] "
                : ""
            }`}
            onClick={() =>
              router.push(
                `/dashboard/messages/${conversation?.joinTeamId?.email}`
              )
            }
          >
            <h3 className="2xl:text-xl xl:text-base lg:text-xs  md:text-[10x] sm:text-[8px] text-[6px] font-semibold">
              {conversation?.joinTeamId?.email}
            </h3>
            <p className="text-sm text-gray-500">
              {/* {conversation.lastMessage} */}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
