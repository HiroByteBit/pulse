import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const StatusBadge = ({ status }) => {
  const styles = {
    critical: "bg-health-red-bg text-health-red border-health-red/20",
    monitoring: "bg-health-amber-bg text-health-amber border-health-amber/20",
    active: "bg-health-green-bg text-health-green border-health-green/20",
    discharged: "bg-bg-hover text-text-muted border-border",
    scheduled: "bg-accent-light text-accent border-accent/20",
    in_progress: "bg-health-green-bg text-health-green border-health-green/20 animate-pulse",
    completed: "bg-bg-hover text-text-muted border-border",
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border",
      styles[status.toLowerCase()] || styles.active
    )}>
      {status.replace('_', ' ')}
    </span>
  );
};
