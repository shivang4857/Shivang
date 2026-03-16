'use client';

import { motion } from 'framer-motion';

const suggestions = [
  { label: 'About me', query: 'Tell me about yourself' },
  { label: 'Skills', query: 'What are your technical skills?' },
  { label: 'Experience', query: 'Tell me about your experience' },
  { label: 'Projects', query: 'Show me your projects' },
  { label: 'Education', query: 'What is your educational background?' },
  { label: 'Process', query: 'How do you work?' },
  { label: 'Philosophy', query: 'What do you believe about technology?' },
  { label: 'Contact', query: 'How can I reach you?' },
];

interface SuggestionChipsProps {
  onSelect: (query: string) => void;
}

export default function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
      {suggestions.map((chip, i) => (
        <motion.button
          key={chip.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.04, duration: 0.35 }}
          onClick={() => onSelect(chip.query)}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '999px',
            border: '1px solid var(--border-default)',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 400,
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'rgba(212, 168, 83, 0.25)';
            el.style.color = 'var(--text-primary)';
            el.style.background = 'var(--accent-muted)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--border-default)';
            el.style.color = 'var(--text-secondary)';
            el.style.background = 'transparent';
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.35 }} />
          {chip.label}
        </motion.button>
      ))}
    </div>
  );
}
