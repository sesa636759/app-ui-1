// Panel Demo Functions
export function initPanelDemo() {
  const section = document.getElementById('panel');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📋 Panel Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Collapsible panels with customizable headers and content.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicPanel()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showCollapsiblePanel()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Collapsible</button>
      <button onclick="showPanelWithActions()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">With Actions</button>
      <button onclick="showNestedPanels()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Nested</button>
      <button onclick="showInteractivePanel()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="panelDemoContainer" style="margin-top: 20px;"></div>
  `;

  // Initialize with basic panel
  setTimeout(() => {
    function setupPanelEvents() {
      setTimeout(() => {
        document.querySelectorAll('ui-panel').forEach(panel => {
          panel.addEventListener('panelClose', (event) => {
            console.log('Panel closed:', event.detail);
            alert(`Panel '${event.detail.panelId}' close button clicked`);
          });

          panel.addEventListener('panelSettings', (event) => {
            console.log('Panel settings:', event.detail);
            alert(`Panel '${event.detail.panelId}' settings button clicked`);
          });
        });
      }, 100);
    }

    window.showBasicPanel = function() {
      const panelContainer = document.getElementById('panelDemoContainer');
      if (!panelContainer) return;
      panelContainer.innerHTML = `
        <ui-panel width="400px" height="300px" panel-title="Basic Panel" panel-id="panel1">
          <div slot="content">
            <p style="margin: 0 0 12px; color: #374151;">This is a basic panel with a title, content area, and action buttons.</p>
            <div style="padding: 12px; background-color: #f0f9ff; border-radius: 6px; margin-top: 12px;">
              <h4 style="margin: 0 0 8px; color: #0369a1;">Panel Features:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px;">
                <li>Customizable width and height</li>
                <li>Header with title</li>
                <li>Built-in action buttons</li>
                <li>Flexible content area</li>
              </ul>
            </div>
          </div>
          <div slot="footer">
            <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Save</button>
            <button style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 8px;">Cancel</button>
          </div>
        </ui-panel>

        <ui-panel width="400px" height="300px" panel-title="Information Panel" panel-id="panel2">
          <div slot="content">
            <div style="text-align: center; padding: 20px;">
              <span style="font-size: 48px;">📊</span>
              <h3 style="margin: 16px 0 8px; color: #1f2937;">Analytics Dashboard</h3>
              <p style="margin: 0; color: #6b7280;">View your statistics and insights</p>
            </div>
          </div>
        </ui-panel>
      `;
      setupPanelEvents();
    };

    window.showPanelWithActions = function() {
      const panelContainer = document.getElementById('panelDemoContainer');
      if (!panelContainer) return;
      panelContainer.innerHTML = `
        <ui-panel width="450px" height="350px" panel-title="Settings Panel" show-settings="true" show-close="true" panel-id="panel3">
          <div slot="content">
            <div style="padding: 10px;">
              <h4 style="margin: 0 0 16px; color: #1f2937;">User Preferences</h4>
              <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">
                  <input type="checkbox" checked style="margin-right: 8px;">
                  Enable notifications
                </label>
                <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">
                  <input type="checkbox" style="margin-right: 8px;">
                  Dark mode
                </label>
                <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">
                  <input type="checkbox" checked style="margin-right: 8px;">
                  Auto-save
                </label>
              </div>
              <div style="padding: 12px; background-color: #fef3c7; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">💡 Click the settings (⚙️) or close (✕) buttons in the header</p>
              </div>
            </div>
          </div>
          <div slot="footer">
            <button style="padding: 8px 16px; background-color: #059669; color: white; border: none; border-radius: 4px; cursor: pointer;">Apply Changes</button>
          </div>
        </ui-panel>

        <ui-panel width="450px" height="350px" panel-title="Notifications" show-close="true" show-settings="false" panel-id="panel4">
          <div slot="content">
            <div style="padding: 10px;">
              <div style="padding: 12px; background-color: #d1fae5; border-left: 4px solid #059669; margin-bottom: 12px; border-radius: 4px;">
                <p style="margin: 0; font-weight: 600; color: #065f46;">Success!</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #047857;">Your changes have been saved.</p>
              </div>
              <div style="padding: 12px; background-color: #dbeafe; border-left: 4px solid #3b82f6; margin-bottom: 12px; border-radius: 4px;">
                <p style="margin: 0; font-weight: 600; color: #1e40af;">Info</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #1e3a8a;">New update available.</p>
              </div>
              <div style="padding: 12px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0; font-weight: 600; color: #92400e;">Warning</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #78350f;">Please review your settings.</p>
              </div>
            </div>
          </div>
        </ui-panel>
      `;
      setupPanelEvents();
    };

    window.showCustomPanel = function() {
      const panelContainer = document.getElementById('panelDemoContainer');
      if (!panelContainer) return;
      panelContainer.innerHTML = `
        <ui-panel width="500px" height="400px" max-width="90vw" panel-title="Custom Styled Panel" panel-id="panel5">
          <div slot="content">
            <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="margin: 0 0 8px;">Premium Feature</h3>
              <p style="margin: 0; font-size: 14px;">Unlock advanced analytics and insights</p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div style="padding: 16px; background-color: #f9fafb; border-radius: 6px; text-align: center;">
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #3b82f6;">1,234</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">Users</p>
              </div>
              <div style="padding: 16px; background-color: #f9fafb; border-radius: 6px; text-align: center;">
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #059669;">$45K</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">Revenue</p>
              </div>
            </div>
          </div>
          <div slot="footer">
            <button style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;">Upgrade Now</button>
          </div>
        </ui-panel>
      `;
      setupPanelEvents();
    };

    window.showResponsivePanel = function() {
      const panelContainer = document.getElementById('panelDemoContainer');
      if (!panelContainer) return;
      panelContainer.innerHTML = `
        <ui-panel width="100%" max-width="600px" height="auto" max-height="500px" panel-title="Responsive Panel" panel-id="panel6">
          <div slot="content">
            <p style="margin: 0 0 16px; color: #374151;">This panel adapts to different screen sizes with max-width and max-height constraints.</p>
            <div style="padding: 16px; background-color: #f0f9ff; border-radius: 8px; margin-bottom: 16px;">
              <h4 style="margin: 0 0 12px; color: #0369a1;">Responsive Features:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">
                <li>Width: 100% with max-width: 600px</li>
                <li>Height: auto with max-height: 500px</li>
                <li>Adapts to container size</li>
                <li>Mobile-friendly design</li>
              </ul>
            </div>
            <div style="padding: 12px; background-color: #d1fae5; border-radius: 6px;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">✓ Try resizing your browser window!</p>
            </div>
          </div>
        </ui-panel>

        <ui-panel width="350px" height="250px" panel-title="Compact Panel" panel-id="panel7">
          <div slot="content">
            <div style="text-align: center; padding: 20px 10px;">
              <span style="font-size: 40px;">📱</span>
              <h4 style="margin: 12px 0 8px; color: #1f2937;">Mobile View</h4>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Optimized for small screens</p>
            </div>
          </div>
          <div slot="footer">
            <button style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; width: 100%;">Action</button>
          </div>
        </ui-panel>
      `;
      setupPanelEvents();
    };

    window.showCollapsiblePanel = function() {
      const panelContainer = document.getElementById('panelDemoContainer');
      if (!panelContainer) return;
      panelContainer.innerHTML = `
        <ui-panel width="450px" height="auto" panel-title="Collapsible Panel" panel-id="panel-collapsible">
          <div slot="content">
            <p style="margin: 0 0 12px; color: #374151;">This panel can be collapsed for better space management.</p>
            <div style="padding: 12px; background-color: #fef3c7; border-radius: 6px;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">💡 Use the toggle button to collapse/expand</p>
            </div>
          </div>
        </ui-panel>
      `;
      setupPanelEvents();
    };

    window.showNestedPanels = function() {
      const panelContainer = document.getElementById('panelDemoContainer');
      if (!panelContainer) return;
      panelContainer.innerHTML = `
        <ui-panel width="500px" height="auto" panel-title="Parent Panel" panel-id="panel-parent">
          <div slot="content">
            <p style="margin: 0 0 12px; color: #374151;">This demonstrates nested panels within a parent panel.</p>
            <div style="padding: 16px; background-color: #f9fafb; border-radius: 8px;">
              <h4 style="margin: 0 0 12px; color: #1f2937;">Nested Content</h4>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Panels can contain other complex content including other panels.</p>
            </div>
          </div>
        </ui-panel>
      `;
      setupPanelEvents();
    };

    window.showInteractivePanel = function() {
      const panelContainer = document.getElementById('panelDemoContainer');
      if (!panelContainer) return;
      
      panelContainer.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Customize the panel properties and see changes in real-time!</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Title:</span>
                <input type="text" id="panelTitle" value="Interactive Panel" oninput="updateInteractivePanel()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Width:</span>
                <input type="text" id="panelWidth" value="450px" oninput="updateInteractivePanel()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Height:</span>
                <input type="text" id="panelHeight" value="350px" oninput="updateInteractivePanel()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="panelShowClose" checked onchange="updateInteractivePanel()" style="cursor: pointer;">
                <span>Show Close Button</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="panelShowSettings" checked onchange="updateInteractivePanel()" style="cursor: pointer;">
                <span>Show Settings Button</span>
              </label>
            </div>
            
            <div style="margin-top: 12px; padding: 12px; background-color: #eff6ff; border-radius: 6px; border: 1px solid #bfdbfe;">
              <p style="margin: 0; font-size: 13px; color: #1e40af;">
                💡 <strong>Tip:</strong> Changes apply instantly as you type or select options!
              </p>
            </div>
          </div>
          
          <div style="display: flex; justify-content: center; padding: 20px;">
            <div id="interactivePanelContainer"></div>
          </div>
        </div>
      `;

      setTimeout(() => {
        updateInteractivePanel();
      }, 50);
    };

    window.updateInteractivePanel = function() {
      const title = document.getElementById('panelTitle')?.value || 'Interactive Panel';
      const width = document.getElementById('panelWidth')?.value || '450px';
      const height = document.getElementById('panelHeight')?.value || '350px';
      const showClose = document.getElementById('panelShowClose')?.checked || false;
      const showSettings = document.getElementById('panelShowSettings')?.checked || false;
      
      const panelContainer = document.getElementById('interactivePanelContainer');
      if (panelContainer) {
        panelContainer.innerHTML = `
          <ui-panel 
            width="${width}"
            height="${height}"
            panel-title="${title}"
            ${showClose ? 'show-close="true"' : 'show-close="false"'}
            ${showSettings ? 'show-settings="true"' : 'show-settings="false"'}
            panel-id="interactive-panel">
            <div slot="content">
              <div style="padding: 10px;">
                <p style="margin: 0 0 12px; color: #374151;">This is an interactive panel where you can customize various properties in real-time.</p>
                <div style="padding: 12px; background-color: #f0f9ff; border-radius: 6px; margin-top: 12px;">
                  <h4 style="margin: 0 0 8px; color: #0369a1;">Current Settings:</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px;">
                    <li>Width: ${width}</li>
                    <li>Height: ${height}</li>
                    <li>Close Button: ${showClose ? 'Visible' : 'Hidden'}</li>
                    <li>Settings Button: ${showSettings ? 'Visible' : 'Hidden'}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div slot="footer">
              <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Action</button>
            </div>
          </ui-panel>
        `;
        
        // Re-setup events for the new panel
        setTimeout(() => {
          document.querySelectorAll('ui-panel').forEach(panel => {
            panel.addEventListener('panelClose', (event) => {
              console.log('Panel closed:', event.detail);
              alert(`Panel '${event.detail.panelId}' close button clicked`);
            });

            panel.addEventListener('panelSettings', (event) => {
              console.log('Panel settings:', event.detail);
              alert(`Panel '${event.detail.panelId}' settings button clicked`);
            });
          });
        }, 100);
      }
    };

    showBasicPanel();
  }, 100);
}