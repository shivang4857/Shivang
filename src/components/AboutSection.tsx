'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '@/lib/personal-data';
import useEnhancedMotion from '@/hooks/useEnhancedMotion';
import SectionReveal from './SectionReveal';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const ref = useRef(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);
  const enhancedMotion = useEnhancedMotion();

  useEffect(() => {
    if (!enhancedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: ref.current,
        start: 'top 82%',
        end: 'bottom top',
        scrub: 0.45,
      };

      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { y: 0 }, { y: -32, ease: 'none', scrollTrigger: trigger });
      }
      if (bodyRef.current) {
        gsap.fromTo(bodyRef.current, { y: 12 }, { y: -10, ease: 'none', scrollTrigger: trigger });
      }
      if (philosophyRef.current) {
        gsap.fromTo(philosophyRef.current, { y: 26 }, { y: -18, ease: 'none', scrollTrigger: trigger });
      }
      if (valuesRef.current) {
        gsap.fromTo(valuesRef.current, { y: 36 }, { y: -8, ease: 'none', scrollTrigger: trigger });
      }
    }, ref);

    return () => ctx.revert();
  }, [enhancedMotion]);

  return (
    <SectionReveal id="about">
      <div ref={ref} style={{ maxWidth: '720px', margin: '0 auto', padding: '120px 28px 80px' }}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}
        >
          <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
            Chapter 01 &mdash; The Person
          </span>
        </motion.div>

        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '44px' }}
        >
          A Dialogue<br />
          <span style={{ color: 'var(--text-accent)' }}>Beyond the Syntax.</span>
        </motion.h2>

        <motion.p
          ref={bodyRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '24px' }}
        >
          {personalData.about.short}
        </motion.p>

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ paddingTop: '8px' }}>
            {personalData.about.long.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '18px' }}>
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text-accent)', marginBottom: '52px',
          }}
        >
          {expanded ? 'Collapse' : 'Read more'}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'inline-block' }}>
            &#8595;
          </motion.span>
        </button>

        <motion.div
          ref={philosophyRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            padding: '32px',
            borderRadius: '14px',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            marginBottom: '44px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--accent-primary)' }}>&ldquo;</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>Philosophy</span>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            {personalData.about.philosophy}
          </p>
        </motion.div>

        <motion.div
          ref={valuesRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
        >
          {personalData.meta.values.map((value) => (
            <span
              key={value}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', padding: '8px 16px',
                borderRadius: '999px', border: '1px solid var(--border-subtle)',
              }}
            >
              {value}
            </span>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
