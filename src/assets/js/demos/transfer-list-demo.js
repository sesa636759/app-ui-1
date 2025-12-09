// Component Demo Functions
export function initTransferListDemo() {
  const section = document.getElementById('transfer-list');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🔄 Transfer List Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Dual list box for moving items between two lists.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicTransfer()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showSearchableTransfer()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Searchable</button>
      <button onclick="showCustomTransfer()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Custom</button>
      <button onclick="showInteractiveTransfer()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="transferDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    // Transfer List Demo Functions
    window.showBasicTransfer = function() {
    const container = document.getElementById('transferDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Basic Transfer List</h4>
        <p style="color: #6b7280; font-size: 13px;">Select items and move them between lists using the buttons</p>
        <ui-transfer-list id="basicTransfer"></ui-transfer-list>
        <div id="transferLog" style="margin-top: 20px; padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
          <strong>Event Log:</strong>
          <div style="margin-top: 8px; color: #6b7280;">Select and move items to see events...</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const transfer = document.getElementById('basicTransfer');
      if (transfer) {
        transfer.sourceItems = [
          { key: 1, label: 'JavaScript' },
          { key: 2, label: 'TypeScript' },
          { key: 3, label: 'Python' },
          { key: 4, label: 'Java' },
          { key: 5, label: 'C++' },
          { key: 6, label: 'Go' },
          { key: 7, label: 'Rust' },
          { key: 8, label: 'PHP' }
        ];
        transfer.targetItems = [];

        transfer.addEventListener('transferChange', (e) => {
          const log = document.querySelector('#transferLog div');
          if (log) {
            log.innerHTML = `
              <div style="color: #1e40af;">
                <strong>Transfer Event:</strong><br>
                Source: ${e.detail.sourceItems.length} items<br>
                Target: ${e.detail.targetItems.length} items
              </div>
            `;
          }
        });
      }
    }, 100);
  };

  window.showTransferWithSearch = function() {
    const container = document.getElementById('transferDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Transfer List with Search</h4>
        <p style="color: #6b7280; font-size: 13px;">Search and filter items in each list independently</p>
        <ui-transfer-list 
          id="searchTransfer"
          searchable="true"
          source-title="Available Countries"
          target-title="Selected Countries"></ui-transfer-list>
      </div>
    `;
    setTimeout(() => {
      const transfer = document.getElementById('searchTransfer');
      if (transfer) {
        transfer.sourceItems = [
          { key: 1, label: 'United States' },
          { key: 2, label: 'United Kingdom' },
          { key: 3, label: 'Canada' },
          { key: 4, label: 'Australia' },
          { key: 5, label: 'Germany' },
          { key: 6, label: 'France' },
          { key: 7, label: 'Japan' },
          { key: 8, label: 'China' },
          { key: 9, label: 'India' },
          { key: 10, label: 'Brazil' },
          { key: 11, label: 'Mexico' },
          { key: 12, label: 'Spain' },
          { key: 13, label: 'Italy' },
          { key: 14, label: 'Netherlands' },
          { key: 15, label: 'Sweden' }
        ];
        transfer.targetItems = [];
      }
    }, 100);
  };

  window.showTransferDragDrop = function() {
    const container = document.getElementById('transferDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Transfer with Drag & Drop</h4>
        <p style="color: #6b7280; font-size: 13px;">Drag items between lists or use the move buttons</p>
        <ui-transfer-list 
          id="dragTransfer"
          is-draggable="true"
          searchable="true"
          source-title="To Do"
          target-title="Completed"></ui-transfer-list>
      </div>
    `;
    setTimeout(() => {
      const transfer = document.getElementById('dragTransfer');
      if (transfer) {
        transfer.sourceItems = [
          { key: 1, label: 'Review pull requests', icon: '📝' },
          { key: 2, label: 'Update documentation', icon: '📚' },
          { key: 3, label: 'Fix bug #123', icon: '🐛' },
          { key: 4, label: 'Refactor authentication', icon: '🔐' },
          { key: 5, label: 'Write unit tests', icon: '🧪' },
          { key: 6, label: 'Deploy to staging', icon: '🚀' }
        ];
        transfer.targetItems = [
          { key: 7, label: 'Setup CI/CD pipeline', icon: '⚙️' }
        ];
      }
    }, 100);
  };

  window.showTransferSizes = function() {
    const container = document.getElementById('transferDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Small Size</h4>
          <ui-transfer-list id="smallTransfer" size="sm"></ui-transfer-list>
        </div>
        <div>
          <h4>Medium Size (Default)</h4>
          <ui-transfer-list id="mediumTransfer" size="md"></ui-transfer-list>
        </div>
        <div>
          <h4>Large Size</h4>
          <ui-transfer-list id="largeTransfer" size="lg"></ui-transfer-list>
        </div>
      </div>
    `;
    setTimeout(() => {
      const items = [
        { key: 1, label: 'Item 1' },
        { key: 2, label: 'Item 2' },
        { key: 3, label: 'Item 3' }
      ];

      ['smallTransfer', 'mediumTransfer', 'largeTransfer'].forEach(id => {
        const transfer = document.getElementById(id);
        if (transfer) {
          transfer.sourceItems = [...items];
          transfer.targetItems = [];
        }
      });
    }, 100);
  };

  window.showTransferWithIcons = function() {
    const container = document.getElementById('transferDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Transfer with Icons and Descriptions</h4>
        <p style="color: #6b7280; font-size: 13px;">Rich item display with icons and additional information</p>
        <ui-transfer-list 
          id="iconTransfer"
          searchable="true"
          is-draggable="true"
          show-select-all="true"
          source-title="Available Features"
          target-title="Enabled Features"></ui-transfer-list>
      </div>
    `;
    setTimeout(() => {
      const transfer = document.getElementById('iconTransfer');
      if (transfer) {
        transfer.sourceItems = [
          { key: 1, label: 'User Management', icon: '👤', description: 'Manage user accounts and permissions' },
          { key: 2, label: 'Dashboard', icon: '📊', description: 'Analytics and reporting dashboard' },
          { key: 3, label: 'Settings', icon: '⚙️', description: 'Application configuration' },
          { key: 4, label: 'Notifications', icon: '🔔', description: 'Push and email notifications' },
          { key: 5, label: 'File Storage', icon: '📁', description: 'Cloud file storage system' },
          { key: 6, label: 'Search', icon: '🔍', description: 'Full-text search capability' },
          { key: 7, label: 'API Access', icon: '🔌', description: 'RESTful API endpoints' },
          { key: 8, label: 'Backups', icon: '💾', description: 'Automated backup system' }
        ];
        transfer.targetItems = [
          { key: 9, label: 'Authentication', icon: '🔐', description: 'User login and security' }
        ];
      }
    }, 100);
  };

  window.showTransferCustom = function() {
    const container = document.getElementById('transferDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Custom Headers and Disabled Items</h4>
        <p style="color: #6b7280; font-size: 13px;">Custom list titles and non-transferable items</p>
        <ui-transfer-list 
          id="customTransfer"
          searchable="true"
          show-select-all="true"
          source-title="Available Permissions"
          target-title="Granted Permissions"></ui-transfer-list>
        <div style="margin-top: 16px; padding: 12px; background: #fef3c7; border-radius: 6px; border: 1px solid #f59e0b;">
          <strong style="color: #92400e;">ℹ️ Note:</strong>
          <span style="color: #78350f;"> Admin permissions are disabled and cannot be transferred</span>
        </div>
      </div>
    `;
    setTimeout(() => {
      const transfer = document.getElementById('customTransfer');
      if (transfer) {
        transfer.sourceItems = [
          { key: 1, label: 'Read Posts', icon: '📖' },
          { key: 2, label: 'Write Posts', icon: '✍️' },
          { key: 3, label: 'Delete Posts', icon: '🗑️' },
          { key: 4, label: 'Manage Users', icon: '👥' },
          { key: 5, label: 'View Analytics', icon: '📈' },
          { key: 6, label: 'Export Data', icon: '📤' }
        ];
        transfer.targetItems = [
          { key: 7, label: 'System Admin', icon: '⚠️', disabled: true, description: 'Cannot be modified' },
          { key: 8, label: 'Super User', icon: '👑', disabled: true, description: 'Cannot be modified' }
        ];
      }
    }, 100);
  };

  // Initialize home transfer list
  window.initHomeTransfer = function() {
    const transfer = document.getElementById('homeTransfer');
    if (!transfer) return;
    
    setTimeout(() => {
      transfer.sourceItems = [
        { key: 1, label: 'JavaScript', icon: '📜' },
        { key: 2, label: 'TypeScript', icon: '📘' },
        { key: 3, label: 'Python', icon: '🐍' },
        { key: 4, label: 'Java', icon: '☕' },
        { key: 5, label: 'Go', icon: '🔷' }
      ];
      transfer.targetItems = [
        { key: 6, label: 'React', icon: '⚛️' }
      ];
    }, 200);
  };

  showBasicTransfer();
  }, 100);
}

// Interactive Playground Functions
window.showInteractiveTransfer = function() {
  const container = document.getElementById('transferDemoContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
              <select id="transferSize" onchange="updateInteractiveTransfer()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="sm">Small</option>
                <option value="md" selected>Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Height:</label>
              <input type="text" id="transferHeight" value="300px" onchange="updateInteractiveTransfer()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Source Title:</label>
              <input type="text" id="transferSourceTitle" value="Available" onchange="updateInteractiveTransfer()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Target Title:</label>
              <input type="text" id="transferTargetTitle" value="Selected" onchange="updateInteractiveTransfer()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Search Placeholder:</label>
              <input type="text" id="transferSearchPlaceholder" value="Search items..." onchange="updateInteractiveTransfer()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Empty Text:</label>
              <input type="text" id="transferEmptyText" value="No items" onchange="updateInteractiveTransfer()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="transferSearchable" checked onchange="updateInteractiveTransfer()" style="cursor: pointer;">
              <label for="transferSearchable" style="cursor: pointer;">Searchable</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="transferShowSelectAll" checked onchange="updateInteractiveTransfer()" style="cursor: pointer;">
              <label for="transferShowSelectAll" style="cursor: pointer;">Show Select All</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="transferShowCount" checked onchange="updateInteractiveTransfer()" style="cursor: pointer;">
              <label for="transferShowCount" style="cursor: pointer;">Show Count</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="transferShowDescriptions" checked onchange="updateInteractiveTransfer()" style="cursor: pointer;">
              <label for="transferShowDescriptions" style="cursor: pointer;">Show Descriptions</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="transferDraggable" onchange="updateInteractiveTransfer()" style="cursor: pointer;">
              <label for="transferDraggable" style="cursor: pointer;">Enable Drag & Drop</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="transferDisabled" onchange="updateInteractiveTransfer()" style="cursor: pointer;">
              <label for="transferDisabled" style="cursor: pointer;">Disabled</label>
            </div>
          </div>
        </div>
        
        <div style="flex: 2; min-width: 400px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveTransferContainer" style="margin-top: 20px;"></div>
          <div id="transferOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
        </div>
      </div>
    </div>
  `;
  
  updateInteractiveTransfer();
};

window.updateInteractiveTransfer = function() {
  const size = document.getElementById('transferSize').value;
  const height = document.getElementById('transferHeight').value;
  const sourceTitle = document.getElementById('transferSourceTitle').value;
  const targetTitle = document.getElementById('transferTargetTitle').value;
  const searchPlaceholder = document.getElementById('transferSearchPlaceholder').value;
  const emptyText = document.getElementById('transferEmptyText').value;
  const searchable = document.getElementById('transferSearchable').checked;
  const showSelectAll = document.getElementById('transferShowSelectAll').checked;
  const showCount = document.getElementById('transferShowCount').checked;
  const showDescriptions = document.getElementById('transferShowDescriptions').checked;
  const isDraggable = document.getElementById('transferDraggable').checked;
  const disabled = document.getElementById('transferDisabled').checked;
  
  const container = document.getElementById('interactiveTransferContainer');
  const outputDiv = document.getElementById('transferOutput');
  
  if (!container) return;
  
  container.innerHTML = `
    <ui-transfer-list
      id="interactiveTransferComponent"
      size="${size}"
      height="${height}"
      source-title="${sourceTitle}"
      target-title="${targetTitle}"
      search-placeholder="${searchPlaceholder}"
      empty-text="${emptyText}"
      ${searchable ? 'searchable="true"' : 'searchable="false"'}
      ${showSelectAll ? 'show-select-all="true"' : 'show-select-all="false"'}
      ${showCount ? 'show-count="true"' : 'show-count="false"'}
      ${showDescriptions ? 'show-descriptions="true"' : 'show-descriptions="false"'}
      ${isDraggable ? 'is-draggable="true"' : 'is-draggable="false"'}
      ${disabled ? 'disabled="true"' : ''}
    ></ui-transfer-list>
  `;
  
  setTimeout(() => {
    const transfer = document.getElementById('interactiveTransferComponent');
    if (transfer) {
      transfer.sourceItems = [
        { key: 1, label: 'JavaScript', icon: '📜', description: 'Dynamic programming language' },
        { key: 2, label: 'TypeScript', icon: '📘', description: 'Typed superset of JavaScript' },
        { key: 3, label: 'Python', icon: '🐍', description: 'High-level programming language' },
        { key: 4, label: 'Java', icon: '☕', description: 'Object-oriented language' },
        { key: 5, label: 'C++', icon: '⚡', description: 'Systems programming language' },
        { key: 6, label: 'Go', icon: '🔷', description: 'Statically typed language' },
        { key: 7, label: 'Rust', icon: '🦀', description: 'Memory-safe language' }
      ];
      
      transfer.targetItems = [
        { key: 8, label: 'React', icon: '⚛️', description: 'JavaScript library for UIs' }
      ];
      
      transfer.addEventListener('transferChange', (event) => {
        if (outputDiv) {
          outputDiv.style.display = 'block';
          outputDiv.textContent = `Transfer change: Source(${event.detail.sourceItems.length}) → Target(${event.detail.targetItems.length})`;
        }
      });
    }
  }, 100);
};
