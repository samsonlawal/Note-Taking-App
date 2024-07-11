"use client";

import dynamic from "next/dynamic";
import React, { useRef } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";

// Dynamically import the InitializedMDXEditor component with SSR disabled
const DynamicMDXEditor = dynamic(
  () => import("../../components/InitializedMDXEditor"),
  {
    ssr: false,
  }
);

const EditorPage: React.FC = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const initialMarkdown: string = `Hello, MDX! 
  This is some sample markdown content.`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 py-[50px]">
      <div className="flex flex-col gap-7">
        <h1  className="text-[40px] font-black outline-none">Notetaking App</h1>
        <DynamicMDXEditor className="text-[16px] outline-none" editorRef={editorRef} markdown={initialMarkdown} />
      </div>
    </div>
  );
};

export default EditorPage;
