'use client';

import { useState } from 'react';
import { crimeApi, CrimeDataPoint } from '@/lib/api/crimeApi';
import SearchForm from '@/components/SearchForm';
import StatCard from '@/components/StatCard';
import CrimeChart from '@/components/CrimeChart';
import { Activity, AlertTriangle, Shield, BarChart3, Server } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [crimeData, setCrimeData] = useState<CrimeDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    agencyCode: 'NJ1234567',
    offenseType: 'violent-crime',
    startYear: 2010,
    endYear: 2022,
  });

  const handleSearch = async (
    agencyCode: string,
    offenseType: string,
    startYear: number,
    endYear: number
  ) => {
    setIsLoading(true);
    setError(null);
    setSearchParams({ agencyCode, offenseType, startYear, endYear });

    try {
      const response = await crimeApi.getCrimeEstimates(
        agencyCode,
        offenseType,
        startYear,
        endYear
      );
      setCrimeData(response.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch crime data';
      setError(errorMessage);
      
      // Show helpful message for 503 errors
      if (errorMessage.includes('503') || errorMessage.includes('temporarily unavailable')) {
        setError(
          'API service is temporarily unavailable. The app is using sample data. Please try again in a few minutes.'
        );
      }
      
      setCrimeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const statistics = crimeApi.calculateStatistics(crimeData);
  const offenseTypeLabel = searchParams.offenseType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Crime Analytics Dashboard
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Analyze crime statistics using FBI crime data API
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/test-connections"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <Server className="w-5 h-5" />
                <span className="hidden sm:inline">Test Connections</span>
              </Link>
              <div className="hidden md:flex items-center space-x-2 text-primary-600">
                <Shield className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading crime data...</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && crimeData.length > 0 && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Crimes"
                value={statistics.total.toLocaleString()}
                subtitle={`${searchParams.startYear} - ${searchParams.endYear}`}
                icon={<Activity className="w-6 h-6" />}
              />
              <StatCard
                title="Average per Year"
                value={statistics.average.toLocaleString()}
                subtitle={offenseTypeLabel}
                icon={<BarChart3 className="w-6 h-6" />}
              />
              <StatCard
                title="Peak Year"
                value={statistics.max.toLocaleString()}
                subtitle="Highest reported"
                icon={<AlertTriangle className="w-6 h-6" />}
              />
              <StatCard
                title="Trend"
                value={(statistics.changePercent > 0 ? '+' : '') + statistics.changePercent + '%'}
                subtitle="Change over period"
                trend={statistics.trend}
                changePercent={statistics.changePercent}
                icon={<Shield className="w-6 h-6" />}
              />
            </div>

            {/* Chart */}
            <div className="mb-8">
              <CrimeChart
                data={crimeData}
                title={`${offenseTypeLabel} Trends - Agency ${searchParams.agencyCode}`}
              />
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Detailed Crime Data
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reported
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cleared
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cleared Exceptionally
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clearance Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crimeData.map((item, index) => {
                      const clearanceRate = item.actual > 0 
                        ? ((item.cleared / item.actual) * 100).toFixed(1)
                        : '0.0';
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.data_year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.actual.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.cleared.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.cleared_exceptionally.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              parseFloat(clearanceRate) > 50 
                                ? 'bg-green-100 text-green-800'
                                : parseFloat(clearanceRate) > 30
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {clearanceRate}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && crimeData.length === 0 && !error && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Data Available
            </h3>
            <p className="text-gray-600">
              Enter an agency code and search parameters to view crime statistics.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Data provided by{' '}
            <a
              href="https://api.usa.gov/crime/fbi/sapi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              FBI Crime Statistics API
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}

