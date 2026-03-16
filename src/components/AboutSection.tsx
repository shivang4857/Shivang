'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalData } from '@/lib/personal-data';
import SectionReveal from './SectionReveal';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);

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
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '44px' }}
        >
          A Dialogue<br />
          <span style={{ color: 'var(--text-accent)' }}>Beyond the Syntax.</span>
        </motion.h2>

        <motion.p
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
