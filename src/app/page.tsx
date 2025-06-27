// src/app/page.tsx
import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}