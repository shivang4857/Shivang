'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { CV_URL } from '@/lib/constants';
import { smoothScrollTo } from '@/lib/scroll';

interface HeaderProps {
  onAskClick: () => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about', symbol: '◌' },
  { label: 'Education', href: '#education', symbol: '△' },
  { label: 'Skills', href: '#craft', symbol: '✦' },
  { label: 'Experience', href: '#journey', symbol: '↗' },
  { label: 'Projects', href: '#work', symbol: '▣' },
  { label: 'Contact', href: '#contact', symbol: '@' },
];

export default function Header({ onAskClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleDownloadCV = useCallback(() => {
    setDownloading(true);
    setTimeout(() => {
      window.open(CV_URL, '_blank', 'noopener');
      setTimeout(() => setDownloading(false), 1200);
    }, 600);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(17, 17, 16, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            smoothScrollTo(0, 0);
            setTimeout(() => window.location.reload(), 400);
          }}
          role="button"
          tabIndex={0}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--text-accent)' }}>S</span>
          </div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
            Shivang
          </span>
        </motion.div>

        {/* Desktop navigation */}
        <nav
          className="header-nav-desktop"
          style={{ display: 'flex', alignItems: 'center', gap: '28px' }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(item.href);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <span style={{ color: 'var(--accent-primary)', fontSize: '12px', opacity: 0.7 }}>{item.symbol}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions + mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* CV Download Button */}
          <motion.button
            onClick={handleDownloadCV}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              border: '1px solid var(--border-default)',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.25s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              {downloading ? (
                <motion.div
                  key="downloading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <motion.svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <path d="M7 2v8M7 10l-3-3M7 10l3-3" stroke="var(--accent-primary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12h10" stroke="var(--accent-primary)" strokeWidth="1.3" strokeLinecap="round" />
                  </motion.svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--accent-primary)' }}>
                    Opening...
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v8M7 10l-3-3M7 10l3-3" stroke="var(--text-secondary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12h10" stroke="var(--text-secondary)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                    CV
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Ask me Button */}
          <motion.button
            onClick={onAskClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid var(--border-default)',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'border-color 0.25s',
            }}
          >
            <div className="animate-breathe" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
              Ask me
            </span>
          </motion.button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="header-nav-mobile-toggle"
            onClick={() => setMobileOpen(prev => !prev)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid var(--border-default)',
              background: 'transparent',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: '14px',
                    height: '1px',
                    background: 'var(--text-secondary)',
                    transition: 'opacity 0.2s',
                    opacity: mobileOpen ? (i === 1 ? 0 : 1) : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="header-nav-mobile"
            style={{
              display: 'none',
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              padding: '16px 24px 24px',
              background: 'rgba(17,17,16,0.98)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    smoothScrollTo(item.href);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 4px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {item.label}
                  </span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '14px' }}>{item.symbol}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onAskClick();
                }}
                style={{
                  marginTop: '8px',
                  alignSelf: 'flex-start',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-default)',
                  background: 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                Start a conversation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
