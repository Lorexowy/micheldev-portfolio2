// src/components/sections/Process.tsx
'use client';

import { motion } from 'framer-motion';

export function Process() {
  return (
    <section id="process" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Proces Współpracy
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Jak przebiega nasza współpraca krok po kroku
          </p>
        </motion.div>
        {/* Process steps będą dodane w następnym kroku */}
      </div>
    </section>
  );
}
