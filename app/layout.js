import Navbar from "@/components/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import { dbConnect } from "@/services/mongo";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventry - Home",
  description: "A single entry to connected events",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="p-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
