'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { locales, localeNames, localeFlags } from '../i18n/config';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const currentLocale = useLocale();

  useEffect(() => {
    setMounted(true);
    
    // Auto-correct if cookie differs from current locale
    if (typeof document !== 'undefined') {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('preferred-language='))
        ?.split('=')[1];
      
      if (cookieValue && cookieValue !== currentLocale) {
        // Update localStorage to match cookie
        if (typeof window !== 'undefined') {
          localStorage.setItem('preferred-language', cookieValue);
        }
        
        // Redirect to correct URL
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
        const newUrl = `/${cookieValue}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
        
        if (currentPath !== newUrl) {
          window.location.href = newUrl;
        }
      }
    }
  }, [currentLocale]);

  const switchLanguage = (locale: string) => {
    // Store preference in both localStorage and cookie
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', locale);
      
      // Set cookie for server-side access
      document.cookie = `preferred-language=${locale}; path=/; max-age=31536000`; // 1 year
      
      // Get current path without locale
      const currentPath = window.location.pathname;
      const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
      
      // Navigate to new locale
      const newUrl = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      window.location.href = newUrl;
    }
  };

  // Use a more robust way to determine the current language
  const currentLanguage = locales.find(locale => locale === currentLocale) || 'en';
  
  // If there's a mismatch, prefer the cookie/localStorage value
  const [actualLanguage, setActualLanguage] = useState<'en' | 'es'>(currentLanguage);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('preferred-language='))
        ?.split('=')[1];
      
      const localStorageValue = localStorage.getItem('preferred-language');
      
      // If cookie or localStorage says different from currentLocale, use that
      if (cookieValue && cookieValue !== currentLocale && (cookieValue === 'en' || cookieValue === 'es')) {
        setActualLanguage(cookieValue as 'en' | 'es');
      } else if (localStorageValue && localStorageValue !== currentLocale && (localStorageValue === 'en' || localStorageValue === 'es')) {
        setActualLanguage(localStorageValue as 'en' | 'es');
      } else {
        setActualLanguage(currentLanguage);
      }
    }
  }, [currentLocale, currentLanguage]);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="flex items-center gap-2 px-3 py-2 bg-transparent border border-brand-neutral dark:border-brand-neutral rounded-lg text-sm text-brand-dark dark:text-brand-background min-w-[120px] h-9">
          <Globe className="w-4 h-4" />
          <span>{localeFlags[actualLanguage as keyof typeof localeFlags]}</span>
          <span>{localeNames[actualLanguage as keyof typeof localeNames]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-transparent border border-brand-neutral dark:border-brand-neutral rounded-lg cursor-pointer transition-all duration-200 text-sm text-brand-dark dark:text-brand-background hover:border-brand-primary hover:bg-brand-light/20 dark:hover:bg-brand-neutral/20"
      >
        <Globe className="w-4 h-4" />
        <span>{localeFlags[actualLanguage as keyof typeof localeFlags]}</span>
        <span>{localeNames[actualLanguage as keyof typeof localeNames]}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 bg-brand-white dark:bg-brand-dark border border-brand-neutral dark:border-brand-neutral rounded-lg shadow-lg min-w-[160px] overflow-hidden z-20">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => {
                  switchLanguage(locale);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 border-none cursor-pointer transition-colors duration-200 text-sm text-brand-dark dark:text-brand-background text-left ${
                  locale === actualLanguage 
                    ? 'bg-brand-light/20 dark:bg-brand-neutral/20' 
                    : 'bg-transparent hover:bg-brand-light/10 dark:hover:bg-brand-neutral/10'
                }`}
              >
                <span className="text-base">
                  {localeFlags[locale as keyof typeof localeFlags]}
                </span>
                <span>{localeNames[locale as keyof typeof localeNames]}</span>
                {locale === actualLanguage && (
                  <span className="ml-auto text-brand-primary dark:text-brand-light font-medium">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}