import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cleardmv.com"),
  title: {
    default:  "ClearDMV | Fix Your Registration Issues Instantly",
    template: "%s | ClearDMV",
  },
  description: "AI-powered DMV assistant for New England. Scan your plate, find holds, and get step-by-step guidance to reinstate your registration.",
  keywords: ["DMV registration check", "vehicle registration status", "registration hold", "toll violation", "license suspended", "DMV help", "check license plate", "reinstate registration", "DMV assistant"],
  openGraph: {
    title:       "ClearDMV | Fix Your Registration Issues Instantly",
    description: "AI-powered DMV assistant for New England. Scan your plate, find holds, and get step-by-step guidance to reinstate your registration.",
    siteName:    "ClearDMV",
    url:         "https://cleardmv.com",
    type:        "website",
    locale:      "en_US",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "ClearDMV | Fix Your Registration Issues Instantly",
    description: "AI-powered DMV assistant for New England. Scan your plate, find holds, and get step-by-step guidance to reinstate your registration.",
    site:        "@cleardmv",
  },
  alternates: {
    canonical: "https://cleardmv.com",
  },
  robots: {
    index:  true,
    follow: true,
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
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
