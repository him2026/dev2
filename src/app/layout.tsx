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
    default: "HIM - Her Intelligent Mate | #1 AI Period Companion & Feminine Health Ally",
    template: "%s | HIM - Her Intelligent Mate",
  },
  description: "Her Intelligent Mate (HIM) is the world's leading AI period companion and feminine wellness assistant. Intelligent cycle tracking, empathetic PMS chat support, mood insights, and voice companion for women globally.",
  keywords: [
    "AI period companion",
    "period companion",
    "feminine AI companion",
    "AI companion period",
    "women AI companion",
    "period tracker AI",
    "cycle tracking AI",
    "PMS support AI companion",
    "feminine health companion",
    "menstrual companion",
    "Her Intelligent Mate",
    "herintelligentmate.in",
    "AI for women health",
    "period buddy AI",
    "female AI assistant",
    "women wellness companion",
    "empathetic period AI"
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.herintelligentmate.in",
    siteName: "HIM - Her Intelligent Mate",
    title: "HIM - Her Intelligent Mate | #1 AI Period Companion & Feminine Health Ally",
    description: "Discover HIM — your empathetic AI period companion. Predict cycle phases, manage PMS symptoms, track moods, and get 24/7 comforting voice and chat support.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HIM - Her Intelligent Mate AI Period Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIM - Her Intelligent Mate | #1 AI Period Companion",
    description: "Empathetic AI period companion for women worldwide. Cycle prediction, PMS emotional support, and voice chat.",
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
