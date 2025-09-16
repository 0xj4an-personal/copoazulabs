'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function Logo({ 
  width = 40, 
  height = 40, 
  className = '', 
  alt = 'Copoazú Labs Logo' 
}: LogoProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark mode is active
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="/assets/logo.svg"
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-200 ${
          isDark ? 'brightness-0 invert' : ''
        }`}
        style={{
          filter: isDark ? 'brightness(0) invert(1)' : 'none',
        }}
        priority
      />
    </div>
  );
}
