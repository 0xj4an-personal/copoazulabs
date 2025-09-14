'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  // Ensure component only renders theme-dependent content on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleToggle = () => {
    // Use global function if available, otherwise use direct DOM manipulation
    if (typeof window !== 'undefined' && typeof window.toggleTheme === 'function') {
      window.toggleTheme();
    } else {
      // Fallback: direct DOM manipulation
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  };

  // Render consistent content on server, theme-aware content on client
  const currentTheme = isClient ? theme : 'light';
  const isLight = currentTheme === 'light';

  return (
    <button
      onClick={handleToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: isLight ? '#1C1C1C' : '#F5F1E7',
      }}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 touch-manipulation"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Current theme: ${currentTheme}`}
    >
      {isLight ? (
        <Moon style={{ width: '20px', height: '20px' }} />
      ) : (
        <Sun style={{ width: '20px', height: '20px' }} />
      )}
    </button>
  );
}
