"use client";
import { IJoinPerson } from "@/types/IJoinTeam";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export type Iconversation = {
  conversations: IJoinPerson[];
};
export default function ChatList({ conversations }: Iconversation) {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  console.log(selectedConversation);
  const router = useRouter();
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Conversations</h2>
      <ul>
        {conversations?.map((conversation: IJoinPerson) => (
          <li
            key={conversation?.joinTeamId?._id}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedConversation === conversation?.joinTeamId?._id
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() =>
              router.push(
                `/dashboard/messages/${conversation?.joinTeamId?.email}`
              )
            }
          >
            <h3 className="text-lg font-semibold">
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
