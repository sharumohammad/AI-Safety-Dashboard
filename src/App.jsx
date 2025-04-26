import React, { useState, useEffect } from 'react';
import { generateMockIncidents } from './data/mockData';
import IncidentItem from './components/IncidentItem';
import IncidentFilter from './components/IncidentFilter';
import IncidentForm from './components/IncidentForm';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [stats, setStats] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
    // Load mock data with a simulated delay
    const loadData = async () => {
      toast.promise(
        new Promise(resolve => setTimeout(() => resolve(generateMockIncidents()), 1000)),
        {
          loading: 'Loading incidents...',
          success: 'Incidents loaded successfully',
          error: 'Failed to load incidents',
        }
      );
      const mockData = generateMockIncidents();
      setIncidents(mockData);
      updateStats(mockData);
    };
    loadData();
  }, []);

  const updateStats = (incidentList) => {
    const newStats = incidentList.reduce((acc, incident) => {
      acc[incident.severity.toLowerCase()]++;
      return acc;
    }, { high: 0, medium: 0, low: 0 });
    setStats(newStats);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    toast.success(`Filtered by ${newFilter} severity`);
  };

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    toast.success(`Sorted by ${newSortOrder}`);
  };

  const handleAddIncident = (newIncident) => {
    const id = (incidents.length + 1).toString();
    const incidentWithId = { ...newIncident, id };
    const updatedIncidents = [incidentWithId, ...incidents];
    setIncidents(updatedIncidents);
    updateStats(updatedIncidents);
    toast.success('New incident reported successfully!');
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
      <Toaster position="top-right" />
      
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center justify-between">
              <span className="text-red-700 font-medium">High Severity</span>
              <span className="text-2xl font-bold text-red-600">{stats.high}</span>
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between">
              <span className="text-amber-700 font-medium">Medium Severity</span>
              <span className="text-2xl font-bold text-amber-600">{stats.medium}</span>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between">
              <span className="text-green-700 font-medium">Low Severity</span>
              <span className="text-2xl font-bold text-green-600">{stats.low}</span>
            </div>
          </div>
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
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-gray-500">
                {sortedIncidents.length} {sortedIncidents.length === 1 ? 'incident' : 'incidents'} found
              </span>
            </div>
          </div>

          {sortedIncidents.length > 0 ? (
            <div className="space-y-4">
              {sortedIncidents.map(incident => (
                <IncidentItem 
                  key={incident.id} 
                  incident={incident}
                  onStatusChange={(status) => toast.success(`Incident ${incident.id} marked as ${status}`)}
                />
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