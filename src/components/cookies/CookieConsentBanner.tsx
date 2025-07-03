// src/components/cookies/CookieConsentBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart3, Settings, ExternalLink } from 'lucide-react';
import { 
  shouldShowConsentBanner, 
  grantConsent, 
  getConsentData,
  type CookieConsent 
} from '@/lib/gtag';

interface CookieCategory {
  id: keyof CookieConsent['preferences'];
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  required: boolean;
  details: string[];
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Niezbędne',
    description: 'Wymagane do podstawowego funkcjonowania strony',
    icon: Shield,
    required: true,
    details: [
      'Zapamiętanie wybranego motywu (jasny/ciemny)',
      'Przechowywanie ustawień cookies',
      'Obsługa formularzy kontaktowych',
      'Bezpieczeństwo i stabilność strony'
    ]
  },
  {
    id: 'analytics',
    name: 'Analityczne',
    description: 'Pomijają analizować ruch na stronie i optymalizować treści',
    icon: BarChart3,
    required: false,
    details: [
      'Google Analytics - analiza ruchu na stronie',
      'Statystyki odwiedzin i najpopularniejsze treści',
      'Dane demograficzne w formie zagregowanej',
      'Optymalizacja wydajności strony',
      'Dane przechowywane przez Google (USA) zgodnie z RODO'
    ]
  }
];

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent['preferences']>({
    necessary: true,
    analytics: false
  });

  // Sprawdź czy pokazać banner
  useEffect(() => {
    const shouldShow = shouldShowConsentBanner();
    setIsVisible(shouldShow);
    
    if (!shouldShow) {
      // Załaduj istniejące preferencje
      const consent = getConsentData();
      setPreferences(consent.preferences);
    }
  }, []);

  // Obsługa akceptacji wszystkich cookies
  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true
    };
    grantConsent(allPreferences);
    setIsVisible(false);
  };

  // Obsługa akceptacji wybranych cookies
  const handleAcceptSelected = () => {
    grantConsent(preferences);
    setIsVisible(false);
  };

  // Obsługa odrzucenia opcjonalnych cookies
  const handleRejectOptional = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false
    };
    grantConsent(minimalPreferences);
    setIsVisible(false);
  };

  // Obsługa zmiany preferencji
  const handlePreferenceChange = (categoryId: keyof CookieConsent['preferences'], value: boolean) => {
    if (categoryId === 'necessary') return; // Nie można wyłączyć niezbędnych
    
    setPreferences(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:right-4 sm:left-auto z-50 w-full sm:max-w-md bg-white dark:bg-zinc-900 sm:rounded-lg shadow-2xl border-t sm:border border-gray-200 dark:border-zinc-700 overflow-hidden"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Ustawienia cookies
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Używamy plików cookies, aby zapewnić najlepsze doświadczenie na naszej stronie. 
            <span className="hidden sm:inline">
              Możesz wybrać, które kategorie cookies chcesz zaakceptować.
            </span>
          </p>

          {/* Cookie Categories - Mobile: collapsed, Desktop: expanded */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {COOKIE_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              const isEnabled = preferences[category.id];
              
              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                        {category.name}
                        {category.required && (
                          <span className="ml-1 text-xs text-blue-600 dark:text-blue-400">
                            (wymagane)
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {/* Szczegóły button - tylko na desktop */}
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      {showDetails ? 'Ukryj' : 'Szczegóły'}
                    </button>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(e) => handlePreferenceChange(category.id, e.target.checked)}
                        disabled={category.required}
                        className="sr-only peer"
                      />
                      <div className={`relative w-9 h-5 sm:w-11 sm:h-6 rounded-full peer transition-colors ${
                        isEnabled
                          ? 'bg-blue-600 dark:bg-blue-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      } ${
                        category.required 
                          ? 'cursor-not-allowed opacity-75' 
                          : 'cursor-pointer'
                      }`}>
                        <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-4 w-4 sm:h-5 sm:w-5 transition-transform ${
                          isEnabled ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details - tylko na desktop gdy włączone */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:block mb-6 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700"
              >
                {COOKIE_CATEGORIES.map((category) => (
                  <div key={category.id} className="mb-4 last:mb-0">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h5>
                    <ul className="space-y-1">
                      {category.details.slice(0, 3).map((detail, index) => (
                        <li key={index} className="text-xs text-gray-500 dark:text-gray-400 flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="space-y-2 sm:space-y-3">
            {/* Accept All */}
            <button
              onClick={handleAcceptAll}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
            >
              Zaakceptuj wszystkie
            </button>
            
            {/* Mobile: tylko dwa przyciski, Desktop: trzy przyciski */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              <button
                onClick={handleAcceptSelected}
                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-600 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                <span className="sm:hidden">Wybrane</span>
                <span className="hidden sm:inline">Zaakceptuj wybrane</span>
              </button>
              
              <button
                onClick={handleRejectOptional}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-sm"
              >
                <span className="sm:hidden">Tylko niezbędne</span>
                <span className="hidden sm:inline">Odrzuć opcjonalne</span>
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-zinc-700">
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs justify-center sm:justify-start">
              <Link
                href="/polityka-prywatnosci"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center space-x-1"
              >
                <span>Polityka prywatności</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/polityka-prywatnosci#cookies"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center space-x-1"
              >
                <span>Polityka cookies</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}