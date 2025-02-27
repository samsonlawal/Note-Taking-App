"use client";

import supabase from "@/config/supabaseClient";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";

// Type for state holding localstorage data
interface Note {
  created_at: any;
  noteId?: string;
  id: string;
  title: string;
  content: string;
  tags: any;
  lastEdited: string;
}

interface ContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  local: Note[];
  setLocal: Dispatch<SetStateAction<Note[]>>;
  data: Note[];
  setData: Dispatch<SetStateAction<Note[]>>;
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const initialContext: ContextProps = {
  isOpen: true,
  setIsOpen: () => {}, // Placeholder function
  local: [],
  setLocal: () => {}, // Placeholder function
  data: [],
  setData: () => {},
  isRightSidebarOpen: false,
  setIsRightSidebarOpen: () => {}, // Placeholder function
};

const DataContext = createContext<ContextProps>(initialContext);

export const useDataContext = () => useContext(DataContext);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialContext.isOpen);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(
    initialContext.isRightSidebarOpen
  );

  // Local Storage data
  const [local, setLocal] = useState<Note[]>([]);
  const [data, setData] = useState<Note[]>([]);

  return (
    <DataContext.Provider
      value={{
        isOpen,
        setIsOpen,
        local,
        setLocal,
        data,
        setData,
        isRightSidebarOpen,
        setIsRightSidebarOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};


