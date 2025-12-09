// Timeline demo data and initialization

const timelineEvents = [
  { label: 'Event 1', status: 'completed', description: 'First event', timestamp: '2025-12-01' },
  { label: 'Event 2', status: 'active', description: 'Second event', timestamp: '2025-12-02' },
  { label: 'Event 3', status: 'pending', description: 'Third event', timestamp: '2025-12-03' }
];

export function renderTimelineDemo(targetSelector = '#timeline-demo-section') {
  const container = document.querySelector(targetSelector);
  if (!container) return;
  const timeline = document.createElement('ui-timeline');
  timeline.events = timelineEvents;
  container.appendChild(timeline);
}

// Example usage:
// renderTimelineDemo();
