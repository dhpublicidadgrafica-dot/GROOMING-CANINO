import React from 'react';

/**
 * Ilustraciones y gráficos vectoriales de alta fidelidad para Grooming Canino
 * Diseñados para transmitir calidez, higiene y calidad premium.
 */

export const HeroDogArt: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="heroBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="50%" stopColor="#0F2454" />
        <stop offset="100%" stopColor="#0B192C" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="50%" stopColor="#FEEBC8" />
        <stop offset="100%" stopColor="#E2A662" />
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="16" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Fondo estilizado de estudio de grooming */}
    <rect width="600" height="500" rx="32" fill="url(#heroBgGrad)" />
    
    {/* Círculo de luz cálida de estudio */}
    <circle cx="300" cy="270" r="190" fill="#2563EB" opacity="0.25" filter="url(#softGlow)" />
    <circle cx="300" cy="250" r="150" fill="#F59E0B" opacity="0.12" filter="url(#softGlow)" />

    {/* Decoración geométrica sutil */}
    <circle cx="480" cy="90" r="50" stroke="#FBBF24" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
    <circle cx="100" cy="400" r="60" stroke="#60A5FA" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />

    {/* Mesa de grooming estilizada */}
    <ellipse cx="300" cy="430" rx="220" ry="24" fill="#071324" />
    <rect x="110" y="420" width="380" height="12" rx="6" fill="#1E40AF" opacity="0.8" />
    <rect x="294" y="432" width="12" height="60" rx="6" fill="#3B82F6" opacity="0.4" />

    {/* Perro feliz y esponjoso (Estilo Doodle / Bichón recién peinado) */}
    <g transform="translate(160, 110)">
      {/* Cuerpo y pecho esponjoso */}
      <path d="M70 290 C70 210, 210 210, 210 290 Z" fill="url(#furGrad)" />
      
      {/* Patitas delanteras limpias */}
      <rect x="90" y="270" width="36" height="55" rx="18" fill="#FFFBEB" />
      <rect x="154" y="270" width="36" height="55" rx="18" fill="#FFFBEB" />
      
      {/* Orejas largas y suaves */}
      <path d="M40 90 C15 120, 20 190, 55 200 C80 205, 85 140, 75 95 Z" fill="#D97706" opacity="0.9" />
      <path d="M240 90 C265 120, 260 190, 225 200 C200 205, 195 140, 205 95 Z" fill="#D97706" opacity="0.9" />

      {/* Cabeza esponjosa con corte redondo impecable */}
      <circle cx="140" cy="115" r="75" fill="url(#furGrad)" />
      
      {/* Mechón superior acicalado */}
      <circle cx="140" cy="55" r="32" fill="#FEF3C7" />
      <circle cx="120" cy="65" r="22" fill="#FEF3C7" />
      <circle cx="160" cy="65" r="22" fill="#FEF3C7" />

      {/* Mejillas suaves */}
      <circle cx="95" cy="130" r="32" fill="#FEF3C7" />
      <circle cx="185" cy="130" r="32" fill="#FEF3C7" />

      {/* Ojos expresivos y tiernos */}
      <ellipse cx="112" cy="108" rx="8" ry="11" fill="#1E293B" />
      <circle cx="115" cy="104" r="3.5" fill="#FFFFFF" />
      <circle cx="110" cy="113" r="1.5" fill="#FFFFFF" />

      <ellipse cx="168" cy="108" rx="8" ry="11" fill="#1E293B" />
      <circle cx="171" cy="104" r="3.5" fill="#FFFFFF" />
      <circle cx="166" cy="113" r="1.5" fill="#FFFFFF" />

      {/* Nariz brillante y limpia */}
      <path d="M130 128 C135 123, 145 123, 150 128 C152 133, 147 141, 140 141 C133 141, 128 133, 130 128 Z" fill="#0F172A" />
      <ellipse cx="137" cy="130" rx="3" ry="1.5" fill="#64748B" />

      {/* Sonrisa amable */}
      <path d="M140 141 L140 148 M140 148 C132 148, 126 156, 122 152 M140 148 C148 148, 154 156, 158 152" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Lengüita alegre asomando */}
      <path d="M134 150 C134 158, 146 158, 146 150 Z" fill="#F43F5E" />

      {/* Pañuelo bandana elegante en el cuello */}
      <path d="M92 185 L140 230 L188 185 C175 192, 105 192, 92 185 Z" fill="#F59E0B" />
      <path d="M92 185 C115 195, 165 195, 188 185" stroke="#FDE047" strokeWidth="3" />
      <circle cx="140" cy="210" r="3" fill="#FFFFFF" />
    </g>

    {/* Burbujas y destellos de limpieza */}
    <g opacity="0.85">
      {/* Destello 1 */}
      <path d="M120 140 L125 155 L140 160 L125 165 L120 180 L115 165 L100 160 L115 155 Z" fill="url(#goldGrad)" opacity="0.9" />
      {/* Destello 2 */}
      <path d="M470 200 L473 210 L483 213 L473 216 L470 226 L467 216 L457 213 L467 210 Z" fill="url(#goldGrad)" opacity="0.8" />
      {/* Burbujas */}
      <circle cx="450" cy="140" r="14" stroke="#93C5FD" strokeWidth="2" fill="none" opacity="0.6" />
      <circle cx="445" cy="135" r="4" fill="#FFFFFF" opacity="0.7" />
      <circle cx="150" cy="360" r="10" stroke="#93C5FD" strokeWidth="1.5" fill="none" opacity="0.5" />
    </g>

    {/* Insignia flotante de amor y calidad */}
    <g transform="translate(40, 60)">
      <rect width="180" height="52" rx="26" fill="#0F2454" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="32" cy="26" r="16" fill="#F59E0B" />
      {/* Corazón */}
      <path d="M32 29 C32 29, 25 24, 25 21 C25 18, 28 16, 30.5 18 C32 19.5, 32 19.5, 32 19.5 C32 19.5, 32 19.5, 33.5 18 C36 16, 39 18, 39 21 C39 24, 32 29, 32 29 Z" fill="#0F172A" />
      <text x="56" y="24" fill="#FFFFFF" fontSize="12" fontWeight="700" fontFamily="sans-serif">100% AMOR & RESPETO</text>
      <text x="56" y="38" fill="#93C5FD" fontSize="10" fontFamily="sans-serif">Cuidado libre de estrés</text>
    </g>
  </svg>
);

export const ServiceArtwork: React.FC<{ type: string; className?: string }> = ({ type, className = "w-full h-48" }) => {
  switch (type) {
    case 'deslanado':
      return (
        <div className={`relative bg-gradient-to-br from-blue-900/90 to-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-xs" />
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-md" fill="none">
            {/* Viento y partículas de subpelo retirado suavemente */}
            <path d="M20 50 Q60 20 120 40 T180 30" stroke="#93C5FD" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
            <path d="M10 80 Q70 60 130 90 T190 70" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M30 110 Q90 100 140 120 T180 115" stroke="#93C5FD" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
            {/* Silueta de cepillo profesional ergonómico */}
            <g transform="translate(70, 45)">
              <rect x="0" y="20" width="60" height="35" rx="6" fill="#1E40AF" stroke="#60A5FA" strokeWidth="2" />
              {/* Púas del rastrillo deslanador */}
              <line x1="8" y1="55" x2="8" y2="70" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="18" y1="55" x2="18" y2="70" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="28" y1="55" x2="28" y2="70" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="38" y1="55" x2="38" y2="70" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="48" y1="55" x2="48" y2="70" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
              {/* Mango ergonómico */}
              <path d="M30 20 L30 0" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      );

    case 'corte-de-unas':
      return (
        <div className={`relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-xs" />
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-md" fill="none">
            {/* Huellita delicada */}
            <g transform="translate(60, 40)">
              <ellipse cx="40" cy="55" rx="28" ry="22" fill="#F8FAFC" opacity="0.9" />
              <ellipse cx="20" cy="22" rx="9" ry="13" fill="#F8FAFC" opacity="0.9" />
              <ellipse cx="38" cy="15" rx="9" ry="13" fill="#F8FAFC" opacity="0.9" />
              <ellipse cx="58" cy="18" rx="9" ry="13" fill="#F8FAFC" opacity="0.9" />
              {/* Resplandor seguro */}
              <circle cx="40" cy="50" r="38" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
            </g>
          </svg>
        </div>
      );

    case 'bano-y-estetica':
      return (
        <div className={`relative bg-gradient-to-br from-blue-950 to-indigo-950 rounded-2xl overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-xs" />
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-md" fill="none">
            {/* Bañera de spa y burbujas */}
            <path d="M30 75 Q30 115 60 115 L140 115 Q170 115 170 75 Z" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="3" />
            {/* Patas de bañera */}
            <path d="M50 115 L45 130 M150 115 L155 130" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            {/* Espuma aromática */}
            <ellipse cx="100" cy="75" rx="65" ry="15" fill="#FFFFFF" opacity="0.95" />
            <circle cx="70" cy="68" r="14" fill="#FFFFFF" />
            <circle cx="95" cy="62" r="16" fill="#FFFFFF" />
            <circle cx="125" cy="66" r="15" fill="#FFFFFF" />
            {/* Burbujas flotando */}
            <circle cx="85" cy="35" r="9" stroke="#93C5FD" strokeWidth="2" fill="#E0F2FE" opacity="0.7" />
            <circle cx="120" cy="25" r="12" stroke="#93C5FD" strokeWidth="2" fill="#E0F2FE" opacity="0.7" />
            <circle cx="145" cy="45" r="7" stroke="#FDE047" strokeWidth="1.5" fill="#FEF9C3" opacity="0.7" />
          </svg>
        </div>
      );

    case 'plucking':
      return (
        <div className={`relative bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-xs" />
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-md" fill="none">
            {/* Manos dedicadas y mechones precisos */}
            <g transform="translate(55, 30)">
              <circle cx="45" cy="45" r="40" fill="#1E3A8A" stroke="#F59E0B" strokeWidth="2" />
              {/* Símbolo de técnica manual meticulosa */}
              <path d="M30 65 C30 40, 45 35, 45 25 C45 35, 60 40, 60 65" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M22 65 C22 45, 38 40, 38 30" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M68 65 C68 45, 52 40, 52 30" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="45" cy="18" r="3" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      );

    case 'stripping':
    default:
      return (
        <div className={`relative bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-xs" />
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-md" fill="none">
            {/* Cuchilla de stripping profesional y textura de pelo duro */}
            <g transform="translate(55, 35)">
              <rect x="15" y="40" width="60" height="20" rx="4" fill="#3B82F6" stroke="#93C5FD" strokeWidth="2" />
              <line x1="20" y1="40" x2="20" y2="30" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="30" y1="40" x2="30" y2="28" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="40" y1="40" x2="40" y2="30" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="50" y1="40" x2="50" y2="28" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="60" y1="40" x2="60" y2="30" stroke="#E2E8F0" strokeWidth="2" />
              <path d="M75 50 L95 50" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      );
  }
};
