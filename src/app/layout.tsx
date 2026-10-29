import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LiviLeads Partner Program | Grow Your Network. Earn With Every Business You Bring.",
  description:
    "Partner with LiviLeads, introduce businesses to smarter business management solutions, and earn recurring Livi Points from eligible subscriptions and renewals.",
  keywords: [
    "LiviLeads Partner Program",
    "Business Referral Program",
    "Earn Livi Points",
    "B2B Partner Network",
    "Affiliate Program",
    "Recurring Commission",
  ],
  authors: [{ name: "LiviLeads" }],
  openGraph: {
    title: "LiviLeads Partner Program",
    description: "Grow your network and earn Livi Points with every business you introduce to LiviLeads.",
    type: "website",
    siteName: "LiviLeads",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jakarta.className} ${inter.variable} antialiased`}>
      <body className={`${jakarta.className} min-h-screen font-sans bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900`}>
        {children}
      </body>
    </html>
  );
}

