import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Globe, Settings, Sparkles, Star, Check } from 'lucide-react';

const MODES = [
  {
    id: 'mystical',
    icon: Moon,
    label: { th: 'ไสยศาสตร์', en: 'Mystical' },
    color: '#9b59b6',
  },
  {
    id: 'psychological',
    icon: Star,
    label: { th: 'จิตวิทยา Jung', en: 'Jungian' },
    color: '#2ecc71',
  },
  {
    id: 'fengshui',
    icon: Sun,
    label: { th: 'ฮวงจุ้ย', en: 'Feng Shui' },
    color: '#e67e22',
  },
];

export const MenuDrawer = ({
  isOpen,
  onClose,
  lang,
  onToggleLang,
  readingMode,
  onSetMode,
}) => {
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    // small delay to avoid immediate close from the button click that opened it
    const t = setTimeout(() => document.addEventListener('mousedown', handleClick), 100);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          key="dropdown"
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.2 }}
          style={{
            position: 'fixed',
            top: '56px',
            right: '1rem',
            zIndex: 100,
            width: 'min(280px, 88vw)',
            background: 'linear-gradient(160deg, #0f0a18 0%, #0a0a0a 100%)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: '14px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.05)',
            overflow: 'hidden',
          }}
        >
          {/* Gold top accent */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
          }} />

          {/* ── Language ── */}
          <Section label={lang === 'th' ? '⊕ ภาษา' : '⊕ Language'}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['th', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => { if (lang !== l) { onToggleLang(); onClose(); } }}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: '8px',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    transition: 'all 0.2s',
                    background: lang === l
                      ? 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.06))'
                      : 'rgba(255,255,255,0.03)',
                    border: lang === l
                      ? '1px solid rgba(212,175,55,0.55)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: lang === l ? 'rgb(212,175,55)' : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {l === 'th' ? '🇹🇭 ไทย' : '🇺🇸 EN'}
                </button>
              ))}
            </div>
          </Section>

          <Divider />

          {/* ── Reading Mode ── */}
          <Section label={lang === 'th' ? '⊕ รูปแบบทำนาย' : '⊕ Reading Mode'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {MODES.map(mode => {
                const Icon = mode.icon;
                const active = readingMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => { onSetMode(mode.id); onClose(); }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: active
                        ? `linear-gradient(135deg, ${mode.color}18, ${mode.color}08)`
                        : 'rgba(255,255,255,0.02)',
                      border: active
                        ? `1px solid ${mode.color}55`
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${mode.color}22`,
                      border: `1px solid ${mode.color}55`,
                    }}>
                      <Icon size={12} style={{ color: mode.color }} />
                    </div>
                    <span style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      flex: 1,
                      textAlign: 'left',
                      color: active ? mode.color : 'rgba(255,255,255,0.55)',
                    }}>
                      {mode.label[lang]}
                    </span>
                    {active && (
                      <Check size={11} style={{ color: mode.color, flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Footer */}
          <div style={{
            padding: '8px 14px',
            textAlign: 'center',
            borderTop: '1px solid rgba(212,175,55,0.06)',
          }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '7px',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.12)',
              textTransform: 'uppercase',
            }}>
              Ancient Oracle v1.0
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Section = ({ label, children }) => (
  <div style={{ padding: '10px 12px 8px' }}>
    <div style={{
      fontFamily: 'Cinzel, serif',
      fontSize: '8px',
      letterSpacing: '0.3em',
      color: 'rgba(212,175,55,0.4)',
      textTransform: 'uppercase',
      marginBottom: '8px',
    }}>
      {label}
    </div>
    {children}
  </div>
);

const Divider = () => (
  <div style={{
    height: '1px',
    margin: '0 12px',
    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)',
  }} />
);
