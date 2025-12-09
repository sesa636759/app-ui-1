// Bar Chart Demo
export function initBarChartDemo() {
    console.log('✅ initBarChartDemo called');
  const section = document.getElementById('bar-chart');
  if (!section) return;

  // Inject structured demo HTML
  section.innerHTML = `
    <h2>📊 Bar Chart Component</h2>
    <p>Pure JavaScript bar chart component built from scratch - no external libraries required!</p>

    <div class="demo-block">
      <h3>Simple Bar Chart</h3>
      <ui-bar-chart
        id="simple-bar-chart"
        title="Monthly Revenue 2024"
        subtitle="Sales performance by month"
        show-values
        show-legend
        y-axis-label="Revenue ($)"
      ></ui-bar-chart>
    </div>

    <div class="demo-block">
      <h3>Grouped Bar Chart</h3>
      <ui-bar-chart
        id="grouped-bar-chart"
        title="Revenue Comparison"
        subtitle="Year-over-year quarterly performance"
        show-values
        show-legend
        show-grid
        y-axis-label="Revenue ($)"
      ></ui-bar-chart>
    </div>

    <div class="demo-block">
      <h3>Stacked Bar Chart</h3>
      <ui-bar-chart
        id="stacked-bar-chart"
        title="Product Categories"
        subtitle="Weekly sales by category"
        stacked
        show-values
        show-legend
        y-axis-label="Sales ($)"
      ></ui-bar-chart>
    </div>

    <div class="demo-block">
      <h3>Horizontal Bar Chart</h3>
      <ui-bar-chart
        id="horizontal-bar-chart"
        title="Top Products"
        subtitle="Best selling products this month"
        orientation="horizontal"
        bar-color="#8b5cf6"
        show-values
        height="300"
      ></ui-bar-chart>
    </div>

    <div class="demo-block">
      <h3>Large Numbers (Auto-formatted)</h3>
      <ui-bar-chart
        id="large-numbers-chart"
        title="Global Markets"
        subtitle="Market size by country (values in millions)"
        show-values
        show-grid
        y-axis-label="Market Size"
      ></ui-bar-chart>
    </div>

    <div class="demo-block">
      <h3>Custom Colors</h3>
      <ui-bar-chart
        id="custom-colors-chart"
        title="Grading Results"
        subtitle="Scores with custom colors"
        show-values
        height="260"
      ></ui-bar-chart>
    </div>

    <div class="demo-block playground">
      <h3>🎮 Interactive Playground</h3>
      <div class="playground-controls">
        <div class="control-group">
          <label>Orientation:</label>
          <select id="chart-orientation">
            <option value="vertical" selected>Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>
        <div class="control-group">
          <label><input type="checkbox" id="chart-stacked"> Stacked</label>
        </div>
        <div class="control-group">
          <label><input type="checkbox" id="chart-show-values" checked> Show Values</label>
        </div>
        <div class="control-group">
          <label><input type="checkbox" id="chart-show-grid" checked> Show Grid</label>
        </div>
        <div class="control-group">
          <label><input type="checkbox" id="chart-show-legend" checked> Show Legend</label>
        </div>
        <div class="control-group">
          <label>Bar Width: <span id="bar-width-value">60%</span></label>
          <input type="range" id="chart-bar-width" min="20" max="90" value="60">
        </div>
        <div class="control-group">
          <label>Height: <span id="height-value">400px</span></label>
          <input type="range" id="chart-height" min="200" max="600" value="400">
        </div>
        <div class="control-group">
          <label>Border Radius: <span id="border-radius-value">4px</span></label>
          <input type="range" id="chart-border-radius" min="0" max="20" value="4">
        </div>
        <div class="control-group">
          <label><input type="checkbox" id="chart-animate" checked> Animate</label>
        </div>
      </div>

      <div class="playground-actions">
        <button id="generate-random-data" class="action-btn">🎲 Generate Random Data</button>
        <button id="reset-playground" class="action-btn">🔄 Reset</button>
      </div>

      <div class="playground-preview">
        <ui-bar-chart id="playground-chart" title="Playground Chart" subtitle="Live configuration"></ui-bar-chart>
      </div>
    </div>
  `;

  console.log('🎨 Bar Chart Demo Initialized');

  // Simple Bar Chart
  const simpleChart = document.getElementById('simple-bar-chart');
  if (simpleChart) {
    simpleChart.data = [
      { label: 'Jan', value: 4200, color: '#3b82f6' },
      { label: 'Feb', value: 5100, color: '#8b5cf6' },
      { label: 'Mar', value: 3900, color: '#ec4899' },
      { label: 'Apr', value: 6200, color: '#10b981' },
      { label: 'May', value: 7500, color: '#f59e0b' },
      { label: 'Jun', value: 6800, color: '#ef4444' },
    ];
  }

  // Multiple Datasets (Grouped)
  const groupedChart = document.getElementById('grouped-bar-chart');
  if (groupedChart) {
    groupedChart.labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    groupedChart.datasets = [
      {
        label: '2023 Revenue',
        data: [12000, 19000, 15000, 22000],
        backgroundColor: '#3b82f6',
      },
      {
        label: '2024 Revenue',
        data: [14000, 21000, 18000, 25000],
        backgroundColor: '#10b981',
      },
    ];
  }

  // Stacked Bar Chart
  const stackedChart = document.getElementById('stacked-bar-chart');
  if (stackedChart) {
    stackedChart.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    stackedChart.datasets = [
      { label: 'Electronics', data: [1200, 1400, 1300, 1600], backgroundColor: '#3b82f6' },
      { label: 'Clothing', data: [800, 900, 950, 1100], backgroundColor: '#10b981' },
      { label: 'Food', data: [600, 700, 750, 900], backgroundColor: '#f59e0b' },
      { label: 'Home', data: [400, 500, 450, 600], backgroundColor: '#ef4444' },
    ];
  }

  // Horizontal Bar Chart
  const horizontalChart = document.getElementById('horizontal-bar-chart');
  if (horizontalChart) {
    horizontalChart.data = [
      { label: 'Product Alpha', value: 8500 },
      { label: 'Product Beta', value: 6200 },
      { label: 'Product Gamma', value: 5800 },
      { label: 'Product Delta', value: 4900 },
      { label: 'Product Epsilon', value: 3200 },
    ];
  }

  // Large Numbers Chart
  const largeNumbersChart = document.getElementById('large-numbers-chart');
  if (largeNumbersChart) {
    largeNumbersChart.data = [
      { label: 'USA', value: 1500000, color: '#3b82f6' },
      { label: 'China', value: 2300000, color: '#ef4444' },
      { label: 'India', value: 1800000, color: '#f59e0b' },
      { label: 'Brazil', value: 950000, color: '#10b981' },
      { label: 'Germany', value: 720000, color: '#8b5cf6' },
    ];
  }

  // Custom Colors Chart
  const customColorsChart = document.getElementById('custom-colors-chart');
  if (customColorsChart) {
    customColorsChart.data = [
      { label: 'A', value: 85, color: '#ef4444' },
      { label: 'B', value: 92, color: '#f59e0b' },
      { label: 'C', value: 78, color: '#eab308' },
      { label: 'D', value: 88, color: '#10b981' },
      { label: 'E', value: 95, color: '#3b82f6' },
      { label: 'F', value: 73, color: '#8b5cf6' },
    ];
  }

  // Playground Chart
  const playgroundChart = document.getElementById('playground-chart');
  
  // Playground Controls
  const orientationSelect = document.getElementById('chart-orientation');
  const stackedCheckbox = document.getElementById('chart-stacked');
  const showValuesCheckbox = document.getElementById('chart-show-values');
  const showGridCheckbox = document.getElementById('chart-show-grid');
  const showLegendCheckbox = document.getElementById('chart-show-legend');
  const barWidthSlider = document.getElementById('chart-bar-width');
  const barWidthValue = document.getElementById('bar-width-value');
  const heightSlider = document.getElementById('chart-height');
  const heightValue = document.getElementById('height-value');
  const borderRadiusSlider = document.getElementById('chart-border-radius');
  const borderRadiusValue = document.getElementById('border-radius-value');
  const animateCheckbox = document.getElementById('chart-animate');

  const updatePlayground = () => {
    if (!playgroundChart) return;

    playgroundChart.orientation = orientationSelect?.value || 'vertical';
    playgroundChart.stacked = stackedCheckbox?.checked || false;
    playgroundChart.showValues = showValuesCheckbox?.checked !== false;
    playgroundChart.showGrid = showGridCheckbox?.checked !== false;
    playgroundChart.showLegend = showLegendCheckbox?.checked !== false;
    playgroundChart.barWidth = parseInt(barWidthSlider?.value || '60');
    playgroundChart.height = parseInt(heightSlider?.value || '400');
    playgroundChart.borderRadius = parseInt(borderRadiusSlider?.value || '4');
    playgroundChart.animate = animateCheckbox?.checked !== false;

    // Update value displays
    if (barWidthValue) barWidthValue.textContent = playgroundChart.barWidth + '%';
    if (heightValue) heightValue.textContent = playgroundChart.height + 'px';
    if (borderRadiusValue) borderRadiusValue.textContent = playgroundChart.borderRadius + 'px';

    console.log('🎨 Playground updated:', {
      orientation: playgroundChart.orientation,
      stacked: playgroundChart.stacked,
      barWidth: playgroundChart.barWidth,
    });
  };

  // Initial playground data
  if (playgroundChart) {
    playgroundChart.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    playgroundChart.datasets = [
      {
        label: 'Sales',
        data: [4200, 5100, 3900, 6200, 7500, 6800],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Expenses',
        data: [2800, 3200, 2900, 3800, 4200, 3900],
        backgroundColor: '#ef4444',
      },
    ];
  }

  // Attach event listeners
  orientationSelect?.addEventListener('change', updatePlayground);
  stackedCheckbox?.addEventListener('change', updatePlayground);
  showValuesCheckbox?.addEventListener('change', updatePlayground);
  showGridCheckbox?.addEventListener('change', updatePlayground);
  showLegendCheckbox?.addEventListener('change', updatePlayground);
  barWidthSlider?.addEventListener('input', updatePlayground);
  heightSlider?.addEventListener('input', updatePlayground);
  borderRadiusSlider?.addEventListener('input', updatePlayground);
  animateCheckbox?.addEventListener('change', updatePlayground);

  // Initialize playground
  updatePlayground();

  // Dynamic Data Generator
  const generateDataBtn = document.getElementById('generate-random-data');
  generateDataBtn?.addEventListener('click', () => {
    if (!playgroundChart) return;

    const randomData = Array.from({ length: 6 }, (_, i) => ({
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
      value: Math.floor(Math.random() * 10000) + 1000,
    }));

    playgroundChart.data = randomData;
    console.log('🎲 Generated random data:', randomData);
  });

  // Reset Playground
  const resetPlaygroundBtn = document.getElementById('reset-playground');
  resetPlaygroundBtn?.addEventListener('click', () => {
    if (orientationSelect) orientationSelect.value = 'vertical';
    if (stackedCheckbox) stackedCheckbox.checked = false;
    if (showValuesCheckbox) showValuesCheckbox.checked = true;
    if (showGridCheckbox) showGridCheckbox.checked = true;
    if (showLegendCheckbox) showLegendCheckbox.checked = true;
    if (barWidthSlider) barWidthSlider.value = '60';
    if (heightSlider) heightSlider.value = '400';
    if (borderRadiusSlider) borderRadiusSlider.value = '4';
    if (animateCheckbox) animateCheckbox.checked = true;

    updatePlayground();
    console.log('🔄 Playground reset to defaults');
  });

  console.log('✅ Bar Chart Demo Ready');
}
