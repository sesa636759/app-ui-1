// Picklist Demo Functions
export function initPicklistDemo() {
  const section = document.getElementById('picklist');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📋 Picklist Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Dropdown select with search and filtering capabilities.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicPicklist()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showMultiPicklist()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Multi-Select</button>
      <button onclick="showGroupedPicklist()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Grouped</button>
      <button onclick="showPicklistSizes()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showInteractivePicklist()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="picklistDemoContainer" style="margin-top: 20px;"></div>
    <div id="picklistEventLog" style="margin-top: 20px; padding: 12px; background: #f9fafb; border-radius: 6px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;"></div>
  `;

  setTimeout(() => {
    const picklistContainer = document.getElementById('picklistDemoContainer');
    const eventLog = document.getElementById('picklistEventLog');

    if (!picklistContainer) return;

    function logEvent(message) {
      if (!eventLog) return;
      const timestamp = new Date().toLocaleTimeString();
      eventLog.innerHTML += `[${timestamp}] ${message}\n`;
      eventLog.scrollTop = eventLog.scrollHeight;
    }

    window.showBasicPicklist = function () {
      picklistContainer.innerHTML = `
        <ui-picklist
          id="demoPicklist"
          options='[
            {"value": "apple", "label": "Apple"},
            {"value": "banana", "label": "Banana"},
            {"value": "cherry", "label": "Cherry"},
            {"value": "date", "label": "Date"},
            {"value": "elderberry", "label": "Elderberry"}
          ]'
          value="apple"
          placeholder="Choose a fruit">
        </ui-picklist>
      `;
      setupPicklistEvents();
    };

    window.showMultiPicklist = function () {
      picklistContainer.innerHTML = `
        <ui-picklist
          id="demoPicklist"
          mode="multi"
          options='[
            {"value": "react", "label": "React"},
            {"value": "vue", "label": "Vue.js"},
            {"value": "angular", "label": "Angular"},
            {"value": "svelte", "label": "Svelte"},
            {"value": "ember", "label": "Ember.js"}
          ]'
          value='["react", "vue"]'
          placeholder="Select frameworks">
        </ui-picklist>
      `;
      setupPicklistEvents();
    };

    window.showSearchablePicklist = function () {
      picklistContainer.innerHTML = `
        <ui-picklist
          id="demoPicklist"
          searchable="true"
          search-placeholder="Type to search countries..."
          options='[
            {"value": "us", "label": "United States"},
            {"value": "uk", "label": "United Kingdom"},
            {"value": "ca", "label": "Canada"},
            {"value": "au", "label": "Australia"},
            {"value": "de", "label": "Germany"},
            {"value": "fr", "label": "France"},
            {"value": "jp", "label": "Japan"},
            {"value": "br", "label": "Brazil"},
            {"value": "in", "label": "India"},
            {"value": "cn", "label": "China"}
          ]'
          placeholder="Search countries">
        </ui-picklist>
      `;
      setupPicklistEvents();
    };

    window.showDetailedPicklist = function () {
      picklistContainer.innerHTML = `
        <ui-picklist
          id="demoPicklist"
          options='[
            {
              "value": "user-profile",
              "label": "User Profile",
              "description": "Manage your personal information and preferences",
              "icon": "👤"
            },
            {
              "value": "security",
              "label": "Security Settings",
              "description": "Password, 2FA, and security preferences",
              "icon": "🔒"
            },
            {
              "value": "notifications",
              "label": "Notifications",
              "description": "Email and push notification preferences",
              "icon": "🔔"
            },
            {
              "value": "billing",
              "label": "Billing & Payments",
              "description": "Manage subscriptions and payment methods",
              "icon": "💳"
            },
            {
              "value": "disabled",
              "label": "Disabled Option",
              "description": "This option is currently unavailable",
              "icon": "🚫",
              "disabled": true
            }
          ]'
          placeholder="Choose a setting">
        </ui-picklist>
      `;
      setupPicklistEvents();
    };

    window.showGroupedPicklist = function () {
      picklistContainer.innerHTML = `
        <div class="demo-block">
          <h3>Grouped Options</h3>
          <ui-picklist
            id="demoPicklist"
            grouped="true"
            options='[
              {
                "group": "Frontend",
                "items": [
                  {"value": "react", "label": "React"},
                  {"value": "vue", "label": "Vue.js"},
                  {"value": "angular", "label": "Angular"}
                ]
              },
              {
                "group": "Backend",
                "items": [
                  {"value": "node", "label": "Node.js"},
                  {"value": "django", "label": "Django"},
                  {"value": "laravel", "label": "Laravel"}
                ]
              },
              {
                "group": "Mobile",
                "items": [
                  {"value": "react-native", "label": "React Native"},
                  {"value": "flutter", "label": "Flutter"},
                  {"value": "ionic", "label": "Ionic"}
                ]
              }
            ]'
            placeholder="Select a framework">
          </ui-picklist>
        </div>
      `;
      setupPicklistEvents();
    };

    window.showPicklistSizes = function () {
      picklistContainer.innerHTML = `
        <div class="demo-block">
          <h3>Picklist Sizes</h3>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
              <h4>Small Size:</h4>
              <ui-picklist
                id="demoPicklist"
                size="sm"
              options='[
                {"value": "s", "label": "Small"},
                {"value": "m", "label": "Medium"},
                {"value": "l", "label": "Large"}
              ]'
              value="m"
              placeholder="Small picklist">
            </ui-picklist>
          </div>
          <div>
            <h4>Medium Size (Default):</h4>
            <ui-picklist
              id="demoPicklist"
              size="md"
              options='[
                {"value": "s", "label": "Small"},
                {"value": "m", "label": "Medium"},
                {"value": "l", "label": "Large"}
              ]'
              value="m"
              placeholder="Medium picklist">
            </ui-picklist>
          </div>
          <div>
            <h4>Large Size:</h4>
            <ui-picklist
              id="demoPicklist"
              size="lg"
              options='[
                {"value": "s", "label": "Small"},
                {"value": "m", "label": "Medium"},
                {"value": "l", "label": "Large"}
              ]'
              value="m"
              placeholder="Large picklist">
            </ui-picklist>
          </div>
        </div>
      `;
      setupPicklistEvents();
    };

    window.showInteractivePicklist = function () {
      picklistContainer.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Customize the picklist properties and see changes in real-time!</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Mode:</span>
                <select id="picklistMode" oninput="updateInteractivePicklist()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="single" selected>Single</option>
                  <option value="multi">Multiple</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Size:</span>
                <select id="picklistSize" oninput="updateInteractivePicklist()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Variant:</span>
                <select id="picklistVariant" oninput="updateInteractivePicklist()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="default" selected>Default</option>
                  <option value="outlined">Outlined</option>
                  <option value="filled">Filled</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Placeholder:</span>
                <input type="text" id="picklistPlaceholder" value="Choose an option" oninput="updateInteractivePicklist()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="picklistSearchable" checked onchange="updateInteractivePicklist()" style="cursor: pointer;">
                <span>Searchable</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="picklistClearable" checked onchange="updateInteractivePicklist()" style="cursor: pointer;">
                <span>Clearable</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="picklistDisabled" onchange="updateInteractivePicklist()" style="cursor: pointer;">
                <span>Disabled</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="picklistLoading" onchange="updateInteractivePicklist()" style="cursor: pointer;">
                <span>Loading</span>
              </label>
            </div>
          </div>
          
          <div style="padding: 20px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
            <div id="interactivePicklistContainer"></div>
          </div>
        </div>
      `;

      setTimeout(() => {
        updateInteractivePicklist();
      }, 50);
    };

    window.updateInteractivePicklist = function() {
      const mode = document.getElementById('picklistMode')?.value || 'single';
      const size = document.getElementById('picklistSize')?.value || 'md';
      const variant = document.getElementById('picklistVariant')?.value || 'default';
      const placeholder = document.getElementById('picklistPlaceholder')?.value || 'Choose an option';
      const searchable = document.getElementById('picklistSearchable')?.checked !== false;
      const clearable = document.getElementById('picklistClearable')?.checked !== false;
      const disabled = document.getElementById('picklistDisabled')?.checked || false;
      const loading = document.getElementById('picklistLoading')?.checked || false;
      
      const sampleOptions = [
        {"value": "apple", "label": "Apple", "icon": "🍎"},
        {"value": "banana", "label": "Banana", "icon": "🍌"},
        {"value": "cherry", "label": "Cherry", "icon": "🍒"},
        {"value": "date", "label": "Date", "icon": "🌴"},
        {"value": "elderberry", "label": "Elderberry", "icon": "🫐"},
        {"value": "fig", "label": "Fig", "icon": "🍇"},
        {"value": "grape", "label": "Grape", "icon": "🍇"},
        {"value": "kiwi", "label": "Kiwi", "icon": "🥝"}
      ];
      
      const container = document.getElementById('interactivePicklistContainer');
      if (container) {
        container.innerHTML = `
          <ui-picklist
            id="interactivePicklist"
            mode="${mode}"
            size="${size}"
            variant="${variant}"
            placeholder="${placeholder}"
            ${searchable ? 'searchable="true"' : ''}
            ${clearable ? 'clearable="true"' : ''}
            ${disabled ? 'disabled="true"' : ''}
            ${loading ? 'loading="true"' : ''}
            options='${JSON.stringify(sampleOptions)}'>
          </ui-picklist>
        `;
        
        // Setup event logging for interactive picklist
        setTimeout(() => {
          const picklist = document.getElementById('interactivePicklist');
          if (picklist) {
            picklist.addEventListener('picklistChange', (event) => {
              logEvent(`Selection: ${JSON.stringify(event.detail.value)}`);
            });
          }
        }, 100);
      }
    };

    function setupPicklistEvents() {
      setTimeout(() => {
        const picklist = document.getElementById('demoPicklist');
        if (picklist) {
          picklist.addEventListener('picklistChange', (event) => {
            const detail = event.detail;
            logEvent(`Selection changed: ${JSON.stringify(detail.value)}`);
          });

          picklist.addEventListener('picklistOpen', () => {
            logEvent('Picklist opened');
          });

          picklist.addEventListener('picklistClose', () => {
            logEvent('Picklist closed');
          });
        }
      }, 100);
    }

    window.updatePicklistMode = function () {
      const mode = document.getElementById('picklistMode').value;
      const picklist = picklistContainer.querySelector('ui-picklist');
      if (picklist) {
        picklist.mode = mode;
        // Reset value when switching modes
        picklist.value = mode === 'single' ? null : [];
        logEvent(`Mode changed to: ${mode}`);
      }
    };

    window.updatePicklistSize = function () {
      const size = document.getElementById('picklistSize').value;
      const picklist = picklistContainer.querySelector('ui-picklist');
      if (picklist) {
        picklist.size = size;
        logEvent(`Size changed to: ${size}`);
      }
    };

    window.updatePicklistVariant = function () {
      const variant = document.getElementById('picklistVariant').value;
      const picklist = picklistContainer.querySelector('ui-picklist');
      if (picklist) {
        picklist.variant = variant;
        logEvent(`Variant changed to: ${variant}`);
      }
    };

    window.updatePicklistOptions = function () {
      const searchable = document.getElementById('picklistSearchable').checked;
      const clearable = document.getElementById('picklistClearable').checked;
      const disabled = document.getElementById('picklistDisabled').checked;
      const loading = document.getElementById('picklistLoading').checked;

      const picklist = picklistContainer.querySelector('ui-picklist');
      if (picklist) {
        picklist.searchable = searchable;
        picklist.clearable = clearable;
        picklist.disabled = disabled;
        picklist.loading = loading;

        logEvent(`Options updated: searchable=${searchable}, clearable=${clearable}, disabled=${disabled}, loading=${loading}`);
      }
    };

    showBasicPicklist();
  }, 100);
}
