// src/components/ui/ThemeToggle.tsx
'use client';

import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from './Button';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Zamknij dropdown przy kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Nie renderuj nic dopóki komponent nie jest zamontowany
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <div className="h-5 w-5" />
      </Button>
    );
  }

  const getIcon = (selectedTheme: string) => {
    switch (selectedTheme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Jasny', icon: Sun },
    { value: 'dark', label: 'Ciemny', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme as 'light' | 'dark' | 'system');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Wybierz motyw"
        className="flex items-center space-x-1"
      >
        {getIcon(theme)}
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 z-50"
          >
            {themeOptions.map((option) => {
              const IconComponent = option.icon;
              const isActive = theme === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleThemeSelect(option.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="flex-1 text-left">{option.label}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}