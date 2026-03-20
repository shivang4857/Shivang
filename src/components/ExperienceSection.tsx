'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '@/lib/personal-data';
import useEnhancedMotion from '@/hooks/useEnhancedMotion';
import { smoothScrollToSceneIndex } from '@/lib/scroll';
import SectionReveal from './SectionReveal';
import StickyScene from './StickyScene';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const experience = personalData.experience;
  const enhancedMotion = useEnhancedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const progress = experience.length > 1 ? activeIndex / (experience.length - 1) : 0;

  useEffect(() => {
    if (!enhancedMotion || !sceneRef.current) return;

    let currentIndex = 0;
    const trigger = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.22,
      onUpdate: (self) => {
        const nextIndex = Math.round(self.progress * (experience.length - 1));
        if (nextIndex !== currentIndex) {
          currentIndex = nextIndex;
          setActiveIndex(nextIndex);
        }
      },
    });

    return () => trigger.kill();
  }, [enhancedMotion, experience.length]);

  const jumpToIndex = (index: number) => {
    if (!sceneRef.current) return;
    setActiveIndex(index);
    smoothScrollToSceneIndex(sceneRef.current, index, experience.length);
  };

  if (!enhancedMotion) {
    return (
      <SectionReveal id="journey">
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
              Chapter 04 - The Journey
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '16px' }}>
            A Vertical Unfolding
            <br />
            <span style={{ color: 'var(--text-accent)' }}>of Experience.</span>
          </h2>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '52px', maxWidth: '540px' }}>
            Each role is a chapter in an ongoing conversation with technology.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {experience.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 + idx * 0.08, duration: 0.35 }}
              >
                <button
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '32px',
                    borderRadius: '18px',
                    border: expandedIdx === idx ? '1px solid var(--border-default)' : '1px solid var(--border-subtle)',
                    background: expandedIdx === idx ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase' as const }}>
                        {exp.period}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-primary)', marginTop: '10px', marginBottom: '6px' }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {exp.company}
                      </p>
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>{expandedIdx === idx ? '−' : '+'}</span>
                  </div>

                  <AnimatePresence>
                    {expandedIdx === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '22px', marginTop: '22px', borderTop: '1px solid var(--border-subtle)' }}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '18px' }}>
                            {exp.description}
                          </p>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                            {exp.achievements.map((achievement) => (
                              <div key={achievement} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <span style={{ color: 'var(--accent-primary)', marginTop: '7px', fontSize: '6px', flexShrink: 0 }}>&#9670;</span>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                                  {achievement}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {exp.tools.map((tool) => (
                              <span
                                key={tool}
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  color: 'var(--text-muted)',
                                  padding: '5px 12px',
                                  borderRadius: '999px',
                                  border: '1px solid var(--border-subtle)',
                                }}
                              >
                                {tool}
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

  const activeExperience = experience[activeIndex] ?? experience[0];

  return (
    <StickyScene
      id="journey"
      enabled
      sceneRef={sceneRef}
      sceneHeight={`${Math.max(195, experience.length * 40)}vh`}
    >
      <div style={{ width: '100%', padding: '72px 40px' }}>
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '0.82fr 1.18fr',
            gap: '44px',
            alignItems: 'center',
          }}
        >
          <motion.div
            animate={{ x: progress * 28 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
              <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
                Chapter 04 - The Journey
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 500, lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Roles with
              <br />
              <span style={{ color: 'var(--text-accent)' }}>actual weight.</span>
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '390px' }}>
              The story should move with you, not trap you. Jump straight to the role you care about and the panel will catch up.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {experience.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={`${item.company}-${item.role}-pill`}
                    type="button"
                    onClick={() => jumpToIndex(index)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '999px',
                      border: isActive ? '1px solid rgba(212, 168, 83, 0.28)' : '1px solid var(--border-subtle)',
                      background: isActive ? 'var(--accent-muted)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.company}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {experience.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${item.company}-${item.role}`}
                    type="button"
                    onClick={() => jumpToIndex(index)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '42px 1fr auto',
                      gap: '12px',
                      padding: '10px 0',
                      opacity: isActive ? 1 : 0.42,
                      transition: 'all 0.25s ease',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {item.role}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {item.company}
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      {item.period.split('—')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            animate={{ x: -progress * 34, y: progress * -18 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ position: 'relative' }}
          >
            <motion.div
              animate={{ x: 18 + progress * 22, y: 18 - progress * 10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '18px -10px -12px 26px',
                borderRadius: '30px',
                border: '1px solid rgba(212, 168, 83, 0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            />

            <motion.div
              key={`${activeExperience.company}-${activeExperience.role}`}
              initial={{ opacity: 0, x: -86, y: 24 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                padding: '34px',
                borderRadius: '32px',
                border: '1px solid rgba(212, 168, 83, 0.12)',
                background: 'linear-gradient(180deg, rgba(37,35,32,0.96), rgba(30,29,26,0.96))',
                boxShadow: '0 22px 90px rgba(0, 0, 0, 0.26)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                    ACTIVE ROLE
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 46px)', fontWeight: 500, lineHeight: 1.05, color: 'var(--text-primary)', marginTop: '10px', marginBottom: '10px' }}>
                    {activeExperience.role}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '560px' }}>
                    {activeExperience.company}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)' }}>
                    {activeExperience.period}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    {activeExperience.type === 'current' ? 'Current chapter' : 'Previous chapter'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '24px',
                  alignItems: 'start',
                  padding: '22px 0',
                  borderTop: '1px solid rgba(200, 180, 140, 0.08)',
                  borderBottom: '1px solid rgba(200, 180, 140, 0.08)',
                  marginBottom: '22px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
                  {activeExperience.description}
                </p>

                <div style={{ minWidth: '180px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                    IMPACT SNAPSHOT
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-primary)' }}>
                      {activeExperience.achievements.length} shipped outcomes
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-primary)' }}>
                      {activeExperience.tools.length} core tools
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-primary)' }}>
                      {activeExperience.type === 'current' ? 'Hands on now' : 'Archived chapter'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                {activeExperience.achievements.slice(0, 4).map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.03 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                  >
                    <span style={{ color: 'var(--accent-primary)', marginTop: '7px', fontSize: '6px', flexShrink: 0 }}>&#9670;</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeExperience.tools.map((tool) => (
                  <span
                    key={tool}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--text-accent)',
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: '1px solid rgba(212, 168, 83, 0.14)',
                      background: 'var(--accent-muted)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '28px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                  SKIP THE SCRUB. JUMP TO THE NEXT CHAPTER.
                </span>
                <button
                  type="button"
                  onClick={() => jumpToIndex((activeIndex + 1) % experience.length)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-accent)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                  }}
                >
                  Next role →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </StickyScene>
  );
}
