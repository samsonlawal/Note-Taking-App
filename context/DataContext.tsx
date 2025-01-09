"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  ReactNode,
  FC,
  useEffect
} from "react";

// Type for state holding localstorage data
interface Note {
  noteId?: string;
  // key: number;
  id: string;
  title: string;
  content: string;
  // href: string;
}

interface ContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  local: Note[];
  setLocal: Dispatch<SetStateAction<Note[]>>;
  data: Note[];
  setData: Dispatch<SetStateAction<Note[]>>;
}

const initialContext: ContextProps = {
  isOpen: true,
  setIsOpen: () => {}, // Placeholder function
  local: [],
  setLocal: () => {}, // Placeholder function
  data: [],
  setData: () => {},
};

const DataContext = createContext<ContextProps>(initialContext);

export const useDataContext = () => useContext(DataContext);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialContext.isOpen);

  // Local Storage data
  const [local, setLocal] = useState<Note[]>([]);
  const [data, setData] = useState<Note[]>([]);

  return (
    <DataContext.Provider
      value={{ isOpen, setIsOpen, local, setLocal, data, setData }}
    >
      {children}
    </DataContext.Provider>
  );
};


