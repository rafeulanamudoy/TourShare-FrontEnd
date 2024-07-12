"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useSocketContext } from "./context/SocketContext";
import {
  MessageNotificationPayload,
  PrivateMessagePayload,
} from "../types/ISocket";
import { addMessage } from "../redux/features/messages/messagesSlice";
import { addNotification } from "../redux/features/notifications/notificationsSlice";
import { ENUM_NOTIFICATION_STATUS } from "../enums/notification";

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

      const handleNotification = ({
        from,
        message,
        timestamp,
        _id,
        type,
      }: MessageNotificationPayload) => {
        dispatch(
          addNotification({
            _id: _id,
            sender: from,
            message,
            type: type,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
            createdAt: timestamp,
          })
        );
      };

      const handleTeamRequest = ({
        from,
        message,
        timestamp,
        _id,
        type,
      }: MessageNotificationPayload) => {
        dispatch(
          addNotification({
            _id: _id,
            sender: from,
            message,
            type: type,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
            createdAt: timestamp,
          })
        );
      };

      const handleJoinTeamRequest = ({
        from,
        message,
        timestamp,
        _id,
        type,
      }: MessageNotificationPayload) => {
        dispatch(
          addNotification({
            _id: _id,
            sender: from,
            message,
            type: type,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
            createdAt: timestamp,
          })
        );
      };

      const handleUpdateCreateTeam = ({
        from,
        message,
        timestamp,
        _id,
        type,
      }: MessageNotificationPayload) => {
        dispatch(
          addNotification({
            _id: _id,
            sender: from,
            message,
            type: type,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
            createdAt: timestamp,
          })
        );
      };

      const handleDeleteCreateTeam = ({
        from,
        message,
        timestamp,
        _id,
        type,
      }: MessageNotificationPayload) => {
        dispatch(
          addNotification({
            _id: _id,
            sender: from,
            message,
            type: type,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
            createdAt: timestamp,
          })
        );
      };

      socket.on("privateMessage", handlePrivateMessage);
      socket.on("notification", handleNotification);
      socket.on("teamRequest", handleTeamRequest);
      socket.on("JoinTeamRequest", handleJoinTeamRequest);
      socket.on("updateCreateTeam", handleUpdateCreateTeam);
      socket.on("deleteCreateTeam", handleDeleteCreateTeam);

      return () => {
        socket.off("privateMessage", handlePrivateMessage);
        socket.off("notification", handleNotification);
        socket.off("teamRequest", handleTeamRequest);
        socket.off("JoinTeamRequest", handleJoinTeamRequest);
        socket.off("updateCreateTeam", handleUpdateCreateTeam);
        socket.off("deleteCreateTeam", handleDeleteCreateTeam);
      };
    }
    return undefined; // Explicitly return undefined if socket is undefined
  }, [socket, dispatch]);

  return null;
}
