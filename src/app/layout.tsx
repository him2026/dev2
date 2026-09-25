import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import JsonLd, { websiteSchema, softwareApplicationSchema, organizationSchema, faqSchema } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const viewport: Viewport = {
  themeColor: "#FF7096",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.herintelligentmate.in"),
  title: {
    default: "HIM - Her Intelligent Mate | #1 AI Period Companion, Women Wellness & Feminine AI Website",
    template: "%s | HIM - Her Intelligent Mate",
  },
  description: "Her Intelligent Mate (HIM) is the world's #1 AI Period Companion & Women Wellness website. Free online period tracker, menstrual cycle prediction, PMS relief, feminine AI chat, mood tracking, and 24/7 voice companion for women at herintelligentmate.in.",
  keywords: [
    "period tracker",
    "period tracker online",
    "period companion",
    "AI period companion",
    "period tracker online",
    "menstrual cycle tracker",
    "menstrual health website",
    "women wellness website",
    "wellness for women",
    "female wellness platform",
    "feminine AI companion",
    "AI companion for women",
    "women AI companion",
    "female AI assistant",
    "feminine wellness AI",
    "women health AI companion",
    "empathetic AI women",
    "AI for women",
    "female health companion",
    "women menstrual AI",
    "cycle tracking AI",
    "PMS support AI",
    "PMS relief online",
    "PMS tracker",
    "ovulation tracker",
    "ovulation calculator",
    "fertility tracker",
    "period prediction online",
    "women health website India",
    "best period tracker online",
    "free period tracker",
    "period calendar",
    "menstruation tracker",
    "her intelligent mate",
    "herintelligentmate.in",
    "HIM website",
    "HIM AI"
  ],
  authors: [{ name: "Her Intelligent Mate Team", url: "https://www.herintelligentmate.in" }],
  creator: "Her Intelligent Mate",
  publisher: "Her Intelligent Mate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.herintelligentmate.in",
    languages: {
      "en-US": "https://www.herintelligentmate.in",
      "en-IN": "https://www.herintelligentmate.in",
      "x-default": "https://www.herintelligentmate.in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.herintelligentmate.in",
    siteName: "HIM - Her Intelligent Mate",
    title: "HIM - Her Intelligent Mate | #1 AI Period Companion & Women Wellness Website",
    description: "Free AI period tracker, menstrual cycle prediction, PMS relief companion, mood tracking & 24/7 feminine voice chat. Join women worldwide on herintelligentmate.in.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HIM - AI Period Companion & Women Wellness Website - herintelligentmate.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIM - #1 AI Period Companion & Women Wellness Website | herintelligentmate.in",
    description: "Free AI period tracker & feminine wellness companion. Cycle prediction, PMS relief, mood tracking & voice chat for women worldwide.",
    images: ["/images/og-image.jpg"],
    creator: "@HerIntelligentM",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
      "yandex-verification": process.env.YANDEX_SITE_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/dashboard.css" />
        <link rel="stylesheet" href="/css/tracker.css" />
        <link rel="stylesheet" href="/css/chat.css" />
        <link rel="stylesheet" href="/css/landing.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <JsonLd data={[websiteSchema, softwareApplicationSchema, organizationSchema, faqSchema]} />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" async></script>
      </body>
    </html>
  );
}
