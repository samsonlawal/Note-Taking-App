"use client";

import React, { ReactNode, useState } from "react";
import { Inter } from "next/font/google";
import Navigation from "@/components/ui/Navigation";

import { DataProvider } from "@/context/DataContext";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HomePage from "../ui/HomePage";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { accessToken, setAccessToken } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`${inter.className} flex flex-row items-center justify-between w-full font-outfit`}
    >
      <DataProvider>
        <>
          {/* <Navigation
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <div className="h-screen w-[310px]">{""}</div>

          <main
            className={`transition-all flex flex-grow w-[calc(100%-310px)]`}
          >
            {children}
          </main> */}
          <HomePage />
        </>
      </DataProvider>
    </div>
  );
}
