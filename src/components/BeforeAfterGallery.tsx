import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Heart, Check } from 'lucide-react';

interface TransformationCase {
  id: string;
  petName: string;
  breed: string;
  service: string;
  outcomeNote: string;
  beforeDetails: string;
  afterDetails: string;
}

const CASES: TransformationCase[] = [
  {
    id: 'case-1',
    petName: 'Milo',
    breed: 'Goldendoodle',
    service: 'Baño, Deslanado y Corte a Tijera',
    outcomeNote: 'Pelo sedoso, rostro despejado y volumen equilibrado sin nudos.',
    beforeDetails: 'Manto enredado con exceso de humedad y mechones tapando los ojos.',
    afterDetails: 'Acabado redondeado impecable, mirada libre y suavidad extrema.'
  },
  {
    id: 'case-2',
    petName: 'Lucas',
    breed: 'Schnauzer Miniatura',
    service: 'Stripping & Acabado de Patas y Cejas',
    outcomeNote: 'Textura de alambre preservada, cejas y barba estilizadas.',
    beforeDetails: 'Pelo maduro apagado, pérdida de definición en manto dorsal.',
    afterDetails: 'Línea de raza perfecta, textura áspera protectora y barba limpia.'
  },
  {
    id: 'case-3',
    petName: 'Simba',
    breed: 'Golden Retriever',
    service: 'Deslanado Profundo & Spa Relajante',
    outcomeNote: '80% menos caída de pelo en casa y piel sana oxigenada.',
    beforeDetails: 'Subpelo apelmazado reteniendo calor y causando picazón.',
    afterDetails: 'Manto ligero, brillante, completamente desenredado y fresco.'
  }
];

export const BeforeAfterGallery: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [viewState, setViewState] = useState<'after' | 'before' | 'both'>('both');

  const currentCase = CASES[activeCaseIdx];

  return (
    <section id="antes-despues" className="py-20 bg-slate-950 text-white relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>RESULTADOS VISIBLES & HIGIENE TOTAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            ANTES Y DESPUÉS
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light">
            Transformaciones que hablan por sí solas
          </p>
        </div>

        {/* Selector de Casos de Éxito */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          {CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveCaseIdx(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCaseIdx === idx
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span className="font-bold">{item.petName}</span> ({item.breed})
            </button>
          ))}
        </div>

        {/* Tarjeta de visualización interactiva */}
        <div className="mt-10 max-w-4xl mx-auto bg-[#0F2445]/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          {/* Ficha descriptiva */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                {currentCase.service}
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading mt-0.5">
                {currentCase.petName} · <span className="font-light text-slate-300 text-lg">{currentCase.breed}</span>
              </h3>
            </div>

            {/* Alternador de vista móvil/escritorio */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setViewState('before')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  viewState === 'before' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                ANTES
              </button>
              <button
                onClick={() => setViewState('both')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  viewState === 'both' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                COMPARAR
              </button>
              <button
                onClick={() => setViewState('after')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  viewState === 'after' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                DESPUÉS
              </button>
            </div>
          </div>

          {/* Grilla visual Antes y Después */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Tarjeta ANTES */}
            {(viewState === 'before' || viewState === 'both') && (
              <div className="group relative bg-slate-900/90 rounded-2xl overflow-hidden border border-rose-950/60 p-6 flex flex-col justify-between hover:border-rose-500/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black tracking-widest text-rose-400 uppercase bg-rose-950/60 border border-rose-800/40 px-3 py-1 rounded-md">
                      ESTADO ANTERIOR
                    </span>
                    <span className="text-xs text-slate-500">Llegada a sesión</span>
                  </div>

                  {/* Representación visual abstracta de alta estética */}
                  <div className="h-44 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 flex items-center justify-center p-4 text-center">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 mx-auto flex items-center justify-center text-rose-400 font-bold">
                        !
                      </div>
                      <p className="text-sm font-semibold text-slate-200">
                        {currentCase.beforeDetails}
                      </p>
                      <p className="text-xs text-slate-400">
                        Subpelo apelmazado, suciedad acumulada y nudos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
                  <span className="text-rose-300 font-medium">Requería:</span> Deslanado profundo y acondicionamiento.
                </div>
              </div>
            )}

            {/* Tarjeta DESPUÉS */}
            {(viewState === 'after' || viewState === 'both') && (
              <div className="group relative bg-slate-900/90 rounded-2xl overflow-hidden border border-emerald-950/60 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black tracking-widest text-emerald-300 uppercase bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-md flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> RESULTADO FINAL
                    </span>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current" /> Feliz y protegido
                    </span>
                  </div>

                  {/* Representación visual después */}
                  <div className="h-44 rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-900 border border-emerald-500/20 flex items-center justify-center p-4 text-center relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 font-bold">
                        ✓
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {currentCase.afterDetails}
                      </p>
                      <p className="text-xs text-amber-200/90">
                        Piel oxigenada, aroma fresco y tacto suave
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-emerald-300">
                  <span className="font-medium">Beneficio:</span> {currentCase.outcomeNote}
                </div>
              </div>
            )}
          </div>

          {/* Navegación y CTA de Galería */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCaseIdx((prev) => (prev > 0 ? prev - 1 : CASES.length - 1))}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Caso anterior"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {activeCaseIdx + 1} de {CASES.length} casos
              </span>
              <button
                onClick={() => setActiveCaseIdx((prev) => (prev < CASES.length - 1 ? prev + 1 : 0))}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Siguiente caso"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              QUIERO ESTE RESULTADO PARA MI PELUDITO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
