"use client";
import {
  ENUM_NOTIFICATION_STATUS,
  ENUM_NOTIFICATION_TYPE,
} from "@/enums/notification";

import { createMessage, getMessages } from "@/lib/actions/Server/messages";
import {
  addMessage,
  setMessages,
} from "@/redux/features/messages/messagesSlice";
import { addNotification } from "@/redux/features/notifications/notificationsSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSocketContext } from "@/socket/context/SocketContext";
import { formatTimestamp } from "@/utilities/TimeFormat";
import React, { useEffect, useRef, useState } from "react";

type IRecepient = {
  recepient: string;
};

export default function ChatComponent({
  recepient,
  children,
}: React.PropsWithChildren<IRecepient>) {
  const user = useAppSelector((state) => state.auth.user);
  const messages = useAppSelector((state) => state.messages.messages);
  const dispatch = useAppDispatch();
  const { sendPrivateMessage, sendUserNotification } = useSocketContext();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the end of messages container

  console.log("check chat component");

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
      sendPrivateMessage(recepient, message, timestamp);
      sendUserNotification(recepient, message, type, timestamp, _id);

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
            } `}
          >
            <p className="mb-1">{message.message}</p>
            <span className="block ">{message.sender}</span>
            <span className="block">{formatTimestamp(message.createdAt)}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />{" "}
        {/* This empty div is used to scroll to bottom */}
      </div>
      <div className="sticky bottom-0">
        <form onSubmit={handleFormSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border-2 border-gray-300 p-2 rounded-lg"
            ref={messageInputRef}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
