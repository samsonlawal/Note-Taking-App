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

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-white px-6 lg:px-10 py-5 border-b-[1px] border-gray-200 dark:border-gray-900/50 dark:bg-gray-800">
      <div className="max-w-[1336px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[27px] font-bold text-gray-800 dark:text-white font-clash"
        >
          Knotte
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:block">
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

        {/* Get Started Button */}

        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button
              variant="Navdefault"
              className="hidden md:inline-block rounded-2xl font-clash font-medium"
            >
              Sign In
            </Button>
          </Link>
          {/* <Link href="/login">
            <Button
              variant="Navdefault"
              className="hidden md:inline-block rounded-2xl font-clash font-medium"
            >
              Get Started
            </Button>
          </Link> */}

          {/* Mobile Menu */}
          <Button
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
          </Button>
        </div>
      </div>
    </nav>
  );
}
