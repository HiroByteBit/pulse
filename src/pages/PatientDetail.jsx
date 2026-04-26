import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Activity, 
  Droplets, 
  Thermometer, 
  Zap, 
  Weight, 
  Heart,
  Plus,
  Calendar,
  FileText,
  FlaskConical,
  Pill,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinicStore } from '../store/useClinicStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { VitalSign } from '../components/ui/VitalSign';
import { VitalsChart } from '../components/charts/VitalsChart';
import { Avatar } from '../components/ui/Avatar';

const PatientDetail = () => {
  const { id } = useParams();
  const patient = useClinicStore(state => state.patients.find(p => p.id === id));
  const activeTab = useClinicStore(state => state.activeTab);
  const setActiveTab = useClinicStore(state => state.setActiveTab);

  const [activeVitals, setActiveVitals] = useState(['heartRate', 'systolic', 'spo2']);

  if (!patient) return <div>Patient not found</div>;

  const vitalsCards = useMemo(() => [
    { key: 'heartRate', icon: Heart, label: 'Heart Rate', value: patient.vitals.heartRate, unit: 'BPM', range: '60-100', color: '#ef4444', status: patient.vitals.heartRate > 100 ? 'High' : 'Normal', trend: patient.vitalsHistory.map(h => ({ value: h.heartRate })) },
    { key: 'systolic', icon: Activity, label: 'Blood Pressure', value: `${patient.vitals.systolic}/${patient.vitals.diastolic}`, unit: 'mmHg', range: '120/80', color: '#8b5cf6', status: patient.vitals.systolic > 140 ? 'High' : 'Normal', trend: patient.vitalsHistory.map(h => ({ value: h.systolic })) },
    { key: 'spo2', icon: Droplets, label: 'SpO2', value: patient.vitals.spo2, unit: '%', range: '95-100', color: '#0ea5e9', status: patient.vitals.spo2 < 94 ? 'Low' : 'Normal', trend: patient.vitalsHistory.map(h => ({ value: h.spo2 })) },
    { key: 'temperature', icon: Thermometer, label: 'Temperature', value: patient.vitals.temperature, unit: '°F', range: '98.6', color: '#f59e0b', status: 'Normal', trend: patient.vitalsHistory.map(h => ({ value: h.temperature })) },
    { key: 'glucose', icon: Zap, label: 'Glucose', value: patient.vitals.glucose, unit: 'mg/dL', range: '70-99', color: '#10b981', status: patient.vitals.glucose > 140 ? 'High' : 'Normal', trend: patient.vitalsHistory.map(h => ({ value: h.glucose })) },
    { key: 'weight', icon: Weight, label: 'Weight', value: patient.vitals.weight, unit: 'kg', range: 'Target: 80', color: '#64748b', status: 'Normal', trend: patient.vitalsHistory.map(h => ({ value: h.weight })) },
  ], [patient]);

  const tabs = ['Overview', 'Appointments', 'Medications', 'Lab Results', 'Notes'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/patients" className="p-2 bg-white border border-border rounded-xl hover:bg-bg-hover transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5 text-text-muted" />
          </Link>
          <div className="flex items-center gap-4">
            <Avatar src={patient.avatar} name={patient.name} size="xl" className="border-4 border-white shadow-md" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-text-primary">{patient.name}</h1>
                <StatusBadge status={patient.status} />
              </div>
              <p className="text-sm text-text-muted mt-1">
                ID: {patient.id} · {patient.age}y · {patient.gender} · Blood: {patient.bloodType}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-bold text-text-primary hover:bg-bg-hover transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Schedule
          </button>
          <button className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
            Clinical Summary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {vitalsCards.map((vital, i) => (
          <motion.div
            key={vital.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <VitalSign 
              {...vital} 
            />
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Vitals History (30 Days)</h3>
          <div className="flex gap-2">
            {vitalsCards.map(v => (
              <button
                key={v.key}
                onClick={() => setActiveVitals(prev => 
                  prev.includes(v.key) ? prev.filter(k => k !== v.key) : [...prev, v.key]
                )}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                  activeVitals.includes(v.key) 
                    ? 'bg-bg-surface border-accent text-accent shadow-sm' 
                    : 'bg-white border-border text-text-muted hover:border-text-dim'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <VitalsChart data={patient.vitalsHistory} activeVitals={activeVitals} />
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex border-b border-border bg-bg-hover/50">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${
                activeTab === tab ? 'text-accent' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" 
                />
              )}
            </button>
          ))}
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'Overview' && (
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[11px] font-bold text-text-dim uppercase tracking-widest mb-3">Conditions</h4>
                      <div className="flex flex-wrap gap-2">
                        {patient.conditions.map(c => (
                          <div key={c} className="px-3 py-1.5 bg-bg-hover border border-border rounded-lg text-sm font-medium text-text-primary">
                            {c} <span className="text-text-dim ml-1 text-xs">E11.9</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-text-dim uppercase tracking-widest mb-3">Allergies</h4>
                      <div className="flex flex-wrap gap-2">
                        {patient.allergies.map(a => (
                          <div key={a} className="px-3 py-1.5 bg-health-red-bg border border-health-red/20 rounded-lg text-sm font-medium text-health-red">
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[11px] font-bold text-text-dim uppercase tracking-widest mb-3">Primary Doctor</h4>
                      <div className="flex items-center gap-3 p-4 bg-bg-hover rounded-xl border border-border">
                        <Avatar src={patient.primaryDoctor.avatar} name={patient.primaryDoctor.name} size="lg" />
                        <div>
                          <p className="text-sm font-bold text-text-primary">{patient.primaryDoctor.name}</p>
                          <p className="text-xs text-text-muted">{patient.primaryDoctor.specialty}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-text-dim uppercase tracking-widest mb-3">Insurance Information</h4>
                      <p className="text-sm font-medium text-text-primary">{patient.insurance}</p>
                      <p className="text-xs text-text-dim mt-1">ID: #994827104 · Group: #A827</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Notes' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar name="Admin" size="md" />
                    <div className="flex-1 space-y-3">
                      <textarea 
                        placeholder="Add a clinical note..."
                        className="w-full bg-bg-hover border border-border rounded-xl p-4 text-sm focus:ring-2 focus:ring-accent outline-none min-h-[100px]"
                      />
                      <button className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-accent-dark transition-colors">
                        Save Note
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6 pt-6 border-t border-border">
                    {patient.notes.map((note, i) => (
                      <div key={i} className="flex gap-4">
                        <Avatar name={note.doctor} size="sm" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-text-primary">{note.doctor}</span>
                            <span className="text-[11px] text-text-dim flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {new Date(note.date).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-text-muted leading-relaxed">{note.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab !== 'Overview' && activeTab !== 'Notes' && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-bg-hover rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-text-dim" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text-primary">{activeTab} for {patient.name}</h4>
                    <p className="text-sm text-text-dim">No records available for the selected period.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
