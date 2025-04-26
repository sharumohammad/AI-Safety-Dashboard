import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';

const SeverityIcon = ({ severity }) => {
  switch (severity) {
    case 'High':
      return <AlertCircle className="text-red-500" />;
    case 'Medium':
      return <AlertTriangle className="text-amber-500" />;
    case 'Low':
      return <Info className="text-green-500" />;
  }
};

const SeverityBadge = ({ severity }) => {
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

const IncidentItem = ({ incident, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState('open');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(incident.reportedDate);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md bg-white group">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" 
        onClick={toggleExpand}
      >
        <div className="flex items-center space-x-3">
          <SeverityIcon severity={incident.severity} />
          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {incident.title}
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <SeverityBadge severity={incident.severity} />
          <span className="text-sm text-gray-500">{formattedDate}</span>
          <button 
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-transform transform hover:scale-110"
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 animate-expand bg-gray-50">
          <p className="text-gray-700 mb-4">{incident.description}</p>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span>Incident ID: {incident.id}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange('resolved')}
                className={`flex items-center px-3 py-1 rounded-md text-sm transition-colors ${
                  status === 'resolved'
                    ? 'bg-green-100 text-green-700'
                    : 'hover:bg-green-50 text-gray-600'
                }`}
              >
                <CheckCircle size={16} className="mr-1" />
                Resolve
              </button>
              <button
                onClick={() => handleStatusChange('closed')}
                className={`flex items-center px-3 py-1 rounded-md text-sm transition-colors ${
                  status === 'closed'
                    ? 'bg-red-100 text-red-700'
                    : 'hover:bg-red-50 text-gray-600'
                }`}
              >
                <XCircle size={16} className="mr-1" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;