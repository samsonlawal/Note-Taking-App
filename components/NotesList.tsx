import React, { useEffect } from 'react';
import {noteData} from '../noteData';
import NoteTitle from './NoteTitle'
import Link from 'next/link';
import { useDataContext } from "@/context/DataContext";
import supabase from "@/config/supabaseClient";
import { useAuth } from "@/context/AuthContext";

const NoteList: React.FC = () => {
  const { local, setLocal } = useDataContext();
  const { data, setData } = useDataContext();
  const { userId, accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      // Define and immediately invoke the async function
      const fetchNotes = async () => {
        try {
          const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", userId) // Fetch notes for the logged-in user
            .order("created_at", { ascending: false });

          if (error) throw error;
          // console.log(data); // Logs the fetched data
          setData(data);
        } catch (err) {
          console.error("Error fetching notes:", err);
          throw err;
        }
      };

      fetchNotes(); // Call the async function here
    }

    // Retrieve the existing notes from localStorage if necessary
    // const storedNotes = localStorage.getItem("Notes");
    // if (storedNotes) {
    //   setLocal(JSON.parse(storedNotes));
    // }
  }, [local, accessToken, userId]); // Ensure this effect runs when `accessToken` or `userId` changes

  return (
    <div className="flex flex-col">
      {data.length !== 0 &&
        data.map((note) => (
          <Link href={`/note/${note.noteId}`} key={note.id}>
            <NoteTitle
              key={note.id}
              title={note.title}
              content={note.content}
              created_at={note.created_at}
              noteId={note.noteId}
            />
          </Link>
        ))}
      {data.length === 0 &&
        noteData.map((note) => (
          <Link href={`/note/${note.id}`} key={note.id}>
            <NoteTitle
              key={note.id}
              title={note.title}
              content={note.content}
            />
          </Link>
        ))}
    </div>
  );
};

export default NoteList;