"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { signupSchema } from "@/components/auth/schemas/signupSchema";
import supabase from "@/config/supabaseClient";
import { AuthError } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await signup();
    },
  });

  const signup = async () => {
    try {
      // Validate form before submission
      setIsSubmitting(true);
      await formik.validateForm();

      // Check if there are any form errors
      if (Object.keys(formik.errors).length > 0) {
        return;
      }

      const { email, password, name } = formik.values;

      // const { data: existingUser, error: queryError } = await supabase
      //   .from("auth.users") // Replace with your users table name
      //   .select("id")
      //   .eq("email", email)
      //   .single(); // Check for a single user with the provided email

      // if (queryError) {
      //   console.error("Error checking email existence:", queryError);
      //   toast.error("An error occurred while checking the email.");
      //   return;
      // }

      // if (existingUser) {
      //   toast.error("Email already exists. Please use a different email.");
      //   return;
      // }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Optional: Add additional user metadata
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        // Handle Supabase signup error
        console.error("Signup error:", error);
        // You might want to set a form-level error or show a toast
        formik.setStatus(error.message);
        return;
      }

      // Handle successful signup
      // console.log("Signup successful:", data);
      // toast.success(
      //   "Signup successful! \n\nCerification link sent to your email",
      //   {
      //     duration: 4000,
      //   }
      // );
      toast.success("Signup successful! Verification link sent to your email", {
        duration: 4000,
      });
      // Optional: Redirect or show success message
      // router.push('/dashboard') or set a success state
    } catch (error) {
      // console.error("Unexpected signup error:", error);
      formik.setStatus("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[900px] pt-[80px] px-10 bg-transparent font-outfit">
      <form
        autoComplete="off"
        className="w-[400px] flex flex-col gap-6 items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center w-[85%] flex flex-col pb-5 gap-2">
          <h1 className="text-3xl font-black font-clash">Sign Up</h1>
          <p className="text-[16px] text-gray-400">
            Create an account & Start your journey toward effortless note-taking
            today.
          </p>
        </div>

        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="px-[2px]">
            Full Name
          </label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            type="text"
            placeholder="Enter your full name"
            className={`w-full h-[40px] px-2 border py-2 rounded-md mb-1 dark:bg-gray-700 dark:focus:border-gray-700 ${
              formik.errors.name && formik.touched.name
                ? "outline-red-500 outline-1"
                : ""
            }`}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        {/* Email Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="px-[2px]">
            Email
          </label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            type="email"
            placeholder="Enter your email address"
            className={`w-full h-[40px] px-2 border py-2 rounded-md mb-1 dark:bg-gray-700 dark:focus:border-gray-800 ${
              formik.errors.email && formik.touched.email
                ? "outline-red-500 outline-1"
                : ""
            }`}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="px-[2px]">
            Password
          </label>
          <div className="relative">
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className={`w-full h-[40px] px-2 border py-2 rounded-md mb-1 dark:bg-gray-700 dark:focus:border-gray-800 ${
                formik.errors.password && formik.touched.password
                  ? "outline-red-500 outline-1"
                  : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              <img
                src={`/icons/${showPassword ? "EyeIcon" : "EyeOffIcon"}.svg`}
                alt=""
              />{" "}
            </button>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="confirmPassword" className="px-[2px]">
            Confirm Password
          </label>
          <div className="relative">
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={`w-full h-[40px] px-2 border py-2 rounded-md mb-1 dark:bg-gray-700 dark:focus:border-gray-800 ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "outline-red-500 outline-1"
                  : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={toggleConfirmPasswordVisibility}
            >
              <img
                src={`/icons/${
                  showConfirmPassword ? "EyeIcon" : "EyeOffIcon"
                }.svg`}
                alt=""
              />
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center bg-[#171b1f] text-white py-2 rounded-md w-full hover:bg-[#000000] transition duration-300 ease-in-out dark:hover:bg-gray-200 dark:bg-white dark:text-gray-800 ${
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
            "Sign Up"
          )}
        </button>

        <p className="text-[15px]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-700 font-medium">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
