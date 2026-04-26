import { useMemo, useState } from 'react';
import { Bell, Search, User, LogOut, Settings, CreditCard } from 'lucide-react';
import { useClinicStore } from '../../store/useClinicStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Topbar = () => {
  const alerts = useClinicStore(state => state.alerts);
  const unresolvedCount = useMemo(() => alerts.filter(a => !a.resolved).length, [alerts]);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-white flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
        <input 
          type="text" 
          placeholder="Search patients, doctors, or results..."
          className="w-full bg-bg-hover border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-text-muted hover:text-text-primary transition-colors" />
          {unresolvedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-health-red text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {unresolvedCount}
            </span>
          )}
        </div>
        
        <div className="h-8 w-px bg-border" />

        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 hover:bg-bg-hover p-1.5 rounded-xl transition-colors outline-none"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-text-primary">Admin User</p>
              <p className="text-[11px] text-text-dim uppercase tracking-wider font-medium">Clinic Manager</p>
            </div>
            <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center border border-accent/20 overflow-hidden">
              <User className="text-accent w-6 h-6 translate-y-1" />
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-border py-2 z-20"
                >
                  <div className="px-4 py-2 border-b border-border mb-2">
                    <p className="text-xs font-bold text-text-dim uppercase tracking-widest">My Account</p>
                  </div>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                    <User className="w-4 h-4" />
                    View Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors">
                    <CreditCard className="w-4 h-4" />
                    Billing
                  </button>
                  <div className="h-px bg-border my-2" />
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-health-red hover:bg-health-red-bg transition-colors font-semibold">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
