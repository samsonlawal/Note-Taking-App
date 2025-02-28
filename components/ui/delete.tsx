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
import supabase from "@/config/supabaseClient";
// import {useDataContext} from '@/context/DataContext'

const DeleteNote = ({ deleteHandler }: any) => {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger className="w-full">
        <button
          type="submit"
          className="text-red-500 flex items-center justify-center border border-red-600 
            py-2 px-4 rounded-lg w-full hover:bg-red-300 hover:text-red-600 transition-all duration-300 
            ease-in-out gap-2 text-sm font-medium font-poppins group"
        >
          Delete Note
          <Trash className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[90%] md:max-w-lg rounded-lg bg-[red] px-5 md:p-auto">
        <DialogHeader className="flex flex-col items-center justify-center">
          <div className="mb-4 transition-transform hover:scale-105">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-[80px] text-red-500"
            />
          </div>
          <DialogTitle className="font-poppins text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Delete Note?
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col mb-6 mt-2 text-center">
          <p className="font-poppins text-gray-300 text-[15px] leading-relaxed">
            This action cannot be undone. The note will be permanently deleted
            from your account.
          </p>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-4">
          <DialogClose
            className="flex-1 px-4 md:px-6 py-2.5 border-gray-300 border-[1.5px] text-gray-700 dark:text-gray-300 rounded-lg 
            font-poppins font-medium hover:bg-gray-300 dark:hover:text-gray-700 transition-colors duration-300"
          >
            Cancel
          </DialogClose>

          {/* Delete Button */}
          <DialogClose
            className="flex-1 px-4 md:px-6 py-2.5 bg-red-600 text-white rounded-lg font-poppins 
            font-medium hover:bg-red-700 transition-colors duration-300 
            focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <button onClick={deleteHandler}>Delete</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNote;
