'use client';

import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations('products');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F1E7', padding: '32px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
          {t('title')}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#9A9A9A', marginBottom: '32px' }}>
          {t('subtitle')}
        </p>
        
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          padding: '48px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '16px' }}>
            {t('comingSoon')}
          </h2>
          <p style={{ color: '#9A9A9A' }}>
            {t('underDevelopment')}
          </p>
        </div>
      </div>
    </div>
  );
}