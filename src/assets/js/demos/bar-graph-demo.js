// Button and Bar Graph demo initialization

const initialChartData = {
  labels: ['A', 'B', 'C', 'D'],
  datasets: [{
    label: 'Demo Data',
    data: [12, 19, 3, 5],
    backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ef4444']
  }]
};

export function renderButtonBarGraphDemo(targetSelector = '#button-bar-graph-demo-section') {
  const container = document.querySelector(targetSelector);
  if (!container) return;

  // Create button
  const button = document.createElement('ui-button');
  button.textContent = 'Update Chart';
  button.setAttribute('variant', 'primary');

  // Create bar chart
  const barChart = document.createElement('ui-bar-chart');
  barChart.data = initialChartData;

  // Button click handler: randomize chart data
  button.addEventListener('click', () => {
    barChart.data = {
      ...initialChartData,
      datasets: [{
        ...initialChartData.datasets[0],
        data: initialChartData.labels.map(() => Math.floor(Math.random() * 20))
      }]
    };
  });

  container.appendChild(button);
  container.appendChild(barChart);
}

// Example usage:
// renderButtonBarGraphDemo();
