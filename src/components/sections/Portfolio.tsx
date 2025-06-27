// src/components/sections/Portfolio.tsx
'use client';

import { motion } from 'framer-motion';

export function Portfolio() {
  return (
     <section id="portfolio" className="py-20 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sprawdź nasze najnowsze realizacje
          </p>
        </motion.div>
        {/* Portfolio grid będzie dodany w następnym kroku */}
      </div>
    </section>
  );
}