import Link from "next/link";
import { Button } from "../button";
import { PencilIcon } from "lucide-react";
import Features from "../Features";

function Hero() {
  return (
    <div className="h-fit py-[80px] flex flex-col justify-center items-center text-center gap-[20px] magicpattern">
      <Features />
      <h1 className="text-[80px] font-clash font-bold leading-[88px]">
        Your Thoughts, Organized. Anytime, Everywhere.
      </h1>
      <div className="w-[500px]">
        <p className=" text-[18px] font-poppins">
          Effortlessly capture ideas, stay productive, and keep your notes
          within reach—wherever life takes you.
        </p>
      </div>
      <Link href="auth/signup">
        <Button
          variant="default"
          className="hidden md:inline-block rounded-2xl font-clash font-medium w-[200px] h-fit py-[10px] text-[18px]"
        >
          Get Started Here
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
