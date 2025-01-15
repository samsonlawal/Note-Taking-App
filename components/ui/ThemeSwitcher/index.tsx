"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !resolvedTheme) {
      setTheme("light");
    }
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;
  return (
    <>
      <Tooltip
        placement="right"
        showArrow={true}
        className="bg-gray-200 dark:bg-gray-700 rounded-lg mx-4 font-outfit border border-gray-300 dark:border-gray-800 text-xs"
        content={<div className="text-tiny">Dark/Light</div>}
      >
        <button
          // className="cursor-not-allowed"
          className="cursor-pointer hidden lg:flex"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "light" ? (
            <Moon className="stroke-inherit stroke-[1] min-w-5 w-5" />
          ) : null}
          {resolvedTheme === "dark" ? (
            <Sun className="stroke-[1] min-w-5 w-5" />
          ) : null}
        </button>
      </Tooltip>

      {/* <button
        className="lg:hidden relative flex items-center w-16 h-8 border-none outline-none bg-[#E7E7E7] dark:bg-[#292929] rounded-full p-1 transition-all duration-300"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <div
          className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            resolvedTheme === "dark" ? "translate-x-8" : "translate-x-0"
          }`}
        ></div>

        <SunIcon
          className={`absolute w-4 h-4${
            resolvedTheme === "dark" ? "text-[#838383]" : "text-[#111111]"
          }`}
          style={{
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        <img
          src={
            resolvedTheme === "dark"
              ? "/icons/MoonIcon.svg"
              : "/icons/inactiveMoon.svg"
          }
          alt="Moon"
          className={`absolute w-4 h-4 ${
            resolvedTheme === "dark" ? "text-[#FFFFFF]" : "text-[#838383]"
          }`}
          style={{
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </button> */}
    </>
  );
}

export default ThemeSwitcher;
