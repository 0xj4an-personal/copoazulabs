import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copoazú Labs - Web3 Fashion & Merchandise",
  description: "Discover exclusive Web3 branded clothing and merchandise. Connect your wallet, shop with crypto, and join the decentralized fashion revolution.",
  keywords: ["Web3", "fashion", "merchandise", "crypto", "blockchain", "clothing", "NFT", "decentralized"],
  authors: [{ name: "Copoazú Labs" }],
  creator: "Copoazú Labs",
  publisher: "Copoazú Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://copoazulabs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Copoazú Labs - Web3 Fashion & Merchandise",
    description: "Discover exclusive Web3 branded clothing and merchandise. Connect your wallet, shop with crypto, and join the decentralized fashion revolution.",
    url: 'https://copoazulabs.com',
    siteName: 'Copoazú Labs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Copoazú Labs - Web3 Fashion & Merchandise',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Copoazú Labs - Web3 Fashion & Merchandise",
    description: "Discover exclusive Web3 branded clothing and merchandise. Connect your wallet, shop with crypto, and join the decentralized fashion revolution.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#3D7DD6" />
      </head>
      <body className="min-h-screen transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
