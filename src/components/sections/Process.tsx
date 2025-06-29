// src/components/sections/Process.tsx
'use client';

import { useState } from 'react';
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
  Monitor,
  Clock,
  Users,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';

// Dane procesów
const WEB_PROCESS_STEPS = [
  {
    id: 'web-consultation',
    title: 'Konsultacja',
    subtitle: 'Poznajemy Twoje potrzeby',
    description: 'Poznajemy Twoje potrzeby biznesowe i cele strony',
    icon: MessageCircle,
    duration: '1-2 dni',
    color: 'from-blue-500 to-cyan-500',
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
    subtitle: 'Tworzymy architekturę',
    description: 'Tworzymy architekturę i strukturę strony',
    icon: FileText,
    duration: '2-3 dni',
    color: 'from-purple-500 to-pink-500',
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
    title: 'Projektowanie',
    subtitle: 'Tworzymy design',
    description: 'Projektujemy interfejs i doświadczenie użytkownika',
    icon: Paintbrush,
    duration: '5-7 dni',
    color: 'from-green-500 to-emerald-500',
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
    subtitle: 'Kodujemy rozwiązanie',
    description: 'Kodujemy i implementujemy funkcjonalności',
    icon: Code2,
    duration: '7-14 dni',
    color: 'from-orange-500 to-red-500',
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
    subtitle: 'Uruchamiamy projekt',
    description: 'Uruchamiamy stronę i przekazujemy projekt',
    icon: CheckCircle,
    duration: '2-3 dni',
    color: 'from-indigo-500 to-purple-500',
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

const GRAPHICS_PROCESS_STEPS = [
  {
    id: 'graphics-consultation',
    title: 'Konsultacja',
    subtitle: 'Poznajemy Twoją markę',
    description: 'Poznajemy Twoją markę i wizję graficzną',
    icon: MessageCircle,
    duration: '1 dzień',
    color: 'from-green-500 to-teal-500',
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
    subtitle: 'Badamy i inspirujemy się',
    description: 'Badamy markę, konkurencję i trendy wizualne',
    icon: Search,
    duration: '1-2 dni',
    color: 'from-yellow-500 to-orange-500',
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
    subtitle: 'Tworzymy pierwsze pomysły',
    description: 'Tworzymy pierwsze szkice i propozycje',
    icon: Lightbulb,
    duration: '3-5 dni',
    color: 'from-purple-500 to-indigo-500',
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
    subtitle: 'Dopracowujemy do perfekcji',
    description: 'Dopracowujemy wybraną koncepcję do perfekcji',
    icon: Palette,
    duration: '3-4 dni',
    color: 'from-pink-500 to-rose-500',
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
    subtitle: 'Przekazujemy materiały',
    description: 'Przekazujemy gotowe materiały i wsparcie',
    icon: CheckCircle,
    duration: '1-2 dni',
    color: 'from-emerald-500 to-green-500',
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

interface StepCardProps {
  step: typeof WEB_PROCESS_STEPS[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
  isLast: boolean;
}

function ModernStepCard({ step, index, isActive, onClick, isLast }: StepCardProps) {
  const IconComponent = step.icon;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Connection Line */}
      {!isLast && (
        <div className="absolute left-8 top-16 w-0.5 h-24 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 z-0" />
      )}
      
      {/* Card */}
      <motion.div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative cursor-pointer group overflow-hidden ${
          isActive ? 'z-20' : 'z-10'
        }`}
      >
        <div className={`relative bg-white dark:bg-zinc-900 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          isActive 
            ? 'border-blue-500 dark:border-blue-400 shadow-xl shadow-blue-500/20' 
            : 'border-gray-200 dark:border-zinc-700 hover:shadow-lg'
        }`}>
          
          {/* Border Highlight - tylko ramka, bardziej wyrazista, z długim zanikaniem */}
          {isHovered && !isActive && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ease-out"
              style={{
                background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.8), transparent 25%)`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '2px',
                borderRadius: '1rem',
              }}
            />
          )}
          
          <div className="relative p-6 z-10">
            <div className="flex items-start space-x-4">
              {/* Icon bez tła */}
              <div className={`relative flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center`}>
                <IconComponent className="w-10 h-10 text-gray-700 dark:text-gray-300" />
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Duration Badge */}
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {step.duration}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  {step.subtitle}
                </p>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Expand Indicator */}
                <div className="flex items-center justify-end mt-3">
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Expanded Details */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-zinc-800/50 dark:to-blue-900/10 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Actions */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Działania
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {step.actions.map((action, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {action}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Narzędzia
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((tool, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Rezultaty
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {deliverable}
                        </span>
                      </motion.li>
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
  icon: React.ComponentType<{ className?: string }>;
  activeStep: string | null;
  onStepClick: (stepId: string) => void;
}

function ProcessColumn({ title, subtitle, steps, icon: IconComponent, activeStep, onStepClick }: ProcessColumnProps) {
  return (
    <div className="flex-1">
      {/* Column Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* Gradient title - większy i lepiej zaprojektowany, bez ikony */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 bg-gradient-to-r from-black via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
          {subtitle}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 mt-6 text-sm">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span className="font-medium">1000+ projektów</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Zap className="w-4 h-4" />
            <span className="font-medium">99% zadowolenia</span>
          </div>
        </div>
      </motion.div>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <ModernStepCard
            key={step.id}
            step={step}
            index={index}
            isActive={activeStep === step.id}
            onClick={() => onStepClick(step.id)}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export function Process() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'web' | 'graphics'>('web');

  const handleStepClick = (stepId: string) => {
    // Toggle - jeśli kliknięty krok jest już aktywny, zamknij go
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-black dark:via-gray-900/20 dark:to-black relative overflow-hidden">
      {/* Simplified Background - bez migających kropek */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:96px_96px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Profesjonalny proces</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Jak pracujemy?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Poznaj nasz sprawdzony proces, który gwarantuje sukces każdego projektu. 
            Od pierwszej konsultacji do wdrożenia - jesteśmy z Tobą na każdym kroku.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('web')}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'web'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span>Strony internetowe</span>
              </button>
              <button
                onClick={() => setActiveTab('graphics')}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'graphics'
                    ? 'bg-gradient-to-r from-green-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Palette className="w-5 h-5" />
                <span>Grafika & Branding</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Process Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'web' ? (
            <motion.div
              key="web"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <ProcessColumn
                title="Strony internetowe"
                subtitle="Od pomysłu do działającej strony"
                steps={WEB_PROCESS_STEPS}
                icon={Monitor}
                activeStep={activeStep}
                onStepClick={handleStepClick}
              />
            </motion.div>
          ) : (
            <motion.div
              key="graphics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <ProcessColumn
                title="Grafika & Branding"
                subtitle="Od koncepcji do gotowych materiałów"
                steps={GRAPHICS_PROCESS_STEPS}
                icon={Palette}
                activeStep={activeStep}
                onStepClick={handleStepClick}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3ccircle cx='30' cy='30' r='2' fill='%23ffffff' fill-opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`,
                backgroundSize: '60px 60px'
              }} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Gotowy na rozpoczęcie współpracy?
              </h3>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Niezależnie od tego, czy potrzebujesz strony internetowej czy projektów graficznych - 
                jesteśmy tutaj, aby pomóc Ci osiągnąć cele biznesowe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={scrollToContact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
                >
                  <span>Rozpocznij projekt</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={scrollToPortfolio}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200"
                >
                  <Target className="w-5 h-5" />
                  <span>Zobacz portfolio</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}