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
      className={`h-full w-[250px] flex flex-col gap-2 bg-gray-200 ml-0 border-r border-gray-300 transition-transform duration-300 ease-in-out transform overflow-hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row w-full justify-start place-items-center h-[60px] border-b border-gray-300 px-4">
          <h1 className="tracking-wide text-black text-2xl font-outfit">
            {selectedProject ? selectedProject : "Notes"}
          </h1>
        </div>
        <div className="px-2 gap-2 flex flex-col flex-grow py-2 w-full">
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
