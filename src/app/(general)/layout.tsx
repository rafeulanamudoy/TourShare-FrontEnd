import Banner from "@/shared/Banner";
import Header from "@/shared/Header";
import { roboto } from "../styles/fonts";
import { Suspense } from "react";

export default function BaseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`${roboto.className}`}>
      <Header />

      <Banner />

      {children}
    </section>
  );
}
