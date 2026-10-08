import React from 'react';
import { MessageCircle, Calendar, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/servicesData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hola, quiero agendar una cita para mi peludito con Grooming Canino.'
  )}`;

  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
          <Heart className="w-4 h-4 fill-current" />
          <span>ESTAMOS LISTOS PARA ATENDERTE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
          ¿Listo para consentir a tu peludito?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Agenda su cita y déjalo en manos de alguien que lo cuida con amor.
        </p>

        {/* Tarjeta de Contacto Directo */}
        <div className="mt-8 bg-[#0F2445]/90 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-xl mx-auto shadow-2xl">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-xl shadow-lg">
              AT
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Responsable de las citas</p>
              <h3 className="text-2xl font-black text-white font-heading mt-0.5">{BRAND_INFO.manager}</h3>
            </div>

            <div className="pt-2 flex items-center gap-2 text-emerald-400 font-mono text-lg font-bold">
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp: {BRAND_INFO.whatsappNumber}</span>
            </div>

            <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Atención personalizada y paciente</span>
            </div>
          </div>

          {/* Botonera de Conversión */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>AGENDAR CITA</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>ESCRIBIR POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
