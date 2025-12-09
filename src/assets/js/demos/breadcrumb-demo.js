// Breadcrumb Demo
export function initBreadcrumbDemo() {
  const section = document.getElementById('breadcrumb');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🍞 Breadcrumb Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Navigation path indicators to show user location in hierarchy.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicBreadcrumb()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showIconBreadcrumb()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">With Icons</button>
      <button onclick="showSeparatorBreadcrumb()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Custom Separator</button>
      <button onclick="showSizesBreadcrumb()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showInteractiveBreadcrumb()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="breadcrumbDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicBreadcrumb = function() {
      const container = document.getElementById('breadcrumbDemoContainer');
      if (!container) return;
      
      const items = [
        { label: 'Home', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Data', active: true }
      ];
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Basic Breadcrumb</h3>
          <ui-breadcrumb id="basicBreadcrumb"></ui-breadcrumb>
        </div>
      `;
      
      setTimeout(() => {
        const breadcrumb = document.getElementById('basicBreadcrumb');
        if (breadcrumb) breadcrumb.items = items;
      }, 50);
    };

    window.showIconBreadcrumb = function() {
      const container = document.getElementById('breadcrumbDemoContainer');
      if (!container) return;
      
      const items = [
        { label: 'Home', icon: '🏠', href: '#' },
        { label: 'Documents', icon: '📁', href: '#' },
        { label: 'Projects', icon: '📊', href: '#' },
        { label: 'Report.pdf', icon: '📄', active: true }
      ];
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Breadcrumb with Icons</h3>
          <ui-breadcrumb id="iconBreadcrumb"></ui-breadcrumb>
        </div>
      `;
      
      setTimeout(() => {
        const breadcrumb = document.getElementById('iconBreadcrumb');
        if (breadcrumb) breadcrumb.items = items;
      }, 50);
    };

    window.showSeparatorBreadcrumb = function() {
      const container = document.getElementById('breadcrumbDemoContainer');
      if (!container) return;
      
      const items = [
        { label: 'Home', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Data', active: true }
      ];
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Custom Separators</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Arrow Separator</p>
              <ui-breadcrumb id="arrowBreadcrumb" separator="→"></ui-breadcrumb>
            </div>
            <div>
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Chevron Separator</p>
              <ui-breadcrumb id="chevronBreadcrumb" separator="›"></ui-breadcrumb>
            </div>
            <div>
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Dot Separator</p>
              <ui-breadcrumb id="dotBreadcrumb" separator="•"></ui-breadcrumb>
            </div>
          </div>
        </div>
      `;
      
      setTimeout(() => {
        ['arrowBreadcrumb', 'chevronBreadcrumb', 'dotBreadcrumb'].forEach(id => {
          const breadcrumb = document.getElementById(id);
          if (breadcrumb) breadcrumb.items = items;
        });
      }, 50);
    };

    window.showSizesBreadcrumb = function() {
      const container = document.getElementById('breadcrumbDemoContainer');
      if (!container) return;
      
      const items = [
        { label: 'Home', icon: '🏠', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Data', active: true }
      ];
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Different Sizes</h3>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
              <h4 style="margin: 0 0 8px;">Small</h4>
              <ui-breadcrumb id="smallBreadcrumb" size="sm"></ui-breadcrumb>
            </div>
            <div>
              <h4 style="margin: 0 0 8px;">Medium (Default)</h4>
              <ui-breadcrumb id="mediumBreadcrumb" size="md"></ui-breadcrumb>
            </div>
            <div>
              <h4 style="margin: 0 0 8px;">Large</h4>
              <ui-breadcrumb id="largeBreadcrumb" size="lg"></ui-breadcrumb>
            </div>
          </div>
        </div>
      `;
      
      setTimeout(() => {
        ['smallBreadcrumb', 'mediumBreadcrumb', 'largeBreadcrumb'].forEach(id => {
          const breadcrumb = document.getElementById(id);
          if (breadcrumb) breadcrumb.items = items;
        });
      }, 50);
    };

    window.showInteractiveBreadcrumb = function() {
      const container = document.getElementById('breadcrumbDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h3>🎮 Interactive Playground</h3>
          <div style="display: flex; gap: 30px; flex-wrap: wrap; margin-top: 20px;">
            <div style="flex: 1; min-width: 300px;">
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Separator:</label>
                  <input type="text" id="breadcrumbSeparator" value="/" onchange="updateInteractiveBreadcrumb()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
                  <select id="breadcrumbSize" onchange="updateInteractiveBreadcrumb()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                    <option value="sm">Small</option>
                    <option value="md" selected>Medium</option>
                    <option value="lg">Large</option>
                  </select>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" id="breadcrumbShowHome" onchange="updateInteractiveBreadcrumb()" style="cursor: pointer;">
                  <label for="breadcrumbShowHome" style="cursor: pointer;">Show Home Icon</label>
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Items (JSON):</label>
                  <textarea id="breadcrumbItems" onchange="updateInteractiveBreadcrumb()" 
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 150px;">[
  {"label": "Home", "icon": "🏠", "href": "#"},
  {"label": "Products", "href": "#"},
  {"label": "Electronics", "href": "#"},
  {"label": "Laptops", "active": true}
]</textarea>
                </div>
              </div>
            </div>
            
            <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <h4 style="margin-top: 0;">Preview:</h4>
              <div id="interactiveBreadcrumbContainer"></div>
            </div>
          </div>
        </div>
      `;
      
      updateInteractiveBreadcrumb();
    };

    window.updateInteractiveBreadcrumb = function() {
      const separator = document.getElementById('breadcrumbSeparator')?.value || '/';
      const size = document.getElementById('breadcrumbSize')?.value || 'md';
      const showHome = document.getElementById('breadcrumbShowHome')?.checked || false;
      const itemsText = document.getElementById('breadcrumbItems')?.value;
      
      const container = document.getElementById('interactiveBreadcrumbContainer');
      if (!container) return;
      
      container.innerHTML = '';
      
      try {
        const items = JSON.parse(itemsText);
        const breadcrumb = document.createElement('ui-breadcrumb');
        breadcrumb.setAttribute('separator', separator);
        breadcrumb.setAttribute('size', size);
        if (showHome) breadcrumb.setAttribute('show-home', 'true');
        breadcrumb.items = items;
        container.appendChild(breadcrumb);
      } catch (error) {
        container.innerHTML = `<p style="color: #ef4444;">Invalid JSON: ${error.message}</p>`;
      }
    };

    showBasicBreadcrumb();
  }, 100);
}
