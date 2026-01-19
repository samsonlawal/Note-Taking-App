"use client";
import { Router } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/config/supabaseClient";

// Define the type for the context
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth: any = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Load the token from local storage on initial render and restore Supabase session
  useEffect(() => {
    const initAuth = async () => {
      console.log("Initializing authentication...");

      // Check for existing Supabase session (this is important for RLS!)
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        console.log("Supabase session found:", session.user.id);
        setAccessTokenState(session.access_token);
        setUserId(session.user.id);
        localStorage.setItem("NoteApptoken", session.access_token);
        localStorage.setItem("userId", session.user.id);
      } else {
        console.log("No Supabase session found, checking localStorage...");

        // Fallback to localStorage
        const storedToken = localStorage.getItem("NoteApptoken");
        if (storedToken) {
          setAccessTokenState(storedToken);
          console.log("Token loaded from localStorage");
        }

        const userID = localStorage.getItem("userId");
        if (userID) {
          setUserId(userID);
          console.log("UserId loaded from localStorage:", userID);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Save the token to local storage whenever it changes
  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token); // Update the state
    if (token) {
      localStorage.setItem("NoteApptoken", token); // Save token if not null
    } else {
      localStorage.removeItem("NoteApptoken"); // Remove token if null
    }
  };

  const logout = async () => {
    console.log("Logging out...");

    // Sign out from Supabase (this clears the session)
    await supabase.auth.signOut();

    // Clear local state and storage
    setAccessToken(null);
    localStorage.removeItem("NoteApptoken");
    localStorage.removeItem("userId");
    setUserId("");
    setIsLoggedIn(false);

    console.log("Logout complete");
    router.push("/");
  };

  useEffect(() => {
    if (!isLoading && accessToken !== null) {
      setIsLoggedIn(true);
      // console.log(accessToken ? "Access" : "No Access");
    }
  }, [accessToken, isLoading, isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        logout,
        isLoading,
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
