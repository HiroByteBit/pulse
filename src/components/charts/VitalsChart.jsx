import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export const VitalsChart = ({ data, activeVitals }) => {
  const vitalsConfig = {
    heartRate: { color: '#ef4444', label: 'Heart Rate' },
    systolic: { color: '#8b5cf6', label: 'BP Systolic' },
    diastolic: { color: '#a855f7', label: 'BP Diastolic' },
    spo2: { color: '#0ea5e9', label: 'SpO2' },
    temperature: { color: '#f59e0b', label: 'Temp' },
    glucose: { color: '#10b981', label: 'Glucose' },
  };

  return (
    <div className="h-[400px] w-full bg-white p-6 rounded-2xl border border-border shadow-sm">
      <ResponsiveContainer width="100%" height="100%" debounce={1}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              fontSize: '12px'
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', fontWeight: 500, paddingBottom: '20px' }}
          />
          {activeVitals.map(key => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={vitalsConfig[key]?.label}
              stroke={vitalsConfig[key]?.color}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
