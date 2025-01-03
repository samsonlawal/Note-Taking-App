import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/ui/Navbar";
import Initializers from "./Initializers";
import { DataProvider } from "@/context/DataContext";

// app/layout.tsx (Server-side Layout without client-side logic)
export const metadata = {
  title: "Note App",
  description: "A note taking app built with next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700,1&f[]=poppins@100,101,200,201,300,301,400,401,500,501,601,700,701,800,801,900,901&display=swap"
          rel="stylesheet"
        />
      </head>
      <AuthProvider>
        <DataProvider>
          <body>
            <div className="flex flex-col justify-center">
              <Toaster position="top-right" reverseOrder={false} />
              {/* Layout wrapper includes client-side logic */}
              <Initializers>{children}</Initializers>
            </div>
          </body>
        </DataProvider>
      </AuthProvider>
    </html>
  );
}
