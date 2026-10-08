import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_INFO } from '../data/servicesData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hola, quiero información sobre los servicios de Grooming Canino.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end flex-col gap-2 pointer-events-auto">
      {/* Tooltip opcional con mensaje cálido */}
      {showTooltip && (
        <div className="bg-slate-900/95 border border-slate-700/80 text-white rounded-2xl p-3 shadow-2xl max-w-xs animate-in slide-in-from-bottom-2 duration-300 relative text-left">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white p-0.5 rounded"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="pr-5">
            <p className="text-xs font-bold text-amber-400">¿Tienes dudas sobre tu peludito?</p>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
              Escríbeme por WhatsApp con Andrea Tirado.
            </p>
          </div>
        </div>
      )}

      {/* Botón flotante WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a Andrea Tirado"
        className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
      >
        <MessageCircle className="w-7 h-7 fill-current group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};
