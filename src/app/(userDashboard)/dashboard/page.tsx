"use client";
import {
  ENUM_NOTIFICATION_STATUS,
  ENUM_NOTIFICATION_TYPE,
} from "@/enums/notification";
import { useSocket } from "@/hooks/socket/useSocket";
import { addMessage } from "@/redux/features/messages/messagesSlice";
import { addNotification } from "@/redux/features/notifications/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSocketContext } from "@/socket/context/SocketContext";
import {
  MessageNotificationPayload,
  PrivateMessagePayload,
} from "@/types/ISocket";
import React, { useEffect } from "react";

export default function Dashboard() {
  return <div>dashboard</div>;
}
