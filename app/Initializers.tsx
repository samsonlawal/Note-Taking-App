"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
// import NextTopLoader from 'nextjs-toploader';
import Navbar from "@/components/ui/Navbar";
// import Footer from '@/components/layout/main/footer';
// import { Toaster } from '@/components/ui/sonner';
// import { AppThemeProvider } from '@/providers/theme-provider';
import { AuthProvider } from "@/context/AuthContext";

function Initializers({ children }: { children: ReactNode }) {
  const isAuthPage = (usePathname() || "")?.startsWith("/note/");

  const hideNavbar = isAuthPage ? true : false;
  const hideFooter = isAuthPage ? true : false;

  return (
    // <AppThemeProvider>
    <AuthProvider>
      {hideNavbar ? null : <Navbar />}
      {children}
    </AuthProvider>
  );
}

export default Initializers;
