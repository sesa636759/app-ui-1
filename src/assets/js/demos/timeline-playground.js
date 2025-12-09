// Timeline Playground Demo
export function initTimelinePlayground() {
  const section = document.getElementById('timeline-playground');
  if (!section) return;
  section.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 30px; margin-bottom: 20px;">
      <div style="flex: 1; min-width: 300px;">
        <h2 style="margin: 0 0 10px 0;">🕒 Timeline Playground</h2>
        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Timeline Events (JSON):</label>
        <textarea id="timelineEventsInput" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 200px;"></textarea>
        <button id="updateTimelineBtn" style="margin-top: 10px; background:#10b981; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:12px; cursor:pointer;">Update Timeline</button>
      </div>
      <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h4 style="margin-top: 0;">Preview:</h4>
        <ui-timeline id="timelinePlaygroundComponent"></ui-timeline>
      </div>
    </div>
  `;

  // Default events
  const defaultEvents = [
    { time: '09:00', title: 'Start', description: 'Project kickoff' },
    { time: '10:30', title: 'Design', description: 'Design review meeting' },
    { time: '12:00', title: 'Lunch', description: 'Team lunch break' },
    { time: '14:00', title: 'Development', description: 'Coding session' },
    { time: '16:00', title: 'Testing', description: 'QA and bug fixing' },
    { time: '17:30', title: 'Wrap-up', description: 'End of day summary' }
  ];

  const textarea = document.getElementById('timelineEventsInput');
  if (textarea) {
    textarea.value = JSON.stringify(defaultEvents, null, 2);
  }

  function updateTimeline() {
    const timeline = document.getElementById('timelinePlaygroundComponent');
    if (!timeline || !textarea) return;
    try {
      const events = JSON.parse(textarea.value);
      timeline.events = events;
    } catch (e) {
      alert('Invalid JSON: ' + e.message);
    }
  }

  document.getElementById('updateTimelineBtn').onclick = updateTimeline;
  updateTimeline();
}