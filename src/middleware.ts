import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Function to detect language from Vercel Edge geo data
function detectLanguageFromGeo(request: NextRequest): string {
  const geo = (request as any).geo;
  console.log(`🌎 [GEO_DETECTION] Geo data:`, geo);
  
  if (!geo?.country) {
    console.log(`❌ [GEO_DETECTION] No country found, using default: en`);
    return 'en'; // Default fallback
  }

  // Map Spanish-speaking countries to Spanish
  const spanishCountries = [
    'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'BO', 'PY', 'UY', 
    'CR', 'PA', 'HN', 'SV', 'GT', 'NI', 'DO', 'CU', 'PR'
  ];
  
  const detectedLang = spanishCountries.includes(geo.country) ? 'es' : 'en';
  console.log(`🌎 [GEO_DETECTION] Country: ${geo.country}, detected language: ${detectedLang}`);
  return detectedLang;
}

// Function to detect language from user preference cookie
function detectLanguageFromCookie(request: NextRequest): string | null {
  const cookie = request.cookies.get('preferred-language');
  console.log(`🍪 [COOKIE_DETECTION] Cookie found: ${cookie?.value || 'none'}`);
  if (cookie && ['en', 'es'].includes(cookie.value)) {
    console.log(`✅ [COOKIE_DETECTION] Valid cookie, returning: ${cookie.value}`);
    return cookie.value;
  }
  console.log(`❌ [COOKIE_DETECTION] No valid cookie found`);
  return null;
}

// Function to detect language from browser Accept-Language header
function detectLanguageFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  console.log(`🌐 [HEADER_DETECTION] Accept-Language header: ${acceptLanguage || 'none'}`);
  
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    console.log(`🌐 [HEADER_DETECTION] Parsed languages:`, languages);
    
    for (const lang of languages) {
      if (lang.startsWith('es')) {
        console.log(`✅ [HEADER_DETECTION] Found Spanish preference: ${lang}`);
        return 'es';
      }
      if (lang.startsWith('en')) {
        console.log(`✅ [HEADER_DETECTION] Found English preference: ${lang}`);
        return 'en';
      }
    }
  }
  
  console.log(`❌ [HEADER_DETECTION] No language preference found, using default: en`);
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

  console.log(`🌍 [MIDDLEWARE] Processing request: ${pathname}`);
  console.log(`📍 [MIDDLEWARE] URL Locale: ${urlLocale || 'none'}`);

  // If no locale in URL, detect from user preference + geo + browser
  if (!urlLocale) {
    let detectedLocale = 'en';
    let detectionMethod = 'default';
    
    try {
      // First, check user preference cookie
      const userPreference = detectLanguageFromCookie(request);
      console.log(`🍪 [MIDDLEWARE] User preference cookie: ${userPreference || 'none'}`);
      
      if (userPreference) {
        detectedLocale = userPreference;
        detectionMethod = 'user-cookie';
      } else {
        // If no user preference, try geo detection (Vercel Edge)
        const geoLocale = detectLanguageFromGeo(request);
        console.log(`🌎 [MIDDLEWARE] Geo detection: ${geoLocale}`);
        detectedLocale = geoLocale;
        detectionMethod = 'geo';
        
        // If geo detection fails or returns default, try browser headers
        if (detectedLocale === 'en') {
          const browserLocale = detectLanguageFromHeaders(request);
          console.log(`🌐 [MIDDLEWARE] Browser headers: ${browserLocale}`);
          detectedLocale = browserLocale;
          detectionMethod = 'browser-headers';
        }
      }
    } catch (error) {
      console.warn('❌ [MIDDLEWARE] Language detection failed:', error);
      detectedLocale = 'en';
      detectionMethod = 'error-fallback';
    }

    console.log(`✅ [MIDDLEWARE] Final detection: ${detectedLocale} (method: ${detectionMethod})`);

    // Redirect to detected locale
    const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    console.log(`🔄 [MIDDLEWARE] Redirecting to: ${newUrl.pathname}`);
    return Response.redirect(newUrl, 302);
  }

  console.log(`✅ [MIDDLEWARE] Locale exists in URL: ${urlLocale}`);

  // If locale exists in URL, validate it and use next-intl middleware
  if (['en', 'es'].includes(urlLocale)) {
    console.log(`🎯 [MIDDLEWARE] Using next-intl middleware for: ${urlLocale}`);
    const result = intlMiddleware(request);
    console.log(`🎯 [MIDDLEWARE] next-intl middleware result:`, result);
    return result;
  }

  // Invalid locale, redirect to default
  console.log(`❌ [MIDDLEWARE] Invalid locale: ${urlLocale}, redirecting to /en`);
  const newUrl = new URL(`/en${pathname}`, request.url);
  return Response.redirect(newUrl, 302);
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
