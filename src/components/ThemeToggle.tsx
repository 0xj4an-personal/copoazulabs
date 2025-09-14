'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

declare global {
  interface Window {
    toggleTheme: () => void;
  }
}

export default function ThemeToggle() {
  // Try to get theme from React context, fallback to localStorage
  let theme = 'light';
  try {
    const { theme: contextTheme } = useTheme();
    theme = contextTheme;
  } catch (error) {
    // If React context is not available, get from localStorage
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('theme') || 'light';
    }
  }

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
        color: theme === 'dark' ? '#F5F1E7' : '#1C1C1C',
      }}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 touch-manipulation"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Current theme: ${theme}`}
    >
      {theme === 'light' ? (
        <Moon style={{ width: '20px', height: '20px' }} />
      ) : (
        <Sun style={{ width: '20px', height: '20px' }} />
      )}
    </button>
  );
}
