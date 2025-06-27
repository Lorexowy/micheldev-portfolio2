// src/lib/constants.ts
export const NAVIGATION_ITEMS = [
  { id: 'hero', label: 'Start', href: '#hero' },
  { id: 'services', label: 'Usługi', href: '#services' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'process', label: 'Proces', href: '#process' },
  { id: 'contact', label: 'Kontakt', href: '#contact' },
];

export const SERVICES = [
  {
    id: 'web-development',
    title: 'Tworzenie stron internetowych',
    description: 'Projektowanie i tworzenie nowoczesnych, responsywnych stron internetowych dopasowanych do Twoich potrzeb',
    icon: 'Monitor' as const
  },
  {
    id: 'graphics', 
    title: 'Grafika komputerowa',
    description: 'Profesjonalne projekty graficzne, logo i materiały wizualne dla Twojej marki',
    icon: 'Palette' as const
  },
  {
    id: 'administration',
    title: 'Administracja stron',
    description: 'Opieka techniczna, aktualizacje i utrzymanie istniejących stron internetowych',
    icon: 'Settings' as const
  }
];

export const PROCESS_STEPS = [
  {
    id: 'consultation',
    title: 'Konsultacja',
    description: 'Poznajemy Twoje potrzeby i cele biznesowe',
    icon: 'MessageCircle'
  },
  {
    id: 'planning',
    title: 'Planowanie',
    description: 'Tworzymy strategię i plan realizacji projektu',
    icon: 'FileText'
  },
  {
    id: 'design',
    title: 'Projektowanie',
    description: 'Przygotowujemy prototypy i projekty graficzne',
    icon: 'Paintbrush'
  },
  {
    id: 'development',
    title: 'Realizacja',
    description: 'Programujemy i wdrażamy rozwiązanie',
    icon: 'Code2'
  },
  {
    id: 'delivery',
    title: 'Wdrożenie',
    description: 'Testujemy, optymalizujemy i przekazujemy projekt',
    icon: 'CheckCircle'
  }
];