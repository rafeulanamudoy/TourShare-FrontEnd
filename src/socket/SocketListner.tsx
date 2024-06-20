"use client";

import {
  ENUM_NOTIFICATION_STATUS,
  ENUM_NOTIFICATION_TYPE,
} from "@/enums/notification";
import { addMessage } from "@/redux/features/messages/messagesSlice";
import { addNotification } from "@/redux/features/notifications/notificationsSlice";

import {
  MessageNotificationPayload,
  PrivateMessagePayload,
} from "@/types/ISocket";
import React, { useEffect } from "react";
import { useSocketContext } from "./context/SocketContext";
import { useAppDispatch } from "@/redux/hooks";

export default function SocketListener() {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socket) {
      const handlePrivateMessage = ({
        from,
        message,
        timestamp,
      }: PrivateMessagePayload) => {
        dispatch(
          addMessage({
            _id: Date.now().toString(),
            sender: from,
            message,
            createdAt: timestamp,
          })
        );
      };

      const handleMessageNotification = ({
        from,
        message,
      }: MessageNotificationPayload) => {
        dispatch(
          addNotification({
            _id: Date.now().toString(),
            sender: from,
            message,
            type: ENUM_NOTIFICATION_TYPE.PRIVATEMESSAGE,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
          })
        );
      };

      socket.on("privateMessage", handlePrivateMessage);
      socket.on("messageNotification", handleMessageNotification);

      return () => {
        socket.off("privateMessage", handlePrivateMessage);
        socket.off("messageNotification", handleMessageNotification);
      };
    }
  }, [socket, dispatch]);

  return null;
}
