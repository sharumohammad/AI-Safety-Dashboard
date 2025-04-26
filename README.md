# AI Safety Incident Dashboard

A modern, interactive dashboard for tracking and managing AI safety incidents across your organization. Built with React and Tailwind CSS, this application provides a robust interface for reporting, monitoring, and managing AI-related safety incidents.

## Features

- 📊 Real-time incident tracking and management
- 🔍 Advanced filtering by severity levels (Low, Medium, High)
- ⏱️ Chronological sorting (Newest/Oldest)
- 📝 Interactive incident reporting form with validation
- 📈 Dynamic statistics dashboard
- 🔔 Toast notifications for user actions
- 📱 Fully responsive design
- 🎨 Clean, modern UI with smooth animations

## Tech Stack

- React 18
- Tailwind CSS
- Javascript
- HTML

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-safety-incident-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in your terminal (typically `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Design Decisions

- **Component Structure**: Modular components (IncidentItem, IncidentForm, IncidentFilter) for better maintainability and reusability
- **State Management**: React's built-in useState and useEffect hooks for managing application state
- **Styling**: Tailwind CSS for rapid development and consistent design
- **Animations**: CSS transitions and keyframe animations for smooth user interactions
- **Accessibility**: ARIA labels and semantic HTML for better accessibility
- **Error Handling**: Form validation and toast notifications for user feedback

## Project Structure

```
src/
├── components/          # React components
│   ├── IncidentItem    # Individual incident display
│   ├── IncidentForm    # New incident submission form
│   └── IncidentFilter  # Filtering and sorting controls
├── data/               # Mock data and data utilities
├── types/              # TypeScript type definitions
└── App.jsx            # Main application component
```

