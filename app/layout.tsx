import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClearDMV — AI-Powered DMV Help",
  description: "Registration holds, toll violations, license reinstatements, title transfers — get step-by-step AI guidance for any DMV issue in seconds.",
  openGraph: {
    title: "ClearDMV — AI-Powered DMV Help",
    description: "The DMV doesn't have to be a nightmare. Get clear, specific help for any DMV issue.",
    siteName: "ClearDMV",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
