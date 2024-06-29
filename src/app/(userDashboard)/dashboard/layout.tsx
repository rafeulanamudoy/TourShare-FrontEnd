import { montserrat } from "@/app/styles/fonts";
import Sidebar from "@/components/dashboard/Sidebar";
import { getSingleUser } from "@/lib/actions/Server/user";

import Navbar from "@/components/dashboard/Navbar";
import { SocketProvider } from "@/socket/context/SocketContext";
import SocketListener from "@/socket/SocketListner";
import {
  getAllUserNotification,
  getStatusNotification,
} from "@/lib/actions/Server/notifications";
import { ENUM_NOTIFICATION_STATUS } from "@/enums/notification";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSingleUser();
  const { data: allNotifs } = await getAllUserNotification(user?.data?.email);
  const { data: unseenNotifs } = await getStatusNotification(
    user?.data?.email,
    ENUM_NOTIFICATION_STATUS.UNSEEN
  );
  console.log(allNotifs.length, "notifies length");
  return (
    <section className={`flex flex-row-reverse ${montserrat.className}`}>
      <div className="w-full bg-[#d8dcdd]">
        <Navbar
          allNotifications={allNotifs}
          unseenNotifications={unseenNotifs}
        />

        <div className="h-auto">{children}</div>
      </div>
      <div className="h-screen">
        <Sidebar />
      </div>
    </section>
  );
}
