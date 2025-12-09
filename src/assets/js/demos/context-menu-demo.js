// Component Demo Functions
import {
  basicMenuItems,
  nestedMenuItems,
  iconMenuItems,
  fourLevelMenuItems,
  editorMenuItems,
  fileMenuItems,
  actionMenuItems,
  homeContextMenuItems,
  interactiveDefaultItems,
  disabledItemsMenu
} from './context-menu-data.js';

export function initContextMenuDemo() {
  const section = document.getElementById('context-menu');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📋 Context Menu Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Right-click context menus with customizable actions.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicContextMenu()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showIconContextMenu()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">With Icons</button>
      <button onclick="showDisabledItems()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Disabled Items</button>
      <button onclick="showFourLevelContextMenu()" style="padding: 8px 16px; background-color: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer;">4-Level Submenu</button>
      <button onclick="showInteractiveContextMenu()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="contextMenuDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    // Context Menu Demo Functions
    window.showBasicContextMenu = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Basic Context Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Right-click on the area below</p>
        <div id="basicTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🖱️</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click here to open menu</div>
          </div>
        </div>
        <div id="menuLog" style="margin-top: 20px; padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
          <strong>Event Log:</strong>
          <div style="margin-top: 8px; color: #6b7280;">Right-click to trigger menu...</div>
        </div>
      </div>
      <ui-context-menu id="basicMenu"></ui-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('basicMenu');
      console.log('Basic menu element:', menu);
      if (menu) {
        function logAction(action) {
          const log = document.querySelector('#menuLog div');
          if (log) {
            log.innerHTML = `<div style="color: #1e40af;"><strong>${action}</strong> clicked at ${new Date().toLocaleTimeString()}</div>`;
          }
        }
        // Add event listener for menu item clicks
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Menu item clicked:', e.detail);
          if (e.detail && e.detail.label) {
            logAction(e.detail.label);
          }
        });
        menu.setAttribute('items', JSON.stringify(basicMenuItems));
        menu.setAttribute('target', '#basicTarget');
        // Force re-attach if target is replaced
        setTimeout(() => {
          menu.setAttribute('target', '#basicTarget');
        }, 0);
        console.log('Menu items set:', menu.getAttribute('items'));
      }
    }, 100);
  };

  window.showNestedContextMenu = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Nested Submenus</h4>
        <p style="color: #6b7280; font-size: 13px;">Multi-level cascading menu</p>
        <div id="nestedTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">📁</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for file operations</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="nestedMenu"></ui-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('nestedMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Nested menu clicked:', e.detail);
        });
        menu.items = JSON.stringify(nestedMenuItems);
        menu.setAttribute('target', '#nestedTarget');
        setTimeout(() => {
          menu.setAttribute('target', '#nestedTarget');
        }, 0);
      }
    }, 100);
  };

  window.showIconContextMenu = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Context Menu with Rich Icons</h4>
        <p style="color: #6b7280; font-size: 13px;">Emoji icons with visual hierarchy</p>
        <div id="iconTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🎨</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for formatting options</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="iconMenu"></ui-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('iconMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Icon menu clicked:', e.detail);
        });
        menu.items = JSON.stringify(iconMenuItems);
        menu.setAttribute('target', '#iconTarget');
        setTimeout(() => {
          menu.setAttribute('target', '#iconTarget');
        }, 0);
      }
    }, 100);
  };

  window.showFourLevelContextMenu = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>4-Level Submenu Example</h4>
        <p style="color: #6b7280; font-size: 13px;">Demonstrates a deep submenu structure with 4 levels</p>
        <div id="fourLevelTarget" style="min-height: 220px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🧭</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click to explore submenus</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="fourLevelMenu"></ui-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('fourLevelMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('4-Level menu clicked:', e.detail);
        });
        // 4-level nested structure
        menu.items = JSON.stringify(fourLevelMenuItems);
        menu.setAttribute('target', '#fourLevelTarget');
        setTimeout(() => {
          menu.setAttribute('target', '#fourLevelTarget');
        }, 0);
      }
    }, 100);
  };

  window.showEditorContextMenu = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>Rich Text Editor Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Complete editor context menu with nested options</p>
        <div id="editorTarget" style="min-height: 250px; border: 2px solid #cbd5e1; border-radius: 8px; padding: 20px; background: white; cursor: text; margin: 20px 0; font-family: monospace; font-size: 14px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
          <br><br>
          <strong>Right-click anywhere</strong> in this text area to access formatting and editing options.
        </div>
      </div>
      <ui-context-menu id="editorMenu"></ui-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('editorMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Editor menu clicked:', e.detail);
        });
        menu.items = JSON.stringify(editorMenuItems);
        menu.setAttribute('target', '#editorTarget');
        setTimeout(() => {
          menu.setAttribute('target', '#editorTarget');
        }, 0);
      }
    }, 100);
  };

  window.showFileContextMenu = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>File Explorer Context Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">File system operations with nested actions</p>
        <div id="fileTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">📂</div>
            <div style="color: #6b7280; font-size: 14px; font-weight: 600;">Project Files</div>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">Right-click for file operations</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="fileMenu"></ui-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('fileMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('File menu clicked:', e.detail);
        });
        menu.items = JSON.stringify(fileMenuItems);
        menu.setAttribute('target', '#fileTarget');
        setTimeout(() => {
          menu.setAttribute('target', '#fileTarget');
        }, 0);
      }
    }, 100);
  };

  window.showContextMenuActions = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Context Menu with Actions</h4>
        <p style="color: #6b7280; font-size: 13px;">Interactive menu with live action feedback</p>
        <div id="actionTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">⚡</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click to execute actions</div>
          </div>
        </div>
        <div id="actionLog" style="margin-top: 20px; padding: 16px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae6fd;">
          <h5 style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 14px;">Action Log:</h5>
          <div id="actionLogContent" style="font-size: 13px; color: #6b7280; min-height: 60px; font-family: monospace;">
            No actions performed yet...
          </div>
          <button onclick="clearActionLog()" style="margin-top: 12px; background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Clear Log</button>
        </div>
      </div>
      <ui-context-menu id="actionMenu"></ui-context-menu>
    `;
    
    window.clearActionLog = function() {
      const log = document.getElementById('actionLogContent');
      if (log) log.innerHTML = 'No actions performed yet...';
    };
    
    setTimeout(() => {
      const menu = document.getElementById('actionMenu');
      const logContent = document.getElementById('actionLogContent');
      function addLog(message, type = 'info') {
        if (!logContent) return;
        const time = new Date().toLocaleTimeString();
        const colors = {
          info: '#1e40af',
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626'
        };
        const color = colors[type] || colors.info;
        if (logContent.textContent === 'No actions performed yet...') {
          logContent.innerHTML = '';
        }
        const entry = document.createElement('div');
        entry.style.cssText = `margin-bottom: 6px; color: ${color};`;
        entry.innerHTML = `<strong>[${time}]</strong> ${message}`;
        logContent.insertBefore(entry, logContent.firstChild);
        if (logContent.children.length > 10) {
          logContent.removeChild(logContent.lastChild);
        }
      }
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          if (e.detail && e.detail.label) {
            addLog(`${e.detail.label} action executed`, 'success');
          }
        });
        menu.items = JSON.stringify(actionMenuItems);
        menu.setAttribute('target', '#actionTarget');
        setTimeout(() => {
          menu.setAttribute('target', '#actionTarget');
        }, 0);
      }
    }, 100);
  };

  window.showDisabledItems = function() {
    const container = document.getElementById('contextMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Context Menu with Disabled Items</h4>
        <p style="color: #6b7280; font-size: 13px;">Some menu items are disabled and cannot be clicked</p>
        <div id="disabledTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🚫</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click to see disabled items</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="disabledMenu"></ui-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('disabledMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Disabled menu clicked:', e.detail);
        });
        menu.items = JSON.stringify(disabledItemsMenu);
        menu.setAttribute('target', '#disabledTarget');
        setTimeout(() => {
          menu.setAttribute('target', '#disabledTarget');
        }, 0);
      }
    }, 100);
  };

  // Initialize home context menu
  window.initHomeContextMenu = function() {
    const menu = document.getElementById('homeContextMenu');
    if (!menu) return;
    
    setTimeout(() => {
      menu.items = JSON.stringify(homeContextMenuItems);
      setTimeout(() => {
        menu.setAttribute('target', '#homeContextMenuTarget');
      }, 0);
    }, 200);
  };

  showBasicContextMenu();
  }, 100);
}

// Interactive Playground Functions
window.showInteractiveContextMenu = function() {
  const container = document.getElementById('contextMenuDemoContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Menu Items (JSON):</label>
              <textarea id="contextMenuItems" onchange="updateInteractiveContextMenu()" 
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 300px;"></textarea>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button id="addNewButton" style="background:#10b981; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:12px; cursor:pointer;">➕ Add 'New' Button</button>
              <button id="resetItems" style="background:#6b7280; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:12px; cursor:pointer;">Reset</button>
            </div>
            
            <div style="padding: 10px; background: #f0f9ff; border-radius: 4px; font-size: 12px;">
              <strong>💡 Tip:</strong> Right-click the preview area to open the menu
            </div>
          </div>
        </div>
        
        <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveContextMenuTarget" style="margin-top: 20px; min-height: 300px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: white; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">🖱️</div>
              <div style="color: #6b7280; font-size: 14px;">Right-click here</div>
            </div>
          </div>
          <div id="contextMenuOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
        </div>
      </div>
    </div>
    <ui-context-menu id="interactiveContextMenuComponent"></ui-context-menu>
  `;
  
  // Set initial textarea value
  const textarea = document.getElementById('contextMenuItems');
  if (textarea) {
    textarea.value = JSON.stringify(interactiveDefaultItems, null, 2);
  }
  
  updateInteractiveContextMenu();
  // Wire playground buttons
  const addBtn = document.getElementById('addNewButton');
  const resetBtn = document.getElementById('resetItems');
  if (addBtn && textarea) {
    addBtn.onclick = () => {
      try {
        const data = JSON.parse(textarea.value);
        const hasNew = Array.isArray(data) && data.some(it => it && it.id === 'new');
        if (!hasNew) {
          data.unshift({
            id: 'new',
            label: 'New',
            icon: '➕',
            children: [
              { id: 'new-file', label: 'File', icon: '📄' },
              { id: 'new-folder', label: 'Folder', icon: '📁' }
            ]
          });
          textarea.value = JSON.stringify(data, null, 2);
          window.updateInteractiveContextMenu();
        }
      } catch {}
    };
  }
  if (resetBtn && textarea) {
    resetBtn.onclick = () => {
      textarea.value = JSON.stringify(interactiveDefaultItems, null, 2);
      window.updateInteractiveContextMenu();
    };
  }
};

window.updateInteractiveContextMenu = function() {
  const itemsText = document.getElementById('contextMenuItems').value;
  const menu = document.getElementById('interactiveContextMenuComponent');
  const outputDiv = document.getElementById('contextMenuOutput');
  
  if (!menu) return;
  
  try {
    const items = JSON.parse(itemsText);
    menu.items = JSON.stringify(items);
    menu.setAttribute('target', '#interactiveContextMenuTarget');
    
    // Remove old listener and add new one
    const newMenu = menu.cloneNode(true);
    menu.parentNode.replaceChild(newMenu, menu);
    
    setTimeout(() => {
      const updatedMenu = document.getElementById('interactiveContextMenuComponent');
      if (updatedMenu) {
        updatedMenu.items = JSON.stringify(items);
        updatedMenu.setAttribute('target', '#interactiveContextMenuTarget');
        
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
