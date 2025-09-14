import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { locales } from '@/i18n/config';

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client side
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen transition-colors duration-200">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        
        {/* Theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Apply theme immediately to prevent flash
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              
              // Global theme toggle function
              window.toggleTheme = function() {
                const isDark = document.documentElement.classList.contains('dark');
                if (isDark) {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
                
                // Dispatch custom event to notify React components
                window.dispatchEvent(new CustomEvent('themeChanged', {
                  detail: { theme: isDark ? 'light' : 'dark' }
                }));
              };
            `
          }}
        />
      </body>
    </html>
  );
}
