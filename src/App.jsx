import React, { useState, useCallback } from 'react';
import { RotateCcw, Moon, Sun, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, LanguageProvider } from './hooks/useTranslation';
import { FloatingDeck } from './components/FloatingDeck';
import { Card } from './components/Card';
import { InterpretationSheet } from './components/InterpretationSheet';
import { MenuDrawer } from './components/MenuDrawer';
import tarotData from './data/tarot-deck.json';

const POSITION_LABELS = {
  th: ['อดีต', 'ปัจจุบัน', 'อนาคต'],
  en: ['Past', 'Present', 'Future'],
};

function MainApp() {
  const { lang, t, toggleLang } = useTranslation();
  const [view, setView] = useState('home');
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [readingMode, setReadingMode] = useState('mystical');

  const drawDaily = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tarotData.major.length);
    const card = tarotData.major[randomIndex];
    setDrawnCards([card]);
    setRevealedIndex(-1);
    setIsSheetOpen(false);
    setView('daily');
  }, []);

  const drawSpread = useCallback(() => {
    const shuffled = [...tarotData.major].sort(() => 0.5 - Math.random());
    const cards = shuffled.slice(0, 3);
    setDrawnCards(cards);
    setRevealedIndex(-1);
    setIsSheetOpen(false);
    setView('spread');
  }, []);

  const handleCardReveal = useCallback((index) => {
    const alreadyRevealed = revealedIndex >= index;
    if (alreadyRevealed) {
      // Card already flipped — just re-open the interpretation sheet immediately
      setSelectedCard(drawnCards[index]);
      setIsSheetOpen(true);
    } else {
      // First reveal — flip animation then open sheet
      setRevealedIndex(prev => Math.max(prev, index));
      setTimeout(() => {
        setSelectedCard(drawnCards[index]);
        setIsSheetOpen(true);
      }, 900);
    }
  }, [revealedIndex, drawnCards]);

  const reset = useCallback(() => {
    setView('home');
    setDrawnCards([]);
    setRevealedIndex(-1);
    setSelectedCard(null);
    setIsSheetOpen(false);
  }, []);

  return (
    <div
      id="app-root"
      style={{
        width: '100vw',
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at 50% 0%, #12090e 0%, #0A0A0A 60%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        color: 'white',
        fontFamily: 'Lora, serif',
      }}
    >
      {/* ─ STAR FIELD ─ */}
      <div className="star-field" />

      {/* ─ AMBIENT BLOBS ─ */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(75,0,130,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      {/* ─ PARTICLES ─ */}
      <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" />
      <div className="particle particle-4" />

      {/* ═══ HEADER ═══ */}
      <header style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 30,
        padding: '0.875rem 1.25rem',
        flexShrink: 0,
        borderBottom: '1px solid rgba(212,175,55,0.08)',
      }}>
        <button onClick={reset} className="flex flex-col items-start text-left group">
          <span className="font-cinzel text-base sm:text-xl tracking-[0.2em] text-gold drop-shadow-sm group-hover:text-gold/90 transition-colors">
            {t('title')}
          </span>
          <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.25em] text-white/30 font-cinzel">
            {t('subtitle')}
          </span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ModeBadge mode={readingMode} lang={lang} />
          <button
            id="menu-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{
              border: '1px solid rgba(212,175,55,0.35)',
              background: 'rgba(212,175,55,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
          >
            <Menu size={14} className="text-gold/70" />
          </button>
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main style={{
        flex: 1,
        position: 'relative',
        zIndex: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        <AnimatePresence mode="wait">

          {/* ── HOME ── */}
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                width: '100%',
                maxWidth: '32rem',
                padding: '1.5rem 1.5rem',
              }}
            >
              <FloatingDeck onDraw={drawDaily} />

              {/* Divider */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25))' }} />
                <Moon size={11} className="text-gold/30" />
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.25), transparent)' }} />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.75rem' }}>
                <motion.button
                  id="draw-daily-btn"
                  onClick={drawDaily}
                  className="mystical-gold-btn w-full py-4 sm:py-5 px-8 flex items-center justify-between group"
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="gold-corner" />
                  <div className="gold-corner-tr" />
                  <div className="gold-corner-bl" />
                  <div className="gold-corner-br" />
                  <span className="font-cinzel tracking-[0.25em] text-gold text-xs sm:text-sm uppercase font-bold relative z-10">
                    {t('dailyCard')}
                  </span>
                  <div className="relative z-10 flex items-center gap-1.5">
                    <Moon size={14} className="text-gold/60" />
                  </div>
                  <div className="grain-overlay" />
                </motion.button>

                <motion.button
                  id="draw-spread-btn"
                  onClick={drawSpread}
                  className="mystical-gold-btn w-full py-3.5 sm:py-4 px-8 flex items-center justify-center gap-3 group"
                  style={{ borderColor: 'rgba(212,175,55,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="gold-corner opacity-40" />
                  <div className="gold-corner-tr opacity-40" />
                  <div className="gold-corner-bl opacity-40" />
                  <div className="gold-corner-br opacity-40" />
                  <Sun size={12} className="text-gold/40 group-hover:text-gold/70 transition-colors" />
                  <span className="font-cinzel tracking-[0.2em] text-white/40 group-hover:text-gold/70 transition-colors text-[10px] sm:text-xs uppercase relative z-10">
                    {t('threeCard')}
                  </span>
                  <div className="grain-overlay opacity-25" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── DAILY ── */}
          {view === 'daily' && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 22 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.5rem 1rem 8rem',
                width: '100%',
              }}
            >
              {drawnCards[0] && (
                <Card
                  cardData={drawnCards[0]}
                  isRevealed={revealedIndex >= 0}
                  onReveal={() => handleCardReveal(0)}
                  lang={lang}
                />
              )}
              <ResetButton onClick={reset} label={t('back')} />
            </motion.div>
          )}

          {/* ── SPREAD ── */}
          {view === 'spread' && (
            <motion.div
              key="spread"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 22 }}
              style={{
                width: '100%',
                padding: '1.5rem 1rem 8rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <SpreadRow cards={drawnCards} revealedIndex={revealedIndex} onReveal={handleCardReveal} lang={lang} />
              <ResetButton onClick={reset} label={t('back')} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ═══ INTERPRETATION SHEET ═══ */}
      <InterpretationSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        cardData={selectedCard}
        readingMode={readingMode}
      />

      {/* ═══ MENU ═══ */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        lang={lang}
        onToggleLang={toggleLang}
        readingMode={readingMode}
        onSetMode={setReadingMode}
      />

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      />
    </div>
  );
}

/* ─── SpreadRow: uses CSS Grid — guaranteed 3-column horizontal layout ─── */
function SpreadRow({ cards, revealedIndex, onReveal, lang }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        justifyContent: 'center',
        alignItems: 'start',
        gap: '16px',
        width: '100%',
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={card.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'rgba(212,175,55,0.5)',
              textTransform: 'uppercase',
            }}
          >
            {POSITION_LABELS[lang][idx]}
          </span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.45 }}
          >
            <Card
              cardData={card}
              isRevealed={revealedIndex >= idx}
              onReveal={() => onReveal(idx)}
              lang={lang}
              compact
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ─── Mode Badge ─── */
const MODE_META = {
  mystical: { color: '#9b59b6', label: { th: 'ไสยศาสตร์', en: 'Mystical' } },
  psychological: { color: '#2ecc71', label: { th: 'จิตวิทยา', en: 'Jungian' } },
  fengshui: { color: '#e67e22', label: { th: 'ฮวงจุ้ย', en: 'FengShui' } },
};

const ModeBadge = ({ mode, lang }) => {
  const meta = MODE_META[mode];
  if (!meta) return null;
  return (
    <div
      className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}40` }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
      <span className="font-cinzel text-[8px] tracking-[0.2em] uppercase" style={{ color: meta.color }}>
        {meta.label[lang]}
      </span>
    </div>
  );
};

const ResetButton = ({ onClick, label }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-2 transition-colors"
    style={{ color: 'rgba(212,175,55,0.35)' }}
    whileHover={{ color: 'rgba(212,175,55,0.85)' }}
    whileTap={{ scale: 0.95 }}
  >
    <RotateCcw size={12} />
    <span className="font-cinzel text-[9px] tracking-[0.25em] uppercase">{label}</span>
  </motion.button>
);

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
