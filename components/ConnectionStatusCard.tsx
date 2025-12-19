'use client';

import { ConnectionStatus } from '@/lib/utils/connectionTest';
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface ConnectionStatusCardProps {
  connection: ConnectionStatus;
}

export default function ConnectionStatusCard({ connection }: ConnectionStatusCardProps) {
  const getStatusIcon = () => {
    switch (connection.status) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      default:
        return <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (connection.status) {
      case 'success':
        return 'border-green-500 bg-green-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const formatResponseTime = (ms?: number) => {
    if (!ms) return 'N/A';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className={`border-2 rounded-lg p-6 ${getStatusColor()} transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{connection.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{connection.message}</p>
          </div>
        </div>
        {connection.responseTime !== undefined && (
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">
              {formatResponseTime(connection.responseTime)}
            </div>
            <div className="text-xs text-gray-500">Response Time</div>
          </div>
        )}
      </div>

      {connection.details && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <details className="cursor-pointer">
            <summary className="text-sm font-medium text-gray-700 hover:text-gray-900">
              View Details
            </summary>
            <pre className="mt-2 text-xs bg-white p-3 rounded border border-gray-200 overflow-auto">
              {JSON.stringify(connection.details, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Tested: {new Date(connection.timestamp).toLocaleString()}
      </div>
    </div>
  );
}

