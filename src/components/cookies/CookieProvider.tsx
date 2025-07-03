// src/components/cookies/CookieProvider.tsx
'use client';

import { useEffect } from 'react';
import { initializeGoogleConsent } from '@/lib/gtag';
import { CookieConsentBanner } from './CookieConsentBanner';

export function CookieProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicjalizuj Google Consent Mode po załadowaniu strony
    const initConsent = () => {
      initializeGoogleConsent();
    };

    // Jeśli gtag jest już dostępny, inicjalizuj od razu
    if (typeof window !== 'undefined' && (window as any).gtag) {
      initConsent();
    } else {
      // Jeśli nie, czekaj na załadowanie
      const checkGtag = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          initConsent();
        } else {
          setTimeout(checkGtag, 100);
        }
      };
      checkGtag();
    }
  }, []);

  return (
    <>
      {children}
      <CookieConsentBanner />
    </>
  );
}