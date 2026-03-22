import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCardBack } from './TarotCardBack';
import { useTranslation } from '../hooks/useTranslation';

export const FloatingDeck = ({ onDraw }) => {
  const { t } = useTranslation();
  const [isPressing, setIsPressing] = useState(false);
  const [shuffleProgress, setShuffleProgress] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const timerRef = useRef(null);
  const [offsets, setOffsets] = useState([]);

  // Pre-compute stable card offsets
  useEffect(() => {
    setOffsets(
      [...Array(5)].map((_, i) => ({
        rotate: i * 2.5 - 5,
        x: i * 1.5,
        y: i * 0.5,
        scale: 1 - i * 0.012,
      }))
    );
  }, []);

  const startShuffle = (e) => {
    e.preventDefault();
    if (drawn) return;
    setIsPressing(true);
    let progress = 0;
    timerRef.current = setInterval(() => {
      progress += 2.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timerRef.current);
        // Auto-draw when full
        setDrawn(true);
        setTimeout(() => onDraw(), 300);
      }
      setShuffleProgress(progress);
    }, 40);
  };

  const endShuffle = () => {
    clearInterval(timerRef.current);
    if (shuffleProgress > 0 && shuffleProgress < 100) {
      if (shuffleProgress >= 30) {
        setDrawn(true);
        onDraw();
      } else {
        setIsPressing(false);
        setShuffleProgress(0);
      }
    }
    setIsPressing(false);
  };

  // Shuffle rotation angles
  const shuffleOffset = (i) => isPressing ? {
    rotate: (Math.sin(i * 47 + Date.now() * 0.001) * 20),
    x: (Math.cos(i * 31) * 28 * (shuffleProgress / 100)),
    y: (Math.sin(i * 17) * 14 * (shuffleProgress / 100)),
    scale: 0.97 + Math.random() * 0.03,
  } : offsets[i] || { rotate: 0, x: 0, y: 0, scale: 1 };

  // Progress ring circumference
  const R = 155;
  const C = 2 * Math.PI * R;
  const strokeDashoffset = C - (shuffleProgress / 100) * C;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
    }}>
      {/* Outer glow ring (pulsing) */}
      <motion.div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          pointerEvents: 'none',
          width: 'clamp(200px, 55vw, 300px)',
          height: 'clamp(200px, 55vw, 300px)',
        }}
        animate={isPressing
          ? { boxShadow: '0 0 60px rgba(212,175,55,0.35), 0 0 120px rgba(212,175,55,0.15)' }
          : { boxShadow: '0 0 30px rgba(212,175,55,0.08)' }
        }
        transition={{ duration: 0.4 }}
      />

      {/* Progress SVG ring */}
      <AnimatePresence>
        {isPressing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -inset-8 pointer-events-none"
          >
            <svg viewBox="0 0 340 340" className="w-full h-full -rotate-90">
              <circle cx="170" cy="170" r={R} fill="none"
                stroke="rgba(212,175,55,0.1)" strokeWidth="2" />
              <motion.circle
                cx="170" cy="170" r={R} fill="none"
                stroke="rgba(212,175,55,0.8)" strokeWidth="2"
                strokeLinecap="round"
                style={{ strokeDasharray: C, strokeDashoffset }}
                initial={{ strokeDashoffset: C }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.05 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deck of cards stack */}
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          width: 'clamp(160px, 30vw, 220px)',
          height: 'clamp(240px, 45vw, 330px)',
          flexShrink: 0,
        }}
        onPointerDown={startShuffle}
        onPointerUp={endShuffle}
        onPointerLeave={endShuffle}
      >
        {offsets.length > 0 && [...Array(5)].map((_, i) => {
          const off = shuffleOffset(5 - 1 - i);
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: i,
                borderRadius: '6px',
                overflow: 'hidden',
              }}
              animate={{
                rotate: off.rotate,
                x: off.x,
                y: off.y,
                scale: off.scale,
                boxShadow: isPressing
                  ? '0 0 30px rgba(212,175,55,0.3), 0 15px 40px rgba(0,0,0,0.7)'
                  : '0 8px 25px rgba(0,0,0,0.6)',
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <TarotCardBack />
            </motion.div>
          );
        })}

        {/* Top-most interactive card float animation */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 20,
            borderRadius: '6px',
            overflow: 'hidden',
          }}
          animate={!isPressing ? { y: [0, -6, 0] } : { y: 0 }}
          transition={!isPressing
            ? { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
            : { duration: 0.2 }
          }
          whileHover={{ boxShadow: '0 0 25px rgba(212,175,55,0.25)' }}
        >
          <TarotCardBack />
        </motion.div>
      </div>

      {/* Hint text */}
      <AnimatePresence mode="wait">
        {!isPressing && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-8 text-center"
          >
            <motion.span
              className="font-cinzel text-[10px] tracking-[0.35em] text-gold/50 uppercase"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {t('shuffleHint')}
            </motion.span>
          </motion.div>
        )}
        {isPressing && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="h-[1px] w-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
            <span className="font-cinzel text-[10px] tracking-[0.35em] text-gold/80 uppercase">
              {shuffleProgress < 100 ? 'Shuffling...' : '✦ Draw!'}
            </span>
            <div className="h-[1px] w-8" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
