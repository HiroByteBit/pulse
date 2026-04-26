import { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Calendar,
  Filter
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { staff } from '../data/mockData';

const Analytics = () => {
  const patientVolumeData = useMemo(() => [
    { name: 'Jan', new: 45, returning: 120 },
    { name: 'Feb', new: 52, returning: 145 },
    { name: 'Mar', new: 48, returning: 138 },
    { name: 'Apr', new: 61, returning: 162 },
    { name: 'May', new: 55, returning: 155 },
    { name: 'Jun', new: 67, returning: 178 },
  ], []);

  const revenueData = useMemo(() => [
    { date: '1', amount: 1200 }, { date: '5', amount: 1800 },
    { date: '10', amount: 1400 }, { date: '15', amount: 2200 },
    { date: '20', amount: 1900 }, { date: '25', amount: 2800 },
    { date: '30', amount: 2400 },
  ], []);

  const stats = useMemo(() => [
    { label: 'Patient Retention', value: '88.4%', trend: '+2.1%', icon: Users, color: 'text-accent', bg: 'bg-accent-light' },
    { label: 'Total Revenue MTD', value: '$48,200', trend: '+12.3%', icon: DollarSign, color: 'text-health-green', bg: 'bg-health-green-bg' },
    { label: 'Avg Satisfaction', value: '4.8/5.0', trend: '+0.2', icon: TrendingUp, color: 'text-health-purple', bg: 'bg-health-purple-bg' },
    { label: 'Missed Appts', value: '3.2%', trend: '-1.4%', icon: Clock, color: 'text-health-red', bg: 'bg-health-red-bg' },
  ], []);

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Clinical Analytics</h1>
          <p className="text-sm text-text-muted mt-1">Real-time performance metrics and patient trends</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-bold text-text-primary hover:bg-bg-hover transition-colors shadow-sm">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-bold text-text-primary hover:bg-bg-hover transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-[11px] font-bold text-text-dim uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-bold text-text-primary">{stat.value}</h3>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-health-green bg-health-green-bg' : 'text-health-red bg-health-red-bg'} px-1.5 py-0.5 rounded`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-6">Patient Volume (New vs Returning)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%" debounce={1}>
              <BarChart data={patientVolumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="new" name="New Patients" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="returning" name="Returning" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-6">Revenue Trend (MTD)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%" debounce={1}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Provider Performance</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-bg-hover">
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider">Appointments</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider">Avg Duration</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider">Satisfaction</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-dim uppercase tracking-wider text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.slice(0, 4).map((doctor) => (
              <tr key={doctor.id} className="hover:bg-bg-hover transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={doctor.avatar} name={doctor.name} size="sm" />
                    <div>
                      <p className="text-sm font-bold text-text-primary">{doctor.name}</p>
                      <p className="text-[11px] text-text-dim">{doctor.specialty}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">142</td>
                <td className="px-6 py-4 text-sm text-text-muted">24 min</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} className={`w-1.5 h-1.5 rounded-full mr-0.5 ${s <= 4 ? 'bg-health-amber' : 'bg-border'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-text-primary">4.8</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-bold text-text-primary">$12,400</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
