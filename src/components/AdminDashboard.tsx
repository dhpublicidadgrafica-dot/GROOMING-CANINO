import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Dog, 
  Check, 
  X, 
  Ban, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Settings, 
  Phone, 
  MapPin, 
  Sparkles, 
  RotateCcw,
  Eye,
  HelpCircle
} from 'lucide-react';
import { Appointment, AppointmentStatus, AvailabilityConfig } from '../types';
import { storageService } from '../services/storageService';
import { BRAND_INFO } from '../data/servicesData';
import { buildWhatsAppBookingMessage, openWhatsAppChat } from '../services/firebaseConfig';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availability, setAvailability] = useState<AvailabilityConfig>(storageService.getAvailabilityConfig());
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState<'appointments' | 'availability'>('appointments');
  const [dateToBlock, setDateToBlock] = useState<string>('');
  const [slotDate, setSlotDate] = useState<string>('');
  const [slotTime, setSlotTime] = useState<string>('10:00');

  const refreshData = () => {
    setAppointments(storageService.getAppointments());
    setAvailability(storageService.getAvailabilityConfig());
  };

  useEffect(() => {
    refreshData();
    const unsubscribe = storageService.subscribe(() => {
      refreshData();
    });
    return unsubscribe;
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  // Métricas
  const todayCount = appointments.filter(a => a.date === todayStr && a.status !== 'Cancelada').length;
  const pendingCount = appointments.filter(a => a.status === 'Pendiente').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmada').length;
  const completedCount = appointments.filter(a => a.status === 'Completada').length;

  // Filtrado
  const filteredAppointments = appointments.filter(a => {
    if (selectedStatus !== 'all' && a.status !== selectedStatus) return false;
    if (filterDate && a.date !== filterDate) return false;
    return true;
  });

  const handleUpdateStatus = (id: string, newStatus: AppointmentStatus) => {
    storageService.updateAppointmentStatus(id, newStatus);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleWhatsAppCustomer = (apt: Appointment) => {
    const text = `Hola ${apt.clientName}, te escribo de Grooming Canino (Andrea Tirado) respecto a la cita de ${apt.petName} para el ${apt.date} a las ${apt.time}.`;
    openWhatsAppChat(apt.phone, text);
  };

  const handleBlockDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateToBlock) return;
    storageService.toggleBlockDate(dateToBlock);
    setDateToBlock('');
    refreshData();
  };

  const handleBlockSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotDate || !slotTime) return;
    storageService.toggleBlockSlot(slotDate, slotTime);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#071324] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabecera del Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>GESTIÓN DE CITAS & DISPONIBILIDAD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
              Panel Administrativo · {BRAND_INFO.manager}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Control de agendamientos, prevención de duplicados y configuración de disponibilidad.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => storageService.resetDemoData()}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Restablecer citas de demostración"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Demo</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
            >
              Volver a la Web
            </button>
          </div>
        </div>

        {/* 4 Métricas Clave */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0F2445] p-5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Citas para Hoy</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">{todayCount}</span>
              <span className="text-xs text-amber-400 font-medium">{todayStr}</span>
            </div>
          </div>

          <div className="bg-[#0F2445] p-5 rounded-2xl border border-amber-900/40">
            <span className="text-xs text-amber-400 font-semibold uppercase">Pendientes</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300">{pendingCount}</span>
              <span className="text-xs text-slate-400">Por confirmar</span>
            </div>
          </div>

          <div className="bg-[#0F2445] p-5 rounded-2xl border border-emerald-900/40">
            <span className="text-xs text-emerald-400 font-semibold uppercase">Confirmadas</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">{confirmedCount}</span>
              <span className="text-xs text-slate-400">Listas en agenda</span>
            </div>
          </div>

          <div className="bg-[#0F2445] p-5 rounded-2xl border border-blue-900/40">
            <span className="text-xs text-blue-400 font-semibold uppercase">Completadas</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black font-mono text-blue-300">{completedCount}</span>
              <span className="text-xs text-slate-400">Mascotas felices</span>
            </div>
          </div>
        </div>

        {/* Pestañas de Vista */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Listado de Citas ({filteredAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'availability'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Configuración de Disponibilidad
          </button>
        </div>

        {/* CONTENIDO 1: GESTIÓN DE CITAS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Barra de Filtros */}
            <div className="bg-[#0F2445] p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Estado:
                </span>
                {['all', 'Pendiente', 'Confirmada', 'Completada', 'Cancelada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedStatus === st
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {st === 'all' ? 'Todos' : st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Filtrar por fecha:</span>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                {filterDate && (
                  <button
                    onClick={() => setFilterDate('')}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Limpiar
                  </button>
                )}
              </div>
            </div>

            {/* Listado de Citas */}
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center bg-[#0F2445]/60 rounded-3xl border border-slate-800 text-slate-400 text-sm">
                No se encontraron citas con los filtros seleccionados.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAppointments.map((apt) => {
                  const isToday = apt.date === todayStr;
                  return (
                    <div
                      key={apt.id}
                      className={`bg-[#0F2445] rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                        apt.status === 'Pendiente'
                          ? 'border-amber-500/50 hover:border-amber-400'
                          : apt.status === 'Confirmada'
                          ? 'border-emerald-500/40 hover:border-emerald-400'
                          : apt.status === 'Cancelada'
                          ? 'border-slate-800 opacity-60'
                          : 'border-slate-800'
                      }`}
                    >
                      <div>
                        {/* Cabecera de tarjeta */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            #{apt.id}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            apt.status === 'Pendiente'
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-500/30'
                              : apt.status === 'Confirmada'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : apt.status === 'Completada'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {apt.status}
                          </span>
                        </div>

                        {/* Datos de Mascota & Horario */}
                        <div className="mt-4 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                              <Dog className="w-4 h-4 text-amber-400" />
                              {apt.petName}
                            </h3>
                            <span className="text-xs text-slate-300">{apt.breed}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-950/70 p-2 rounded-xl">
                            <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                            <span>{apt.date}</span>
                            <span className="text-slate-500">·</span>
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>{apt.time}</span>
                            {isToday && (
                              <span className="ml-auto text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded">
                                HOY
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300">
                            <span className="text-slate-400">Servicios:</span> {apt.services.join(', ')}
                          </p>

                          <p className="text-xs text-slate-300">
                            <span className="text-slate-400">Modalidad:</span>{' '}
                            <span className={apt.modality === 'A domicilio' ? 'text-amber-300 font-semibold' : ''}>
                              {apt.modality}
                            </span>
                          </p>

                          <div className="pt-1 text-xs text-slate-400 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{apt.clientName}</span>
                            <span className="text-slate-600">·</span>
                            <span>{apt.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Botonera de acciones para la cita */}
                      <div className="mt-5 pt-3 border-t border-slate-800 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          {apt.status === 'Pendiente' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'Confirmada')}
                              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" /> Confirmar
                            </button>
                          )}
                          {apt.status === 'Confirmada' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'Completada')}
                              className="py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Completar
                            </button>
                          )}
                          {apt.status !== 'Cancelada' && apt.status !== 'Completada' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'Cancelada')}
                              className="py-1.5 px-3 bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-semibold text-xs rounded-lg border border-rose-800/40 flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" /> Cancelar
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedAppointment(apt)}
                            className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> Ver Ficha
                          </button>
                          <button
                            onClick={() => handleWhatsAppCustomer(apt)}
                            className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 cursor-pointer"
                            title="Escribir al cliente por WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO 2: CONFIGURACIÓN DE DISPONIBILIDAD */}
        {activeTab === 'availability' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Panel de Bloqueo de Fechas Completas */}
            <div className="bg-[#0F2445] rounded-3xl p-6 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Ban className="w-5 h-5 text-rose-400" />
                  Bloqueo de Fechas Específicas
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Días feriados, descansos o fechas no disponibles para agendamiento.
                </p>
              </div>

              <form onSubmit={handleBlockDate} className="flex gap-2">
                <input
                  type="date"
                  min={todayStr}
                  value={dateToBlock}
                  onChange={(e) => setDateToBlock(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Bloquear / Desbloquear
                </button>
              </form>

              <div>
                <p className="text-xs uppercase font-semibold text-slate-400 mb-2">Fechas actualmente bloqueadas:</p>
                {availability.blockedDates.length === 0 ? (
                  <p className="text-xs text-slate-500">No hay fechas bloqueadas actualmente.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availability.blockedDates.map((d) => (
                      <span
                        key={d}
                        className="px-3 py-1 rounded-lg bg-rose-950 border border-rose-800/60 text-rose-200 text-xs font-mono flex items-center gap-1.5"
                      >
                        {d}
                        <button
                          type="button"
                          onClick={() => {
                            storageService.toggleBlockDate(d);
                            refreshData();
                          }}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Panel de Bloqueo de Horarios Específicos */}
            <div className="bg-[#0F2445] rounded-3xl p-6 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  Bloqueo de Franja Horaria Específica
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Bloquea un turno puntual para citas privadas o compromisos.
                </p>
              </div>

              <form onSubmit={handleBlockSlot} className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  min={todayStr}
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  required
                />
                <select
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  {availability.standardSlots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="col-span-2 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Alternar Bloqueo de Franja
                </button>
              </form>

              <div>
                <p className="text-xs uppercase font-semibold text-slate-400 mb-2">Franjas bloqueadas:</p>
                {availability.blockedSlots.length === 0 ? (
                  <p className="text-xs text-slate-500">No hay franjas bloqueadas.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availability.blockedSlots.map((bs, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-200 text-xs font-mono flex items-center gap-1.5"
                      >
                        {bs.date} · {bs.time}
                        <button
                          type="button"
                          onClick={() => {
                            storageService.toggleBlockSlot(bs.date, bs.time);
                            refreshData();
                          }}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Ficha Detallada de Cita */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0F2445] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    #{selectedAppointment.id}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                    Ficha de {selectedAppointment.petName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido detallado */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-amber-400 font-bold uppercase text-[11px]">CLIENTE RESPONSABLE</p>
                  <p className="font-semibold text-white mt-1">{selectedAppointment.clientName}</p>
                  <p className="text-slate-300">WhatsApp: {selectedAppointment.phone}</p>
                  {selectedAppointment.email && <p className="text-slate-400">Email: {selectedAppointment.email}</p>}
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-amber-400 font-bold uppercase text-[11px]">MASCOTA</p>
                  <p className="font-semibold text-white mt-1">
                    {selectedAppointment.petName} ({selectedAppointment.breed})
                  </p>
                  <p className="text-slate-300">
                    Edad: {selectedAppointment.age} · Sexo: {selectedAppointment.sex} · Peso: {selectedAppointment.weight}
                  </p>
                  <p className="text-slate-400 mt-1">¿Primera visita?: {selectedAppointment.firstVisit}</p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-amber-400 font-bold uppercase text-[11px]">TEMPERAMENTO Y CONDICIONES</p>
                  <p className="text-slate-200 mt-1">
                    <span className="text-slate-400">Comportamiento habitual:</span>{' '}
                    <span className="font-semibold text-amber-300">{selectedAppointment.behavior}</span>
                  </p>
                  {selectedAppointment.sensitiveAreas && (
                    <p className="text-slate-200 mt-1">
                      <span className="text-slate-400">Zonas sensibles:</span> {selectedAppointment.sensitiveAreas}
                    </p>
                  )}
                  {selectedAppointment.specialNotes && (
                    <p className="text-slate-200 mt-1">
                      <span className="text-slate-400">Notas especiales / Salud:</span> {selectedAppointment.specialNotes}
                    </p>
                  )}
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-amber-400 font-bold uppercase text-[11px]">CITA Y MODALIDAD</p>
                  <p className="font-semibold text-white mt-1">
                    {selectedAppointment.date} a las {selectedAppointment.time}
                  </p>
                  <p className="text-slate-300">Modalidad: {selectedAppointment.modality}</p>
                  {selectedAppointment.modality === 'A domicilio' && (
                    <p className="text-amber-200 mt-1">
                      Dirección: {selectedAppointment.address}, Barrio: {selectedAppointment.neighborhood}
                      {selectedAppointment.directions && ` (${selectedAppointment.directions})`}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between gap-3">
                <button
                  onClick={() => handleWhatsAppCustomer(selectedAppointment)}
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" /> Escribir por WhatsApp
                </button>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="py-2.5 px-4 bg-slate-800 text-slate-300 text-xs rounded-xl cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
