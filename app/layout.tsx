import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <body>
        <div className="flex">
          <Toaster position="top-right" reverseOrder={false} />
          {/* Layout wrapper includes client-side logic */}
          <LayoutWrapper>{children}</LayoutWrapper>
        </div>
      </body>
    </html>
  );
}
