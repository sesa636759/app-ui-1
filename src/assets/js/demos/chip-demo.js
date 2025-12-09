// Component Demo Functions
export function initChipDemo() {
  const section = document.getElementById('chip');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🏷️ Chip Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Interactive tags with icons, colors, variants, and removable options.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicChips()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showChipVariants()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Variants</button>
      <button onclick="showChipWithIcons()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">With Icons</button>
      <button onclick="showChipWithAvatars()" style="padding: 8px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">With Avatars</button>
      <button onclick="showChipWithBadges()" style="padding: 8px 16px; background-color: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer;">With Badges</button>
      <button onclick="showChipCounterDemo()" style="padding: 8px 16px; background-color: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer;">With Counter</button>
      <button onclick="showChipAdvancedDemo()" style="padding: 8px 16px; background-color: #a21caf; color: white; border: none; border-radius: 6px; cursor: pointer;">Advanced Features</button>
      <button onclick="showChipAnimations()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Animations</button>
      <button onclick="showRemovableChips()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Removable</button>
      <button onclick="showInteractiveChip()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="chipDemoContainer" style="margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;"></div>
  `;

  window.showChipAdvancedDemo = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    let chips = [
      { label: 'Design', color: 'primary', group: 'Project' },
      { label: 'Frontend', color: 'success', group: 'Project' },
      { label: 'Backend', color: 'info', group: 'Project' },
      { label: 'Bug', color: 'danger', group: 'Issues' },
      { label: 'Feature', color: 'warning', group: 'Issues' },
      { label: 'Docs', color: 'secondary', group: 'Other' }
    ];
    let dragIndex = null;
    function render() {
      // Group chips by 'group'
      var groups = {};
      chips.forEach(function(chip) {
        if (!groups[chip.group]) groups[chip.group] = [];
        groups[chip.group].push(chip);
      });
      var html = '';
      html += '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">';
      html += '<h4>Advanced Chip Features</h4>';
      html += '<span style="font-size: 14px; color: #a21caf; font-weight: 600;">Drag, Edit, Group</span>';
      html += '</div>';
      html += '<div style="display: flex; gap: 30px; flex-wrap: wrap;">';
      Object.keys(groups).forEach(function(group) {
        html += "<div style='min-width: 180px;'>";
        html += "<h5 style='margin-bottom: 8px; color: #6b7280;'>" + group + "</h5>";
        html += "<div style='display: flex; gap: 10px; flex-wrap: wrap;'>";
        groups[group].forEach(function(chip) {
          var i = chips.indexOf(chip);
          html += "<span draggable='true' data-index='" + i + "' class='chip-draggable' style='display:inline-block;'>";
          html += "<ui-chip label='" + chip.label + "' color='" + chip.color + "' removable='true'></ui-chip>";
          html += "<button class='chip-edit-btn' data-index='" + i + "' style='margin-left:2px; background:#f3f4f6; border:none; border-radius:3px; font-size:11px; cursor:pointer;'>✏️</button>";
          html += "</span>";
        });
        html += "</div>";
        html += "</div>";
      });
      html += "</div>";
      html += "<p style='margin-top:18px; color:#6b7280; font-size:13px;'>Drag chips to reorder. Click ✏️ to edit label. Chips are grouped by type.</p>";
      container.innerHTML = html;
      setTimeout(() => {
        // Drag and drop
        document.querySelectorAll('.chip-draggable').forEach(el => {
          el.addEventListener('dragstart', function(e) {
            dragIndex = parseInt(el.getAttribute('data-index'));
            e.dataTransfer.effectAllowed = 'move';
          });
          el.addEventListener('dragover', function(e) {
            e.preventDefault();
          });
          el.addEventListener('drop', function(e) {
            e.preventDefault();
            const dropIndex = parseInt(el.getAttribute('data-index'));
            if (dragIndex !== null && dropIndex !== dragIndex) {
              const moved = chips.splice(dragIndex, 1)[0];
              chips.splice(dropIndex, 0, moved);
              dragIndex = null;
              render();
            }
          });
        });
        // Edit label
        document.querySelectorAll('.chip-edit-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const idx = parseInt(btn.getAttribute('data-index'));
            const newLabel = prompt('Edit chip label:', chips[idx].label);
            if (newLabel !== null && newLabel.trim()) {
              chips[idx].label = newLabel.trim();
              render();
            }
          });
        });
        // Remove chip
        document.querySelectorAll('ui-chip[removable]').forEach(chipEl => {
          chipEl.addEventListener('chipRemove', function() {
            const idx = parseInt(chipEl.parentElement.getAttribute('data-index'));
            chips.splice(idx, 1);
            render();
          });
        });
      }, 50);
    }
    render();
  };
  
    window.showChipCounterDemo = function() {
      const container = document.getElementById('chipDemoContainer');
      if (!container) return;
      let chips = [
        { label: 'Vue', color: 'success' },
        { label: 'React', color: 'info' },
        { label: 'Angular', color: 'danger' },
        { label: 'Svelte', color: 'warning' }
      ];
      function render() {
        container.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h4>Chip Counter Demo</h4>
            <span style="font-size: 16px; color: #3b82f6; font-weight: 600;">Count: <span id='chipCount'>${chips.length}</span></span>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
            ${chips.map((chip, i) => `<ui-chip label='${chip.label}' color='${chip.color}' removable='true' data-index='${i}'></ui-chip>`).join('')}
          </div>
          <button id='addChipBtn' style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Add Chip</button>
        `;
        setTimeout(() => {
          document.querySelectorAll('ui-chip[removable]')?.forEach(chipEl => {
            chipEl.addEventListener('chipRemove', function() {
              const idx = parseInt(chipEl.getAttribute('data-index'));
              chips.splice(idx, 1);
              render();
            });
          });
          const addBtn = document.getElementById('addChipBtn');
          if (addBtn) {
            addBtn.addEventListener('click', function() {
              const newLabel = 'Chip ' + (chips.length + 1);
              chips.push({ label: newLabel, color: 'primary' });
              render();
            });
          }
        }, 50);
      }
      render();
    };
  

  // Initialize with basic chips
  setTimeout(() => showBasicChips(), 100);

  // Chip Demo Functions
  window.showBasicChips = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `<div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <ui-chip label="Basic Chip"></ui-chip>
      <ui-chip label="Primary" color="primary"></ui-chip>
      <ui-chip label="Success" color="success"></ui-chip>
      <ui-chip label="Danger" color="danger"></ui-chip>
      <ui-chip label="Warning" color="warning"></ui-chip>
      <ui-chip label="Info" color="info"></ui-chip>
    </div>`;
  };

  window.showChipVariants = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4>Filled (Default)</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-chip label="Filled Primary" variant="filled" color="primary"></ui-chip>
            <ui-chip label="Filled Success" variant="filled" color="success"></ui-chip>
            <ui-chip label="Filled Danger" variant="filled" color="danger"></ui-chip>
          </div>
        </div>
        <div>
          <h4>Outlined</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-chip label="Outlined Primary" variant="outlined" color="primary"></ui-chip>
            <ui-chip label="Outlined Success" variant="outlined" color="success"></ui-chip>
            <ui-chip label="Outlined Danger" variant="outlined" color="danger"></ui-chip>
          </div>
        </div>
        <div>
          <h4>Text</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-chip label="Text Primary" variant="text" color="primary"></ui-chip>
            <ui-chip label="Text Success" variant="text" color="success"></ui-chip>
            <ui-chip label="Text Danger" variant="text" color="danger"></ui-chip>
          </div>
        </div>
      </div>
    `;
  };

  window.showChipColors = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <ui-chip label="Primary" color="primary"></ui-chip>
        <ui-chip label="Secondary" color="secondary"></ui-chip>
        <ui-chip label="Success" color="success"></ui-chip>
        <ui-chip label="Danger" color="danger"></ui-chip>
        <ui-chip label="Warning" color="warning"></ui-chip>
        <ui-chip label="Info" color="info"></ui-chip>
      </div>
    `;
  };

  window.showChipSizes = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <ui-chip label="Small" size="sm" color="primary"></ui-chip>
        <ui-chip label="Medium" size="md" color="primary"></ui-chip>
        <ui-chip label="Large" size="lg" color="primary"></ui-chip>
      </div>
    `;
  };

  window.showChipWithIcons = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <ui-chip label="Star" icon="⭐" color="warning"></ui-chip>
        <ui-chip label="Check" icon="✓" color="success"></ui-chip>
        <ui-chip label="Heart" icon="❤️" color="danger"></ui-chip>
        <ui-chip label="User" icon="👤" color="primary"></ui-chip>
        <ui-chip label="Avatar" image="https://i.pravatar.cc/150?img=1" color="info"></ui-chip>
      </div>
    `;
  };

  window.showChipWithBadges = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 12px;">Chips with Badge Variant</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-chip label="5" variant="badge" color="primary"></ui-chip>
            <ui-chip label="New" variant="badge" color="success"></ui-chip>
            <ui-chip label="Hot" variant="badge" color="danger"></ui-chip>
            <ui-chip label="12" variant="badge" color="warning"></ui-chip>
            <ui-chip label="Pro" variant="badge" color="info"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px;">Notification Badges</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
            <div style="position: relative; display: inline-block;">
              <ui-chip label="Messages" icon="💬" color="primary"></ui-chip>
              <ui-chip label="3" variant="badge" color="danger" 
                style="position: absolute; top: -8px; right: -8px; min-width: 20px; height: 20px; font-size: 11px;"></ui-chip>
            </div>
            
            <div style="position: relative; display: inline-block;">
              <ui-chip label="Notifications" icon="🔔" color="info"></ui-chip>
              <ui-chip label="99+" variant="badge" color="danger" 
                style="position: absolute; top: -8px; right: -8px; min-width: 20px; height: 20px; font-size: 10px;"></ui-chip>
            </div>
            
            <div style="position: relative; display: inline-block;">
              <ui-chip label="Cart" icon="🛒" color="success"></ui-chip>
              <ui-chip label="7" variant="badge" color="warning" 
                style="position: absolute; top: -8px; right: -8px; min-width: 20px; height: 20px; font-size: 11px;"></ui-chip>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px;">Status Badges</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-chip label="Online" variant="badge" color="success" icon="●"></ui-chip>
            <ui-chip label="Offline" variant="badge" color="danger" icon="●"></ui-chip>
            <ui-chip label="Away" variant="badge" color="warning" icon="●"></ui-chip>
            <ui-chip label="Busy" variant="badge" color="info" icon="●"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px;">Badge Sizes</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
            <ui-chip label="9" variant="badge" color="primary" size="sm"></ui-chip>
            <ui-chip label="15" variant="badge" color="success" size="md"></ui-chip>
            <ui-chip label="42" variant="badge" color="danger" size="lg"></ui-chip>
          </div>
        </div>
      </div>
      <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
        Badge variant chips are perfect for displaying counts, statuses, and notifications. 
        They can be used standalone or positioned on other elements.
      </p>
    `;
  };

  window.showRemovableChips = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <ui-chip label="Removable" removable="true" color="primary"></ui-chip>
        <ui-chip label="JavaScript" removable="true" icon="🟨" color="warning"></ui-chip>
        <ui-chip label="React" removable="true" icon="⚛️" color="info"></ui-chip>
        <ui-chip label="TypeScript" removable="true" icon="🔷" color="primary"></ui-chip>
      </div>
      <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">Click the × to remove chips</p>
    `;
  };

  window.showInteractiveChip = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the chip properties and see changes in real-time!</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 16px;">Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Label:</span>
              <input type="text" id="chipLabel" value="Interactive Chip" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Icon (emoji):</span>
              <input type="text" id="chipIcon" value="⭐" placeholder="Leave empty for none"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Image URL:</span>
              <input type="text" id="chipImage" value="" placeholder="Image URL"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>User Avatar URL:</span>
              <input type="text" id="chipAvatar" value="" placeholder="Avatar URL (circular)"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Variant:</span>
              <select id="chipVariant" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="filled" selected>Filled</option>
                <option value="outlined">Outlined</option>
                <option value="text">Text</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Color:</span>
              <select id="chipColor" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="primary" selected>Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="danger">Danger</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Size:</span>
              <select id="chipSize" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="sm">Small</option>
                <option value="md" selected>Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Animation:</span>
              <select id="chipAnimation" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="scale" selected>Scale</option>
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="bounce">Bounce</option>
                <option value="none">None</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Animation Duration (ms):</span>
              <input type="number" id="chipAnimationDuration" value="300" min="100" max="1000" step="50"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="chipRemovable" style="cursor: pointer;">
              <span>Removable</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="chipClickable" style="cursor: pointer;">
              <span>Clickable</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="chipDisabled" style="cursor: pointer;">
              <span>Disabled</span>
            </label>
          </div>
          <button onclick="updateInteractiveChip()" 
            style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Apply Changes
          </button>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; padding: 40px; background-color: white; border-radius: 8px;">
          <div id="interactiveChipContainer"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      updateInteractiveChip();
    }, 50);
  };

  window.updateInteractiveChip = function() {
    const label = document.getElementById('chipLabel').value;
    const icon = document.getElementById('chipIcon').value;
    const image = document.getElementById('chipImage')?.value || '';
    const avatar = document.getElementById('chipAvatar')?.value || '';
    const variant = document.getElementById('chipVariant').value;
    const color = document.getElementById('chipColor').value;
    const size = document.getElementById('chipSize').value;
    const animation = document.getElementById('chipAnimation')?.value || 'scale';
    const animationDuration = document.getElementById('chipAnimationDuration')?.value || '300';
    const removable = document.getElementById('chipRemovable').checked;
    const clickable = document.getElementById('chipClickable').checked;
    const disabled = document.getElementById('chipDisabled').checked;
    
    const chipContainer = document.getElementById('interactiveChipContainer');
    if (chipContainer) {
      chipContainer.innerHTML = `
        <ui-chip 
          label="${label}"
          ${icon && !image && !avatar ? `icon="${icon}"` : ''}
          ${image && !avatar ? `image="${image}"` : ''}
          ${avatar ? `user-avatar="${avatar}"` : ''}
          variant="${variant}"
          color="${color}"
          size="${size}"
          animation="${animation}"
          animation-duration="${animationDuration}"
          ${removable ? 'removable="true"' : ''}
          ${clickable ? 'clickable="true"' : ''}
          ${disabled ? 'disabled="true"' : ''}>
        </ui-chip>
      `;
    }
  };

  // New demo functions for avatars and animations
  window.showChipWithAvatars = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Chips with User Avatars (Circular)</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
            <ui-chip label="John Doe" user-avatar="https://i.pravatar.cc/150?img=12" color="primary"></ui-chip>
            <ui-chip label="Jane Smith" user-avatar="https://i.pravatar.cc/150?img=5" color="success"></ui-chip>
            <ui-chip label="Mike Johnson" user-avatar="https://i.pravatar.cc/150?img=33" color="info"></ui-chip>
            <ui-chip label="Sarah Wilson" user-avatar="https://i.pravatar.cc/150?img=47" color="warning" removable="true"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4>Chips with Images (Rounded Rectangle)</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
            <ui-chip label="JavaScript" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" color="warning"></ui-chip>
            <ui-chip label="TypeScript" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" color="info"></ui-chip>
            <ui-chip label="React" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" color="primary"></ui-chip>
            <ui-chip label="Vue" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" color="success"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4>Chips with Icons</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
            <ui-chip label="Home" icon="🏠" color="primary"></ui-chip>
            <ui-chip label="Settings" icon="⚙️" color="secondary"></ui-chip>
            <ui-chip label="Notifications" icon="🔔" color="warning"></ui-chip>
            <ui-chip label="Messages" icon="💬" color="info"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4>Different Sizes with Avatars</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-top: 15px;">
            <ui-chip label="Small" user-avatar="https://i.pravatar.cc/150?img=8" size="sm" color="primary"></ui-chip>
            <ui-chip label="Medium" user-avatar="https://i.pravatar.cc/150?img=9" size="md" color="success"></ui-chip>
            <ui-chip label="Large" user-avatar="https://i.pravatar.cc/150?img=10" size="lg" color="danger"></ui-chip>
          </div>
        </div>
      </div>
    `;
  };

  window.showChipAnimations = function() {
    const container = document.getElementById('chipDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Different Animation Types (Click ❌ to see closing animations)</h4>
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 15px;">Each chip uses a different closing animation</p>
        </div>
        
        <div>
          <h4>Scale Animation (Default)</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
            <ui-chip label="Scale Close" icon="📏" color="primary" removable="true" animation="scale"></ui-chip>
            <ui-chip label="Smooth Scale" icon="🎯" color="success" removable="true" animation="scale"></ui-chip>
            <ui-chip label="Click to Remove" icon="✨" color="info" removable="true" animation="scale"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4>Fade Animation</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
            <ui-chip label="Fade Out" icon="🌙" color="secondary" removable="true" animation="fade"></ui-chip>
            <ui-chip label="Gentle Fade" icon="☁️" color="warning" removable="true" animation="fade"></ui-chip>
            <ui-chip label="Smooth Exit" icon="🌅" color="danger" removable="true" animation="fade"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4>Slide Animation</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
            <ui-chip label="Slide Right" icon="➡️" color="primary" removable="true" animation="slide"></ui-chip>
            <ui-chip label="Slide Away" icon="🚀" color="info" removable="true" animation="slide"></ui-chip>
            <ui-chip label="Smooth Slide" icon="🏃" color="success" removable="true" animation="slide"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4>Bounce Animation</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
            <ui-chip label="Bounce Out" icon="🎈" color="warning" removable="true" animation="bounce"></ui-chip>
            <ui-chip label="Fun Exit" icon="🎉" color="danger" removable="true" animation="bounce"></ui-chip>
            <ui-chip label="Playful" icon="🎊" color="secondary" removable="true" animation="bounce"></ui-chip>
          </div>
        </div>
        
        <div>
          <h4>Custom Duration (Fast: 150ms, Slow: 600ms)</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
            <ui-chip label="Fast" icon="⚡" color="primary" removable="true" animation="scale" animation-duration="150"></ui-chip>
            <ui-chip label="Normal" icon="⏱️" color="info" removable="true" animation="scale" animation-duration="300"></ui-chip>
            <ui-chip label="Slow" icon="🐌" color="success" removable="true" animation="scale" animation-duration="600"></ui-chip>
          </div>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #fbbf24;">
          <p style="margin: 0; color: #92400e;"><strong>💡 Tip:</strong> Click the ❌ button on any chip to see its closing animation in action!</p>
        </div>
      </div>
    `;
  };
}

// Helper to set or remove attribute based on value
function setOrRemove(el, attr, value) {
  const v = value.trim();
  if (v === '') {
    el.removeAttribute(attr);
  } else {
    el.setAttribute(attr, v);
  }
}

// Chip controls
document.addEventListener('DOMContentLoaded', () => {
  // Chip controls
  const chipPreview = document.getElementById('chipPreview');
  const chipLabel = document.getElementById('chipLabel');
  const chipBadge = document.getElementById('chipBadge');
  const chipCounter = document.getElementById('chipCounter');
  const chipCounterError = document.getElementById('chipCounterError');

  if (chipPreview && chipLabel && chipBadge && chipCounter && chipCounterError) {
    chipLabel.addEventListener('input', (e) => {
      setOrRemove(chipPreview, 'label', e.target.value);
    });
    chipBadge.addEventListener('input', (e) => {
      setOrRemove(chipPreview, 'badge', e.target.value);
    });
    chipCounter.addEventListener('input', (e) => {
      const raw = e.target.value.trim();
      if (raw === '') {
        chipCounterError.style.display = 'none';
        chipPreview.removeAttribute('counter');
        return;
      }
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        chipCounterError.style.display = 'inline';
        chipPreview.removeAttribute('counter');
      } else {
        chipCounterError.style.display = 'none';
        chipPreview.setAttribute('counter', String(num));
      }
    });
  }

  // Tag controls
  const tagPreview = document.getElementById('tagPreview');
  const tagLabel = document.getElementById('tagLabel');
  const tagBadge = document.getElementById('tagBadge');
  const tagCounter = document.getElementById('tagCounter');
  const tagCounterError = document.getElementById('tagCounterError');

  if (tagPreview && tagLabel && tagBadge && tagCounter && tagCounterError) {
    tagLabel.addEventListener('input', (e) => {
      setOrRemove(tagPreview, 'label', e.target.value);
    });
    tagBadge.addEventListener('input', (e) => {
      setOrRemove(tagPreview, 'badge', e.target.value);
    });
    tagCounter.addEventListener('input', (e) => {
      const raw = e.target.value.trim();
      if (raw === '') {
        tagCounterError.style.display = 'none';
        tagPreview.removeAttribute('counter');
        return;
      }
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        tagCounterError.style.display = 'inline';
        tagPreview.removeAttribute('counter');
      } else {
        tagCounterError.style.display = 'none';
        tagPreview.setAttribute('counter', String(num));
      }
    });
  }
});
