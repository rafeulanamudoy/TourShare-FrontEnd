import Header from "@/src/shared/Header";
import { roboto } from "../styles/fonts";
import Banner from "@/src/shared/Banner";
import Footer from "@/src/shared/Footer";

import { decodeUserCookie } from "@/src/lib/actions/Server/cookies";

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await decodeUserCookie("accessToken");

  return (
    <section className={`${roboto.className}`}>
      <Header user={user} />

      <Banner />

      {children}
      <Footer />
    </section>
  );
}
