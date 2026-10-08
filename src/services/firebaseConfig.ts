/**
 * Módulo de arquitectura Firebase para Grooming Canino
 * Colecciones previstas:
 *  - 'appointments': Guarda el registro exhaustivo de citas de peluquería canina
 *  - 'availability': Configuración dinámica de días de atención, horarios y bloqueos
 */

import { Appointment, AvailabilityConfig } from '../types';

export interface FirebaseSchema {
  appointments: Record<string, Appointment>;
  availability: Record<string, AvailabilityConfig>;
}

/**
 * Plantilla de configuración Firebase Firestore.
 * Cuando se activen credenciales de entorno en el proyecto,
 * estas variables conectan el cliente de manera inmediata.
 */
export const FIREBASE_COLLECTIONS = {
  APPOINTMENTS: 'appointments',
  AVAILABILITY: 'availability'
} as const;

/**
 * Helper para formatear mensaje directo de WhatsApp
 */
export function buildWhatsAppBookingMessage(appointment: {
  clientName: string;
  petName: string;
  services: string[];
  date: string;
  time: string;
  modality: string;
  address?: string;
  id?: string;
}): string {
  const serviceList = appointment.services.join(', ');
  const addressText = appointment.address ? `\nDirección: ${appointment.address}` : '';
  const refText = appointment.id ? `\n(Solicitud N°: ${appointment.id})` : '';

  return `Hola Andrea, acabo de solicitar una cita en Grooming Canino.

Mascota: ${appointment.petName}
Servicio: ${serviceList}
Fecha: ${appointment.date}
Hora: ${appointment.time}
Modalidad: ${appointment.modality}${addressText}${refText}

Quedo atento/a a la confirmación.`;
}

export function openWhatsAppChat(phone: string, text: string) {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
