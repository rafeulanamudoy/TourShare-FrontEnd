"use client";

import {
  ENUM_NOTIFICATION_STATUS,
  ENUM_NOTIFICATION_TYPE,
} from "@/enums/notification";
import { addMessage } from "@/redux/features/messages/messagesSlice";
import {
  addNotification,
  setNotification,
} from "@/redux/features/notifications/notificationsSlice";

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
  }, [socket, dispatch]);

  return null;
}
