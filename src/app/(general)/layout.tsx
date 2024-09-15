import Header from "@/src/shared/Header";
import { roboto } from "../styles/fonts";
import Banner from "@/src/shared/Banner";
import Footer from "@/src/shared/Footer";

import { getSingleUser } from "@/src/lib/actions/Server/user";

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSingleUser();

  return (
    <section className={`${roboto.className}`}>
      <Header user={user?.data} />

      <Banner />

      {children}
      <Footer />
    </section>
  );
}
