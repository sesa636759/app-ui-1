// Aside Panel Demo
export function initAsidePanelDemo() {
  const section = document.getElementById('aside-panel');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📱 Aside Panel Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Slide-in panels from any direction with overlay, resize, and customizable content.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicAsidePanel()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showDirectionalPanels()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Directions</button>
      <button onclick="showResizablePanels()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Resizable</button>
      <button onclick="showInteractiveAsidePanel()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="asidePanelDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicAsidePanel = function() {
      const container = document.getElementById('asidePanelDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Aside Panel with Slots</h3>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
            <button id="openRightPanel" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Open Right Panel
            </button>
            <button id="openLeftPanel" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Open Left Panel
            </button>
          </div>

          <aside-panel id="rightPanel" direction="right" size="400px">
            <div slot="header">
              <h3 style="margin: 0 0 8px; font-size: 20px; color: #1f2937;">Right Panel</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Panel with header, content, and footer slots</p>
            </div>
            
            <div slot="content">
              <p style="color: #6b7280; margin-bottom: 16px;">This panel demonstrates the slot-based structure:</p>
              <div style="padding: 12px; background-color: #dbeafe; border-radius: 6px; margin-bottom: 12px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;"><strong>Header Slot:</strong> For titles and descriptions</p>
              </div>
              <div style="padding: 12px; background-color: #f0fdf4; border-radius: 6px; margin-bottom: 12px;">
                <p style="margin: 0; color: #166534; font-size: 14px;"><strong>Content Slot:</strong> For main panel content</p>
              </div>
              <div style="padding: 12px; background-color: #fef3c7; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>Footer Slot:</strong> For actions and buttons</p>
              </div>
            </div>
            
            <div slot="footer">
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button style="padding: 8px 16px; background-color: #f3f4f6; color: #374151; border: none; border-radius: 6px; cursor: pointer;">Cancel</button>
                <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Save Changes</button>
              </div>
            </div>
          </aside-panel>

          <aside-panel id="leftPanel" direction="left" size="350px">
            <div slot="header">
              <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Navigation Menu</h3>
            </div>
            
            <div slot="content">
              <ul style="margin: 0; padding: 0; list-style: none;">
                <li style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">🏠 Dashboard</li>
                <li style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">📊 Analytics</li>
                <li style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">⚙️ Settings</li>
                <li style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">👤 Profile</li>
              </ul>
            </div>
            
            <div slot="footer">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #3b82f6; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">JD</div>
                <div style="flex: 1;">
                  <p style="margin: 0; font-weight: 600; font-size: 14px; color: #1f2937;">John Doe</p>
                  <p style="margin: 0; font-size: 12px; color: #6b7280;">john@example.com</p>
                </div>
              </div>
            </div>
          </aside-panel>
        </div>
      `;

      setupAsidePanelEvents();
    };

    window.showDirectionalPanels = function() {
      const container = document.getElementById('asidePanelDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Panels from All Directions</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 20px;">
            <button id="openTopPanel" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              ⬆️ Top
            </button>
            <button id="openRightPanel2" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
              ➡️ Right
            </button>
            <button id="openBottomPanel" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">
              ⬇️ Bottom
            </button>
            <button id="openLeftPanel2" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">
              ⬅️ Left
            </button>
          </div>

          <aside-panel id="topPanel" direction="top" size="250px">
            <div style="padding: 20px;">
              <h3 style="margin: 0 0 12px;">Top Panel</h3>
              <p style="color: #6b7280; margin: 0;">Useful for notifications, banners, or temporary messages.</p>
            </div>
          </aside-panel>

          <aside-panel id="rightPanel2" direction="right" size="320px">
            <div style="padding: 20px;">
              <h3 style="margin: 0 0 12px;">Right Panel</h3>
              <p style="color: #6b7280; margin: 0;">Common for settings, filters, or additional details.</p>
            </div>
          </aside-panel>

          <aside-panel id="bottomPanel" direction="bottom" size="200px">
            <div style="padding: 20px;">
              <h3 style="margin: 0 0 12px;">Bottom Panel</h3>
              <p style="color: #6b7280; margin: 0;">Great for cookie notices, chat widgets, or player controls.</p>
            </div>
          </aside-panel>

          <aside-panel id="leftPanel2" direction="left" size="300px">
            <div style="padding: 20px;">
              <h3 style="margin: 0 0 12px;">Left Panel</h3>
              <p style="color: #6b7280; margin: 0;">Perfect for navigation menus or tool palettes.</p>
            </div>
          </aside-panel>
        </div>
      `;

      setupAsidePanelEvents();
    };

    window.showResizablePanels = function() {
      const container = document.getElementById('asidePanelDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Resizable Panels</h3>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
            <button id="openResizablePanel" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Open Resizable Panel
            </button>
          </div>

          <aside-panel id="resizablePanel" direction="right" size="400px" resizable="true" min-size="250" max-size="600">
            <div style="padding: 20px;">
              <h3 style="margin: 0 0 16px;">Resizable Panel</h3>
              <p style="color: #6b7280; margin-bottom: 16px;">Drag the left edge to resize this panel.</p>
              <div style="padding: 12px; background-color: #f0fdf4; border-radius: 6px; margin-bottom: 12px;">
                <p style="margin: 0 0 8px; font-weight: 600; color: #166534;">Features:</p>
                <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px;">
                  <li>Min size: 250px</li>
                  <li>Max size: 600px</li>
                  <li>Smooth resize animation</li>
                  <li>Resize handle indicator</li>
                </ul>
              </div>
            </div>
          </aside-panel>
        </div>
      `;

      setupAsidePanelEvents();
    };

    window.showInteractiveAsidePanel = function() {
      const container = document.getElementById('asidePanelDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Customize the aside panel properties and see changes in real-time!</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Direction:</span>
                <select id="asideDirection" onchange="updateInteractiveAsidePanel()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="right" selected>Right</option>
                  <option value="left">Left</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Size:</span>
                <input type="text" id="asideSize" value="400px" oninput="updateInteractiveAsidePanel()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Min Size (px):</span>
                <input type="number" id="asideMinSize" value="200" oninput="updateInteractiveAsidePanel()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Max Size (px):</span>
                <input type="number" id="asideMaxSize" value="800" oninput="updateInteractiveAsidePanel()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="asideCloseable" checked onchange="updateInteractiveAsidePanel()" style="cursor: pointer;">
                <span>Closeable</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="asideCloseOnOverlay" checked onchange="updateInteractiveAsidePanel()" style="cursor: pointer;">
                <span>Close on Overlay Click</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="asideCloseOnEscape" checked onchange="updateInteractiveAsidePanel()" style="cursor: pointer;">
                <span>Close on Escape</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="asideResizable" onchange="updateInteractiveAsidePanel()" style="cursor: pointer;">
                <span>Resizable</span>
              </label>
            </div>
            
            <button id="openInteractivePanel" style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Open Panel
            </button>
            
            <div style="margin-top: 12px; padding: 12px; background-color: #eff6ff; border-radius: 6px; border: 1px solid #bfdbfe;">
              <p style="margin: 0; font-size: 13px; color: #1e40af;">
                💡 <strong>Tip:</strong> Changes apply to the panel configuration. Click "Open Panel" to see the result!
              </p>
            </div>
          </div>

          <aside-panel id="interactivePanel" direction="right" size="400px">
            <div slot="header">
              <h3 style="margin: 0 0 8px; font-size: 20px; color: #1f2937;">Interactive Panel</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Customize settings to see changes</p>
            </div>
            
            <div slot="content">
              <div style="margin-bottom: 16px;">
                <h4 style="margin: 0 0 8px; color: #374151;">About Slots</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">This panel demonstrates the three slot types:</p>
              </div>
              
              <div style="padding: 12px; background-color: #dbeafe; border-radius: 6px; margin-bottom: 12px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;"><strong>Header Slot:</strong> For titles and descriptions</p>
              </div>
              
              <div style="padding: 12px; background-color: #f0fdf4; border-radius: 6px; margin-bottom: 12px;">
                <p style="margin: 0; color: #166534; font-size: 14px;"><strong>Content Slot:</strong> For scrollable main content</p>
              </div>
              
              <div style="padding: 12px; background-color: #fef3c7; border-radius: 6px; margin-bottom: 16px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>Footer Slot:</strong> For action buttons (see below)</p>
              </div>
              
              <div style="padding: 16px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                <h5 style="margin: 0 0 12px; color: #374151;">Panel Features:</h5>
                <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px;">
                  <li>Slide from any direction</li>
                  <li>Configurable size and constraints</li>
                  <li>Optional resize handle</li>
                  <li>Keyboard navigation (ESC to close)</li>
                  <li>Overlay click handling</li>
                  <li>Structured with header, content, footer</li>
                </ul>
              </div>
              
              <div style="margin-top: 16px; padding: 12px; background-color: #f0f9ff; border-radius: 6px;">
                <p style="margin: 0 0 8px; font-weight: 600; color: #0369a1;">Current Configuration:</p>
                <div id="asideConfigDisplay" style="font-size: 14px; color: #0c4a6e;">
                  <!-- Config will be displayed here -->
                </div>
              </div>
            </div>
            
            <div slot="footer">
              <div style="display: flex; gap: 8px; justify-content: space-between; align-items: center;">
                <button style="padding: 8px 12px; background-color: transparent; color: #6b7280; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; font-size: 14px;">Reset</button>
                <div style="display: flex; gap: 8px;">
                  <button style="padding: 8px 16px; background-color: #f3f4f6; color: #374151; border: none; border-radius: 6px; cursor: pointer;">Cancel</button>
                  <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Apply</button>
                </div>
              </div>
            </div>
          </aside-panel>
        </div>
      `;

      setTimeout(() => {
        updateInteractiveAsidePanel();
        setupAsidePanelEvents();
      }, 50);
    };

    window.updateInteractiveAsidePanel = function() {
      const direction = document.getElementById('asideDirection')?.value || 'right';
      const size = document.getElementById('asideSize')?.value || '400px';
      const minSize = parseInt(document.getElementById('asideMinSize')?.value) || 200;
      const maxSize = parseInt(document.getElementById('asideMaxSize')?.value) || 800;
      const closeable = document.getElementById('asideCloseable')?.checked !== false;
      const closeOnOverlay = document.getElementById('asideCloseOnOverlay')?.checked !== false;
      const closeOnEscape = document.getElementById('asideCloseOnEscape')?.checked !== false;
      const resizable = document.getElementById('asideResizable')?.checked || false;
      
      const panel = document.getElementById('interactivePanel');
      if (panel) {
        panel.setAttribute('direction', direction);
        panel.setAttribute('size', size);
        panel.setAttribute('min-size', minSize.toString());
        panel.setAttribute('max-size', maxSize.toString());
        panel.setAttribute('closeable', closeable.toString());
        panel.setAttribute('close-on-overlay-click', closeOnOverlay.toString());
        panel.setAttribute('close-on-escape', closeOnEscape.toString());
        panel.setAttribute('resizable', resizable.toString());
        
        // Update config display
        const configDisplay = document.getElementById('asideConfigDisplay');
        if (configDisplay) {
          configDisplay.innerHTML = `
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px;">
              <span>Direction:</span><span>${direction}</span>
              <span>Size:</span><span>${size}</span>
              <span>Min Size:</span><span>${minSize}px</span>
              <span>Max Size:</span><span>${maxSize}px</span>
              <span>Closeable:</span><span>${closeable ? 'Yes' : 'No'}</span>
              <span>Close on Overlay:</span><span>${closeOnOverlay ? 'Yes' : 'No'}</span>
              <span>Close on Escape:</span><span>${closeOnEscape ? 'Yes' : 'No'}</span>
              <span>Resizable:</span><span>${resizable ? 'Yes' : 'No'}</span>
            </div>
          `;
        }
      }
    };

    function setupAsidePanelEvents() {
      setTimeout(() => {
        // Set up open buttons
        document.getElementById('openRightPanel')?.addEventListener('click', () => {
          document.getElementById('rightPanel')?.show();
        });

        document.getElementById('openLeftPanel')?.addEventListener('click', () => {
          document.getElementById('leftPanel')?.show();
        });

        document.getElementById('openTopPanel')?.addEventListener('click', () => {
          document.getElementById('topPanel')?.show();
        });

        document.getElementById('openRightPanel2')?.addEventListener('click', () => {
          document.getElementById('rightPanel2')?.show();
        });

        document.getElementById('openBottomPanel')?.addEventListener('click', () => {
          document.getElementById('bottomPanel')?.show();
        });

        document.getElementById('openLeftPanel2')?.addEventListener('click', () => {
          document.getElementById('leftPanel2')?.show();
        });

        document.getElementById('openResizablePanel')?.addEventListener('click', () => {
          document.getElementById('resizablePanel')?.show();
        });

        document.getElementById('openInteractivePanel')?.addEventListener('click', () => {
          document.getElementById('interactivePanel')?.show();
        });

        // Set up event listeners for all aside panels
        document.querySelectorAll('aside-panel').forEach(panel => {
          panel.addEventListener('asideOpened', (event) => {
            console.log('Aside panel opened:', event);
          });

          panel.addEventListener('asideClosed', (event) => {
            console.log('Aside panel closed:', event);
          });

          panel.addEventListener('asideResized', (event) => {
            console.log('Aside panel resized:', event.detail);
          });
        });
      }, 100);
    }

    showBasicAsidePanel();
  }, 100);
}

