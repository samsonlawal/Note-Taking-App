"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./dialogDelete";
import { Trash } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const DeleteNote = () => {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger className="w-full">
        <button
          type="submit"
          className="text-red-500 flex items-center justify-center border border-red-300 
            py-2 px-4 rounded-lg w-full hover:bg-red-50 transition-all duration-300 
            ease-in-out gap-2 text-sm font-medium font-poppins group"
        >
          Delete Note
          <Trash className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader className="flex flex-col items-center">
          <div className="mb-4 transition-transform hover:scale-105">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-[80px] text-red-500"
            />
          </div>
          <DialogTitle className="font-poppins text-2xl font-semibold text-gray-900">
            Delete Note?
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col mb-6 mt-2 text-center">
          <p className="font-poppins text-gray-600 text-[15px] leading-relaxed">
            This action cannot be undone. The note will be permanently deleted
            from your account.
          </p>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-4">
          <DialogClose
            className="flex-1 px-6 py-2.5 border-gray-300 border-[1.5px] text-gray-700 rounded-lg 
            font-poppins font-medium hover:bg-gray-300 transition-colors duration-300"
          >
            Cancel
          </DialogClose>

          {/* Delete Button */}
          <button
            className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg font-poppins 
            font-medium hover:bg-red-700 transition-colors duration-300 
            focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNote;
