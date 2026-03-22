import { useState, useCallback, useContext, createContext } from 'react';

const translations = {
  th: {
    title: "Ancient Oracle",
    subtitle: "ค้นหาความหมายผ่านไพ่ทาโรต์",
    dailyCard: "เปิดไพ่ประจำวัน",
    threeCard: "เปิดไพ่ 3 ใบ",
    shuffleHint: "กดค้างเพื่อสับไพ่",
    drawCard: "จิ้มเพื่อดึงไพ่",
    tapToReveal: "จิ้มเพื่อเปิดไพ่",
    readMore: "อ่านเพิ่มเติม",
    quickView: "ความหมายสั้น",
    deepDive: "เจาะลึกความหมาย",
    back: "กลับ",
    language: "EN",
  },
  en: {
    title: "Ancient Oracle",
    subtitle: "Find your path through Tarot",
    dailyCard: "Daily Card",
    threeCard: "3-Card Spread",
    shuffleHint: "Press & Hold to Shuffle",
    drawCard: "Tap to Draw",
    tapToReveal: "Tap to Reveal",
    readMore: "Read More",
    quickView: "Quick View",
    deepDive: "Deep Dive",
    back: "Back",
    language: "TH",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('th');

  const t = useCallback((key) => {
    return translations[lang][key] || key;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'th' ? 'en' : 'th');
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
