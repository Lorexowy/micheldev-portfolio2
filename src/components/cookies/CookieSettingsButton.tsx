// src/components/cookies/CookieSettingsButton.tsx
'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import { CookieSettingsModal } from './CookieSettingsModal';

interface CookieSettingsButtonProps {
  variant?: 'text' | 'button';
  className?: string;
}

export function CookieSettingsButton({ variant = 'text', className = '' }: CookieSettingsButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (variant === 'button') {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors ${className}`}
        >
          <Settings className="w-4 h-4" />
          <span>Ustawienia cookies</span>
        </button>
        
        <CookieSettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm ${className}`}
      >
        Ustawienia cookies
      </button>
      
      <CookieSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}