// Top Bar Demo
export function initTopBarDemo() {
  const section = document.getElementById('top-bar');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📌 Top Bar Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Sticky top navigation bar with company branding, action icons, and user profile menu.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicTopBar()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showTopBarWithActions()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">With Actions</button>
      <button onclick="showTopBarThemes()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Themes</button>
      <button onclick="showTopBarPlayground()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="topBarDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicTopBar = function() {
      const container = document.getElementById('topBarDemoContainer');
      if (!container) return;

      const userMenuItems = [
        { id: 'profile', label: 'My Profile', icon: '👤' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'divider1', divider: true },
        { id: 'logout', label: 'Logout', icon: '🚪' }
      ];

      container.innerHTML = `
        <div class="demo-block">
          <h3>Basic Top Bar</h3>
          <p>A sticky top bar with company branding and user profile menu.</p>
          
          <div style="position: relative; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <ui-top-bar id="basicTopBar" 
              company-name="Acme Corp" 
              company-logo="🏢"
              user-name="John Doe"
              user-avatar="👤">
              <div style="font-size: 14px; color: #6b7280;">Dashboard</div>
            </ui-top-bar>
            
            <div style="padding: 40px 24px; min-height: 200px;">
              <h4 style="margin: 0 0 12px;">Page Content</h4>
              <p style="color: #6b7280; margin: 0;">Hover over the user profile icon to see the menu dropdown.</p>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        const topBar = document.getElementById('basicTopBar');
        if (topBar) {
          topBar.userMenuItems = userMenuItems;
        }
      }, 100);
    };

    window.showTopBarWithActions = function() {
      const container = document.getElementById('topBarDemoContainer');
      if (!container) return;

      const actions = [
        { id: 'search', icon: '🔍', label: 'Search' },
        { id: 'notifications', icon: '🔔', label: 'Notifications', badge: '3' },
        { id: 'messages', icon: '💬', label: 'Messages', badge: '12' },
        { id: 'help', icon: '❓', label: 'Help' }
      ];

      const userMenuItems = [
        { id: 'profile', label: 'My Profile', icon: '👤' },
        { id: 'account', label: 'Account Settings', icon: '⚙️' },
        { id: 'billing', label: 'Billing', icon: '💳' },
        { id: 'divider1', divider: true },
        { id: 'help', label: 'Help & Support', icon: '❓' },
        { id: 'divider2', divider: true },
        { id: 'logout', label: 'Logout', icon: '🚪' }
      ];

      container.innerHTML = `
        <div class="demo-block">
          <h3>Top Bar with Action Icons</h3>
          <p>Includes action buttons with badges and a comprehensive user menu.</p>
          
          <div style="position: relative; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <ui-top-bar id="actionsTopBar" 
              company-name="TechFlow" 
              company-logo="⚡"
              user-name="Sarah Johnson"
              user-avatar="👩‍💼">
              <input type="text" placeholder="Search..." 
                style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; width: 300px; max-width: 100%;" />
            </ui-top-bar>
            
            <div style="padding: 40px 24px; min-height: 200px;">
              <h4 style="margin: 0 0 12px;">Application Dashboard</h4>
              <p style="color: #6b7280; margin: 0 0 16px;">Click on notification or message icons to see badges. Hover over user profile for menu.</p>
              <div id="actionLog" style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; font-family: monospace; font-size: 12px; color: #6b7280; min-height: 60px;">
                <div style="color: #9ca3af;">Click on action icons or menu items...</div>
              </div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        const topBar = document.getElementById('actionsTopBar');
        if (topBar) {
          const actionsWithHandlers = actions.map(action => ({
            ...action,
            onClick: () => {
              logAction('Clicked: ' + action.label);
            }
          }));

          const menuItemsWithHandlers = userMenuItems.map(item => ({
            ...item,
            onClick: item.divider ? undefined : () => {
              logAction('Selected: ' + item.label);
            }
          }));

          topBar.actions = actionsWithHandlers;
          topBar.userMenuItems = menuItemsWithHandlers;
        }
      }, 100);
    };

    window.logAction = function(message) {
      const log = document.getElementById('actionLog');
      if (log) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.style.color = '#059669';
        entry.style.marginBottom = '4px';
        entry.textContent = '[' + timestamp + '] ' + message;
        
        if (log.querySelector('[style*="color: #9ca3af"]')) {
          log.innerHTML = '';
        }
        
        log.insertBefore(entry, log.firstChild);
        
        while (log.children.length > 5) {
          log.removeChild(log.lastChild);
        }
      }
    };

    window.showTopBarThemes = function() {
      const container = document.getElementById('topBarDemoContainer');
      if (!container) return;

      const actions = [
        { id: 'notifications', icon: '🔔', label: 'Notifications', badge: '5' },
        { id: 'settings', icon: '⚙️', label: 'Settings' }
      ];

      const userMenuItems = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'divider', divider: true },
        { id: 'logout', label: 'Logout', icon: '🚪' }
      ];

      container.innerHTML = `
        <div class="demo-block">
          <h3>Top Bar Themes</h3>
          <p>Different color themes for various use cases.</p>
          
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
              <h4 style="margin: 0 0 12px;">Light Theme (Default)</h4>
              <div style="border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <ui-top-bar id="lightTopBar" 
                  company-name="Light Theme" 
                  company-logo="☀️"
                  user-name="User">
                  <span style="font-size: 14px; color: #6b7280;">Dashboard</span>
                </ui-top-bar>
              </div>
            </div>

            <div>
              <h4 style="margin: 0 0 12px;">Dark Theme</h4>
              <div style="border: 2px solid #374151; border-radius: 8px; overflow: hidden;">
                <ui-top-bar id="darkTopBar" 
                  company-name="Dark Theme" 
                  company-logo="🌙"
                  user-name="User"
                  background-color="#1f2937"
                  text-color="#f9fafb">
                  <span style="font-size: 14px; color: #d1d5db;">Dashboard</span>
                </ui-top-bar>
              </div>
            </div>

            <div>
              <h4 style="margin: 0 0 12px;">Brand Theme</h4>
              <div style="border: 2px solid #3b82f6; border-radius: 8px; overflow: hidden;">
                <ui-top-bar id="brandTopBar" 
                  company-name="Brand Theme" 
                  company-logo="🎨"
                  user-name="User"
                  background-color="#3b82f6"
                  text-color="#ffffff">
                  <span style="font-size: 14px; color: #e0f2fe;">Dashboard</span>
                </ui-top-bar>
              </div>
            </div>

            <div>
              <h4 style="margin: 0 0 12px;">Gradient Theme</h4>
              <div style="border: 2px solid #8b5cf6; border-radius: 8px; overflow: hidden;">
                <ui-top-bar id="gradientTopBar" 
                  company-name="Gradient Theme" 
                  company-logo="🌈"
                  user-name="User"
                  background-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  text-color="#ffffff"
                  style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                  <span style="font-size: 14px; color: #f3e8ff;">Dashboard</span>
                </ui-top-bar>
              </div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        ['lightTopBar', 'darkTopBar', 'brandTopBar', 'gradientTopBar'].forEach(id => {
          const topBar = document.getElementById(id);
          if (topBar) {
            topBar.actions = actions;
            topBar.userMenuItems = userMenuItems;
          }
        });
      }, 100);
    };

    window.showTopBarPlayground = function() {
      const container = document.getElementById('topBarDemoContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p>Customize the top bar properties in real-time.</p>
          
          <div style="display: grid; grid-template-columns: 350px 1fr; gap: 24px; margin-top: 20px;">
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; height: fit-content;">
              <h4 style="margin: 0 0 16px;">Settings</h4>
              
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span style="font-size: 13px; font-weight: 500;">Company Name:</span>
                  <input type="text" id="playCompanyName" value="My Company" oninput="updatePlaygroundTopBar()"
                    style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
                </label>
                
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span style="font-size: 13px; font-weight: 500;">Company Logo (Emoji):</span>
                  <input type="text" id="playCompanyLogo" value="🏢" oninput="updatePlaygroundTopBar()"
                    style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
                </label>
                
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span style="font-size: 13px; font-weight: 500;">User Name:</span>
                  <input type="text" id="playUserName" value="John Smith" oninput="updatePlaygroundTopBar()"
                    style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
                </label>
                
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span style="font-size: 13px; font-weight: 500;">User Avatar (Emoji):</span>
                  <input type="text" id="playUserAvatar" value="👤" oninput="updatePlaygroundTopBar()"
                    style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
                </label>
                
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span style="font-size: 13px; font-weight: 500;">Background Color:</span>
                  <input type="color" id="playBgColor" value="#ffffff" oninput="updatePlaygroundTopBar()"
                    style="width: 100%; height: 40px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                </label>
                
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span style="font-size: 13px; font-weight: 500;">Text Color:</span>
                  <input type="color" id="playTextColor" value="#111827" oninput="updatePlaygroundTopBar()"
                    style="width: 100%; height: 40px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                </label>
                
                <label style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                  <input type="checkbox" id="playShowShadow" checked onchange="updatePlaygroundTopBar()"
                    style="width: 16px; height: 16px; cursor: pointer;">
                  <span style="font-size: 13px; font-weight: 500;">Show Shadow</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 style="margin: 0 0 12px;">Preview:</h4>
              <div style="border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; min-height: 300px;">
                <div id="playgroundTopBarContainer"></div>
                <div style="padding: 24px;">
                  <h4 style="margin: 0 0 12px;">Page Content</h4>
                  <p style="color: #6b7280; margin: 0 0 16px;">This is sample page content below the top bar.</p>
                  <p style="color: #6b7280; margin: 0;">Try hovering over the user profile to see the menu dropdown.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        updatePlaygroundTopBar();
      }, 100);
    };

    window.updatePlaygroundTopBar = function() {
      const companyName = document.getElementById('playCompanyName')?.value || 'Company';
      const companyLogo = document.getElementById('playCompanyLogo')?.value || '🏢';
      const userName = document.getElementById('playUserName')?.value || 'User';
      const userAvatar = document.getElementById('playUserAvatar')?.value || '👤';
      const bgColor = document.getElementById('playBgColor')?.value || '#ffffff';
      const textColor = document.getElementById('playTextColor')?.value || '#111827';
      const showShadow = document.getElementById('playShowShadow')?.checked !== false;

      const container = document.getElementById('playgroundTopBarContainer');
      if (!container) return;

      const actions = [
        { id: 'search', icon: '🔍', label: 'Search' },
        { id: 'notifications', icon: '🔔', label: 'Notifications', badge: '3' },
        { id: 'help', icon: '❓', label: 'Help' }
      ];

      const userMenuItems = [
        { id: 'profile', label: 'My Profile', icon: '👤' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'preferences', label: 'Preferences', icon: '🎨' },
        { id: 'divider1', divider: true },
        { id: 'help', label: 'Help Center', icon: '❓' },
        { id: 'divider2', divider: true },
        { id: 'logout', label: 'Logout', icon: '🚪' }
      ];

      container.innerHTML = '';
      
      const topBar = document.createElement('ui-top-bar');
      topBar.setAttribute('company-name', companyName);
      topBar.setAttribute('company-logo', companyLogo);
      topBar.setAttribute('user-name', userName);
      topBar.setAttribute('user-avatar', userAvatar);
      topBar.setAttribute('background-color', bgColor);
      topBar.setAttribute('text-color', textColor);
      topBar.setAttribute('show-shadow', showShadow.toString());
      
      topBar.actions = actions;
      topBar.userMenuItems = userMenuItems;
      
      container.appendChild(topBar);
    };

    showBasicTopBar();
  }, 100);
}
