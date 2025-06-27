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
    id: 'web-design',
    title: 'Projektowanie stron',
    description: 'Nowoczesne, responsywne strony internetowe dostosowane do Twoich potrzeb',
    icon: 'Monitor',
    features: ['Responsywny design', 'UX/UI Design', 'Prototypowanie', 'Wireframing']
  },
  {
    id: 'web-development',
    title: 'Programowanie',
    description: 'Profesjonalne rozwiązania webowe z wykorzystaniem najnowszych technologii',
    icon: 'Code',
    features: ['React/Next.js', 'TypeScript', 'Backend API', 'Optymalizacja SEO']
  },
  {
    id: 'graphics',
    title: 'Grafika komputerowa',
    description: 'Kreatywne projekty graficzne dla Twojej marki',
    icon: 'Palette',
    features: ['Grafiki reklamowe', 'Ilustracje', 'Ikony', 'Materiały promocyjne']
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Kompleksowa identyfikacja wizualna marki',
    icon: 'Star',
    features: ['Logo design', 'Książka marki', 'Kolory i typografia', 'Strategia marki']
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