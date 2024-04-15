import { montserrat } from "@/app/styles/fonts";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={` flex flex-row-reverse   ${montserrat.className}`}>
      <div
        className="  w-full    h-screen 
      "
      >
        <div className=" ">
          <Navbar />
        </div>
        <div className="">{children}</div>
      </div>
      <div className={"   "}>
        <Sidebar />
      </div>
    </section>
  );
}
