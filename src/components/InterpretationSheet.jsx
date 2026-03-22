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

export const InterpretationSheet = ({ isOpen, onClose, cardData, readingMode = 'mystical' }) => {
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
              background: 'linear-gradient(180deg, #111 0%, #0A0A0A 100%)',
              borderTop: '1px solid rgba(212,175,55,0.45)',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.9), 0 -1px 0 rgba(212,175,55,0.3)',
            }}
          >
            {/* Gold accent line at top edge */}
            <div style={{
              position: 'absolute',
              top: 1,
              left: '20%',
              right: '20%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)',
              pointerEvents: 'none',
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
                  fontSize: '8px',
                  letterSpacing: '0.3em',
                  color: 'rgba(212,175,55,0.4)',
                  textTransform: 'uppercase',
                }}>
                  {cardData.id === 0 ? '☽ O ☾' : `— ${getRomanNumeral(cardData.id)} —`}
                </span>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  color: 'rgba(212,175,55,0.9)',
                  textTransform: 'uppercase',
                }}>
                  {cardData.name[lang]} {cardData.isReversed ? (lang === 'th' ? '(กลับหัว)' : '(REV)') : ''}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronUp size={16} style={{ color: 'rgba(212,175,55,0.5)' }} />
                </motion.div>
                {isExpanded && (
                  <button
                    onClick={e => { e.stopPropagation(); onClose(); }}
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: '1px solid rgba(212,175,55,0.25)',
                      background: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(212,175,55,0.5)',
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
                  {/* REVERSED WARNING */}
                  {cardData.isReversed && (
                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(212,175,55,0.05)',
                      borderLeft: '2px solid rgba(212,175,55,0.5)',
                      marginBottom: '10px',
                      borderRadius: '0 6px 6px 0',
                    }}>
                      <p style={{ fontSize: '13px', color: 'rgba(212,175,55,0.95)', margin: 0, lineHeight: 1.5 }}>
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
                        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.2em', color: m.color, textTransform: 'uppercase' }}>
                          {m.label[lang]}
                        </span>
                        <span style={{ fontFamily: 'Lora, serif', fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginLeft: '2px' }}>
                          — {m.lens[lang]}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Header row: thumbnail + keywords */}
                  <div style={{
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid rgba(212,175,55,0.1)',
                  }}>
                    {/* Thumbnail */}
                    {!imgError ? (
                      <div style={{
                        flexShrink: 0, width: 64, height: 96,
                        borderRadius: 6, overflow: 'hidden',
                        border: '1px solid rgba(212,175,55,0.5)',
                        boxShadow: '0 0 12px rgba(212,175,55,0.2)',
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
                        border: '1px solid rgba(212,175,55,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Star size={18} style={{ color: 'rgba(212,175,55,0.4)' }} />
                      </div>
                    )}
                    {/* Keywords */}
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: 'Lora, serif', fontSize: '11px',
                        letterSpacing: '0.15em', color: 'rgba(212,175,55,0.55)',
                        textTransform: 'uppercase',
                      }}>
                        {cardData.keywords[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Quick reading */}
                  <div style={{
                    padding: '0.875rem 1rem',
                    background: 'linear-gradient(90deg, rgba(212,175,55,0.07), transparent)',
                    borderLeft: '2px solid rgba(212,175,55,0.5)',
                  }}>
                    <p style={{
                      fontFamily: 'Lora, serif', fontSize: '14px',
                      fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7,
                    }}>
                      ✦ {(cardData.modes?.[readingMode]?.quick ?? cardData.quick)[lang]}
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(212,175,55,0.4)', textTransform: 'uppercase' }}>
                      {t('deepDive')}
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
                  </div>

                  {/* Deep interpretation */}
                  <p style={{
                    fontFamily: 'Lora, serif', fontSize: '14px',
                    color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, paddingBottom: '2rem',
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
