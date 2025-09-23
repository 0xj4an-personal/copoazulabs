import Link from 'next/link';

export default function NotFound() {
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
        Page Not Found
      </h2>
      <p style={{
        fontSize: '1.125rem',
        color: 'var(--brand-neutral)',
        marginBottom: '32px',
        maxWidth: '500px'
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <button style={{
          padding: '12px 24px',
          backgroundColor: 'var(--brand-primary)',
          color: 'var(--brand-white)',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}>
          Go Home
        </button>
      </Link>
    </div>
  );
}
