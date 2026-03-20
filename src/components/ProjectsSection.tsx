'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '@/lib/personal-data';
import useEnhancedMotion from '@/hooks/useEnhancedMotion';
import { smoothScrollToSceneIndex } from '@/lib/scroll';
import ProjectTerminal from './ProjectTerminal';
import SectionReveal from './SectionReveal';
import StickyScene from './StickyScene';

gsap.registerPlugin(ScrollTrigger);

interface ProjectTerminalConfig {
  eyebrow: string;
  summary: string;
  footer: string;
  signals: { label: string; value: string }[];
  commands: string[];
  outputs: Record<number, string[]>;
}

const TERMINAL_CONTENT: Record<string, ProjectTerminalConfig> = {
  'Distributed Multivendor SaaS Platform': {
    eyebrow: 'platform runtime',
    summary: 'Marketplace orchestration, realtime event flow, and observability all in one rail instead of a wall of architecture words.',
    footer: 'The point here was not feature count. It was getting a busy commerce system to behave under load without turning operations into theatre.',
    signals: [
      { label: 'surface', value: 'multivendor commerce' },
      { label: 'mode', value: 'services + queues' },
      { label: 'watch', value: 'otel + metrics' },
    ],
    commands: [
      'nx deploy marketplace --scope api,worker,realtime',
      'stream-events --topic user.activity --sink recommendations',
      'trace-checkout --span orders.checkout --budget 200ms',
    ],
    outputs: {
      0: ['gateway healthy', 'seller, buyer, and admin flows wired'],
      1: ['Kafka lag stable', 'ranking and notification events flowing'],
      2: ['trace resolved in 184ms', 'Prometheus targets staying green'],
    },
  },
  'Firecracker-Powered AI Coding Agent': {
    eyebrow: 'sandbox runtime',
    summary: 'This project needed isolation, orchestration, and enough context discipline to let an agent work without becoming a liability.',
    footer: 'The terminal sits here because this project is infrastructure first. The interaction should feel like controlled execution, not a flashy demo.',
    signals: [
      { label: 'surface', value: 'microVM sandbox' },
      { label: 'mode', value: 'agent orchestration' },
      { label: 'watch', value: 'bundle + state' },
    ],
    commands: [
      'spawn-vm --profile agent-sandbox --isolation firecracker',
      'mount-workspace --context 1m-tokens --policy prune-smart',
      'orchestrate-run --tools shell,exec,fs,xdot --bundle output.zip',
    ],
    outputs: {
      0: ['microVM ready', 'display server booted', 'sandbox boundary locked'],
      1: ['workspace attached', 'context window hydrated', 'state metadata indexed'],
      2: ['job completed', 'artifacts packaged', 'bundle ready for download'],
    },
  },
  'Conversational Portfolio': {
    eyebrow: 'interaction runtime',
    summary: 'This site is part narrative, part query surface. The terminal rail translates that into the systems underneath instead of more marketing copy.',
    footer: 'The product choice here was simple: stop making visitors hunt and let the interface answer directly.',
    signals: [
      { label: 'surface', value: 'portfolio + chat' },
      { label: 'mode', value: 'RAG guided UX' },
      { label: 'watch', value: 'prompt boundaries' },
    ],
    commands: [
      'index-profile --source personal-data.ts --mode retrieval',
      'bind-chat --strict-context --placeholder rotate-smart',
      'compose-scroll --lenis gsap --scene projects',
    ],
    outputs: {
      0: ['context slices cached', 'assistant constrained to portfolio scope'],
      1: ['query surface live', 'typed suggestions filtered by intent'],
      2: ['hero untouched', 'storytelling layers synced to scroll'],
    },
  },
  'Mystery Message — Anonymous Message Sending Platform': {
    eyebrow: 'product runtime',
    summary: 'Anonymous products are mostly trust problems. The interesting work is in guardrails, verification, and keeping the flow lightweight.',
    footer: 'It is a simple interaction on the surface, but the product only works if identity and message integrity stay boringly reliable.',
    signals: [
      { label: 'surface', value: 'anonymous inbox' },
      { label: 'mode', value: 'link-based flow' },
      { label: 'watch', value: 'auth + validation' },
    ],
    commands: [
      'provision-profile-link --mode anonymous',
      'validate-message --schema zod --delivery inbox',
      'issue-auth-session --provider nextauth --notify resend',
    ],
    outputs: {
      0: ['public link generated', 'sender identity stays hidden'],
      1: ['payload sanitized', 'message queued for recipient inbox'],
      2: ['owner verified', 'notification and session flow ready'],
    },
  },
};

export default function ProjectsSection() {
  const projects = personalData.projects;
  const enhancedMotion = useEnhancedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const progress = projects.length > 1 ? activeProject / (projects.length - 1) : 0;

  useEffect(() => {
    if (!enhancedMotion || !sceneRef.current) return;

    let currentIndex = 0;
    const trigger = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.22,
      onUpdate: (self) => {
        const nextIndex = Math.round(self.progress * (projects.length - 1));
        if (nextIndex !== currentIndex) {
          currentIndex = nextIndex;
          setActiveProject(nextIndex);
        }
      },
    });

    return () => trigger.kill();
  }, [enhancedMotion, projects.length]);

  const jumpToIndex = (index: number) => {
    if (!sceneRef.current) return;
    setActiveProject(index);
    smoothScrollToSceneIndex(sceneRef.current, index, projects.length);
  };

  if (!enhancedMotion) {
    return (
      <SectionReveal id="work">
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
              Chapter 05 - The Work
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Selected <span style={{ color: 'var(--text-accent)' }}>Thought Pieces.</span>
          </h2>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '36px', maxWidth: '520px' }}>
            Each project is an argument about how something should work, feel, or exist.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {projects.map((project, idx) => {
              const terminal = TERMINAL_CONTENT[project.title];

              return (
                <div
                  key={project.title}
                  onClick={() => setActiveProject(activeProject === idx ? -1 : idx)}
                  style={{
                    padding: '28px',
                    borderRadius: '18px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                        {project.category} / {project.year}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-primary)', marginTop: '10px', marginBottom: '6px' }}>
                        {project.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {project.tagline}
                      </p>
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>{activeProject === idx ? '−' : '+'}</span>
                  </div>

                  <AnimatePresence>
                    {activeProject === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '22px', marginTop: '22px', borderTop: '1px solid var(--border-subtle)' }}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '18px' }}>
                            {project.description}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '12px',
                                  color: 'var(--text-accent)',
                                  padding: '6px 12px',
                                  borderRadius: '999px',
                                  border: '1px solid rgba(212, 168, 83, 0.14)',
                                  background: 'var(--accent-muted)',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {terminal && (
                            <ProjectTerminal
                              title={project.title}
                              eyebrow={terminal.eyebrow}
                              summary={terminal.summary}
                              commands={terminal.commands}
                              outputs={terminal.outputs}
                              signals={terminal.signals}
                              footer={terminal.footer}
                              marginTop={22}
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    );
  }

  const project = projects[activeProject] ?? projects[0];
  const terminal = TERMINAL_CONTENT[project.title];
  const direction = activeProject % 2 === 0 ? 1 : -1;

  return (
    <StickyScene
      id="work"
      enabled
      sceneRef={sceneRef}
      sceneHeight={`${Math.max(168, projects.length * 34)}vh`}
    >
      <div style={{ width: '100%', padding: '62px 40px' }}>
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr',
            gap: '38px',
            alignItems: 'center',
          }}
        >
          <motion.div
            animate={{ x: progress * -18, y: progress * -6 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
              <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
                Chapter 05 - The Work
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 500, lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Featured
              <br />
              <span style={{ color: 'var(--text-accent)' }}>build logic.</span>
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '390px' }}>
              Scroll for rhythm. Jump when you already know which system you want to inspect.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
              {projects.map((item, index) => {
                const isActive = index === activeProject;
                return (
                  <button
                    key={`${item.title}-pill`}
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
                    {item.title}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(212, 168, 83, 0.28)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>
                JUMP LANE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.map((item, index) => {
                const isActive = index === activeProject;

                return (
                  <button
                    key={item.title}
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
                        {item.title}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {item.category}
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      {item.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            animate={{ x: progress * 20, y: progress * -10 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <motion.div
              animate={{ x: -8 - progress * 12, y: 14 - progress * 8 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: '18px -8px -10px 24px',
                borderRadius: '30px',
                border: '1px solid rgba(212, 168, 83, 0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            />

            <motion.div
              animate={{ x: 18 + direction * 12, y: -10 + progress * 8 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: '-16px 42px 42px -18px',
                borderRadius: '34px',
                border: '1px solid rgba(212, 168, 83, 0.04)',
                background: 'linear-gradient(180deg, rgba(212, 168, 83, 0.03), transparent)',
                pointerEvents: 'none',
              }}
            />

            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: direction * 56, y: 18 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                padding: '30px',
                borderRadius: '32px',
                border: '1px solid rgba(212, 168, 83, 0.12)',
                background: 'linear-gradient(180deg, rgba(37,35,32,0.96), rgba(30,29,26,0.96))',
                boxShadow: '0 22px 90px rgba(0, 0, 0, 0.26)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                    FEATURED PROJECT
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 46px)', fontWeight: 500, lineHeight: 1.05, color: 'var(--text-primary)', marginTop: '10px', marginBottom: '10px' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '560px' }}>
                    {project.tagline}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)' }}>
                    {project.year}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    {project.category}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: terminal ? 'minmax(0, 1.18fr) minmax(300px, 0.82fr)' : '1fr auto',
                  gap: '22px',
                  alignItems: 'start',
                  padding: '20px 0 22px',
                  borderTop: '1px solid rgba(200, 180, 140, 0.08)',
                  borderBottom: '1px solid rgba(200, 180, 140, 0.08)',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginTop: '22px' }}>
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '16px',
                        border: '1px solid rgba(212, 168, 83, 0.08)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        CATEGORY
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                        {project.category}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '16px',
                        border: '1px solid rgba(212, 168, 83, 0.08)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        YEAR
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                        {project.year}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '16px',
                        border: '1px solid rgba(212, 168, 83, 0.08)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        STACK
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                        {project.tech.length} moving parts
                      </div>
                    </div>
                  </div>
                </div>

                {terminal && (
                  <ProjectTerminal
                    title={project.title}
                    eyebrow={terminal.eyebrow}
                    summary={terminal.summary}
                    commands={terminal.commands}
                    outputs={terminal.outputs}
                    signals={terminal.signals}
                    footer={terminal.footer}
                    marginTop={0}
                  />
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '0' }}>
                {project.tech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.02 }}
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
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '24px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                  DON’T DRAG THROUGH THE WHOLE REEL. JUMP WHERE THE WORK GETS INTERESTING.
                </span>
                <button
                  type="button"
                  onClick={() => jumpToIndex((activeProject + 1) % projects.length)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-accent)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                  }}
                >
                  Next project →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </StickyScene>
  );
}
