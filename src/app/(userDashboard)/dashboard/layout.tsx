import Header from "@/shared/Header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>dashboard layout</h1>

      {children}
    </section>
  );
}
