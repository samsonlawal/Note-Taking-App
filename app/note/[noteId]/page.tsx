"use client"

import { useState, useEffect, useCallback } from "react";
import { useDataContext } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import {noteData} from "../../../noteData";
import { notFound } from "next/navigation";

// interface NoteProps {
//   note: Note;
// }

// Define the Note type
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

  const handleFocus = (e: React.FocusEvent<HTMLParagraphElement>) => {
    const updatedContent = e.target.innerText;
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
      let updatedHeader = e.target.innerText

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 py-[50px]">
      <div className="flex flex-col gap-7">
        <h1
          className="text-[40px] font-black outline-none"
          contentEditable="true"
          suppressContentEditableWarning={true}
          // onChange={handleHeadChange}
          onBlur={handleHeadChange}
        >
          {/* {params.noteId} */}

          {note && note.title}
        </h1>

        <p
          className="text-[16px] outline-none"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={handleFocus}
        >
          {note && note.content}
        </p>
      </div>
    </div>
  );
};



export default NotePage;
