import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="  flex">
      <div className={"   "}>
        <Sidebar />
      </div>

      <div className=" w-full">
        <div>
          <Navbar />
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
