// src/lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-KJ5M3R7PDF';

// Typy dla zgód
export interface CookieConsent {
  hasConsented: boolean;
  timestamp: number;
  preferences: {
    necessary: boolean; // zawsze true
    analytics: boolean;
  };
  version: string;
}

// Domyślne ustawienia consent
const DEFAULT_CONSENT: CookieConsent = {
  hasConsented: false,
  timestamp: Date.now(),
  preferences: {
    necessary: true,
    analytics: false,
  },
  version: '1.0'
};

// Funkcja do pobrania zgód z localStorage
export const getConsentData = (): CookieConsent => {
  if (typeof window === 'undefined') return DEFAULT_CONSENT;
  
  try {
    const stored = localStorage.getItem('micheldev-cookie-consent');
    if (!stored) return DEFAULT_CONSENT;
    
    const parsed = JSON.parse(stored);
    // Sprawdź czy struktura jest poprawna
    if (parsed.preferences && typeof parsed.preferences.analytics === 'boolean') {
      return {
        ...DEFAULT_CONSENT,
        ...parsed,
        preferences: {
          necessary: true, // zawsze wymagane
          analytics: parsed.preferences.analytics || false,
        }
      };
    }
    return DEFAULT_CONSENT;
  } catch {
    return DEFAULT_CONSENT;
  }
};

// Funkcja do zapisania zgód
export const saveConsentData = (consent: CookieConsent): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('micheldev-cookie-consent', JSON.stringify(consent));
  } catch (error) {
    console.error('Błąd zapisywania zgód cookies:', error);
  }
};

// Funkcja do sprawdzenia zgody na analytics (dla kompatybilności wstecznej)
export const hasAnalyticsConsent = (): boolean => {
  const consent = getConsentData();
  return consent.hasConsented && consent.preferences.analytics;
};

// Funkcja do inicjalizacji Google Consent Mode
export const initializeGoogleConsent = (): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const consent = getConsentData();
  
  // Ustaw domyślne stany consent (przed udzieleniem zgody)
  window.gtag('consent', 'default', {
    'analytics_storage': consent.preferences.analytics ? 'granted' : 'denied',
    'ad_storage': 'denied', // na razie nie używamy
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500 // czas oczekiwania na aktualizację consent
  });
  
  console.log('Google Consent Mode zainicjalizowany:', {
    analytics_storage: consent.preferences.analytics ? 'granted' : 'denied'
  });
};

// Funkcja do aktualizacji consent po działaniu użytkownika
export const updateGoogleConsent = (preferences: CookieConsent['preferences']): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('consent', 'update', {
    'analytics_storage': preferences.analytics ? 'granted' : 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied', 
    'ad_personalization': 'denied'
  });
  
  console.log('Google Consent Mode zaktualizowany:', {
    analytics_storage: preferences.analytics ? 'granted' : 'denied'
  });
};

// Funkcja do usunięcia cookies Google Analytics gdy zgoda zostanie wycofana
export const removeGoogleAnalyticsCookies = (): void => {
  if (typeof window === 'undefined') return;
  
  // Lista cookies Google Analytics do usunięcia
  const gaCookies = [
    '_ga',
    '_ga_' + GA_TRACKING_ID.replace('G-', ''),
    '_gid',
    '_gat',
    '_gat_gtag_' + GA_TRACKING_ID.replace('G-', ''),
    '__utma',
    '__utmb',
    '__utmc',
    '__utmt',
    '__utmz'
  ];
  
  gaCookies.forEach(cookieName => {
    // Usuń z głównej domeny
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // Usuń z subdomeny
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    // Usuń z całej domeny
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
  });
  
  console.log('Cookies Google Analytics zostały usunięte');
};

// Funkcja do udzielenia zgody
export const grantConsent = (preferences: CookieConsent['preferences']): void => {
  const consent: CookieConsent = {
    hasConsented: true,
    timestamp: Date.now(),
    preferences,
    version: '1.0'
  };
  
  saveConsentData(consent);
  updateGoogleConsent(preferences);
  
  // Jeśli analytics został wyłączony, usuń cookies
  if (!preferences.analytics) {
    removeGoogleAnalyticsCookies();
  }
  
  console.log('Zgoda udzielona:', preferences);
};

// Funkcja do wycofania zgody
export const revokeConsent = (): void => {
  const consent: CookieConsent = {
    hasConsented: true,
    timestamp: Date.now(),
    preferences: {
      necessary: true,
      analytics: false
    },
    version: '1.0'
  };
  
  saveConsentData(consent);
  updateGoogleConsent(consent.preferences);
  removeGoogleAnalyticsCookies();
  
  console.log('Zgoda wycofana');
};

// Funkcja do sprawdzenia czy trzeba pokazać banner
export const shouldShowConsentBanner = (): boolean => {
  const consent = getConsentData();
  return !consent.hasConsented;
};

// Funkcja do śledzenia wyświetleń stron (bez zmian)
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Funkcja do śledzenia zdarzeń (bez zmian)
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Pozostałe funkcje trackingowe (bez zmian)
export const trackFormSubmission = (formType: string) => {
  event({
    action: 'form_submit',
    category: 'Contact',
    label: formType,
  });
};

export const trackProjectView = (projectName: string) => {
  event({
    action: 'project_view',
    category: 'Portfolio',
    label: projectName,
  });
};

export const trackServiceClick = (serviceName: string) => {
  event({
    action: 'service_click',
    category: 'Services',
    label: serviceName,
  });
};