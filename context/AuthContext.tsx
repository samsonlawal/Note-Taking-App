"use client";
import { Router } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the type for the context
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
  userId: string;
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

  // Load the token from local storage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("NoteApptoken");
    if (storedToken) {
      setAccessTokenState(storedToken);
      // console.log(storedToken);
    }

    const userID = localStorage.getItem("userId");
    if (userID) {
      setUserId(userID);
      // console.log(userID);
    }

    setIsLoading(false);
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

const logout = () => {
  // console.log("Before logout, accessToken:", accessToken); // Logs the current token before clearing it

  setAccessToken(null); // Clears the token
  localStorage.removeItem("NoteApptoken");
  localStorage.removeItem("userId");
  setIsLoggedIn(false);
  router.push("/");

  // console.log("After logout, accessToken:", accessToken); // This will log the old token, because the state change hasn't taken effect yet
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
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
