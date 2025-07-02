'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';

// Przykładowe dane projektów
const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: 'Voyager - Polska Galanteria Skórzana',
    description: 'Galeria producenta galanterii skórzanej Voyager.',
    image: '/images/websites/voyagersopelweb.webp',
    category: 'websites',
    url: 'https://voyagersopel.pl/'
  },
  {
    id: 2,
    title: 'VGEO - Profesjonalne Usługi Geodezyjne',
    description: 'Strona internetowa firmy geodezyjnej VGEO.',
    image: '/images/websites/vgeoweb.webp',
    category: 'websites',
    url: 'http://vgeo.pl/'
  },
  {
    id: 3,
    title: 'Nitką i Szydełkiem - Rękodzieło Szydełkowe',
    description: 'Galeria rękodzieła szydełkowego Nitką i Szydełkiem.',
    image: '/images/websites/nitkaiszydelkiemweb.webp',
    category: 'websites',
    url: 'https://nitkaiszydelkiem.pl/'
  },
  {
    id: 4,
    title: 'E-commerce Fashion',
    description: 'Sklep internetowy z ubraniami i systemem płatności',
    image: '/images/websites/ecommerce.webp',
    category: 'graphics',
    url: null
  },
  {
    id: 5,
    title: 'Logo TechStart',
    description: 'Nowoczesne logo dla startupu technologicznego',
    image: '/images/graphics/logo-techstart.webp',
    category: 'graphics',
    url: null
  },
  {
    id: 6,
    title: 'Branding Kawiarni',
    description: 'Kompletna identyfikacja wizualna dla lokalnej kawiarni',
    image: '/images/graphics/cafe-branding.webp',
    category: 'graphics',
    url: null
  }
];

const TABS = [
  { id: 'all', label: 'Wszystkie', count: PORTFOLIO_PROJECTS.length },
  { id: 'websites', label: 'Strony internetowe', count: PORTFOLIO_PROJECTS.filter(p => p.category === 'websites').length },
  { id: 'graphics', label: 'Grafika', count: PORTFOLIO_PROJECTS.filter(p => p.category === 'graphics').length }
];

// Image component with fallback
function ProjectImage({ project }: { project: typeof PORTFOLIO_PROJECTS[0] }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (imageError) {
    // Fallback to placeholder if image fails to load
    return <ProjectImagePlaceholder title={project.title} category={project.category} />;
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-700 animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={project.image}
        alt={project.title}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}

// Placeholder component for missing images (fallback)
function ProjectImagePlaceholder({ title, category }: { title: string; category: string }) {
  const bgColor = category === 'websites' ? 'from-blue-500 to-purple-600' : 'from-green-500 to-teal-600';
  
  return (
    <div className={`w-full h-full bg-gradient-to-br ${bgColor} flex items-center justify-center`}>
      <div className="text-center text-white p-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-white/20 rounded-lg flex items-center justify-center">
          {category === 'websites' ? (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3v7h10V7H5z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className="text-xs sm:text-sm font-medium opacity-90 line-clamp-2">{title}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PORTFOLIO_PROJECTS[0] }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only track mouse on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    // Only enable hover on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/20 dark:hover:shadow-zinc-900/20 h-full cursor-pointer"
    >
      {/* Border Highlight */}
      {mounted && isHovered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-500 ease-out"
          style={{
            background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.8), transparent 25%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            padding: '2px',
            borderRadius: '0.75rem',
          }}
        />
      )}

      {/* Image Container */}
      <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <ProjectImage project={project} />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)] lg:h-[calc(100%-14rem)]">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow line-clamp-3">
          {project.description}
        </p>
        
        {/* Action Button - only for websites */}
        {project.category === 'websites' && project.url && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(project.url, '_blank')}
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 self-start"
          >
            <span>Zobacz stronę</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<Record<string, number>>({
    all: 3,
    websites: 3,
    graphics: 3
  });

  const ITEMS_PER_LOAD = 3;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter projects based on active tab
  const allFilteredProjects = activeTab === 'all' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(project => project.category === activeTab);

  // Get currently visible projects
  const visibleProjects = allFilteredProjects.slice(0, visibleCount[activeTab]);
  
  // Check if there are more projects to load
  const hasMoreProjects = allFilteredProjects.length > visibleCount[activeTab];
  const totalProjects = allFilteredProjects.length;

  // Load more projects
  const loadMoreProjects = () => {
    setVisibleCount(prev => ({
      ...prev,
      [activeTab]: Math.min(prev[activeTab] + ITEMS_PER_LOAD, totalProjects)
    }));
  };

  // Reset visible count when changing tabs
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false); // Close dropdown when selecting
    if (visibleCount[tabId] === 3) {
      // If we haven't loaded more in this tab, keep it at 3
      return;
    }
  };

  const activeTabData = TABS.find(tab => tab.id === activeTab);

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-black relative overflow-hidden">
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Moje Projekty
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Sprawdź moje ostatnie realizacje w różnych kategoriach. Od stron internetowych po grafikę, znajdziesz tu różnorodne projekty graficzne, które pokazują moje umiejętności i kreatywność.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Desktop Tabs */}
          <div className="hidden md:block border-b border-gray-200 dark:border-zinc-700">
            <nav className="flex justify-center space-x-8 lg:space-x-12">
              {TABS.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{tab.label}</span>
                    <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {tab.count}
                    </span>
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              <span className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {activeTabData?.label}
                </span>
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {activeTabData?.count}
                </span>
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200 ${
                        activeTab === tab.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <span className={`font-medium ${
                        activeTab === tab.id 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {tab.label}
                      </span>
                      <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {totalProjects > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mt-8"
          >
            {hasMoreProjects ? (
              <motion.button
                onClick={loadMoreProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Pokaż więcej ({allFilteredProjects.length - visibleCount[activeTab]} pozostałych)
              </motion.button>
            ) : (
              <div className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">
                ✓ Wszystkie projekty są już wyświetlone
              </div>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        <AnimatePresence>
          {visibleProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Brak projektów w tej kategorii
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}