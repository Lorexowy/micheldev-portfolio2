// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}