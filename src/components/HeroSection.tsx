'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import ChatInterface from './ChatInterface';

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const FALLBACK_QUOTES = [
  { q: 'First, solve the problem. Then, write the code.', a: 'John Johnson' },
  { q: 'The best way to predict the future is to invent it.', a: 'Alan Kay' },
  { q: 'Simplicity is the soul of efficiency.', a: 'Austin Freeman' },
  { q: 'Make it work, make it right, make it fast.', a: 'Kent Beck' },
  { q: 'Code is like humor. When you have to explain it, it\'s bad.', a: 'Cory House' },
  { q: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', a: 'Martin Fowler' },
  { q: 'Talk is cheap. Show me the code.', a: 'Linus Torvalds' },
  { q: 'The only way to do great work is to love what you do.', a: 'Steve Jobs' },
  { q: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', a: 'Bill Gates' },
  { q: 'It\'s not a bug; it\'s an undocumented feature.', a: 'Anonymous' },
  { q: 'The computer was born to solve problems that did not exist before.', a: 'Bill Gates' },
  { q: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', a: 'Antoine de Saint-Exupéry' },
  { q: 'The function of good software is to make the complex appear to be simple.', a: 'Grady Booch' },
  { q: 'Before software can be reusable it first has to be usable.', a: 'Ralph Johnson' },
  { q: 'Innovation distinguishes between a leader and a follower.', a: 'Steve Jobs' },
];

const TECH_KEYWORDS = [
  'code', 'build', 'create', 'solve', 'problem', 'learn', 'work', 'think',
  'design', 'system', 'simple', 'complex', 'improve', 'progress', 'change',
  'future', 'innovate', 'innovation', 'technology', 'machine', 'computer',
  'engineer', 'software', 'program', 'imagine', 'invent', 'craft', 'ship',
  'start', 'fail', 'try', 'practice', 'discipline', 'focus', 'persist',
  'vision', 'idea', 'mind', 'knowledge', 'wisdom', 'curiosity', 'question',
  'action', 'effort', 'excellence', 'master', 'grow', 'adapt', 'iterate',
];

interface Quote {
  q: string;
  a: string;
}

function isRelevant(quote: Quote): boolean {
  const text = (quote.q + ' ' + quote.a).toLowerCase();
  return TECH_KEYWORDS.some(kw => text.includes(kw));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const HERO_LINES = [
  { top: 'Good to see', bottom: 'you here.' },
  { top: 'Let\'s talk', bottom: 'systems.' },
  { top: 'Pull up a', bottom: 'chair.' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [heroLine, setHeroLine] = useState(HERO_LINES[0]);

  useEffect(() => {
    setMounted(true);
    setHeroLine(pickRandom(HERO_LINES));

    let cancelled = false;

    async function fetchQuote() {
      try {
        const res = await fetch('https://zenquotes.io/api/quotes');
        if (!res.ok) throw new Error('bad status');
        const data: Quote[] = await res.json();
        if (cancelled) return;

        const relevant = data.filter(isRelevant);
        if (relevant.length > 0) {
          setQuote(pickRandom(relevant));
        } else {
          setQuote(pickRandom(FALLBACK_QUOTES));
        }
      } catch {
        if (!cancelled) {
          setQuote(pickRandom(FALLBACK_QUOTES));
        }
      }
    }

    fetchQuote();
    return () => { cancelled = true; };
  }, []);

  const handleChatModeChange = useCallback((active: boolean) => {
    setChatMode(active);
  }, []);

  if (!mounted) return null;

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: chatMode ? 'flex-end' : 'center',
        padding: '0 40px',
        transition: 'justify-content 0.4s ease',
      }}
    >
      <div
        style={{
          width: '65%',
          maxWidth: '1250px',
          margin: '0 auto',
          paddingTop: chatMode ? '80px' : '100px',
          paddingBottom: chatMode ? '32px' : '60px',
          display: 'flex',
          flexDirection: 'column',
          height: chatMode ? 'calc(100vh - 20px)' : 'auto',
          transition: 'all 0.4s ease',
        }}
      >
        <AnimatePresence>
          {!chatMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
              transition={{ duration: 0.4, ease }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1, margin: 0 }}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease }}
                  style={{ display: 'block', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 500, color: 'var(--text-primary)' }}
                >
                  {heroLine.top}
                </motion.span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 'clamp(48px, 8vw, 80px)',
                    fontWeight: 400,
                    color: 'var(--text-accent)',
                  }}
                >
                  {heroLine.bottom.split('').map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, y: 30, rotateX: -40 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + ci * 0.06,
                        ease,
                      }}
                      whileHover={{
                        y: -4,
                        color: 'var(--text-primary)',
                        transition: { duration: 0.15 },
                      }}
                      style={{
                        display: 'inline-block',
                        cursor: 'default',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {quote && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7, ease }}
                  style={{ marginTop: '28px' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      lineHeight: 1.7,
                      color: 'var(--text-muted)',
                      maxWidth: '560px',
                      margin: '0 auto',
                      letterSpacing: '0.01em',
                    }}
                  >
                    &ldquo;{quote.q}&rdquo;
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      opacity: 0.6,
                      marginTop: '8px',
                      letterSpacing: '0.03em',
                    }}
                  >
                    — {quote.a}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: chatMode ? 0 : 0.8, ease }}
          style={{
            flex: chatMode ? 1 : undefined,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <ChatInterface onChatModeChange={handleChatModeChange} />
        </motion.div>
      </div>
    </section>
  );
}
