export type AppointmentStatus = 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';

export type PetBehavior = 'Tranquilo/a' | 'Nervioso/a' | 'Inquieto/a' | 'Agresivo/a' | 'No estoy seguro/a';

export type ModalityType = 'En el establecimiento' | 'A domicilio';

export interface Appointment {
  id: string;
  createdAt: string;
  clientName: string;
  phone: string;
  email?: string;
  petName: string;
  petType: string;
  breed: string;
  age: string;
  sex: 'Macho' | 'Hembra';
  weight: string;
  firstVisit: 'Sí' | 'No';
  services: string[];
  specialNotes?: string;
  behavior: PetBehavior;
  sensitiveAreas?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  modality: ModalityType;
  address?: string;
  neighborhood?: string;
  directions?: string;
  status: AppointmentStatus;
}

export interface BookingFormData {
  // Paso 1: Cliente
  clientName: string;
  phone: string;
  email: string;

  // Paso 2: Mascota
  petName: string;
  petType: string;
  breed: string;
  age: string;
  sex: 'Macho' | 'Hembra';
  weight: string;
  firstVisit: 'Sí' | 'No';

  // Paso 3: Servicios & Modalidad
  services: string[];
  modality: ModalityType;
  address: string;
  neighborhood: string;
  directions: string;

  // Paso 4: Información especial
  specialNotes: string;
  behavior: PetBehavior;
  sensitiveAreas: string;

  // Paso 5: Fecha y Hora
  date: string;
  time: string;
}

export interface AvailabilityConfig {
  days: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  openingHour: string; // e.g. "08:00"
  closingHour: string; // e.g. "18:00"
  slotDurationMinutes: number; // e.g. 120 (2 horas)
  standardSlots: string[]; // ["08:00", "10:00", "12:00", "14:00", "16:00"]
  blockedDates: string[]; // ["2026-10-15"]
  blockedSlots: { date: string; time: string }[];
}

export interface GroomingServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  durationApprox: string;
  idealFor: string;
  features: string[];
  iconName: string;
}
