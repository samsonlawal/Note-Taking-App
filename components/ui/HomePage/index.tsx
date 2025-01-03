import Navbar from "../Navbar";
import Hero from "./Hero";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function HomePage() {
  const { accessToken, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if there's no access token
    if (!isLoading && accessToken) {
      router.push("/note/beginning");
    }
  }, [accessToken, router]);

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
