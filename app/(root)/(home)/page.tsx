"use client";

// import NoteDisplay from "../components/NoteDisplay";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import router from "next/router";
import HomePage from "@/components/ui/HomePage";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const { accessToken } = useAuth();

  return (
    <main className="flex max-h-screen flex-col items-center justify-between w-full magicpattern dark:bg-gray-800">
      <HomePage />
    </main>
  );
}
