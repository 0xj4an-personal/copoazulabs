import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--brand-background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '16px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: '800',
        color: 'var(--brand-primary)',
        marginBottom: '16px'
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: 'var(--brand-dark)',
        marginBottom: '16px'
      }}>
        {t('title')}
      </h2>
      <p style={{
        fontSize: '1.125rem',
        color: 'var(--brand-neutral)',
        marginBottom: '32px',
        maxWidth: '500px'
      }}>
        {t('description')}
      </p>
      <Link href="/">
        <button style={{
          padding: '12px 24px',
          backgroundColor: 'var(--brand-primary)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}>
          {t('goHome')}
        </button>
      </Link>
    </div>
  );
}
