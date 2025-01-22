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
  created_at: any;
  tags: any;
}

const SearchNote: React.FC = () => {
  // const data = noteData
  const { local, setLocal, data } = useDataContext();

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchData, setSearchData] = useState<Note[]>([]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput === "") {
      setSearchData([]); // Reset to all items if search input is empty
    } else {
      const filtered: Note[] = data.filter((item) => {
        const titleMatch = item.title
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        const tagMatch = item.tags?.some((tag: any) =>
          tag.toLowerCase().includes(searchInput.toLowerCase())
        );
        return titleMatch || tagMatch; // Include if either title or tags match
      });

      setSearchData(filtered);
    }
  }, [searchInput, data]);

  return (
    <>
      <div className="flex items-center justify-start text-neutral-600/40 bg-neutral-100 rounded-lg px-2 m-2 mb-4">
        <Search className="stroke-[1] stroke-black min-w-[17px] h-[17px]" />
        <input
          placeholder="Search by title or tag"
          type="text"
          className="py-2 text-black text-sm bg-neutral-100 outline-none rounded-lg flex-1"
          onChange={handleSearchInput}
          value={searchInput}
        />
      </div>

      {searchInput && (
        <div className="gap-2 flex flex-col">
          {/* Optional header for search results */}
          <h1 className="text-lg font-bold mx-2">Search Results</h1>
          <div className="gap-2 flex flex-col">
            {searchData && searchData.length > 0 ? (
              searchData.map((note) => (
                <Link href={`/note/${note.id}`} key={note.id}>
                  <Note
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    created_at={note.created_at}
                    tags={note.tags}
                  />
                </Link>
              ))
            ) : (
              <h1 className="text-gray-500 mx-2 font-normal text-sm leading-tight">
                No results found.
                <br />
                Try a different search term!
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchNote;
