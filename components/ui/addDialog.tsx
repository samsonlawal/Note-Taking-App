"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./dialog";

import { CirclePlus } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import supabase from "@/config/supabaseClient";
import toast from "react-hot-toast";

interface Note {
  id: string;
  title: string;
  content: string;
}

const AddNoteDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { userId } = useAuth();

  const handleAddNote = async () => {
    if (!title.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const idString = title.replace(/\s/g, "").toLowerCase();

    try {
      // Check for existing notes
      const { data: existingNotes, error: checkError } = await supabase
        .from("notes")
        .select("id")
        .eq("user_id", userId)
        .eq("title", title);

      if (checkError) {
        throw new Error("Error checking for existing notes.");
      }

      if (existingNotes && existingNotes.length > 0) {
        toast.error("A note with this title already exists.");
        return;
      }

      // Insert new note
      const { error } = await supabase.from("notes").insert([
        {
          title: title,
          content: "",
          user_id: userId,
          noteId: idString,
          tags: tags,
        },
      ]);

      if (error) throw error;

      // Clear form and close dialog
      setTitle("");
      setTags([]);
      setIsOpen(false);

      // Show success message
      toast.success("Note created successfully!");

      // Navigate after successful creation
      router.push(`/note/${idString}`);
      router.refresh(); // Force refresh to update the notes list
    } catch (err) {
      console.error("Error adding note:", err);
      toast.error("Failed to create note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-gray-600 font-poppins">
        <div className="bg-none hover:bg-gray-300 dark:hover:bg-gray-900 md:w-[95%] w-[100%] px-2 rounded py-1 transition-colors duration-100 stroke-[1] stroke-gray-700 dark:stroke-gray-200 cursor-pointer">
          <Tooltip
            placement="right"
            showArrow={true}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg mx-4 font-outfit border border-gray-300 dark:border-gray-800 text-xs"
            content={<div className="text-tiny">New Note</div>}
          >
            <CirclePlus className="stroke-inherit stroke-[1] min-w-5 w-5" />
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-full rounded-lg">
        <DialogHeader>
          <DialogTitle className="font-poppins font-[500] text-[24px] text-left">
            Add New Note
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 mt-4">
          <div>
            <label
              htmlFor="note-title"
              className="block text-base font-medium text-gray-700 font-poppins dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-400 outline-none focus:ring-0 rounded-md shadow-sm focus:border-black dark:focus:border-gray-800 font-poppins text-sm h-[46px] bg-white/60 dark:bg-gray-600"
              placeholder="Enter note title"
            />
          </div>

          <div>
            <label
              htmlFor="note-tag"
              className="block text-base font-medium text-gray-700 font-poppins mb-1 dark:text-gray-300"
            >
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-2 border border-gray-400 rounded-md p-2 font-poppins font-normal bg-white/60 dark:bg-gray-600">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-[2px] bg-gray-300 text-gray-800 dark:text-gray-300 dark:bg-gray-800 px-2 py-[5px] text-sm rounded-md"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-500 hover:bg-gray-500/40 dark:hover:bg-gray-400/40 focus:outline-none bg-gray-400 dark:bg-gray-700 rounded-full px-[5.5px]"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                id="note-tag"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-grow border-none outline-none focus:ring-0 placeholder-gray-400 focus:border-black text-sm h-[26px] bg-none bg-white/70 py-2 dark:bg-gray-600"
                placeholder="Press Enter to add a tag"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-4">
          <button
            onClick={handleAddNote}
            disabled={isSubmitting}
            className="w-[100px] py-2 bg-black dark:bg-gray-900 hover:bg-black/90 text-white rounded-md transition-colors duration-300 font-poppins disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="w-[100px] py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors duration-300 font-poppins"
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;