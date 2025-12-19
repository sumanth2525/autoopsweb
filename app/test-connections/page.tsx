'use client';

import { useState, useEffect } from 'react';
import { ConnectionStatus, TestResult } from '@/lib/utils/connectionTest';
import ConnectionStatusCard from '@/components/ConnectionStatusCard';
import { RefreshCw, CheckCircle2, XCircle, AlertTriangle, Server } from 'lucide-react';

export default function TestConnectionsPage() {
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastTestTime, setLastTestTime] = useState<Date | null>(null);

  const runTests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-connections');
      const data: TestResult = await response.json();
      setTestResults(data);
      setLastTestTime(new Date());
    } catch (error) {
      console.error('Failed to run tests:', error);
      setTestResults({
        overall: 'down',
        services: [],
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Run tests on page load
    runTests();
  }, []);

  const getOverallStatusIcon = () => {
    if (!testResults) return null;
    
    switch (testResults.overall) {
      case 'healthy':
        return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      case 'down':
        return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const getOverallStatusColor = () => {
    if (!testResults) return 'bg-gray-100';
    
    switch (testResults.overall) {
      case 'healthy':
        return 'bg-green-100 border-green-500';
      case 'degraded':
        return 'bg-yellow-100 border-yellow-500';
      case 'down':
        return 'bg-red-100 border-red-500';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Server className="w-8 h-8 text-primary-600" />
                <span>Connection Status Dashboard</span>
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Test and monitor all system connections: Web Server, Database, and APIs
              </p>
            </div>
            <button
              onClick={runTests}
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Testing...' : 'Run Tests'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Status */}
        {testResults && (
          <div className={`mb-8 border-2 rounded-lg p-6 ${getOverallStatusColor()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getOverallStatusIcon()}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Overall Status: {testResults.overall.toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.services.length} service(s) tested
                  </p>
                </div>
              </div>
              {lastTestTime && (
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">
                    Last Test: {lastTestTime.toLocaleTimeString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lastTestTime.toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !testResults && (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Running connection tests...</p>
          </div>
        )}

        {/* Connection Status Cards */}
        {testResults && testResults.services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testResults.services.map((connection, index) => (
              <ConnectionStatusCard key={index} connection={connection} />
            ))}
          </div>
        )}

        {/* Test Results Summary */}
        {testResults && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {testResults.services.filter(s => s.status === 'success').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Successful</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">
                  {testResults.services.filter(s => s.status === 'warning').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Warnings</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">
                  {testResults.services.filter(s => s.status === 'error').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Errors</div>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">About Connection Tests</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Web Server:</strong> Tests if the Next.js server is running and responsive</li>
            <li>• <strong>Internet Connection:</strong> Verifies general internet connectivity</li>
            <li>• <strong>FBI Crime Statistics API:</strong> Tests connection to the external API endpoint</li>
            <li>• <strong>Database:</strong> Database connection testing (ready for future implementation)</li>
          </ul>
          <p className="mt-4 text-xs text-blue-700">
            All tests include response time measurements. Click &quot;View Details&quot; on any card to see additional information.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Connection tests run automatically on page load
            </p>
            <a
              href="/"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

