"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import supabase from "@/config/supabaseClient";
import { useAuth } from "@/context/AuthContext";
// import router, { useRouter } from "next/router";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // For validation errors
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const router = useRouter();

  // useEffect(() => {
  //   console.log(accessToken);
  // }, [accessToken]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Basic validation
    if (!formValues.email || !formValues.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Supabase login logic
      let { data, error } = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      // console.log("sign in:", data);
      // console.log("userId", data.user?.id || "");

      //       const { user, session, error } = await supabase.auth.signIn({
      //   email: 'example@email.com',
      //   password: 'example-password',
      // })

      if (error) {
        setError("Invalid email or password.");
        toast.error("Login failed. Please check your credentials.");
        return;
      }

      // Store token in sessionStorage
      localStorage.setItem("NoteApptoken", data.session?.access_token || "");
      localStorage.setItem("userId", data.user?.id || "");

      setAccessToken(data?.session?.access_token);
      toast.success("Login successful!");

      // If notes are in Local Storage:
      const notes = JSON.parse(localStorage.getItem("Notes") || "[]");

      if (notes.length > 0) {
        console.log(notes.length, notes[0].id);
        const firstNoteId = notes[0].id; // Assuming notes have an id
        router.push(`/note/${firstNoteId}`);
      }
      // else {
      //   // Redirect to a placeholder or dummy page if no notes exist
      //   router.push("/note/dummy");
      // }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[900px] py-6 px-10 bg-transparent font-outfit">
      <form
        autoComplete="off"
        noValidate
        className="w-full md:w-[400px] flex flex-col gap-6 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="text-center w-[85%] flex flex-col gap-2">
          <h1 className="text-3xl font-black">Welcome back!</h1>
          <p className="text-[16px] text-gray-500">
            Access your notes and pick up right where you left off.
          </p>

          {/* Error message */}
          <div className="min-h-[40px]">
            {error && (
              <div className="w-full py-[4px] bg-red-500/20 rounded-sm text-red-600">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="px-[2px]">
            Email
          </label>
          <input
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full h-[40px] px-2 border py-2 rounded-md mb-1"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="px-[2px]">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-[40px] px-2 border py-2 rounded-md mb-1"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              <img
                src={`/icons/${showPassword ? "EyeIcon" : "EyeOffIcon"}.svg`}
                alt=""
              />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center bg-[#171b1f] text-white py-2 rounded-md w-full hover:bg-[#000000] transition duration-300 ease-in-out ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <p>Logging In...</p>
              <svg
                className="animate-spin h-5 w-5 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </>
          ) : (
            "Log In"
          )}
        </button>

        <p className="text-[15px]">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-blue-700 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
