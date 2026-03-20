'use client';

import type Lenis from 'lenis';

declare global {
  interface Window {
    __portfolioLenis?: Lenis;
  }
}

function resolveTarget(target: number | string | HTMLElement) {
  if (typeof target === 'number') return target;
  if (typeof target === 'string') return document.querySelector<HTMLElement>(target);
  return target;
}

export function smoothScrollTo(target: number | string | HTMLElement, offset = -72) {
  if (typeof window === 'undefined') return;

  const lenis = window.__portfolioLenis;
  const resolved = resolveTarget(target);

  if (lenis && resolved !== null) {
    lenis.scrollTo(resolved, { offset, duration: 1.05 });
    return;
  }

  if (typeof resolved === 'number') {
    window.scrollTo({ top: resolved, behavior: 'smooth' });
    return;
  }

  resolved?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function smoothScrollToSceneIndex(
  scene: HTMLElement,
  index: number,
  total: number,
) {
  if (typeof window === 'undefined' || total <= 1) return;

  const rect = scene.getBoundingClientRect();
  const sceneTop = rect.top + window.scrollY;
  const travel = Math.max(scene.offsetHeight - window.innerHeight, 0);
  const progress = index / (total - 1);
  smoothScrollTo(sceneTop + travel * progress, 0);
}
