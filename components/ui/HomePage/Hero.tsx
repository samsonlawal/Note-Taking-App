import Link from "next/link";
import { Button } from "../button";
import { PencilIcon } from "lucide-react";
import Features from "../Features";
import { useDataContext } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { noteData } from "@/noteData";

function Hero() {
  const { accessToken } = useAuth();
  const { data } = useDataContext();

  let firstNoteId =
    data && data.length > 0 ? data[0].noteId : noteData[0].noteId;

  return (
    <div className="h-fit mt-[140px] flex flex-col justify-center items-center text-center gap-[20px] w-full px-10">
      <h1 className="text-[60px] font-clash font-bold leading-[68px] max-w-[900px]">
        Your Thoughts, Organized. Anytime, Everywhere.
      </h1>
      <div className="w-[500px]">
        <p className=" text-[18px] font-poppins">
          Effortlessly capture ideas, stay productive, and keep your notes
          within reach—wherever life takes you.
        </p>
      </div>
      {accessToken ? (
        <Link href={`note/${firstNoteId}`}>
          {/* <Button
            variant="default"
            className="hidden md:inline-block rounded-2xl font-clash font-medium w-[200px] h-fit py-[10px] text-[18px]"
          >
            Go To Notes
          </Button> */}
          <button
            type="submit"
            className={`flex items-center justify-center bg-[#171b1f] text-white py-3 rounded-md w-full hover:bg-[#000000] transition duration-300 ease-in-out px-10 dark:bg-gray-700 dark:hover:bg-gray-700/50 font-clash font-medium`}
          >
            Go To Notes
          </button>
        </Link>
      ) : (
        <Link href="auth/sign-up">
          <button
            type="submit"
            className={`flex items-center justify-center bg-[#171b1f] text-white py-3 rounded-md w-full hover:bg-[#000000] transition duration-300 ease-in-out px-10 dark:bg-gray-700 dark:hover:bg-gray-700/50 font-clash font-medium`}
          >
            Get Started Here
          </button>
        </Link>
      )}
    </div>
  );
}

export default Hero;
