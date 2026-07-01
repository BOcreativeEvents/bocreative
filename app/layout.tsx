import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/ui/global-nav";
import CustomCursor from "@/components/ui/custom-cursor";
import SiteFooter from "@/components/ui/site-footer";
import { Analytics } from "@vercel/analytics/next";

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

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bocreative.me"),
  verification: {
    google: ["fdMKR6HMiBuI9by1peCr16m65YFULQ1Kz-gEgTlw3H4", "886c03b11ecb10bf"],
  },
  title: "BO Creative  Experience Architecture in Motion™",
  description: "BO Creative  Strategy · Experience Design · Orchestration. A brand experience partner since 2009.",
  openGraph: {
    type: "website",
    siteName: "BO Creative",
    title: "BO Creative  Experience Architecture in Motion™",
    description: "BO Creative  Strategy · Experience Design · Orchestration. A brand experience partner since 2009.",
    url: "https://bocreative.me",
    images: [
      {
        url: "https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG",
        width: 1200,
        height: 630,
        alt: "BO Creative  Experience Architecture in Motion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BO Creative  Experience Architecture in Motion™",
    description: "BO Creative  Strategy · Experience Design · Orchestration. A brand experience partner since 2009.",
    images: [
      "https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <GlobalNav />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
