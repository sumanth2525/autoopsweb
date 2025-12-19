'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'increasing' | 'decreasing' | 'stable';
  changePercent?: number;
  icon?: React.ReactNode;
}

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  changePercent,
  icon 
}: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === 'increasing') {
      return <TrendingUp className="w-5 h-5 text-red-500" />;
    } else if (trend === 'decreasing') {
      return <TrendingDown className="w-5 h-5 text-green-500" />;
    }
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (trend === 'increasing') return 'text-red-600';
    if (trend === 'decreasing') return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h3>
        {icon && <div className="text-primary-500">{icon}</div>}
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend && changePercent !== undefined && (
          <div className="flex items-center mt-3 space-x-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {changePercent > 0 ? '+' : ''}{changePercent}% 
              {trend === 'increasing' && ' increase'}
              {trend === 'decreasing' && ' decrease'}
              {trend === 'stable' && ' stable'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

