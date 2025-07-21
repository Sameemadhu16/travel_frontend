import React, { useState } from 'react';

export default function FilterModal({ onClose, onApply, currentFilters }) {
  const [filters, setFilters] = useState(currentFilters || {
    status: [],
    dateRange: 'all',
    groupSize: 'all',
    duration: 'all'
  });

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'starting_today', label: 'Starting Today' },
    { value: 'this_week', label: 'This Week' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this_week', label: 'This Week' },
    { value: 'next_week', label: 'Next Week' }
  ];

  const groupSizeOptions = [
    { value: 'all', label: 'Any Size' },
    { value: '1-2', label: '1-2 People' },
    { value: '3-5', label: '3-5 People' },
    { value: '6+', label: '6+ People' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '1', label: '1 Day' },
    { value: '2-3', label: '2-3 Days' },
    { value: '4+', label: '4+ Days' }
  ];

  const handleStatusChange = (value) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(value)
        ? prev.status.filter(s => s !== value)
        : [...prev.status, value]
    }));
  };

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px]">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Filter Tours</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Filter */}
          <div>
            <h3 className="font-semibold mb-3">Tour Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    filters.status.includes(option.value)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h3 className="font-semibold mb-3">Date Range</h3>
            <select
              value={filters.dateRange}
              onChange={(e) => handleChange('dateRange', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Group Size Filter */}
          <div>
            <h3 className="font-semibold mb-3">Group Size</h3>
            <select
              value={filters.groupSize}
              onChange={(e) => handleChange('groupSize', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {groupSizeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <h3 className="font-semibold mb-3">Tour Duration</h3>
            <select
              value={filters.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
