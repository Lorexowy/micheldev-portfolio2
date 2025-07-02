export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-KJ5M3R7PDF';

// Funkcja sprawdzająca zgodę na analytics
const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('micheldev-cookie-consent');
    if (!consent) return false;
    
    const parsed = JSON.parse(consent);
    return parsed.hasConsented && parsed.preferences.analytics;
  } catch {
    return false;
  }
};

// Funkcja do śledzenia wyświetleń stron
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Funkcja do śledzenia zdarzeń
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

// Pozostałe funkcje bez zmian...
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