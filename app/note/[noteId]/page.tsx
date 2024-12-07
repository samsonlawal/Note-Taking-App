"use client"

import { useState, useEffect, useCallback } from "react";
import { useDataContext } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import {noteData} from "../../../noteData";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
// import InitializedMDXEditor from './InitializedMDXEditor'

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
}

interface NoteProps {
  params: {
    noteId: string;
    id: string;
  };
}

const NotePage: React.FC<NoteProps> = ({ params }: NoteProps) => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const { local, setLocal } = useDataContext();

  const note =
    local.length !== 0
      ? local.find((note) => note.id === params.noteId)
      : noteData.find((note) => note.id === params.noteId);

  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  useEffect(() => {
    // Retrieve the existing notes from localStorage
    const storedNotes = localStorage.getItem("Notes");
    if (storedNotes) {
      setLocal(JSON.parse(storedNotes));
    }
  }, []);

  const handleFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;

    const updatedContent = target.innerHTML;

    // console.log(updatedContent);
    // console.log(note);
    // console.log(local)

    // Update note content in local state
    if (note) {
      const updatedNote = { ...note, content: updatedContent };
      setCurrentNote(updatedNote); // Update note state with new content
      const updatedNotes = local.map((n) =>
        n.id === note.id ? updatedNote : n
      );
      setLocal(updatedNotes); // Update local state with updated notes
      // console.log(updatedNote);
      localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Persist updated notes to localStorage
    }
  };

  const handleHeadChange = (e: React.FocusEvent<HTMLParagraphElement>) => {
    let updatedHeader = e.target.innerText;

    // {updatedHeader.}
    // console.log(updatedHeader);
    // console.log(note);
    // console.log(local)

    // Update note content in local state
    if (note) {
      const updatedNote = { ...note, title: updatedHeader };
      setCurrentNote(updatedNote); // Update note state with new content
      const updatedNotes = local.map((n) =>
        n.id === note.id ? updatedNote : n
      );
      setLocal(updatedNotes); // Update local state with updated notes
      // console.log(updatedNote);
      localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Persist updated notes to localStorage
    }
  };

  //  if (!note) {
  //    notFound();
  //  }

  const initialMarkdown: string = `${note?.content}`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 py-[50px] w-full">
      <div className="flex flex-col gap-7 w-full">
        <h1
          className="text-[40px] font-black outline-none w-full break-words" // Add `break-words` to ensure wrapping
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
        />
        {/* </div> */}
      </div>
    </div>
  );
};



export default NotePage;
