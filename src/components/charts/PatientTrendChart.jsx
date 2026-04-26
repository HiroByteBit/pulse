import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const PatientTrendChart = ({ data }) => {
  return (
    <div className="h-[300px] w-full bg-white p-6 rounded-2xl border border-border shadow-sm">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Patient Status</h3>
      <ResponsiveContainer width="100%" height="100%" debounce={1}>
        <RadialBarChart 
          innerRadius="30%" 
          outerRadius="100%" 
          data={data} 
          startAngle={180} 
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={{ fill: '#666', position: 'insideStart', fontSize: 10 }}
            background
            clockWise={true}
            dataKey="value"
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconSize={10} verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
