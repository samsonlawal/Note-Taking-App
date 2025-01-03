import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 h-full w-full text-start gap-3 font-outfit">
      <h2 className="text-[70px] font-black">Not Found!</h2>
      <p className="text-[25px] font-bold">Could not find requested page</p>
      <Button variant="default">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
