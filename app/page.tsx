import Image from "next/image";
import { Button } from "@/components/ui/button"
import NoteDisplay from "../components/NoteDisplay"
// import { motion } from "framer-motion";


export default function Home() {
  return (
    <main
    className="flex min-h-screen flex-col items-center justify-between px-24 py-[50px]">
      <NoteDisplay  />
    </main>
  );
}

