import { create } from 'zustand';
import { patients, staff, appointments, alerts } from '../data/mockData';

export const useClinicStore = create((set) => ({
  patients: patients,
  staff: staff,
  appointments: appointments,
  alerts: alerts,
  activePatient: null,
  calendarView: 'week',
  patientFilters: {
    search: '',
    status: 'All',
    doctor: 'All',
    conditions: []
  },
  analyticsDateRange: '30d',
  analyticsDoctor: 'all',
  activeTab: 'Overview',

  setActivePatient: (patient) => set({ activePatient: patient }),
  
  resolveAlert: (id) => set((state) => ({
    alerts: state.alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    )
  })),

  addAppointment: (appt) => set((state) => ({
    appointments: [...state.appointments, { ...appt, id: `a${state.appointments.length + 1}` }]
  })),

  updateAppointmentStatus: (id, status) => set((state) => ({
    appointments: state.appointments.map(appt => 
      appt.id === id ? { ...appt, status } : appt
    )
  })),

  addNote: (patientId, note) => set((state) => ({
    patients: state.patients.map(p => 
      p.id === patientId ? { ...p, notes: [note, ...p.notes] } : p
    )
  })),

  setCalendarView: (view) => set({ calendarView: view }),
  
  setPatientFilters: (filters) => set((state) => ({
    patientFilters: { ...state.patientFilters, ...filters }
  })),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));
