"use client";
import { useEffect } from "react";
import {
FileText,
} from "lucide-react";
import noteData from "../noteData"

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
    <div key={key} className="h-[32px] text-zinc-500 flex flex-row gap-1 items-center justify-start w-full rounded-md cursor-pointer">
      <FileText size={16} />
      <p className="text-[14px] font-montserrat font-medium">{title}
      </p>
    </div>
  );
}

export default Note;
