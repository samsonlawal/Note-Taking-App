"use client";

// import NoteDisplay from "../components/NoteDisplay";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import router from "next/router";
import HomePage from "@/components/ui/HomePage";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const { accessToken } = useAuth();

  // useEffect(() => {
  //   if (accessToken) {
  //     // Redirect to note layout if logged in
  //     router.push("/notes"); // Or the path you want for the note layout
  //   } else {
  //     // Stay on homepage or show login/signup
  //     router.push("/login"); // Or the path for your login/signup page
  //   }
  // }, [accessToken, router]);

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-[50px] font-outfit w-[calc(100%-310px)]">
  //     <HomePage />
  //   </main>
  // );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <HomePage />
    </main>
  );
}
