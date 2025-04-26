export type Severity = 'Low' | 'Medium' | 'High';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  reportedDate: Date;
}

export type SortOrder = 'newest' | 'oldest';
export type FilterOption = 'All' | Severity;

export interface IncidentState {
  incidents: Incident[];
  filter: FilterOption;
  sortOrder: SortOrder;
}