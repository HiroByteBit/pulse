import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { ChevronRight } from 'lucide-react';

export const PatientCard = ({ patient }) => {
  return (
    <Link 
      to={`/patients/${patient.id}`}
      className="flex items-center gap-4 p-4 bg-white border border-border rounded-xl hover:bg-bg-hover transition-colors group"
    >
      <div className="w-12 h-12 rounded-full overflow-hidden border border-border flex-shrink-0">
        <img src={`https://i.pravatar.cc/150?u=${patient.id}`} alt={patient.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text-primary truncate">{patient.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <StatusBadge status={patient.status} />
          <span className="text-[11px] text-text-dim">{patient.age}y · {patient.gender}</span>
        </div>
      </div>

      <div className="text-right">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Key Vital</p>
        <p className={`text-sm font-bold ${patient.status === 'critical' ? 'text-health-red' : 'text-health-green'}`}>
          {patient.vitals.heartRate} BPM
        </p>
      </div>

      <ChevronRight className="w-4 h-4 text-text-dim group-hover:text-text-primary transition-colors" />
    </Link>
  );
};
