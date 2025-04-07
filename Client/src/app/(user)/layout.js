"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({ children }) {
  const pathname = usePathname();

  return (
    <main className={inter.className}>
        <Navbar pathname={pathname} />
        {children}
        <Footer />
    </main>
  );
}
