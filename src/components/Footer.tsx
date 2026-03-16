'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer ref={ref} style={{ borderTop: '1px solid var(--border-subtle)', padding: '80px 28px 60px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-default)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '36px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--text-accent)' }}>S</span>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: '1px', background: 'rgba(212, 168, 83, 0.25)', marginBottom: '36px' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text-primary)', marginBottom: '44px' }}
          >
            &ldquo;Every conversation is a small act of creation.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Crafted with care by <span style={{ color: 'var(--text-accent)' }}>Shivang</span>
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7, opacity: 0.7 }}>
              Inspired by the quiet elegance of machines that listen &mdash;
              reimagined as a personal space where stories unfold through dialogue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '44px' }}
          >
            {[
              { label: 'GitHub', href: 'https://github.com/shivang4857' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shivang4857/' },
              { label: 'Twitter', href: 'https://x.com/shivang_4857' },
              { label: 'Email', href: 'mailto:shivang4857@gmail.com' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                  color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--text-accent)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-muted)'; }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '44px' }}
          >
            <div className="animate-breathe" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.4 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' as const, opacity: 0.4 }}>
              Always listening
            </span>
            <div className="animate-breathe" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.4 }} />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
