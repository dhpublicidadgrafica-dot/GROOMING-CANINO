import React from 'react';
import { Heart, ShieldCheck, UserCheck, Sparkles, Award } from 'lucide-react';
import { BRAND_INFO } from '../data/servicesData';

export const AboutSection: React.FC = () => {
  const cards = [
    {
      title: 'TRATO AMABLE',
      description: 'Atendemos a cada mascota con paciencia y respeto.',
      icon: Heart,
      accent: 'from-rose-500/10 to-amber-500/10',
      iconColor: 'text-rose-400'
    },
    {
      title: 'AMBIENTE SEGURO',
      description: 'Un espacio limpio, tranquilo y pensado para el bienestar de tu peludito.',
      icon: ShieldCheck,
      accent: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-blue-400'
    },
    {
      title: 'ATENCIÓN PERSONALIZADA',
      description: 'Cada mascota recibe cuidados de acuerdo con sus necesidades.',
      icon: UserCheck,
      accent: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-400'
    },
    {
      title: 'PRODUCTOS DE CALIDAD',
      description: 'Utilizamos productos seleccionados para ofrecer un cuidado profesional.',
      icon: Sparkles,
      accent: 'from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-400'
    }
  ];

  return (
    <section id="nosotros" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>NUESTRA PROMESA DE CUIDADO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Amor, cuidado y bienestar en cada sesión
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed font-light">
            En Grooming Canino creemos que cada mascota merece recibir un trato lleno de paciencia, respeto y cariño.
          </p>

          <p className="text-sm sm:text-base font-medium text-amber-300 bg-amber-950/40 border border-amber-500/20 py-2.5 px-6 rounded-2xl inline-block">
            &ldquo;Cada mascota recibe paciencia, buen trato y cuidado profesional.&rdquo;
          </p>
        </div>

        {/* 4 Tarjetas de Pilares */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative bg-[#0F2445]/70 hover:bg-[#0F2445] rounded-3xl p-7 border border-slate-800/80 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.accent} border border-slate-700/60 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>

                  <span className="text-xs font-mono text-amber-400/80 tracking-wider font-bold">
                    0{idx + 1}
                  </span>

                  <h3 className="mt-1 text-lg font-bold text-white tracking-tight font-heading">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Dedicación Andrea Tirado</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner de Filosofía */}
        <div className="mt-16 bg-gradient-to-r from-blue-950 via-[#0B1E38] to-blue-950 rounded-3xl p-6 sm:p-8 border border-blue-900/60 text-center shadow-xl">
          <p className="text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-widest mb-1">
            NUESTRA FILOSOFÍA DE MARCA
          </p>
          <p className="text-base sm:text-lg lg:text-xl font-black text-white tracking-wide font-heading">
            {BRAND_INFO.philosophy}
          </p>
        </div>
      </div>
    </section>
  );
};
