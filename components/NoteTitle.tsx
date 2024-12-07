"use client";
import { useEffect } from "react";
import { FileText, Trash } from "lucide-react";
// import noteData from "../noteData"

// interface Props {
//   // children: React.ReactNode;
//   name: string;
// }

interface NoteProps {
  key: string;
  title: string;
  content: string;
  // href: string;
}
const Note: React.FC<NoteProps> = ({ key, title, content }) => {
  //  console.log(noteData[0])

  return (
    <div
      key={key}
      className="h-[32px] text-zinc-500 flex flex-row gap-1 items-center justify-start w-full rounded-md cursor-pointer mb-1 px-2 hover:bg-gray-300"
    >
      <FileText size={16} />
      <p className="text-[14px] font-outfit font-medium">{title}</p>
    </div>
  );
};

export default Note;
