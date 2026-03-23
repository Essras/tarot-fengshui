import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Info } from 'lucide-react';
import { SPREADS } from '../data/spreads';

export const SpreadSelectionDrawer = ({ isOpen, onClose, onSelectSpread, lang }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--bg-gradient)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'color-mix(in srgb, var(--surface-1) 85%, transparent)',
            backdropFilter: 'blur(10px)',
            position: 'sticky', top: 0, zIndex: 10
          }}>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.25rem',
              color: 'var(--gold)',
              letterSpacing: '0.1em'
            }}>
              {lang === 'th' ? 'เลือกรูปแบบการทำนาย' : 'New Reading'}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10"
              style={{ color: 'var(--gold)' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* List of Spreads */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            <p style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              textAlign: 'center',
              marginBottom: '-0.5rem'
            }}>
              {lang === 'th' ? 'ตั้งสมาธิถึงคำถามของคุณ แล้วเลือกรูปแบบการเปิดไพ่' : 'Concentrate on your question and choose a spread.'}
            </p>

            {SPREADS.map((section, idx) => (
              <div key={idx}>
                {/* Section Header */}
                <div style={{
                  background: 'var(--surface-2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  borderLeft: '2px solid var(--gold-muted)'
                }}>
                  <h3 style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.15em',
                    color: 'var(--text-primary)',
                    textTransform: 'uppercase'
                  }}>
                    {section.category[lang]}
                  </h3>
                </div>

                {/* Spread Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {section.items.map((spread) => (
                    <button
                      key={spread.id}
                      onClick={() => onSelectSpread(spread)}
                      className="group flex flex-col items-start w-full text-left p-4 rounded-lg transition-all"
                      style={{
                        background: 'var(--surface-1)',
                        border: '1px solid var(--border-faint)',
                        borderBottom: '1px solid var(--border-color)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-2)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-1)'; }}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span style={{
                          fontFamily: 'Cinzel, serif',
                          fontSize: '1.1rem',
                          color: 'var(--gold)',
                          fontWeight: 'bold',
                        }}>
                          {spread.name[lang]}
                        </span>
                        <div className="flex items-center gap-2">
                          <span style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)',
                            fontFamily: 'Lora, serif',
                            border: '1px solid var(--border-color)',
                            padding: '2px 6px',
                            borderRadius: '12px'
                          }}>
                            {spread.cardCount} {lang === 'th' ? 'ใบ' : 'cards'}
                          </span>
                          <ChevronRight size={16} style={{color: 'var(--gold-muted)'}} />
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 mt-1">
                        <Info size={14} style={{color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0}} />
                        <p style={{
                          fontFamily: 'Lora, serif',
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4
                        }}>
                          {spread.description[lang]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Bottom padding spacer */}
            <div className="h-10" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
