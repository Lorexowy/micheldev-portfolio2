'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { trackProjectView } from '@/lib/gtag';
import { createPortal } from 'react-dom';

// Typy danych
interface GalleryItem {
  type: 'logo' | 'business-card' | 'social' | 'poster' | 'branding' | 'other';
  image: string;
  title: string;
  description?: string;
}

interface GraphicsProject {
  id: number;
  clientName: string;
  mainTitle: string;
  description: string;
  mainImage: string;
  services: string[];
  gallery: GalleryItem[];
  year: string;
  category: 'graphics';
}

interface WebsiteProject {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'websites';
  url: string;
}

type Project = WebsiteProject | GraphicsProject;

// Dane projektów
const WEBSITE_PROJECTS: WebsiteProject[] = [
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
  }
];

const GRAPHICS_PROJECTS: GraphicsProject[] = [
  {
    id: 4,
    clientName: 'Voyager - Polska Galanteria Skórzana',
    mainTitle: 'Projekt logo, wizytówek i metek dla produktów Voyager',
    description: 'Stworzenie nowoczesnego logo, wizytówek i metek dla marki Voyager, specjalizującej się w galanterii skórzanej.',
    mainImage: '/images/graphic/podglad_wizytowki_1.webp',
    services: ['Logo', 'Wizytówki', 'Social Media'],
    gallery: [
      {
        type: 'logo',
        image: '/images/graphic/podglad_wizytowki_1.webp',
        title: 'Logo TechStart',
        description: 'Nowoczesne logo z symbolem innowacji'
      },
      {
        type: 'business-card',
        image: '/images/graphic/podglad_wizytowki_2.webp',
        title: 'Wizytówki',
        description: 'Eleganckie wizytówki z embossowanym logo'
      },
      {
        type: 'social',
        image: '/images/graphic/voyager_logo.webp',
        title: 'Social Media Templates',
        description: 'Szablony do mediów społecznościowych'
      }
    ],
    year: '2025',
    category: 'graphics'
  }
];

// Połączenie wszystkich projektów
const ALL_PROJECTS: Project[] = [...WEBSITE_PROJECTS, ...GRAPHICS_PROJECTS];

const TABS = [
  { id: 'all', label: 'Wszystkie', count: ALL_PROJECTS.length },
  { id: 'websites', label: 'Strony internetowe', count: WEBSITE_PROJECTS.length },
  { id: 'graphics', label: 'Grafika', count: GRAPHICS_PROJECTS.length }
];

// Komponent obrazu z fallbackiem
function ProjectImage({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = project.category === 'websites' 
    ? project.image 
    : (project as GraphicsProject).mainImage;

  const title = project.category === 'websites' 
    ? project.title 
    : (project as GraphicsProject).clientName;

  if (imageError) {
    return <ProjectImagePlaceholder title={title} category={project.category} />;
  }

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-700 animate-pulse" />
      )}
      
      <Image
        src={imageSrc}
        alt={title}
        fill
        className={`object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

// Placeholder dla brakujących obrazów
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

// Modal galerii dla projektów graficznych
function GraphicsGalleryModal({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: GraphicsProject; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Resetuj index przy otwieraniu modala
  useEffect(() => {
  if (isOpen) {
    setCurrentIndex(0);
  }
  }, [isOpen, project.gallery.length]);

  // Obsługa klawiszy i blokowanie przewijania
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentIndex((prev) => (prev + 1) % project.gallery.length);
          break;
      }
    };

    if (isOpen) {
      // Blokuj przewijanie tła
      document.body.style.overflow = 'hidden';
      // Dodaj klasę do body żeby móc stylować inne elementy
      document.body.classList.add('modal-open');
      // Dodaj listener
      document.addEventListener('keydown', handleKeyDown);
    } else {
      // Przywróć przewijanie
      document.body.style.overflow = 'unset';
      // Usuń klasę
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  if (!isOpen) return null;

  const currentItem = project.gallery[currentIndex];

  // Renderuj modal przez portal bezpośrednio do body
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          style={{ 
            zIndex: 2147483647, // Maksymalny możliwy z-index
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] w-full mx-4 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-2xl"
            style={{ zIndex: 2147483647 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.clientName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.mainTitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative bg-gray-50 dark:bg-zinc-800 min-h-96">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative max-w-full max-h-full w-full h-full flex items-center justify-center">
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    style={{
                      filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))',
                    }}
                  />
                </div>
              </div>

              {/* Navigation Arrows */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Image Info */}
            <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {currentItem.title}
              </h4>
              {currentItem.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentItem.description}
                </p>
              )}
            </div>

            {/* Thumbnails */}
            {project.gallery.length > 1 && (
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {project.gallery.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? 'border-blue-500 ring-2 ring-blue-500/20'
                          : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Karta projektu strony internetowej
function WebsiteProjectCard({ project }: { project: WebsiteProject }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: hover)').matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
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
        
        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            trackProjectView(project.title);
            window.open(project.url, '_blank');
          }}
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 self-start"
        >
          <span>Zobacz stronę</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// Karta projektu graficznego
function GraphicsProjectCard({ project }: { project: GraphicsProject }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: hover)').matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    trackProjectView(project.clientName);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
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
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {project.clientName}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
              {project.year}
            </span>
          </div>

          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {project.mainTitle}
          </p>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Services */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.services.map((service, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-1 overflow-x-auto">
            {project.gallery.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {project.gallery.length > 4 && (
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  +{project.gallery.length - 4}
                </span>
              </div>
            )}
          </div>

          {/* Gallery Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 text-sm"
          >
            Zobacz galerię ({project.gallery.length})
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      <GraphicsGalleryModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

// Główny komponent
export function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<Record<string, number>>({
    all: 6,
    websites: 6,
    graphics: 6
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
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(project => project.category === activeTab);

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
    setIsDropdownOpen(false);
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
            Sprawdź moje ostatnie realizacje w różnych kategoriach. Od stron internetowych po grafikę, znajdziesz tu różnorodne projekty, które pokazują moje umiejętności i kreatywność.
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
                  {project.category === 'websites' ? (
                    <WebsiteProjectCard project={project as WebsiteProject} />
                  ) : (
                    <GraphicsProjectCard project={project as GraphicsProject} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {totalProjects > 6 && (
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