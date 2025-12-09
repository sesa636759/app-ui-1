import { h } from '@stencil/core';

export default {
  title: 'Components/Timer',
  component: 'ui-timer',
};

const steps = [
  { label: 'Step 1', status: 'completed', description: 'First step', duration: 10 },
  { label: 'Step 2', status: 'active', description: 'Second step', duration: 20 },
  { label: 'Step 3', status: 'pending', description: 'Third step', duration: 30 }
];

export const Basic = () => (
  <ui-timer steps={JSON.stringify(steps)}></ui-timer>
);

export const NonLinear = () => (
  <ui-timer steps={JSON.stringify(steps)} flow="non-linear"></ui-timer>
);

export const Themed = () => (
  <ui-timer steps={JSON.stringify(steps)} theme={{ timerPrimary: '#007bff', timerActive: '#28a745' }}></ui-timer>
);

export const Nested = () => (
  <ui-timer steps={JSON.stringify([
    { label: 'Main', children: [
      { label: 'Substep 1' },
      { label: 'Substep 2' }
    ] }
  ])}></ui-timer>
);
