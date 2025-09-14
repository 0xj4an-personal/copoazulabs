import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F1E7',
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
        color: '#3E7C4A',
        marginBottom: '16px'
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: '16px'
      }}>
        {t('title')}
      </h2>
      <p style={{
        fontSize: '1.125rem',
        color: '#9A9A9A',
        marginBottom: '32px',
        maxWidth: '500px'
      }}>
        {t('description')}
      </p>
      <Link href="/">
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#3E7C4A',
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
