"use client";

import { useSocket } from "@/hooks/socket/useSocket";
import { createMessage } from "@/lib/actions/Server/messages";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";

type IRecepient = {
  recepient: string;
};

export default function ChatComponent({
  recepient,
  children,
}: React.PropsWithChildren<IRecepient>) {
  const user = useAppSelector((state) => state.auth.user);
  const { socket, sendPrivateMessage, isConnected, transport } = useSocket(
    user.email
  );
  const [notifications, setNotifications] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    {
      id: number;
      sender: string;
      message: string;
      timestamp: string;
    }[]
  >([]);

  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on("privateMessage", ({ from, message, timestamp }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            sender: from,
            message,
            timestamp,
          },
        ]);
      });

      socket.on("messageNotification", ({ from, message }) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          `${from} sends you a message`,
        ]);
      });

      return () => {
        socket.off("privateMessage");
        socket.off("messageNotification");
      };
    }
  }, [socket]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInputRef.current) {
      const message = messageInputRef.current.value;
      const timestamp = new Date().toISOString();
      sendPrivateMessage(recepient, message, timestamp);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: user.email,
          message,
          timestamp,
        },
      ]);

      messageInputRef.current.value = "";
      try {
        await createMessage({
          sender: user.email,
          message: message,
          recipient: recepient,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${dateString} at ${timeString}`;
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto flex flex-col space-y-4 mb-4">
        {children}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg max-w-xs ${
              message.sender === user.email
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200 text-black"
            } `}
          >
            <p className="mb-1 2xl:text-xl xl:text-base lg:text-xs md:text-[10px] sm:text-[8px] text-[6px]">
              {message.message}
            </p>
            <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
              {message.sender}
            </span>
            <span className="block 2xl:text-base xl:text-xs lg:text-[10px] md:text-[8px] sm:text-[6px] text-[4px]">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0">
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center 2xl:text-xl xl:text-base lg:text-xs md:text-[10px] sm:text-[8px] text-[6px]"
        >
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
      <div className="absolute top-0 right-0 p-4">
        {notifications.map((notification, index) => (
          <div key={index} className="mb-2 p-2 bg-yellow-200 rounded-lg">
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
}
