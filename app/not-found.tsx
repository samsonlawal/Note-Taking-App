import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 h-full w-full text-start gap-3 font-outfit">
      <h2 className="text-[70px] font-black">Not Found!</h2>
      <p className="text-[25px] font-bold">Could not find requested page</p>
      <button className="px-4 py-3 text-white font-medium bg-gray-500 border-r">
        <Link href="/">Return Home</Link>
      </button>
    </div>
  );
}
