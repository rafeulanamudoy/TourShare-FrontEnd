import { getSingleUser } from "@/src/lib/actions/Server/user";
import { ImessageResponse } from "@/src/types/IMessage";
import { formatTimestamp } from "@/src/utilities/TimeFormat";
import React from "react";

type IChats = {
  messages: {
    data: ImessageResponse[];
  };
};

export default async function ChattingHistory({ messages }: IChats) {
  const user = await getSingleUser();

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
          <p className="mb-1 2xl:text-xl xl:text-base lg:text-xs md:text-[10x] sm:text-[8px] text-[6px]">
            {message.message}
          </p>
          <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
            {message.sender}
          </span>
          <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
            {formatTimestamp(message.createdAt)}
          </span>
        </div>
      ))}
    </div>
  );
}
