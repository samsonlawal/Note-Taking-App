import Navbar from "../Navbar";
import Hero from "./Hero";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function HomePage() {
  const { accessToken, isLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if there's no access token
    if (!accessToken) {
      router.push("/note/the-beginning");
      console.log("from homepage");
    }
  }, [accessToken]);

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
