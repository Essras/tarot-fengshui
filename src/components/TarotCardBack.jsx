import React from 'react';

export const TarotCardBack = ({ className = "" }) => (
  <div className={`w-full h-full bg-obsidian flex items-center justify-center relative overflow-hidden ${className}`}
    style={{
      border: '2px solid rgba(212, 175, 55, 0.6)',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)'
    }}
  >
    {/* Deep background radial glow */}
    <div className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at center, rgba(75,0,130,0.15) 0%, rgba(10,10,10,0) 70%)' }}
    />

    {/* Outer ornate frame */}
    <div className="absolute inset-[6px] border border-gold/20" />
    <div className="absolute inset-[10px] border border-gold/10" />

    {/* Filigree corners — large */}
    {[
      'top-0 left-0 border-t-2 border-l-2',
      'top-0 right-0 border-t-2 border-r-2',
      'bottom-0 left-0 border-b-2 border-l-2',
      'bottom-0 right-0 border-b-2 border-r-2',
    ].map((pos, i) => (
      <div key={i} className={`absolute ${pos} border-gold/50 pointer-events-none`}
        style={{ width: 22, height: 22 }} />
    ))}

    {/* Inner filigree corners */}
    {[
      'top-3 left-3 border-t border-l',
      'top-3 right-3 border-t border-r',
      'bottom-3 left-3 border-b border-l',
      'bottom-3 right-3 border-b border-r',
    ].map((pos, i) => (
      <div key={i} className={`absolute ${pos} border-gold/25 pointer-events-none`}
        style={{ width: 14, height: 14 }} />
    ))}

    {/* SVG Celestial Mandala */}
    <svg viewBox="0 0 200 200" className="w-[75%] h-[75%] absolute" style={{ opacity: 0.85 }}>
      {/* Outer rotating ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />

      {/* 8-point geometric star */}
      <polygon
        points="100,18 107,93 182,100 107,107 100,182 93,107 18,100 93,93"
        fill="none"
        stroke="rgba(212,175,55,0.5)"
        strokeWidth="0.7"
      />

      {/* Inner 8-point smaller star */}
      <polygon
        points="100,42 104.5,95.5 158,100 104.5,104.5 100,158 95.5,104.5 42,100 95.5,95.5"
        fill="none"
        stroke="rgba(212,175,55,0.35)"
        strokeWidth="0.5"
      />

      {/* Middle decorative rings */}
      <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="38" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />

      {/* Cross axes */}
      <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
      <line x1="35" y1="35" x2="165" y2="165" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" />
      <line x1="165" y1="35" x2="35" y2="165" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" />

      {/* 12 dot markers on outer ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 100 + 82 * Math.cos(angle);
        const y = 100 + 82 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="1.5" fill={i % 3 === 0 ? "rgba(212,175,55,0.7)" : "rgba(212,175,55,0.3)"} />;
      })}

      {/* Center emblem */}
      <circle cx="100" cy="100" r="22" fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="1" />
      <circle cx="100" cy="100" r="16" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.4)" strokeWidth="0.7" />
      <circle cx="100" cy="100" r="8" fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
      <circle cx="100" cy="100" r="3" fill="rgba(212,175,55,0.8)" />

      {/* 6-petal lotus at center */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const x = 100 + 12 * Math.cos(angle);
        const y = 100 + 12 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="4" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.5" />;
      })}
    </svg>

    {/* Animated slow spin overlay ring */}
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: '65%', height: '65%',
        border: '1px solid rgba(212,175,55,0.15)',
        borderTop: '1px solid rgba(212,175,55,0.5)',
        animation: 'spin 20s linear infinite',
      }}
    />
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: '50%', height: '50%',
        border: '1px solid rgba(212,175,55,0.1)',
        borderBottom: '1px solid rgba(212,175,55,0.4)',
        animation: 'spin 14s linear infinite reverse',
      }}
    />

    {/* Grain texture overlay */}
    <div className="grain-overlay" />
  </div>
);
