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
            background: 'linear-gradient(180deg, #12090e 0%, #0a0a0a 100%)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid rgba(212,175,55,0.15)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            position: 'sticky', top: 0, zIndex: 10
          }}>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.25rem',
              color: 'rgb(212,175,55)',
              letterSpacing: '0.1em'
            }}>
              {lang === 'th' ? 'เลือกรูปแบบการทำนาย' : 'New Reading'}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-white/5 active:bg-white/10"
              style={{ color: 'rgba(212,175,55,0.8)' }}
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
              color: 'rgba(255,255,255,0.6)',
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
                  background: 'rgba(212,175,55,0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  borderLeft: '2px solid rgba(212,175,55,0.6)'
                }}>
                  <h3 style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.9)',
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
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderBottom: '1px solid rgba(212,175,55,0.1)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span style={{
                          fontFamily: 'Cinzel, serif',
                          fontSize: '1.1rem',
                          color: 'rgb(212,175,55)',
                          fontWeight: 'bold',
                        }}>
                          {spread.name[lang]}
                        </span>
                        <div className="flex items-center gap-2">
                          <span style={{
                            fontSize: '0.7rem',
                            color: 'rgba(255,255,255,0.4)',
                            fontFamily: 'Lora, serif',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '2px 6px',
                            borderRadius: '12px'
                          }}>
                            {spread.cardCount} {lang === 'th' ? 'ใบ' : 'cards'}
                          </span>
                          <ChevronRight size={16} className="text-gold/50 group-hover:text-gold transition-colors" />
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 mt-1">
                        <Info size={14} className="text-white/30 mt-0.5 shrink-0" />
                        <p style={{
                          fontFamily: 'Lora, serif',
                          fontSize: '0.85rem',
                          color: 'rgba(255,255,255,0.5)',
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
