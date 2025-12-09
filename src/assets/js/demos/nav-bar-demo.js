// Navigation Bar Demo
export function initNavBarDemo() {
  const section = document.getElementById('nav-bar');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">Navigation Bar Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    
    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicNavBar()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showInteractiveNavBar()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>
    
    <div id="navBarDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicNavBar = function() {
      const container = document.getElementById('navBarDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="background-color: white; padding: 20px; border-radius: 8px;">
          <h4>Basic Navigation</h4>
          <div style="margin-top: 20px;">
            <button onclick="toggleNav()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Toggle Navigation</button>
            <button onclick="expandNav()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Expand</button>
            <button onclick="collapseNav()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Collapse</button>
          </div>
        </div>
      `;
    };
    
    showBasicNavBar();
  }, 100);

  // Navigation functions
  window.toggleNav = () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.toggle();
  };

  window.expandNav = () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.expand();
  };

  window.collapseNav = () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.collapse();
  };

  window.showInteractiveNavBar = function() {
    const container = document.getElementById('navBarDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">Configure navigation bar properties and see the results in real-time</p>
        
        <div style="display: flex; flex-direction: column; gap: 15px; max-width: 600px;">
          <div>
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">App Title:</label>
            <input type="text" id="navAppTitle" value="My Application" onchange="updateInteractiveNavBar()"
              style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
          </div>
          
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" id="navShowHamburger" checked onchange="updateInteractiveNavBar()" style="cursor: pointer;">
            <label for="navShowHamburger" style="cursor: pointer;">Show Hamburger Menu</label>
          </div>
          
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" id="navShowSearch" onchange="updateInteractiveNavBar()" style="cursor: pointer;">
            <label for="navShowSearch" style="cursor: pointer;">Show Search</label>
          </div>
          
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" id="navCollapsed" checked onchange="updateInteractiveNavBar()" style="cursor: pointer;">
            <label for="navCollapsed" style="cursor: pointer;">Initially Collapsed</label>
          </div>
          
          <div style="margin-top: 20px;">
            <button onclick="toggleNav()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Toggle</button>
            <button onclick="expandNav()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Expand</button>
            <button onclick="collapseNav()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Collapse</button>
          </div>
          
          <div id="navOutput" style="margin-top: 10px; padding: 10px; background-color: #f0f9ff; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
        </div>
      </div>
    `;
    
    updateInteractiveNavBar();
  };

  window.updateInteractiveNavBar = function() {
    const appTitle = document.getElementById('navAppTitle').value;
    const showHamburger = document.getElementById('navShowHamburger').checked;
    const showSearch = document.getElementById('navShowSearch').checked;
    const collapsed = document.getElementById('navCollapsed').checked;
    
    const outputDiv = document.getElementById('navOutput');
    if (outputDiv) {
      outputDiv.style.display = 'block';
      outputDiv.textContent = `Config: title="${appTitle}", hamburger=${showHamburger}, search=${showSearch}, collapsed=${collapsed}`;
    }
  };
}
