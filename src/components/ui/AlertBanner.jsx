import { useMemo } from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinicStore } from '../../store/useClinicStore';

export const AlertBanner = () => {
  const allAlerts = useClinicStore(state => state.alerts);
  const alerts = useMemo(() => allAlerts.filter(a => !a.resolved), [allAlerts]);
  const resolveAlert = useClinicStore(state => state.resolveAlert);

  if (alerts.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border min-w-[320px] shadow-sm ${
              alert.severity === 'critical' ? 'bg-health-red-bg border-health-red/20 text-health-red' :
              alert.severity === 'warning' ? 'bg-health-amber-bg border-health-amber/20 text-health-amber' :
              'bg-accent-light border-accent/20 text-accent'
            }`}
          >
            {alert.severity === 'critical' ? <AlertCircle className="w-5 h-5 animate-pulse" /> :
             alert.severity === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
             <Info className="w-5 h-5" />}
            
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider mb-0.5">{alert.severity}</p>
              <p className="text-sm font-medium truncate">{alert.message}</p>
            </div>

            <button 
              onClick={() => resolveAlert(alert.id)}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
