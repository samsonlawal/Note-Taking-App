import {noteData} from "@/noteData";
import {
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import Note from './NoteTitle'

interface Note {
  id: string;
  title: string;
  content: string;
}


const search: React.FC =() => {
  // const data = noteData
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchData, setSearchData] = useState<Note[]>([])

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
        if (searchInput === '') {
      setSearchData([]); // Reset to all items if search input is empty
    } else {
        const filtered: Note[] = noteData.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchData(filtered);
    }
      // console.log(searchData)
  }, [searchInput])


  return (
    <div>
        <div className="px-1 mb-4 gap-1 w-full flex flex-row items-center justify-center text-neutral-600/40 bg-neutral-100 rounded-lg">
        <Search size={16} />
        <input
        placeholder="Search"
        type="text"
        className="px-1 py-2 text-black bg-neutral-100 outline-none"
        onChange={handleSearchInput}
        value={searchInput}
        />
      </div>

      {searchData && 
    
          <div className="px-2 gap-2 flex flex-col">
            {searchData.map((note) => (
                <Note key={note.id} title={note.title} content={note.content} />
            ))}
        </div>}
    </div>
  )
};

export default search;
