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
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
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

  // Load the token from local storage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessTokenState(storedToken);
      console.log(storedToken);
    }

    setIsLoading(false);
  }, []);

  // Save the token to local storage whenever it changes
  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const logout = () => {
    // Clear token from state and local storage
    setAccessToken(null);
    router.push("/");
  };

  useEffect(() => {
    if (!isLoading) {
      console.log(accessToken ? "Access" : "No Access");
    }
  }, [accessToken, isLoading]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
