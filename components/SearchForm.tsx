'use client';

import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (agencyCode: string, offenseType: string, startYear: number, endYear: number) => void;
  isLoading?: boolean;
}

const OFFENSE_TYPES = [
  { value: 'violent-crime', label: 'Violent Crime' },
  { value: 'property-crime', label: 'Property Crime' },
  { value: 'homicide', label: 'Homicide' },
  { value: 'rape', label: 'Rape' },
  { value: 'robbery', label: 'Robbery' },
  { value: 'assault', label: 'Assault' },
  { value: 'burglary', label: 'Burglary' },
  { value: 'larceny', label: 'Larceny' },
  { value: 'motor-vehicle-theft', label: 'Motor Vehicle Theft' },
];

export default function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [agencyCode, setAgencyCode] = useState('NJ1234567');
  const [offenseType, setOffenseType] = useState('violent-crime');
  const [startYear, setStartYear] = useState(2010);
  const [endYear, setEndYear] = useState(2022);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(agencyCode, offenseType, startYear, endYear);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="agencyCode" className="block text-sm font-medium text-gray-700 mb-2">
            Agency Code
          </label>
          <input
            type="text"
            id="agencyCode"
            value={agencyCode}
            onChange={(e) => setAgencyCode(e.target.value.toUpperCase())}
            placeholder="e.g., NJ1234567"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Format: State abbreviation + numbers
          </p>
        </div>

        <div>
          <label htmlFor="offenseType" className="block text-sm font-medium text-gray-700 mb-2">
            Offense Type
          </label>
          <select
            id="offenseType"
            value={offenseType}
            onChange={(e) => setOffenseType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {OFFENSE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 mb-2">
            Start Year
          </label>
          <select
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-2">
            End Year
          </label>
          <select
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
      >
        <Search className="w-5 h-5" />
        <span>{isLoading ? 'Loading...' : 'Search Crime Data'}</span>
      </button>
    </form>
  );
}

