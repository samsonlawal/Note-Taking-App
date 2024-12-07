"use client";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import supabase from "@/config/supabaseClient";

const BasicForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // For storing validation errors
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous error

    // Basic validation
    if (!formValues.email || !formValues.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Mock API call or actual validation logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay
      if (
        formValues.email !== "test@example.com" ||
        formValues.password !== "password"
      ) {
        throw new Error("Incorrect username or password.");
      }

      alert("Login successful!");
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[900px] py-6 px-10 bg-transparent font-outfit">
      <form
        autoComplete="off"
        noValidate
        className="w-[400px] flex flex-col gap-6 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="text-center w-[85%] flex flex-col pb-5 gap-2">
          <h1 className="text-3xl font-black">Welcome back!</h1>
          <p className="text-[16px] text-gray-500">
            Access your notes and pick up right where you left off.
          </p>

          {/* Error message at the top */}
          {error && (
            <div className="w-full my-[20px] py-[4px] bg-red-500/20 rounded-sm text-red-600">
              <p>{error}</p>
            </div>
          )}
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
            className={`w-full h-[40px] px-2 border py-2 rounded-md mb-1`}
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
              className={`w-full h-[40px] px-2 border py-2 rounded-md mb-1`}
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
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
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
          ) : (
            "Submit"
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

export default BasicForm;