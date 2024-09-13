import Header from "@/src/shared/Header";
import { roboto } from "../styles/fonts";
import Banner from "@/src/shared/Banner";
import Footer from "@/src/shared/Footer";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`${roboto.className}`}>
      <Header />

      <Banner />

      {children}
      <Footer />
    </section>
  );
}
