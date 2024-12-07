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
}

const initialContext: ContextProps = {
  isOpen: true,
  setIsOpen: () => {}, // Placeholder function
  local: [],
  setLocal: () => {}, // Placeholder function
};



const DataContext = createContext<ContextProps>(initialContext);

export const useDataContext = () => useContext(DataContext);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialContext.isOpen);

  // Local Storage data
  const [local, setLocal] = useState<Note[]>([])
 

  return (
    <DataContext.Provider value={{ isOpen, setIsOpen, local, setLocal }}>
      {children}
    </DataContext.Provider>
  );
};


