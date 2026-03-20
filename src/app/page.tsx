'use client';

import { useCallback } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProvider from '@/components/ScrollProvider';
import { smoothScrollTo } from '@/lib/scroll';

export default function Home() {
  const handleAskClick = useCallback(() => {
    smoothScrollTo(0, 0);
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('input[data-chat-input="true"]');
      input?.focus();
    }, 600);
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <ScrollProvider />
      <Header onAskClick={handleAskClick} />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
