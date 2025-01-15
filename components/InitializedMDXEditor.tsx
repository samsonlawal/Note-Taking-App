"use client";

import React, { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
// import { linkPlugin } from "@mdxeditor/editor/plugins/link";

interface InitializedMDXEditorProps extends MDXEditorProps {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const InitializedMDXEditor: React.FC<InitializedMDXEditorProps> = ({
  editorRef,
  ...props
}) => {
  const plugins = [
    linkPlugin(),
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
  ];

  return (
    // <article class="prose lg:prose-xl">
    <MDXEditor
      plugins={plugins}
      {...props}
      ref={editorRef}
      contentEditableClassName="prose text-white dark:text-gray-300 caret-yellow-500 max-w-full"
    />
    //  </article>
  );
};

export default InitializedMDXEditor;
