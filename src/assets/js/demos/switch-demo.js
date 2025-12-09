/**
 * Switch Component Demo Script
 * Handles all interactive demos and event logging for the ui-switch component
 */

export function initializeSwitchDemo() {
  console.log('🔄 Initializing Switch Demo...');

  // Event Logging
  const eventLog = document.getElementById('switchEventLog');
  
  function logEvent(message, color = '#3b82f6') {
    if (!eventLog) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.style.color = color;
    logEntry.style.marginBottom = '4px';
    logEntry.textContent = `[${timestamp}] ${message}`;
    eventLog.appendChild(logEntry);
    eventLog.scrollTop = eventLog.scrollHeight;

    // Keep only last 15 entries
    while (eventLog.children.length > 15) {
      eventLog.removeChild(eventLog.firstChild);
    }
  }

  // Clear log on init
  if (eventLog) {
    eventLog.innerHTML = '<div style="color: #9ca3af;">Switch demo initialized. Toggle switches to see events...</div>';
  }

  // Interactive Demo Switches
  const demoSwitch1 = document.getElementById('demoSwitch1');
  const demoSwitch2 = document.getElementById('demoSwitch2');
  const demoSwitch3 = document.getElementById('demoSwitch3');

  if (demoSwitch1) {
    demoSwitch1.addEventListener('switchChange', (e) => {
      logEvent(`✅ Notifications ${e.detail.checked ? 'enabled' : 'disabled'}`, '#10b981');
    });
  }

  if (demoSwitch2) {
    demoSwitch2.addEventListener('switchChange', (e) => {
      logEvent(`🌓 Dark mode ${e.detail.checked ? 'ON' : 'OFF'}`, e.detail.checked ? '#6366f1' : '#f59e0b');
    });
  }

  if (demoSwitch3) {
    let loadingTimeout;
    demoSwitch3.addEventListener('switchChange', (e) => {
      logEvent(`🔄 Auto-save ${e.detail.checked ? 'enabled' : 'disabled'}`, '#3b82f6');
      
      // Simulate loading state
      if (e.detail.checked) {
        demoSwitch3.loading = true;
        logEvent('⏳ Saving settings...', '#9ca3af');
        
        loadingTimeout = setTimeout(() => {
          demoSwitch3.loading = false;
          logEvent('💾 Settings saved successfully!', '#10b981');
        }, 1500);
      } else {
        clearTimeout(loadingTimeout);
      }
    });
  }

  // Settings Toggle Demo
  const settingSwitches = document.querySelectorAll('[data-setting]');
  settingSwitches.forEach(sw => {
    sw.addEventListener('switchChange', (e) => {
      const setting = sw.getAttribute('data-setting');
      logEvent(`⚙️ ${setting}: ${e.detail.checked ? 'ON' : 'OFF'}`, '#6b7280');
    });
  });

  // Playground Configuration
  const playgroundSwitch = document.getElementById('playgroundSwitch');
  const playgroundConfig = {
    size: document.getElementById('playSwitchSize'),
    variant: document.getElementById('playSwitchVariant'),
    shape: document.getElementById('playSwitchShape'),
    labelPos: document.getElementById('playSwitchLabelPos'),
    iconOn: document.getElementById('playSwitchIconOn'),
    iconOff: document.getElementById('playSwitchIconOff'),
    showIcons: document.getElementById('playSwitchShowIcons'),
    label: document.getElementById('playSwitchLabel'),
    disabled: document.getElementById('playSwitchDisabled'),
    loading: document.getElementById('playSwitchLoading'),
    required: document.getElementById('playSwitchRequired'),
  };

  function updatePlaygroundSwitch() {
    if (!playgroundSwitch) return;

    if (playgroundConfig.size) playgroundSwitch.size = playgroundConfig.size.value;
    if (playgroundConfig.variant) playgroundSwitch.variant = playgroundConfig.variant.value;
    if (playgroundConfig.shape) playgroundSwitch.shape = playgroundConfig.shape.value;
    if (playgroundConfig.labelPos) playgroundSwitch.labelPosition = playgroundConfig.labelPos.value;
    if (playgroundConfig.iconOn) playgroundSwitch.iconOn = playgroundConfig.iconOn.value || undefined;
    if (playgroundConfig.iconOff) playgroundSwitch.iconOff = playgroundConfig.iconOff.value || undefined;
    if (playgroundConfig.showIcons) playgroundSwitch.showDefaultIcons = playgroundConfig.showIcons.checked;
    if (playgroundConfig.label) playgroundSwitch.label = playgroundConfig.label.value;
    if (playgroundConfig.disabled) playgroundSwitch.disabled = playgroundConfig.disabled.checked;
    if (playgroundConfig.loading) playgroundSwitch.loading = playgroundConfig.loading.checked;
    if (playgroundConfig.required) playgroundSwitch.required = playgroundConfig.required.checked;
  }

  // Attach playground listeners
  Object.values(playgroundConfig).forEach(control => {
    if (control) {
      const eventType = control.type === 'checkbox' ? 'change' : 'input';
      control.addEventListener(eventType, updatePlaygroundSwitch);
    }
  });

  // Initialize playground
  updatePlaygroundSwitch();

  if (playgroundSwitch) {
    playgroundSwitch.addEventListener('switchChange', (e) => {
      logEvent(`🎮 Playground: ${e.detail.checked ? 'ON' : 'OFF'}`, '#8b5cf6');
    });
  }

  // Form Demo
  const switchForm = document.getElementById('switchForm');
  const formOutput = document.getElementById('formOutput');

  if (switchForm) {
    switchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(switchForm);
      const data = {};
      
      // Get all switches in form
      const switches = switchForm.querySelectorAll('ui-switch');
      switches.forEach(sw => {
        if (sw.name) {
          data[sw.name] = sw.checked;
        }
      });

      if (formOutput) {
        formOutput.textContent = JSON.stringify(data, null, 2);
      }
      
      logEvent('📋 Form submitted', '#10b981');
    });

    // Reset button
    const resetBtn = switchForm.querySelector('button[type="reset"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        setTimeout(() => {
          const switches = switchForm.querySelectorAll('ui-switch');
          switches.forEach(sw => sw.checked = false);
          if (formOutput) formOutput.textContent = '';
          logEvent('🔄 Form reset', '#6b7280');
        }, 0);
      });
    }
  }

  // Accessibility Demo - Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'UI-SWITCH') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.checked = !e.target.checked;
      }
    }
  });

  console.log('✅ Switch Demo Initialized');
}

// New: init function to inject HTML and then initialize behaviors
export function initSwitchDemo() {
  const section = document.getElementById('switch');
  if (!section) return;

  section.innerHTML = `
    <h2>🔘 Switch Component</h2>
    <p>Comprehensive switch (toggle) component with multiple variants, sizes, shapes, and icon support.</p>
    
    <div class=\"demo-block\">
      <h3>Variants</h3>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;\">
        <ui-switch label=\"Primary\" variant=\"primary\" checked></ui-switch>
        <ui-switch label=\"Secondary\" variant=\"secondary\" checked></ui-switch>
        <ui-switch label=\"Success\" variant=\"success\" checked></ui-switch>
        <ui-switch label=\"Danger\" variant=\"danger\" checked></ui-switch>
        <ui-switch label=\"Warning\" variant=\"warning\" checked></ui-switch>
        <ui-switch label=\"Info\" variant=\"info\" checked></ui-switch>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Sizes</h3>
      <div style=\"display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin: 16px 0;\">
        <ui-switch label=\"Extra Small\" size=\"xs\" checked></ui-switch>
        <ui-switch label=\"Small\" size=\"sm\" checked></ui-switch>
        <ui-switch label=\"Medium\" size=\"md\" checked></ui-switch>
        <ui-switch label=\"Large\" size=\"lg\" checked></ui-switch>
        <ui-switch label=\"Extra Large\" size=\"xl\" checked></ui-switch>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Shapes</h3>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;\">
        <ui-switch label=\"Default\" shape=\"default\" checked></ui-switch>
        <ui-switch label=\"Rounded\" shape=\"rounded\" checked></ui-switch>
        <ui-switch label=\"Pill\" shape=\"pill\" checked></ui-switch>
        <ui-switch label=\"Square\" shape=\"square\" checked></ui-switch>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>With Icons</h3>
      <h4>Custom Icons</h4>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0;\">
        <ui-switch label=\"Dark Mode\" icon-on=\"🌙\" icon-off=\"☀️\" checked></ui-switch>
        <ui-switch label=\"Sound\" icon-on=\"🔊\" icon-off=\"🔇\" checked></ui-switch>
        <ui-switch label=\"WiFi\" icon-on=\"📶\" icon-off=\"📵\" checked></ui-switch>
        <ui-switch label=\"Airplane\" icon-on=\"✈️\" icon-off=\"🚫\" checked></ui-switch>
        <ui-switch label=\"Battery\" icon-on=\"🔋\" icon-off=\"🪫\" checked></ui-switch>
      </div>
      <h4>Default Icons (Check/Cross)</h4>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0;\">
        <ui-switch label=\"Option 1\" show-default-icons checked></ui-switch>
        <ui-switch label=\"Option 2\" show-default-icons variant=\"success\" checked></ui-switch>
        <ui-switch label=\"Option 3\" show-default-icons variant=\"danger\" checked></ui-switch>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Label Position</h3>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;\">
        <ui-switch label=\"Label on Right\" label-position=\"right\" checked></ui-switch>
        <ui-switch label=\"Label on Left\" label-position=\"left\" checked></ui-switch>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>States</h3>
      <h4>Loading</h4>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0;\">
        <ui-switch label=\"Loading\" loading checked></ui-switch>
        <ui-switch label=\"Processing\" loading variant=\"success\" checked></ui-switch>
        <ui-switch label=\"Saving\" loading variant=\"info\" size=\"lg\" checked></ui-switch>
      </div>
      <h4>Disabled</h4>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0;\">
        <ui-switch label=\"Disabled Off\" disabled></ui-switch>
        <ui-switch label=\"Disabled On\" disabled checked></ui-switch>
        <ui-switch label=\"Disabled Success\" disabled variant=\"success\" checked></ui-switch>
      </div>
      <h4>Required</h4>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0;\">
        <ui-switch label=\"Accept Terms\" required></ui-switch>
        <ui-switch label=\"Subscribe to Newsletter\" required variant=\"info\"></ui-switch>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Interactive Demo</h3>
      <p style=\"color: #6b7280; font-size: 14px; margin-bottom: 12px;\">Toggle switches to see events logged below</p>
      <div style=\"display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;\">
        <ui-switch id=\"demoSwitch1\" label=\"Enable Notifications\" variant=\"primary\" icon-on=\"🔔\" icon-off=\"🔕\"></ui-switch>
        <ui-switch id=\"demoSwitch2\" label=\"Dark Mode\" variant=\"secondary\" icon-on=\"🌙\" icon-off=\"☀️\"></ui-switch>
        <ui-switch id=\"demoSwitch3\" label=\"Auto-save\" variant=\"success\" icon-on=\"💾\" icon-off=\"📝\"></ui-switch>
      </div>
      <div id=\"switchEventLog\" style=\"background: #1f2937; color: #e5e7eb; padding: 16px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 13px; margin-top: 16px; max-height: 200px; overflow-y: auto;\">
        <div style=\"color: #9ca3af;\">Toggle switches above to see events...</div>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Settings Panel Example</h3>
      <div style=\"max-width: 500px; background: #f9fafb; padding: 24px; border-radius: 12px;\">
        <h4 style=\"margin: 0 0 16px 0; color: #1f2937; font-size: 18px;\">⚙️ Settings</h4>
        <div style=\"display: flex; flex-direction: column; gap: 16px;\">
          <ui-switch data-setting=\"Notifications\" label=\"Push Notifications\" variant=\"primary\" icon-on=\"🔔\" checked></ui-switch>
          <ui-switch data-setting=\"Email Updates\" label=\"Email Updates\" variant=\"info\" icon-on=\"📧\"></ui-switch>
          <ui-switch data-setting=\"Auto-Update\" label=\"Auto-Update\" variant=\"success\" icon-on=\"🔄\" checked></ui-switch>
          <ui-switch data-setting=\"Analytics\" label=\"Analytics Tracking\" variant=\"warning\" icon-on=\"📊\"></ui-switch>
          <ui-switch data-setting=\"Dark Mode\" label=\"Dark Mode\" variant=\"secondary\" icon-on=\"🌙\" icon-off=\"☀️\"></ui-switch>
        </div>
      </div>
    </div>
    
    <div class=\"demo-block playground\">
      <h3>🎮 Interactive Playground</h3>
      <div class=\"playground-controls\" style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;\">
        <div class=\"control-group\"><label>Size:</label><select id=\"playSwitchSize\"><option value=\"xs\">Extra Small</option><option value=\"sm\">Small</option><option value=\"md\" selected>Medium</option><option value=\"lg\">Large</option><option value=\"xl\">Extra Large</option></select></div>
        <div class=\"control-group\"><label>Variant:</label><select id=\"playSwitchVariant\"><option value=\"primary\" selected>Primary</option><option value=\"secondary\">Secondary</option><option value=\"success\">Success</option><option value=\"danger\">Danger</option><option value=\"warning\">Warning</option><option value=\"info\">Info</option></select></div>
        <div class=\"control-group\"><label>Shape:</label><select id=\"playSwitchShape\"><option value=\"default\" selected>Default</option><option value=\"rounded\">Rounded</option><option value=\"pill\">Pill</option><option value=\"square\">Square</option></select></div>
        <div class=\"control-group\"><label>Label Position:</label><select id=\"playSwitchLabelPos\"><option value=\"right\" selected>Right</option><option value=\"left\">Left</option></select></div>
        <div class=\"control-group\"><label>Icon On:</label><input type=\"text\" id=\"playSwitchIconOn\" placeholder=\"e.g., ✓ 🌙 ✅\" /></div>
        <div class=\"control-group\"><label>Icon Off:</label><input type=\"text\" id=\"playSwitchIconOff\" placeholder=\"e.g., ✕ ☀️ ❌\" /></div>
        <div class=\"control-group\"><label>Label Text:</label><input type=\"text\" id=\"playSwitchLabel\" value=\"Playground Switch\" /></div>
        <div class=\"control-group\" style=\"display:flex; flex-direction:column; gap:8px;\">
          <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playSwitchShowIcons\" /> Show Default Icons</label>
          <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playSwitchDisabled\" /> Disabled</label>
          <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playSwitchLoading\" /> Loading</label>
          <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playSwitchRequired\" /> Required</label>
        </div>
      </div>
      <div class=\"playground-preview\" style=\"padding: 32px; background: #f9fafb; border-radius: 8px; display: flex; justify-content: center; align-items: center;\">
        <ui-switch id=\"playgroundSwitch\" label=\"Playground Switch\" checked></ui-switch>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Form Integration</h3>
      <form id=\"switchForm\" style=\"max-width: 500px; background: #f9fafb; padding: 24px; border-radius: 12px;\">
        <h4 style=\"margin: 0 0 16px 0; color: #1f2937;\">User Preferences</h4>
        <div style=\"display: flex; flex-direction: column; gap: 16px;\">
          <ui-switch name=\"notifications\" label=\"Enable Notifications\" variant=\"primary\" required></ui-switch>
          <ui-switch name=\"marketing\" label=\"Marketing Emails\" variant=\"info\"></ui-switch>
          <ui-switch name=\"autoSave\" label=\"Auto-save\" variant=\"success\" checked></ui-switch>
          <ui-switch name=\"darkMode\" label=\"Dark Mode\" variant=\"secondary\" icon-on=\"🌙\" icon-off=\"☀️\"></ui-switch>
          <ui-switch name=\"analytics\" label=\"Analytics\" variant=\"warning\"></ui-switch>
        </div>
        <div style=\"display: flex; gap: 12px; margin-top: 20px;\">
          <button type=\"submit\" style=\"padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;\">Submit</button>
          <button type=\"reset\" style=\"padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;\">Reset</button>
        </div>
        <pre id=\"formOutput\" style=\"margin-top: 16px; padding: 12px; background: #1f2937; color: #e5e7eb; border-radius: 6px; font-size: 12px; overflow-x: auto;\"></pre>
      </form>
    </div>
  `;

  // Initialize behaviors
  initializeSwitchDemo();
}
