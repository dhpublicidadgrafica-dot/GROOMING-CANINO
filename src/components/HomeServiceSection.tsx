import React from 'react';
import { Home, ShieldCheck, Heart, Car, Smile, Calendar, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/servicesData';

interface HomeServiceSectionProps {
  onOpenBookingHome: () => void;
}

export const HomeServiceSection: React.FC<HomeServiceSectionProps> = ({ onOpenBookingHome }) => {
  const benefits = [
    {
      title: 'Comodidad total',
      description: 'Tu peludito se queda en el calor de su hogar, sin esperas ni desplazamientos pesados.',
      icon: Home,
      accent: 'text-amber-400 bg-amber-500/10'
    },
    {
      title: 'Menos desplazamientos',
      description: 'Ahorras tiempo en el tráfico, parqueaderos o tener que coordinar trayectos con jaulas.',
      icon: Car,
      accent: 'text-blue-400 bg-blue-500/10'
    },
    {
      title: 'Atención personalizada',
      description: 'Andrea atiende de manera exclusiva a tu compañero, con calma y sin prisas.',
      icon: Heart,
      accent: 'text-rose-400 bg-rose-500/10'
    },
    {
      title: 'Mayor tranquilidad para la mascota',
      description: 'Especialmente ideal para perros mayores, nerviosos o que se marean en el vehículo.',
      icon: Smile,
      accent: 'text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <section id="domicilio" className="py-20 bg-gradient-to-b from-[#0B192C] via-[#0F2445] to-[#0B192C] text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado izquierdo: Explicación y Beneficios */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>SERVICIO A DOMICILIO EXCLUSIVO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight text-balance">
              Tu peludito también puede recibir atención en casa
            </h2>

            <div className="p-4 sm:p-5 bg-amber-400/10 border-l-4 border-amber-400 rounded-r-2xl max-w-xl mx-auto lg:mx-0 text-left">
              <p className="text-lg sm:text-xl font-bold text-amber-300 italic">
                &ldquo;{BRAND_INFO.homeServiceTagline}&rdquo;
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Llevamos todo el equipo higienizado y profesional directamente hasta tu puerta.
              </p>
            </div>

            {/* 4 Beneficios principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-400/30 transition-colors flex items-start gap-3.5"
                  >
                    <div className={`p-2.5 rounded-xl ${b.accent} shrink-0 mt-0.5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-heading">
                        {b.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Especial Servicio a Domicilio */}
            <div className="pt-4">
              <button
                onClick={onOpenBookingHome}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>AGENDAR SERVICIO A DOMICILIO</span>
              </button>
            </div>
          </div>

          {/* Lado derecho: Ilustración estilizada de visita domiciliaria */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Protocolo de Higiene en Casa</h4>
                  <p className="text-xs text-slate-400">Sin dejar desorden en tu espacio</p>
                </div>
              </div>

              <div className="space-y-4 py-6">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Llevamos mesa plegable profesional y toallas esterilizadas de uso individual.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Cuidado amoroso con el ritmo que tu perro necesita, sin prisa ni otros animales presentes.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Recogemos y aspiramos los restos de pelo al terminar. Tu casa queda impecable.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  Atención directa y responsable: <span className="text-amber-400 font-bold">Andrea Tirado</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
