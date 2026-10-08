import React from 'react';
import { CheckCircle2, MessageCircle, Calendar, MapPin, Sparkles, User, Heart } from 'lucide-react';
import { Appointment } from '../types';
import { BRAND_INFO } from '../data/servicesData';
import { buildWhatsAppBookingMessage, openWhatsAppChat } from '../services/firebaseConfig';

interface BookingConfirmationProps {
  appointment: Appointment;
  onReset: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ appointment, onReset }) => {
  const handleConfirmWhatsApp = () => {
    const text = buildWhatsAppBookingMessage({
      clientName: appointment.clientName,
      petName: appointment.petName,
      services: appointment.services,
      date: appointment.date,
      time: appointment.time,
      modality: appointment.modality,
      address: appointment.modality === 'A domicilio' ? `${appointment.address} (${appointment.neighborhood || ''})` : undefined,
      id: appointment.id
    });
    openWhatsAppChat(BRAND_INFO.whatsappRaw, text);
  };

  return (
    <div className="bg-[#0F2445] rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl text-white max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
      {/* Icono y cabecera de éxito */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 border-2 border-emerald-400/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          ¡Solicitud de cita recibida! 🐾
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
          Gracias por confiar en <span className="font-bold text-amber-400">Grooming Canino</span>. Hemos recibido tu solicitud de agendamiento.
        </p>
      </div>

      {/* Tarjeta de Resumen con ID de seguimiento */}
      <div className="mt-8 bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">Número de solicitud:</span>
          <span className="text-sm font-mono font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-800/40">
            #{appointment.id}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 text-xs">Mascota:</p>
              <p className="font-semibold text-white">{appointment.petName} ({appointment.breed})</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 text-xs">Cliente:</p>
              <p className="font-semibold text-white">{appointment.clientName}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 text-xs">Servicio(s):</p>
              <p className="font-semibold text-white">{appointment.services.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 text-xs">Fecha y Hora:</p>
              <p className="font-semibold text-white">{appointment.date} · {appointment.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:col-span-2">
            <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 text-xs">Modalidad:</p>
              <p className="font-semibold text-white">
                {appointment.modality}
                {appointment.modality === 'A domicilio' && appointment.address ? ` (${appointment.address})` : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón principal: CONFIRMAR POR WHATSAPP */}
      <div className="mt-8 space-y-3">
        <button
          onClick={handleConfirmWhatsApp}
          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>CONFIRMAR POR WHATSAPP</span>
        </button>

        <p className="text-xs text-center text-slate-400">
          Se abrirá WhatsApp directamente con Andrea Tirado ({BRAND_INFO.whatsappNumber}) con todos los detalles de tu cita preparados.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={onReset}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
          >
            Agendar otra cita o volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
