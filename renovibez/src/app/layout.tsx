import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/navigation-wrapper";
import FooterEnhanced from "@/components/layout/FooterEnhanced";
import { CookieBanner } from "@/components/cookie-banner";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renovibez - Vertrouwde Aannemers voor Uw Droomrenovatie",
  description: "Selecteer uw renovatieproject, ontvang 3 offertes van geverifieerde aannemers, en transformeer uw huis met vertrouwen. Anonieme matching voor eerlijke prijzen.",
  keywords: "renovatie, aannemers, badkamer, keuken, woonkamer, offerte, geverifieerd, Nederland",
  authors: [{ name: "Renovibez Team" }],
  creator: "Renovibez",
  publisher: "Renovibez",
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
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://renovibez.nl",
    siteName: "Renovibez",
    title: "Renovibez - Vertrouwde Aannemers voor Uw Droomrenovatie",
    description: "Selecteer uw renovatieproject, ontvang 3 offertes van geverifieerde aannemers, en transformeer uw huis met vertrouwen.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Renovibez - Uw partner in renovatie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovibez - Vertrouwde Aannemers voor Uw Droomrenovatie",
    description: "Selecteer uw renovatieproject, ontvang 3 offertes van geverifieerde aannemers.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://renovibez.nl",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#DA7756",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-bg text-ink`}
      >
        <Providers>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-terracotta text-white px-4 py-2 rounded-lg z-50"
          >
            Spring naar hoofdinhoud
          </a>
          <NavigationWrapper />
          <main id="main-content" className="pt-16" role="main">
            {children}
          </main>
          <FooterEnhanced />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
