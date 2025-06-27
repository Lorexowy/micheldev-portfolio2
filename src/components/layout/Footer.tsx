// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">MichelDev</h3>
            <p className="text-gray-400 mb-4">
              Profesjonalne usługi webowe, grafika komputerowa i branding dla Twojego biznesu.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>kontakt@micheldev.pl</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+48 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Warszawa, Polska</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Usługi</h4>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Projektowanie stron</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Programowanie</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Grafika komputerowa</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Branding</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Informacje</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Polityka prywatności</Link></li>
              <li><Link href="#contact" className="hover:text-blue-400 transition-colors">Kontakt</Link></li>
              <li><Link href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 MichelDev. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}