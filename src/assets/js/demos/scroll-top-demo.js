// Component Demo Functions
export function initScrollTopDemo() {
  const section = document.getElementById('scroll-top');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">⬆️ Scroll Top Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Button that appears when scrolling and returns to the top when clicked.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showScrollTopDemo()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showScrollTopPositions()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Positions</button>
      <button onclick="showScrollTopSizes()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showScrollTopThemes()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Themes</button>
      <button onclick="showInteractiveScrollTop()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="scrollTopDemoContainer" style="margin-top: 20px;"></div>
  `;

  // Initialize with basic demo
  setTimeout(() => {
    // Scroll Top Demo Functions
    window.showScrollTopDemo = function() {
    const container = document.getElementById('scrollTopDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div id="scrollDemo1" style="position: relative; height: 400px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
        <h3>Scroll down to see the Scroll Top button</h3>
        ${Array.from({length: 50}, (_, i) => `<p>Content line ${i + 1} - Scroll down to see the button appear...</p>`).join('')}
      </div>
      <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">Scroll down in the box above to see the button</p>
    `;
    setTimeout(() => {
      const scrollBox = document.getElementById('scrollDemo1');
      if (scrollBox) {
        const btn = document.createElement('ui-scroll-top');
        btn.setAttribute('threshold', '100');
        btn.setAttribute('target', '#scrollDemo1');
        scrollBox.appendChild(btn);
      }
    }, 100);
  };

  window.showScrollTopPositions = function() {
    const container = document.getElementById('scrollTopDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
        <div id="scrollRight" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Bottom Right</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
        <div id="scrollLeft" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Bottom Left</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
        <div id="scrollCenter" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Bottom Center</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
      </div>
    `;
    setTimeout(() => {
      const boxes = [
        {id: 'scrollRight', position: 'bottom-right'},
        {id: 'scrollLeft', position: 'bottom-left'},
        {id: 'scrollCenter', position: 'bottom-center'}
      ];
      boxes.forEach(({id, position}) => {
        const box = document.getElementById(id);
        if (box) {
          const btn = document.createElement('ui-scroll-top');
          btn.setAttribute('position', position);
          btn.setAttribute('threshold', '50');
          btn.setAttribute('target', `#${id}`);
          box.appendChild(btn);
        }
      });
    }, 100);
  };

  window.showScrollTopSizes = function() {
    const container = document.getElementById('scrollTopDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
        <div id="scrollSm" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Small</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
        <div id="scrollMd" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Medium</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
        <div id="scrollLg" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Large</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
      </div>
    `;
    setTimeout(() => {
      const boxes = [
        {id: 'scrollSm', size: 'sm'},
        {id: 'scrollMd', size: 'md'},
        {id: 'scrollLg', size: 'lg'}
      ];
      boxes.forEach(({id, size}) => {
        const box = document.getElementById(id);
        if (box) {
          const btn = document.createElement('ui-scroll-top');
          btn.setAttribute('size', size);
          btn.setAttribute('threshold', '50');
          btn.setAttribute('target', `#${id}`);
          box.appendChild(btn);
        }
      });
    }, 100);
  };

  window.showScrollTopColors = function() {
    const container = document.getElementById('scrollTopDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
        <div id="scrollPrimary" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Primary</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
        <div id="scrollSecondary" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Secondary</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
        <div id="scrollDark" style="position: relative; height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
          <h4>Dark</h4>
          ${Array.from({length: 30}, (_, i) => `<p>Line ${i + 1}</p>`).join('')}
        </div>
      </div>
    `;
    setTimeout(() => {
      const boxes = [
        {id: 'scrollPrimary', color: 'primary'},
        {id: 'scrollSecondary', color: 'secondary'},
        {id: 'scrollDark', color: 'dark'}
      ];
      boxes.forEach(({id, color}) => {
        const box = document.getElementById(id);
        if (box) {
          const btn = document.createElement('ui-scroll-top');
          btn.setAttribute('color', color);
          btn.setAttribute('threshold', '50');
          btn.setAttribute('target', `#${id}`);
          box.appendChild(btn);
        }
      });
    }, 100);
  };

  showScrollTopDemo();
  }, 100);

  // Interactive Playground
  window.showInteractiveScrollTop = function() {
    const container = document.getElementById('scrollTopDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 250px;">
            <h3>🎮 Interactive Playground</h3>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Position:</label>
                <select id="scrollTopPosition" onchange="updateInteractiveScrollTop()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="bottom-right" selected>Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-center">Bottom Center</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
                <select id="scrollTopSize" onchange="updateInteractiveScrollTop()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Color:</label>
                <select id="scrollTopColor" onchange="updateInteractiveScrollTop()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="primary" selected>Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Icon:</label>
                <input type="text" id="scrollTopIcon" value="↑" onchange="updateInteractiveScrollTop()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Threshold (px):</label>
                <input type="number" id="scrollTopThreshold" value="100" min="0" max="500" onchange="updateInteractiveScrollTop()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Behavior:</label>
                <select id="scrollTopBehavior" onchange="updateInteractiveScrollTop()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="smooth" selected>Smooth</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style="flex: 1; min-width: 250px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h4 style="margin-top: 0;">Preview (Scroll down):</h4>
            <div id="interactiveScrollTopContainer" style="position: relative; height: 400px; overflow-y: auto; border: 1px solid #d1d5db; border-radius: 8px; padding: 20px; background-color: white;">
              ${Array.from({length: 50}, (_, i) => `<p>Content line ${i + 1} - Scroll down to see the button appear...</p>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    updateInteractiveScrollTop();
  };

  window.updateInteractiveScrollTop = function() {
    const position = document.getElementById('scrollTopPosition').value;
    const size = document.getElementById('scrollTopSize').value;
    const color = document.getElementById('scrollTopColor').value;
    const icon = document.getElementById('scrollTopIcon').value;
    const threshold = document.getElementById('scrollTopThreshold').value;
    const behavior = document.getElementById('scrollTopBehavior').value;
    
    const container = document.getElementById('interactiveScrollTopContainer');
    if (!container) return;
    
    // Remove existing scroll-top component
    const existingBtn = container.querySelector('ui-scroll-top');
    if (existingBtn) {
      existingBtn.remove();
    }
    
    // Add new scroll-top component
    const btn = document.createElement('ui-scroll-top');
    btn.setAttribute('position', position);
    btn.setAttribute('size', size);
    btn.setAttribute('color', color);
    btn.setAttribute('icon', icon);
    btn.setAttribute('threshold', threshold);
    btn.setAttribute('behavior', behavior);
    btn.setAttribute('target', '#interactiveScrollTopContainer');
    container.appendChild(btn);
  };
}
