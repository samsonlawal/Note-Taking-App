import React, { useEffect } from 'react';
import {noteData} from '../noteData';
import NoteTitle from './NoteTitle'
import Link from 'next/link';
import { useDataContext } from "@/context/DataContext";


const NoteList: React.FC = () => {
    
const {local, setLocal} = useDataContext()

     useEffect(() => {
        // Retrieve the existing notes from localStorage
        const storedNotes = localStorage.getItem("Notes");
        if (storedNotes) {
      setLocal(JSON.parse(storedNotes));
        }

        // console.log(storedNotes)

      }, []);

    return (
      <div className="flex flex-col">
        {local.length !== 0 &&
          local.map((note) => (
            <Link href={`/note/${note.id}`}>
              <NoteTitle
                key={note.id}
                title={note.title}
                content={note.content}
              />
            </Link>
          ))}
        {local.length === 0 &&
          noteData.map((note) => (
            <Link href={`/note/${note.id}`}>
              <NoteTitle
                key={note.id}
                title={note.title}
                content={note.content}
              />
            </Link>
          ))}
      </div>
    );
}

export default NoteList;