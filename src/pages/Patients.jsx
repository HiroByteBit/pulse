import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ArrowUpDown,
  UserPlus,
  Eye,
  Edit2,
  CalendarDays,
  StickyNote,
  Printer
} from 'lucide-react';
import { useClinicStore } from '../store/useClinicStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Avatar } from '../components/ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

const Patients = () => {
  const navigate = useNavigate();
  const patients = useClinicStore(state => state.patients);
  const filters = useClinicStore(state => state.patientFilters);
  const setFilters = useClinicStore(state => state.setPatientFilters);

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           p.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'All' || p.status.toLowerCase() === filters.status.toLowerCase();
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [patients, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const stats = useMemo(() => ({
    total: patients.length,
    critical: patients.filter(p => p.status === 'critical').length,
    monitoring: patients.filter(p => p.status === 'monitoring').length,
    discharged: patients.filter(p => p.status === 'discharged').length,
  }), [patients]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Patients</h1>
          <p className="text-sm text-text-muted mt-1">
            {stats.total} Patients · {stats.critical} Critical · {stats.monitoring} Monitoring
          </p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-xl font-semibold transition-colors shadow-sm">
          <UserPlus className="w-4 h-4" />
          Add Patient
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or condition..."
            className="w-full bg-bg-hover border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent outline-none"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'Critical', 'Monitoring', 'Discharged'].map(status => (
            <button
              key={status}
              onClick={() => setFilters({ status })}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filters.status === status 
                  ? 'bg-accent text-white shadow-md' 
                  : 'bg-bg-hover text-text-muted hover:text-text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-bg-hover border-b border-border">
              <th className="px-6 py-4">
                <button onClick={() => handleSort('name')} className="flex items-center gap-2 text-[11px] font-bold text-text-dim uppercase tracking-wider">
                  Patient <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider">Condition</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="hover:bg-bg-hover cursor-pointer transition-colors group relative"
              >
                <td className="px-6 py-4" onClick={() => navigate(`/patients/${patient.id}`)}>
                  <div className="flex items-center gap-3">
                    <Avatar src={patient.avatar} name={patient.name} size="md" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{patient.name}</p>
                      <p className="text-[11px] text-text-dim">{patient.age}y · {patient.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4" onClick={() => navigate(`/patients/${patient.id}`)}>
                  <StatusBadge status={patient.status} />
                </td>
                <td className="px-6 py-4" onClick={() => navigate(`/patients/${patient.id}`)}>
                  <div className="flex items-center gap-2">
                    <Avatar src={patient.primaryDoctor.avatar} name={patient.primaryDoctor.name} size="xs" />
                    <span className="text-sm text-text-muted">{patient.primaryDoctor.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4" onClick={() => navigate(`/patients/${patient.id}`)}>
                  <div className="flex gap-1">
                    {patient.conditions.slice(0, 2).map(c => (
                      <span key={c} className="px-2 py-0.5 bg-bg-hover text-text-muted rounded text-[10px] font-medium border border-border">
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === patient.id ? null : patient.id);
                      }}
                      className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border shadow-sm group-hover:shadow-md"
                    >
                      <MoreVertical className="w-4 h-4 text-text-dim" />
                    </button>

                    <AnimatePresence>
                      {activeMenu === patient.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-border py-2 z-20"
                          >
                            <button 
                              onClick={() => navigate(`/patients/${patient.id}`)}
                              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors"
                            >
                              <Eye className="w-4 h-4" /> View Detail
                            </button>
                            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                              <Edit2 className="w-4 h-4" /> Edit Record
                            </button>
                            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                              <CalendarDays className="w-4 h-4" /> Schedule Appt
                            </button>
                            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                              <StickyNote className="w-4 h-4" /> Add Note
                            </button>
                            <div className="h-px bg-border my-2" />
                            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                              <Printer className="w-4 h-4" /> Print Summary
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
