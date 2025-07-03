// src/components/cookies/CookieSettingsModal.tsx
'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart3, Settings, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { 
  getConsentData, 
  grantConsent, 
  revokeConsent,
  type CookieConsent 
} from '@/lib/gtag';

interface CookieCategory {
  id: keyof CookieConsent['preferences'];
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  required: boolean;
  details: string[];
  purpose: string;
  retention: string;
  thirdParty?: {
    name: string;
    country: string;
    policy: string;
  };
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Niezbędne',
    description: 'Wymagane do podstawowego funkcjonowania strony internetowej',
    icon: Shield,
    required: true,
    purpose: 'Zapewnienie podstawowych funkcji witryny i bezpieczeństwa',
    retention: 'Sesja lub do 1 roku',
    details: [
      'Zapamiętanie wybranego motywu (jasny/ciemny)',
      'Przechowywanie ustawień cookies i preferencji użytkownika',
      'Obsługa formularzy kontaktowych i zapobieganie spam',
      'Bezpieczeństwo sesji i ochrona przed atakami CSRF',
      'Stabilność i prawidłowe funkcjonowanie strony'
    ]
  },
  {
    id: 'analytics',
    name: 'Analityczne',
    description: 'Pomagają analizować ruch na stronie i optymalizować treści',
    icon: BarChart3,
    required: false,
    purpose: 'Analiza ruchu, optymalizacja treści i poprawa doświadczenia użytkownika',
    retention: 'Do 26 miesięcy',
    thirdParty: {
      name: 'Google Analytics',
      country: 'USA',
      policy: 'https://policies.google.com/privacy'
    },
    details: [
      'Google Analytics - analiza ruchu i zachowań użytkowników',
      'Statystyki odwiedzin, najpopularniejsze treści i ścieżki nawigacji',
      'Dane demograficzne w formie zagregowanej (wiek, płeć, lokalizacja)',
      'Analiza wydajności strony i identyfikacja problemów technicznych',
      'Optymalizacja treści na podstawie preferencji użytkowników',
      'Dane przechowywane przez Google LLC (USA) zgodnie z RODO i standardami adequacy decision'
    ]
  }
];

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieSettingsModal({ isOpen, onClose }: CookieSettingsModalProps) {
  const [preferences, setPreferences] = useState<CookieConsent['preferences']>(() => {
    const consent = getConsentData();
    return consent.preferences;
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Obsługa zmiany preferencji
  const handlePreferenceChange = (categoryId: keyof CookieConsent['preferences'], value: boolean) => {
    if (categoryId === 'necessary') return; // Nie można wyłączyć niezbędnych
    
    setPreferences(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  // Obsługa zapisania ustawień
  const handleSaveSettings = () => {
    grantConsent(preferences);
    setShowConfirmation(true);
    
    // Ukryj potwierdzenie po 2 sekundach
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 2000);
  };

  // Obsługa wycofania wszystkich zgód
  const handleRevokeAll = () => {
    revokeConsent();
    setPreferences({ necessary: true, analytics: false });
    setShowConfirmation(true);
    
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 2000);
  };

  // Obsługa akceptacji wszystkich
  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true
    };
    setPreferences(allPreferences);
    grantConsent(allPreferences);
    setShowConfirmation(true);
    
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Ustawienia cookies
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Zarządzaj swoimi preferencjami dotyczącymi plików cookies
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            {/* Wprowadzenie */}
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                    Informacja o plikach cookies
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                    Pliki cookies to małe pliki tekstowe przechowywane na Twoim urządzeniu. 
                    Pomagają nam zapewnić lepsze doświadczenie użytkownika i analizować ruch na stronie. 
                    Możesz kontrolować, które kategorie cookies chcesz zaakceptować.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-6">
              {COOKIE_CATEGORIES.map((category) => {
                const IconComponent = category.icon;
                const isEnabled = preferences[category.id];
                
                return (
                  <div
                    key={category.id}
                    className="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 bg-gray-50 dark:bg-zinc-800"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-white dark:bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm">
                          <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {category.name}
                            {category.required && (
                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                                Wymagane
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {category.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span><strong>Cel:</strong> {category.purpose}</span>
                            <span><strong>Przechowywanie:</strong> {category.retention}</span>
                          </div>
                        </div>
                      </div>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) => handlePreferenceChange(category.id, e.target.checked)}
                          disabled={category.required}
                          className="sr-only peer"
                        />
                        <div className={`relative w-11 h-6 rounded-full peer transition-colors ${
                          isEnabled
                            ? 'bg-blue-600 dark:bg-blue-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        } ${
                          category.required 
                            ? 'cursor-not-allowed opacity-75' 
                            : 'cursor-pointer'
                        }`}>
                          <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${
                            isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </div>
                      </label>
                    </div>

                    {/* Third Party Info */}
                    {category.thirdParty && (
                      <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-200 mb-2">
                          Usługi zewnętrzne
                        </h4>
                        <div className="text-xs text-amber-800 dark:text-amber-300 space-y-1">
                          <p><strong>Dostawca:</strong> {category.thirdParty.name}</p>
                          <p><strong>Kraj:</strong> {category.thirdParty.country}</p>
                          <p>
                            <strong>Polityka prywatności:</strong> 
                            <a 
                              href={category.thirdParty.policy} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="ml-1 text-amber-700 dark:text-amber-200 hover:underline inline-flex items-center"
                            >
                              Zobacz politykę
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Details */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Szczegóły użycia
                      </h4>
                      <ul className="space-y-2">
                        {category.details.map((detail, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legal Information */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Twoje prawa zgodnie z RODO
              </h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                <p>• <strong>Prawo do informacji:</strong> Możesz uzyskać informacje o przetwarzanych danych</p>
                <p>• <strong>Prawo do sprostowania:</strong> Możesz poprawić nieprawidłowe dane</p>
                <p>• <strong>Prawo do usunięcia:</strong> Możesz żądać usunięcia swoich danych</p>
                <p>• <strong>Prawo do przenoszenia:</strong> Możesz otrzymać swoje dane w strukturalnym formacie</p>
                <p>• <strong>Prawo do wycofania zgody:</strong> Możesz cofnąć zgodę w dowolnym momencie</p>
                <p>• <strong>Prawo do złożenia skargi:</strong> Możesz złożyć skargę do UODO</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex flex-wrap gap-4 text-xs">
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
              
              <div className="flex gap-3">
                <button
                  onClick={handleRevokeAll}
                  className="px-4 py-2 text-sm border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Wycofaj wszystkie
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Akceptuj wszystkie
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 text-sm bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  Zapisz ustawienia
                </button>
              </div>
            </div>
          </div>

          {/* Confirmation Toast */}
          <AnimatePresence>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-20 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Ustawienia zostały zapisane!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}