// src/components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_70%)]"
    >
      {/* Animated Background Grid */}
     <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808040_1px,transparent_1px),linear-gradient(to_bottom,#80808040_1px,transparent_1px)] bg-[size:96px_96px] sm:bg-[size:128px_128px] md:bg-[size:160px_160px] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 70%)',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 70%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-5xl mx-auto">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-zinc-700 to-black dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
              Tworzę wyjątkowe
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent">
              projekty wizualne
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2"
          >
            Specjalizuję się projektowaniu graficznym i tworzeniu stron internetowych.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16"
          >
            <Button
              size="lg"
              onClick={scrollToServices}
              className="w-full sm:w-60 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg transition-all duration-200 ease-out bg-slate-700 dark:bg-slate-200 text-white dark:text-gray-900 hover:opacity-90"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Moje usługi</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-60 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg transition-all duration-200 ease-out border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Skontaktuj się</span>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Fade to white/black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black dark:to-transparent pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 dark:border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-2 sm:w-1 sm:h-3 bg-gray-400 dark:bg-gray-400 rounded-full mt-1.5 sm:mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}