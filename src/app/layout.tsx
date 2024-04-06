import type { Metadata } from "next";

import "./globals.css";
import Header from "@/shared/Header";
import Banner from "@/shared/Banner";
import Footer from "@/shared/Footer";

import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

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
