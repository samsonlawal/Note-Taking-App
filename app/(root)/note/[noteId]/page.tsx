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
import toast from "react-hot-toast";

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
  tags: any;
  lastEdited: string;
}

interface NoteProps {
  params: {
    noteId: string;
    id: string;
  };
}

const NotePage: React.FC<NoteProps> = ({ params }: NoteProps) => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const { local, setLocal, data, setData, isOpen } = useDataContext();
  const { userId } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const [wordCount, setWordCount] = useState<number>();

  let note =
    data.length !== 0
      ? data.find((note) => note.noteId === params.noteId)
      : noteData.find((note) => note.id === params.noteId);

  // {
  //   data.length != 0 ? console.log(data) : "";
  // }

  // const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const handleFocus = async (e: FocusEvent) => {
    const target = e.target as HTMLElement;

    const updatedContent = target.innerHTML;

    // Update note content in DB
    if (note) {
      const { data, error } = await supabase
        .from("notes")
        .update({ content: updatedContent, lastEdited: new Date() })
        .eq("noteId", note.noteId);

      if (error) {
        console.error("Error updating note in Supabase:", error);
      }
    }

    // const textContent = target.innerHTML.replace(/<[^>]*>/g, ""); // Remove HTML tags
    // const WordCount = textContent.trim().split(/\s+/).length;
    // setWordCount(WordCount);

    const textContent = target.innerText.trim();
    const words = textContent.split(/\s+/).filter(Boolean); // Filter out empty strings
    setWordCount(words.length);

    // console.log(wordCount);
  };

  const deleteHandler = async () => {
    if (note) {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("noteId", note.noteId);

      if (error) {
        console.error("Error updating note in Supabase:", error);
      } else {
        const fetchNotes = async () => {
          try {
            const { data, error } = await supabase
              .from("notes")
              .select("*")
              .eq("user_id", userId) // Fetch notes for the logged-in user
              .order("created_at", { ascending: false });

            if (error) throw error;
            // console.log(data); // Logs the fetched data
            toast.success("Note Deleted Successfully!");

            setData(data);
            {
              data ? router.push(`/note/${data[0].noteId}`) : "";
            }
          } catch (err) {
            console.error("Error fetching notes:", err);
            throw err;
          }
        };

        fetchNotes(); // Call the async function here
      }

      // console.log("what??");
    }
  };

  const handleHeadChange = async (
    e: React.FocusEvent<HTMLParagraphElement>
  ) => {
    let updatedHeader = e.target.innerText;

    // Update note content in local state
    if (note) {
      const { data, error } = await supabase
        .from("notes")
        .update({ title: updatedHeader, lastEdited: new Date() })
        .eq("title", note.title);

      if (error) {
        console.error("Error updating note in Supabase:", error);
      } else {
        // console.log("Note title updated successfully in Supabase:", data);
      }

      setLocal([]);
    }
  };

  //  if (!note) {
  //    notFound();
  //  }

  const initialMarkdown: string = `${note ? note.content : ""}`;
  useEffect(() => {
    const textContent = initialMarkdown.replace(/<[^>]*>/g, ""); // Remove HTML tags
    setWordCount(textContent.trim().split(/\s+/).length);
  }, [initialMarkdown]);

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

  // useEffect(() => {
  //   if (localStorage.getItem("NoteAppToken")) {
  //     // Set token in state if needed or consider the user logged in
  //     return;
  //   } else {
  //     // Redirect to home or login if no token is found
  //     router.push("/");
  //   }
  // }, []);

  return (
    <div
      className={`flex flex-row items-center justify-between w-full font-outfit bg-gray-200/70 dark:bg-gray-700`}
    >
      <Navigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* <div
        className={`
        fixed top-0 left-0
        h-screen w-[310px]
        z-10 
        bg-gray-200
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        shadow-lg
      `}
      >
      </div> */}
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
      <div className="h-screen w-[310px]">{""}</div>

      <div className="fixed right-0 top-0 h-screen w-[250px] bg-gray-200 border-l-[1px] border-gray-300 pb-[24px] flex flex-col justify-between text-zinc-600 dark:bg-gray-800 dark:border-gray-900/50 dark:text-gray-400">
        <div className="flex flex-col">
          <div className="flex items-center px-4 h-[60px]">
            <p className="text-base font-outfit font-medium text-zinc-600 dark:text-zinc-300">
              Note Insights{" "}
            </p>
          </div>
          {/* <div className="border-b-[1px] border-gray-300" /> */}

          <div className="border-b-[1px] border-gray-300 dark:border-gray-900/50" />

          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Created:</span>{" "}
              {note &&
                note.created_at &&
                (() => {
                  const date = new Date(note.created_at);
                  const day = date.getDate();
                  const month = date.toLocaleString("en-US", {
                    month: "short",
                  });
                  const year = date.getFullYear();
                  return `${day}, ${month} ${year}`; // Add the comma here
                })()}
            </p>
          </div>

          <div className="border-b-[1px] border-gray-300 dark:border-gray-900/50" />

          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Clock className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Last Edited:</span>{" "}
              {note &&
                note.lastEdited &&
                (() => {
                  const date = new Date(note.lastEdited);
                  const day = date.getDate();
                  const month = date.toLocaleString("en-US", {
                    month: "short",
                  });
                  const year = date.getFullYear();
                  return `${day}, ${month} ${year}`; // Add the comma here
                })()}
            </p>
          </div>
          <div className="border-b-[1px] border-gray-300 dark:border-gray-900/50" />
          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Tag className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Tags:</span>{" "}
              {note?.tags?.length ? note.tags.join(", ") : "null"}
            </p>
          </div>
          <div className="border-b-[1px] border-gray-300 dark:border-gray-900/50" />

          <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
            <Text className="w-4 h-4 transition-transform group-hover:scale-110" />
            <p className="text-[12px] font-poppins py-[14px]">
              <span className="font-medium font-outfit">Words:</span>{" "}
              {wordCount}
            </p>
          </div>
          <div className="border-b-[1px] border-gray-300 dark:border-gray-900/50" />
        </div>
        <div className="px-4">
          <DeleteNote deleteHandler={deleteHandler} />
        </div>
        {""}
      </div>
    </div>
  );
};

export default NotePage;
