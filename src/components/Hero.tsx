import React from 'react';
import { Calendar, Heart, ShieldCheck, Sparkles, MessageCircle, Clock } from 'lucide-react';
import { BRAND_INFO } from '../data/servicesData';
import { HeroDogArt } from './DogIllustrations';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hola, quiero agendar una cita para mi peludito con Grooming Canino.'
  )}`;

  return (
    <section id="inicio" className="relative pt-24 sm:pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0B192C] via-[#0E223D] to-[#122A4D] text-white">
      {/* Glows ambientales sutiles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Columna Izquierda: Mensajes emocionales y CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Kicker sobrio sin efecto de píldora estática saturada */}
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Grooming & Estética Canina Especializada</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 font-normal">Andrea Tirado</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-heading text-balance">
              Tu peludito merece{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                manos que lo quieran
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl font-medium text-amber-100/90 tracking-wide">
              {BRAND_INFO.secondarySlogan}
            </p>

            {/* Texto de Mensaje de Marca */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              &ldquo;{BRAND_INFO.brandMessage}&rdquo;
            </p>

            {/* Bloque de CTAs de Conversión */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>AGENDAR CITA</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 bg-slate-800/90 hover:bg-slate-800 text-white hover:text-emerald-300 font-bold text-sm sm:text-base rounded-2xl border border-slate-700/80 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>WHATSAPP</span>
              </a>
            </div>

            {/* Diferenciadores rápidos de confianza */}
            <div className="pt-6 border-t border-slate-800/90 grid grid-cols-3 gap-3 sm:gap-6 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-400 text-xs sm:text-sm font-bold">
                  <Heart className="w-4 h-4 shrink-0 fill-current" />
                  <span>Sin Jaulas</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Trato amoroso continuo</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-400 text-xs sm:text-sm font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% Higiene</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Instrumental sanitizado</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-400 text-xs sm:text-sm font-bold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>A Domicilio</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Sin que tu perro salga</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Ilustración y Fotografía de Alta Fidelidad */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Marco de fondo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400/20 via-blue-500/20 to-amber-300/20 rounded-3xl blur-lg opacity-70" />
              
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-2xl">
                <HeroDogArt className="w-full h-auto aspect-[6/5] object-cover" />
              </div>

              {/* Tarjeta flotante inferior: Filosofía condensada */}
              <div className="mt-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 text-center shadow-lg">
                <p className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                  {BRAND_INFO.philosophy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
