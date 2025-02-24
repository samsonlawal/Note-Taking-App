import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import ThemeSwitcher from "../ThemeSwitcher";
import { noteData } from "@/noteData";

export default function Navbar() {
  const { accessToken } = useAuth();
  const { data } = useDataContext();

  let firstNoteId =
    data && data.length > 0 ? data[0].noteId : noteData[0].noteId;

  return (
    <nav className="w-full fixed top-0 left-0 bg-white px-6 lg:px-10 py-3 border-gray-200 dark:border-gray-900/50 dark:bg-gray-800">
      <div className="max-screen-inner mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="w-fit md:w-[200px] flex items-center">
          <Link
            href="/"
            className="text-[23px] md:text-[27px] font-bold text-gray-800 dark:text-white font-clash"
          >
            Knotte
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex">
          <NavigationMenu className="block">
            <NavigationMenuList className="flex gap-[60px] font-poppins font-medium ">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/documentation"
                    className="text-base hover:text-black/70 dark:hover:text-white/70 transition-colors duration-500"
                  >
                    Documentation
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Get Started Button */}

        <div className="flex items-center space-x-10 w-fit md:w-[250px] justify-end">
          {/* Navigation Menu */}
          <div className="flex md:hidden">
            <NavigationMenu className="block">
              <NavigationMenuList className="flex gap-[60px] font-poppins font-medium ">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/documentation"
                      className="text-base hover:text-black/70 dark:hover:text-white/70 transition-colors duration-500"
                    >
                      Docs
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <ThemeSwitcher position={`bottom`} showTip={false} />

          <div className="hidden md:flex w-fit">
            {accessToken ? (
              <Link href={`note/${firstNoteId}`}>
                {/* // <Link href="/"> */}
                <button
                  type="submit"
                  className={`items-center justify-center bg-[#171b1f] text-white py-[6px] rounded-md w-full hover:bg-[#000000] transition duration-300 ease-in-out px-8 dark:bg-gray-700 dark:hover:bg-gray-700/50 font-clash font-medium`}
                >
                  Notes
                </button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <button
                  type="submit"
                  className={`w-fit items-center justify-center bg-[#171b1f] text-white py-[6px] rounded-md hover:bg-[#000000] transition duration-300 ease-in-out px-8 dark:bg-gray-700 dark:hover:bg-gray-700/50 font-clash font-medium`}
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>

          {/* <Link href="/login">
            <Button
              variant="Navdefault"
              className="hidden md:inline-block rounded-2xl font-clash font-medium"
            >
              Get Started
            </Button>
          </Link> */}

          {/* Mobile Menu */}
          {/* <Button
            variant="ghost"
            className="md:hidden "
            onClick={() => alert("Open Mobile Menu")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </Button> */}
        </div>
      </div>
    </nav>
  );
}
