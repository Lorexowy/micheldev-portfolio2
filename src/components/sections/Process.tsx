// src/components/sections/Process.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  FileText, 
  Paintbrush, 
  Code2, 
  CheckCircle,
  ChevronDown,
  ArrowRight,
  CheckSquare,
  Wrench,
  Package,
  Search,
  Lightbulb,
  Palette,
  Monitor
} from 'lucide-react';

// Proces dla stron internetowych
const WEB_PROCESS_STEPS = [
  {
    id: 'web-consultation',
    title: 'Konsultacja',
    description: 'Poznajemy Twoje potrzeby biznesowe i cele strony',
    icon: MessageCircle,
    actions: [
      'Analiza wymagań funkcjonalnych',
      'Określenie grupy docelowej',
      'Badanie konkurencji online',
      'Ustalenie budżetu i timeline'
    ],
    tools: ['Zoom/Meet', 'Miro', 'Google Analytics', 'Notion'],
    deliverables: [
      'Brief projektowy',
      'Analiza konkurencji',
      'Mapa wymagań',
      'Propozycja współpracy'
    ]
  },
  {
    id: 'web-planning',
    title: 'Planowanie',
    description: 'Tworzymy architekturę i strukturę strony',
    icon: FileText,
    actions: [
      'Architektura informacji',
      'Mapa strony (sitemap)',
      'User journey mapping',
      'Specyfikacja funkcjonalności'
    ],
    tools: ['Figma', 'Miro', 'Draw.io', 'Notion'],
    deliverables: [
      'Sitemap strony',
      'Wireframes kluczowych stron',
      'Specyfikacja techniczna',
      'Harmonogram realizacji'
    ]
  },
  {
    id: 'web-design',
    title: 'Projektowanie UI/UX',
    description: 'Projektujemy interfejs i doświadczenie użytkownika',
    icon: Paintbrush,
    actions: [
      'Projektowanie UI/UX',
      'Prototypy interaktywne',
      'System designu',
      'Testy użyteczności'
    ],
    tools: ['Figma', 'Adobe XD', 'Principle', 'Maze'],
    deliverables: [
      'Projekty wszystkich stron',
      'Prototypy klikalne',
      'Style guide',
      'Design system'
    ]
  },
  {
    id: 'web-development',
    title: 'Programowanie',
    description: 'Kodujemy i implementujemy funkcjonalności',
    icon: Code2,
    actions: [
      'Kodowanie frontend',
      'Integracja z CMS/backend',
      'Implementacja funkcji',
      'Optymalizacja wydajności'
    ],
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    deliverables: [
      'Działająca strona',
      'Panel administracyjny',
      'Dokumentacja techniczna',
      'Testy funkcjonalne'
    ]
  },
  {
    id: 'web-launch',
    title: 'Wdrożenie',
    description: 'Uruchamiamy stronę i przekazujemy projekt',
    icon: CheckCircle,
    actions: [
      'Testy końcowe',
      'Optymalizacja SEO',
      'Konfiguracja hostingu',
      'Szkolenie z obsługi'
    ],
    tools: ['Vercel', 'Google Analytics', 'Search Console', 'PageSpeed'],
    deliverables: [
      'Strona na produkcji',
      'Instrukcje obsługi',
      'Raport SEO',
      '30 dni wsparcia'
    ]
  }
];

// Proces dla grafiki/brandingu
const GRAPHICS_PROCESS_STEPS = [
  {
    id: 'graphics-consultation',
    title: 'Konsultacja',
    description: 'Poznajemy Twoją markę i wizję graficzną',
    icon: MessageCircle,
    actions: [
      'Analiza potrzeb graficznych',
      'Określenie stylu marki',
      'Badanie trendów w branży',
      'Ustalenie zakresu prac'
    ],
    tools: ['Zoom/Meet', 'Pinterest', 'Behance', 'Miro'],
    deliverables: [
      'Brief kreatywny',
      'Mood board',
      'Analiza konkurencji',
      'Wycena projektu'
    ]
  },
  {
    id: 'graphics-research',
    title: 'Research',
    description: 'Badamy markę, konkurencję i trendy wizualne',
    icon: Search,
    actions: [
      'Analiza tożsamości marki',
      'Research konkurencji',
      'Analiza grup docelowych',
      'Trendy w designie'
    ],
    tools: ['Dribbble', 'Behance', 'Pinterest', 'Adobe Fonts'],
    deliverables: [
      'Raport z researchu',
      'Mapa pozycjonowania',
      'Paleta inspiracji',
      'Kierunki kreatywne'
    ]
  },
  {
    id: 'graphics-concepts',
    title: 'Koncepcje',
    description: 'Tworzymy pierwsze szkice i propozycje',
    icon: Lightbulb,
    actions: [
      'Szkice wstępne',
      'Eksploracja koncepcji',
      'Wybór kierunku',
      'Pierwsze propozycje'
    ],
    tools: ['Adobe Illustrator', 'Photoshop', 'Procreate', 'Figma'],
    deliverables: [
      '3-5 koncepcji wstępnych',
      'Szkice i wireframe\'y',
      'Paleta kolorów',
      'Propozycje typografii'
    ]
  },
  {
    id: 'graphics-refinement',
    title: 'Finalizacja',
    description: 'Dopracowujemy wybraną koncepcję do perfekcji',
    icon: Palette,
    actions: [
      'Dopracowanie wybranej koncepcji',
      'Tworzenie wariantów',
      'Przygotowanie wersji',
      'Optymalizacja plików'
    ],
    tools: ['Adobe Creative Suite', 'Figma', 'After Effects'],
    deliverables: [
      'Finalne projekty',
      'Wszystkie formaty plików',
      'Brand guidelines',
      'Instrukcja użycia'
    ]
  },
  {
    id: 'graphics-delivery',
    title: 'Wdrożenie',
    description: 'Przekazujemy gotowe materiały i wsparcie',
    icon: CheckCircle,
    actions: [
      'Przygotowanie plików do druku',
      'Eksport w różnych formatach',
      'Utworzenie brand book',
      'Wsparcie przy wdrożeniu'
    ],
    tools: ['Adobe Creative Suite', 'Dropbox', 'WeTransfer'],
    deliverables: [
      'Pliki źródłowe',
      'Eksporty w różnych formatach',
      'Brand book',
      '30 dni wsparcia'
    ]
  }
];

interface StepDetailProps {
  step: typeof WEB_PROCESS_STEPS[0];
  isExpanded: boolean;
  onToggle: () => void;
  colorScheme: 'web' | 'graphics';
}

function StepDetail({ step, isExpanded, onToggle, colorScheme }: StepDetailProps) {
  const IconComponent = step.icon;
  
  const colors = {
    web: {
      icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      iconHover: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50',
      titleHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
      borderHover: 'hover:border-blue-300 dark:hover:border-blue-700',
      expandIcon: 'group-hover:text-blue-500',
      shadowHover: 'hover:shadow-blue-500/10',
      actionDot: 'bg-blue-500',
      actionText: 'text-blue-700 dark:text-blue-300',
      actionBg: 'bg-blue-100 dark:bg-blue-900/30',
      deliverableDot: 'bg-purple-500'
    },
    graphics: {
      icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      iconHover: 'group-hover:bg-green-200 dark:group-hover:bg-green-900/50',
      titleHover: 'group-hover:text-green-600 dark:group-hover:text-green-400',
      borderHover: 'hover:border-green-300 dark:hover:border-green-700',
      expandIcon: 'group-hover:text-green-500',
      shadowHover: 'hover:shadow-green-500/10',
      actionDot: 'bg-green-500',
      actionText: 'text-orange-700 dark:text-orange-300',
      actionBg: 'bg-orange-100 dark:bg-orange-900/30',
      deliverableDot: 'bg-orange-500'
    }
  };

  const scheme = colors[colorScheme];
  
  return (
    <motion.div layout className="relative">
      {/* Main Step Card */}
      <motion.div
        layout
        onClick={onToggle}
        className={`group cursor-pointer bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 ${scheme.borderHover} transition-all duration-300 hover:shadow-lg ${scheme.shadowHover}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Icon */}
            <div className={`flex-shrink-0 w-12 h-12 ${scheme.icon} rounded-lg flex items-center justify-center ${scheme.iconHover} transition-colors duration-300`}>
              <IconComponent className="w-6 h-6" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${scheme.titleHover} transition-colors duration-300`}>
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
          
          {/* Expand Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 ml-4"
          >
            <ChevronDown className={`w-5 h-5 text-gray-400 ${scheme.expandIcon} transition-colors duration-300`} />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700/50 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Actions */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckSquare className={`w-4 h-4 ${scheme.actionDot === 'bg-blue-500' ? 'text-green-500' : 'text-green-500'}`} />
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      Działania
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {step.actions.map((action, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className={`w-1.5 h-1.5 ${scheme.actionDot} rounded-full mt-2 flex-shrink-0`} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {action}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Wrench className="w-4 h-4 text-blue-500" />
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      Narzędzia
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((tool, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 ${scheme.actionBg} ${scheme.actionText} rounded-md text-xs font-medium`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Package className="w-4 h-4 text-purple-500" />
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      Rezultaty
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className={`w-1.5 h-1.5 ${scheme.deliverableDot} rounded-full mt-2 flex-shrink-0`} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ProcessColumnProps {
  title: string;
  subtitle: string;
  steps: typeof WEB_PROCESS_STEPS;
  colorScheme: 'web' | 'graphics';
  expandedStep: string | null;
  onToggleStep: (stepId: string) => void;
  icon: React.ComponentType<{ className?: string }>;
}

function MobileProcessColumn({ title, subtitle, steps, colorScheme, expandedStep, onToggleStep, icon: IconComponent }: ProcessColumnProps) {
  const gradients = {
    web: 'from-blue-500 to-purple-600',
    graphics: 'from-green-500 to-orange-500'
  };

  return (
    <div className="flex-1">
      {/* Column Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradients[colorScheme]} rounded-xl mb-4`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {subtitle}
        </p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <StepDetail
              step={step}
              isExpanded={expandedStep === step.id}
              onToggle={() => onToggleStep(step.id)}
              colorScheme={colorScheme}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
function ProcessColumn({ title, subtitle, steps, colorScheme, expandedStep, onToggleStep, icon: IconComponent }: ProcessColumnProps) {
  const gradients = {
    web: 'from-blue-500 to-purple-600',
    graphics: 'from-green-500 to-orange-500'
  };

  return (
    <div className="flex-1">
      {/* Column Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradients[colorScheme]} rounded-xl mb-4`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {subtitle}
        </p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <StepDetail
              step={step}
              isExpanded={expandedStep === step.id}
              onToggle={() => onToggleStep(step.id)}
              colorScheme={colorScheme}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Process() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [mobileFilter, setMobileFilter] = useState<'web' | 'graphics'>('web');

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <section id="process" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:96px_96px] sm:bg-[size:128px_128px] md:bg-[size:160px_160px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Wybierz typ projektu i poznaj nasz proces krok po kroku
          </p>
        </motion.div>

        {/* Mobile Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="lg:hidden mb-8"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-1 flex">
            <button
              onClick={() => setMobileFilter('web')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                mobileFilter === 'web'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Monitor className="w-5 h-5" />
              <span>Strony internetowe</span>
            </button>
            <button
              onClick={() => setMobileFilter('graphics')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                mobileFilter === 'graphics'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Palette className="w-5 h-5" />
              <span>Grafika & Branding</span>
            </button>
          </div>
        </motion.div>

        {/* Desktop: Two Columns */}
        <div className="hidden lg:flex gap-12">
          <ProcessColumn
            title="Strony internetowe"
            subtitle="Od pomysłu do działającej strony"
            steps={WEB_PROCESS_STEPS}
            colorScheme="web"
            expandedStep={expandedStep}
            onToggleStep={toggleStep}
            icon={Monitor}
          />
          
          <ProcessColumn
            title="Grafika & Branding"
            subtitle="Od koncepcji do gotowych materiałów"
            steps={GRAPHICS_PROCESS_STEPS}
            colorScheme="graphics"
            expandedStep={expandedStep}
            onToggleStep={toggleStep}
            icon={Palette}
          />
        </div>

        {/* Mobile: Single Column with Filter */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            {mobileFilter === 'web' ? (
              <motion.div
                key="web"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <MobileProcessColumn
                  title="Strony internetowe"
                  subtitle="Od pomysłu do działającej strony"
                  steps={WEB_PROCESS_STEPS}
                  colorScheme="web"
                  expandedStep={expandedStep}
                  onToggleStep={toggleStep}
                  icon={Monitor}
                />
              </motion.div>
            ) : (
              <motion.div
                key="graphics"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <MobileProcessColumn
                  title="Grafika & Branding"
                  subtitle="Od koncepcji do gotowych materiałów"
                  steps={GRAPHICS_PROCESS_STEPS}
                  colorScheme="graphics"
                  expandedStep={expandedStep}
                  onToggleStep={toggleStep}
                  icon={Palette}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Gotowy na rozpoczęcie współpracy?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Niezależnie od tego, czy potrzebujesz strony internetowej czy projektów graficznych - jesteśmy tutaj, aby pomóc!
            </p>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Rozpocznij projekt</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}