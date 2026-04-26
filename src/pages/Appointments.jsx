import { useState, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
  LayoutGrid, 
  List, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock3,
  Mail,
  Phone
} from 'lucide-react';
import { useClinicStore } from '../store/useClinicStore';
import { Avatar } from '../components/ui/Avatar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Appointments = () => {
  const [view, setView] = useState('list');
  const [activeMenu, setActiveMenu] = useState(null);
  const appointments = useClinicStore(state => state.appointments);

  const events = useMemo(() => appointments.map(appt => ({
    id: appt.id,
    title: `${appt.patient.name} - ${appt.type}`,
    start: new Date(`${format(appt.date, 'yyyy-MM-dd')}T${appt.time}:00`),
    end: new Date(new Date(`${format(appt.date, 'yyyy-MM-dd')}T${appt.time}:00`).getTime() + appt.duration * 60000),
    resource: appt,
  })), [appointments]);

  const groupedAppointments = useMemo(() => appointments.reduce((acc, appt) => {
    const date = format(appt.date, 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(appt);
    return acc;
  }, {}), [appointments]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Appointments</h1>
          <p className="text-sm text-text-muted mt-1">Manage your clinic schedule and patient visits</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-border p-1 rounded-xl shadow-sm">
            <button 
              onClick={() => setView('calendar')}
              className={`p-2 rounded-lg transition-colors ${view === 'calendar' ? 'bg-accent-light text-accent' : 'text-text-muted hover:text-text-primary'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-accent-light text-accent' : 'text-text-muted hover:text-text-primary'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-xl font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {view === 'calendar' ? (
          <div className="h-[700px] p-6">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView="week"
              views={['month', 'week', 'day']}
              className="font-sans"
              eventPropGetter={(event) => ({
                className: 'bg-accent text-white border-none rounded-lg text-xs font-semibold p-1 shadow-sm'
              })}
            />
          </div>
        ) : (
          <div className="divide-y divide-border">
            {Object.entries(groupedAppointments).sort().map(([date, appts]) => (
              <div key={date} className="p-6">
                <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {format(new Date(date), 'EEEE, MMMM do, yyyy')}
                </h3>
                <div className="space-y-3">
                  {appts.sort((a, b) => a.time.localeCompare(b.time)).map((appt) => (
                    <div key={appt.id} className="flex items-center gap-6 p-4 border border-border rounded-xl hover:bg-bg-hover transition-colors group">
                      <div className="w-16">
                        <p className="text-sm font-bold text-text-primary">{appt.time}</p>
                        <p className="text-[11px] text-text-dim">{appt.duration} min</p>
                      </div>
                      
                      <div className="flex-1 flex items-center gap-4">
                        <Avatar src={appt.patient.avatar} name={appt.patient.name} size="md" />
                        <div>
                          <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">{appt.patient.name}</p>
                          <p className="text-[11px] text-text-muted flex items-center gap-1.5 mt-0.5">
                            {appt.type} · {appt.doctor.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <StatusBadge status={appt.status} />
                        <div className="relative">
                          <button 
                            onClick={() => setActiveMenu(activeMenu === appt.id ? null : appt.id)}
                            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border"
                          >
                            <MoreVertical className="w-4 h-4 text-text-dim" />
                          </button>

                          <AnimatePresence>
                            {activeMenu === appt.id && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border py-2 z-20"
                                >
                                  <div className="px-4 py-2 border-b border-border mb-1">
                                    <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Update Status</p>
                                  </div>
                                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-health-green hover:bg-health-green-bg transition-colors">
                                    <CheckCircle2 className="w-4 h-4" /> Mark Completed
                                  </button>
                                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-accent hover:bg-accent-light transition-colors">
                                    <Clock3 className="w-4 h-4" /> Set In Progress
                                  </button>
                                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-health-red hover:bg-health-red-bg transition-colors border-b border-border mb-1">
                                    <XCircle className="w-4 h-4" /> Cancel Appt
                                  </button>
                                  
                                  <div className="px-4 py-2 border-b border-border mb-1 mt-1">
                                    <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Contact Patient</p>
                                  </div>
                                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                                    <Mail className="w-4 h-4" /> Send Email
                                  </button>
                                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                                    <Phone className="w-4 h-4" /> Call Patient
                                  </button>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
