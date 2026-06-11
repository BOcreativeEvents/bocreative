import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono, Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/ui/global-nav";
import CustomCursor from "@/components/ui/custom-cursor";
import SiteFooter from "@/components/ui/site-footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "BlueOcean | Experience Architecture in Motion™",
  description: "BlueOcean — Strategy · Experience Design · Orchestration. Established 2009.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable} ${cormorant.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <GlobalNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
