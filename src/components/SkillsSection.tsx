'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalData } from '@/lib/personal-data';
import SectionReveal from './SectionReveal';

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<string | null>(null);
  const categories = Object.entries(personalData.skills);

  return (
    <SectionReveal id="craft">
      <div ref={ref} style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}
        >
          <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
            Chapter 03 &mdash; The Craft
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '16px' }}
        >
          The <span style={{ color: 'var(--text-accent)' }}>Craft.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '44px', maxWidth: '520px' }}
        >
          Tools are extensions of thought. These are the instruments I think with.
        </motion.p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
          {categories.map(([cat], i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.04 }}
              onClick={() => setActive(active === cat ? null : cat)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                padding: '9px 18px', borderRadius: '999px', cursor: 'pointer',
                border: active === cat ? '1px solid rgba(212, 168, 83, 0.3)' : '1px solid var(--border-subtle)',
                background: active === cat ? 'var(--accent-muted)' : 'transparent',
                color: active === cat ? 'var(--text-accent)' : 'var(--text-muted)',
                transition: 'all 0.25s ease',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
          {categories.map(([cat, skills], catIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? {
                opacity: active === null || active === cat ? 1 : 0.25,
                y: 0,
              } : {}}
              transition={{ delay: 0.25 + catIdx * 0.06, duration: 0.4 }}
              style={{
                padding: '28px',
                borderRadius: '14px',
                border: active === cat ? '1px solid rgba(212, 168, 83, 0.15)' : '1px solid var(--border-subtle)',
                background: active === cat ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: active === cat ? 'var(--accent-primary)' : 'var(--text-muted)',
                  opacity: active === cat ? 1 : 0.3, transition: 'all 0.25s',
                }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
                  {cat}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)',
                      padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
