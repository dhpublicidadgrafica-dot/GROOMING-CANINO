import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, PhoneCall } from 'lucide-react';
import { BRAND_INFO } from '../data/servicesData';

interface HeaderProps {
  onOpenBooking: () => void;
  isAdminOpen: boolean;
  onToggleAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  isAdminOpen,
  onToggleAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Antes y Después', href: '#antes-despues' },
    { label: 'Domicilio', href: '#domicilio' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isAdminOpen) {
      onToggleAdmin(); // Regresa a vista pública si estaba en admin
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B192C]/95 backdrop-blur-md shadow-lg shadow-black/10 py-3 border-b border-slate-800'
          : 'bg-[#0B192C] py-4 border-b border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Zone 1: Brand Wordmark (Single text element according to Top Bar Contract) */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="flex items-center gap-2.5 text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <circle cx="8" cy="6" r="2.5" />
                <circle cx="16" cy="6" r="2.5" />
                <circle cx="4.5" cy="11.5" r="2.2" />
                <circle cx="19.5" cy="11.5" r="2.2" />
                <path d="M12 11c-3.5 0-6 2.5-6 6 0 2 2 4 6 4s6-2 6-4c0-3.5-2.5-6-6-6z" />
              </svg>
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-white uppercase font-heading whitespace-nowrap">
              GROOMING <span className="text-amber-400">CANINO</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (Clean text with hover indicators) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-amber-400 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Administration Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Admin Access Button for Andrea Tirado */}
            <button
              onClick={onToggleAdmin}
              title={isAdminOpen ? 'Volver al Sitio' : 'Panel Andrea Tirado'}
              className={`p-2 rounded-lg text-xs font-medium transition-colors border ${
                isAdminOpen
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border-slate-700/60'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="sr-only">Panel Administrativo</span>
            </button>

            {/* WhatsApp direct contact icon (desktop) */}
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Hola, quiero agendar una cita para mi peludito con Grooming Canino.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center p-2 rounded-lg text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 transition-colors"
              title="WhatsApp Andrea Tirado"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            {/* CTA Principal: AGENDAR CITA */}
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-md hover:shadow-amber-400/20 text-xs sm:text-sm tracking-wide uppercase transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
            >
              AGENDAR CITA
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F2445] border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-xl shadow text-center uppercase tracking-wider text-sm transition-colors"
              >
                AGENDAR CITA AHORA
              </button>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hola, quiero agendar una cita para mi peludito con Grooming Canino.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" /> Escribir al WhatsApp (322 579 8718)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleAdmin();
                }}
                className="w-full py-2 px-3 text-slate-400 hover:text-slate-200 text-xs text-center flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                {isAdminOpen ? 'Cerrar panel administrativo' : 'Acceso de gestión (Andrea Tirado)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
