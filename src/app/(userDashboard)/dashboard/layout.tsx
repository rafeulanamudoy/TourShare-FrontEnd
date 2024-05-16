import { montserrat } from "@/app/styles/fonts";
import SkeletonLoading from "@/components/Loader/SkeletionLoading";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Suspense } from "react";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`  flex flex-row-reverse   ${montserrat.className}`}>
      <div
        className="  w-full    bg-[#d8dcdd]  
      "
      >
        <Navbar />

        <div className="h-auto ">{children}</div>
      </div>
      <div className={" h-screen   "}>
        <Sidebar />
      </div>
    </section>
  );
}
