// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { CookieProvider } from '@/components/cookies';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// TWÓJ MEASUREMENT ID
const GA_TRACKING_ID = 'G-KJ5M3R7PDF';

export const metadata: Metadata = {
  title: 'MichelDev - Profesjonalne strony internetowe i branding',
  description: 'Tworzymy nowoczesne strony internetowe, grafiki komputerowe i kompleksowe rozwiązania brandingowe. Skontaktuj się z nami już dziś!',
  keywords: 'strony internetowe, projektowanie stron, grafika komputerowa, branding, logo, Next.js, React',
  authors: [{ name: 'MichelDev' }],
  openGraph: {
    title: 'MichelDev - Profesjonalne strony internetowe i branding',
    description: 'Tworzymy nowoczesne strony internetowe, grafiki komputerowe i kompleksowe rozwiązania brandingowe.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Istniejący script dla theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) theme = 'system';
                  
                  if (theme === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* ZMODYFIKOWANE: Google Analytics 4 z Consent Mode v2 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // WAŻNE: Ustaw domyślne consent przed config
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
              
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <CookieProvider>
          {children}
        </CookieProvider>
      </body>
    </html>
  );
}