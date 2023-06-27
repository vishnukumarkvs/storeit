import AmplifyProvider from "@/lib/providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Storeit",
  description: "Simply store your files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AmplifyProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </AmplifyProvider>
    </html>
  );
}
