import React, { useState, useCallback } from 'react';
import { RotateCcw, Moon, Sun, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, LanguageProvider } from './hooks/useTranslation';
import { FloatingDeck } from './components/FloatingDeck';
import { Card } from './components/Card';
import { InterpretationSheet } from './components/InterpretationSheet';
import { MenuDrawer } from './components/MenuDrawer';
import { SpreadSelectionDrawer } from './components/SpreadSelectionDrawer';
import tarotData from './data/tarot-deck.json';

function MainApp() {
  const { lang, t, toggleLang } = useTranslation();
  const [view, setView] = useState('home');
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpreadMenuOpen, setIsSpreadMenuOpen] = useState(false);
  const [activeSpread, setActiveSpread] = useState(null);
  const [readingMode, setReadingMode] = useState('mystical');
  const [facingDirection, setFacingDirection] = useState('N');

  const drawSpread = useCallback((spread) => {
    setActiveSpread(spread);
    setIsSpreadMenuOpen(false);
    
    // Shuffle the entire deck ( মেজর + Minor ) and pick exactly spread.cardCount cards
    const fullDeck = [...tarotData.major, ...(tarotData.minor || [])];
    const shuffled = fullDeck.sort(() => 0.5 - Math.random());
    const cards = shuffled.slice(0, spread.cardCount);
    
    setDrawnCards(cards);
    setRevealedIndex(-1);
    setIsSheetOpen(false);
    setView('spread'); // 'daily' is no longer needed separate view, 'spread' handles all
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
    setActiveSpread(null);
    setFacingDirection('N');
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
        <button onClick={reset} className="flex flex-col items-start text-left group bg-transparent border-none outline-none appearance-none p-0 m-0" style={{ WebkitTapHighlightColor: 'transparent' }}>
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
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all bg-transparent outline-none appearance-none"
            whileTap={{ scale: 0.95 }}
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
              <FloatingDeck onDraw={() => setIsSpreadMenuOpen(true)} />

              {/* Divider */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25))' }} />
                <Moon size={11} className="text-gold/30" />
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.25), transparent)' }} />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.75rem' }}>
                <motion.button
                  id="new-reading-btn"
                  onClick={() => setIsSpreadMenuOpen(true)}
                  className="mystical-gold-btn w-full py-4 sm:py-5 px-8 flex items-center justify-between group"
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="gold-corner" />
                  <div className="gold-corner-tr" />
                  <div className="gold-corner-bl" />
                  <div className="gold-corner-br" />
                  <span className="font-cinzel tracking-[0.25em] text-gold text-xs sm:text-sm uppercase font-bold relative z-10">
                    {lang === 'th' ? 'การทำนายใหม่' : 'New Reading'}
                  </span>
                  <div className="relative z-10 flex items-center gap-1.5">
                    <Sun size={14} className="text-gold/60" />
                  </div>
                  <div className="grain-overlay" />
                </motion.button>
              </div>
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
              {/* Spread Header/Title */}
              {activeSpread && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  style={{ textAlign: 'center', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                >
                  <h2 style={{ fontFamily: 'Cinzel, serif', color: 'rgb(212,175,55)', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
                    {activeSpread.name[lang]}
                  </h2>
                  {activeSpread.id === 'spiritual_fengshui' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontFamily: 'Lora, serif', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                        {lang === 'th' ? 'ทิศหน้าบ้าน:' : 'Facing Direction:'}
                      </span>
                      <select
                        value={facingDirection}
                        onChange={e => setFacingDirection(e.target.value)}
                        style={{
                          background: 'rgba(212,175,55,0.1)',
                          border: '1px solid rgba(212,175,55,0.3)',
                          color: 'rgba(212,175,55,0.9)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontFamily: 'Cinzel, serif',
                          fontSize: '11px',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {FENGSHUI_DIRECTIONS.map(d => (
                          <option key={d.id} value={d.id} style={{ background: '#12090e' }}>
                            {d[lang]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </motion.div>
              )}
              
              <SpreadRow cards={drawnCards} spread={activeSpread} revealedIndex={revealedIndex} onReveal={handleCardReveal} lang={lang} facingDirection={facingDirection} />
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

      <SpreadSelectionDrawer
        isOpen={isSpreadMenuOpen}
        onClose={() => setIsSpreadMenuOpen(false)}
        onSelectSpread={drawSpread}
        lang={lang}
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

/* ─── Fengshui Direction Mapping ─── */
const FENGSHUI_DIRECTIONS = [
  { id: 'N', en: 'North (Career)', th: 'ทิศเหนือ (งาน)' },
  { id: 'NE', en: 'Northeast (Knowledge)', th: 'ทิศตะวันออกเฉียงเหนือ (วิชาความรู้)' },
  { id: 'E', en: 'East (Family)', th: 'ทิศตะวันออก (ครอบครัว)' },
  { id: 'SE', en: 'Southeast (Wealth)', th: 'ทิศตะวันออกเฉียงใต้ (การเงิน)' },
  { id: 'S', en: 'South (Fame)', th: 'ทิศใต้ (ชื่อเสียง)' },
  { id: 'SW', en: 'Southwest (Love)', th: 'ทิศตะวันตกเฉียงใต้ (ความรัก)' },
  { id: 'W', en: 'West (Creativity/Children)', th: 'ทิศตะวันตก (สร้างสรรค์/บุตร)' },
  { id: 'NW', en: 'Northwest (Helpful People)', th: 'ทิศตะวันตกเฉียงเหนือ (ผู้อุปถัมภ์)' },
];
// Clockwise layout starting from top-center (idx 1):
const GRID_CIRCLE = [1, 2, 5, 8, 7, 6, 3, 0];

/* ─── SpreadRow: layout logic for standard vs custom spreads ─── */
function SpreadRow({ cards, spread, revealedIndex, onReveal, lang, facingDirection = 'N' }) {
  // Compute spiritual fengshui dynamic labels
  const getFengshuiLabel = (gridIdx) => {
    if (gridIdx === 4) return lang === 'th' ? 'จุดศูนย์กลาง (สมดุล)' : 'Center (Balance)';
    if (gridIdx === 9) return lang === 'th' ? 'ใบสรุปภาพรวม' : 'Outcome Summary';
    
    const startIndex = FENGSHUI_DIRECTIONS.findIndex(d => d.id === facingDirection);
    const circlePos = GRID_CIRCLE.indexOf(gridIdx);
    if (circlePos === -1) return '';
    const resolvedIndex = (startIndex + circlePos) % 8;
    return FENGSHUI_DIRECTIONS[resolvedIndex][lang];
  };

  // Helper to render individual cards with label
  const renderCardItem = (card, idx, scaleStyle = {}) => {
    let label = spread?.positions ? spread.positions[lang][idx] : `Card ${idx + 1}`;
    if (spread?.id === 'spiritual_fengshui') {
      label = getFengshuiLabel(idx);
    }
    
    return (
      <div
        key={`${card.id}-${idx}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          ...scaleStyle
        }}
      >
        <span
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: 'rgba(212,175,55,0.5)',
            textTransform: 'uppercase',
            minHeight: '12px',
            textAlign: 'center',
            maxWidth: '100px',
            lineHeight: '1.2'
          }}
        >
          {label}
        </span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (idx % 12) * 0.15, duration: 0.45 }}
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
    );
  };

  // Custom Layout: Spiritual Fengshui (9-card 3x3 grid + 1 summary)
  if (spread?.id === 'spiritual_fengshui' && cards.length === 10) {
    const gridCards = cards.slice(0, 9);
    const summaryCard = cards[9];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: '800px' }}>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
            width: '100%',
            maxWidth: '600px'
          }}
          className="gap-2 sm:gap-6"
        >
          {gridCards.map((card, idx) => renderCardItem(card, idx, { transform: 'scale(0.85)', transformOrigin: 'top center', margin: '-5px' }))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '1.5rem' }}>
          {renderCardItem(summaryCard, 9, { transform: 'scale(0.95)', transformOrigin: 'top center' })}
        </div>
      </div>
    );
  }

  // Standard Layout: Flex wrap for general spreads
  const isLargeSpread = cards.length > 5;
  const isMediumSpread = cards.length > 3 && cards.length <= 5;
  
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'start',
        gap: isLargeSpread ? '12px' : '16px',
        width: '100%',
        maxWidth: isLargeSpread ? '1000px' : '800px',
      }}
    >
      {cards.map((card, idx) => renderCardItem(card, idx, {
        transform: isLargeSpread ? 'scale(0.85)' : isMediumSpread ? 'scale(0.92)' : 'scale(1)',
        transformOrigin: 'top center',
        margin: isLargeSpread ? '-10px -5px' : isMediumSpread ? '-5px' : '0'
      }))}
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
    className="relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full overflow-hidden group transition-all duration-500 bg-transparent border-none outline-none appearance-none"
    style={{ 
      background: 'rgba(18, 9, 14, 0.5)', 
      border: '1px solid rgba(212,175,55,0.3)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      WebkitTapHighlightColor: 'transparent',
    }}
    whileHover={{ 
      background: 'rgba(212,175,55,0.1)',
      border: '1px solid rgba(212,175,55,0.6)',
      boxShadow: '0 0 20px rgba(212,175,55,0.2)'
    }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
    <RotateCcw size={14} className="text-gold/80 group-hover:text-gold transition-colors duration-300 relative z-10" />
    <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold/80 group-hover:text-gold transition-colors duration-300 drop-shadow-sm relative z-10">
      {label}
    </span>
  </motion.button>
);

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
