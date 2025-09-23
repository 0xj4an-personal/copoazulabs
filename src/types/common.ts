export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total?: number;
}

export interface FilterOptions {
  search?: string;
  category?: string;
  collection?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating';
}

export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}

export type Locale = 'en' | 'es';

export interface TranslationKeys {
  [key: string]: string | TranslationKeys;
}