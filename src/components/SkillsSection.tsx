'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '@/lib/personal-data';
import useEnhancedMotion from '@/hooks/useEnhancedMotion';
import { smoothScrollToSceneIndex } from '@/lib/scroll';
import StickyScene from './StickyScene';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const categories = Object.entries(personalData.skills);
  const enhancedMotion = useEnhancedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = categories.length > 1 ? activeIndex / (categories.length - 1) : 0;

  useEffect(() => {
    if (!enhancedMotion || !sceneRef.current) return;

    let currentIndex = 0;
    const trigger = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.22,
      onUpdate: (self) => {
        const nextIndex = Math.round(self.progress * (categories.length - 1));
        if (nextIndex !== currentIndex) {
          currentIndex = nextIndex;
          setActiveIndex(nextIndex);
        }
      },
    });

    return () => trigger.kill();
  }, [categories.length, enhancedMotion]);

  const activeCategory = categories[activeIndex] ?? categories[0];
  const jumpToIndex = (index: number) => {
    if (!sceneRef.current) return;
    setActiveIndex(index);
    smoothScrollToSceneIndex(sceneRef.current, index, categories.length);
  };

  if (!enhancedMotion) {
    return (
      <section id="craft">
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
              Chapter 03 - The Craft
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '16px' }}>
            The <span style={{ color: 'var(--text-accent)' }}>Craft.</span>
          </h2>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '36px', maxWidth: '520px' }}>
            Tools are extensions of thought. These are the instruments I think with.
          </p>

          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: 'minmax(290px, 85%)',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollSnapType: 'x mandatory',
            }}
          >
            {categories.map(([cat, skills]) => (
              <div
                key={cat}
                style={{
                  scrollSnapAlign: 'start',
                  padding: '28px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--text-accent)', textTransform: 'uppercase' as const }}>
                    {cat}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    {skills.length} tools
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        padding: '7px 12px',
                        borderRadius: '999px',
                        border: '1px solid var(--border-subtle)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <StickyScene
      id="craft"
      enabled
      sceneRef={sceneRef}
      sceneHeight={`${Math.max(205, categories.length * 42)}vh`}
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
            animate={{ x: progress * -34 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
              <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
                Chapter 03 - The Craft
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 500, lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '18px' }}>
              Tools that earn
              <br />
              <span style={{ color: 'var(--text-accent)' }}>screen time.</span>
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '420px' }}>
              Stronger motion, less forced scrubbing. Scroll if you want, or jump straight to the category you actually care about.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {categories.map(([cat], index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={cat}
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
                    {cat}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map(([cat], index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => jumpToIndex(index)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr auto',
                      gap: '12px',
                      alignItems: 'center',
                      padding: '10px 0',
                      opacity: isActive ? 1 : 0.38,
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
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: isActive ? '16px' : '14px', color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {cat}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      {categories[index][1].length}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            animate={{ x: progress * 26, y: progress * -18 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ position: 'relative', minHeight: '540px', display: 'flex', alignItems: 'center' }}
          >
            <motion.div
              animate={{ x: -22 - progress * 26, y: 42 - progress * 16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '56px 14px -20px 26px',
                borderRadius: '28px',
                border: '1px solid rgba(212, 168, 83, 0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            />
            <motion.div
              animate={{ x: 12 + progress * 18, y: 18 - progress * 12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '20px 0px 6px 10px',
                borderRadius: '28px',
                border: '1px solid rgba(212, 168, 83, 0.08)',
                background: 'rgba(255,255,255,0.015)',
              }}
            />

            <motion.div
              key={activeCategory[0]}
              initial={{ opacity: 0, x: 90, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                padding: '34px',
                borderRadius: '30px',
                border: '1px solid rgba(212, 168, 83, 0.12)',
                background: 'linear-gradient(180deg, rgba(37,35,32,0.96), rgba(30,29,26,0.96))',
                boxShadow: '0 22px 90px rgba(0, 0, 0, 0.26)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '28px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                    ACTIVE CATEGORY
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 500, lineHeight: 1.1, color: 'var(--text-primary)', marginTop: '8px' }}>
                    {activeCategory[0]}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)' }}>
                    {String(activeIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    {activeCategory[1].length} tools in rotation
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {activeCategory[1].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.26, delay: index * 0.02 }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      padding: '8px 14px',
                      borderRadius: '999px',
                      border: '1px solid rgba(200, 180, 140, 0.12)',
                      background: 'rgba(17, 17, 16, 0.26)',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '28px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                  JUMP INSTEAD OF DRAGGING THE WHOLE SECTION
                </span>
                <button
                  type="button"
                  onClick={() => jumpToIndex((activeIndex + 1) % categories.length)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-accent)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                  }}
                >
                  Next category →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </StickyScene>
  );
}
