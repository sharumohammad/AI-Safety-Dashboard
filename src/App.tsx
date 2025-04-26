import React, { useState, useEffect } from 'react';
import { Incident, FilterOption, SortOrder } from './types/incident';
import { generateMockIncidents } from './data/mockData';
import IncidentItem from './components/IncidentItem';
import IncidentFilter from './components/IncidentFilter';
import IncidentForm from './components/IncidentForm';
import { ShieldAlert } from 'lucide-react';

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<FilterOption>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  useEffect(() => {
    // Load mock data
    const mockData = generateMockIncidents();
    setIncidents(mockData);
  }, []);

  const handleFilterChange = (newFilter: FilterOption) => {
    setFilter(newFilter);
  };

  const handleSortOrderChange = (newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleAddIncident = (newIncident: Omit<Incident, 'id'>) => {
    const id = (incidents.length + 1).toString();
    const incidentWithId = { ...newIncident, id };
    setIncidents([incidentWithId, ...incidents]);
  };

  // Filter incidents based on current filter
  const filteredIncidents = incidents.filter(incident => {
    if (filter === 'All') return true;
    return incident.severity === filter;
  });

  // Sort incidents based on current sort order
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.reportedDate.getTime() - a.reportedDate.getTime();
    } else {
      return a.reportedDate.getTime() - b.reportedDate.getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldAlert className="h-8 w-8 mr-3 text-blue-400" />
              <h1 className="text-2xl font-bold">AI Safety Incident Dashboard</h1>
            </div>
            <div className="text-sm text-gray-300">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Incident Management</h2>
          <p className="text-gray-600">
            Track, filter, and report AI safety incidents across your organization.
          </p>
        </div>

        <IncidentForm onSubmit={handleAddIncident} />
        
        <IncidentFilter 
          currentFilter={filter}
          currentSortOrder={sortOrder}
          onFilterChange={handleFilterChange}
          onSortOrderChange={handleSortOrderChange}
        />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Incident Log
            </h3>
            <span className="text-sm text-gray-500">
              {sortedIncidents.length} {sortedIncidents.length === 1 ? 'incident' : 'incidents'} found
            </span>
          </div>

          {sortedIncidents.length > 0 ? (
            <div className="space-y-4">
              {sortedIncidents.map(incident => (
                <IncidentItem key={incident.id} incident={incident} />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No incidents match the current filters.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-800 text-gray-400 py-4 mt-8">
        <div className="container mx-auto px-4 text-sm text-center">
          AI Safety Incident Dashboard &copy; {new Date().getFullYear()} | All incidents shown are mock data for demonstration purposes
        </div>
      </footer>
    </div>
  );
}

export default App;