
// Smart Menu Demo Functions
export function initSmartMenuDemo() {
  const section = document.getElementById('smart-menu');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🧠 Smart Menu Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Advanced context menu with smart positioning and submenu support.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicSmartMenu()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic Menu</button>
      <button onclick="showNestedSmartMenu()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Nested Submenus</button>
      <button onclick="showFileOperationsMenu()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">File Operations</button>
      <button onclick="showInteractiveSmartMenu()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="smartMenuDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    // Smart Menu Demo Functions
    window.showBasicSmartMenu = function() {
      const container = document.getElementById('smartMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
          <h4>Basic Smart Menu</h4>
          <p style="color: #6b7280; font-size: 13px;">Right-click on the area below to open the smart menu</p>
          <div id="basicSmartTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
            <div style="text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">🖱️</div>
              <div style="color: #6b7280; font-size: 14px;">Right-click here to open menu</div>
            </div>
          </div>
          <div id="smartMenuLog" style="margin-top: 20px; padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
            <strong>Event Log:</strong>
            <div style="margin-top: 8px; color: #6b7280;">Right-click to trigger menu...</div>
          </div>
        </div>
        <ui-smart-context-menu id="basicSmartMenu"></ui-smart-context-menu>
      `;
      setTimeout(() => {
        const menu = document.getElementById('basicSmartMenu');
        console.log('Basic smart menu element:', menu);
        if (menu) {
          function logAction(action) {
            const log = document.querySelector('#smartMenuLog div');
            if (log) {
              log.innerHTML = `<div style="color: #1e40af;"><strong>${action}</strong> clicked at ${new Date().toLocaleTimeString()}</div>`;
            }
          }

          // Add event listener for menu item clicks
          menu.addEventListener('menuItemClick', (e) => {
            console.log('Smart menu item clicked:', e.detail);
            if (e.detail && e.detail.label) {
              logAction(e.detail.label);
            }
          });

          const basicItems = [
            { label: 'Copy', icon: '📋', action: () => logAction('Copy') },
            { label: 'Paste', icon: '📄', action: () => logAction('Paste') },
            { label: 'divider', divider: true },
            { label: 'Delete', icon: '🗑️', action: () => logAction('Delete') }
          ];

          menu.items = basicItems;
          menu.setAttribute('target', '#basicSmartTarget');
          console.log('Smart menu items set:', menu.items);
        }
      }, 100);
    };

    window.showNestedSmartMenu = function() {
      const container = document.getElementById('smartMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
          <h4>Nested Smart Menu</h4>
          <p style="color: #6b7280; font-size: 13px;">Multi-level menu with submenus</p>
          <div id="nestedSmartTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
            <div style="text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">📁</div>
              <div style="color: #6b7280; font-size: 14px;">Right-click for file operations</div>
            </div>
          </div>
        </div>
        <ui-smart-context-menu id="nestedSmartMenu"></ui-smart-context-menu>
      `;
      setTimeout(() => {
        const menu = document.getElementById('nestedSmartMenu');
        if (menu) {
          const nestedItems = [
            {
              label: 'Level 1 - Main',
              icon: '1️⃣',
              submenu: [
                {
                  label: 'Level 2 - A',
                  icon: '2️⃣',
                  submenu: [
                    {
                      label: 'Level 3 - A',
                      icon: '3️⃣',
                      submenu: [
                        {
                          label: 'Level 4 - A',
                          icon: '4️⃣',
                          submenu: [
                            {
                              label: 'Level 5 - Option 1',
                              icon: '5️⃣',
                              action: () => console.log('Level 5 - Option 1')
                            },
                            {
                              label: 'Level 5 - Option 2',
                              icon: '5️⃣',
                              action: () => console.log('Level 5 - Option 2')
                            }
                          ]
                        },
                        {
                          label: 'Level 4 - B',
                          icon: '4️⃣',
                          action: () => console.log('Level 4 - B')
                        }
                      ]
                    },
                    {
                      label: 'Level 3 - B',
                      icon: '3️⃣',
                      action: () => console.log('Level 3 - B')
                    }
                  ]
                },
                {
                  label: 'Level 2 - B',
                  icon: '2️⃣',
                  action: () => console.log('Level 2 - B')
                }
              ]
            },
            {
              label: 'Top Option',
              icon: '🔝',
              action: () => console.log('Top Option')
            },
            {
              label: 'Level 1 - Extra',
              icon: '⭐',
              submenu: [
                {
                  label: 'Level 2 - C',
                  icon: '2️⃣',
                  submenu: [
                    {
                      label: 'Level 3 - C',
                      icon: '3️⃣',
                      action: () => console.log('Level 3 - C')
                    }
                  ]
                }
              ]
            },
            { label: 'divider', divider: true },
            { label: 'Delete', icon: '🗑️', action: () => console.log('Delete') }
          ];

          menu.items = nestedItems;
          menu.setAttribute('target', '#nestedSmartTarget');
        }
      }, 100);
    };

    window.showFileOperationsMenu = function() {
      const container = document.getElementById('smartMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
          <h4>File Operations Menu</h4>
          <p style="color: #6b7280; font-size: 13px;">Complete file management operations</p>
          <div id="fileSmartTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
            <div style="text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">📂</div>
              <div style="color: #6b7280; font-size: 14px; font-weight: 600;">Project Files</div>
              <div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">Right-click for file operations</div>
            </div>
          </div>
        </div>
        <ui-smart-context-menu id="fileSmartMenu"></ui-smart-context-menu>
      `;
      setTimeout(() => {
        const menu = document.getElementById('fileSmartMenu');
        if (menu) {
          const fileItems = [
            {
              label: 'New',
              icon: '➕',
              submenu: [
                { label: 'File', icon: '📄', action: () => console.log('New file') },
                { label: 'Folder', icon: '📁', action: () => console.log('New folder') },
                { label: 'divider', divider: true },
                { label: 'Project', icon: '🏗️', action: () => console.log('New project') }
              ]
            },
            { label: 'Open', icon: '📂', action: () => console.log('Open') },
            { label: 'Save', icon: '💾', action: () => console.log('Save') },
            { label: 'divider', divider: true },
            {
              label: 'Share',
              icon: '📤',
              submenu: [
                { label: 'Email', icon: '📧', action: () => console.log('Share via email') },
                { label: 'Link', icon: '🔗', action: () => console.log('Share link') },
                { label: 'Cloud', icon: '☁️', action: () => console.log('Share to cloud') }
              ]
            },
            { label: 'Delete', icon: '🗑️', action: () => console.log('Delete') }
          ];

          menu.items = fileItems;
          menu.setAttribute('target', '#fileSmartTarget');
        }
      }, 100);
    };

    // Initialize with basic menu
    showBasicSmartMenu();
  }, 100);
}

// Interactive Playground Functions
window.showInteractiveSmartMenu = function() {
  const container = document.getElementById('smartMenuDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Menu Items (JSON):</label>
              <textarea id="smartMenuItems" onchange="updateInteractiveSmartMenu()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 300px;"></textarea>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button id="addSmartNewButton" style="background:#10b981; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:12px; cursor:pointer;">➕ Add 'New' Button</button>
              <button id="resetSmartItems" style="background:#6b7280; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:12px; cursor:pointer;">Reset</button>
            </div>

            <div style="padding: 10px; background: #f0f9ff; border-radius: 4px; font-size: 12px;">
              <strong>💡 Tip:</strong> Right-click the preview area to open the menu
            </div>
          </div>
        </div>

        <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveSmartMenuTarget" style="margin-top: 20px; min-height: 300px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: white; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">🖱️</div>
              <div style="color: #6b7280; font-size: 14px;">Right-click here</div>
            </div>
          </div>
          <div id="smartMenuOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
        </div>
      </div>
    </div>
    <ui-smart-context-menu id="interactiveSmartMenuComponent"></ui-smart-context-menu>
  `;

  // Set initial textarea value
  const textarea = document.getElementById('smartMenuItems');
  if (textarea) {
    const defaultItems = [
      { label: 'Copy', icon: '📋', action: () => console.log('Copy') },
      { label: 'Paste', icon: '📄', action: () => console.log('Paste') },
      { label: 'divider', divider: true },
      { label: 'Delete', icon: '🗑️', action: () => console.log('Delete') }
    ];
    textarea.value = JSON.stringify(defaultItems, null, 2);
  }

  updateInteractiveSmartMenu();

  // Wire playground buttons
  const addBtn = document.getElementById('addSmartNewButton');
  const resetBtn = document.getElementById('resetSmartItems');
  if (addBtn && textarea) {
    addBtn.onclick = () => {
      try {
        const data = JSON.parse(textarea.value);
        const hasNew = Array.isArray(data) && data.some(it => it && it.label === 'New');
        if (!hasNew) {
          data.unshift({
            label: 'New',
            icon: '➕',
            submenu: [
              { label: 'File', icon: '📄', action: () => console.log('New file') },
              { label: 'Folder', icon: '📁', action: () => console.log('New folder') }
            ]
          });
          textarea.value = JSON.stringify(data, null, 2);
          window.updateInteractiveSmartMenu();
        }
      } catch {}
    };
  }
  if (resetBtn && textarea) {
    resetBtn.onclick = () => {
      const defaultItems = [
        { label: 'Copy', icon: '📋', action: () => console.log('Copy') },
        { label: 'Paste', icon: '📄', action: () => console.log('Paste') },
        { label: 'divider', divider: true },
        { label: 'Delete', icon: '🗑️', action: () => console.log('Delete') }
      ];
      textarea.value = JSON.stringify(defaultItems, null, 2);
      window.updateInteractiveSmartMenu();
    };
  }
};

window.updateInteractiveSmartMenu = function() {
  const itemsText = document.getElementById('smartMenuItems').value;
  const menu = document.getElementById('interactiveSmartMenuComponent');
  const outputDiv = document.getElementById('smartMenuOutput');

  if (!menu) return;

  try {
    const items = JSON.parse(itemsText);
    menu.items = items;
    menu.setAttribute('target', '#interactiveSmartMenuTarget');

    // Remove old listener and add new one
    const newMenu = menu.cloneNode(true);
    menu.parentNode.replaceChild(newMenu, menu);

    setTimeout(() => {
      const updatedMenu = document.getElementById('interactiveSmartMenuComponent');
      if (updatedMenu) {
        updatedMenu.items = items;
        updatedMenu.setAttribute('target', '#interactiveSmartMenuTarget');

        updatedMenu.addEventListener('menuItemClick', (event) => {
          if (outputDiv) {
            outputDiv.style.display = 'block';
            outputDiv.textContent = `Menu item clicked: ${JSON.stringify(event.detail)}`;
          }
        });
      }
    }, 50);

    if (outputDiv) {
      outputDiv.style.display = 'none';
    }
  } catch (error) {
    if (outputDiv) {
      outputDiv.style.display = 'block';
      outputDiv.style.color = '#ef4444';
      outputDiv.textContent = `Invalid JSON: ${error.message}`;
    }
  }
};
