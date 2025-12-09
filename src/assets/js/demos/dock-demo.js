// Dock Component Demo Functions
export function initDockDemo() {
  const section = document.getElementById('dock');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🚢 Dock Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>macOS-style dock with magnification effect and smooth animations.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicDock()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showDockPositions()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Positions</button>
      <button onclick="showDockSizes()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showDockWithBadges()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">With Badges</button>
      <button onclick="showInteractiveDock()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="dockDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => showBasicDock(), 100);

  window.showBasicDock = function() {
    const container = document.getElementById('dockDemoContainer');
    if (!container) return;

    const items = JSON.stringify([
      { id: 'finder', label: 'Finder', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>' },
      { id: 'mail', label: 'Mail', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' },
      { id: 'browser', label: 'Browser', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' },
      { id: 'music', label: 'Music', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' },
      { id: 'photos', label: 'Photos', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>' },
      { id: 'settings', label: 'Settings', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>' }
    ]);

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Bottom Dock (Default)</h4>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">Hover over icons to see magnification effect</p>
        <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
          <ui-dock items='${items}'></ui-dock>
        </div>
      </div>
    `;

    setTimeout(() => {
      const dock = container.querySelector('ui-dock');
      if (dock) {
        dock.addEventListener('dockItemClick', (e) => {
          console.log('Dock item clicked:', e.detail);
        });
      }
    }, 100);
  };

  window.showDockPositions = function() {
    const container = document.getElementById('dockDemoContainer');
    if (!container) return;

    const items = JSON.stringify([
      { id: '1', label: 'Home', icon: '🏠' },
      { id: '2', label: 'Search', icon: '🔍' },
      { id: '3', label: 'Heart', icon: '❤️' },
      { id: '4', label: 'Star', icon: '⭐' },
      { id: '5', label: 'Settings', icon: '⚙️' }
    ]);

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Bottom Position</h4>
        <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
          <ui-dock items='${items}' position="bottom"></ui-dock>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h4>Top Position</h4>
        <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
          <ui-dock items='${items}' position="top"></ui-dock>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <h4>Left Position</h4>
          <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
            <ui-dock items='${items}' position="left"></ui-dock>
          </div>
        </div>

        <div>
          <h4>Right Position</h4>
          <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
            <ui-dock items='${items}' position="right"></ui-dock>
          </div>
        </div>
      </div>
    `;
  };

  window.showDockSizes = function() {
    const container = document.getElementById('dockDemoContainer');
    if (!container) return;

    const items = JSON.stringify([
      { id: '1', label: 'File', icon: '📄' },
      { id: '2', label: 'Folder', icon: '📁' },
      { id: '3', label: 'Image', icon: '🖼️' },
      { id: '4', label: 'Video', icon: '🎬' }
    ]);

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Small Size</h4>
        <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
          <ui-dock items='${items}' size="sm"></ui-dock>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h4>Medium Size (Default)</h4>
        <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
          <ui-dock items='${items}' size="md"></ui-dock>
        </div>
      </div>

      <div>
        <h4>Large Size</h4>
        <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
          <ui-dock items='${items}' size="lg"></ui-dock>
        </div>
      </div>
    `;
  };

  window.showDockWithBadges = function() {
    const container = document.getElementById('dockDemoContainer');
    if (!container) return;

    const items = JSON.stringify([
      { id: 'mail', label: 'Mail', icon: '📧', badge: 12 },
      { id: 'messages', label: 'Messages', icon: '💬', badge: 5 },
      { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 99 },
      { id: 'calendar', label: 'Calendar', icon: '📅' },
      { id: 'tasks', label: 'Tasks', icon: '✓', badge: 3 }
    ]);

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Dock with Badge Indicators</h4>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">Icons can display notification badges</p>
        <div style="display: flex; justify-content: center; padding: 40px; background-color: #f3f4f6; border-radius: 8px;">
          <ui-dock items='${items}'></ui-dock>
        </div>
      </div>
    `;
  };

  window.showInteractiveDock = function() {
    const container = document.getElementById('dockDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <h3>🎮 Interactive Dock Playground</h3>
      <p style="color: #6b7280; margin-bottom: 20px;">Customize the dock in real-time</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; padding: 20px; background-color: white; border-radius: 8px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Position:</label>
          <select id="dockPosition" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            onchange="updateDockPlayground()">
            <option value="bottom">Bottom</option>
            <option value="top">Top</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Size:</label>
          <select id="dockSize" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            onchange="updateDockPlayground()">
            <option value="sm">Small</option>
            <option value="md" selected>Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Magnify:</label>
          <select id="dockMagnify" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            onchange="updateDockPlayground()">
            <option value="true" selected>Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Blur Effect:</label>
          <select id="dockBlur" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            onchange="updateDockPlayground()">
            <option value="true" selected>Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Show Labels:</label>
          <select id="dockShowLabels" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            onchange="updateDockPlayground()">
            <option value="true" selected>Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Item Count:</label>
          <select id="dockItemCount" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            onchange="updateDockPlayground()">
            <option value="3">3 Items</option>
            <option value="5">5 Items</option>
            <option value="7" selected>7 Items</option>
            <option value="10">10 Items</option>
          </select>
        </div>
      </div>

      <div id="dockPlaygroundPreview" style="display: flex; justify-content: center; align-items: center; min-height: 200px; padding: 60px; background-color: #f3f4f6; border-radius: 8px;"></div>

      <div id="dockClickLog" style="margin-top: 20px; padding: 16px; background-color: white; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h4 style="margin: 0 0 12px;">Click Events Log:</h4>
        <div id="dockLogContent" style="color: #6b7280; font-size: 14px; font-family: monospace;">Click on dock items to see events...</div>
      </div>
    `;

    window.updateDockPlayground = function() {
      const preview = document.getElementById('dockPlaygroundPreview');
      const position = document.getElementById('dockPosition').value;
      const size = document.getElementById('dockSize').value;
      const magnify = document.getElementById('dockMagnify').value;
      const blur = document.getElementById('dockBlur').value;
      const showLabels = document.getElementById('dockShowLabels').value;
      const itemCount = parseInt(document.getElementById('dockItemCount').value);

      const allItems = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'search', label: 'Search', icon: '🔍' },
        { id: 'mail', label: 'Mail', icon: '📧', badge: 3 },
        { id: 'messages', label: 'Messages', icon: '💬', badge: 5 },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'music', label: 'Music', icon: '🎵' },
        { id: 'photos', label: 'Photos', icon: '📷' },
        { id: 'videos', label: 'Videos', icon: '🎬' },
        { id: 'documents', label: 'Documents', icon: '📄' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
      ];

      const items = JSON.stringify(allItems.slice(0, itemCount));

      preview.innerHTML = `
        <ui-dock 
          id="playgroundDock"
          items='${items}'
          position="${position}"
          size="${size}"
          magnify="${magnify}"
          blur-effect="${blur}"
          show-labels="${showLabels}">
        </ui-dock>
      `;

      setTimeout(() => {
        const dock = document.getElementById('playgroundDock');
        if (dock) {
          dock.addEventListener('dockItemClick', (e) => {
            const logContent = document.getElementById('dockLogContent');
            const timestamp = new Date().toLocaleTimeString();
            const newLog = `[${timestamp}] Clicked: ${e.detail.item.label} (ID: ${e.detail.itemId})`;
            logContent.innerHTML = newLog + '<br>' + logContent.innerHTML;
          });
        }
      }, 100);
    };

    updateDockPlayground();
  };
}
