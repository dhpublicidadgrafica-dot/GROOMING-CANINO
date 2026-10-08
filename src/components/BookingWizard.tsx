import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Dog, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  MapPin, 
  HelpCircle,
  X
} from 'lucide-react';
import { BookingFormData, PetBehavior, ModalityType, Appointment } from '../types';
import { storageService } from '../services/storageService';
import { BookingConfirmation } from './BookingConfirmation';

interface BookingWizardProps {
  initialService?: string;
  initialModality?: ModalityType;
  onClose?: () => void;
}

const AVAILABLE_SERVICES = [
  { id: 'deslanado', name: 'Deslanado', desc: 'Retira el pelo muerto y reduce la muda' },
  { id: 'corte-de-unas', name: 'Corte de uñas', desc: 'Corte con calma y sin estrés' },
  { id: 'bano-y-estetica', name: 'Baño y estética', desc: 'Productos premium según el tipo de pelaje' },
  { id: 'plucking', name: 'Plucking', desc: 'Retiro manual del pelo muerto' },
  { id: 'stripping', name: 'Stripping', desc: 'Conserva la textura del pelo duro' },
];

const BEHAVIOR_OPTIONS: PetBehavior[] = [
  'Tranquilo/a',
  'Nervioso/a',
  'Inquieto/a',
  'Agresivo/a',
  'No estoy seguro/a'
];

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialService,
  initialModality = 'En el establecimiento',
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    phone: '',
    email: '',
    petName: '',
    petType: 'Perro',
    breed: '',
    age: '',
    sex: 'Macho',
    weight: '',
    firstVisit: 'Sí',
    services: initialService ? [initialService] : ['Baño y estética'],
    modality: initialModality,
    address: '',
    neighborhood: '',
    directions: '',
    specialNotes: '',
    behavior: 'Tranquilo/a',
    sensitiveAreas: '',
    date: '',
    time: ''
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fechas disponibles para los próximos 30 días
  const today = new Date();
  const minDateStr = today.toISOString().split('T')[0];

  // Si se actualizan props iniciales
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.includes(initialService) ? prev.services : [...prev.services, initialService]
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialModality) {
      setFormData(prev => ({ ...prev, modality: initialModality }));
    }
  }, [initialModality]);

  // Actualizar slots cuando cambie la fecha
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean; reason?: string }[]>([]);

  useEffect(() => {
    if (formData.date) {
      const slots = storageService.getAvailableSlotsForDate(formData.date);
      setTimeSlots(slots);
      // Si el horario seleccionado ya no está disponible, deseleccionarlo
      if (formData.time) {
        const slot = slots.find(s => s.time === formData.time);
        if (!slot || !slot.available) {
          setFormData(prev => ({ ...prev, time: '' }));
        }
      }
    } else {
      setTimeSlots([]);
    }
  }, [formData.date, formData.time]);

  // Validaciones por paso
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.clientName.trim()) {
        errs.clientName = 'Ingresa tu nombre completo.';
      }
      if (!formData.phone.trim()) {
        errs.phone = 'Ingresa un número de WhatsApp válido.';
      } else if (formData.phone.replace(/\D/g, '').length < 7) {
        errs.phone = 'Ingresa un número de teléfono o celular válido.';
      }
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Ingresa un correo electrónico válido o déjalo vacío.';
      }
    }

    if (step === 2) {
      if (!formData.petName.trim()) {
        errs.petName = 'Ingresa el nombre de tu mascota.';
      }
      if (!formData.breed.trim()) {
        errs.breed = 'Ingresa la raza o cruce de tu perrito.';
      }
      if (!formData.age.trim()) {
        errs.age = 'Ingresa la edad aproximada (ej: 2 años, 6 meses).';
      }
      if (!formData.weight.trim()) {
        errs.weight = 'Ingresa el peso aproximado (ej: 4 kg, 18 kg).';
      }
    }

    if (step === 3) {
      if (formData.services.length === 0) {
        errs.services = 'Selecciona al menos un servicio para tu mascota.';
      }
      if (formData.modality === 'A domicilio') {
        if (!formData.address.trim()) {
          errs.address = 'Ingresa la dirección exacta donde atenderemos a tu peludito.';
        }
        if (!formData.neighborhood.trim()) {
          errs.neighborhood = 'Ingresa el barrio o sector.';
        }
      }
    }

    if (step === 4) {
      // Información especial opcional, pero aseguramos selección de comportamiento
      if (!formData.behavior) {
        errs.behavior = 'Selecciona el comportamiento habitual.';
      }
    }

    if (step === 5) {
      if (!formData.date) {
        errs.date = 'Selecciona una fecha en el calendario.';
      }
      if (!formData.time) {
        errs.time = 'Selecciona un horario disponible.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setBookingError(null);
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    setBookingError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const toggleService = (serviceName: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(serviceName);
      const newServices = exists
        ? prev.services.filter(s => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services: newServices };
    });
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  // Enviar y verificar disponibilidad en tiempo real
  const handleConfirmBooking = () => {
    // 1. Doble verificación estricta de disponibilidad
    const isFree = storageService.isSlotAvailable(formData.date, formData.time);
    if (!isFree) {
      setBookingError('Este horario acaba de ser reservado. Por favor selecciona otro.');
      setCurrentStep(5); // Regresa al paso de fecha y hora
      return;
    }

    // 2. Creación
    const result = storageService.createAppointment({
      clientName: formData.clientName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      petName: formData.petName.trim(),
      petType: 'Perro',
      breed: formData.breed.trim(),
      age: formData.age.trim(),
      sex: formData.sex,
      weight: formData.weight.trim(),
      firstVisit: formData.firstVisit,
      services: formData.services,
      specialNotes: formData.specialNotes.trim() || undefined,
      behavior: formData.behavior,
      sensitiveAreas: formData.sensitiveAreas.trim() || undefined,
      date: formData.date,
      time: formData.time,
      modality: formData.modality,
      address: formData.modality === 'A domicilio' ? formData.address.trim() : undefined,
      neighborhood: formData.modality === 'A domicilio' ? formData.neighborhood.trim() : undefined,
      directions: formData.modality === 'A domicilio' ? formData.directions.trim() : undefined,
    });

    if (result.success && result.appointment) {
      setConfirmedAppointment(result.appointment);
    } else {
      setBookingError(result.error || 'Ocurrió un error al registrar la cita. Intenta de nuevo.');
      setCurrentStep(5);
    }
  };

  const handleResetForm = () => {
    setConfirmedAppointment(null);
    setCurrentStep(1);
    setFormData({
      clientName: '',
      phone: '',
      email: '',
      petName: '',
      petType: 'Perro',
      breed: '',
      age: '',
      sex: 'Macho',
      weight: '',
      firstVisit: 'Sí',
      services: ['Baño y estética'],
      modality: 'En el establecimiento',
      address: '',
      neighborhood: '',
      directions: '',
      specialNotes: '',
      behavior: 'Tranquilo/a',
      sensitiveAreas: '',
      date: '',
      time: ''
    });
  };

  // Si ya se confirmó la cita, mostrar pantalla de confirmación
  if (confirmedAppointment) {
    return (
      <section id="agenda-tu-cita" className="py-16 sm:py-24 bg-[#0B192C] px-4">
        <BookingConfirmation
          appointment={confirmedAppointment}
          onReset={handleResetForm}
        />
      </section>
    );
  }

  const stepsHeader = [
    { num: 1, label: 'Tus Datos' },
    { num: 2, label: 'Tu Peludito' },
    { num: 3, label: 'Servicios' },
    { num: 4, label: 'Cuidado' },
    { num: 5, label: 'Fecha & Hora' },
    { num: 6, label: 'Confirmar' },
  ];

  return (
    <section id="agenda-tu-cita" className="py-16 sm:py-24 bg-[#0B192C] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Cabecera del Wizard */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>AGENDAMIENTO EN LÍNEA INTELIGENTE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Agenda la cita de tu peludito
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light">
            Selecciona el cuidado ideal con Andrea Tirado. Registro guiado en 6 sencillos pasos.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="bg-[#0F2445]/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl mb-8">
          <div className="flex items-center justify-between relative">
            {/* Barra conectora */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 -z-0" />
            <div 
              className="absolute top-1/2 left-4 h-0.5 bg-amber-400 -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (stepsHeader.length - 1)) * 95}%` }}
            />

            {stepsHeader.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) {
                    setCurrentStep(s.num);
                  }
                }}
                disabled={s.num > currentStep}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus-visible:outline-none"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                    currentStep === s.num
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 scale-110 shadow-lg'
                      : currentStep > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[10px] sm:text-xs mt-1.5 hidden sm:block font-medium ${
                  currentStep === s.num ? 'text-amber-300 font-bold' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notificación de Error Global (por ejemplo, si el horario fue ocupado) */}
        {bookingError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 flex items-start gap-3 animate-in shake">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Atención</p>
              <p className="text-xs sm:text-sm mt-0.5">{bookingError}</p>
            </div>
          </div>
        )}

        {/* Tarjeta del Formulario Actual */}
        <div className="bg-[#0F2445] rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl">
          
          {/* PASO 1 — DATOS DEL CLIENTE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">PASO 1 DE 6</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2 mt-1">
                  <User className="w-6 h-6 text-amber-400" />
                  Datos del Responsable
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Información para contactarte y coordinar la cita de tu peludito.
                </p>
              </div>

              <div className="space-y-4">
                {/* Nombre completo */}
                <div>
                  <label htmlFor="clientName" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Nombre completo <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => {
                      setFormData({ ...formData, clientName: e.target.value });
                      if (errors.clientName) setErrors({ ...errors, clientName: '' });
                    }}
                    placeholder="Ej: Camila Restrepo"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.clientName ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700'
                    }`}
                  />
                  {errors.clientName && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.clientName}
                    </p>
                  )}
                </div>

                {/* Teléfono / WhatsApp */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Teléfono / WhatsApp <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="Ej: 322 579 8718"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.phone ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700'
                    }`}
                  />
                  {errors.phone ? (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Te enviaremos la confirmación directa a este WhatsApp.
                    </p>
                  )}
                </div>

                {/* Correo electrónico */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Correo electrónico <span className="text-slate-500 font-normal">(Opcional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="ejemplo@correo.com"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.email ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PASO 2 — DATOS DE LA MASCOTA */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">PASO 2 DE 6</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2 mt-1">
                  <Dog className="w-6 h-6 text-amber-400" />
                  Datos de tu Peludito
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Cuéntanos sobre tu perro para preparar el instrumental y cosmética ideal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre de la mascota */}
                <div>
                  <label htmlFor="petName" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Nombre del peludito <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="petName"
                    type="text"
                    value={formData.petName}
                    onChange={(e) => {
                      setFormData({ ...formData, petName: e.target.value });
                      if (errors.petName) setErrors({ ...errors, petName: '' });
                    }}
                    placeholder="Ej: Bruno, Kira, Toby"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.petName ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700'
                    }`}
                  />
                  {errors.petName && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.petName}
                    </p>
                  )}
                </div>

                {/* Raza */}
                <div>
                  <label htmlFor="breed" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Raza o Cruce <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="breed"
                    type="text"
                    value={formData.breed}
                    onChange={(e) => {
                      setFormData({ ...formData, breed: e.target.value });
                      if (errors.breed) setErrors({ ...errors, breed: '' });
                    }}
                    placeholder="Ej: Schnauzer, Golden, Poodle, Mestizo"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.breed ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700'
                    }`}
                  />
                  {errors.breed && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.breed}
                    </p>
                  )}
                </div>

                {/* Edad */}
                <div>
                  <label htmlFor="age" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Edad aproximada <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="age"
                    type="text"
                    value={formData.age}
                    onChange={(e) => {
                      setFormData({ ...formData, age: e.target.value });
                      if (errors.age) setErrors({ ...errors, age: '' });
                    }}
                    placeholder="Ej: 3 años, 8 meses"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.age ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700'
                    }`}
                  />
                  {errors.age && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.age}
                    </p>
                  )}
                </div>

                {/* Peso aproximado */}
                <div>
                  <label htmlFor="weight" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Peso aproximado <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="weight"
                    type="text"
                    value={formData.weight}
                    onChange={(e) => {
                      setFormData({ ...formData, weight: e.target.value });
                      if (errors.weight) setErrors({ ...errors, weight: '' });
                    }}
                    placeholder="Ej: 7 kg, 25 kg"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.weight ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700'
                    }`}
                  />
                  {errors.weight && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.weight}
                    </p>
                  )}
                </div>

                {/* Sexo */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Sexo
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Macho', 'Hembra'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({ ...formData, sex: s })}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formData.sex === s
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primera vez */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    ¿Es la primera vez que nos visitas?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Sí', 'No'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, firstVisit: opt })}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formData.firstVisit === opt
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 3 — SERVICIOS Y MODALIDAD */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">PASO 3 DE 6</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2 mt-1">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  Servicios & Modalidad
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Puedes seleccionar uno o varios servicios según las necesidades de tu perro.
                </p>
              </div>

              {/* Selección de servicios */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                  Selecciona los servicios requeridos <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_SERVICES.map((srv) => {
                    const isSelected = formData.services.some(
                      s => s.toLowerCase() === srv.name.toLowerCase()
                    );
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.name)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isSelected
                            ? 'bg-amber-400/15 border-amber-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isSelected
                              ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold'
                              : 'border-slate-600 bg-slate-800'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{srv.name}</p>
                          <p className="text-xs text-slate-400 leading-snug mt-0.5">{srv.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.services && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.services}
                  </p>
                )}
              </div>

              {/* Modalidad de atención */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                  Modalidad de atención <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['En el establecimiento', 'A domicilio'] as const).map((m) => {
                    const isSel = formData.modality === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFormData({ ...formData, modality: m })}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                          isSel
                            ? 'bg-amber-400/20 border-amber-400 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <p className="text-sm font-bold text-white">{m}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {m === 'En el establecimiento'
                            ? 'Atención en nuestro espacio equipado y tranquilo.'
                            : 'Andrea va hasta tu casa, sin que tu peludito salga.'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Si es A domicilio: Dirección y Barrio obligatorios */}
              {formData.modality === 'A domicilio' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>Datos de tu domicilio</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-xs font-semibold text-slate-300 mb-1">
                        Dirección exacta <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          if (errors.address) setErrors({ ...errors, address: '' });
                        }}
                        placeholder="Ej: Calle 45 # 18-32, Apto 402"
                        className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                          errors.address ? 'border-rose-500 bg-rose-950/20' : 'border-slate-700'
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-rose-400">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="neighborhood" className="block text-xs font-semibold text-slate-300 mb-1">
                        Barrio / Sector <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="neighborhood"
                        type="text"
                        value={formData.neighborhood}
                        onChange={(e) => {
                          setFormData({ ...formData, neighborhood: e.target.value });
                          if (errors.neighborhood) setErrors({ ...errors, neighborhood: '' });
                        }}
                        placeholder="Ej: Laureles, Poblado, Belén"
                        className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                          errors.neighborhood ? 'border-rose-500 bg-rose-950/20' : 'border-slate-700'
                        }`}
                      />
                      {errors.neighborhood && (
                        <p className="mt-1 text-xs text-rose-400">{errors.neighborhood}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="directions" className="block text-xs font-semibold text-slate-300 mb-1">
                        Indicaciones para llegar <span className="text-slate-500 font-normal">(Opcional)</span>
                      </label>
                      <input
                        id="directions"
                        type="text"
                        value={formData.directions}
                        onChange={(e) => setFormData({ ...formData, directions: e.target.value })}
                        placeholder="Ej: Portería frente al parque, timbre 402, casa blanca"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PASO 4 — INFORMACIÓN ESPECIAL */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">PASO 4 DE 6</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2 mt-1">
                  <HelpCircle className="w-6 h-6 text-amber-400" />
                  Cuidado & Temperamento
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Esta información permite a Andrea planificar el ritmo y la delicadeza precisa para la sesión.
                </p>
              </div>

              <div className="space-y-5">
                {/* Comportamiento */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    ¿Cómo se comporta normalmente durante el grooming? <span className="text-amber-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {BEHAVIOR_OPTIONS.map((beh) => {
                      const isSel = formData.behavior === beh;
                      return (
                        <button
                          key={beh}
                          type="button"
                          onClick={() => setFormData({ ...formData, behavior: beh })}
                          className={`py-3 px-3.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                            isSel
                              ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          {beh}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Condición especial */}
                <div>
                  <label htmlFor="specialNotes" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    ¿Tu mascota tiene alguna condición especial que debamos conocer?
                  </label>
                  <textarea
                    id="specialNotes"
                    rows={3}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="Ej: Es de edad avanzada, tiene displasia en cadera, alergia a champú de avena, problemas cardíacos, etc."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>

                {/* Zonas sensibles */}
                <div>
                  <label htmlFor="sensitiveAreas" className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    ¿Tiene alguna zona sensible o que prefiera evitar? <span className="text-slate-500 font-normal">(Opcional)</span>
                  </label>
                  <input
                    id="sensitiveAreas"
                    type="text"
                    value={formData.sensitiveAreas}
                    onChange={(e) => setFormData({ ...formData, sensitiveAreas: e.target.value })}
                    placeholder="Ej: No le gusta que le toquen las patitas traseras o las orejas"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASO 5 — FECHA Y HORA */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">PASO 5 DE 6</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2 mt-1">
                  <CalendarIcon className="w-6 h-6 text-amber-400" />
                  Fecha y Horario Disponible
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Disponibilidad en tiempo real para evitar cualquier cruce de horarios.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selector de Fecha */}
                <div>
                  <label htmlFor="datePicker" className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Selecciona el día <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="datePicker"
                    type="date"
                    min={minDateStr}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value, time: '' });
                      if (errors.date) setErrors({ ...errors, date: '' });
                    }}
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm ${
                      errors.date ? 'border-rose-500 bg-rose-950/20' : 'border-slate-700'
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2">
                    * Atendemos citas programadas con cupos limitados para garantizar calma y dedicación.
                  </p>
                </div>

                {/* Selector de Horarios Disponibles */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Horario disponible <span className="text-amber-400">*</span>
                  </label>

                  {!formData.date ? (
                    <div className="p-8 rounded-xl bg-slate-900/60 border border-dashed border-slate-800 text-center text-slate-400 text-xs">
                      Primero selecciona una fecha para consultar los turnos disponibles.
                    </div>
                  ) : timeSlots.length === 0 ? (
                    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
                      No hay horarios configurados para este día.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {timeSlots.map((slot) => {
                        const isSelected = formData.time === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => {
                              if (slot.available) {
                                setFormData({ ...formData, time: slot.time });
                                if (errors.time) setErrors({ ...errors, time: '' });
                              }
                            }}
                            className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center cursor-pointer ${
                              !slot.available
                                ? 'bg-slate-900/40 text-slate-600 border-slate-800 cursor-not-allowed opacity-60 line-through'
                                : isSelected
                                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md scale-105'
                                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-400/50'
                            }`}
                          >
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {slot.time}
                            </span>
                            {!slot.available && (
                              <span className="text-[9px] mt-0.5 no-underline">Ocupado</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {errors.time && (
                    <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.time}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PASO 6 — CONFIRMACIÓN Y RESUMEN */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">PASO 6 DE 6</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  Verificación de Datos
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Revisa con atención que todos los datos estén correctos antes de enviar tu solicitud.
                </p>
              </div>

              {/* Ficha Resumen */}
              <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {/* CLIENTE */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <p className="text-slate-400 text-[11px] uppercase font-bold text-amber-400">CLIENTE</p>
                    <p className="font-semibold text-white mt-1">{formData.clientName}</p>
                    <p className="text-slate-300 text-xs">WhatsApp: {formData.phone}</p>
                    {formData.email && <p className="text-slate-400 text-xs">{formData.email}</p>}
                  </div>

                  {/* MASCOTA */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <p className="text-slate-400 text-[11px] uppercase font-bold text-amber-400">MASCOTA</p>
                    <p className="font-semibold text-white mt-1">{formData.petName} ({formData.breed})</p>
                    <p className="text-slate-300 text-xs">Edad: {formData.age} · Sexo: {formData.sex} · Peso: {formData.weight}</p>
                    <p className="text-slate-400 text-xs">Primera vez: {formData.firstVisit}</p>
                  </div>

                  {/* SERVICIO */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <p className="text-slate-400 text-[11px] uppercase font-bold text-amber-400">SERVICIOS SELECCIONADOS</p>
                    <p className="font-semibold text-white mt-1">{formData.services.join(', ')}</p>
                    <p className="text-slate-400 text-xs mt-1">Comportamiento: {formData.behavior}</p>
                  </div>

                  {/* FECHA Y HORA */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <p className="text-slate-400 text-[11px] uppercase font-bold text-amber-400">FECHA Y HORA</p>
                    <p className="font-semibold text-white mt-1">{formData.date}</p>
                    <p className="text-emerald-400 font-bold text-xs mt-0.5">Turno: {formData.time}</p>
                  </div>

                  {/* MODALIDAD Y DIRECCIÓN */}
                  <div className="sm:col-span-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <p className="text-slate-400 text-[11px] uppercase font-bold text-amber-400">MODALIDAD DE ATENCIÓN</p>
                    <p className="font-semibold text-white mt-1">{formData.modality}</p>
                    {formData.modality === 'A domicilio' && (
                      <p className="text-slate-300 text-xs mt-1">
                        Dirección: <span className="text-white font-medium">{formData.address}</span>, Barrio: <span className="text-white font-medium">{formData.neighborhood}</span>
                        {formData.directions && <span> ({formData.directions})</span>}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-sm font-bold text-amber-300">
                    ¿Los datos son correctos?
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botonera de Navegación del Stepper */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ANTERIOR</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md hover:shadow-amber-400/20"
              >
                <span>CONTINUAR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  EDITAR DATOS
                </button>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-all shadow-xl shadow-emerald-500/20"
                >
                  <Check className="w-4 h-4" />
                  <span>CONFIRMAR CITA</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
