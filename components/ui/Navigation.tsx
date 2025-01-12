'use client'

import { useDataContext } from "@/context/DataContext"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect, FC } from "react";
import NavigationLink from "./NavigationLink";
import { Tooltip } from "@nextui-org/tooltip";

import NoteList from "../NotesList";
import SearchArea from "../Search";
import AddNote from "../addNote";

import {
  ChartBarIcon,
  ChartPieIcon,
  DocumentCheckIcon,
  Square2StackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import {
  Folder,
  Search,
  CirclePlus,
  Settings,
  FileText,
  File,
  PanelLeft,
  PencilRuler,
  Eraser,
  Trash,
  CalendarDays,
  Moon,
  CircleUserRound,
  Book,
  CircleHelp,
  LogOut,
  DeleteIcon,
} from "lucide-react";
import Logo from "./logo";
import ProjectLink from "./ProjectLink";
import ProjectNavigation from "./ProjectNavigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
// import AddNoteDialog from "./delete";
interface NavigationProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navigation: FC<NavigationProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { isOpen, setIsOpen } = useDataContext();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Logout the user and redirect them to the homepage
  };

  useEffect(() => {}, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setSelectedProject(null);
    } else {
      setSelectedProject("Notes");
    }
  };

  return (
    <div className="flex flex-row h-screen w-fit fixed top-0">
      <motion.nav className="w-[60px] flex flex-col items-center justify-center z-10 gap-2 pb-5 h-full border-r border-gray-300 bg-gray-200">
        <div className="flex h-[60px] flex-row w-full items-center justify-center place-items-center border-b border-gray-300">
          <button className="rounded-full flex text-black">
            <PanelLeft
              className="cursor-pointer"
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
                  ? "bg-gray-300 hover:bg-none"
                  : "bg-none hover:bg-gray-300"
              } w-[100%] px-2 rounded py-1 transition-colors duration-100`}
            >
              <Folder className="stroke-inherit stroke-[1] min-w-5 w-5" />
            </div>
          </NavigationLink>
          <NavigationLink
            name="Add Note"
            setSelectedProject={setSelectedProject}
            // isOpen={isOpen}
          >
            <div
              className={` ${
                selectedProject === "Add Note"
                  ? "bg-gray-300 hover:bg-none"
                  : "bg-none hover:bg-gray-300"
              } w-[100%] px-2 rounded py-1 transition-colors duration-100`}
            >
              <CirclePlus className="stroke-inherit stroke-[1] min-w-5 w-5" />
            </div>
          </NavigationLink>
          <NavigationLink
            name="Search"
            setSelectedProject={setSelectedProject}
            // isOpen={isOpen}
          >
            <div
              className={` ${
                selectedProject === "Search"
                  ? "bg-gray-300 hover:bg-none"
                  : "bg-none hover:bg-gray-300"
              } w-[100%] px-2 rounded py-1 transition-colors duration-100`}
            >
              <Search className="stroke-inherit stroke-[1] min-w-5 w-5" />
            </div>
          </NavigationLink>
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-col gap-2">
          {/* <AddNoteDialog /> */}

          <Link
            // name="Documentation"
            // setSelectedProject={setSelectedProject}
            href="/documentation"
          >
            <div
              className={` ${
                selectedProject === "Settings"
                  ? "bg-gray-300 hover:bg-none"
                  : "bg-none hover:bg-gray-300"
              } w-[100%] px-2 rounded py-1 transition-colors duration-100 stroke-[1] stroke-gray-700 cursor-pointer`}
            >
              <Tooltip
                placement="right"
                showArrow={true}
                className="bg-gray-200 rounded-md mx-4 font-semibold font-outfit border border-gray-300 text-xs"
                content={<div className="text-tiny">Help</div>}
              >
                <CircleHelp className="stroke-inherit stroke-[1] min-w-5 w-5" />
              </Tooltip>
            </div>
          </Link>

          {/* Darkemode/Lightmode */}
          <div
            className={`bg-none hover:bg-gray-300 w-[100%] px-2 rounded py-1 transition-colors duration-100 stroke-[1] stroke-gray-700 cursor-pointer`}
          >
            <Tooltip
              placement="right"
              showArrow={true}
              className="bg-gray-200 rounded-md mx-4 font-semibold font-outfit border border-gray-300 text-xs"
              content={<div className="text-tiny">Mode</div>}
            >
              <Moon className="stroke-inherit stroke-[1] min-w-5 w-5" />
            </Tooltip>
          </div>

          {/* User Pfp and setting */}
          <div
            className={`stroke-gray-700 ${
              selectedProject === "User Profile"
                ? "bg-gray-300 hover:bg-none"
                : "bg-none hover:bg-gray-300"
            } w-[100%] px-2 rounded py-1 transition-colors duration-100 cursor-pointer`}
            onClick={handleLogout}
          >
            <Tooltip
              placement="right"
              showArrow={true}
              className="bg-gray-200 rounded-md mx-4 font-semibold font-outfit border border-gray-300 text-xs"
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
