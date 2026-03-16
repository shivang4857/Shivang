'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { personalData } from '@/lib/personal-data';
import SectionReveal from './SectionReveal';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const links = [
    { label: 'Email', href: `mailto:${personalData.contact.email}`, value: personalData.contact.email },
    { label: 'GitHub', href: personalData.contact.github, value: 'github.com/shivang' },
    { label: 'LinkedIn', href: personalData.contact.linkedin, value: 'linkedin.com/in/shivang' },
    { label: 'Twitter', href: personalData.contact.twitter, value: 'twitter.com/shivang' },
  ];

  return (
    <SectionReveal id="contact">
      <div ref={ref} style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 28px' }}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}
        >
          <div style={{ width: '36px', height: '1px', background: 'var(--accent-primary)', opacity: 0.4 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>
            Chapter 06 &mdash; Connect
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '16px' }}
        >
          Start a <span style={{ color: 'var(--text-accent)' }}>Conversation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '52px' }}
        >
          The best work begins with a good conversation.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label === 'Email' ? undefined : '_blank'}
              rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px 28px', borderRadius: '14px',
                border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)',
                textDecoration: 'none', transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 168, 83, 0.15)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' as const, display: 'block', marginBottom: '6px' }}>
                  {link.label}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)' }}>
                  {link.value}
                </span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '16px' }}>&nearr;</span>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
