import type { Metadata } from "next";

import "./globals.css";

import StoreProvider from "@/redux/StoreProvider";

import { getSingleUser } from "@/lib/actions/Server/user";
import { SocketProvider } from "@/socket/context/SocketContext";
import SocketListener from "@/socket/SocketListner";
import ToastProvider from "@/utilities/ToastProvider";

export const metadata: Metadata = {
  title: "Tour Share",
  description: "TourShare Project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSingleUser();
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SocketProvider email={user?.data?.email}>
            <SocketListener />

            <ToastProvider>{children}</ToastProvider>
          </SocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
