// Component Demo Functions
export function initBadgeDemo() {
  const section = document.getElementById('badge');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🔔 Badge Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Notification indicators with positioning, colors, and dot mode.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicBadges()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showBadgeColors()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Colors</button>
      <button onclick="showBadgePositions()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Positions</button>
      <button onclick="showBadgeDots()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Dot Mode</button>
      <button onclick="showInteractiveBadge()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="badgeDemoContainer" style="margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;"></div>
  `;

  // Initialize with basic badges
  setTimeout(() => showBasicBadges(), 100);

  // Badge Demo Functions
  window.showBasicBadges = function() {
    const container = document.getElementById('badgeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 30px; flex-wrap: wrap; align-items: center;">
        <ui-badge value="5">
          <button style="padding: 8px 16px;">Messages</button>
        </ui-badge>
        <ui-badge value="10">
          <button style="padding: 8px 16px;">Notifications</button>
        </ui-badge>
        <ui-badge value="99">
          <button style="padding: 8px 16px;">Updates</button>
        </ui-badge>
        <ui-badge value="150" max="99">
          <button style="padding: 8px 16px;">New Items</button>
        </ui-badge>
      </div>
    `;
  };

  window.showBadgeColors = function() {
    const container = document.getElementById('badgeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 30px; flex-wrap: wrap; align-items: center;">
        <ui-badge value="5" color="primary">
          <button style="padding: 8px 16px;">Primary</button>
        </ui-badge>
        <ui-badge value="8" color="secondary">
          <button style="padding: 8px 16px;">Secondary</button>
        </ui-badge>
        <ui-badge value="3" color="success">
          <button style="padding: 8px 16px;">Success</button>
        </ui-badge>
        <ui-badge value="12" color="danger">
          <button style="padding: 8px 16px;">Danger</button>
        </ui-badge>
        <ui-badge value="7" color="warning">
          <button style="padding: 8px 16px;">Warning</button>
        </ui-badge>
        <ui-badge value="4" color="info">
          <button style="padding: 8px 16px;">Info</button>
        </ui-badge>
      </div>
    `;
  };

  window.showBadgePositions = function() {
    const container = document.getElementById('badgeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: center;">
        <ui-badge value="5" position="top-right">
          <button style="padding: 20px 30px;">Top Right</button>
        </ui-badge>
        <ui-badge value="3" position="top-left">
          <button style="padding: 20px 30px;">Top Left</button>
        </ui-badge>
        <ui-badge value="7" position="bottom-right">
          <button style="padding: 20px 30px;">Bottom Right</button>
        </ui-badge>
        <ui-badge value="2" position="bottom-left">
          <button style="padding: 20px 30px;">Bottom Left</button>
        </ui-badge>
      </div>
    `;
  };

  window.showBadgeDots = function() {
    const container = document.getElementById('badgeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 30px; flex-wrap: wrap; align-items: center;">
        <ui-badge dot="true" color="success">
          <ui-avatar content="JD" size="48px"></ui-avatar>
        </ui-badge>
        <ui-badge dot="true" color="danger">
          <button style="padding: 8px 16px;">Online</button>
        </ui-badge>
        <ui-badge dot="true" color="warning">
          <span style="padding: 8px 16px; display: inline-block;">Away</span>
        </ui-badge>
        <ui-badge dot="true" color="secondary" size="lg">
          <span style="padding: 8px 16px; display: inline-block;">Offline</span>
        </ui-badge>
      </div>
    `;
  };

  window.showBadgeExamples = function() {
    const container = document.getElementById('badgeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 30px; flex-wrap: wrap; align-items: center;">
        <ui-badge value="5" color="danger">
          <button style="padding: 8px 16px;">🔔 Notifications</button>
        </ui-badge>
        <ui-badge value="3" color="info">
          <button style="padding: 8px 16px;">💬 Messages</button>
        </ui-badge>
        <ui-badge value="12" color="success">
          <button style="padding: 8px 16px;">📧 Emails</button>
        </ui-badge>
        <ui-badge dot="true" color="success">
          <ui-avatar src="https://i.pravatar.cc/150?img=1" size="56px"></ui-avatar>
        </ui-badge>
      </div>
    `;
  };

  window.showInteractiveBadge = function() {
    const container = document.getElementById('badgeDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the badge properties and see changes in real-time!</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 16px;">Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Value:</span>
              <input type="number" id="badgeValue" value="5" min="0" max="999" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Max Value:</span>
              <input type="number" id="badgeMax" value="99" min="1" max="999" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Color:</span>
              <select id="badgeColor" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="danger" selected>Danger</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Size:</span>
              <select id="badgeSize" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="sm">Small</option>
                <option value="md" selected>Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Position:</span>
              <select id="badgePosition" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="top-right" selected>Top Right</option>
                <option value="top-left">Top Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Variant:</span>
              <select id="badgeVariant" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="standard" selected>Standard</option>
                <option value="outlined">Outlined</option>
              </select>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="badgeDot" style="cursor: pointer;">
              <span>Dot Mode</span>
            </label>
          </div>
          <button onclick="updateInteractiveBadge()" 
            style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Apply Changes
          </button>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; padding: 40px; background-color: white; border-radius: 8px;">
          <div id="interactiveBadgeContainer"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      updateInteractiveBadge();
    }, 50);
  };

  window.updateInteractiveBadge = function() {
    const value = document.getElementById('badgeValue').value;
    const max = document.getElementById('badgeMax').value;
    const color = document.getElementById('badgeColor').value;
    const size = document.getElementById('badgeSize').value;
    const position = document.getElementById('badgePosition').value;
    const variant = document.getElementById('badgeVariant').value;
    const dot = document.getElementById('badgeDot').checked;
    
    const badgeContainer = document.getElementById('interactiveBadgeContainer');
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        <ui-badge 
          ${!dot ? `value="${value}"` : ''}
          ${!dot ? `max="${max}"` : ''}
          color="${color}"
          size="${size}"
          position="${position}"
          variant="${variant}"
          ${dot ? 'dot="true"' : ''}>
          <button style="padding: 20px 40px; font-size: 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Test Element
          </button>
        </ui-badge>
      `;
    }
  };
}

