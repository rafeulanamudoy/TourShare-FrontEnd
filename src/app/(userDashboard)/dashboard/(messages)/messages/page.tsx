import {
  ENUM_NOTIFICATION_STATUS,
  ENUM_NOTIFICATION_TYPE,
} from "@/enums/notification";
import { useSocket } from "@/hooks/socket/useSocket";
import { getMessages } from "@/lib/actions/Server/messages";
import { addMessage } from "@/redux/features/messages/messagesSlice";
import { addNotification } from "@/redux/features/notifications/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  MessageNotificationPayload,
  PrivateMessagePayload,
} from "@/types/ISocket";
import React, { useEffect } from "react";

export default function Message() {
  // const user = useAppSelector((state) => state.auth.user);
  // const dispatch = useAppDispatch();
  // const { socket, sendPrivateMessage, isConnected } = useSocket(user.email);

  // useEffect(() => {
  //   if (socket) {
  //     const handlePrivateMessage = ({
  //       from,
  //       message,
  //       timestamp,
  //     }: PrivateMessagePayload) => {
  //       dispatch(
  //         addMessage({
  //           _id: Date.now().toString(),
  //           sender: from,
  //           message,
  //           createdAt: timestamp,
  //         })
  //       );
  //       console.log(from, message, "checking who sent the message");
  //     };

  //     const handleMessageNotification = ({
  //       from,
  //       message,
  //     }: MessageNotificationPayload) => {
  //       dispatch(
  //         addNotification({
  //           _id: Date.now().toString(),
  //           sender: from,
  //           message,
  //           type: ENUM_NOTIFICATION_TYPE.PRIVATEMESSAGE,
  //           status: ENUM_NOTIFICATION_STATUS.UNSEEN,
  //         })
  //       );
  //     };

  //     socket.on("privateMessage", handlePrivateMessage);
  //     socket.on("messageNotification", handleMessageNotification);

  //     return () => {
  //       socket.off("privateMessage", handlePrivateMessage);
  //       socket.off("messageNotification", handleMessageNotification);
  //     };
  //   }
  // }, [socket, dispatch]);
  return <div>Start Convirsation</div>;
}
