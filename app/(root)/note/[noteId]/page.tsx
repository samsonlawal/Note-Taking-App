// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useDataContext } from "@/context/DataContext";
// import { usePathname, useRouter } from "next/navigation";
// import { noteData } from "../../../../noteData";
// import { notFound } from "next/navigation";
// import dynamic from "next/dynamic";
// import React, { useRef } from "react";
// import type { MDXEditorMethods } from "@mdxeditor/editor";
// // import InitializedMDXEditor from './InitializedMDXEditor'
// import Navigation from "@/components/ui/Navigation";
// import router from "next/router";
// import supabase from "@/config/supabaseClient";
// import { useAuth } from "@/context/AuthContext";

// const DynamicMDXEditor = dynamic(
//   () => import("@/components/InitializedMDXEditor"),
//   {
//     ssr: false,
//   }
// );
// interface Note {
//   title: string;
//   content: string;
//   id: string;
//   noteId?: string;
// }

// interface NoteProps {
//   params: {
//     noteId: string;
//     id: string;
//   };
// }

// const NotePage: React.FC<NoteProps> = ({ params }: NoteProps) => {
//   const editorRef = useRef<MDXEditorMethods>(null);

//   const { local, setLocal, data, setData } = useDataContext();
//   const router = useRouter();
//   const pathname = usePathname();
//   const { accessToken, userId, isLoading } = useAuth();

//   let note:any

//   const [currentNote, setCurrentNote] = useState<Note | null>(null);

//   useEffect(() => {
//     // // Retrieve the existing notes from localStorage
//     // const storedNotes = localStorage.getItem("Notes");
//     // if (storedNotes) {
//     //   setLocal(JSON.parse(storedNotes));
//     // }

//     // if (accessToken) {
//     //   // Define and immediately invoke the async function
//     //   const fetchNotes = async () => {
//     //     try {
//     //       const { data, error } = await supabase
//     //         .from("notes")
//     //         .select("*")
//     //         .eq("user_id", userId) // Fetch notes for the logged-in user
//     //         .order("created_at", { ascending: false });

//     //       if (error) throw error;
//     //       console.log(data); // Logs the fetched data
//     //       setData(data);
//     //     } catch (err) {
//     //       console.error("Error fetching notes:", err);
//     //       throw err;
//     //     }
//     //   };

//     //   fetchNotes(); // Call the async function here
//     // }
//     if (accessToken) {

//     note = data.length !== 0
//       ? data.find((note) => note.id === params.noteId)
//       : noteData.find((note) => note.id === params.noteId);
//   }

//   return note
//   //  { isLoading && console.log(data) }

//   }, [accessToken, userId]);

//   const handleFocus = (e: FocusEvent) => {
//     const target = e.target as HTMLElement;

//     const updatedContent = target.innerHTML;

//     // console.log(updatedContent);
//     // console.log(note);
//     // console.log(local)

//     // Update note content in local state
//     if (note) {
//       const updatedNote = { ...note, content: updatedContent };
//       setCurrentNote(updatedNote); // Update note state with new content
//       const updatedNotes = data.map((n) =>
//         n.id === note.id ? updatedNote : n
//       );
//       setLocal(updatedNotes); // Update local state with updated notes
//       // console.log(updatedNote);
//       localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Persist updated notes to localStorage
//     }
//   };

//   const handleHeadChange = (e: React.FocusEvent<HTMLParagraphElement>) => {
//     let updatedHeader = e.target.innerText;

//     // Update note content in local state
//     if (note) {
//       const updatedNote = { ...note, title: updatedHeader };
//       setCurrentNote(updatedNote); // Update note state with new content
//       const updatedNotes = data.map((n) =>
//         n.id === note.id ? updatedNote : n
//       );
//       setLocal(updatedNotes); // Update local state with updated notes
//       console.log(updatedNote);
//       localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Persist updated notes to localStorage
//     }
//   };

//   //  if (!note) {
//   //    notFound();
//   //  }
//   let initialMarkdown:string

//   if (note) {
//    initialMarkdown = `${note?.content}`;
//     return initialMarkdown
//   }

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   // const { accessToken, setAccessToken, isLoading } = useAuth();

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   // useEffect(() => {
//   //   if (!isLoading && !accessToken) {
//   //     // Check if the pathname includes "/note"
//   //     if (pathname && pathname.includes("/note")) {
//   //       router.push("/auth/login");
//   //     } else if (pathname === "/") {
//   //       router.push("/");
//   //     }
//   //   }
//   // }, [accessToken, isLoading, pathname, router]);

//   return (
//     <div
//       className={`flex flex-row items-center justify-between w-full font-outfit`}
//     >
//       <Navigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <div className="h-screen w-[310px]">{""}</div>

//       <main className={`transition-all flex flex-grow w-[calc(100%-310px)]`}>
//         <div className="flex min-h-screen flex-col items-center justify-between px-24 py-[50px] w-full">
//           <div className="flex flex-col gap-7 w-full">
//             <h1
//               className="text-[40px] font-black outline-none w-full break-words" // Add `break-words` to ensure wrapping
//               contentEditable="true"
//               suppressContentEditableWarning={true}
//               onBlur={handleHeadChange}
//             >
//               {note && note.title}
//             </h1>

//             {/* <div
//           className="text-[16px] outline-none w-full break-words"
//           contentEditable="true"
//           suppressContentEditableWarning={true}
//         > */}
//             <DynamicMDXEditor
//               className="text-[16px] outline-none w-full break-words"
//               editorRef={editorRef}
//               markdown={initialMarkdown}
//               onBlur={handleFocus}
//             />
//             {/* </div> */}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default NotePage;

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
      <div className="h-screen w-[250px] bg-gray-200 border-l-[1px] border-gray-300 px-4 py-20">
        <div>
          <p className="text-sm font-poppins">
            <span className="font-medium">Last Edited:</span> 12, Jan 2025
          </p>
          <p className="text-sm font-poppins">
            <span className="font-medium">Tags:</span> work, personal
          </p>
        </div>
        {""}
      </div>
    </div>
  );
};

export default NotePage;
