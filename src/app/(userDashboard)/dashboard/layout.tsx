import { montserrat } from "@/app/styles/fonts";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { getUserFromCookie } from "@/lib/actions/Server/cookies";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();

  if (!user?.userEmail) {
    redirect("/signIn");
  }
  return (
    <section className={`  flex flex-row-reverse   ${montserrat.className}`}>
      <div
        className="  w-full    bg-[#d8dcdd]  
      "
      >
        <div className=" ">
          <Navbar />
        </div>
        <div className="h-auto ">{children}</div>
      </div>
      <div className={" h-screen   "}>
        <Sidebar />
      </div>
    </section>
  );
}
