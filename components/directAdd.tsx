import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  content: string;
}

const AddNote: React.FC = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  let idString = "";

  // Load notes from localStorage on initial render
  useEffect(() => {
    const storedNotes = localStorage.getItem("Notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Update search input and title state
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setTitle(e.target.value);
  };

  // Add a new note
  const handleAddNote = () => {
    // Ensure title is not empty
    if (!title.trim()) {
      return; // or show an error message
    }

    // Generate unique id for the new note
    idString = title.replace(/\s/g, "").toLowerCase();

    // Create new note object
    const newItem: Note = {
      title: title,
      content: "Start A Note",
      id: idString,
    };

    // Update notes state and localStorage
    const updatedNotes = [...notes, newItem];
    setNotes(updatedNotes);
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));

    // Navigate to new note page
    // setTimeout(() => {
    //   router.push(`/note/${idString}`);
    // }, 5000);

    // router.push(`/untitled`);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="mb-2 gap-1 w-full flex flex-row items-center justify-center text-neutral-600/40">
        <input
          placeholder="Note Title"
          type="text"
          className="w-full px-2 py-2 text-sm text-black bg-neutral-100 outline-none rounded"
          onChange={handleSearchInput}
          value={searchInput}
        />
      </div>
      <button
        className="text-sm w-[86px] px-1 py-2 hover:bg-gray-900 text-white rounded bg-gray-800"
        onClick={handleAddNote}
      >
        Add Note
      </button>
    </div>
  );
};

export default AddNote;
