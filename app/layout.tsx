import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Sidebar from "@/components/Sidebar"
// import Rightbar from "@/components/Rightbar";
// import Navigation from "@/components/Rightbar";
import Navigation from './../components/ui/Navigation';
// import Activity from "@/components/ui/ActivityBar";
import { DataProvider } from "@/context/DataContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note App",
  description: "A note taking app built with next",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children
}) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-row items-center justify-between w-full bg-gray-200`}
      >
        <DataProvider>
          <Navigation />
          <main 
          className="transition-width duration-300 flex flex-grow h-full w-full bg-gray-100">{children}</main>
        </DataProvider>
          
      </body>
    </html>
  );
}

export default RootLayout;
