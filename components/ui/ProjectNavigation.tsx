"use client";

import { motion } from "framer-motion";
import NavigationLink from "./NavigationLink";
import NoteList from "../NotesList";
import Search from "../Search";
import AddNote from "../addNote";

import { useDataContext } from "@/context/DataContext";

interface Props {
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
}

const ProjectNavigation = ({ selectedProject, setSelectedProject }: Props) => {
  const { isOpen } = useDataContext();

  return (
    <div
      className={`h-full w-[180px] md:w-[250px] flex flex-col gap-2 bg-gray-200 ml-0 border-r border-gray-300 transition-transform duration-300 ease-in-out transform overflow-hidden dark:bg-gray-800 dark:border-gray-900/50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full w-full">
        {" "}
        {/* Changed from h-screen to h-full */}
        {/* Header with fixed height */}
        <div className="flex flex-row w-full justify-start items-center min-h-[60px] flex-shrink-0 border-b border-gray-300 dark:border-gray-900/50 px-4">
          <h1 className="tracking-wide text-black dark:text-white text-2xl font-outfit">
            {selectedProject ? selectedProject : "Notes"}
          </h1>
        </div>
        {/* Scrollable content area */}
        <div className="flex flex-col flex-1 w-full overflow-y-auto scrollable-content">
          {selectedProject === "Search" ? (
            <Search />
          ) : selectedProject === "Add Note" ? (
            <AddNote />
          ) : (
            <NoteList />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectNavigation;
