// src/components/sections/Services.tsx
'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Palette, Settings, ArrowRight, Check } from 'lucide-react';
import { trackServiceClick } from '@/lib/gtag';

// Dane usług
const SERVICES = [
  {
    id: 'web-development',
    title: 'Tworzenie stron internetowych',
    icon: Monitor,
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-600',
    shadowColor: 'hover:shadow-blue-500/10',
    subtitle: 'Nowoczesne rozwiązania webowe',
    features: [
      'Responsywny design dla wszystkich urządzeń',
      'Optymalizacja SEO i szybkości ładowania',
      'Nowoczesne technologie (React, Next.js)',
      'Integracja z systemami CMS',
      'Bezpieczeństwo i kopie zapasowe'
    ],
    pattern: 'dots'
  },
  {
    id: 'graphics', 
    title: 'Grafika komputerowa',
    icon: Palette,
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-600',
    shadowColor: 'hover:shadow-green-500/10',
    subtitle: 'Kompleksowa identyfikacja wizualna',
    features: [
      'Projektowanie logo i identyfikacji wizualnej',
      'Kompletny branding i style guide',
      'Materiały marketingowe i reklamowe',
      'Grafiki na social media',
      'Projekty do druku i formatu digital'
    ],
    pattern: 'waves'
  },
  {
    id: 'administration',
    title: 'Administracja stron',
    icon: Settings,
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    shadowColor: 'hover:shadow-amber-500/10',
    subtitle: 'Kompleksowa opieka techniczna',
    features: [
      'Regularne aktualizacje i kopie zapasowe',
      '24/7 monitoring bezpieczeństwa strony',
      'Optymalizacja wydajności i szybkości',
      'Wsparcie techniczne i szkolenia',
      'Dodawanie nowych funkcjonalności'
    ],
    pattern: 'circuit'
  }
];

// Memoizowane SVG Patterns - renderowane tylko raz
const SVGPatterns = memo(({ pattern, color, id }: { pattern: string; color: string; id: string }) => {
  switch (pattern) {
    case 'dots':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id={`dots-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={color} />
              <circle cx="10" cy="10" r="1" fill={color} />
              <circle cx="18" cy="18" r="1" fill={color} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
        </svg>
      );
    case 'waves':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d="M0,20 Q25,10 50,20 T100,20 L100,100 L0,100 Z"
            fill={color}
            opacity="0.2"
          />
          <path
            d="M0,40 Q25,30 50,40 T100,40 L100,100 L0,100 Z"
            fill={color}
            opacity="0.15"
          />
          <path
            d="M0,60 Q25,50 50,60 T100,60 L100,100 L0,100 Z"
            fill={color}
            opacity="0.1"
          />
        </svg>
      );
    case 'circuit':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id={`circuit-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M15 0v5m0 10v5m0 10v5" stroke={color} strokeWidth="1" fill="none" />
              <path d="M0 15h5m10 0h5m10 0h5" stroke={color} strokeWidth="1" fill="none" />
              <circle cx="15" cy="15" r="2" fill={color} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#circuit-${id})`} />
        </svg>
      );
    default:
      return null;
  }
});

SVGPatterns.displayName = 'SVGPatterns';

// Memoizowana karta - re-renderuje się tylko gdy zmienią się props
const ModernServiceCard = memo(({ service, index }: { service: typeof SERVICES[0]; index: number }) => {
  const IconComponent = service.icon;

  const handleClick = () => {
    trackServiceClick(service.title);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          delay: index * 0.08,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-50px" }} // Wcześniejsze rozpoczęcie animacji
      onClick={handleClick}
      className="group relative cursor-pointer"
    >
      <div className={`relative h-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden transition-shadow transition-colors duration-200 hover:shadow-lg hover:border-gray-300 dark:hover:border-zinc-700 ${service.shadowColor}`}>
        
        {/* Background Pattern - z will-change dla płynności */}
        <div className="absolute inset-0 will-change-transform">
          <SVGPatterns pattern={service.pattern} color={service.color} id={service.id} />
        </div>

        {/* Top Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />

        {/* Content */}
        <div className="relative p-8 z-10">
          {/* Icon Container - bez animacji hover dla lepszej wydajności */}
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {service.subtitle}
          </p>

          {/* Features List - wszystkie elementy animowane razem */}
          <motion.ul 
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: {
                duration: 0.3,
                delay: index * 0.08 + 0.2,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3"
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} p-1 mt-0.5`}>
                  <Check className="w-full h-full text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Corner Decoration - statyczne SVG */}
        <svg
          className="absolute top-0 right-0 w-24 h-24 text-gray-100 dark:text-zinc-800 opacity-50 pointer-events-none"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="100,0 100,100 0,0" />
        </svg>
        <svg
          className="absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none"
          fill={service.color}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="100,0 100,100 0,0" />
        </svg>
      </div>
    </motion.div>
  );
});

ModernServiceCard.displayName = 'ModernServiceCard';

export function Services() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black relative overflow-hidden">
      {/* Uproszczone tło - mniej warstw */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Moje Usługi
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Oferuję kompleksowe rozwiązania dla Twojego biznesu - od projektowania po wdrożenie
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service, index) => (
            <ModernServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[1px] rounded-2xl max-w-2xl mx-auto">
            <div className="bg-white dark:bg-black rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Nie wiesz, czego potrzebujesz?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Skontaktuj się ze mną, a wspólnie znajdziemy najlepsze rozwiązanie dla Twojego biznesu
              </p>
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200"
              >
                <span>Darmowa konsultacja</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}