// Component Demo Functions
export function initSpeedDialDemo() {
  const section = document.getElementById('speed-dial');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">⚡ Speed Dial Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Floating action button with expandable menu for quick actions.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicSpeedDial()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showSpeedDialPositions()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Positions</button>
      <button onclick="showSpeedDialColors()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Colors</button>
      <button onclick="showSpeedDialCustom()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Custom</button>
      <button onclick="showInteractiveSpeedDial()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="speedDialDemoContainer" style="margin-top: 20px;"></div>
  `;

  // Initialize with basic speed dial
  setTimeout(() => {
    // Speed Dial Demo Functions
    window.showBasicSpeedDial = function() {
    const container = document.getElementById('speedDialDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <h4>Basic Speed Dial</h4>
        <p style="color: #6b7280;">Click the button in the bottom-right corner to see the actions</p>
      </div>
    `;
    setTimeout(() => {
      const dial = document.createElement('ui-speed-dial');
      dial.setAttribute('position', 'bottom-right');
      dial.setAttribute('color', 'primary');
      dial.actions = [
        { id: 'add', label: 'Add Item', icon: '+', color: '#10b981' },
        { id: 'edit', label: 'Edit', icon: '✏️', color: '#3b82f6' },
        { id: 'share', label: 'Share', icon: '📤', color: '#f59e0b' },
        { id: 'delete', label: 'Delete', icon: '🗑️', color: '#ef4444' }
      ];
      container.appendChild(dial);
      
      dial.addEventListener('actionClick', (e) => {
        alert('Action clicked: ' + e.detail);
      });
    }, 100);
  };

  window.showSpeedDialPositions = function() {
    const container = document.getElementById('speedDialDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h4>Different Positions</h4>
        <p style="color: #6b7280; margin-bottom: 20px;">Speed dials placed in all four corners</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; text-align: center;">
          <div style="padding: 10px; background: #f3f4f6; border-radius: 6px;">
            <strong>Top Left</strong>
          </div>
          <div style="padding: 10px; background: #f3f4f6; border-radius: 6px;">
            <strong>Top Right</strong>
          </div>
          <div style="padding: 10px; background: #f3f4f6; border-radius: 6px;">
            <strong>Bottom Left</strong>
          </div>
          <div style="padding: 10px; background: #f3f4f6; border-radius: 6px;">
            <strong>Bottom Right</strong>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      const colors = ['primary', 'success', 'warning', 'danger'];
      
      positions.forEach((pos, idx) => {
        const dial = document.createElement('ui-speed-dial');
        dial.setAttribute('position', pos);
        dial.setAttribute('color', colors[idx]);
        dial.setAttribute('size', 'sm');
        dial.actions = [
          { id: 'action1', label: 'Action 1', icon: '1️⃣' },
          { id: 'action2', label: 'Action 2', icon: '2️⃣' },
          { id: 'action3', label: 'Action 3', icon: '3️⃣' }
        ];
        container.appendChild(dial);
      });
    }, 100);
  };

  window.showSpeedDialDirections = function() {
    const container = document.getElementById('speedDialDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <h4>Custom Directions</h4>
        <p style="color: #6b7280;">Force specific opening directions</p>
        <div style="margin-top: 20px; display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
          <div style="padding: 10px; background: #fef3c7; border-radius: 6px;">Up</div>
          <div style="padding: 10px; background: #dbeafe; border-radius: 6px;">Down</div>
          <div style="padding: 10px; background: #fce7f3; border-radius: 6px;">Left</div>
          <div style="padding: 10px; background: #dcfce7; border-radius: 6px;">Right</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const directions = [
        { dir: 'up', pos: 'bottom-left', color: 'warning' },
        { dir: 'down', pos: 'top-left', color: 'info' },
        { dir: 'left', pos: 'bottom-right', color: 'danger' },
        { dir: 'right', pos: 'bottom-left', color: 'success' }
      ];
      
      directions.forEach((config, idx) => {
        const dial = document.createElement('ui-speed-dial');
        dial.setAttribute('position', config.pos);
        dial.setAttribute('direction', config.dir);
        dial.setAttribute('color', config.color);
        dial.setAttribute('size', 'sm');
        dial.actions = [
          { id: 'a1', label: config.dir.toUpperCase(), icon: '→' },
          { id: 'a2', label: 'Action', icon: '★' }
        ];
        container.appendChild(dial);
      });
    }, 100);
  };

  window.showSpeedDialSizes = function() {
    const container = document.getElementById('speedDialDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <h4>Different Sizes</h4>
        <p style="color: #6b7280;">Small, Medium, and Large speed dials</p>
      </div>
    `;
    setTimeout(() => {
      const sizes = ['sm', 'md', 'lg'];
      const positions = ['bottom-left', 'bottom-right', 'top-right'];
      
      sizes.forEach((size, idx) => {
        const dial = document.createElement('ui-speed-dial');
        dial.setAttribute('position', positions[idx]);
        dial.setAttribute('size', size);
        dial.setAttribute('color', 'primary');
        dial.actions = [
          { id: 'add', label: 'Add (' + size.toUpperCase() + ')', icon: '+' },
          { id: 'edit', label: 'Edit', icon: '✏️' }
        ];
        container.appendChild(dial);
      });
    }, 100);
  };

  window.showSpeedDialColors = function() {
    const container = document.getElementById('speedDialDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h4>Color Variants</h4>
        <p style="color: #6b7280; margin-bottom: 20px;">All available color schemes</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
          <div style="padding: 10px; background: #dbeafe; border-radius: 6px;">Primary</div>
          <div style="padding: 10px; background: #e5e7eb; border-radius: 6px;">Secondary</div>
          <div style="padding: 10px; background: #dcfce7; border-radius: 6px;">Success</div>
          <div style="padding: 10px; background: #fee2e2; border-radius: 6px;">Danger</div>
          <div style="padding: 10px; background: #fef3c7; border-radius: 6px;">Warning</div>
          <div style="padding: 10px; background: #cffafe; border-radius: 6px;">Info</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-left', 'bottom-right'];
      
      colors.forEach((color, idx) => {
        const dial = document.createElement('ui-speed-dial');
        dial.setAttribute('position', positions[idx]);
        dial.setAttribute('color', color);
        dial.setAttribute('size', 'sm');
        dial.actions = [
          { id: 'action1', label: color.toUpperCase(), icon: '★' },
          { id: 'action2', label: 'Action', icon: '⚡' }
        ];
        container.appendChild(dial);
      });
    }, 100);
  };

  window.showSpeedDialWithTooltips = function() {
    const container = document.getElementById('speedDialDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <h4>With Tooltips</h4>
        <p style="color: #6b7280;">Hover over action buttons to see tooltips</p>
      </div>
    `;
    setTimeout(() => {
      const dial = document.createElement('ui-speed-dial');
      dial.setAttribute('position', 'bottom-right');
      dial.setAttribute('color', 'primary');
      dial.setAttribute('show-tooltips', 'true');
      dial.setAttribute('size', 'md');
      dial.actions = [
        { id: 'save', label: 'Save Document', icon: '💾' },
        { id: 'print', label: 'Print Document', icon: '🖨️' },
        { id: 'email', label: 'Send via Email', icon: '📧' },
        { id: 'download', label: 'Download File', icon: '⬇️' },
        { id: 'settings', label: 'Open Settings', icon: '⚙️' }
      ];
      container.appendChild(dial);
      
      dial.addEventListener('actionClick', (e) => {
        const actionLabels = {
          'save': 'Document saved!',
          'print': 'Printing...',
          'email': 'Opening email client...',
          'download': 'Download started',
          'settings': 'Opening settings...'
        };
        alert(actionLabels[e.detail] || 'Action: ' + e.detail);
      });
    }, 100);
  };

  // Initialize home speed dial demo
  window.initHomeSpeedDial = function() {
    const container = document.getElementById('homeSpeedDialDemo');
    if (!container) return;
    
    setTimeout(() => {
      const dial = document.createElement('ui-speed-dial');
      dial.setAttribute('position', 'bottom-right');
      dial.setAttribute('color', 'primary');
      dial.setAttribute('size', 'md');
      dial.actions = [
        { id: 'add', label: 'Add', icon: '+', color: '#10b981' },
        { id: 'edit', label: 'Edit', icon: '✏️', color: '#3b82f6' },
        { id: 'share', label: 'Share', icon: '📤', color: '#f59e0b' }
      ];
      container.appendChild(dial);
    }, 200);
  };

  showBasicSpeedDial();
  }, 100);

  // Interactive Playground
  window.showInteractiveSpeedDial = function() {
    const container = document.getElementById('speedDialDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <h3>🎮 Interactive Playground</h3>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Position:</label>
                <select id="speedDialPosition" onchange="updateInteractiveSpeedDial()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right" selected>Bottom Right</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
                <select id="speedDialSize" onchange="updateInteractiveSpeedDial()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Color:</label>
                <select id="speedDialColor" onchange="updateInteractiveSpeedDial()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="primary" selected>Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="danger">Danger</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Direction:</label>
                <select id="speedDialDirection" onchange="updateInteractiveSpeedDial()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="auto" selected>Auto</option>
                  <option value="up">Up</option>
                  <option value="down">Down</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Tooltip Position:</label>
                <select id="speedDialTooltipPosition" onchange="updateInteractiveSpeedDial()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="auto" selected>Auto</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Icon:</label>
                <input type="text" id="speedDialIcon" value="+" onchange="updateInteractiveSpeedDial()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="speedDialShowTooltips" checked onchange="updateInteractiveSpeedDial()" style="cursor: pointer;">
                <label for="speedDialShowTooltips" style="cursor: pointer;">Show Tooltips</label>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Actions (JSON):</label>
                <textarea id="speedDialActions" onchange="updateInteractiveSpeedDial()" 
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 150px;">[
  {"id": "add", "label": "Add", "icon": "➕", "color": "#10b981"},
  {"id": "edit", "label": "Edit", "icon": "✏️", "color": "#3b82f6"},
  {"id": "share", "label": "Share", "icon": "📤", "color": "#f59e0b"},
  {"id": "delete", "label": "Delete", "icon": "🗑️", "color": "#ef4444"}
]</textarea>
              </div>
            </div>
          </div>
          
          <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; position: relative; min-height: 500px;">
            <h4 style="margin-top: 0;">Preview:</h4>
            <p style="color: #6b7280; font-size: 14px;">Click the button to see the speed dial actions</p>
            <div id="interactiveSpeedDialContainer" style="margin-top: 20px;"></div>
            <div id="speedDialOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
          </div>
        </div>
      </div>
    `;
    
    updateInteractiveSpeedDial();
  };

  window.updateInteractiveSpeedDial = function() {
    const position = document.getElementById('speedDialPosition').value;
    const size = document.getElementById('speedDialSize').value;
    const color = document.getElementById('speedDialColor').value;
    const direction = document.getElementById('speedDialDirection').value;
    const tooltipPosition = document.getElementById('speedDialTooltipPosition').value;
    const icon = document.getElementById('speedDialIcon').value;
    const showTooltips = document.getElementById('speedDialShowTooltips').checked;
    const actionsText = document.getElementById('speedDialActions').value;
    
    const container = document.getElementById('interactiveSpeedDialContainer');
    const outputDiv = document.getElementById('speedDialOutput');
    
    if (!container) return;
    
    // Remove existing speed dial
    const existingDial = container.querySelector('ui-speed-dial');
    if (existingDial) {
      existingDial.remove();
    }
    
    try {
      const actions = JSON.parse(actionsText);
      
      const dial = document.createElement('ui-speed-dial');
      dial.setAttribute('position', position);
      dial.setAttribute('size', size);
      dial.setAttribute('color', color);
      dial.setAttribute('direction', direction);
      dial.setAttribute('tooltip-position', tooltipPosition);
      dial.setAttribute('icon', icon);
      if (showTooltips) {
        dial.setAttribute('show-tooltips', 'true');
      }
      dial.actions = actions;
      
      container.appendChild(dial);
      
      // Add event listener
      dial.addEventListener('actionClick', (event) => {
        outputDiv.style.display = 'block';
        outputDiv.textContent = `Action clicked: ${event.detail}`;
      });
      
      dial.addEventListener('speedDialToggle', (event) => {
        outputDiv.style.display = 'block';
        outputDiv.textContent = `Speed dial ${event.detail ? 'opened' : 'closed'}`;
      });
      
      outputDiv.style.display = 'none';
    } catch (error) {
      outputDiv.style.display = 'block';
      outputDiv.style.color = '#ef4444';
      outputDiv.textContent = `Invalid JSON: ${error.message}`;
    }
  };
}
