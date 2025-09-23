export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',
  es: 'Español'
} as const;

export const localeFlags = {
  en: '🇺🇸',
  es: '🇪🇸'
} as const;
