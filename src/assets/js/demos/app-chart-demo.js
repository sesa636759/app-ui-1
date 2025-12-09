// App Chart Demo
export function initAppChartDemo() {
  const section = document.getElementById('chart');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📈 Chart Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Render charts using Chart.js via the <code>app-chart</code> web component.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicChart()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showChartPlayground()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="chartDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicChart = function() {
      const container = document.getElementById('chartDemoContainer');
      if (!container) return;

      const sampleData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          { label: 'Sales', data: [12, 19, 3, 5, 2, 3] },
          { label: 'Returns', data: [2, 3, 4, 1, 2, 0] }
        ]
      };

      container.innerHTML = `
        <div class="demo-block">
          <h3>Basic Line Chart</h3>
          <app-chart id="basicChart" chart-type="line"></app-chart>
        </div>
      `;

      const chartEl = document.getElementById('basicChart');
      chartEl.data = sampleData;
      chartEl.colors = ['#3b82f6', '#ef4444'];
      chartEl.options = { plugins: { tooltip: { enabled: true } } };
    };

    window.showChartPlayground = function() {
      const container = document.getElementById('chartDemoContainer');
      if (!container) return;

      container.innerHTML = `
        <div style="background-color: white; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h3 style="margin: 0 0 12px 0;">🎮 Chart Playground</h3>
          <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 12px;">
            <div style="flex: 1; min-width: 280px;">
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div>
                  <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Chart Type</label>
                  <select id="chartType" onchange="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                    <option value="line">line</option>
                    <option value="bar">bar</option>
                    <option value="pie">pie</option>
                    <option value="doughnut">doughnut</option>
                    <option value="radar">radar</option>
                    <option value="polarArea">polarArea</option>
                    <option value="bubble">bubble</option>
                    <option value="scatter">scatter</option>
                  </select>
                </div>
                <div>
                  <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Data (JSON)</label>
                  <textarea id="chartDataJson" rows="6" oninput="updateChartPlayground()"
                    style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 12px;">
{
  "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "datasets": [
    { "label": "Sales", "data": [12, 19, 3, 5, 2, 3] },
    { "label": "Returns", "data": [2, 3, 4, 1, 2, 0] }
  ]
}
                  </textarea>
                </div>
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                  <div style="display:flex; gap:6px; align-items:center;">
                    <input type="checkbox" id="xBeginAtZero" onchange="updateChartPlayground()">
                    <label for="xBeginAtZero" style="font-size: 13px;">X begin at zero</label>
                  </div>
                  <div style="display:flex; gap:6px; align-items:center;">
                    <input type="checkbox" id="yBeginAtZero" checked onchange="updateChartPlayground()">
                    <label for="yBeginAtZero" style="font-size: 13px;">Y begin at zero</label>
                  </div>
                  <div style="display:flex; gap:6px; align-items:center;">
                    <input type="checkbox" id="stacked" onchange="updateChartPlayground()">
                    <label for="stacked" style="font-size: 13px;">Stacked</label>
                  </div>
                </div>
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                  <div style="display:flex; gap:6px; align-items:center;">
                    <input type="checkbox" id="xGrid" checked onchange="updateChartPlayground()">
                    <label for="xGrid" style="font-size: 13px;">Show X grid</label>
                  </div>
                  <div style="display:flex; gap:6px; align-items:center;">
                    <input type="checkbox" id="yGrid" checked onchange="updateChartPlayground()">
                    <label for="yGrid" style="font-size: 13px;">Show Y grid</label>
                  </div>
                </div>
                <div>
                  <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Title</label>
                  <input type="text" id="chartTitle" value="" oninput="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                </div>
                <div>
                  <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Colors (comma-separated)</label>
                  <input type="text" id="chartColors" value="#3b82f6, #ef4444" oninput="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                </div>
                <div style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px;">
                  <div>
                    <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Border Width</label>
                    <input type="number" id="borderWidth" value="2" min="0" max="10" oninput="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                  </div>
                  <div>
                    <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Background Alpha (0-1)</label>
                    <input type="number" id="bgAlpha" value="0.3" step="0.1" min="0" max="1" oninput="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                  </div>
                  <div>
                    <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Point Radius</label>
                    <input type="number" id="pointRadius" value="3" min="0" max="20" oninput="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                  </div>
                  <div>
                    <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Line Tension (0-1)</label>
                    <input type="number" id="tension" value="0.3" step="0.1" min="0" max="1" oninput="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                  </div>
                  <div>
                    <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Fill Area</label>
                    <select id="fill" onchange="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                      <option value="none">none</option>
                      <option value="origin">origin</option>
                      <option value="start">start</option>
                      <option value="end">end</option>
                    </select>
                  </div>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                  <input type="checkbox" id="showLegend" checked onchange="updateChartPlayground()">
                  <label for="showLegend" style="font-size: 13px;">Show Legend</label>
                </div>
                <div>
                  <label style="display:block; margin-bottom:4px; font-weight:500; font-size: 13px;">Legend Position</label>
                  <select id="legendPosition" onchange="updateChartPlayground()" style="width:100%; padding:6px; border:1px solid #d1d5db; border-radius:4px; font-size: 13px;">
                    <option value="top">top</option>
                    <option value="bottom">bottom</option>
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </div>
              </div>
            </div>
            <div style="flex: 1; min-width: 280px; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; min-height: 400px; display: flex; flex-direction: column;">
              <app-chart id="playgroundChart" chart-type="line" style="flex: 1; min-height: 350px;"></app-chart>
            </div>
          </div>
        </div>
      `;

      // Wait for component to be ready, then render
      setTimeout(() => {
        updateChartPlayground();
      }, 100);
    };

    window.updateChartPlayground = function() {
      const chartEl = document.getElementById('playgroundChart');
      if (!chartEl) {
        console.warn('Chart element not found');
        return;
      }

      const type = document.getElementById('chartType')?.value || 'line';
      const colorsText = document.getElementById('chartColors')?.value || '';
      const colors = colorsText.split(',').map(c => c.trim()).filter(Boolean);
      const showLegend = document.getElementById('showLegend')?.checked || false;
      const legendPosition = document.getElementById('legendPosition')?.value || 'top';
      const chartTitle = document.getElementById('chartTitle')?.value || '';
      const xBeginAtZero = document.getElementById('xBeginAtZero')?.checked || false;
      const yBeginAtZero = document.getElementById('yBeginAtZero')?.checked || false;
      const stacked = document.getElementById('stacked')?.checked || false;
      const xGrid = document.getElementById('xGrid')?.checked || false;
      const yGrid = document.getElementById('yGrid')?.checked || false;
      const borderWidth = parseFloat(document.getElementById('borderWidth')?.value || '2');
      const pointRadius = parseFloat(document.getElementById('pointRadius')?.value || '3');
      const tension = parseFloat(document.getElementById('tension')?.value || '0.3');
      const fill = document.getElementById('fill')?.value || 'none';
      const bgAlpha = parseFloat(document.getElementById('bgAlpha')?.value || '0.3');

      // Safe parse JSON
      let data = { datasets: [] };
      const raw = document.getElementById('chartDataJson')?.value || '';
      try {
        const parsed = JSON.parse(raw);
        data = parsed;
      } catch (e) {
        console.warn('Invalid chart data JSON', e);
        return;
      }

      function applyAlpha(hex, alpha) {
        // Supports #RRGGBB or rgb(a)
        if (!hex) return hex;
        if (hex.startsWith('#')) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        if (hex.startsWith('rgb')) {
          // replace existing alpha
          const parts = hex.replace(/rgba?\(([^)]+)\)/, '$1').split(',').map(s => s.trim());
          const [r, g, b] = parts;
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return hex;
      }

      // Apply dataset-level styling
      if (Array.isArray(data.datasets)) {
        data.datasets = data.datasets.map((ds, i) => {
          const color = colors[i % Math.max(colors.length, 1)] || ds.borderColor || '#3b82f6';
          return {
            ...ds,
            borderColor: color,
            backgroundColor: applyAlpha(color, bgAlpha),
            borderWidth: borderWidth,
            pointRadius: pointRadius,
            tension: tension,
            fill: fill === 'none' ? false : fill,
          };
        });
      }

      // Set chart type first
      chartEl.chartType = type;
      
      // Then set data and other properties
      chartEl.data = JSON.parse(JSON.stringify(data)); // Deep clone to trigger reactivity
      chartEl.colors = colors;
      chartEl.showLegend = showLegend;
      chartEl.legendPosition = legendPosition;
      chartEl.chartTitle = chartTitle;
      
      // Axis controls via props
      chartEl.xBeginAtZero = xBeginAtZero;
      chartEl.yBeginAtZero = yBeginAtZero;
      chartEl.stacked = stacked;

      // Grid toggles via options passthrough
      chartEl.options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          tooltip: { enabled: true },
          legend: {
            display: showLegend,
            position: legendPosition
          },
          title: chartTitle ? {
            display: true,
            text: chartTitle
          } : undefined
        },
        scales: {
          x: { 
            grid: { display: xGrid },
            beginAtZero: xBeginAtZero,
            stacked: stacked
          },
          y: { 
            grid: { display: yGrid },
            beginAtZero: yBeginAtZero,
            stacked: stacked
          },
        }
      };
    };

    // Default view
    showBasicChart();
  }, 100);
}

// Loader expects init function named from section id 'chart' => 'Chart' => initChartDemo
export function initChartDemo() {
  return initAppChartDemo();
}
