'use client'

import { useDataContext } from "@/context/DataContext"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect, FC } from "react";
import NavigationLink from "./NavigationLink";
import { Tooltip } from "@nextui-org/tooltip";

// import NoteList from "../NotesList";
// import SearchArea from "../Search";
// import AddNote from "../addNote";

import {
  Folder,
  Search,
  PanelLeft,
  CircleHelp,
  LogOut,
  PanelLeftDashed,
} from "lucide-react";
import ProjectNavigation from "./ProjectNavigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AddNoteDialog from "./addDialog";
import ThemeSwitcher from "./ThemeSwitcher";
// import AddNoteDialog from "./delete";
interface NavigationProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navigation: FC<NavigationProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { isOpen, setIsOpen, isRightSidebarOpen, setIsRightSidebarOpen } =
    useDataContext();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Logout the user and redirect them to the homepage
  };

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const isMobile = () => window.innerWidth < 768;

  const handleOpenClose = () => {
    setIsOpen(!isOpen);

    if (isMobile() && isRightSidebarOpen) {
      setIsRightSidebarOpen(false);
    }

    if (isOpen) {
      setSelectedProject(null);
    } else {
      setSelectedProject("Notes");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      document.body.classList.toggle("keyboard-open", window.innerHeight < 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-row h-dvh md:h-screen w-fit fixed top-0 ${
        !isOpen ? "z-0" : "z-20"
      }`}
    >
      <motion.nav className="w-[60px] flex flex-col items-center justify-center z-10 gap-2 pb-5 h-full border-r border-gray-300 bg-gray-200 dark:bg-gray-800 dark:border-gray-900/50">
        <div className="flex h-[60px] flex-row w-full items-center justify-center place-items-center border-b border-gray-300 dark:border-gray-900/50">
          <button className="rounded-full flex text-black dark:text-gray-300">
            <PanelLeftDashed
              className="cursor-pointer stroke-[1.7]"
              onClick={() => handleOpenClose()}
            />
          </button>
        </div>

        <div className="grow flex flex-col gap-2 w-full items-center">
          <NavigationLink
            name="Notes"
            setSelectedProject={setSelectedProject}
            // isOpen={isOpen}
          >
            <div
              className={` ${
                selectedProject === "Notes"
                  ? "bg-gray-300 dark:bg-gray-900 hover:bg-none"
                  : "bg-none hover:bg-gray-300 dark:hover:bg-gray-900"
              } w-[100%] px-2 rounded py-1 transition-colors duration-100`}
            >
              <Folder className="stroke-inherit dark:stroke-gray-200 stroke-[1] min-w-5 w-5" />
            </div>
          </NavigationLink>
          <AddNoteDialog />
          <NavigationLink
            name="Search"
            setSelectedProject={setSelectedProject}
            // isOpen={isOpen}
          >
            <div
              className={` ${
                selectedProject === "Search"
                  ? "bg-gray-300 dark:bg-gray-900 hover:bg-none"
                  : "bg-none hover:bg-gray-300 dark:hover:bg-gray-900"
              } w-[100%] px-2 rounded py-1 transition-colors duration-100`}
            >
              <Search className="stroke-inherit dark:stroke-gray-200 stroke-[1] min-w-5 w-5" />
            </div>
          </NavigationLink>
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-col gap-2">
          <Link href="/documentation">
            <div
              className={`bg-none hover:bg-gray-300 dark:hover:bg-gray-900 w-[100%] px-2 rounded py-1 transition-colors duration-100 stroke-[1] stroke-gray-700 dark:stroke-gray-200 cursor-pointer`}
            >
              <Tooltip
                placement="right"
                showArrow={true}
                className="bg-gray-200 rounded-md mx-4 font-outfit border border-gray-300 dark:border-gray-800 text-xs dark:bg-gray-700"
                content={<div className="text-tiny">Docs</div>}
              >
                <CircleHelp className="stroke-inherit stroke-[1] min-w-5 w-5" />
              </Tooltip>
            </div>
          </Link>

          {/* Darkemode/Lightmode */}
          <div
            className={`bg-none hover:bg-gray-300 dark:hover:bg-gray-900 w-[100%] px-2 rounded py-1 transition-colors duration-100 stroke-[1] stroke-gray-700 dark:stroke-gray-200 cursor-pointer`}
          >
            <ThemeSwitcher position={`right`} showTip={true} />
          </div>

          {/* User Pfp and setting */}
          <div
            className={`bg-none hover:bg-gray-300 dark:hover:bg-gray-900 w-[100%] px-2 rounded py-1 transition-colors duration-100 stroke-[1] stroke-gray-700 dark:stroke-gray-200 cursor-pointer`}
            onClick={handleLogout}
          >
            <Tooltip
              placement="right"
              showArrow={true}
              className="bg-gray-200 rounded-md mx-4 font-outfit border border-gray-300 dark:border-gray-800 text-xs dark:bg-gray-700"
              content={<div className="text-tiny">Log Out</div>}
            >
              <LogOut className="stroke-inherit stroke-[1] min-w-5 w-5" />
            </Tooltip>
          </div>
        </div>
      </motion.nav>
      <ProjectNavigation
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </div>
  );
};

export default Navigation
