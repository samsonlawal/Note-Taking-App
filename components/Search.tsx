import {noteData} from "@/noteData";
import {
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import Note from './NoteTitle'
import Link from "next/link";
import { useDataContext } from "@/context/DataContext";

interface Note {
  id: string;
  title: string;
  content: string;
}

const SearchNote: React.FC = () => {
  // const data = noteData
  const { local, setLocal } = useDataContext();

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchData, setSearchData] = useState<Note[]>([]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput === "") {
      setSearchData([]); // Reset to all items if search input is empty
    } else {
      const filtered: Note[] = local.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchData(filtered);
    }
    // console.log(searchData)
  }, [searchInput]);

  return (
    <>
      <div className="flex items-center justify-start text-neutral-600/40 bg-neutral-100 rounded-lg px-2">
        <Search className="stroke-[1] stroke-black min-w-[17px] h-[17px]" />
        <input
          placeholder="Search"
          type="text"
          className="py-2 text-black text-sm bg-neutral-100 outline-none rounded-lg flex-1"
          onChange={handleSearchInput}
          value={searchInput}
        />
      </div>

      {searchInput && (
        <div className="gap-2 flex flex-col">
          <h1>Result</h1>
          <div className="px-2 gap-2 flex flex-col">
            {searchData.map((note) => (
              <Link href={`/note/${note.id}`} key={note.id}>
                <Note key={note.id} title={note.title} content={note.content} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchNote;
