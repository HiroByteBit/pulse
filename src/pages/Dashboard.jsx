import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Activity, 
  Clock, 
  TrendingUp,
  AlertCircle,
  FileText,
  FlaskConical,
  CheckCircle2
} from 'lucide-react';
import { useClinicStore } from '../store/useClinicStore';
import { AlertBanner } from '../components/ui/AlertBanner';
import { AppointmentSlot } from '../components/ui/AppointmentSlot';
import { PatientCard } from '../components/ui/PatientCard';
import { DiagnosisDonut } from '../components/charts/DiagnosisDonut';
import { PatientTrendChart } from '../components/charts/PatientTrendChart';
import { diagnosisBreakdown, patientStatusDistribution, clinicStats } from '../data/mockData';

const Dashboard = () => {
  const allAppointments = useClinicStore(state => state.appointments);
  const allPatients = useClinicStore(state => state.patients);

  const appointments = useMemo(() => 
    allAppointments.filter(a => {
      const today = new Date().toDateString();
      return new Date(a.date).toDateString() === today;
    }).sort((a, b) => a.time.localeCompare(b.time)),
    [allAppointments]
  );

  const criticalPatients = useMemo(() => 
    allPatients.filter(p => p.status === 'critical').slice(0, 3),
    [allPatients]
  );

  const kpis = useMemo(() => [
    { label: "Today's Appts", value: clinicStats.appointmentsToday, icon: Calendar, color: "text-accent", bg: "bg-accent-light" },
    { label: "Critical Patients", value: clinicStats.criticalPatients, icon: AlertCircle, color: "text-health-red", bg: "bg-health-red-bg" },
    { label: "New MTD", value: clinicStats.newThisMonth, icon: Users, color: "text-health-green", bg: "bg-health-green-bg" },
    { label: "Bed Occupancy", value: `${clinicStats.bedOccupancy}%`, icon: Activity, color: "text-health-purple", bg: "bg-health-purple-bg" },
    { label: "Avg Wait Time", value: clinicStats.avgWaitTime, icon: Clock, color: "text-health-amber", bg: "bg-health-amber-bg" },
  ], []);

  const recentActivity = useMemo(() => [
    { icon: CheckCircle2, text: "Appointment completed: Sarah Jones", time: "10 mins ago", color: "text-health-green" },
    { icon: Users, text: "New patient admitted: Robert Miller", time: "45 mins ago", color: "text-accent" },
    { icon: FlaskConical, text: "Lab results received for 2 patients", time: "1 hour ago", color: "text-health-purple" },
    { icon: FileText, text: "Prescription issued for James Wilson", time: "2 hours ago", color: "text-health-amber" },
  ], []);

  return (
    <div className="space-y-8">
      <AlertBanner />

      <div className="grid grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-border shadow-sm"
          >
            <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center mb-4`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <p className="text-[11px] font-bold text-text-dim uppercase tracking-wider">{kpi.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-bold text-text-primary">{kpi.value}</h3>
              <span className="text-[10px] font-bold text-health-green bg-health-green-bg px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Appointments Today</h3>
            <button className="text-xs font-semibold text-accent hover:underline">View All</button>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {appointments.map((appt) => (
              <AppointmentSlot key={appt.id} appointment={appt} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-health-red-bg/30">
              <h3 className="text-sm font-bold text-health-red uppercase tracking-wider">Critical Patients</h3>
              <span className="bg-health-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {criticalPatients.length}
              </span>
            </div>
            <div className="p-4 space-y-3">
              {criticalPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
              <button className="w-full py-3 text-xs font-bold text-text-muted hover:text-text-primary bg-bg-hover rounded-xl transition-colors">
                View Critical List
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-lg bg-bg-hover flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{activity.text}</p>
                    <p className="text-[11px] text-text-dim mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <DiagnosisDonut data={diagnosisBreakdown} />
        <PatientTrendChart data={patientStatusDistribution} />
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-bg-hover rounded-xl">
              <span className="text-xs font-medium text-text-muted">Avg Patient Age</span>
              <span className="text-sm font-bold text-text-primary">48.2y</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-hover rounded-xl">
              <span className="text-xs font-medium text-text-muted">M:F Ratio</span>
              <span className="text-sm font-bold text-text-primary">42:58</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-hover rounded-xl">
              <span className="text-xs font-medium text-text-muted">Top Condition</span>
              <span className="text-sm font-bold text-text-primary">Diabetes</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-hover rounded-xl">
              <span className="text-xs font-medium text-text-muted">Completion Rate</span>
              <span className="text-sm font-bold text-health-green">94.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
