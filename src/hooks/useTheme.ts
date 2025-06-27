// src/hooks/useTheme.ts
'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Funkcja do aplikowania motywu
  const applyTheme = (currentTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (currentTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(currentTheme);
    }
  };

  // Inicjalizacja motywu po zamontowaniu komponentu
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme;
    const initialTheme = stored || 'system';
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Aplikuj motyw przy zmianie
  useEffect(() => {
    if (!mounted) return;
    
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Nasłuchuj na zmiany preferencji systemowych
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  return { 
    theme, 
    setTheme: (newTheme: Theme) => {
      if (mounted) {
        setTheme(newTheme);
      }
    },
    mounted 
  };
}