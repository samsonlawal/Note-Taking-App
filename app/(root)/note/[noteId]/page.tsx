"use client";

import { useState, useEffect, useCallback } from "react";
import { useDataContext } from "@/context/DataContext";
import { usePathname, useRouter } from "next/navigation";
import { noteData } from "../../../../noteData";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
// import InitializedMDXEditor from './InitializedMDXEditor'
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/ui/Navigation";
import router from "next/router";
import supabase from "@/config/supabaseClient";
import { Button } from "@/components/ui/button";
import DeleteNote from "@/components/ui/delete";
import { Calendar, Clock, Tag, Text } from "lucide-react";

const DynamicMDXEditor = dynamic(
  () => import("@/components/InitializedMDXEditor"),
  {
    ssr: false,
  }
);
interface Note {
  title: string;
  content: string;
  id: string;
  noteId?: string;
  created_at?: any;
}

interface NoteProps {
  params: {
    noteId: string;
    id: string;
  };
}

const NotePage: React.FC<NoteProps> = ({ params }: NoteProps) => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const { local, setLocal, data } = useDataContext();
  const router = useRouter();
  const pathname = usePathname();

  const note =
    data.length !== 0
      ? data.find((note) => note.noteId === params.noteId)
      : noteData.find((note) => note.id === params.noteId);

  // const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const handleFocus = async (e: FocusEvent) => {
    const target = e.target as HTMLElement;

    const updatedContent = target.innerHTML;

    // Update note content in DB
    if (note) {
      const { data, error } = await supabase
        .from("notes")
        .update({ content: updatedContent })
        .eq("noteId", note.noteId);

      if (error) {
        console.error("Error updating note in Supabase:", error);
      } else {
        console.log("Note content updated successfully in Supabase:", data);
      }
    }

    const textContent = updatedContent.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const wordCount = textContent.trim().split(/\s+/).length;

    console.log(wordCount);
  };

  const handleHeadChange = async (
    e: React.FocusEvent<HTMLParagraphElement>
  ) => {
    let updatedHeader = e.target.innerText;

    // Update note content in local state
    if (note) {
      const { data, error } = await supabase
        .from("notes")
        .update({ title: updatedHeader })
        .eq("title", note.title);

      if (error) {
        console.error("Error updating note in Supabase:", error);
      } else {
        console.log("Note title updated successfully in Supabase:", data);
      }

      setLocal([]);
    }
  };

  //  if (!note) {
  //    notFound();
  //  }

  const initialMarkdown: string = `${note?.content}`;
  const textContent = initialMarkdown.replace(/<[^>]*>/g, ""); // Remove HTML tags
  const wordCount = textContent.trim().split(/\s+/).length;

  console.log(wordCount);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { accessToken, setAccessToken, isLoading } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   if (!isLoading && !accessToken) {
  //     // Check if the pathname includes "/note"
  //     if (pathname && pathname.includes("/note")) {
  //       router.push("/auth/login");
  //     } else if (pathname === "/") {
  //       router.push("/");
  //     }
  //   }
  // }, [accessToken, isLoading, pathname, router]);

  if (!accessToken) {
    router.push("/");
  }

  return (
    <div
      className={`flex flex-row items-center justify-between w-full font-outfit bg-gray-200/70`}
    >
      <Navigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="h-screen w-[310px]">{""}</div>

      <main className={`transition-all flex flex-grow w-[calc(100%-660px)]`}>
        <div className="flex min-h-screen flex-col items-center justify-between px-14 py-[50px] w-full">
          <div className="flex flex-col gap-3 w-full">
            <h1
              className="text-[30px] font-black outline-none w-full break-words" // Add `break-words` to ensure wrapping
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={handleHeadChange}
            >
              {note && note.title}
            </h1>

            {/* <div
          className="text-[16px] outline-none w-full break-words"
          contentEditable="true"
          suppressContentEditableWarning={true}
        > */}
            <DynamicMDXEditor
              className="text-[16px] outline-none w-full break-words"
              editorRef={editorRef}
              markdown={initialMarkdown}
              onBlur={handleFocus}
              placeholder="Write something..."
            />
            {/* </div> */}
          </div>
        </div>
      </main>
      <div className="h-screen w-[250px] bg-gray-200 border-l-[1px] border-gray-300 pb-[24px] flex flex-col justify-between text-zinc-600">
        <div className="flex flex-col">
          <div className="flex items-center px-4 h-[60px]">
            <p className="text-base font-outfit font-medium text-zinc-600">
              Note Insights{" "}
            </p>
          </div>
          {/* <div className="border-b-[1px] border-gray-300" /> */}

          <div className="border-b-[1px] border-gray-300" />

          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Created:</span> 12, Jan
              2025
            </p>
          </div>

          <div className="border-b-[1px] border-gray-300" />

          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Clock className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Last Edited:</span> 12,
              Jan 2025
            </p>
          </div>
          <div className="border-b-[1px] border-gray-300" />
          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Tag className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Tags:</span> work,
              personal
            </p>
          </div>
          <div className="border-b-[1px] border-gray-300" />

          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Text className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Words:</span>{" "}
              {wordCount}
            </p>
          </div>
          <div className="border-b-[1px] border-gray-300" />
        </div>
        <div className="px-4">
          <DeleteNote />
        </div>
        {""}
      </div>
    </div>
  );
};

export default NotePage;
