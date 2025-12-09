import { h } from '@stencil/core';

export default {
  title: 'Components/Timeline',
  component: 'ui-timeline',
};

const events = [
  { label: 'Event 1', status: 'completed', description: 'First event', timestamp: '2025-12-01' },
  { label: 'Event 2', status: 'active', description: 'Second event', timestamp: '2025-12-02' },
  { label: 'Event 3', status: 'pending', description: 'Third event', timestamp: '2025-12-03' }
];

export const Basic = () => (
  <ui-timeline events={JSON.stringify(events)}></ui-timeline>
);

export const NonLinear = () => (
  <ui-timeline events={JSON.stringify(events)} flow="non-linear"></ui-timeline>
);

export const Themed = () => (
  <ui-timeline events={JSON.stringify(events)} theme={{ timelinePrimary: '#007bff', timelineActive: '#28a745' }}></ui-timeline>
);

export const Nested = () => (
  <ui-timeline events={JSON.stringify([
    { label: 'Main', children: [
      { label: 'Subevent 1' },
      { label: 'Subevent 2' }
    ] }
  ])}></ui-timeline>
);
