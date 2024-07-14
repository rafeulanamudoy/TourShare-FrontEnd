"use client";

import { ENUM_NOTIFICATION_TYPE } from "@/src/enums/notification";
import { addMessage } from "@/src/redux/features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useSocketContext } from "@/src/socket/context/SocketContext";
import { formatTimestamp } from "@/src/utilities/TimeFormat";
import React, { useEffect, useRef } from "react";

type IRecipient = {
  recipient: string;
};

export default function ChattingComponent({
  recipient,
  children,
}: React.PropsWithChildren<IRecipient>) {
  const user = useAppSelector((state) => state.auth.user);
  const messages = useAppSelector((state) => state.messages.messages);
  const dispatch = useAppDispatch();
  const { sendPrivateMessage, sendUserNotification } = useSocketContext();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the end of messages container

  // Function to scroll messages container to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Effect to scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInputRef.current) {
      const message = messageInputRef.current.value;

      const _id = Date.now().toString();
      const timestamp = new Date().toISOString();
      const type = ENUM_NOTIFICATION_TYPE.PRIVATEMESSAGE;
      sendPrivateMessage(recipient, message, timestamp);
      sendUserNotification(recipient, message, type, timestamp, _id);

      dispatch(
        addMessage({
          _id: Date.now().toString(),
          sender: user.email,
          message,
          createdAt: timestamp,
        })
      );

      messageInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto flex flex-col space-y-4 mb-4">
        {children}
        {messages?.map((message) => (
          <div
            key={message?._id}
            className={`p-4 rounded-lg max-w-xs ${
              message.sender === user.email
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200 text-black"
            }`}
          >
            <p className="mb-1 2xl:text-xl xl:text-lg lg:text-base text-sm">
              {message.message}
            </p>
            <span className="block 2xl:text-lg xl:text-base lg:text-sm text-sm">
              {message.sender}
            </span>
            <span className="block 2xl:text-lg xl:text-base lg:text-sm text-sm">
              {formatTimestamp(message.createdAt)}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />{" "}
        {/* This empty div is used to scroll to bottom */}
      </div>
      <div className="sticky bottom-0 bg-white w-full border-t border-gray-300 py-2 px-4 placeholder:text-xs lg:text-xl md:text-base text-xs">
        <form onSubmit={handleFormSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Type..."
            className="flex-1 border-2 border-gray-300 p-2 rounded-lg mr-2"
            ref={messageInputRef}
            style={{ maxWidth: "calc(100% - 90px)" }} // Adjust input width to fit with button
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            style={{ minWidth: "80px" }} // Fixed width for the send button
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
