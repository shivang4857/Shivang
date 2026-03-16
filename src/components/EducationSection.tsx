'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { personalData } from '@/lib/personal-data';
import SectionReveal from './SectionReveal';

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionReveal id="education">
      <div ref={ref} style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}
        >
          <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
            Chapter 02 &mdash; The Foundations
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '52px' }}
        >
          The <span style={{ color: 'var(--text-accent)' }}>Foundations.</span>
        </motion.h2>

        {personalData.education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
            style={{
              padding: '36px',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {edu.degree}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-accent)' }}>
                  {edu.institution}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '6px 14px', borderRadius: '999px', border: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>
                {edu.period}
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {edu.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {edu.highlights.map((h) => (
                <span
                  key={h}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', padding: '6px 14px', borderRadius: '999px', border: '1px solid var(--border-subtle)' }}
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
