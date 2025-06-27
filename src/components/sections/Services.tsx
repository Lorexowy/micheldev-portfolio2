// src/components/sections/Services.tsx
'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';

function ServiceCard({ service, className = '' }: { service: typeof SERVICES[0], className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`group relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-gray-200/20 dark:hover:shadow-zinc-900/20 transition-all duration-300 ${className}`}
    >
      {/* Image with fade effect */}
      <div className={`relative overflow-hidden ${className.includes('lg:col-span-3') ? 'h-48 sm:h-52 lg:h-100' : 'h-48 sm:h-52 lg:h-48'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700" />
        
        {/* Simple dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div 
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Fade gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start">
          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nasze Usługi
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Oferujemy kompleksowe rozwiązania dla Twojego biznesu
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Large card - Web Development */}
          <ServiceCard 
            service={SERVICES[0]} 
            className="lg:col-span-3 lg:row-span-1"
          />
          
          {/* Two smaller cards on the right */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 lg:gap-8">
            <ServiceCard service={SERVICES[1]} />
            <ServiceCard service={SERVICES[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
