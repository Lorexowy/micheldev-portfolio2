// src/components/sections/Contact.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Clock, 
  Instagram, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  User,
  Globe,
  MessageSquare,
  DollarSign
} from 'lucide-react';

// Typy projektów
const PROJECT_TYPES = [
  { value: 'website', label: 'Strona internetowa' },
  { value: 'logo', label: 'Identyfikacja wizualna (logo)' },
  { value: 'business-materials', label: 'Materiały firmowe (wizytówki, ulotki)' },
  { value: 'branding', label: 'Kompleksowy branding' },
  { value: 'other', label: 'Inne' }
];

// Budżety
const BUDGET_RANGES = [
  { value: 'under-500', label: 'Do 500 zł' },
  { value: 'under-2k', label: 'Do 2 000 zł' },
  { value: '2k-5k', label: '2 000 - 5 000 zł' },
  { value: '5k-10k', label: '5 000 - 10 000 zł' },
  { value: '10k-20k', label: '10 000 - 20 000 zł' },
  { value: 'over-20k', label: 'Powyżej 20 000 zł' },
  { value: 'discuss', label: 'Do ustalenia' }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Mapa Polski SVG (dokładniejszy kształt granic)
function PolandMap() {
  return (
    <svg 
      viewBox="0 0 400 300" 
      className="w-full h-full"
      fill="none"
    >
      {/* Dokładniejszy kształt granic Polski */}
      <motion.path
        d="M80 120 L85 100 L95 85 L110 75 L130 70 L155 68 L180 65 L200 62 L225 60 L250 58 L275 60 L300 65 L320 75 L335 85 L345 100 L350 115 L348 130 L345 145 L340 160 L335 175 L330 190 L325 200 L315 210 L300 218 L280 225 L260 228 L240 230 L220 228 L200 225 L180 222 L160 218 L140 212 L125 205 L110 195 L100 180 L95 165 L90 150 L85 135 L80 120 Z"
        fill="none"
        stroke="rgb(var(--primary))"
        strokeWidth="3"
        className="transition-colors duration-300"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      {/* Delikatne wypełnienie */}
      <path
        d="M80 120 L85 100 L95 85 L110 75 L130 70 L155 68 L180 65 L200 62 L225 60 L250 58 L275 60 L300 65 L320 75 L335 85 L345 100 L350 115 L348 130 L345 145 L340 160 L335 175 L330 190 L325 200 L315 210 L300 218 L280 225 L260 228 L240 230 L220 228 L200 225 L180 222 L160 218 L140 212 L125 205 L110 195 L100 180 L95 165 L90 150 L85 135 L80 120 Z"
        fill="rgb(var(--primary))"
        fillOpacity="0.1"
        className="transition-colors duration-300"
      />
      
      {/* Subtelne kropki reprezentujące główne miasta (opcjonalnie) */}
      <motion.circle
        cx="215"
        cy="145"
        r="2"
        fill="rgb(var(--primary))"
        fillOpacity="0.6"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.circle
        cx="160"
        cy="130"
        r="2"
        fill="rgb(var(--primary))"
        fillOpacity="0.6"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.circle
        cx="270"
        cy="125"
        r="2"
        fill="rgb(var(--primary))"
        fillOpacity="0.6"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </svg>
  );
}

// Dropdown component
function Dropdown({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon 
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-zinc-500"
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-gray-400" />
          <span className={selectedOption ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 z-50 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white transition-colors duration-150"
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    projectType: '',
    budget: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię jest wymagane';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Tutaj będzie integracja z EmailJS
      await new Promise(resolve => setTimeout(resolve, 2000)); // Symulacja
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        website: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:96px_96px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
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
            Skontaktuj się ze mną!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Gotowy na rozpoczęcie współpracy? Napisz i otrzymaj bezpłatną wycenę!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 p-8 shadow-lg">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Imię *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'
                      }`}
                      placeholder="Twoje imię"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'
                      }`}
                      placeholder="twoj@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Phone & Website Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefon <span className="text-gray-400">(opcjonalnie)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+48 123 456 789"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Strona firmowa <span className="text-gray-400">(opcjonalnie)</span>
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://twojafirma.pl"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rodzaj projektu
                  </label>
                  <Dropdown
                    options={PROJECT_TYPES}
                    value={formData.projectType}
                    onChange={(value) => handleInputChange('projectType', value)}
                    placeholder="Wybierz rodzaj projektu"
                    icon={MessageSquare}
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budżet <span className="text-gray-400">(opcjonalnie)</span>
                  </label>
                  <Dropdown
                    options={BUDGET_RANGES}
                    value={formData.budget}
                    onChange={(value) => handleInputChange('budget', value)}
                    placeholder="Wybierz przedział budżetu"
                    icon={DollarSign}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-white dark:bg-zinc-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'
                    }`}
                    placeholder="Opisz swój projekt i oczekiwania..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.div
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Wysyłanie...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Wyślij i otrzymaj bezpłatną wycenę</span>
                    </>
                  )}
                </motion.div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Wiadomość została wysłana! Odpowiemy w ciągu 24 godzin.</span>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Informacje kontaktowe
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">mateusz.michel7@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">+48 519 430 169</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">Pon-Pt: 9:00-17:00</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Instagram className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <a 
                    href="https://instagram.com/michelwebdev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    @micheldev
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Zasięg działania
              </h3>
              
              <div className="aspect-[4/3] mb-4">
                <PolandMap />
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Zasięg:</strong> Cała Polska
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Realizujemy projekty dla klientów z całego kraju. Współpraca odbywa się zdalnie z pełnym wsparciem online.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}