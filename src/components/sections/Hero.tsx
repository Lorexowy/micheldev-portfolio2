// src/components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Witaj w <span className="text-blue-600 dark:text-blue-400">MichelDev</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Tworzymy nowoczesne strony internetowe, grafiki i kompleksowe rozwiązania brandingowe
          </p>
          {/* Hero content będzie rozbudowany w następnym kroku */}
        </motion.div>
      </div>
    </section>
  );
}