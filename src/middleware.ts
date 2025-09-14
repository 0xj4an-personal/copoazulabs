import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Function to detect language from Vercel Edge geo data
function detectLanguageFromGeo(request: NextRequest): string {
  const geo = (request as any).geo;
  
  if (!geo?.country) {
    return 'en'; // Default fallback
  }

  // Map Spanish-speaking countries to Spanish
  const spanishCountries = [
    'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'BO', 'PY', 'UY', 
    'CR', 'PA', 'HN', 'SV', 'GT', 'NI', 'DO', 'CU', 'PR'
  ];
  
  return spanishCountries.includes(geo.country) ? 'es' : 'en';
}

// Function to detect language from browser Accept-Language header
function detectLanguageFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    
    for (const lang of languages) {
      if (lang.startsWith('es')) return 'es';
      if (lang.startsWith('en')) return 'en';
    }
  }
  
  return 'en';
}

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  // Get locale from URL if it exists
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const urlLocale = localeMatch?.[1];

  // If no locale in URL, detect from geo + browser
  if (!urlLocale) {
    let detectedLocale = 'en';
    
    try {
      // Try geo detection first (Vercel Edge)
      detectedLocale = detectLanguageFromGeo(request);
      
      // If geo detection fails or returns default, try browser headers
      if (detectedLocale === 'en') {
        const browserLocale = detectLanguageFromHeaders(request);
        detectedLocale = browserLocale;
      }
    } catch (error) {
      console.warn('Language detection failed:', error);
      detectedLocale = 'en';
    }

    // Redirect to detected locale
    const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    return Response.redirect(newUrl, 302);
  }

  // If locale exists in URL, use next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _static (inside /public)
    // - all files in the public folder
    '/((?!api|_next|_static|.*\\..*).*)'
  ]
};
