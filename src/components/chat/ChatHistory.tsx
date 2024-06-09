// components/chat/ChatHistory.tsx
import React from "react";
import { ImessageResponse } from "@/types/IMessage";
import { getSingleUser } from "@/lib/actions/Server/user";

type IChats = {
  messages: {
    data: ImessageResponse[];
  };
};

export default async function ChatHistory({ messages }: IChats) {
  const user = await getSingleUser();
  // console.log(user.data.email);
  return (
    <div className="flex flex-col space-y-4">
      {messages.data.map((message) => (
        <div
          key={message._id}
          className={`p-4 rounded-lg max-w-xs ${
            message.sender === user.data.email
              ? "self-end bg-blue-500 text-white"
              : "self-start bg-gray-200 text-black"
          }`}
        >
          <p className="mb-1">{message.message}</p>
          <span className={` text-xs`}>{message.sender}</span>
        </div>
      ))}
    </div>
  );
}
