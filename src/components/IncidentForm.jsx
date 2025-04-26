import React, { useState } from 'react';
import { PlusCircle, X, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const IncidentForm = ({ onSubmit }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    // Reset form when closing
    if (isFormOpen) {
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSeverity('Medium');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newIncident = {
        title,
        description,
        severity,
        reportedDate: new Date()
      };
      
      onSubmit(newIncident);
      resetForm();
      setIsFormOpen(false);
    }
  };

  const SeverityIcon = ({ type }) => {
    switch (type) {
      case 'High':
        return <AlertCircle size={18} className="text-red-500" />;
      case 'Medium':
        return <AlertTriangle size={18} className="text-amber-500" />;
      case 'Low':
        return <Info size={18} className="text-green-500" />;
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={toggleForm}
        className={`flex items-center justify-center w-full md:w-auto px-4 py-3 rounded-lg shadow-sm transition-colors ${
          isFormOpen 
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isFormOpen ? (
          <>
            <X size={18} className="mr-2" />
            Cancel Report
          </>
        ) : (
          <>
            <PlusCircle size={18} className="mr-2" />
            Report New Incident
          </>
        )}
      </button>
      
      {isFormOpen && (
        <div className="mt-4 bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Report New AI Safety Incident</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Incident Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter a descriptive title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide detailed information about the incident"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity *
              </label>
              <div className="flex flex-wrap gap-4">
                {['Low', 'Medium', 'High'].map((level) => (
                  <label 
                    key={level}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                      severity === level 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={severity === level}
                      onChange={() => setSeverity(level)}
                      className="sr-only"
                    />
                    <SeverityIcon type={level} />
                    <span className="ml-2">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Submit Incident
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IncidentForm;