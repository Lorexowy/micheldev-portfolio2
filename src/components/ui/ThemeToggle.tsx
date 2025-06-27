// src/components/ui/ThemeToggle.tsx
'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from './Button';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  // Nie renderuj nic dopóki komponent nie jest zamontowany
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <div className="h-5 w-5" />
      </Button>
    );
  }

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Przełącz na tryb ciemny';
      case 'dark':
        return 'Przełącz na tryb systemowy';
      default:
        return 'Przełącz na tryb jasny';
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      aria-label={getLabel()}
    >
      {getIcon()}
    </Button>
  );
}