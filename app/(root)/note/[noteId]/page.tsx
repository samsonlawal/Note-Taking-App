"use client";

require("dotenv").config();

import { useState, useEffect, useCallback, ReactEventHandler } from "react";
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
import {
  Calendar,
  Clock,
  PanelRight,
  PanelRightDashed,
  Save,
  Tag,
  Text,
} from "lucide-react";
import toast from "react-hot-toast";
import TurndownService from "turndown";

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
  const secretKeyString = process.env.NEXT_PUBLIC_SECRET_KEY ?? "";
  const secretKey = Buffer.from(secretKeyString, "base64");
  const ivLength = 16;
  const crypto = require("crypto");

  const editorRef = useRef<MDXEditorMethods>(null);

  const {
    local,
    setLocal,
    data,
    setData,
    isOpen,
    setIsOpen,
    isRightSidebarOpen,
    setIsRightSidebarOpen,
  } = useDataContext();
  const { userId } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const [wordCount, setWordCount] = useState<number>();

  // Debug version

  // Encrypting Text with HTML breaks
  const encrypt = (text: string) => {
    if (!text) {
      return "";
    }
    // console.log("Before encryption:", text.replace(/\n/g, "<br/>"));

    try {
      // Convert newlines to HTML <br> tags
      const preparedText = text.replace(/\n/g, "<br/>");
      const iv = crypto.randomBytes(ivLength);
      const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
      let encrypted = cipher.update(preparedText, "utf8", "hex");
      encrypted += cipher.final("hex");
      return iv.toString("hex") + ":" + encrypted;
    } catch (err) {
      console.error("Encryption error:", err);
      throw new Error("Failed to encrypt content");
    }
  };

  // Then in decrypt, no change needed

  // const encrypt = (text: string) => {
  //   if (!text) {
  //     return "";
  //   }

  //   // Debug: Log the text with visible line break markers
  //   console.log("Before encryption:", text.replace(/\n/g, "\\n"));

  //   try {
  //     const iv = crypto.randomBytes(ivLength);
  //     const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  //     let encrypted = cipher.update(text, "utf8", "hex");
  //     encrypted += cipher.final("hex");
  //     return iv.toString("hex") + ":" + encrypted;
  //   } catch (err) {
  //     console.error("Encryption error:", err);
  //     throw new Error("Failed to encrypt content");
  //   }
  // };

  // Decrypting Text
  const decrypt = (text: string) => {
    if (!text || !text.includes(":")) {
      return text;
    }
    try {
      const parts = text.split(":");
      const iv = Buffer.from(parts[0], "hex");
      const encryptedText = parts[1];
      const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
      let decrypted = decipher.update(encryptedText, "hex", "utf8");
      decrypted += decipher.final("utf8");

      // Debug: Log the decrypted text with visible line break markers
      // console.log("After decryption:", decrypted.replace(/<br>/g, "\\n"));

      return decrypted;
    } catch (err) {
      console.error("Decryption error:", err);
      return text;
    }
  };

  let note =
    data.length !== 0
      ? data.find((note) => {
          if (note.noteId === params.noteId) {
            // Decrypt the content when the note is found            // Decrypt the content when the note is found
            return {
              ...note,
              content: note.content ? decrypt(note.content) : "",
            };
          }
          return false;
        })
      : noteData.find((note) => note.id === params.noteId);

  // let note =
  //   data.length !== 0
  //     ? data.find((note) => note.noteId === params.noteId)
  //     : noteData.find((note) => note.id === params.noteId);

  // const textToEncrypt = "Hello, this is a test message!";
  // const encryptedText = encrypt(textToEncrypt);
  // console.log("Encrypted Text:", encryptedText);

  // {
  //   data.length != 0 ? console.log(note) : "";
  // }
  // const [currentNote, setCurrentNote] = useState<Note | null>(null);

  // Note saving process and status updates
  const [stateNote, setStateNote] = useState("");
  const [status, setStatus] = useState("Saved");

  const handleChange = async (markdown: string) => {
    setStatus("Unsaved Changes");
  };

  const handleFocus = async (e: FocusEvent) => {
    setStatus("Saving...");
    const target = e.target as HTMLElement;

    const updatedContent = target.innerHTML;

    // Update note content in DB
    if (note) {
      // console.log(note);
      const encryptedContent = encrypt(updatedContent);
      const { data, error } = await supabase
        .from("notes")
        .update({ content: encryptedContent, lastEdited: new Date() })
        .eq("noteId", note.noteId);

      if (error) {
        console.error("Error updating note in Supabase:", error);
        setStatus("Failed to save");
      }
      setStatus("Saved");
    }

    const textContent = target.innerText.trim();
    const words = textContent.split(/\s+/).filter(Boolean);
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
              .eq("user_id", userId)
              .order("created_at", { ascending: false });

            if (error) throw error;
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

        fetchNotes();
      }

      // console.log("what??");
    }
  };

  const handleHeadChange = async (
    e: React.FocusEvent<HTMLParagraphElement>
  ) => {
    let updatedHeader = e.target.innerText;

    // const encryptedHeader = encrypt(updatedHeader);

    // Update note content in database
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

  const turndownService = new TurndownService();
  turndownService.addRule("lineBreaks", {
    filter: "br",
    replacement: function () {
      return "  \n"; // Markdown requires two spaces before \n for a line break
    },
  });

  const initialMarkdown: string = note?.content
    ? turndownService.turndown(decrypt(note.content))
    : "";

  useEffect(() => {
    const textContent = initialMarkdown.replace(/<[^>]*>/g, "");
    setWordCount(textContent.trim().split(/\s+/).length);
    // console.log(initialMarkdown);
  }, [initialMarkdown]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { accessToken, setAccessToken, isLoading } = useAuth();

  const isMobile = () => window.innerWidth < 768;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);

    if (isRightSidebarOpen && isMobile()) {
      setIsSidebarOpen(false);
    }

    console.log(isSidebarOpen);
  };


  const toggleRightSidebar = () => {
    setIsRightSidebarOpen((prev) => !prev);

    if (isOpen && isMobile()) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`flex flex-row items-center justify-between w-full font-outfit bg-gray-200/70 dark:bg-gray-700`}
    >
      <Navigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="h-screen w-[20px] md:w-[310px]">{""}</div>
      <main
        className={`transition-all flex flex-grow w-[100%] md:w-[calc(100%-660px)]`}
      >
        <div className="flex min-h-screen flex-col items-center justify-between pl-12 pr-1 pt-[50px] pb-[0px] md:py-[50px] w-full">
          <div className="flex flex-col gap-3 w-full">
            <h1
              className="text-[30px] pl-3 md:pl-0 font-black outline-none w-full break-words" // Add `break-words` to ensure wrapping
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={handleHeadChange}
            >
              {note && note.title}
            </h1>

            <DynamicMDXEditor
              className="text-[6px] outline-none w-full break-words"
              editorRef={editorRef}
              markdown={initialMarkdown}
              onChange={handleChange}
              onBlur={handleFocus}
              placeholder="Write something..."
            />
          </div>
        </div>
      </main>
      <div className="h-screen w-[1px] md:w-[310px]">{""}</div>
      <button
        onClick={toggleRightSidebar}
        className={`fixed top-3 z-50 bg-gray-800 text-white py-2 pl-2 pr-4 rounded-md shadow-md ${
          isRightSidebarOpen ? "right-[245px]" : "right-0"
        }`}
      >
        <PanelRightDashed className="w-5 h-5 stroke-[1.5]" />
      </button>

      {isRightSidebarOpen && (
        <div
          className={`fixed w-fit right-0 top-0 h-dvh md:h-screen bg-gray-200 border-l border-gray-300 pb-[24px] text-zinc-600 dark:bg-gray-800 dark:border-gray-900/50 dark:text-gray-400 transition-transform duration-300 ease-in-out transform ${
            isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-[250px] flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="flex items-center flex-row justify-between px-4 h-[60px]">
                <p className="text-base font-outfit font-medium text-zinc-600 dark:text-zinc-300">
                  Note Insights{" "}
                </p>

                {status === "Unsaved Changes" && (
                  <button
                    onClick={(e) => {
                      e.currentTarget.classList.add("scale-95");
                      setTimeout(
                        () => e.currentTarget.classList.remove("scale-95"),
                        150
                      );
                    }}
                    className="px-2 py-1 text-white/60 font-semibold bg-gray-700 hover:bg-gray-700/70 rounded-sm transition-transform duration-150 active:scale-90"
                  >
                    <Save className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </button>
                )}
              </div>
              <div className="border-b-[1px] border-gray-300 dark:border-gray-900/50" />

              <div className="flex flex-row w-full justify-start items-center px-4 gap-2">
                <Save className="w-4 h-4 transition-transform group-hover:scale-110" />
                <p className="text-[12px] font-poppins py-[14px]">
                  <span className="font-medium font-outfit">Status:</span>{" "}
                  {note && status}
                </p>
              </div>

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
                      return `${day}, ${month} ${year}`;
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
                      return `${day}, ${month} ${year}`;
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
          </div>

          {""}
        </div>
      )}
    </div>
  );
};

export default NotePage;
