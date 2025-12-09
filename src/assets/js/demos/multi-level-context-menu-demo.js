// Component Demo Functions
export function initMultiLevelContextMenuDemo() {
  const section = document.getElementById('multi-level-context-menu');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📂 Multi-Level Context Menu</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Cascading context menu with nested submenus.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicMultiLevelMenu()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showFourLevelMultiMenu()" style="padding: 8px 16px; background-color: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer;">4-Level Submenu</button>
      <button onclick="showDeepNestedMenu()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Deep Nested (5+)</button>
      <button onclick="showInteractiveMultiLevelMenu()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="multiLevelMenuDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    // Multi-Level Context Menu Demo Functions
    window.showBasicMultiLevelMenu = function() {
    const container = document.getElementById('multiLevelMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Basic Multi-Level Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Simple cascading menu with multiple levels</p>
        <div id="basicMultiTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🎯</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for basic menu</div>
          </div>
        </div>
      </div>
      <ui-multi-level-context-menu id="basicMultiMenu" target="#basicMultiTarget"></ui-multi-level-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('basicMultiMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Basic multi-level menu clicked:', e.detail);
        });
        
        menu.items = [
          {
            id: 'file',
            label: 'File',
            icon: '📁',
            children: [
              { id: 'new', label: 'New', icon: '➕' },
              { id: 'open', label: 'Open', icon: '📂' },
              { id: 'save', label: 'Save', icon: '💾' }
            ]
          },
          {
            id: 'edit',
            label: 'Edit',
            icon: '✏️',
            children: [
              { id: 'undo', label: 'Undo', icon: '↶' },
              { id: 'redo', label: 'Redo', icon: '↷' },
              { id: 'sep1', separator: true },
              { id: 'cut', label: 'Cut', icon: '✂️' },
              { id: 'copy', label: 'Copy', icon: '📋' },
              { id: 'paste', label: 'Paste', icon: '📄' }
            ]
          },
          { id: 'sep2', separator: true },
          { id: 'help', label: 'Help', icon: '❓' }
        ];
      }
    }, 100);
  };

  window.showFourLevelMultiMenu = function() {
    const container = document.getElementById('multiLevelMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>4-Level Submenu</h4>
        <p style="color: #6b7280; font-size: 13px;">Cascading menu demonstrating 4 levels of nesting</p>
        <div id="fourLevelMultiTarget" style="min-height: 220px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🧭</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click to explore 4 nested levels</div>
          </div>
        </div>
      </div>
      <ui-multi-level-context-menu id="fourLevelMultiMenu" target="#fourLevelMultiTarget"></ui-multi-level-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('fourLevelMultiMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('4-Level multi-level menu clicked:', e.detail);
        });

        menu.items = [
          {
            id: 'level-1',
            label: 'Level 1',
            icon: '1️⃣',
            children: [
              {
                id: 'level-2',
                label: 'Level 2',
                icon: '2️⃣',
                children: [
                  {
                    id: 'level-3',
                    label: 'Level 3',
                    icon: '3️⃣',
                    children: [
                      { id: 'level-4-a', label: 'Level 4 - A', icon: '🅰️' },
                      { id: 'level-4-b', label: 'Level 4 - B', icon: '🅱️' },
                      { id: 'level-4-c', label: 'Level 4 - C', icon: '🆎' }
                    ]
                  }
                ]
              }
            ]
          },
          { id: 'sep1', separator: true },
          {
            id: 'tools',
            label: 'Tools',
            icon: '🧰',
            children: [
              {
                id: 'format',
                label: 'Format',
                icon: '🎨',
                children: [
                  {
                    id: 'colors',
                    label: 'Colors',
                    icon: '🌈',
                    children: [
                      { id: 'red', label: 'Red', icon: '🔴' },
                      { id: 'green', label: 'Green', icon: '🟢' },
                      { id: 'blue', label: 'Blue', icon: '🔵' }
                    ]
                  }
                ]
              },
              {
                id: 'export',
                label: 'Export',
                icon: '📤',
                children: [
                  { id: 'pdf', label: 'Export as PDF', icon: '📕' },
                  { id: 'html', label: 'Export as HTML', icon: '🌐' }
                ]
              }
            ]
          },
          { id: 'sep2', separator: true },
          { id: 'help', label: 'Help', icon: '❓' }
        ];
      }
    }, 100);
  };

  window.showDeepNestedMenu = function() {
    const container = document.getElementById('multiLevelMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>Deep Nested Menu (5 Levels)</h4>
        <p style="color: #6b7280; font-size: 13px;">Demonstrates unlimited nesting capability with 5+ levels</p>
        <div id="deepNestedTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🌳</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for deep nested menu</div>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">Explore 5 levels deep!</div>
          </div>
        </div>
      </div>
      <ui-multi-level-context-menu id="deepNestedMenu" target="#deepNestedTarget"></ui-multi-level-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('deepNestedMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Deep nested menu clicked:', e.detail);
        });
        
        menu.items = [
          {
            id: 'level1',
            label: 'Level 1 - Start',
            icon: '1️⃣',
            children: [
              {
                id: 'level2',
                label: 'Level 2 - Continue',
                icon: '2️⃣',
                children: [
                  {
                    id: 'level3',
                    label: 'Level 3 - Halfway',
                    icon: '3️⃣',
                    children: [
                      {
                        id: 'level4',
                        label: 'Level 4 - Almost There',
                        icon: '4️⃣',
                        children: [
                          { id: 'level5-a', label: 'Level 5 - Option A', icon: '🎯' },
                          { id: 'level5-b', label: 'Level 5 - Option B', icon: '🎪' },
                          { id: 'level5-c', label: 'Level 5 - Option C', icon: '🎨' }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'another-branch',
            label: 'Another Branch',
            icon: '🌿',
            children: [
              {
                id: 'sub1',
                label: 'Sub Level 1',
                icon: '📂',
                children: [
                  {
                    id: 'sub2',
                    label: 'Sub Level 2',
                    icon: '📁',
                    children: [
                      { id: 'end1', label: 'End Point 1', icon: '🏁' },
                      { id: 'end2', label: 'End Point 2', icon: '🎖️' }
                    ]
                  }
                ]
              }
            ]
          }
        ];
      }
    }, 100);
  };

  window.showAdvancedMenu = function() {
    const container = document.getElementById('multiLevelMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>Advanced Options Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Complex menu structure with diverse options</p>
        <div id="advancedTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">⚙️</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for advanced options</div>
          </div>
        </div>
      </div>
      <ui-multi-level-context-menu id="advancedMenu" target="#advancedTarget"></ui-multi-level-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('advancedMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Advanced menu clicked:', e.detail);
        });
        
        menu.items = [
          {
            id: 'view',
            label: 'View',
            icon: '👁️',
            children: [
              {
                id: 'layout',
                label: 'Layout',
                icon: '📐',
                children: [
                  { id: 'grid', label: 'Grid View', icon: '▦' },
                  { id: 'list', label: 'List View', icon: '☰' },
                  { id: 'columns', label: 'Column View', icon: '|||' }
                ]
              },
              {
                id: 'zoom',
                label: 'Zoom',
                icon: '🔍',
                children: [
                  { id: 'zoom-in', label: 'Zoom In (Ctrl+)', icon: '➕' },
                  { id: 'zoom-out', label: 'Zoom Out (Ctrl-)', icon: '➖' },
                  { id: 'zoom-reset', label: 'Reset Zoom', icon: '🔄' }
                ]
              },
              { id: 'sep1', separator: true },
              { id: 'fullscreen', label: 'Full Screen', icon: '⛶' }
            ]
          },
          {
            id: 'tools',
            label: 'Tools',
            icon: '🔧',
            children: [
              {
                id: 'code',
                label: 'Code Tools',
                icon: '💻',
                children: [
                  {
                    id: 'format',
                    label: 'Format',
                    icon: '🎨',
                    children: [
                      { id: 'beautify', label: 'Beautify Code', icon: '✨' },
                      { id: 'minify', label: 'Minify Code', icon: '📦' }
                    ]
                  },
                  {
                    id: 'validate',
                    label: 'Validate',
                    icon: '✓',
                    children: [
                      { id: 'html', label: 'HTML Validator' },
                      { id: 'css', label: 'CSS Validator' },
                      { id: 'js', label: 'JS Linter' }
                    ]
                  }
                ]
              },
              {
                id: 'convert',
                label: 'Convert',
                icon: '🔄',
                children: [
                  { id: 'json-yaml', label: 'JSON to YAML', icon: '📄' },
                  { id: 'yaml-json', label: 'YAML to JSON', icon: '📝' },
                  { id: 'csv-json', label: 'CSV to JSON', icon: '📊' }
                ]
              }
            ]
          },
          { id: 'sep2', separator: true },
          { id: 'settings', label: 'Settings', icon: '⚙️' },
          { id: 'about', label: 'About', icon: 'ℹ️' }
        ];
      }
    }, 100);
  };

  window.showApplicationMenu = function() {
    const container = document.getElementById('multiLevelMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>Application Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Full application menu with file, edit, view, and help</p>
        <div id="appTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🖥️</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for application menu</div>
          </div>
        </div>
      </div>
      <ui-multi-level-context-menu id="appMenu" target="#appTarget"></ui-multi-level-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('appMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Application menu clicked:', e.detail);
        });
        
        menu.items = [
          {
            id: 'file',
            label: 'File',
            icon: '📁',
            children: [
              { id: 'new', label: 'New', icon: '➕' },
              {
                id: 'open',
                label: 'Open',
                icon: '📂',
                children: [
                  { id: 'open-file', label: 'Open File...', icon: '📄' },
                  { id: 'open-folder', label: 'Open Folder...', icon: '📁' },
                  { id: 'sep1', separator: true },
                  {
                    id: 'recent',
                    label: 'Recent Files',
                    icon: '🕐',
                    children: [
                      { id: 'file1', label: 'document.txt', icon: '📝' },
                      { id: 'file2', label: 'project.json', icon: '📋' },
                      { id: 'file3', label: 'notes.md', icon: '📓' }
                    ]
                  }
                ]
              },
              { id: 'sep2', separator: true },
              { id: 'save', label: 'Save', icon: '💾' },
              { id: 'save-as', label: 'Save As...', icon: '💾' },
              { id: 'sep3', separator: true },
              { id: 'close', label: 'Close', icon: '✖️' },
              { id: 'exit', label: 'Exit', icon: '🚪' }
            ]
          },
          {
            id: 'edit',
            label: 'Edit',
            icon: '✏️',
            children: [
              { id: 'undo', label: 'Undo', icon: '↶' },
              { id: 'redo', label: 'Redo', icon: '↷' },
              { id: 'sep4', separator: true },
              { id: 'cut', label: 'Cut', icon: '✂️' },
              { id: 'copy', label: 'Copy', icon: '📋' },
              { id: 'paste', label: 'Paste', icon: '📄' },
              { id: 'sep5', separator: true },
              {
                id: 'find',
                label: 'Find & Replace',
                icon: '🔍',
                children: [
                  { id: 'find', label: 'Find...', icon: '🔎' },
                  { id: 'replace', label: 'Replace...', icon: '🔄' },
                  { id: 'find-in-files', label: 'Find in Files...', icon: '📂' }
                ]
              }
            ]
          },
          {
            id: 'view',
            label: 'View',
            icon: '👁️',
            children: [
              { id: 'sidebar', label: 'Toggle Sidebar', icon: '📊' },
              { id: 'status', label: 'Toggle Status Bar', icon: '📏' },
              { id: 'sep6', separator: true },
              {
                id: 'appearance',
                label: 'Appearance',
                icon: '🎨',
                children: [
                  {
                    id: 'theme',
                    label: 'Theme',
                    icon: '🌗',
                    children: [
                      { id: 'light', label: 'Light Theme', icon: '☀️' },
                      { id: 'dark', label: 'Dark Theme', icon: '🌙' },
                      { id: 'auto', label: 'Auto (System)', icon: '🔄' }
                    ]
                  },
                  { id: 'font-size', label: 'Increase Font Size', icon: '🔍+' }
                ]
              }
            ]
          },
          { id: 'sep7', separator: true },
          { id: 'help', label: 'Help', icon: '❓' }
        ];
      }
    }, 100);
  };

  window.showDeveloperMenu = function() {
    const container = document.getElementById('multiLevelMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>Developer Tools Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Developer-focused menu with debugging and tools</p>
        <div id="devTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">👨‍💻</div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for developer menu</div>
          </div>
        </div>
      </div>
      <ui-multi-level-context-menu id="devMenu" target="#devTarget"></ui-multi-level-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('devMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Developer menu clicked:', e.detail);
        });
        
        menu.items = [
          {
            id: 'inspect',
            label: 'Inspect',
            icon: '🔍',
            children: [
              { id: 'element', label: 'Inspect Element', icon: '🎯' },
              { id: 'console', label: 'Console', icon: '💻' },
              { id: 'network', label: 'Network', icon: '🌐' },
              { id: 'performance', label: 'Performance', icon: '⚡' }
            ]
          },
          {
            id: 'debug',
            label: 'Debug',
            icon: '🐛',
            children: [
              { id: 'start', label: 'Start Debugging', icon: '▶️' },
              { id: 'stop', label: 'Stop Debugging', icon: '⏹️' },
              { id: 'sep1', separator: true },
              {
                id: 'breakpoints',
                label: 'Breakpoints',
                icon: '🔴',
                children: [
                  { id: 'add-bp', label: 'Add Breakpoint', icon: '➕' },
                  { id: 'remove-bp', label: 'Remove All Breakpoints', icon: '🗑️' },
                  { id: 'toggle-bp', label: 'Toggle Breakpoint', icon: '🔄' }
                ]
              }
            ]
          },
          {
            id: 'build',
            label: 'Build',
            icon: '🏗️',
            children: [
              { id: 'compile', label: 'Compile', icon: '⚙️' },
              { id: 'build-prod', label: 'Build for Production', icon: '📦' },
              {
                id: 'optimize',
                label: 'Optimize',
                icon: '✨',
                children: [
                  { id: 'minify', label: 'Minify', icon: '📉' },
                  { id: 'treeshake', label: 'Tree Shake', icon: '🌳' },
                  { id: 'compress', label: 'Compress Assets', icon: '🗜️' }
                ]
              }
            ]
          },
          {
            id: 'git',
            label: 'Git',
            icon: '🔀',
            children: [
              { id: 'commit', label: 'Commit', icon: '💾' },
              { id: 'push', label: 'Push', icon: '⬆️' },
              { id: 'pull', label: 'Pull', icon: '⬇️' },
              { id: 'sep2', separator: true },
              {
                id: 'branch',
                label: 'Branch',
                icon: '🌿',
                children: [
                  { id: 'new-branch', label: 'New Branch', icon: '➕' },
                  { id: 'switch', label: 'Switch Branch', icon: '🔄' },
                  { id: 'merge', label: 'Merge Branch', icon: '🔀' }
                ]
              }
            ]
          },
          { id: 'sep3', separator: true },
          { id: 'settings', label: 'Developer Settings', icon: '⚙️' }
        ];
      }
    }, 100);
  };

  window.showSmartPositionMenu = function() {
    const container = document.getElementById('multiLevelMenuDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Smart Positioning & Persistent Expansion</h4>
        <p style="color: #6b7280; font-size: 13px;">Menu with persistent expansion (click arrows to toggle), close buttons, badges, and keyboard navigation</p>
        <div style="margin: 15px 0; padding: 12px; background: #f0f9ff; border-radius: 6px; border: 1px solid #bae6fd;">
          <strong style="color: #1e3a8a;">💡 Features:</strong>
          <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #1e40af; font-size: 13px;">
            <li>Click menu items with arrows to toggle submenus</li>
            <li>Submenus stay open until you click the × close button</li>
            <li>Use keyboard: ← → ↑ ↓ Enter Space Esc Home End</li>
            <li>Notice badges, shortcuts, and icons</li>
            <li>Try right-clicking in different corners</li>
          </ul>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
          <div id="topLeftTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #fef3c7; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="font-size: 32px;">↖️</div>
              <div style="color: #92400e; font-size: 12px; font-weight: 600;">Top-Left Corner</div>
            </div>
          </div>
          <div id="topRightTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #dbeafe; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="font-size: 32px;">↗️</div>
              <div style="color: #1e40af; font-size: 12px; font-weight: 600;">Top-Right Corner</div>
            </div>
          </div>
          <div id="bottomLeftTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #dcfce7; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="font-size: 32px;">↙️</div>
              <div style="color: #166534; font-size: 12px; font-weight: 600;">Bottom-Left Corner</div>
            </div>
          </div>
          <div id="bottomRightTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #fce7f3; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="font-size: 32px;">↘️</div>
              <div style="color: #9f1239; font-size: 12px; font-weight: 600;">Bottom-Right Corner</div>
            </div>
          </div>
        </div>
      </div>
      <ui-multi-level-context-menu 
        id="smartMenu" 
        target="#topLeftTarget, #topRightTarget, #bottomLeftTarget, #bottomRightTarget"
        persistent="true"
        show-close-button="true"
        menu-title="Enhanced Menu"
        keyboard-nav="true">
      </ui-multi-level-context-menu>
    `;
    setTimeout(() => {
      const menu = document.getElementById('smartMenu');
      if (menu) {
        menu.addEventListener('menuItemClick', (e) => {
          console.log('Smart menu clicked:', e.detail.label);
          alert(`You clicked: ${e.detail.label}`);
        });

        menu.addEventListener('menuOpen', (e) => {
          console.log('Menu opened at:', e.detail);
        });

        menu.addEventListener('menuClose', () => {
          console.log('Menu closed');
        });
        
        menu.items = [
          {
            id: 'file',
            label: 'File',
            icon: '📁',
            children: [
              { id: 'new', label: 'New File', icon: '📄', shortcut: 'Ctrl+N' },
              { id: 'open', label: 'Open', icon: '📂', shortcut: 'Ctrl+O' },
              { id: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
              { id: 'sep1', separator: true },
              {
                id: 'recent',
                label: 'Recent Files',
                icon: '🕐',
                badge: '5',
                children: [
                  { id: 'file1', label: 'project.json', icon: '📋' },
                  { id: 'file2', label: 'readme.md', icon: '📝' },
                  { id: 'file3', label: 'config.ts', icon: '⚙️' },
                  { id: 'sep2', separator: true },
                  { id: 'clear', label: 'Clear History', icon: '🗑️' }
                ]
              },
              {
                id: 'export',
                label: 'Export',
                icon: '📤',
                children: [
                  { id: 'pdf', label: 'Export as PDF', icon: '📕' },
                  { id: 'html', label: 'Export as HTML', icon: '🌐' },
                  { id: 'markdown', label: 'Export as Markdown', icon: '📝' }
                ]
              }
            ]
          },
          {
            id: 'edit',
            label: 'Edit',
            icon: '✏️',
            children: [
              { id: 'undo', label: 'Undo', icon: '↶', shortcut: 'Ctrl+Z' },
              { id: 'redo', label: 'Redo', icon: '↷', shortcut: 'Ctrl+Y' },
              { id: 'sep3', separator: true },
              { id: 'cut', label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X' },
              { id: 'copy', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C' },
              { id: 'paste', label: 'Paste', icon: '📄', shortcut: 'Ctrl+V' },
              { id: 'sep4', separator: true },
              {
                id: 'find',
                label: 'Find & Replace',
                icon: '🔍',
                children: [
                  { id: 'find-text', label: 'Find', icon: '🔎', shortcut: 'Ctrl+F' },
                  { id: 'replace', label: 'Replace', icon: '🔁', shortcut: 'Ctrl+H' },
                  { id: 'find-all', label: 'Find in Files', icon: '📂', shortcut: 'Ctrl+Shift+F' }
                ]
              }
            ]
          },
          {
            id: 'view',
            label: 'View',
            icon: '👁️',
            badge: '3',
            children: [
              { id: 'fullscreen', label: 'Full Screen', icon: '⛶', shortcut: 'F11' },
              { id: 'zoom-in', label: 'Zoom In', icon: '🔍+', shortcut: 'Ctrl++' },
              { id: 'zoom-out', label: 'Zoom Out', icon: '🔍-', shortcut: 'Ctrl+-' },
              { id: 'sep5', separator: true },
              {
                id: 'panels',
                label: 'Panels',
                icon: '🔲',
                children: [
                  { id: 'sidebar', label: 'Toggle Sidebar', icon: '◧' },
                  { id: 'terminal', label: 'Terminal', icon: '💻', badge: 'new' },
                  { id: 'output', label: 'Output Panel', icon: '📊' }
                ]
              }
            ]
          },
          { id: 'sep6', separator: true },
          { id: 'disabled', label: 'Disabled Item', icon: '🚫', disabled: true },
          { id: 'help', label: 'Help & Support', icon: '❓', shortcut: 'F1' }
        ];
      }
    }, 100);
  };

  // Initialize home multi-level menu
  window.initHomeMultiLevelMenu = function() {
    const menu = document.getElementById('homeMultiLevelMenu');
    if (!menu) return;
    
    setTimeout(() => {
      menu.items = [
        {
          id: 'file',
          label: 'File',
          icon: '📁',
          children: [
            { id: 'new', label: 'New', icon: '➕' },
            { id: 'open', label: 'Open', icon: '📂' },
            { id: 'save', label: 'Save', icon: '💾' }
          ]
        },
        {
          id: 'edit',
          label: 'Edit',
          icon: '✏️',
          children: [
            { id: 'undo', label: 'Undo', icon: '↶' },
            { id: 'redo', label: 'Redo', icon: '↷' }
          ]
        }
      ];
    }, 200);
  };

  showBasicMultiLevelMenu();
  }, 100);
}

// Interactive Playground Functions
window.showInteractiveMultiLevelMenu = function() {
  const container = document.getElementById('multiLevelMenuDemoContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="multiLevelPersistent" onchange="updateInteractiveMultiLevelMenu()" style="cursor: pointer;">
              <label for="multiLevelPersistent" style="cursor: pointer;">Persistent Expansion</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="multiLevelShowClose" onchange="updateInteractiveMultiLevelMenu()" style="cursor: pointer;">
              <label for="multiLevelShowClose" style="cursor: pointer;">Show Close Button</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="multiLevelKeyboardNav" checked onchange="updateInteractiveMultiLevelMenu()" style="cursor: pointer;">
              <label for="multiLevelKeyboardNav" style="cursor: pointer;">Keyboard Navigation</label>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Menu Title:</label>
              <input type="text" id="multiLevelMenuTitle" value="" placeholder="Optional title" onchange="updateInteractiveMultiLevelMenu()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Menu Items (JSON):</label>
              <textarea id="multiLevelMenuItems" onchange="updateInteractiveMultiLevelMenu()" 
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 300px;">[
  {
    "id": "file",
    "label": "File",
    "icon": "📁",
    "children": [
      {"id": "new", "label": "New", "icon": "➕"},
      {"id": "open", "label": "Open", "icon": "📂"},
      {"id": "save", "label": "Save", "icon": "💾"}
    ]
  },
  {
    "id": "edit",
    "label": "Edit",
    "icon": "✏️",
    "children": [
      {"id": "undo", "label": "Undo", "icon": "↶"},
      {"id": "redo", "label": "Redo", "icon": "↷"},
      {"id": "sep1", "separator": true},
      {"id": "cut", "label": "Cut", "icon": "✂️"},
      {"id": "copy", "label": "Copy", "icon": "📋"}
    ]
  },
  {"id": "sep2", "separator": true},
  {"id": "help", "label": "Help", "icon": "❓"}
]</textarea>
            </div>
            
            <div style="padding: 10px; background: #f0f9ff; border-radius: 4px; font-size: 12px;">
              <strong>💡 Tip:</strong> Right-click the preview area to open the menu
            </div>
          </div>
        </div>
        
        <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveMultiLevelMenuTarget" style="margin-top: 20px; min-height: 300px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: white; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">🖱️</div>
              <div style="color: #6b7280; font-size: 14px;">Right-click here</div>
            </div>
          </div>
          <div id="multiLevelMenuOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
        </div>
      </div>
    </div>
    <ui-multi-level-context-menu id="interactiveMultiLevelMenuComponent" target="#interactiveMultiLevelMenuTarget"></ui-multi-level-context-menu>
  `;
  
  updateInteractiveMultiLevelMenu();
};

window.updateInteractiveMultiLevelMenu = function() {
  const persistent = document.getElementById('multiLevelPersistent').checked;
  const showClose = document.getElementById('multiLevelShowClose').checked;
  const keyboardNav = document.getElementById('multiLevelKeyboardNav').checked;
  const menuTitle = document.getElementById('multiLevelMenuTitle').value;
  const itemsText = document.getElementById('multiLevelMenuItems').value;
  
  const menu = document.getElementById('interactiveMultiLevelMenuComponent');
  const outputDiv = document.getElementById('multiLevelMenuOutput');
  
  if (!menu) return;
  
  try {
    const items = JSON.parse(itemsText);
    
    menu.setAttribute('persistent', persistent.toString());
    menu.setAttribute('show-close-button', showClose.toString());
    menu.setAttribute('keyboard-nav', keyboardNav.toString());
    if (menuTitle) {
      menu.setAttribute('menu-title', menuTitle);
    } else {
      menu.removeAttribute('menu-title');
    }
    menu.items = items;
    
    // Remove old listener and add new one
    const newMenu = menu.cloneNode(true);
    menu.parentNode.replaceChild(newMenu, menu);
    
    setTimeout(() => {
      const updatedMenu = document.getElementById('interactiveMultiLevelMenuComponent');
      if (updatedMenu) {
        updatedMenu.setAttribute('persistent', persistent.toString());
        updatedMenu.setAttribute('show-close-button', showClose.toString());
        updatedMenu.setAttribute('keyboard-nav', keyboardNav.toString());
        if (menuTitle) {
          updatedMenu.setAttribute('menu-title', menuTitle);
        }
        updatedMenu.items = items;
        
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
