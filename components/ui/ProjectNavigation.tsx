'use client'

import { motion } from "framer-motion";
import NavigationLink from "./NavigationLink";
import NoteList from "../NotesList";
import Search from "../Search"
import AddNote from '../addNote'

const variants = {
  close: {
    x: -300,
    // opacity: 0,
  },
  open: {
    x: 52,
    // opacity: 1,
  },
};

interface Props {
  selectedProject: string | null;
  isOpen: boolean;
  setSelectedProject: (project: string | null) => void;
}

const ProjectNavigation = ({
  selectedProject,
  isOpen,
  setSelectedProject,
}: Props) => {
  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate="open"
      // exit="close"
      transition={{
      //   // duration: 0.3,
      //   // ease: "easeInOut",
        type: "tween"
      }}
      className={`h-full flex flex-col gap-2 w-[250px] bg-gray-200 ml-0 border-r border-gray-300`}
    >
      <div className="flex flex-row w-full justify-start place-items-center h-[60px] border-b border-gray-300 px-4">
        <h1 className="tracking-wide text-black text-2xl font-montserrat">
          {selectedProject}
        </h1>
        {/* <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button> */}
      </div>
      {/* <input
        placeholder="Search"
        type="text"
        className="px-3 py-2 tracking-wide rounded-lg bg-neutral-600/40 text-neutral-100"
      /> */}
      <div className="px-2 gap-2 flex flex-col">
        {selectedProject === 'Search' ? <Search /> : 
        selectedProject === 'Add Note' ? <AddNote/> : <NoteList/>
        }

      </div>
    </motion.nav>
  );
};

export default ProjectNavigation;
