import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  Activity,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

export const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  ];

  return (
    <>
      <aside className="w-64 bg-white border-r border-border flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-text-primary tracking-tight">pulse.</span>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-accent-light text-accent" 
                  : "text-text-muted hover:bg-bg-hover hover:text-text-primary"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <button 
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-bg-hover hover:text-text-primary transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-health-red hover:bg-health-red-bg transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-border"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Clinic Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-bg-hover rounded-full transition-colors">
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-text-dim uppercase tracking-widest">General</h4>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-bg-hover rounded-2xl">
                      <div>
                        <p className="text-sm font-bold text-text-primary">Clinic Name</p>
                        <p className="text-xs text-text-dim mt-0.5">Primary clinic branding</p>
                      </div>
                      <span className="text-sm font-medium text-accent">Pulse Health Central</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-bg-hover rounded-2xl">
                      <div>
                        <p className="text-sm font-bold text-text-primary">TimeZone</p>
                        <p className="text-xs text-text-dim mt-0.5">System time for appointments</p>
                      </div>
                      <span className="text-sm font-medium text-accent">PST (UTC-8)</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full py-3 bg-accent text-white rounded-xl font-bold shadow-lg shadow-accent/20 hover:bg-accent-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
