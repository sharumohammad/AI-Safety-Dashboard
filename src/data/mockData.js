export const generateMockIncidents = () => {
  return [
    {
      id: '1',
      title: 'Recommendation System Bias Detected',
      description: 'Our content recommendation system was found to be preferentially suggesting political content of a particular leaning, potentially creating filter bubbles for users. Initial analysis suggests a correlation with engagement metrics used for optimization.',
      severity: 'Medium',
      reportedDate: new Date('2025-03-15')
    },
    {
      id: '2',
      title: 'Unauthorized Data Access in ML Pipeline',
      description: 'A vulnerability in our machine learning pipeline allowed potential access to training data containing user information. Audit logs show no evidence of exploitation, but the issue has been present for approximately 72 hours before detection.',
      severity: 'High',
      reportedDate: new Date('2025-03-21')
    },
    {
      id: '3',
      title: 'Hallucination in Customer Support AI',
      description: 'Our customer support AI provided fabricated policy information to approximately 50 users over a 24-hour period. The issue was caused by a prompt injection vulnerability that has now been patched. All affected customers have been contacted with correct information.',
      severity: 'Medium',
      reportedDate: new Date('2025-03-10')
    },
    {
      id: '4',
      title: 'Minor Language Model Output Inconsistency',
      description: 'Routine monitoring detected occasional inconsistencies in our language model responses when handling specific technical topics. The issue appears to be limited to edge cases and has not resulted in any reported customer confusion.',
      severity: 'Low',
      reportedDate: new Date('2025-03-18')
    },
    {
      id: '5',
      title: 'Production Model Drift Detected',
      description: 'Our surveillance systems detected significant drift in our production fraud detection model, potentially reducing effectiveness. The drift correlates with seasonal changes in user behavior that were not adequately represented in training data.',
      severity: 'High',
      reportedDate: new Date('2025-03-08')
    }
  ];
};