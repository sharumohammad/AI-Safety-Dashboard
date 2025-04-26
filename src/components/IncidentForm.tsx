import React, { useState } from 'react';
import { Incident, Severity } from '../types/incident';
import { PlusCircle, X } from 'lucide-react';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id'>) => void;
}

c