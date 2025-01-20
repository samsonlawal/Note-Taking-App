import Navbar from "../Navbar";
import Hero from "./Hero";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import supabase from "@/config/supabaseClient";
import { useDataContext } from "@/context/DataContext";

function HomePage() {
  const { resolvedTheme } = useTheme();
  const { accessToken, isLoading, isLoggedIn, userId } = useAuth();
  const { data, setData } = useDataContext();
  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const userIsLogged = !!accessToken;

  // useEffect(() => {
  //   // Check if the user is logged in and on the homepage
  //   if (userIsLogged && pathname === "/") {
  //     // Redirect the user to the note page
  //     router.replace("/note/the-beginning");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [userIsLogged, pathname, router]);

  // If loading, display nothing (prevents flickering)
  // if (loading) {
  //   return null;
  // }

  useEffect(() => {
    if (!userId) return;

    const fetchNotes = async () => {
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setData(data);
        // console.log("set data");
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, [userId, setData]);

  return (
    <div className="max-screen-wrapper ">
      <div className="max-screen-inner">
        <div className="flex justify-center items-center flex-col max-h-screen h-screen w-full">
          {/* <Navbar /> */}
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
