"use client";

import { useSocket } from "@/hooks/socket/useSocket";
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
  const { socket, sendPrivateMessage } = useSocket(user.email);

  const [messages, setMessages] = useState<{
    [email: string]: { id: number; sender: string; message: string }[];
  }>({});

  console.log(messages, "messages");
  const messageInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (socket) {
      //console.log(socket.id, "check user");
      socket.on("privateMessage", ({ from, message }) => {
        // console.log(from, message);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [from]: [
            ...(prevMessages[from] || []),
            {
              id: (prevMessages[from]?.length || 0) + 1,
              sender: from,
              message,
            },
          ],
        }));
      });

      return () => {
        socket.off("privateMessage");
      };
    }
  }, [socket]);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInputRef.current) {
      const message = messageInputRef.current.value;
      sendPrivateMessage(recepient, message);

      setMessages((prevMessages) => ({
        ...prevMessages,
        [recepient]: [
          ...(prevMessages[recepient] || []),
          {
            id: (prevMessages[recepient]?.length || 0) + 1,
            sender: user.email,
            message,
          },
        ],
      }));

      messageInputRef.current.value = ""; // Clear the input field
    }
  };
  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4 h-full overflow-y-auto">
        {children}
        {(messages[recepient] || []).map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg max-w-xs  ${
              message.sender === user.email
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200 text-black"
            }`}
          >
            <p className="mb-1">{message.message}</p>
            <span className={` text-xs`}>{message.sender}</span>
          </div>
        ))}
      </div>
      <div className=" mt-4">
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
