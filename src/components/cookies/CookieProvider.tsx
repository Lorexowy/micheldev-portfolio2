'use client';

import { useEffect } from 'react';
import { initializeGoogleConsent } from '@/lib/gtag';
import { CookieConsentBanner } from './CookieConsentBanner';

export function CookieProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initConsent = () => {
      initializeGoogleConsent();
    };

    // Bezpieczne sprawdzenie gtag
    if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
      initConsent();
    } else {
      const checkGtag = () => {
        if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
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