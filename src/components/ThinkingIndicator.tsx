'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const PHRASES = [
  'connecting the dots',
  'pulling context',
  'reasoning',
  'composing',
  'almost there',
];

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;
    const interval = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: 'var(--accent-primary)' }}
      >
        |
      </motion.span>
    </span>
  );
}

function OrbitalDot({ index, total }: { index: number; total: number }) {
  const angle = (index / total) * 360;
  const radius = 10;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'var(--accent-primary)',
        top: '50%',
        left: '50%',
      }}
      animate={{
        x: [
          Math.cos(((angle) * Math.PI) / 180) * radius,
          Math.cos(((angle + 120) * Math.PI) / 180) * radius,
          Math.cos(((angle + 240) * Math.PI) / 180) * radius,
          Math.cos(((angle + 360) * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin(((angle) * Math.PI) / 180) * radius,
          Math.sin(((angle + 120) * Math.PI) / 180) * radius,
          Math.sin(((angle + 240) * Math.PI) / 180) * radius,
          Math.sin(((angle + 360) * Math.PI) / 180) * radius,
        ],
        opacity: [0.3, 1, 0.5, 0.3],
        scale: [0.8, 1.3, 0.9, 0.8],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        delay: index * 0.15,
        ease: 'easeInOut',
      }}
    />
  );
}

function ProgressBar() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '180px',
        height: '2px',
        background: 'var(--border-subtle)',
        borderRadius: '1px',
        overflow: 'hidden',
        marginTop: '8px',
      }}
    >
      <motion.div
        style={{
          height: '100%',
          background: 'var(--accent-primary)',
          borderRadius: '1px',
          transformOrigin: 'left',
        }}
        animate={{
          scaleX: [0, 0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default function ThinkingIndicator() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 2400);
    return () => clearInterval(phraseTimer);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        padding: '14px 6px 20px',
      }}
    >
      {/* Orbital spinner */}
      <div
        style={{
          position: 'relative',
          width: '28px',
          height: '28px',
          flexShrink: 0,
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid var(--border-subtle)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {[0, 1, 2].map((i) => (
          <OrbitalDot key={i} index={i} total={3} />
        ))}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Text column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
        <div style={{ height: '20px', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--text-muted)',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              <TypewriterText text={PHRASES[phraseIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ProgressBar />
          <motion.span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              opacity: 0.4,
              flexShrink: 0,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {elapsed}s
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
