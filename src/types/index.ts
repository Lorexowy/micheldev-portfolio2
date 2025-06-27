// src/types/index.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'Monitor' | 'Palette' | 'Settings';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}