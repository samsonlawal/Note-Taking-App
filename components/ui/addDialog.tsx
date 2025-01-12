"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./dialog"; // Update the path to where your dialog file is located.

import { Trash } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";

const AddNoteDialog = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput(""); // Clear the input field
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddNote = () => {
    if (title.trim() && tags.length > 0) {
      console.log("New Note Created:", { title, tags });
      setTitle(""); // Reset the fields
      setTags([]);
    } else {
      alert("Please fill out the title and add at least one tag.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-gray-600 font-poppins">
        <div
          className={`bg-none hover:bg-gray-300 w-[100%] px-2 rounded py-1 transition-colors duration-100 stroke-[1] stroke-gray-700 cursor-pointer`}
        >
          <Tooltip
            placement="right"
            showArrow={true}
            className="bg-gray-200 rounded-lg mx-4 font-semibold font-outfit border border-gray-300 text-xs"
            content={<div className="text-tiny">Delete Note</div>}
          >
            <Trash className="stroke-inherit stroke-[1] min-w-5 w-5" />
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-poppins font-[500] text-[24px]">
            Add New Note
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 mt-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="note-title"
              className="block text-base font-medium text-gray-700 font-poppins"
            >
              Title
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-400 outline-none focus:ring-0 rounded-md shadow-sm focus:border-black font-poppins text-sm h-[46px]"
              placeholder="Enter note title"
            />
          </div>

          {/* Tags Input */}
          <div className="">
            <label
              htmlFor="note-tag"
              className="block text-base font-medium text-gray-700 font-poppins mb-1"
            >
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-2 border border-gray-400 rounded-md p-2 font-poppins font-normal">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-[2px] bg-gray-300 text-blue-700 px-2 py-[5px] rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-500 hover:bg-gray-500/40 focus:outline-none bg-gray-400 rounded-full px-[5.5px]"
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
                className="flex-grow border-none outline-none focus:ring-0 placeholder-gray-400 focus:border-black text-sm h-[26px]"
                placeholder="Press Enter to add a tag"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add
          </button>
          <DialogClose className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
