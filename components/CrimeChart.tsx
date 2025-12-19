'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CrimeDataPoint } from '@/lib/api/crimeApi';

interface CrimeChartProps {
  data: CrimeDataPoint[];
  title?: string;
  color?: string;
}

export default function CrimeChart({ data, title = 'Crime Trends', color = '#0ea5e9' }: CrimeChartProps) {
  const chartData = data.map(item => ({
    year: item.data_year,
    actual: item.actual,
    cleared: item.cleared,
  }));

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke={color} 
            strokeWidth={2}
            name="Reported Crimes"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="cleared" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Cleared Cases"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

