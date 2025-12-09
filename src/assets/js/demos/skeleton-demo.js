// Skeleton Demo Functions
export function initSkeletonDemo() {
  const section = document.getElementById('skeleton');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">💀 Skeleton Loader Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Loading placeholders with various shapes and animations.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicSkeleton()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showSkeletonShapes()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Shapes</button>
      <button onclick="showSkeletonSizes()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showSkeletonAnimations()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Animations</button>
      <button onclick="showSkeletonLayouts()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Layouts</button>
      <button onclick="showInteractiveSkeleton()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="skeletonDemoContainer" style="margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;"></div>
  `;

  setTimeout(() => {
    window.showBasicSkeleton = function() {
      const container = document.getElementById('skeletonDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <skeleton-loader width="100%" height="20px"></skeleton-loader>
          <skeleton-loader width="80%" height="20px"></skeleton-loader>
          <skeleton-loader width="60%" height="20px"></skeleton-loader>
        </div>
      `;
    };

    window.showSkeletonShapes = function() {
      const container = document.getElementById('skeletonDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 30px;">
          <div style="text-align: center;">
            <skeleton-loader shape="rectangle" width="120px" height="80px"></skeleton-loader>
            <p style="margin-top: 8px; font-size: 14px; color: #6b7280;">Rectangle</p>
          </div>
          <div style="text-align: center;">
            <skeleton-loader shape="circle" width="80px" height="80px"></skeleton-loader>
            <p style="margin-top: 8px; font-size: 14px; color: #6b7280;">Circle</p>
          </div>
          <div style="text-align: center;">
            <skeleton-loader shape="square" width="80px" height="80px"></skeleton-loader>
            <p style="margin-top: 8px; font-size: 14px; color: #6b7280;">Square</p>
          </div>
          <div style="text-align: center;">
            <skeleton-loader shape="oval" width="120px" height="80px"></skeleton-loader>
            <p style="margin-top: 8px; font-size: 14px; color: #6b7280;">Oval</p>
          </div>
          <div style="text-align: center;">
            <skeleton-loader shape="rounded-square" width="80px" height="80px" border-radius="12px"></skeleton-loader>
            <p style="margin-top: 8px; font-size: 14px; color: #6b7280;">Rounded Square</p>
          </div>
          <div style="text-align: center;">
            <skeleton-loader shape="rounded-rectangle" width="120px" height="80px" border-radius="12px"></skeleton-loader>
            <p style="margin-top: 8px; font-size: 14px; color: #6b7280;">Rounded Rectangle</p>
          </div>
        </div>
      `;
    };

    window.showSkeletonSizes = function() {
      const container = document.getElementById('skeletonDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <h4>Small</h4>
            <skeleton-loader size="sm" width="200px"></skeleton-loader>
          </div>
          <div>
            <h4>Medium</h4>
            <skeleton-loader size="md" width="200px"></skeleton-loader>
          </div>
          <div>
            <h4>Large</h4>
            <skeleton-loader size="lg" width="200px"></skeleton-loader>
          </div>
        </div>
      `;
    };

    window.showSkeletonAnimations = function() {
      const container = document.getElementById('skeletonDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <h4>Pulse Animation</h4>
            <skeleton-loader animation-type="pulse" width="300px" height="40px"></skeleton-loader>
          </div>
          <div>
            <h4>Wave Animation</h4>
            <skeleton-loader animation-type="wave" width="300px" height="40px"></skeleton-loader>
          </div>
          <div>
            <h4>No Animation</h4>
            <skeleton-loader animated="false" width="300px" height="40px"></skeleton-loader>
          </div>
        </div>
      `;
    };

    window.showSkeletonLayouts = function() {
      const container = document.getElementById('skeletonDemoContainer');
      if (!container) return;
      container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          <!-- Card Skeleton -->
          <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <skeleton-loader shape="rectangle" width="100%" height="160px" border-radius="8px"></skeleton-loader>
            <skeleton-loader width="60%" height="24px" style="margin-top: 12px;"></skeleton-loader>
            <skeleton-loader width="100%" height="16px" style="margin-top: 8px;"></skeleton-loader>
            <skeleton-loader width="80%" height="16px" style="margin-top: 4px;"></skeleton-loader>
          </div>

          <!-- Profile Skeleton -->
          <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <div style="display: flex; gap: 12px;">
              <skeleton-loader shape="circle" width="60px" height="60px"></skeleton-loader>
              <div style="flex: 1;">
                <skeleton-loader width="120px" height="20px"></skeleton-loader>
                <skeleton-loader width="160px" height="16px" style="margin-top: 8px;"></skeleton-loader>
              </div>
            </div>
            <skeleton-loader width="100%" height="16px" style="margin-top: 16px;"></skeleton-loader>
            <skeleton-loader width="90%" height="16px" style="margin-top: 4px;"></skeleton-loader>
          </div>

          <!-- List Skeleton -->
          <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <div style="display: flex; gap: 12px; margin-bottom: 12px;">
              <skeleton-loader shape="circle" width="40px" height="40px"></skeleton-loader>
              <div style="flex: 1;">
                <skeleton-loader width="80%" height="16px"></skeleton-loader>
                <skeleton-loader width="60%" height="12px" style="margin-top: 4px;"></skeleton-loader>
              </div>
            </div>
            <div style="display: flex; gap: 12px; margin-bottom: 12px;">
              <skeleton-loader shape="circle" width="40px" height="40px"></skeleton-loader>
              <div style="flex: 1;">
                <skeleton-loader width="70%" height="16px"></skeleton-loader>
                <skeleton-loader width="50%" height="12px" style="margin-top: 4px;"></skeleton-loader>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    window.showInteractiveSkeleton = function() {
      const container = document.getElementById('skeletonDemoContainer');
      if (!container) return;
      
      container.style.backgroundColor = 'white';
      container.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Customize the skeleton loader properties and see changes in real-time!</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Shape:</span>
                <select id="skeletonShape" oninput="updateInteractiveSkeleton()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="rectangle" selected>Rectangle</option>
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                  <option value="oval">Oval</option>
                  <option value="rounded-square">Rounded Square</option>
                  <option value="rounded-rectangle">Rounded Rectangle</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Size:</span>
                <select id="skeletonSize" oninput="updateInteractiveSkeleton()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Width:</span>
                <input type="text" id="skeletonWidth" value="200px" oninput="updateInteractiveSkeleton()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Height:</span>
                <input type="text" id="skeletonHeight" value="100px" oninput="updateInteractiveSkeleton()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Border Radius:</span>
                <input type="text" id="skeletonBorderRadius" value="8px" oninput="updateInteractiveSkeleton()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Animation Type:</span>
                <select id="skeletonAnimationType" oninput="updateInteractiveSkeleton()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="pulse" selected>Pulse</option>
                  <option value="wave">Wave</option>
                </select>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="skeletonAnimated" checked onchange="updateInteractiveSkeleton()" style="cursor: pointer;">
                <span>Animated</span>
              </label>
            </div>
            
            <div style="margin-top: 12px; padding: 12px; background-color: #eff6ff; border-radius: 6px; border: 1px solid #bfdbfe;">
              <p style="margin: 0; font-size: 13px; color: #1e40af;">
                💡 <strong>Tip:</strong> Changes apply instantly as you type or select options!
              </p>
            </div>
          </div>
          
          <div style="display: flex; justify-content: center; align-items: center; padding: 40px; background-color: white; border-radius: 8px; border: 1px solid #e5e7eb;">
            <div id="interactiveSkeletonContainer"></div>
          </div>
        </div>
      `;

      setTimeout(() => {
        updateInteractiveSkeleton();
      }, 50);
    };

    window.updateInteractiveSkeleton = function() {
      const shape = document.getElementById('skeletonShape')?.value || 'rectangle';
      const size = document.getElementById('skeletonSize')?.value || 'md';
      const width = document.getElementById('skeletonWidth')?.value || '200px';
      const height = document.getElementById('skeletonHeight')?.value || '100px';
      const borderRadius = document.getElementById('skeletonBorderRadius')?.value || '8px';
      const animationType = document.getElementById('skeletonAnimationType')?.value || 'pulse';
      const animated = document.getElementById('skeletonAnimated')?.checked !== false;
      
      const skeletonContainer = document.getElementById('interactiveSkeletonContainer');
      if (skeletonContainer) {
        skeletonContainer.innerHTML = `
          <skeleton-loader 
            shape="${shape}"
            size="${size}"
            width="${width}"
            height="${height}"
            border-radius="${borderRadius}"
            animation-type="${animationType}"
            ${animated ? 'animated="true"' : 'animated="false"'}>
          </skeleton-loader>
        `;
      }
    };

    showBasicSkeleton();
  }, 100);
}

