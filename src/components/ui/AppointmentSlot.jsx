import { StatusBadge } from './StatusBadge';
import { Avatar } from './Avatar';
import { Clock } from 'lucide-react';

export const AppointmentSlot = ({ appointment }) => {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-bg-hover transition-colors border-b border-border last:border-0 group">
      <div className="text-right w-12 pt-1 flex-shrink-0">
        <p className="text-[11px] font-bold text-text-primary">{appointment.time}</p>
        <p className="text-[10px] text-text-dim">{appointment.duration}m</p>
      </div>

      <div className="flex-1 flex items-center gap-4">
        <div className="relative">
          <Avatar src={appointment.patient.avatar} name={appointment.patient.name} size="md" />
          {appointment.status === 'in_progress' && (
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-health-green border-2 border-white rounded-full animate-pulse" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
            {appointment.patient.name}
          </h4>
          <p className="text-[11px] text-text-muted flex items-center gap-1.5 mt-0.5">
            {appointment.type} · {appointment.doctor.name}
          </p>
        </div>

        <StatusBadge status={appointment.status} />
      </div>
    </div>
  );
};
