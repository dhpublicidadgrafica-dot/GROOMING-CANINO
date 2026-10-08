import React from 'react';
import { Calendar, Clock, Sparkles, Wind, Scissors, Hand, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { ServiceArtwork } from './DogIllustrations';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'deslanado':
        return <Wind className="w-5 h-5 text-blue-400" />;
      case 'corte-de-unas':
        return <Scissors className="w-5 h-5 text-amber-400" />;
      case 'bano-y-estetica':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'plucking':
        return <Hand className="w-5 h-5 text-amber-400" />;
      case 'stripping':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="servicios" className="py-20 bg-[#0B192C] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>PELUQUERÍA & CUIDADO ESPECIALIZADO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            NUESTROS SERVICIOS
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light">
            Procedimientos profesionales adaptados a la fisionomía, salud y bienestar específico de cada perro.
          </p>
        </div>

        {/* Grilla de servicios (Bento layout con armonía) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-[#0F2445]/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between group"
            >
              {/* Contenedor visual del servicio */}
              <div className="p-4 pb-0">
                <ServiceArtwork type={service.id} className="h-44 w-full" />
              </div>

              {/* Información y características */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 text-amber-400">
                      {getIcon(service.id)}
                      <span className="text-xs font-bold tracking-widest uppercase">Especialidad</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.durationApprox}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading mt-1">
                    {service.name}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-amber-300/90 italic">
                    &ldquo;{service.tagline}&rdquo;
                  </p>

                  <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
                    {service.description}
                  </p>

                  {/* Beneficios puntuales */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80">
                    <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      Detalles del cuidado:
                    </p>
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de conversión directo */}
                <div className="mt-7 pt-4">
                  <button
                    onClick={() => onSelectService(service.name)}
                    className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-amber-400/20 flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>AGENDAR ESTE SERVICIO</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
