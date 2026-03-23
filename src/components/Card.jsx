import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TarotCardBack } from './TarotCardBack';

export const Card = ({ cardData, isRevealed, onReveal, lang = 'th', compact = false }) => {
  const [imgError, setImgError] = useState(false);

  const w = compact ? 'clamp(100px, 24vw, 140px)' : 'clamp(150px, 28vw, 220px)';
  const h = compact ? 'clamp(150px, 36vw, 210px)' : 'clamp(225px, 42vw, 330px)';

  return (
    /*
     * 3D Flip architecture:
     * 1. Outer clipper: clips overflow, has border
     * 2. Inner flipper: perspective parent, not clipped
     * 3. Faces: positioned absolute inside flipper
     *
     * CRITICAL: transformStyle and perspective must be inline styles,
     * not className, for Framer Motion to not override them.
     * overflow:hidden must NOT be on the preserve-3d element or its parent.
     */
    <div
      onClick={onReveal}
      style={{
        width: w,
        height: h,
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* Perspective wrapper — no overflow:hidden here */}
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1000px',
          WebkitPerspective: '1000px',
        }}
      >
        {/* Flip container — CSS transition, not Framer Motion */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ─── BACK FACE ─── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              border: '2px solid var(--gold-muted)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px var(--shadow-color)',
            }}
          >
            <TarotCardBack />
            {!isRevealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '0.75rem',
                  pointerEvents: 'none',
                }}
              >
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  color: 'var(--gold-muted)',
                  textTransform: 'uppercase',
                }}>
                  Tap
                </span>
              </motion.div>
            )}
          </div>

          {/* ─── FRONT FACE ─── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: `rotateY(180deg) ${cardData.isReversed ? 'rotateZ(180deg)' : ''}`,
              border: '2px solid var(--gold-muted)',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'linear-gradient(160deg, #0f0f0f 0%, #0A0A0A 60%, #111008 100%)',
              boxShadow: '0 0 30px var(--border-color), 0 0 60px var(--border-faint), 0 20px 60px var(--shadow-color)',
            }}
          >
            {/* Card art — full bleed */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              {imgError ? (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 120 160" style={{ width: '75%', height: '75%', opacity: 0.4 }}>
                    <polygon points="60,10 90,50 110,90 60,150 10,90 30,50"
                      fill="none" stroke="var(--gold-muted)" strokeWidth="1" />
                    <circle cx="60" cy="80" r="30" fill="none" stroke="var(--border-color)" strokeWidth="0.8" />
                    <circle cx="60" cy="80" r="10" fill="var(--border-color)" stroke="var(--gold-muted)" strokeWidth="1" />
                  </svg>
                </div>
              ) : (
                <img
                  src={cardData.image}
                  alt={cardData.name[lang]}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.9) contrast(1.05)',
                    display: 'block',
                  }}
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            {/* Inner gold border inset */}
            <div style={{
              position: 'absolute', inset: '4px',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              pointerEvents: 'none',
              zIndex: 10,
            }} />

            {/* Roman numeral — top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
              display: 'flex', justifyContent: 'center', paddingTop: '0.5rem',
              background: 'linear-gradient(to bottom, rgba(8,8,8,0.82) 0%, transparent 100%)',
            }}>
              <span style={{
                fontFamily: 'Cinzel, serif',
                letterSpacing: '0.35em',
                color: 'var(--gold)',
                fontSize: compact ? '7px' : '9px',
              }}>
                {cardData.id === 0 ? '0' : getRomanNumeral(cardData.id)}
              </span>
            </div>

            {/* Name + Keywords — bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
              padding: compact ? '1.5rem 0.5rem 0.5rem' : '2rem 0.75rem 0.75rem',
              textAlign: 'center',
              background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.75) 50%, transparent 100%)',
            }}>
              <h3 style={{
                fontFamily: 'Cinzel, serif',
                color: 'rgba(212,175,55,0.95)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                lineHeight: 1.2,
                margin: 0,
                fontSize: compact ? '7px' : '10px',
              }}>
                {cardData.name[lang]}
              </h3>
              <p style={{
                fontFamily: 'Lora, serif',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                lineHeight: 1.3,
                margin: '2px 0 0',
                fontSize: compact ? '5px' : '7px',
              }}>
                {cardData.keywords[lang]}
              </p>
            </div>

            {/* Corner filigree */}
            {[['top:0;left:0', 'borderTop borderLeft'], ['top:0;right:0', 'borderTop borderRight'],
              ['bottom:0;left:0', 'borderBottom borderLeft'], ['bottom:0;right:0', 'borderBottom borderRight']
            ].map((_, qi) => (
              <div key={qi} style={{
                position: 'absolute',
                ...(qi === 0 && { top: 0, left: 0 }),
                ...(qi === 1 && { top: 0, right: 0 }),
                ...(qi === 2 && { bottom: 0, left: 0 }),
                ...(qi === 3 && { bottom: 0, right: 0 }),
                width: 16, height: 16,
                borderColor: 'rgba(212,175,55,0.4)',
                borderStyle: 'solid',
                borderWidth: 0,
                ...(qi === 0 && { borderTopWidth: 2, borderLeftWidth: 2 }),
                ...(qi === 1 && { borderTopWidth: 2, borderRightWidth: 2 }),
                ...(qi === 2 && { borderBottomWidth: 2, borderLeftWidth: 2 }),
                ...(qi === 3 && { borderBottomWidth: 2, borderRightWidth: 2 }),
                pointerEvents: 'none',
                zIndex: 30,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
const getRomanNumeral = (n) => ROMAN[n] ?? n;
