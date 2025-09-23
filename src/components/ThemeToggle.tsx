'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

// Global theme state to sync all instances
let globalThemeState = {
  isDark: false,
  listeners: new Set<() => void>()
};

// Function to update global state and notify all listeners
const updateGlobalTheme = (isDark: boolean) => {
  globalThemeState.isDark = isDark;
  globalThemeState.listeners.forEach(listener => listener());
};

// Function to get current theme from DOM
const getCurrentTheme = () => {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};

// Function to set theme in DOM and localStorage
const setTheme = (isDark: boolean) => {
  if (typeof window === 'undefined') return;
  
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Sync with global state
  useEffect(() => {
    setIsClient(true);
    
    // Initialize from DOM
    const currentTheme = getCurrentTheme();
    setIsDark(currentTheme);
    updateGlobalTheme(currentTheme);
    
    // Listen for global theme changes
    const listener = () => {
      const currentTheme = getCurrentTheme();
      setIsDark(currentTheme);
    };
    
    globalThemeState.listeners.add(listener);
    
    return () => {
      globalThemeState.listeners.delete(listener);
    };
  }, []);

  const handleToggle = () => {
    if (typeof window === 'undefined') return;
    
    const currentIsDark = getCurrentTheme();
    const newTheme = !currentIsDark;
    
    setTheme(newTheme);
    updateGlobalTheme(newTheme);
  };

  // Don't render until client-side
  if (!isClient) {
    return (
      <button
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
        }}
        className="hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
      >
        <Moon style={{ width: '20px', height: '20px' }} />
      </button>
    );
  }

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
        color: isDark ? 'var(--brand-background)' : 'var(--brand-dark)',
      }}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 touch-manipulation"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current theme: ${isDark ? 'dark' : 'light'}`}
    >
      {isDark ? (
        <Sun style={{ width: '20px', height: '20px' }} />
      ) : (
        <Moon style={{ width: '20px', height: '20px' }} />
      )}
    </button>
  );
}
