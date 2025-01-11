import Navbar from "../Navbar";
import Hero from "./Hero";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

function HomePage() {
  const { accessToken, isLoading, isLoggedIn, data } = useAuth();
  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const userIsLogged = !!accessToken;

  useEffect(() => {
    // Check if the user is logged in and on the homepage
    if (userIsLogged && pathname === "/") {
      // Redirect the user to the note page
      router.replace("/note/the-beginning");
    } else {
      setLoading(false);
    }
  }, [userIsLogged, pathname, router]);

  // If loading, display nothing (prevents flickering)
  if (loading) {
    return null;
  }

  return (
    <div className="max-screen-wrapper">
      <div className="max-screen-inner">
        <div className="flex justify-center items-center flex-col h-full max-h-fit w-full">
          {/* <Navbar /> */}
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
