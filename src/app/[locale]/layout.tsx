import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { VerificationProvider } from "@/contexts/VerificationContext";
import { locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
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
    <>
      {/* Theme script - runs before React hydration to prevent flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Apply theme immediately to prevent flash
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                
                if (theme === 'dark') {
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
              } catch (e) {
                console.warn('Theme script error:', e);
              }
            })();
          `
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>
          <VerificationProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </VerificationProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}