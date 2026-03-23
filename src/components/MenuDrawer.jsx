import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Monitor, Settings, Sparkles, Star, Check } from 'lucide-react';

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
  useOnlyMajor,
  onToggleMajor,
  useReversals,
  onToggleReversals,
  theme,
  onSetTheme,
  fontLevel,
  onSetFontLevel,
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
            width: 'min(300px, 88vw)',
            background: 'var(--drawer-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px var(--border-faint)',
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
                      ? 'var(--surface-2)'
                      : 'var(--surface-1)',
                    border: lang === l
                      ? '1px solid var(--gold-muted)'
                      : '1px solid var(--border-faint)',
                    color: lang === l ? 'var(--gold)' : 'var(--text-muted)',
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
                        : 'var(--surface-1)',
                      border: active
                        ? `1px solid ${mode.color}55`
                        : '1px solid var(--border-faint)',
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
                      color: active ? mode.color : 'var(--text-secondary)',
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

          <Divider />

          {/* ── Deck Settings ── */}
          <Section label={lang === 'th' ? '⊕ การตั้งค่าไพ่' : '⊕ Deck Settings'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={onToggleMajor}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                  background: useOnlyMajor ? 'var(--surface-2)' : 'var(--surface-1)',
                  border: useOnlyMajor ? '1px solid var(--gold-muted)' : '1px solid var(--border-faint)',
                }}
              >
                <span style={{ fontSize: '11px', color: useOnlyMajor ? 'var(--gold)' : 'var(--text-secondary)' }}>
                  {lang === 'th' ? 'ใช้เฉพาะ Major Arcana (22 ใบ)' : 'Major Arcana Only (22 Cards)'}
                </span>
                {useOnlyMajor && <Check size={12} style={{color: 'var(--gold)'}} />}
              </button>

              <button
                onClick={onToggleReversals}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                  background: useReversals ? 'var(--surface-2)' : 'var(--surface-1)',
                  border: useReversals ? '1px solid var(--gold-muted)' : '1px solid var(--border-faint)',
                }}
              >
                <span style={{ fontSize: '11px', color: useReversals ? 'var(--gold)' : 'var(--text-secondary)' }}>
                  {lang === 'th' ? 'ระบบไพ่ตั้งปกติ / กลับหัว' : 'Upright / Reversed'}
                </span>
                {useReversals && <Check size={12} style={{color: 'var(--gold)'}} />}
              </button>
            </div>
          </Section>

          <Divider />

          {/* ── Theme ── */}
          <Section label={lang === 'th' ? '⊕ ธีม' : '⊕ Theme'}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'light', icon: Sun, label: 'Light' },
                { id: 'dark', icon: Moon, label: 'Dark' },
                { id: 'system', icon: Monitor, label: 'System' }
              ].map(tOpts => (
                <button
                  key={tOpts.id}
                  onClick={() => { onSetTheme(tOpts.id); }}
                  style={{
                    flex: 1, padding: '8px 4px', borderRadius: '8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: theme === tOpts.id ? 'var(--surface-2)' : 'var(--surface-1)',
                    border: theme === tOpts.id ? '1px solid var(--gold-muted)' : '1px solid var(--border-faint)',
                    color: theme === tOpts.id ? 'var(--gold)' : 'var(--text-muted)',
                  }}
                >
                  <tOpts.icon size={14} />
                  <span style={{ fontSize: '9px', fontFamily: 'Cinzel, serif', textTransform: 'uppercase' }}>{tOpts.label}</span>
                </button>
              ))}
            </div>
          </Section>

          <Divider />

          {/* ── Text Size ── */}
          <Section label={lang === 'th' ? '⊕ ขนาดตัวอักษร' : '⊕ Text Size'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
              <button
                onClick={() => onSetFontLevel(Math.max(1, fontLevel - 1))}
                style={{
                  width: 32, height: 32, borderRadius: '8px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--surface-1)', border: '1px solid var(--border-faint)',
                  color: fontLevel > 1 ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: fontLevel > 1 ? 'pointer' : 'not-allowed',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 'bold', fontFamily: 'Lora, serif' }}>A-</span>
              </button>
              
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
                {[1, 2, 3, 4, 5].map(step => (
                  <div key={step} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: step <= fontLevel ? 'var(--gold)' : 'var(--surface-2)',
                    transition: 'all 0.2s'
                  }} />
                ))}
              </div>

              <button
                onClick={() => onSetFontLevel(Math.min(5, fontLevel + 1))}
                style={{
                  width: 32, height: 32, borderRadius: '8px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--surface-1)', border: '1px solid var(--border-faint)',
                  color: fontLevel < 5 ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: fontLevel < 5 ? 'pointer' : 'not-allowed',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Lora, serif' }}>A+</span>
              </button>
            </div>
          </Section>

          {/* Footer */}
          <div style={{
            padding: '8px 14px',
            textAlign: 'center',
            borderTop: '1px solid var(--border-faint)',
          }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '7px',
              letterSpacing: '0.25em',
              color: 'var(--text-muted)',
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
      color: 'var(--gold)',
      opacity: 0.6,
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
    background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)',
    opacity: 0.5,
  }} />
);
