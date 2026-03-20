'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEnhancedMotion from '@/hooks/useEnhancedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider() {
  const enhancedMotion = useEnhancedMotion();

  useEffect(() => {
    if (!enhancedMotion) {
      window.__portfolioLenis = undefined;
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    window.__portfolioLenis = lenis;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    window.setTimeout(refresh, 80);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', refresh);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      window.__portfolioLenis = undefined;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [enhancedMotion]);

  return null;
}
