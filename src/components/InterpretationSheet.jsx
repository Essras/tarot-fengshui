import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronUp, Star } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const ROMAN = ['O', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
const getRomanNumeral = (n) => ROMAN[n] ?? n;

const MODE_META = {
  mystical:      { color: '#9b59b6', label: { th: '☽ ไสยศาสตร์', en: '☽ Mystical' },      lens: { th: 'การทำนายตามตำราไพ่คลาสสิก', en: 'Classical tarot interpretation' } },
  psychological: { color: '#2ecc71', label: { th: '⊙ จิตวิทยา Jung', en: '⊙ Jungian' }, lens: { th: 'มองผ่านจิตใต้สำนึกและ Archetype', en: 'Through Jungian archetypes and subconscious' } },
  fengshui:      { color: '#e67e22', label: { th: '✦ ฮวงจุ้ย', en: '✦ Feng Shui' },         lens: { th: 'พลังงานสถานที่และการไหลของชี', en: 'Space energy and chi flow' } },
};

export const InterpretationSheet = ({ isOpen, onClose, cardData, readingMode = 'mystical', fontLevel, onSetFontLevel }) => {
  const { lang, t } = useTranslation();
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    if (cardData) {
      setIsExpanded(true); // auto-expand when new card selected
      setImgError(false);
    }
  }, [cardData]);

  if (!cardData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── BACKDROP: only when fully expanded ── */}
          {isExpanded && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 40,
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(6px)',
              }}
            />
          )}

          {/* ── BOTTOM SHEET ── */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: isExpanded ? '0%' : '88%' }}
            exit={{ y: '105%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 240 }}
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '92dvh',
              background: 'var(--sheet-bg)',
              borderTop: '1px solid var(--gold-muted)',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.9), 0 -1px 0 var(--border-color)',
            }}
          >
            {/* Gold accent line at top edge */}
            <div style={{
              position: 'absolute',
              top: 1,
              left: '20%',
              right: '20%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
              pointerEvents: 'none',
              opacity: 0.7,
            }} />

            {/* ── PEEK HANDLE: always visible ── */}
            <div
              onClick={() => setIsExpanded(v => !v)}
              style={{
                width: '100%',
                padding: '12px 20px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                flexShrink: 0,
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.57rem',
                  letterSpacing: '0.3em',
                  color: 'var(--gold-muted)',
                  textTransform: 'uppercase',
                }}>
                  {cardData.id === 0 ? '☽ O ☾' : `— ${getRomanNumeral(cardData.id)} —`}
                </span>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.9rem',
                  letterSpacing: '0.12em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                }}>
                  {cardData.name[lang]} {cardData.isReversed ? (lang === 'th' ? '(กลับหัว)' : '(REV)') : ''}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronUp size={16} style={{ color: 'var(--gold-muted)' }} />
                </motion.div>
                {isExpanded && (
                  <button
                    onClick={e => { e.stopPropagation(); onClose(); }}
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: '1px solid var(--border-color)',
                      background: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--gold-muted)',
                    }}
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* ── FULL CONTENT: only when expanded ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    padding: '0 1.5rem 2.5rem',
                  }}
                >
                  {/* Font Size Adjuster Inside Sheet */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 0.5rem', alignSelf: 'flex-end', marginTop: '-0.5rem' }}>
                    <button
                      onClick={() => onSetFontLevel?.(Math.max(1, fontLevel - 1))}
                      style={{
                        width: 28, height: 28, borderRadius: '8px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'var(--surface-1)', border: '1px solid var(--border-faint)',
                        color: fontLevel > 1 ? 'var(--text-primary)' : 'var(--text-muted)',
                        cursor: fontLevel > 1 ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'Lora, serif' }}>A-</span>
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 4px', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map(step => (
                        <div key={step} style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: step <= fontLevel ? 'var(--gold)' : 'var(--border-color)',
                          transition: 'all 0.2s'
                        }} />
                      ))}
                    </div>
                    <button
                      onClick={() => onSetFontLevel?.(Math.min(5, fontLevel + 1))}
                      style={{
                        width: 28, height: 28, borderRadius: '8px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'var(--surface-1)', border: '1px solid var(--border-faint)',
                        color: fontLevel < 5 ? 'var(--text-primary)' : 'var(--text-muted)',
                        cursor: fontLevel < 5 ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'Lora, serif' }}>A+</span>
                    </button>
                  </div>

                  {/* REVERSED WARNING */}
                  {cardData.isReversed && (
                    <div style={{
                      padding: '10px 14px',
                      background: 'var(--surface-1)',
                      borderLeft: '2px solid var(--gold-muted)',
                      marginBottom: '10px',
                      borderRadius: '0 6px 6px 0',
                    }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gold)', margin: 0, lineHeight: 1.5 }}>
                        {lang === 'th' 
                          ? '⚠️ ไพ่กลับหัว (Reversed): พลังงานและอิทธิพลของไพ่มักแสดงผลในเชิงตรงกันข้าม ล่าช้า ถูกปิดกั้น หรือเป็นปัญหาที่ซ่อนอยู่ภายในจิตใจ'
                          : '⚠️ Reversed Card: The core energy of the card is typically delayed, blocked, internalized, or manifesting in its shadow form.'}
                      </p>
                    </div>
                  )}

                  {/* Mode badge */}
                  {(() => {
                    const m = MODE_META[readingMode] || MODE_META.mystical;
                    return (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '3px 10px', borderRadius: '20px',
                        background: `${m.color}15`, border: `1px solid ${m.color}40`,
                      }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.57rem', letterSpacing: '0.2em', color: m.color, textTransform: 'uppercase' }}>
                          {m.label[lang]}
                        </span>
                        <span style={{ fontFamily: 'Lora, serif', fontSize: '0.57rem', color: 'var(--text-muted)', marginLeft: '2px' }}>
                          — {m.lens[lang]}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Header row: thumbnail + keywords */}
                  <div style={{
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--border-color)',
                  }}>
                    {/* Thumbnail */}
                    {!imgError ? (
                      <div style={{
                        flexShrink: 0, width: 64, height: 96,
                        borderRadius: 6, overflow: 'hidden',
                        border: '1px solid var(--gold-muted)',
                        boxShadow: '0 0 12px var(--border-color)',
                      }}>
                        <img
                          src={cardData.image}
                          alt={cardData.name[lang]}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9)' }}
                          onError={() => setImgError(true)}
                        />
                      </div>
                    ) : (
                      <div style={{
                        flexShrink: 0, width: 64, height: 96, borderRadius: 6,
                        border: '1px solid var(--border-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Star size={18} style={{ color: 'var(--gold-muted)' }} />
                      </div>
                    )}
                    {/* Keywords */}
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: 'Lora, serif', fontSize: '0.78rem',
                        letterSpacing: '0.15em', color: 'var(--gold-muted)',
                        textTransform: 'uppercase',
                      }}>
                        {cardData.keywords[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Quick reading */}
                  <div style={{
                    padding: '0.875rem 1rem',
                    background: 'linear-gradient(90deg, var(--surface-2), transparent)',
                    borderLeft: '2px solid var(--gold-muted)',
                  }}>
                    <p style={{
                      fontFamily: 'Lora, serif', fontSize: '1rem',
                      fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.7,
                    }}>
                      ✦ {(cardData.modes?.[readingMode]?.quick ?? cardData.quick)[lang]}
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-color))' }} />
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.57rem', letterSpacing: '0.35em', color: 'var(--gold-muted)', textTransform: 'uppercase' }}>
                      {t('deepDive')}
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--border-color), transparent)' }} />
                  </div>

                  {/* Deep interpretation */}
                  <p style={{
                    fontFamily: 'Lora, serif', fontSize: '1rem',
                    color: 'var(--text-secondary)', lineHeight: 1.8, paddingBottom: '2rem',
                  }}>
                    {(cardData.modes?.[readingMode]?.deep ?? cardData.deep)[lang]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grain-overlay rounded-t-[20px]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
