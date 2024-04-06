import Banner from "@/shared/Banner";
import Header from "@/shared/Header";

export default function BaseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <Banner />

      {children}
    </section>
  );
}
