import React from 'react';
import { Filter, SortDesc, SortAsc } from 'lucide-react';

const IncidentFilter = ({
  currentFilter,
  currentSortOrder,
  onFilterChange,
  onSortOrderChange
}) => {
  const filterOptions = ['All', 'Low', 'Medium', 'High'];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-4 md:mb-0">
        <Filter size={18} className="text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700 mr-3">Filter by Severity:</span>
        <div className="flex space-x-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => onFilterChange(option)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                currentFilter === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-3">Sort by Date:</span>
        <button
          onClick={() => onSortOrderChange('newest')}
          className={`flex items-center px-3 py-1 text-sm rounded-md mr-2 transition-colors ${
            currentSortOrder === 'newest'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <SortDesc size={16} className="mr-1" /> Newest
        </button>
        <button
          onClick={() => onSortOrderChange('oldest')}
          className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
            currentSortOrder === 'oldest'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <SortAsc size={16} className="mr-1" /> Oldest
        </button>
      </div>
    </div>
  );
};

export default IncidentFilter;