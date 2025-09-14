'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
        aria-label="Theme toggle"
      >
        <Sun style={{ width: '20px', height: '20px', color: '#1C1C1C' }} />
      </button>
    );
  }

  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: theme === 'dark' ? '#F5F1E7' : '#1C1C1C',
      }}
      className="hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon style={{ width: '20px', height: '20px' }} />
      ) : (
        <Sun style={{ width: '20px', height: '20px' }} />
      )}
    </button>
  );
}
