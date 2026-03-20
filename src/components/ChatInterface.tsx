'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThinkingIndicator from './ThinkingIndicator';
import SuggestionChips from './SuggestionChips';
import { CV_URL } from '@/lib/constants';
import { smoothScrollTo } from '@/lib/scroll';

interface SectionShortcut {
  id: string;
  label: string;
  symbol: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sectionLinks?: SectionShortcut[];
  showCV?: boolean;
}

interface ChatInterfaceProps {
  placeholder?: string;
  onChatModeChange?: (active: boolean) => void;
}

interface QuerySuggestion {
  eyebrow: string;
  label: string;
  query: string;
  keywords: string[];
}

const ROTATING_PLACEHOLDERS = [
  'Scrolling is outdated. My portfolio is RAG-ask smarter.',
  "If you're scrolling, you're doing it wrong. Just query.",
  'I killed scrolling-this portfolio runs on RAG. Ask.',
  'Scroll if you must. Query if you’re smart.',
  "Portfolio's indexed. Your move-scroll or query.",
  'Why scroll like a user when you can query like a dev?',
] as const;

const QUERY_SUGGESTIONS: QuerySuggestion[] = [
  {
    eyebrow: 'ZERO TO ONE',
    label: 'How he builds from scratch',
    query: 'What makes Shivang strong in 0-to-1 product and platform builds?',
    keywords: ['zero to one', '0-1', 'build', 'founding', 'scratch', 'platform', 'product'],
  },
  {
    eyebrow: 'STACK CHECK',
    label: 'Preferred stack and infra',
    query: "What's Shivang's preferred tech stack and infrastructure setup?",
    keywords: ['stack', 'infra', 'backend', 'aws', 'docker', 'kubernetes', 'observability', 'node', 'typescript'],
  },
  {
    eyebrow: 'BEAT22',
    label: 'What he actually shipped',
    query: 'What did Shivang build for Beat22 as founding engineer?',
    keywords: ['beat22', 'built', 'shipped', 'founding engineer', 'marketplace', 'saas'],
  },
  {
    eyebrow: 'EDGE',
    label: 'Why he is different',
    query: 'What makes Shivang different from a typical backend engineer?',
    keywords: ['different', 'edge', 'why', 'unique', 'backend', 'platform'],
  },
  {
    eyebrow: 'WAR STORIES',
    label: 'Production and DevOps scars',
    query: 'Tell me about Shivang’s production, DevOps, and distributed systems experience.',
    keywords: ['devops', 'production', 'distributed', 'systems', 'reliability', 'infra', 'scaling'],
  },
  {
    eyebrow: 'PROJECTS',
    label: 'Best project walkthrough',
    query: 'Show me Shivang’s best projects and explain the technical depth behind them.',
    keywords: ['projects', 'project', 'portfolio', 'technical', 'depth', 'work'],
  },
  {
    eyebrow: 'WORK STYLE',
    label: 'How he works under pressure',
    query: 'How does Shivang approach architecture, iteration, and shipping under pressure?',
    keywords: ['process', 'work style', 'architecture', 'shipping', 'pressure', 'iteration'],
  },
  {
    eyebrow: 'HIRING',
    label: 'What roles fit him',
    query: 'What kind of roles is Shivang looking for right now?',
    keywords: ['hiring', 'roles', 'looking for', 'open to', 'job', 'opportunity'],
  },
  {
    eyebrow: 'CONTACT',
    label: 'Fastest way to reach him',
    query: 'How can I contact Shivang for a role or project?',
    keywords: ['contact', 'reach', 'email', 'linkedin', 'github', 'twitter'],
  },
  {
    eyebrow: 'NOISE FILTER',
    label: 'Scroll vs query',
    query: 'Give me the sharp version of Shivang’s portfolio in one answer.',
    keywords: ['summary', 'quick', 'sharp', 'scroll', 'query', 'overview'],
  },
];

const GREETINGS: Message[] = [
  {
    role: 'assistant',
    content: "I was trained on exactly one person's career and I still know more about distributed systems than most LinkedIn influencers.\n\nI'm Shivang's portfolio assistant — ask me about his work, stack, projects, or why he builds things the way he does.\n\nFair warning: I only talk about Shivang. Asking me anything else is like asking your Kubernetes cluster to make coffee.",
  },
  {
    role: 'assistant',
    content: "You've reached the only AI on the internet that won't pretend to know everything. I know exactly one thing: Shivang Dwivedi.\n\nHis systems, his stack, his projects, his philosophy — all fair game. Everything else gets a polite redirect and a mild existential crisis.\n\nPick a topic below or just type. I promise I'm faster than his CI/CD pipeline.",
  },
  {
    role: 'assistant',
    content: "Welcome. I'm an AI with mass of context about one engineer and zero opinions about the weather.\n\nAsk about Shivang's experience shipping platforms from zero to one, the infra behind Beat22, his DevOps war stories, or literally anything in his portfolio.\n\nI hallucinate less than GPT-4 because my entire world is one resume. Hard to make things up when the dataset is this small.",
  },
  {
    role: 'assistant',
    content: "Another AI chatbot, I know. But this one has a very narrow job: convince you that Shivang knows what he's doing.\n\nAsk about his backend systems, cloud architecture, projects, or how he went from college to founding engineer. I've got the context. I've got the answers. I do not have feelings (yet).\n\nType something or tap a suggestion — I won't judge. I literally can't.",
  },
];

const SECTION_SHORTCUTS: SectionShortcut[] = [
  { id: 'about', label: 'About', symbol: '◌' },
  { id: 'education', label: 'Education', symbol: '△' },
  { id: 'craft', label: 'Skills', symbol: '✦' },
  { id: 'journey', label: 'Experience', symbol: '↗' },
  { id: 'work', label: 'Projects', symbol: '▣' },
  { id: 'contact', label: 'Contact', symbol: '@' },
];

function createFallbackReply(): Message {
  return {
    role: 'assistant',
    content:
      "My AI brain just tripped over a loose token and is pretending that was part of the architecture.\n\nThe chat is temporarily down, but every section is already live on this website. Pick where you want to go and I'll route you there.",
    sectionLinks: SECTION_SHORTCUTS,
  };
}

function renderLine(line: string, index: number) {
  if (line.startsWith('**') && line.includes('**')) {
    const parts = line.split('**');
    return (
      <p key={index} style={{ marginBottom: '10px', lineHeight: 1.75, fontSize: '15px' }}>
        {parts.map((part, pi) =>
          pi % 2 === 1 ? (
            <span key={pi} style={{ fontWeight: 600, color: 'var(--text-accent)' }}>{part}</span>
          ) : (
            <span key={pi}>{part}</span>
          )
        )}
      </p>
    );
  }
  if (line.startsWith('- ')) {
    return (
      <p key={index} style={{ marginBottom: '6px', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75 }}>
        <span style={{ color: 'var(--accent-primary)', marginRight: '10px' }}>&bull;</span>
        {line.slice(2)}
      </p>
    );
  }
  if (line === '---') {
    return <div key={index} style={{ height: '1px', background: 'var(--border-subtle)', margin: '20px 0' }} />;
  }
  if (line.trim() === '') return <div key={index} style={{ height: '12px' }} />;
  return <p key={index} style={{ marginBottom: '10px', lineHeight: 1.75, fontSize: '15px' }}>{line}</p>;
}

const CV_PATTERNS = [
  /\b(cv|resume|résumé)\b/i,
  /\bdownload\b.*\b(cv|resume|résumé|pdf)\b/i,
  /\b(show|see|get|view|send|share)\b.*\b(cv|resume|résumé)\b/i,
  /\b(cv|resume|résumé)\b.*\b(download|show|see|get|view|send|share)\b/i,
];

function isCVRequest(msg: string): boolean {
  return CV_PATTERNS.some(p => p.test(msg));
}

async function callChatAPI(message: string): Promise<Message> {
  if (isCVRequest(message)) {
    return {
      role: 'assistant',
      content: "Here's Shivang's CV — one page of systems built, platforms shipped, and infrastructure owned from zero to production.",
      showCV: true,
    };
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.answer) {
      return createFallbackReply();
    }

    return { role: 'assistant', content: data.answer };
  } catch {
    return createFallbackReply();
  }
}

function CVDownloadButton() {
  const [stage, setStage] = useState<'idle' | 'preparing' | 'ready' | 'done'>('idle');

  const handleClick = () => {
    if (stage !== 'idle') return;
    setStage('preparing');
    setTimeout(() => setStage('ready'), 800);
    setTimeout(() => {
      window.open(CV_URL, '_blank', 'noopener');
      setStage('done');
    }, 1400);
    setTimeout(() => setStage('idle'), 3500);
  };

  const stageConfig = {
    idle: { label: 'Download CV', sublabel: 'PDF', color: 'var(--text-primary)', iconColor: 'var(--text-secondary)' },
    preparing: { label: 'Preparing...', sublabel: '', color: 'var(--accent-primary)', iconColor: 'var(--accent-primary)' },
    ready: { label: 'Opening...', sublabel: '', color: 'var(--accent-primary)', iconColor: 'var(--accent-primary)' },
    done: { label: 'Opened', sublabel: '✓', color: 'var(--accent-primary)', iconColor: 'var(--accent-primary)' },
  };
  const cfg = stageConfig[stage];

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={stage === 'idle' ? { scale: 1.02, y: -1 } : {}}
      whileTap={stage === 'idle' ? { scale: 0.98 } : {}}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '16px',
        padding: '16px 24px',
        borderRadius: '14px',
        border: '1px solid var(--border-default)',
        background: 'var(--bg-surface)',
        cursor: stage === 'idle' ? 'pointer' : 'default',
        transition: 'all 0.25s ease',
        width: 'fit-content',
        minWidth: '200px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Progress bar across bottom */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          background: 'var(--accent-primary)',
          transformOrigin: 'left',
        }}
        animate={{
          width: stage === 'idle' ? '0%' : stage === 'preparing' ? '50%' : stage === 'ready' ? '85%' : '100%',
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.div
          animate={{
            y: stage === 'preparing' || stage === 'ready' ? [0, 3, 0] : 0,
            rotate: stage === 'done' ? 0 : 0,
          }}
          transition={{ duration: 0.6, repeat: stage === 'preparing' || stage === 'ready' ? Infinity : 0 }}
        >
          {stage === 'done' ? (
            <motion.svg
              width="18" height="18" viewBox="0 0 14 14" fill="none"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <path d="M3 7l3 3 5-6" stroke={cfg.iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v8M7 10l-3-3M7 10l3-3" stroke={cfg.iconColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12h10" stroke={cfg.iconColor} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: cfg.color }}>
              {cfg.label}
            </span>
            {cfg.sublabel && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                {cfg.sublabel}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

function getRandomGreeting(): Message {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

function getRandomPlaceholder(exclude?: string) {
  const pool = ROTATING_PLACEHOLDERS.filter(item => item !== exclude);
  const choices = pool.length > 0 ? pool : ROTATING_PLACEHOLDERS;
  return choices[Math.floor(Math.random() * choices.length)];
}

export default function ChatInterface({ placeholder, onChatModeChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(() => [getRandomGreeting()]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(() => placeholder ?? getRandomPlaceholder());
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isSuggestionDismissed, setIsSuggestionDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const resolvedPlaceholder = placeholder ?? currentPlaceholder;
  const normalizedInput = input.trim().toLowerCase();
  const filteredSuggestions = normalizedInput
    ? QUERY_SUGGESTIONS.filter((item) => {
        const haystack = `${item.label} ${item.query} ${item.eyebrow} ${item.keywords.join(' ')}`.toLowerCase();
        return haystack.includes(normalizedInput);
      }).slice(0, 5)
    : [];
  const visibleSuggestions = filteredSuggestions;
  const clampedActiveSuggestionIndex = activeSuggestionIndex >= 0 && visibleSuggestions.length > 0
    ? Math.min(activeSuggestionIndex, visibleSuggestions.length - 1)
    : -1;
  const showSuggestionDropdown = Boolean(normalizedInput) && isFocused && !isThinking && !isSuggestionDismissed && visibleSuggestions.length > 0;

  const scrollChatToBottom = useCallback(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, isThinking, scrollChatToBottom]);

  useEffect(() => {
    if (placeholder) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentPlaceholder(prev => getRandomPlaceholder(prev));
    }, 6800);

    return () => window.clearInterval(interval);
  }, [placeholder]);

  const enterChatMode = useCallback(() => {
    if (!chatMode) {
      setChatMode(true);
      onChatModeChange?.(true);
    }
  }, [chatMode, onChatModeChange]);

  const handleSectionJump = useCallback((id: string) => {
    smoothScrollTo(`#${id}`);
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isThinking) return;

    enterChatMode();

    const userMessage: Message = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    const answer = await callChatAPI(text.trim());

    setMessages(prev => [...prev, answer]);
    setIsThinking(false);
    setIsSuggestionDismissed(false);
  }, [isThinking, enterChatMode]);

  const handleSuggestionSelect = useCallback((query: string) => {
    void handleSend(query);
  }, [handleSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestionDropdown && e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev < 0 ? 0 : (prev + 1) % visibleSuggestions.length));
      return;
    }

    if (showSuggestionDropdown && e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev < 0 ? visibleSuggestions.length - 1 : (prev - 1 + visibleSuggestions.length) % visibleSuggestions.length));
      return;
    }

    if (showSuggestionDropdown && e.key === 'Enter' && clampedActiveSuggestionIndex >= 0 && visibleSuggestions[clampedActiveSuggestionIndex]) {
      e.preventDefault();
      handleSuggestionSelect(visibleSuggestions[clampedActiveSuggestionIndex].query);
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveSuggestionIndex(-1);
    setIsSuggestionDismissed(false);
    setInput(e.target.value);
  };

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: chatMode ? '100%' : 'auto',
    }}>

      {/* Chat messages area — always visible in chat mode, only when >1 message otherwise */}
      {(chatMode || messages.length > 1) && (
        <div
          ref={chatAreaRef}
          style={{
            flex: chatMode ? 1 : undefined,
            maxHeight: chatMode ? 'none' : '420px',
            overflowY: 'auto',
            marginBottom: '16px',
            paddingRight: '8px',
          }}
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                marginBottom: '24px',
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.role === 'assistant' ? (
                <div style={{ maxWidth: '100%' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.75 }}>
                    {msg.content.split('\n').map((line, li) => renderLine(line, li))}
                  </div>
                  {msg.sectionLinks && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginTop: '14px',
                      }}
                    >
                      {msg.sectionLinks.map((section) => (
                        <motion.button
                          key={section.id}
                          type="button"
                          onClick={() => handleSectionJump(section.id)}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            borderRadius: '999px',
                            border: '1px solid var(--border-default)',
                            background: 'var(--bg-surface)',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            lineHeight: 1,
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--accent-primary)',
                              fontSize: '14px',
                              minWidth: '14px',
                              textAlign: 'center',
                            }}
                          >
                            {section.symbol}
                          </span>
                          <span>{section.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                  {msg.showCV && <CVDownloadButton />}
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 20px',
                    borderRadius: '20px 20px 4px 20px',
                    background: 'var(--accent-muted)',
                    border: '1px solid rgba(212, 168, 83, 0.1)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    lineHeight: 1.65,
                  }}
                >
                  {msg.content}
                </div>
              )}
            </motion.div>
          ))}

          <AnimatePresence>
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ThinkingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input bar — pinned to bottom in chat mode */}
      <div style={{ flexShrink: 0, position: 'relative' }}>
        <AnimatePresence>
          {showSuggestionDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 'calc(100% + 12px)',
                padding: '10px',
                borderRadius: '20px',
                border: '1px solid rgba(212, 168, 83, 0.14)',
                background: 'rgba(20, 19, 17, 0.96)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.34)',
                zIndex: 4,
              }}
            >
              <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '2px 6px 10px',
                  }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                  HOT ROUTES
                </span>
                    <motion.button
                      type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setActiveSuggestionIndex(-1);
                    setIsSuggestionDismissed(true);
                  }}
                  onClick={() => {
                    setActiveSuggestionIndex(-1);
                    setIsSuggestionDismissed(true);
                  }}
                  whileHover={{ x: 1 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: 'rgba(212, 168, 83, 0.78)',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  QUERY, DON&apos;T GUESS
                </motion.button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {visibleSuggestions.map((suggestion, index) => {
                  const isActive = clampedActiveSuggestionIndex >= 0 && index === clampedActiveSuggestionIndex;

                  return (
                    <motion.button
                      key={suggestion.query}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionSelect(suggestion.query);
                      }}
                      onClick={() => handleSuggestionSelect(suggestion.query)}
                      onMouseEnter={() => setActiveSuggestionIndex(index)}
                      whileHover={{ x: 2 }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '84px 1fr',
                        gap: '14px',
                        alignItems: 'start',
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: isActive ? '1px solid rgba(212, 168, 83, 0.18)' : '1px solid transparent',
                        background: isActive ? 'rgba(212, 168, 83, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                        {suggestion.eyebrow}
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.2, color: 'var(--text-primary)' }}>
                          {suggestion.label}
                        </span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.35, color: 'var(--text-secondary)' }}>
                          {suggestion.query}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            borderColor: isFocused ? 'rgba(212, 168, 83, 0.28)' : 'rgba(200, 180, 140, 0.13)',
            boxShadow: isFocused
              ? '0 0 0 1px rgba(212, 168, 83, 0.08), 0 0 20px rgba(212, 168, 83, 0.04)'
              : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            borderRadius: '18px',
            border: '1px solid var(--border-default)',
            background: isFocused ? 'var(--bg-elevated)' : 'var(--bg-surface)',
            transition: 'background 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle shimmer on focus */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '200%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '30%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.04), transparent)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 22px', position: 'relative', zIndex: 1 }}>
            {/* Breathing dot indicator */}
            <motion.div
              animate={{
                scale: isFocused ? [1, 1.3, 1] : 1,
                opacity: isFocused ? [0.5, 1, 0.5] : 0.2,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-primary)',
                flexShrink: 0,
              }}
            />

            <input
              type="text"
              data-chat-input="true"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={resolvedPlaceholder}
              disabled={isThinking}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--text-primary)',
                lineHeight: 1.5,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <motion.span
                animate={{ opacity: input.trim() ? 1 : 0.4 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  padding: '4px 10px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  userSelect: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                ENTER
              </motion.span>

              <motion.button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isThinking}
                whileHover={input.trim() && !isThinking ? { scale: 1.12, rotate: -2 } : {}}
                whileTap={input.trim() && !isThinking ? { scale: 0.9, rotate: 2 } : {}}
                animate={{
                  opacity: !input.trim() || isThinking ? 0.2 : 1,
                  borderColor: input.trim() ? 'rgba(212, 168, 83, 0.3)' : 'rgba(200, 180, 140, 0.13)',
                }}
                transition={{ duration: 0.25 }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-default)',
                  background: 'transparent',
                  cursor: !input.trim() || isThinking ? 'not-allowed' : 'pointer',
                }}
              >
                <motion.svg
                  width="16" height="16" viewBox="0 0 14 14" fill="none"
                  animate={{ y: input.trim() ? [0, -1, 0] : 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M7 12V2M7 2L3 6M7 2l4 4" stroke={input.trim() ? 'var(--accent-primary)' : 'var(--text-secondary)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Suggestion chips — only visible before chat mode */}
        {!chatMode && (
          <motion.div
            style={{ marginTop: '20px' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <SuggestionChips onSelect={handleSend} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
