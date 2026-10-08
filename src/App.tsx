/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { HomeServiceSection } from './components/HomeServiceSection';
import { BookingWizard } from './components/BookingWizard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';
import { ModalityType } from './types';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedModality, setPreselectedModality] = useState<ModalityType>('En el establecimiento');

  const scrollToBooking = (service?: string, modality?: ModalityType) => {
    if (isAdminOpen) {
      setIsAdminOpen(false);
    }
    if (service) {
      setPreselectedService(service);
    }
    if (modality) {
      setPreselectedModality(modality);
    }

    // Scroll suave a la sección del wizard
    setTimeout(() => {
      const el = document.getElementById('agenda-tu-cita');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectService = (serviceName: string) => {
    scrollToBooking(serviceName, undefined);
  };

  const handleSelectHomeService = () => {
    scrollToBooking(undefined, 'A domicilio');
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Barra de Navegación Fija */}
      <Header
        onOpenBooking={() => scrollToBooking()}
        isAdminOpen={isAdminOpen}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
      />

      <main className="flex-1">
        {isAdminOpen ? (
          /* Vista de Administración para Andrea Tirado */
          <AdminDashboard onClose={() => setIsAdminOpen(false)} />
        ) : (
          /* Vista Principal del Negocio */
          <>
            {/* 1. INICIO / HERO */}
            <Hero onOpenBooking={() => scrollToBooking()} />

            {/* 2. NOSOTROS */}
            <AboutSection />

            {/* 3. SERVICIOS */}
            <ServicesSection onSelectService={handleSelectService} />

            {/* 4. ANTES Y DESPUÉS */}
            <BeforeAfterGallery onOpenBooking={() => scrollToBooking()} />

            {/* 5. SERVICIO A DOMICILIO */}
            <HomeServiceSection onOpenBookingHome={handleSelectHomeService} />

            {/* 6. AGENDA TU CITA (Formulario Inteligente de Agendamiento) */}
            <BookingWizard
              initialService={preselectedService}
              initialModality={preselectedModality}
            />

            {/* 7. CONTACTO */}
            <ContactSection onOpenBooking={() => scrollToBooking()} />
          </>
        )}
      </main>

      {/* Pie de Página */}
      <Footer
        onOpenBooking={() => scrollToBooking()}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
      />

      {/* Botón Flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
