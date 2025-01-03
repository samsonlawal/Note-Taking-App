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
    <nav className="w-full px-6 lg:px-20 py-2 rounded-xl">
      <div className="max-w-[1336px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[27px] font-bold text-gray-800 font-clash"
        >
          Knotte
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-[60px] font-poppins font-medium ">
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/features" className="text-sm">
                    All Features
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem> */}

            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/docs" className="text-sm">
                    Documentation
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/pricing"
                  className="text-base hover:text-black/70 transition-colors duration-500"
                >
                  Docs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="text-base hover:text-black/70 transition-colors duration-500"
                >
                  FAQs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="text-base hover:text-black/70 transition-colors duration-500"
                >
                  Help
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Get Started Button */}

        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button
              variant="Navoutline"
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
