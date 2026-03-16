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
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px', marginTop: '44px' }}
          >
            {[
              { label: 'GitHub', href: 'https://github.com/shivang4857', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>) },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shivang4857/', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>) },
              { label: 'Twitter', href: 'https://x.com/shivang_4857', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>) },
              { label: 'Email', href: 'mailto:shivang4857@gmail.com', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>) },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={item.label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-accent)', opacity: 0.9, textDecoration: 'none',
                  transition: 'opacity 0.25s, transform 0.2s',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.opacity = '1'; el.style.transform = 'scale(1.1)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.opacity = '0.9'; el.style.transform = 'scale(1)'; }}
              >
                {item.icon}
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
