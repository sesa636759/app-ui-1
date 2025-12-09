// Pagination Demo Functions
export function initPaginationDemo() {
  const section = document.getElementById('pagination');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📄 Pagination Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicPagination()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showCompactPagination()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Compact</button>
      <button onclick="showAdvancedPagination()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Advanced</button>
      <button onclick="showDropdownPagination()" style="padding: 8px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">Dropdown</button>
      <button onclick="showInputPagination()" style="padding: 8px 16px; background-color: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;">Input</button>
      <button onclick="showPaginationSizes()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showIconPagination()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Icon Based</button>
      <button onclick="showInteractivePagination()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="paginationDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicPagination = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div class="demo-block">
          <h3>Basic Pagination</h3>
          <div style="display: flex; justify-content: center;">
            <ui-pagination id="basicPagination" total-items="100" items-per-page="10" current-page="1"></ui-pagination>
          </div>
        </div>
      `;
      setupPaginationEvents();
    };

    window.showCompactPagination = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div class="demo-block">
          <h3>Compact Style</h3>
          <div style="display: flex; justify-content: center;">
            <ui-pagination type="compact" total-items="50" items-per-page="5" current-page="3"></ui-pagination>
          </div>
        </div>
      `;
      setupPaginationEvents();
    };

    window.showAdvancedPagination = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div class="demo-block">
          <h3>With Page Size Selector & Total Count</h3>
          <div style="display: flex; justify-content: center;">
            <ui-pagination total-items="200" items-per-page="20" show-page-size="true" show-total="true"></ui-pagination>
          </div>
        </div>
        <div class="demo-block">
          <h3>With Jump To Page</h3>
          <div style="display: flex; justify-content: center;">
            <ui-pagination total-items="500" items-per-page="25" show-jump-to="true" show-total="true"></ui-pagination>
          </div>
        </div>
      `;
      setupPaginationEvents();
    };

    window.showDropdownPagination = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div class="demo-block">
          <h3>Dropdown Pagination</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Select page from dropdown menu with Previous/Next navigation</p>
          
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="dropdown" total-items="100" items-per-page="10" current-page="3"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">Compact Dropdown (Minimal)</h4>
          <p style="color: #6b7280; margin-bottom: 8px; font-size: 14px;">Only dropdown selector, no navigation buttons</p>
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="dropdown" compact="true" total-items="100" items-per-page="10" current-page="3"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">With Total Count</h4>
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="dropdown" total-items="250" items-per-page="25" show-total="true" current-page="5"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">Icon-Only Dropdown</h4>
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="dropdown" icon-only="true" total-items="150" items-per-page="15" current-page="2"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">Different Sizes</h4>
          <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Small</p>
              <ui-pagination type="dropdown" size="sm" total-items="80" items-per-page="10" current-page="3"></ui-pagination>
            </div>
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Medium</p>
              <ui-pagination type="dropdown" size="md" total-items="80" items-per-page="10" current-page="3"></ui-pagination>
            </div>
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Large</p>
              <ui-pagination type="dropdown" size="lg" total-items="80" items-per-page="10" current-page="3"></ui-pagination>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 12px; background-color: #f0fdf4; border-radius: 6px;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              💡 Dropdown pagination is ideal when you need quick access to any page. Use <strong>compact</strong> mode for minimal space usage.
            </p>
          </div>
        </div>
      `;
      setupPaginationEvents();
    };

    window.showInputPagination = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div class="demo-block">
          <h3>Input Pagination</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Type page number directly or use navigation buttons</p>
          
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="input" total-items="100" items-per-page="10" current-page="5"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">Compact Input (Minimal)</h4>
          <p style="color: #6b7280; margin-bottom: 8px; font-size: 14px;">Only input field and Go button, with validation</p>
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="input" compact="true" total-items="100" items-per-page="10" current-page="5"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">With Total Count</h4>
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="input" total-items="500" items-per-page="20" show-total="true" current-page="10"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">Icon-Only Input</h4>
          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            <ui-pagination type="input" icon-only="true" total-items="200" items-per-page="25" current-page="3"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">Different Sizes</h4>
          <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Small</p>
              <ui-pagination type="input" size="sm" total-items="120" items-per-page="10" current-page="4"></ui-pagination>
            </div>
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Medium</p>
              <ui-pagination type="input" size="md" total-items="120" items-per-page="10" current-page="4"></ui-pagination>
            </div>
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Large</p>
              <ui-pagination type="input" size="lg" total-items="120" items-per-page="10" current-page="4"></ui-pagination>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 12px; background-color: #eff6ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 Input pagination validates your entry - try entering invalid values (text, negative numbers, or numbers beyond range) to see error messages. Press Enter or click Go to navigate.
            </p>
          </div>
        </div>
      `;
      setupPaginationEvents();
    };

    window.showPaginationSizes = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div class="demo-block">
          <h3>Different Sizes</h3>
          <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Small</p>
              <ui-pagination size="sm" total-items="50" items-per-page="10"></ui-pagination>
            </div>
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Medium</p>
              <ui-pagination size="md" total-items="50" items-per-page="10"></ui-pagination>
            </div>
            <div>
              <p style="text-align: center; margin-bottom: 8px; color: #6b7280;">Large</p>
              <ui-pagination size="lg" total-items="50" items-per-page="10"></ui-pagination>
            </div>
          </div>
        </div>
        <div class="demo-block">
          <h3>Outlined Variant</h3>
          <div style="display: flex; justify-content: center;">
            <ui-pagination variant="outlined" total-items="80" items-per-page="10" current-page="2"></ui-pagination>
          </div>
        </div>
      `;
      setupPaginationEvents();
    };

    window.showIconPagination = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div class="demo-block">
          <h3>Icon-Only Pagination</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Navigation buttons with icons only (no text labels)</p>
          <div style="display: flex; justify-content: center; margin-bottom: 20px;">
            <ui-pagination icon-only="true" total-items="100" items-per-page="10" current-page="3"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">With Dropdown Page Size Selector</h4>
          <div style="display: flex; justify-content: center; margin-bottom: 20px;">
            <ui-pagination icon-only="true" total-items="150" items-per-page="15" show-page-size="true" current-page="2"></ui-pagination>
          </div>
          
          <h4 style="margin-top: 24px;">With Page Input Jump</h4>
          <div style="display: flex; justify-content: center;">
            <ui-pagination icon-only="true" total-items="200" items-per-page="20" show-jump-to="true" show-total="true" current-page="5"></ui-pagination>
          </div>
          
          <div style="margin-top: 20px; padding: 12px; background-color: #f0f9ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 Icon-only mode is perfect for compact layouts where space is limited.
            </p>
          </div>
        </div>
      `;
      setupPaginationEvents();
    };

    window.showInteractivePagination = function() {
      const container = document.getElementById('paginationDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Customize the pagination properties and see changes in real-time!</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Total Items:</span>
                <input type="number" id="paginationTotalItems" value="100" min="1" oninput="updateInteractivePagination()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Items Per Page:</span>
                <input type="number" id="paginationItemsPerPage" value="10" min="1" oninput="updateInteractivePagination()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Max Visible Pages:</span>
                <input type="number" id="paginationMaxVisible" value="5" min="1" max="10" oninput="updateInteractivePagination()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Type:</span>
                <select id="paginationType" oninput="updateInteractivePagination()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="basic" selected>Basic</option>
                  <option value="compact">Compact</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Size:</span>
                <select id="paginationSize" oninput="updateInteractivePagination()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Variant:</span>
                <select id="paginationVariant" oninput="updateInteractivePagination()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="default" selected>Default</option>
                  <option value="outlined">Outlined</option>
                </select>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="paginationShowFirstLast" checked onchange="updateInteractivePagination()" style="cursor: pointer;">
                <span>Show First/Last</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="paginationShowPageSize" onchange="updateInteractivePagination()" style="cursor: pointer;">
                <span>Show Page Size</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="paginationShowTotal" onchange="updateInteractivePagination()" style="cursor: pointer;">
                <span>Show Total</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="paginationShowJumpTo" onchange="updateInteractivePagination()" style="cursor: pointer;">
                <span>Show Jump To</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="paginationIconOnly" onchange="updateInteractivePagination()" style="cursor: pointer;">
                <span>Icon Only</span>
              </label>
            </div>
            
            <div style="margin-top: 12px; padding: 12px; background-color: #eff6ff; border-radius: 6px; border: 1px solid #bfdbfe;">
              <p style="margin: 0; font-size: 13px; color: #1e40af;">
                💡 <strong>Tip:</strong> Changes apply instantly! Try different combinations to see how pagination adapts.
              </p>
            </div>
          </div>
          
          <div style="display: flex; justify-content: center; align-items: center; padding: 40px; background-color: #f9fafb; border-radius: 8px;">
            <div id="interactivePaginationContainer"></div>
          </div>
        </div>
      `;

      setTimeout(() => {
        updateInteractivePagination();
      }, 50);
    };

    window.updateInteractivePagination = function() {
      const totalItems = parseInt(document.getElementById('paginationTotalItems')?.value) || 100;
      const itemsPerPage = parseInt(document.getElementById('paginationItemsPerPage')?.value) || 10;
      const maxVisible = parseInt(document.getElementById('paginationMaxVisible')?.value) || 5;
      const type = document.getElementById('paginationType')?.value || 'basic';
      const size = document.getElementById('paginationSize')?.value || 'md';
      const variant = document.getElementById('paginationVariant')?.value || 'default';
      const showFirstLast = document.getElementById('paginationShowFirstLast')?.checked !== false;
      const showPageSize = document.getElementById('paginationShowPageSize')?.checked || false;
      const showTotal = document.getElementById('paginationShowTotal')?.checked || false;
      const showJumpTo = document.getElementById('paginationShowJumpTo')?.checked || false;
      const iconOnly = document.getElementById('paginationIconOnly')?.checked || false;
      
      const paginationContainer = document.getElementById('interactivePaginationContainer');
      if (paginationContainer) {
        paginationContainer.innerHTML = `
          <ui-pagination 
            id="interactivePagination"
            total-items="${totalItems}"
            items-per-page="${itemsPerPage}"
            max-visible-pages="${maxVisible}"
            type="${type}"
            size="${size}"
            variant="${variant}"
            ${showFirstLast ? 'show-first-last="true"' : 'show-first-last="false"'}
            ${showPageSize ? 'show-page-size="true"' : ''}
            ${showTotal ? 'show-total="true"' : ''}
            ${showJumpTo ? 'show-jump-to="true"' : ''}
            ${iconOnly ? 'icon-only="true"' : ''}
            current-page="1">
          </ui-pagination>
        `;
        
        setTimeout(() => {
          const pagination = document.getElementById('interactivePagination');
          if (pagination) {
            pagination.addEventListener('pageChange', (event) => {
              console.log('Page changed:', event.detail);
            });
          }
        }, 100);
      }
    };

    function setupPaginationEvents() {
      setTimeout(() => {
        const paginations = document.querySelectorAll('ui-pagination');
        paginations.forEach(pagination => {
          pagination.addEventListener('pageChange', (event) => {
            console.log('Page changed:', event.detail);
          });
        });
      }, 100);
    }

    showBasicPagination();
  }, 100);
}

