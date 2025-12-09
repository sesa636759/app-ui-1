// Tabs Demo
export function initTabsDemo() {
  const section = document.getElementById('tabs');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📑 Tabs Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Organize content into separate views with tab navigation.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicTabs()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showCloseableTabs()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Closeable</button>
      <button onclick="showCloseAllTabs()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Close All</button>
      <button onclick="showVerticalTabs()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Vertical</button>
      <button onclick="showInteractiveTabs()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="tabsDemoContainer" style="margin-top: 20px;"></div>
  `;

  // Initialize tabs with data
  setTimeout(() => {
    showBasicTabs();
  }, 100);

  window.showBasicTabs = function() {
    const container = document.getElementById('tabsDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>Basic Tabs (Horizontal)</h3>
        <ui-tabs id="basicTabs"></ui-tabs>
      </div>
    `;

    setTimeout(() => {
      const basicTabs = document.getElementById('basicTabs');
      if (basicTabs) {
        basicTabs.items = JSON.stringify([
          {
            id: 'overview',
            title: 'Overview',
            icon: '📄',
            content: '<div style="padding: 20px;"><h4>Welcome to the Overview</h4><p>This tab contains general information about the component library.</p></div>',
            closeable: false
          },
          {
            id: 'features',
            title: 'Features',
            icon: '⚡',
            content: '<div style="padding: 20px;"><h4>Key Features</h4><ul><li>Web Components</li><li>TypeScript</li><li>Framework Agnostic</li><li>Shadow DOM</li></ul></div>',
            closeable: false
          },
          {
            id: 'documentation',
            title: 'Docs',
            icon: '📚',
            content: '<div style="padding: 20px;"><h4>Documentation</h4><p>Complete API documentation and usage examples.</p></div>',
            closeable: false
          }
        ]);
        basicTabs.defaultActive = 'overview';
      }
    }, 50);
  };

  window.showCloseableTabs = function() {
    const container = document.getElementById('tabsDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>Tabs with Closeable Tabs</h3>
        <ui-tabs id="closeableTabs"></ui-tabs>
      </div>
    `;

    setTimeout(() => {
      const closeableTabs = document.getElementById('closeableTabs');
      if (closeableTabs) {
        closeableTabs.items = JSON.stringify([
          {
            id: 'home',
            title: 'Home',
            icon: '🏠',
            content: '<div style="padding: 20px;"><p>Home tab - this one cannot be closed.</p></div>',
            closeable: false
          },
          {
            id: 'settings',
            title: 'Settings',
            icon: '⚙️',
            content: '<div style="padding: 20px;"><p>Settings tab - you can close this one!</p></div>',
            closeable: true
          },
          {
            id: 'profile',
            title: 'Profile',
            icon: '👤',
            content: '<div style="padding: 20px;"><p>Profile tab - also closeable!</p></div>',
            closeable: true
          }
        ]);
      }
    }, 50);
  };

  window.showCloseAllTabs = function() {
    const container = document.getElementById('tabsDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>Tabs with Close All Button</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Click the X button on the right to destroy the entire tabs component</p>
        <div id="closeAllTabsContainer"></div>
        <div id="closeAllMessage" style="margin-top: 20px; padding: 16px; background-color: #f3f4f6; border-radius: 8px; display: none;">
          <p style="color: #059669; font-weight: 600;">✓ Tabs component has been destroyed!</p>
          <button onclick="showCloseAllTabs()" style="margin-top: 12px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Recreate Tabs</button>
        </div>
      </div>
    `;

    setTimeout(() => {
      const tabsContainer = document.getElementById('closeAllTabsContainer');
      if (tabsContainer) {
        const tabsElement = document.createElement('ui-tabs');
        tabsElement.id = 'closeAllTabs';
        tabsElement.setAttribute('show-close-all', 'true');
        tabsContainer.appendChild(tabsElement);

        setTimeout(() => {
          const closeAllTabs = document.getElementById('closeAllTabs');
          if (closeAllTabs) {
            closeAllTabs.items = JSON.stringify([
              {
                id: 'tab1',
                title: 'Dashboard',
                icon: '📊',
                content: '<div style="padding: 20px;"><h4>Dashboard</h4><p>View your analytics and statistics here.</p></div>',
                closeable: true
              },
              {
                id: 'tab2',
                title: 'Reports',
                icon: '📈',
                content: '<div style="padding: 20px;"><h4>Reports</h4><p>Generate and view reports.</p></div>',
                closeable: true
              },
              {
                id: 'tab3',
                title: 'Messages',
                icon: '💬',
                badge: 5,
                content: '<div style="padding: 20px;"><h4>Messages</h4><p>You have 5 unread messages.</p></div>',
                closeable: true
              },
              {
                id: 'tab4',
                title: 'Settings',
                icon: '⚙️',
                content: '<div style="padding: 20px;"><h4>Settings</h4><p>Configure your preferences.</p></div>',
                closeable: true
              }
            ]);

            // Listen for closeAll event
            closeAllTabs.addEventListener('closeAll', () => {
              const message = document.getElementById('closeAllMessage');
              if (message) {
                message.style.display = 'block';
              }
            });
          }
        }, 50);
      }
    }, 50);
  };

  window.showVerticalTabs = function() {
    const container = document.getElementById('tabsDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>Vertical Tabs</h3>
        <ui-tabs id="verticalTabs" orientation="vertical"></ui-tabs>
      </div>
    `;

    setTimeout(() => {
      const verticalTabs = document.getElementById('verticalTabs');
      if (verticalTabs) {
        verticalTabs.items = JSON.stringify([
          {
            id: 'design',
            title: 'Design',
            icon: '🎨',
            content: '<div style="padding: 20px;"><h4>Design System</h4><p>Color palettes, typography, and spacing guidelines.</p></div>'
          },
          {
            id: 'develop',
            title: 'Development',
            icon: '💻',
            content: '<div style="padding: 20px;"><h4>Development Guide</h4><p>Code standards and best practices.</p></div>'
          },
          {
            id: 'test',
            title: 'Testing',
            icon: '🧪',
            content: '<div style="padding: 20px;"><h4>Testing Strategy</h4><p>Unit tests, integration tests, and E2E testing.</p></div>'
          }
        ]);
      }
    }, 50);
  };

  window.showInteractiveTabs = function() {
    const container = document.getElementById('tabsDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the tabs properties and see changes in real-time!</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 16px;">Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Orientation:</span>
              <select id="tabsOrientation" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="horizontal" selected>Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Number of Tabs:</span>
              <select id="tabsCount" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="2">2 Tabs</option>
                <option value="3" selected>3 Tabs</option>
                <option value="4">4 Tabs</option>
                <option value="5">5 Tabs</option>
                <option value="15">15 Tabs</option>
                <option value="25">25 Tabs</option>
                <option value="35">35 Tabs</option>
                <option value="45">45 Tabs</option>
              </select>
            </label>

            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Tab Titles (comma separated):</span>
              <input id="tabsLabels" type="text" value="Home,Profile,Settings" placeholder="e.g. Home,Profile,Settings" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;" />
            </label>

            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Default Active (tab id):</span>
              <input id="tabsDefaultActive" type="text" value="tab1" placeholder="tab1" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;" />
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="tabsCloseable" style="cursor: pointer;">
              <span>Make Closeable</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="tabsShowIcons" checked style="cursor: pointer;">
              <span>Show Icons</span>
            </label>

            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="tabsShowCloseAll" style="cursor: pointer;">
              <span>Show Close All Button</span>
            </label>
          </div>
          <button onclick="updateInteractiveTabs()" 
            style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Apply Changes
          </button>
        </div>
        
        <ui-tabs id="interactiveTabs"></ui-tabs>
      </div>
    `;

    setTimeout(() => {
      updateInteractiveTabs();
    }, 50);
  };

  window.updateInteractiveTabs = function() {
    const orientation = document.getElementById('tabsOrientation').value;
    const count = parseInt(document.getElementById('tabsCount').value);
    const closeable = document.getElementById('tabsCloseable').checked;
    const showIcons = document.getElementById('tabsShowIcons').checked;
    const showCloseAll = document.getElementById('tabsShowCloseAll').checked;
    const labelsInput = document.getElementById('tabsLabels').value.trim();
    const defaultActiveInput = document.getElementById('tabsDefaultActive').value.trim();
    const rawLabels = labelsInput.length ? labelsInput.split(',').map(l => l.trim()).filter(Boolean) : [];
    // Fallback to generated labels if user provided fewer than count
    while (rawLabels.length < count) {
      rawLabels.push(`Tab ${rawLabels.length + 1}`);
    }
    
    const baseIcons = ['🏠','👤','⚙️','💬','🔔'];
    const tabsData = Array.from({ length: count }).map((_, idx) => {
      const id = `tab${idx + 1}`;
      const title = rawLabels[idx];
      const icon = showIcons ? baseIcons[idx % baseIcons.length] : undefined;
      return {
        id,
        title,
        icon,
        content: `<div style="padding: 20px;"><h4>${title}</h4><p>Content for ${title} tab.</p></div>`,
        closable: closeable && id !== 'tab1'
      };
    });
    
    const interactiveTabs = document.getElementById('interactiveTabs');
    if (interactiveTabs) {
      interactiveTabs.setAttribute('orientation', orientation);
      interactiveTabs.setAttribute('show-close-all', showCloseAll);
      interactiveTabs.items = JSON.stringify(tabsData);
      interactiveTabs.defaultActive = tabsData.some(t => t.id === defaultActiveInput) ? defaultActiveInput : 'tab1';
    }
  };
}
