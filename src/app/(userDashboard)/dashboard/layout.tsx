import { montserrat } from "@/app/styles/fonts";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ENUM_NOTIFICATION_STATUS,
  ENUM_NOTIFICATION_TYPE,
} from "@/enums/notification";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage } from "@/redux/features/messages/messagesSlice";
import { addNotification } from "@/redux/features/notifications/notificationsSlice";
import {
  SocketProvider,
  useSocketContext,
} from "@/socket/context/SocketContext";
import {
  PrivateMessagePayload,
  MessageNotificationPayload,
} from "@/types/ISocket";
import { useEffect } from "react";
import type { AppDispatch } from "@/redux/store"; // Adjust the path to where your store is defined
import SocketListener from "@/socket/SocketListner";
import { getSingleUser } from "@/lib/actions/Server/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSingleUser();
  return (
    <SocketProvider email={user.data.email}>
      <SocketListener />
      <section className={`flex flex-row-reverse ${montserrat.className}`}>
        <div className="w-full bg-[#d8dcdd]">
          <Navbar />
          <div className="h-auto">{children}</div>
        </div>
        <div className="h-screen">
          <Sidebar />
        </div>
      </section>
    </SocketProvider>
  );
}
