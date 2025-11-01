import "./globals.css";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import ChatLauncher from "@/components/ChatLauncher";
import type { ReactNode } from "react";

export const metadata = {
  title: "Feminist Diplomacy Simulator",
  description: "Explore policy trade-offs: France vs Sweden",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <HeaderNav />
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500">
          Built for exploration. Not definitive policy advice.
        </footer>
        <ChatLauncher />
      </body>
    </html>
  );
}
