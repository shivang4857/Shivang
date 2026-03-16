'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalData } from '@/lib/personal-data';
import SectionReveal from './SectionReveal';

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <SectionReveal id="journey">
      <div ref={ref} style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}
        >
          <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
            Chapter 04 &mdash; The Journey
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '16px' }}
        >
          A Vertical Unfolding<br />
          <span style={{ color: 'var(--text-accent)' }}>of Experience.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '52px', maxWidth: '540px' }}
        >
          Each role is a chapter in an ongoing conversation with technology.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {personalData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
            >
              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                style={{
                  width: '100%', textAlign: 'left', padding: '32px', borderRadius: '14px',
                  border: expandedIdx === idx ? '1px solid var(--border-default)' : '1px solid var(--border-subtle)',
                  background: expandedIdx === idx ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase' as const }}>
                      {exp.period}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 500, color: 'var(--text-primary)', marginTop: '8px' }}>
                      {exp.role}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-accent)', marginTop: '4px' }}>
                      {exp.company}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: expandedIdx === idx ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ fontSize: '16px', color: 'var(--text-muted)', flexShrink: 0, marginTop: '8px' }}
                  >
                    &#8595;
                  </motion.span>
                </div>

                <AnimatePresence>
                  {expandedIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingTop: '24px', marginTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '22px' }}>
                          {exp.description}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                          {exp.achievements.map((a, ai) => (
                            <div key={ai} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                              <span style={{ color: 'var(--accent-primary)', marginTop: '7px', fontSize: '6px', flexShrink: 0 }}>&#9670;</span>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}>{a}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {exp.tools.map((t) => (
                            <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', padding: '5px 12px', borderRadius: '999px', border: '1px solid var(--border-subtle)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
