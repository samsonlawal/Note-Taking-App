"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";

function ThemeSwitcher({ position, showTip }: any) {
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
      {showTip ? (
        <Tooltip
          placement={position}
          showArrow={true}
          className="bg-gray-200 dark:bg-gray-700 rounded-lg mx-4 font-outfit border border-gray-300 dark:border-gray-800 text-xs"
          content={<div className="text-tiny">Mode</div>}
        >
          <button
            // className="cursor-not-allowed"
            className="cursor-pointer flex"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {resolvedTheme === "light" ? (
              <Moon className="stroke-[#374151] stroke-[1] min-w-5 w-5" />
            ) : null}
            {resolvedTheme === "dark" ? (
              <Sun className="stroke-[1] min-w-5 w-5" />
            ) : null}
          </button>
        </Tooltip>
      ) : (
        <button
          // className="cursor-not-allowed"
          className="cursor-pointer flex"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "light" ? (
            <Moon className="stroke-[#374151] stroke-[1] min-w-5 w-5" />
          ) : null}
          {resolvedTheme === "dark" ? (
            <Sun className="stroke-[1] min-w-5 w-5" />
          ) : null}
        </button>
      )}
    </>
  );
}

export default ThemeSwitcher;
