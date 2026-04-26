import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export const VitalSign = ({ icon: Icon, label, value, unit, status, trend, range, color }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center`}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-2xl font-bold text-text-primary" style={{ color: status !== 'Normal' ? color : undefined }}>{value}</span>
            <span className="text-[11px] font-medium text-text-dim">{unit}</span>
          </div>
        </div>
      </div>

      <div className="h-10 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" debounce={1}>
          <LineChart data={trend}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2} 
              dot={false} 
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          status === 'Normal' ? 'bg-health-green-bg text-health-green' : 
          status === 'High' ? 'bg-health-red-bg text-health-red' : 
          'bg-health-amber-bg text-health-amber'
        }`}>
          {status}
        </span>
        <span className="text-[11px] text-text-dim font-medium">Ref: {range}</span>
      </div>
    </div>
  );
};
