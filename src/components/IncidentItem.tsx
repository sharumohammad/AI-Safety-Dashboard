import React, { useState } from 'react';
import { Incident } from '../types/incident';
import { ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface IncidentItemProps {
  incident: Incident;
}

const SeverityIcon = ({ severity }: { severity: Incident['severity'] }) => {
  switch (severity) {
    case 'High':
      return <AlertCircle className="text-red-500" />;
    case 'Medium':
      return <AlertTriangle className="text-amber-500" />;
    case 'Low':
      return <Info className="text-green-500" />;
  }
};

const SeverityBadge = ({ severity }: { severity: Incident['severity'] }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  
  switch (severity) {
    case 'High':
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>{severity}</span>;
    case 'Medium':
      return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>{severity}</span>;
    case 'Low':
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>{severity}</span>;
  }
};

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(incident.reportedDate);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden transition-all duration-200 hover:shadow-md bg-white">
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
        <div className="flex items-center space-x-3">
          <SeverityIcon severity={incident.severity} />
          <h3 className="font-medium text-gray-900">{incident.title}</h3>
        </div>
        <div className="flex items-center space-x-4">
          <SeverityBadge severity={incident.severity} />
          <span className="text-sm text-gray-500">{formattedDate}</span>
          <button 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-100 animate-expand bg-gray-50">
          <p className="text-gray-700">{incident.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <span>Incident ID: {incident.id}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;