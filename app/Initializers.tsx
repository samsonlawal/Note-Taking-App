"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
// import NextTopLoader from "nextjs-toploader";
// import { Toaster } from '@/components/ui/sonner';
// import { AppThemeProvider } from '@/providers/theme-provider';
import { AuthProvider } from "@/context/AuthContext";
import TopLoader from "nextjs-toploader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Initializers({ children }: { children: ReactNode }) {
  const isAuthPage = (usePathname() || "")?.startsWith("/note/");

  const hideNavbar = isAuthPage ? true : false;
  const hideFooter = isAuthPage ? true : false;

  return (
    // <AppThemeProvider>
    <AuthProvider>
      <TopLoader color="#000000" height={3} />

      {hideNavbar ? null : <Navbar />}
      {children}
    </AuthProvider>
  );
}

export default Initializers;
