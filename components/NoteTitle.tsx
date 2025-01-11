"use client";
import { useEffect } from "react";
import { FileText, Trash } from "lucide-react";
import Tag from "./ui/tags";
import { usePathname } from "next/navigation";
// import noteData from "../noteData"

// interface Props {
//   // children: React.ReactNode;
//   name: string;
// }

interface NoteProps {
  key: string;
  title: string;
  content: string;
  created_at?: any;
  noteId?: any;
  // href: string;
}
const Note: React.FC<NoteProps> = ({
  key,
  title,
  content,
  created_at,
  noteId,
}) => {
  //  console.log(noteData[0])

  const pathname = usePathname();

  return (
    <div
      key={title}
      className={`h-fit text-zinc-500 flex flex-col gap-1 border-b-[1px] border-gray-300 items-start justify-start w-full cursor-pointer p-2 hover:bg-gray-300/40 ${
        pathname === `/note/${noteId}` ? "bg-gray-300/50" : ""
      }`}
    >
      <div className="flex flex-row">
        {/* <FileText size={16} /> */}
        <p className="text-[15px] font-outfit font-medium mb-2">{title}</p>
      </div>
      <div>
        <Tag />
      </div>
      <div>
        <p className="text-[12px]">
          {created_at &&
            (() => {
              const date = new Date(created_at);
              const day = date.getDate();
              const month = date.toLocaleString("en-US", { month: "short" });
              const year = date.getFullYear();
              return `${day}, ${month} ${year}`; // Add the comma here
            })()}
        </p>
      </div>
    </div>
  );
};

export default Note;
