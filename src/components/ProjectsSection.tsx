'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalData } from '@/lib/personal-data';
import SectionReveal from './SectionReveal';

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <SectionReveal id="work">
      <div ref={ref} style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}
        >
          <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
            Chapter 05 &mdash; The Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '16px' }}
        >
          Selected <span style={{ color: 'var(--text-accent)' }}>Thought Pieces.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '52px', maxWidth: '520px' }}
        >
          Each project is an argument about how something should work, feel, or exist.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {personalData.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
              onClick={() => setActiveProject(activeProject === idx ? null : idx)}
              style={{
                padding: '32px', borderRadius: '14px',
                border: activeProject === idx ? '1px solid rgba(212, 168, 83, 0.15)' : '1px solid var(--border-subtle)',
                background: activeProject === idx ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
                      {project.category}
                    </span>
                    <span style={{ color: 'var(--text-muted)', opacity: 0.3, fontSize: '12px' }}>/</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--accent-primary)' }}>{project.year}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {project.tagline}
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: activeProject === idx ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: '20px', color: 'var(--text-muted)', flexShrink: 0, lineHeight: 1 }}
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence>
                {activeProject === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingTop: '24px', marginTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '22px' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tech.map((t) => (
                          <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--text-accent)', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(212, 168, 83, 0.12)', background: 'var(--accent-muted)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
