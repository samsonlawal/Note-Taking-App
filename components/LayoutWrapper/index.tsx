"use client";

import React, { ReactNode, useState } from "react";
import { Inter } from "next/font/google";
import Navigation from "@/components/ui/Navigation";

import { DataProvider } from "@/context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`${inter.className} flex flex-row items-center justify-between w-full bg-gray-100 font-outfit`}
    >
      <DataProvider>
        <Navigation
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="h-screen w-[310px]">{""}</div>

        <main
          // className={`transition-all w-[calc(100%-310px)] ml-${
          //   isSidebarOpen ? "64" : "16"
          // } p-4`}
          className={`transition-all flex flex-grow w-[calc(100%-310px)]`}
        >
          {children}
        </main>
      </DataProvider>
    </div>
  );
}
