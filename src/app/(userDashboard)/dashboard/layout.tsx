import { montserrat } from "@/app/styles/fonts";

import { getSingleUser } from "@/lib/actions/Server/user";

import {
  getAllUserNotification,
  getStatusNotification,
} from "@/lib/actions/Server/notifications";
import { ENUM_NOTIFICATION_STATUS } from "@/enums/notification";
import DashNavBar from "@/components/DashBoard/DashNavBar";
import DashSideBar from "@/components/DashBoard/DashSideBar";

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

  return (
    <section className={`flex flex-row-reverse ${montserrat.className}`}>
      <div className="w-full bg-[#d8dcdd]">
        <DashNavBar
          allNotifications={allNotifs}
          unseenNotifications={unseenNotifs}
        />

        <div className="h-auto">{children}</div>
      </div>
      <div className="h-screen">
        <DashSideBar />
      </div>
    </section>
  );
}
