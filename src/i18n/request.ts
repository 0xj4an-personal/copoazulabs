import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  console.log(`📝 [REQUEST_CONFIG] Received locale: ${locale}`);
  const finalLocale = locale || 'en';
  console.log(`📝 [REQUEST_CONFIG] Final locale: ${finalLocale}`);
  
  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
