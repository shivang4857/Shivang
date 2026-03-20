'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalSignal {
  label: string;
  value: string;
}

interface ProjectTerminalProps {
  title: string;
  eyebrow: string;
  summary: string;
  commands: string[];
  outputs: Record<number, string[]>;
  signals: TerminalSignal[];
  footer: string;
  marginTop?: number;
}

interface TerminalLine {
  content: string;
  isCommand: boolean;
}

export default function ProjectTerminal({
  title,
  eyebrow,
  summary,
  commands,
  outputs,
  signals,
  footer,
  marginTop = 0,
}: ProjectTerminalProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);

  useEffect(() => {
    const lines: TerminalLine[] = [];
    commands.forEach((command, index) => {
      lines.push({ content: command, isCommand: true });
      for (const output of outputs[index] ?? []) {
        lines.push({ content: output, isCommand: false });
      }
    });

    const timers = lines.map((line, index) => window.setTimeout(() => {
      setVisibleLines((prev) => [...prev, line]);
    }, 140 + index * 110));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [commands, outputs, title]);

  return (
    <div
      style={{
        marginTop,
        borderRadius: '22px',
        border: '1px solid rgba(212, 168, 83, 0.12)',
        background: 'rgba(17, 17, 16, 0.66)',
        overflow: 'hidden',
        boxShadow: '0 18px 44px rgba(0, 0, 0, 0.16)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(200, 180, 140, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(224, 116, 91, 0.9)' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(213, 170, 84, 0.9)' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(107, 168, 117, 0.9)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
            EXECUTION RAIL / {title.toUpperCase()}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              color: 'var(--accent-primary)',
              padding: '4px 6px',
              borderRadius: '999px',
              border: '1px solid rgba(212, 168, 83, 0.14)',
              background: 'rgba(212, 168, 83, 0.06)',
            }}
          >
            LIVE
          </span>
        </div>
      </div>

      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--accent-primary)', marginBottom: '8px' }}>
            {eyebrow}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {summary}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${signals.length}, minmax(0, 1fr))`,
            gap: '8px',
            marginBottom: '14px',
          }}
        >
          {signals.map((signal) => (
            <div
              key={signal.label}
              style={{
                padding: '10px 10px 9px',
                borderRadius: '14px',
                border: '1px solid rgba(212, 168, 83, 0.09)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '5px' }}>
                {signal.label}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                {signal.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderRadius: '16px',
            border: '1px solid rgba(212, 168, 83, 0.08)',
            background: 'rgba(10, 10, 10, 0.26)',
            padding: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
              SESSION
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-primary)' }}>
              steady-state
            </span>
          </div>

          <div style={{ minHeight: '148px' }}>
            <AnimatePresence mode="popLayout">
              {visibleLines.map((line, index) => {
                return (
                  <motion.div
                    key={`${line.content}-${index}`}
                    initial={{ opacity: 0, x: line.isCommand ? -18 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      lineHeight: 1.75,
                      color: line.isCommand ? 'var(--text-primary)' : 'var(--text-secondary)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {line.isCommand ? (
                      <>
                        <span style={{ color: 'var(--accent-primary)' }}>$ </span>
                        {line.content}
                      </>
                    ) : (
                      line.content
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div style={{ marginTop: '12px', fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)' }}>
          {footer}
        </div>
      </div>
    </div>
  );
}
