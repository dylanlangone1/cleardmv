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
    default:  "ClearDMV — Free DMV Registration & License Check",
    template: "%s | ClearDMV",
  },
  description: "Check your vehicle registration status, find DMV holds, toll violations, and license issues in seconds — free. AI-powered step-by-step guidance for NH, NY, MA, ME, RI, CT, and VT.",
  keywords: ["DMV registration check", "vehicle registration status", "registration hold", "toll violation", "license suspended", "DMV help", "check license plate"],
  openGraph: {
    title:       "ClearDMV — Free DMV Registration & License Check",
    description: "Find DMV holds, toll violations, and license issues in seconds. Free AI-powered guidance.",
    siteName:    "ClearDMV",
    url:         "https://cleardmv.com",
    type:        "website",
    locale:      "en_US",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "ClearDMV — Free DMV Registration & License Check",
    description: "Find DMV holds and registration issues instantly. Free AI-powered guidance.",
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
