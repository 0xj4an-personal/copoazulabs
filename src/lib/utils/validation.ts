/**
 * Utility functions for data validation
 */

import { Product } from '@/types/product';

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate wallet address format (Ethereum/Celo)
 */
export function isValidWalletAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate transaction hash format
 */
export function isValidTransactionHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate product data structure
 */
export function isValidProduct(product: any): product is Product {
  return (
    typeof product === 'object' &&
    typeof product.id === 'string' &&
    typeof product.nameKey === 'string' &&
    typeof product.categoryKey === 'string' &&
    typeof product.collectionId === 'string' &&
    typeof product.price === 'number' &&
    typeof product.image === 'string' &&
    Array.isArray(product.availableSizes) &&
    typeof product.rating === 'number' &&
    typeof product.reviews === 'number' &&
    typeof product.inStock === 'boolean' &&
    product.price >= 0 &&
    product.rating >= 0 &&
    product.rating <= 5 &&
    product.reviews >= 0
  );
}

/**
 * Sanitize HTML content
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate environment variables
 */
export function validateEnvironmentVariables(): { isValid: boolean; missing: string[] } {
  const required = [
    'NEXT_PUBLIC_REOWN_PROJECT_ID',
    'NEXT_PUBLIC_CELO_RPC_URL',
    'NEXT_PUBLIC_APP_URL'
  ];

  const missing = required.filter(key => !process.env[key]);

  return {
    isValid: missing.length === 0,
    missing
  };
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: File,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeMB: number = 5
): { isValid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`
    };
  }

  return { isValid: true };
}

/**
 * Validate form data
 */
export function validateFormData<T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => boolean | string>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const [field, validator] of Object.entries(rules)) {
    const result = validator(data[field]);
    if (typeof result === 'string') {
      errors[field as keyof T] = result;
    } else if (!result) {
      errors[field as keyof T] = `Invalid ${field}`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}