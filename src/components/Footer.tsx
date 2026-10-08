import React from 'react';
import { Shield, MessageCircle, Calendar, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/servicesData';

interface FooterProps {
  onOpenBooking: () => void;
  onToggleAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onToggleAdmin }) => {
  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Antes y Después', href: '#antes-despues' },
    { label: 'Domicilio', href: '#domicilio' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-slate-900">
          {/* Marca & Filosofía */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black">
                GC
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                GROOMING <span className="text-amber-400">CANINO</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-amber-300 uppercase tracking-widest">
              {BRAND_INFO.philosophy}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-light">
              &ldquo;{BRAND_INFO.brandMessage}&rdquo;
            </p>

            <p className="text-xs text-slate-400 pt-2">
              Atención y cuidado por <span className="text-white font-semibold">{BRAND_INFO.manager}</span>
            </p>
          </div>

          {/* Enlaces de Navegación */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Navegación
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto Directo & Acciones */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Agendamiento
            </p>

            <div className="space-y-3">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>AGENDAR CITA</span>
              </button>

              <a
                href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hola, quiero agendar una cita para mi peludito con Grooming Canino.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {BRAND_INFO.whatsappNumber}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} GROOMING CANINO · {BRAND_INFO.manager}. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleAdmin}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 p-1 rounded cursor-pointer"
              title="Panel Administrativo"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Panel de Administración</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
