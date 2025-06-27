// src/types/index.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
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