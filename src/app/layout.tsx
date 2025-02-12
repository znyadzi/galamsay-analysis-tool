import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AppSidebar from "@/components/app/app-sidebar";
import Header from "@/components/app/header";
import { SidebarProvider } from "@/components/ui/sidebar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galamsey Analysis Tool",
  description: "A tool for analyzing galamsey data",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main>{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
