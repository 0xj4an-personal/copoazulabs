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
    console.log(`🎯 [LANGUAGE_SWITCHER] Component mounted with locale: ${currentLocale}`);
    console.log(`🌐 [LANGUAGE_SWITCHER] Current URL: ${typeof window !== 'undefined' ? window.location.href : 'server-side'}`);
    
    // Log current cookie value
    if (typeof document !== 'undefined') {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('preferred-language='))
        ?.split('=')[1];
      console.log(`🍪 [LANGUAGE_SWITCHER] Current cookie value: ${cookieValue || 'none'}`);
      
      // Log localStorage value
      const localStorageValue = localStorage.getItem('preferred-language');
      console.log(`💾 [LANGUAGE_SWITCHER] Current localStorage value: ${localStorageValue || 'none'}`);
      
      // Check if there's a mismatch and auto-correct
      if (cookieValue && cookieValue !== currentLocale) {
        console.warn(`⚠️ [LANGUAGE_SWITCHER] MISMATCH: Cookie says ${cookieValue} but component locale is ${currentLocale}`);
        console.log(`🔄 [LANGUAGE_SWITCHER] Auto-correcting to cookie value: ${cookieValue}`);
        
        // Get current path without locale
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
        const newUrl = `/${cookieValue}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
        
        console.log(`🛤️ [LANGUAGE_SWITCHER] Current path: ${currentPath}`);
        console.log(`🛤️ [LANGUAGE_SWITCHER] Path without locale: ${pathWithoutLocale}`);
        console.log(`🛤️ [LANGUAGE_SWITCHER] New URL: ${newUrl}`);
        console.log(`🛤️ [LANGUAGE_SWITCHER] Should redirect: ${currentPath !== newUrl}`);
        
        // Only redirect if we're not already on the correct URL
        if (currentPath !== newUrl) {
          console.log(`🚀 [LANGUAGE_SWITCHER] Redirecting to correct URL: ${newUrl}`);
          window.location.href = newUrl;
        } else {
          console.log(`✅ [LANGUAGE_SWITCHER] Already on correct URL, no redirect needed`);
        }
      }
      
      if (localStorageValue && localStorageValue !== currentLocale) {
        console.warn(`⚠️ [LANGUAGE_SWITCHER] MISMATCH: localStorage says ${localStorageValue} but component locale is ${currentLocale}`);
      }
    }
  }, [currentLocale]);

  const switchLanguage = (locale: string) => {
    console.log(`🔄 [LANGUAGE_SWITCHER] Switching to: ${locale}`);
    console.log(`📍 [LANGUAGE_SWITCHER] Current locale: ${currentLocale}`);
    
    // Store preference in both localStorage and cookie
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', locale);
      console.log(`💾 [LANGUAGE_SWITCHER] Saved to localStorage: ${locale}`);
      
      // Set cookie for server-side access
      document.cookie = `preferred-language=${locale}; path=/; max-age=31536000`; // 1 year
      console.log(`🍪 [LANGUAGE_SWITCHER] Set cookie: preferred-language=${locale}`);
      
      // Get current path without locale
      const currentPath = window.location.pathname;
      const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
      console.log(`🛤️ [LANGUAGE_SWITCHER] Current path: ${currentPath}`);
      console.log(`🛤️ [LANGUAGE_SWITCHER] Path without locale: ${pathWithoutLocale}`);
      
      // Navigate to new locale
      const newUrl = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      console.log(`🚀 [LANGUAGE_SWITCHER] Navigating to: ${newUrl}`);
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
        console.log(`🔄 [LANGUAGE_SWITCHER] Using cookie value instead of locale: ${cookieValue}`);
        setActualLanguage(cookieValue as 'en' | 'es');
      } else if (localStorageValue && localStorageValue !== currentLocale && (localStorageValue === 'en' || localStorageValue === 'es')) {
        console.log(`🔄 [LANGUAGE_SWITCHER] Using localStorage value instead of locale: ${localStorageValue}`);
        setActualLanguage(localStorageValue as 'en' | 'es');
      } else {
        setActualLanguage(currentLanguage);
      }
    }
  }, [currentLocale, currentLanguage]);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid #9A9A9A',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#1C1C1C',
            minWidth: '120px',
            height: '36px'
          }}
        >
          <Globe style={{ width: '16px', height: '16px' }} />
          <span>{localeFlags[actualLanguage as keyof typeof localeFlags]}</span>
          <span>{localeNames[actualLanguage as keyof typeof localeNames]}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: 'transparent',
          border: '1px solid #9A9A9A',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.875rem',
          color: '#1C1C1C'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#3E7C4A';
          e.currentTarget.style.backgroundColor = '#F5F1E7';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#9A9A9A';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
          >
            <Globe style={{ width: '16px', height: '16px' }} />
            <span>{localeFlags[actualLanguage as keyof typeof localeFlags]}</span>
            <span>{localeNames[actualLanguage as keyof typeof localeNames]}</span>
            <ChevronDown style={{ 
              width: '14px', 
              height: '14px',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '4px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #9A9A9A',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 20,
              minWidth: '160px',
              overflow: 'hidden'
            }}
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => {
                  switchLanguage(locale);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: locale === actualLanguage ? '#F5F1E7' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  fontSize: '0.875rem',
                  color: '#1C1C1C',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (locale !== actualLanguage) {
                    e.currentTarget.style.backgroundColor = '#F5F1E7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (locale !== actualLanguage) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1rem' }}>
                  {localeFlags[locale as keyof typeof localeFlags]}
                </span>
                <span>{localeNames[locale as keyof typeof localeNames]}</span>
                {locale === actualLanguage && (
                  <span style={{ 
                    marginLeft: 'auto', 
                    color: '#3E7C4A',
                    fontWeight: '500'
                  }}>
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
