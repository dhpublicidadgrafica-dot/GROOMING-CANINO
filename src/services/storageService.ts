import { Appointment, AvailabilityConfig, AppointmentStatus } from '../types';

const APPOINTMENTS_STORAGE_KEY = 'grooming_canino_appointments_v1';
const AVAILABILITY_STORAGE_KEY = 'grooming_canino_availability_v1';

export const DEFAULT_AVAILABILITY: AvailabilityConfig = {
  days: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
  openingHour: '08:00',
  closingHour: '18:00',
  slotDurationMinutes: 120, // 2 horas por cita
  standardSlots: ['08:00', '10:00', '12:00', '14:00', '16:00'],
  blockedDates: [],
  blockedSlots: []
};

// Citas iniciales para demostración realista del sistema de disponibilidad y administración
const INITIAL_DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'GC-1001',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    clientName: 'Camila Restrepo',
    phone: '311 456 7890',
    email: 'camila.restrepo@email.com',
    petName: 'Bruno',
    petType: 'Perro',
    breed: 'Golden Retriever',
    age: '3 años',
    sex: 'Macho',
    weight: '32 kg',
    firstVisit: 'No',
    services: ['DESLANADO', 'BAÑO Y ESTÉTICA'],
    specialNotes: 'Piel algo sensible a champús fuertes.',
    behavior: 'Tranquilo/a',
    sensitiveAreas: 'No le gusta que le toquen la cola bruscamente.',
    date: new Date().toISOString().split('T')[0], // Hoy
    time: '08:00',
    modality: 'En el establecimiento',
    status: 'Confirmada'
  },
  {
    id: 'GC-1002',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    clientName: 'Juan Pablo Salazar',
    phone: '315 890 1234',
    email: 'juanpablo.s@email.com',
    petName: 'Mía',
    petType: 'Perro',
    breed: 'Schnauzer Miniatura',
    age: '2 años',
    sex: 'Hembra',
    weight: '7 kg',
    firstVisit: 'Sí',
    services: ['STRIPPING', 'CORTE DE UÑAS'],
    specialNotes: 'Primera vez haciendo stripping profesional.',
    behavior: 'Inquieto/a',
    sensitiveAreas: 'Ninguna conocida.',
    date: new Date().toISOString().split('T')[0], // Hoy
    time: '14:00',
    modality: 'A domicilio',
    address: 'Calle 45 # 18-32, Apto 402',
    neighborhood: 'Laureles',
    directions: 'Portería frente al parque de los almendros.',
    status: 'Pendiente'
  },
  {
    id: 'GC-1003',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    clientName: 'Mariana Duque',
    phone: '320 654 3210',
    email: 'mariana.d@email.com',
    petName: 'Kira',
    petType: 'Perro',
    breed: 'Pomerania',
    age: '1 año y medio',
    sex: 'Hembra',
    weight: '3.5 kg',
    firstVisit: 'No',
    services: ['BAÑO Y ESTÉTICA', 'CORTE DE UÑAS'],
    behavior: 'Nervioso/a',
    sensitiveAreas: 'Orejas sensibles.',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Mañana
    time: '10:00',
    modality: 'En el establecimiento',
    status: 'Confirmada'
  }
];

class StorageService {
  private appointments: Appointment[] = [];
  private availability: AvailabilityConfig = DEFAULT_AVAILABILITY;
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      const storedAppts = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (storedAppts) {
        this.appointments = JSON.parse(storedAppts);
      } else {
        this.appointments = INITIAL_DEMO_APPOINTMENTS;
        this.saveAppointments();
      }

      const storedAvail = localStorage.getItem(AVAILABILITY_STORAGE_KEY);
      if (storedAvail) {
        this.availability = { ...DEFAULT_AVAILABILITY, ...JSON.parse(storedAvail) };
      } else {
        this.availability = DEFAULT_AVAILABILITY;
        this.saveAvailability();
      }
    } catch {
      this.appointments = INITIAL_DEMO_APPOINTMENTS;
      this.availability = DEFAULT_AVAILABILITY;
    }
  }

  private saveAppointments() {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(this.appointments));
      this.notify();
    } catch (e) {
      console.error('Error saving appointments', e);
    }
  }

  private saveAvailability() {
    try {
      localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(this.availability));
      this.notify();
    } catch (e) {
      console.error('Error saving availability', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(cb => {
      try {
        cb();
      } catch (err) {
        console.error(err);
      }
    });
  }

  // Citas
  public getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  public getAppointmentById(id: string): Appointment | undefined {
    return this.appointments.find(a => a.id === id);
  }

  public updateAppointmentStatus(id: string, status: AppointmentStatus): boolean {
    const idx = this.appointments.findIndex(a => a.id === id);
    if (idx === -1) return false;
    this.appointments[idx] = {
      ...this.appointments[idx],
      status
    };
    this.saveAppointments();
    return true;
  }

  public deleteAppointment(id: string): boolean {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.saveAppointments();
    return true;
  }

  // Verificación de disponibilidad y prevención de doble reserva
  public isSlotAvailable(date: string, time: string, excludeId?: string): boolean {
    // 1. Revisar si la fecha está bloqueada
    if (this.availability.blockedDates.includes(date)) {
      return false;
    }

    // 2. Revisar si el horario específico está bloqueado administrativamente
    const isSlotBlocked = this.availability.blockedSlots.some(
      s => s.date === date && s.time === time
    );
    if (isSlotBlocked) {
      return false;
    }

    // 3. Revisar si el día de la semana está habilitado
    // (Parseando fecha YYYY-MM-DD sin desajustes de zona horaria)
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay(); // 0 a 6
    if (!this.availability.days.includes(dayOfWeek)) {
      return false;
    }

    // 4. Revisar si ya existe una cita activa (no cancelada) en esa fecha y hora
    const existing = this.appointments.find(
      a => a.date === date && a.time === time && a.status !== 'Cancelada' && a.id !== excludeId
    );

    return !existing;
  }

  public getAvailableSlotsForDate(date: string): { time: string; available: boolean; reason?: string }[] {
    const slots = this.availability.standardSlots;
    const isDateBlocked = this.availability.blockedDates.includes(date);

    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();
    const isWorkingDay = this.availability.days.includes(dayOfWeek);

    return slots.map(time => {
      if (!isWorkingDay) {
        return { time, available: false, reason: 'Día no laboral' };
      }
      if (isDateBlocked) {
        return { time, available: false, reason: 'Fecha bloqueada' };
      }
      const isSlotBlocked = this.availability.blockedSlots.some(
        s => s.date === date && s.time === time
      );
      if (isSlotBlocked) {
        return { time, available: false, reason: 'Horario reservado/bloqueado' };
      }
      const existing = this.appointments.find(
        a => a.date === date && a.time === time && a.status !== 'Cancelada'
      );
      if (existing) {
        return { time, available: false, reason: 'Horario ocupado' };
      }
      return { time, available: true };
    });
  }

  // Creación de cita con verificación estricta de doble reserva
  public createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): {
    success: boolean;
    appointment?: Appointment;
    error?: string;
  } {
    // Verificación atómica previa
    if (!this.isSlotAvailable(data.date, data.time)) {
      return {
        success: false,
        error: 'Este horario acaba de ser reservado. Por favor selecciona otro.'
      };
    }

    const uniqueId = `GC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      ...data,
      id: uniqueId,
      createdAt: new Date().toISOString(),
      status: 'Pendiente'
    };

    this.appointments.unshift(newAppointment);
    this.saveAppointments();

    return {
      success: true,
      appointment: newAppointment
    };
  }

  // Configuración de disponibilidad
  public getAvailabilityConfig(): AvailabilityConfig {
    return { ...this.availability };
  }

  public updateAvailabilityConfig(config: Partial<AvailabilityConfig>) {
    this.availability = {
      ...this.availability,
      ...config
    };
    this.saveAvailability();
  }

  public toggleBlockSlot(date: string, time: string): boolean {
    const exists = this.availability.blockedSlots.some(s => s.date === date && s.time === time);
    if (exists) {
      this.availability.blockedSlots = this.availability.blockedSlots.filter(
        s => !(s.date === date && s.time === time)
      );
    } else {
      this.availability.blockedSlots.push({ date, time });
    }
    this.saveAvailability();
    return !exists;
  }

  public toggleBlockDate(date: string): boolean {
    const idx = this.availability.blockedDates.indexOf(date);
    if (idx >= 0) {
      this.availability.blockedDates.splice(idx, 1);
      this.saveAvailability();
      return false; // Desbloqueado
    } else {
      this.availability.blockedDates.push(date);
      this.saveAvailability();
      return true; // Bloqueado
    }
  }

  public resetDemoData() {
    this.appointments = INITIAL_DEMO_APPOINTMENTS;
    this.availability = DEFAULT_AVAILABILITY;
    this.saveAppointments();
    this.saveAvailability();
  }
}

export const storageService = new StorageService();
