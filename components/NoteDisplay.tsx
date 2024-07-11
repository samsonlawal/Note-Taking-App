'use client'

import { Tooltip } from '@nextui-org/tooltip';
import { motion } from "framer-motion";

import dynamic from "next/dynamic";
import React, { useRef } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
// import InitializedMDXEditor from './InitializedMDXEditor'

const DynamicMDXEditor = dynamic(
  () => import("./InitializedMDXEditor"),
  {
    ssr: false,
  }
);


function NoteDisplay() {

  const editorRef = useRef<MDXEditorMethods>(null);

  const initialMarkdown: string = `
    ### Welcome to our innovative notetaking app, a powerful and intuitive platform designed to enhance your productivity and organization.
          
          Built with cutting-edge technologies like:
          - Next.js, 
          - TypeScript,
          - Tailwind CSS and
          - Framer Motion.
          
          > Our app offers a seamless and delightful user experience..`;


  return (
      <motion.div
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="flex flex-col gap-7"
      >
        <h1
          className="text-[40px] font-extrabold outline-none"
          contentEditable="true"
        >
          Introduction to Our Notetaking App
        </h1>

        <DynamicMDXEditor className="text-[16px] outline-none" editorRef={editorRef} markdown={initialMarkdown} />
      </motion.div>
  )
}

export default NoteDisplay