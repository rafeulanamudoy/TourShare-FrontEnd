import type { Metadata } from "next";

import "./globals.css";

import Footer from "@/shared/Footer";

import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Tour Share",
  description: "TourShare Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Toaster />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
