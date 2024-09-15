import { getAllUserNotification } from "@/src/lib/actions/Server/notifications";
import { getSingleUser } from "@/src/lib/actions/Server/user";
import { montserrat } from "../../styles/fonts";
import DashNavBar from "@/src/components/DashBoard/DashNavBar";
import DashSideBar from "@/src/components/DashBoard/DashSideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSingleUser();
  const { data: allNotifs } = await getAllUserNotification(user?.data?.email);

  return (
    <section className={`flex flex-row-reverse ${montserrat.className}`}>
      <div className="w-full bg-[#d8dcdd]">
        <DashNavBar allNotifications={allNotifs} user={user?.data} />

        <div className="h-auto">{children}</div>
      </div>
      <div className="h-screen">
        <DashSideBar role={user?.data?.role} />
      </div>
    </section>
  );
}
