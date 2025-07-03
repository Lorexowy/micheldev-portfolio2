// src/types/gtag.d.ts
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date | 'default' | 'update',
      config?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        // Google Consent Mode v2 parameters
        analytics_storage?: 'granted' | 'denied';
        ad_storage?: 'granted' | 'denied';
        ad_user_data?: 'granted' | 'denied';
        ad_personalization?: 'granted' | 'denied';
        wait_for_update?: number;
      }
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export {};