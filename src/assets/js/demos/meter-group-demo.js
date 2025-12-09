// Component Demo Functions
export function initMeterGroupDemo() {
  const section = document.getElementById('meter-group');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📊 Meter Group Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Visual representation of multiple values with labels and colors.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicMeter()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showVerticalMeter()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Vertical</button>
      <button onclick="showMultiValueMeter()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Multi-Value</button>
      <button onclick="showCircleMeter()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Circle</button>
      <button onclick="showMeterSizes()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showMeterWithLegend()" style="padding: 8px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">With Legend</button>
      <button onclick="showMeterUseCases()" style="padding: 8px 16px; background-color: #84cc16; color: white; border: none; border-radius: 6px; cursor: pointer;">Use Cases</button>
      <button onclick="showInteractiveMeterGroup()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="meterDemoContainer" style="margin-top: 20px;"></div>
  `;

  // Initialize with basic meter
  setTimeout(() => {
    // Meter Group Demo Functions
    window.showBasicMeter = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    const values = [
      { label: "Used", value: 65, color: "#ef4444" },
      { label: "Free", value: 35, color: "#10b981" }
    ];
    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Storage Usage</h4>
        <ui-meter-group id="basicMeter" show-legend="true"></ui-meter-group>
      </div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        const meter = document.getElementById('basicMeter');
        if (meter) meter.values = values;
      }, 50);
    });
  };

  window.showVerticalMeter = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    const values = [
      { label: "CPU", value: 45, color: "#3b82f6" },
      { label: "Memory", value: 30, color: "#10b981" },
      { label: "Disk", value: 25, color: "#f59e0b" }
    ];
    container.innerHTML = `
      <div style="display: flex; gap: 30px; align-items: center;">
        <ui-meter-group id="verticalMeter" orientation="vertical" show-legend="true"></ui-meter-group>
        <p style="color: #6b7280;">System Resources (Vertical)</p>
      </div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        const meter = document.getElementById('verticalMeter');
        if (meter) meter.values = values;
      }, 50);
    });
  };

  window.showCircleMeter = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    const values = [
      { label: "Used", value: 65, color: "#ef4444" },
      { label: "Cache", value: 20, color: "#f59e0b" },
      { label: "Free", value: 15, color: "#10b981" }
    ];
    container.innerHTML = `
      <div style="display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <h4>Storage Usage</h4>
          <ui-meter-group id="circleMeter1" shape="circle" show-legend="true"></ui-meter-group>
        </div>
        <div style="text-align: center;">
          <h4>Project Progress</h4>
          <ui-meter-group id="circleMeter2" shape="circle" show-legend="true" size="lg"></ui-meter-group>
        </div>
      </div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        const meter1 = document.getElementById('circleMeter1');
        const meter2 = document.getElementById('circleMeter2');
        if (meter1) meter1.values = values;
        if (meter2) {
          meter2.values = [
            { label: "Completed", value: 75, color: "#10b981" },
            { label: "In Progress", value: 15, color: "#f59e0b" },
            { label: "Pending", value: 10, color: "#e5e7eb" }
          ];
        }
      }, 50);
    });
  };

  window.showMeterSizes = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    const values = [
      { label: "Used", value: 70, color: "#3b82f6" },
      { label: "Free", value: 30, color: "#e5e7eb" }
    ];
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4>Small</h4>
          <ui-meter-group id="meterSm" size="sm"></ui-meter-group>
        </div>
        <div>
          <h4>Medium</h4>
          <ui-meter-group id="meterMd" size="md"></ui-meter-group>
        </div>
        <div>
          <h4>Large</h4>
          <ui-meter-group id="meterLg" size="lg"></ui-meter-group>
        </div>
      </div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        ['meterSm', 'meterMd', 'meterLg'].forEach(id => {
          const meter = document.getElementById(id);
          if (meter) meter.values = values;
        });
      }, 50);
    });
  };

  window.showMeterWithLegend = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    const values = [
      { label: "Images", value: 35, color: "#8b5cf6" },
      { label: "Videos", value: 28, color: "#3b82f6" },
      { label: "Documents", value: 22, color: "#10b981" },
      { label: "Other", value: 15, color: "#f59e0b" }
    ];
    container.innerHTML = `
      <div>
        <h4>File Storage Breakdown</h4>
        <ui-meter-group id="meterLegend" show-legend="true" show-values="true"></ui-meter-group>
      </div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        const meter = document.getElementById('meterLegend');
        if (meter) meter.values = values;
      }, 50);
    });
  };

  window.showMeterUseCases = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    const diskValues = [
      { label: "Used", value: 450, color: "#ef4444" },
      { label: "Free", value: 550, color: "#10b981" }
    ];
    const taskValues = [
      { label: "Completed", value: 75, color: "#10b981" },
      { label: "In Progress", value: 15, color: "#f59e0b" },
      { label: "Pending", value: 10, color: "#e5e7eb" }
    ];
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>📀 Disk Usage (450GB / 1TB)</h4>
          <ui-meter-group id="diskMeter" show-legend="true" max="1000"></ui-meter-group>
        </div>
        <div>
          <h4>✅ Project Progress</h4>
          <ui-meter-group id="taskMeter" show-legend="true"></ui-meter-group>
        </div>
      </div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        const diskMeter = document.getElementById('diskMeter');
        const taskMeter = document.getElementById('taskMeter');
        if (diskMeter) diskMeter.values = diskValues;
        if (taskMeter) taskMeter.values = taskValues;
      }, 50);
    });
  };

  window.showMultiValueMeter = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    const values = [
      { label: "Project A", value: 30, color: "#3b82f6" },
      { label: "Project B", value: 25, color: "#10b981" },
      { label: "Project C", value: 20, color: "#f59e0b" },
      { label: "Project D", value: 15, color: "#ef4444" },
      { label: "Project E", value: 10, color: "#8b5cf6" }
    ];
    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Budget Allocation (%)</h4>
        <ui-meter-group id="multiMeter" show-legend="true" show-values="true"></ui-meter-group>
      </div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        const meter = document.getElementById('multiMeter');
        if (meter) meter.values = values;
      }, 50);
    });
  };

  window.showInteractiveMeterGroup = function() {
    const container = document.getElementById('meterDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <h3>🎮 Interactive Playground</h3>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Orientation:</label>
                <select id="meterOrientation" onchange="updateInteractiveMeter()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="horizontal" selected>Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Shape:</label>
                <select id="meterShape" onchange="updateInteractiveMeter()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="line" selected>Line</option>
                  <option value="circle">Circle</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
                <select id="meterSize" onchange="updateInteractiveMeter()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="meterShowLabels" checked onchange="updateInteractiveMeter()" style="cursor: pointer;">
                <label for="meterShowLabels" style="cursor: pointer;">Show Labels</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="meterShowValues" checked onchange="updateInteractiveMeter()" style="cursor: pointer;">
                <label for="meterShowValues" style="cursor: pointer;">Show Values</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="meterShowLegend" checked onchange="updateInteractiveMeter()" style="cursor: pointer;">
                <label for="meterShowLegend" style="cursor: pointer;">Show Legend</label>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Min Value:</label>
                <input type="number" id="meterMin" value="0" onchange="updateInteractiveMeter()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Max Value:</label>
                <input type="number" id="meterMax" value="100" onchange="updateInteractiveMeter()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Values (JSON):</label>
                <textarea id="meterValues" onchange="updateInteractiveMeter()" 
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 180px;">[
  {"label": "Used", "value": 65, "color": "#ef4444"},
  {"label": "Cache", "value": 20, "color": "#f59e0b"},
  {"label": "Free", "value": 15, "color": "#10b981"}
]</textarea>
              </div>
              
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="loadMeterPreset('storage')" style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">💾 Storage</button>
                <button onclick="loadMeterPreset('resources')" style="padding: 6px 12px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">🖥️ Resources</button>
                <button onclick="loadMeterPreset('progress')" style="padding: 6px 12px; background-color: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">📊 Progress</button>
                <button onclick="loadMeterPreset('budget')" style="padding: 6px 12px; background-color: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">💰 Budget</button>
              </div>
            </div>
          </div>
          
          <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; min-height: 500px;">
            <h4 style="margin-top: 0;">Preview:</h4>
            <div id="interactiveMeterContainer" style="margin-top: 20px;"></div>
            <div id="meterOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; color: #6b7280;"></div>
          </div>
        </div>
      </div>
    `;
    
    updateInteractiveMeter();
  };

  window.updateInteractiveMeter = function() {
    const orientation = document.getElementById('meterOrientation').value;
    const shape = document.getElementById('meterShape').value;
    const size = document.getElementById('meterSize').value;
    const showLabels = document.getElementById('meterShowLabels').checked;
    const showValues = document.getElementById('meterShowValues').checked;
    const showLegend = document.getElementById('meterShowLegend').checked;
    const min = document.getElementById('meterMin').value;
    const max = document.getElementById('meterMax').value;
    const valuesText = document.getElementById('meterValues').value;
    
    const container = document.getElementById('interactiveMeterContainer');
    const outputDiv = document.getElementById('meterOutput');
    
    if (!container) return;
    
    // Remove existing meter
    const existingMeter = container.querySelector('ui-meter-group');
    if (existingMeter) {
      existingMeter.remove();
    }
    
    try {
      const values = JSON.parse(valuesText);
      
      const meter = document.createElement('ui-meter-group');
      meter.setAttribute('orientation', orientation);
      meter.setAttribute('shape', shape);
      meter.setAttribute('size', size);
      if (showLabels) meter.setAttribute('show-labels', 'true');
      if (showValues) meter.setAttribute('show-values', 'true');
      if (showLegend) meter.setAttribute('show-legend', 'true');
      meter.setAttribute('min', min);
      meter.setAttribute('max', max);
      meter.values = values;
      
      container.appendChild(meter);
      
      // Calculate totals
      const total = values.reduce((sum, v) => sum + v.value, 0);
      outputDiv.textContent = `Total: ${total} / ${max} (${((total/max) * 100).toFixed(1)}%)`;
      outputDiv.style.color = '#6b7280';
    } catch (error) {
      outputDiv.style.color = '#ef4444';
      outputDiv.textContent = `Invalid JSON: ${error.message}`;
    }
  };

  window.loadMeterPreset = function(preset) {
    const valuesTextarea = document.getElementById('meterValues');
    const maxInput = document.getElementById('meterMax');
    
    const presets = {
      storage: {
        max: 100,
        values: [
          {"label": "Documents", "value": 35, "color": "#3b82f6"},
          {"label": "Photos", "value": 28, "color": "#8b5cf6"},
          {"label": "Videos", "value": 22, "color": "#ef4444"},
          {"label": "Other", "value": 10, "color": "#f59e0b"},
          {"label": "Free", "value": 5, "color": "#10b981"}
        ]
      },
      resources: {
        max: 100,
        values: [
          {"label": "CPU", "value": 45, "color": "#ef4444"},
          {"label": "Memory", "value": 35, "color": "#f59e0b"},
          {"label": "Disk I/O", "value": 20, "color": "#3b82f6"}
        ]
      },
      progress: {
        max: 100,
        values: [
          {"label": "Completed", "value": 75, "color": "#10b981"},
          {"label": "In Progress", "value": 15, "color": "#f59e0b"},
          {"label": "Pending", "value": 10, "color": "#e5e7eb"}
        ]
      },
      budget: {
        max: 10000,
        values: [
          {"label": "Marketing", "value": 3500, "color": "#ec4899"},
          {"label": "Development", "value": 2800, "color": "#3b82f6"},
          {"label": "Operations", "value": 2200, "color": "#10b981"},
          {"label": "Research", "value": 1500, "color": "#8b5cf6"}
        ]
      }
    };
    
    const selectedPreset = presets[preset];
    if (selectedPreset) {
      valuesTextarea.value = JSON.stringify(selectedPreset.values, null, 2);
      maxInput.value = selectedPreset.max;
      updateInteractiveMeter();
    }
  };

  showBasicMeter();
  }, 100);
}
