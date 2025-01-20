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
  noteId?: any;
  created_at: any;
  tags?: any;
  lastEdited?: string;

  // href: string;
}
const Note: React.FC<NoteProps> = ({
  key,
  title,
  content,
  created_at,
  noteId,
  tags,
}) => {
  //  console.log(noteData[0])

  const pathname = usePathname();

  return (
    <div
      key={title}
      className={`h-fit flex flex-col gap-1 border-b-[1px] border-gray-300 dark:border-gray-900/50 items-start justify-start w-full cursor-pointer py-2 px-4 hover:bg-gray-300/40 dark:hover:bg-gray-700/40 ${
        pathname === `/note/${noteId}`
          ? "bg-gray-300/50 dark:bg-gray-700/40"
          : ""
      }`}
    >
      <div className="flex flex-row">
        {/* <FileText size={16} /> */}
        <p className="text-[15px] font-outfit font-medium mb-2 text-zinc-600 dark:text-zinc-300">
          {title}
        </p>
      </div>
      <div className="flex flex-row gap-1">
        {tags && tags.map((tag: any) => <Tag tag={tag} key={tag} />)}
      </div>
      <div>
        <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
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
