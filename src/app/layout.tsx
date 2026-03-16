import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContentAI — AI-Powered Content Planner",
  description:
    "Generate high-converting, niche-specific content from images using AI. Plan, schedule, and manage your social media content in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <div className="ml-64 min-h-screen">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
