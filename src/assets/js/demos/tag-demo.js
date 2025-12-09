// Component Demo Functions
export function initTagDemo() {
  const section = document.getElementById('tag');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🏷 Tag Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Content labels with different colors, variants, and icons.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicTags()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showTagVariants()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Variants</button>
      <button onclick="showTagColors()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Colors</button>
      <button onclick="showTagWithIcons()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">With Icons</button>
      <button onclick="showTagWithAvatars()" style="padding: 8px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">With Avatars</button>
      <button onclick="showTagAnimations()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Animations</button>
      <button onclick="showRemovableTags()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Removable</button>
      <button onclick="showInteractiveTag()" style="padding: 8px 16px; background-color: #a855f7; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="tagDemoContainer" style="margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;"></div>
  `;

  // Initialize with basic tags
  setTimeout(() => showBasicTags(), 100);

  // Tag Demo Functions
  window.showBasicTags = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <ui-tag label="JavaScript"></ui-tag>
        <ui-tag label="TypeScript" color="primary"></ui-tag>
        <ui-tag label="React" color="info"></ui-tag>
        <ui-tag label="Vue" color="success"></ui-tag>
        <ui-tag label="Angular" color="danger"></ui-tag>
      </div>
    `;
  };

  window.showTagVariants = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4>Filled (Default)</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-tag label="Filled" variant="filled" color="primary"></ui-tag>
            <ui-tag label="Success" variant="filled" color="success"></ui-tag>
            <ui-tag label="Danger" variant="filled" color="danger"></ui-tag>
          </div>
        </div>
        <div>
          <h4>Outlined</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-tag label="Outlined" variant="outlined" color="primary"></ui-tag>
            <ui-tag label="Success" variant="outlined" color="success"></ui-tag>
            <ui-tag label="Danger" variant="outlined" color="danger"></ui-tag>
          </div>
        </div>
        <div>
          <h4>Light</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ui-tag label="Light" variant="light" color="primary"></ui-tag>
            <ui-tag label="Success" variant="light" color="success"></ui-tag>
            <ui-tag label="Danger" variant="light" color="danger"></ui-tag>
          </div>
        </div>
      </div>
    `;
  };

  window.showTagColors = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <ui-tag label="Default" color="default"></ui-tag>
        <ui-tag label="Primary" color="primary"></ui-tag>
        <ui-tag label="Secondary" color="secondary"></ui-tag>
        <ui-tag label="Success" color="success"></ui-tag>
        <ui-tag label="Danger" color="danger"></ui-tag>
        <ui-tag label="Warning" color="warning"></ui-tag>
        <ui-tag label="Info" color="info"></ui-tag>
      </div>
    `;
  };

  window.showTagSizes = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <ui-tag label="Small" size="sm" color="primary"></ui-tag>
        <ui-tag label="Medium" size="md" color="primary"></ui-tag>
        <ui-tag label="Large" size="lg" color="primary"></ui-tag>
      </div>
    `;
  };

  window.showRemovableTags = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <ui-tag label="JavaScript" removable="true" icon="🟨" color="warning"></ui-tag>
        <ui-tag label="React" removable="true" icon="⚛️" color="info" rounded="true"></ui-tag>
        <ui-tag label="TypeScript" removable="true" icon="🔷" color="primary"></ui-tag>
        <ui-tag label="Node.js" removable="true" icon="🟢" color="success" rounded="true"></ui-tag>
      </div>
      <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">Click the × to remove tags</p>
    `;
  };

  window.showTagWithIcons = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <ui-tag label="Star" icon="⭐" color="warning"></ui-tag>
        <ui-tag label="Check" icon="✓" color="success"></ui-tag>
        <ui-tag label="Heart" icon="❤️" color="danger" rounded="true"></ui-tag>
        <ui-tag label="User" icon="👤" color="primary"></ui-tag>
        <ui-tag label="React" icon="⚛️" color="info" rounded="true"></ui-tag>
        <ui-tag label="Vue" icon="💚" color="success" rounded="true"></ui-tag>
      </div>
    `;
  };

  window.showInteractiveTag = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the tag properties and see changes in real-time!</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
          <h4 style="margin: 0 0 16px;">Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Label:</span>
              <input type="text" id="tagLabel" value="Interactive Tag" oninput="updateInteractiveTag()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Icon (emoji):</span>
              <input type="text" id="tagIcon" value="⭐" placeholder="Leave empty for none" oninput="updateInteractiveTag()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Image URL:</span>
              <input type="text" id="tagImage" value="" placeholder="Image URL" oninput="updateInteractiveTag()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>User Avatar URL:</span>
              <input type="text" id="tagAvatar" value="" placeholder="Avatar URL (circular)" oninput="updateInteractiveTag()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Variant:</span>
              <select id="tagVariant" oninput="updateInteractiveTag()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="filled" selected>Filled</option>
                <option value="outlined">Outlined</option>
                <option value="light">Light</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Color:</span>
              <select id="tagColor" oninput="updateInteractiveTag()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="default">Default</option>
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
              <select id="tagSize" oninput="updateInteractiveTag()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="sm">Small</option>
                <option value="md" selected>Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Animation:</span>
              <select id="tagAnimation" oninput="updateInteractiveTag()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="scale" selected>Scale</option>
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="rotate">Rotate</option>
                <option value="none">None</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Animation Duration (ms):</span>
              <input type="number" id="tagAnimationDuration" value="300" min="100" max="1000" step="50" oninput="updateInteractiveTag()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="tagRemovable" onchange="updateInteractiveTag()" style="cursor: pointer;">
              <span>Removable</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="tagRounded" onchange="updateInteractiveTag()" style="cursor: pointer;">
              <span>Rounded</span>
            </label>
          </div>
          
          <div style="margin-top: 12px; padding: 12px; background-color: #eff6ff; border-radius: 6px; border: 1px solid #bfdbfe;">
            <p style="margin: 0; font-size: 13px; color: #1e40af;">
              💡 <strong>Tip:</strong> Changes apply instantly as you type or select options!
            </p>
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; padding: 40px; background-color: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div id="interactiveTagContainer"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      updateInteractiveTag();
    }, 50);
  };

  window.updateInteractiveTag = function() {
    const label = document.getElementById('tagLabel')?.value || 'Interactive Tag';
    const icon = document.getElementById('tagIcon')?.value || '';
    const image = document.getElementById('tagImage')?.value || '';
    const avatar = document.getElementById('tagAvatar')?.value || '';
    const variant = document.getElementById('tagVariant')?.value || 'filled';
    const color = document.getElementById('tagColor')?.value || 'primary';
    const size = document.getElementById('tagSize')?.value || 'md';
    const animation = document.getElementById('tagAnimation')?.value || 'scale';
    const animationDuration = document.getElementById('tagAnimationDuration')?.value || '300';
    const removable = document.getElementById('tagRemovable')?.checked || false;
    const rounded = document.getElementById('tagRounded')?.checked || false;
    
    const tagContainer = document.getElementById('interactiveTagContainer');
    if (tagContainer) {
      tagContainer.innerHTML = `
        <ui-tag 
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
          ${rounded ? 'rounded="true"' : ''}>
        </ui-tag>
      `;
    }
  };

  // New demo functions for avatars and animations
  window.showTagWithAvatars = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Tags with User Avatars (Circular)</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px;">
            <ui-tag label="Alice" user-avatar="https://i.pravatar.cc/150?img=1" color="primary"></ui-tag>
            <ui-tag label="Bob" user-avatar="https://i.pravatar.cc/150?img=11" color="success"></ui-tag>
            <ui-tag label="Charlie" user-avatar="https://i.pravatar.cc/150?img=13" color="info"></ui-tag>
            <ui-tag label="Diana" user-avatar="https://i.pravatar.cc/150?img=20" color="warning" removable="true"></ui-tag>
            <ui-tag label="Eve" user-avatar="https://i.pravatar.cc/150?img=25" color="danger" removable="true"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Tags with Images</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px;">
            <ui-tag label="HTML" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" color="danger"></ui-tag>
            <ui-tag label="CSS" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" color="info"></ui-tag>
            <ui-tag label="JS" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" color="warning"></ui-tag>
            <ui-tag label="Node" image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" color="success"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Tags with Emoji Icons</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px;">
            <ui-tag label="Feature" icon="✨" color="primary"></ui-tag>
            <ui-tag label="Bug" icon="🐛" color="danger"></ui-tag>
            <ui-tag label="Docs" icon="📚" color="info"></ui-tag>
            <ui-tag label="Performance" icon="⚡" color="warning"></ui-tag>
            <ui-tag label="Security" icon="🔒" color="success"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Different Sizes with Avatars</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-top: 15px;">
            <ui-tag label="Small" user-avatar="https://i.pravatar.cc/150?img=3" size="sm" color="primary"></ui-tag>
            <ui-tag label="Medium" user-avatar="https://i.pravatar.cc/150?img=4" size="md" color="success"></ui-tag>
            <ui-tag label="Large" user-avatar="https://i.pravatar.cc/150?img=6" size="lg" color="danger"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Rounded Tags with Avatars</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px;">
            <ui-tag label="Team Lead" user-avatar="https://i.pravatar.cc/150?img=7" color="primary" rounded="true"></ui-tag>
            <ui-tag label="Developer" user-avatar="https://i.pravatar.cc/150?img=15" color="info" rounded="true"></ui-tag>
            <ui-tag label="Designer" user-avatar="https://i.pravatar.cc/150?img=16" color="warning" rounded="true"></ui-tag>
          </div>
        </div>
      </div>
    `;
  };

  window.showTagAnimations = function() {
    const container = document.getElementById('tagDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Different Animation Types (Click × to see closing animations)</h4>
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 15px;">Each tag uses a different closing animation</p>
        </div>
        
        <div>
          <h4>Scale Animation (Default)</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <ui-tag label="Scale" icon="📏" color="primary" removable="true" animation="scale"></ui-tag>
            <ui-tag label="Shrink" icon="🎯" color="success" removable="true" animation="scale"></ui-tag>
            <ui-tag label="Contract" icon="✨" color="info" removable="true" animation="scale"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Fade Animation</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <ui-tag label="Fade" icon="🌙" color="secondary" removable="true" animation="fade"></ui-tag>
            <ui-tag label="Vanish" icon="☁️" color="warning" removable="true" animation="fade"></ui-tag>
            <ui-tag label="Dissolve" icon="🌅" color="danger" removable="true" animation="fade"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Slide Animation</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <ui-tag label="Slide Up" icon="⬆️" color="primary" removable="true" animation="slide"></ui-tag>
            <ui-tag label="Float Away" icon="🎈" color="info" removable="true" animation="slide"></ui-tag>
            <ui-tag label="Rise" icon="🚀" color="success" removable="true" animation="slide"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Rotate Animation</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <ui-tag label="Spin" icon="🌀" color="warning" removable="true" animation="rotate"></ui-tag>
            <ui-tag label="Twist" icon="🎪" color="danger" removable="true" animation="rotate"></ui-tag>
            <ui-tag label="Rotate" icon="🔄" color="secondary" removable="true" animation="rotate"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Custom Duration (Fast: 150ms, Slow: 600ms)</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <ui-tag label="Fast" icon="⚡" color="primary" removable="true" animation="scale" animation-duration="150"></ui-tag>
            <ui-tag label="Normal" icon="⏱️" color="info" removable="true" animation="scale" animation-duration="300"></ui-tag>
            <ui-tag label="Slow" icon="🐌" color="success" removable="true" animation="scale" animation-duration="600"></ui-tag>
          </div>
        </div>
        
        <div>
          <h4>Mixed Animations with Avatars</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <ui-tag label="Scale" user-avatar="https://i.pravatar.cc/150?img=30" color="primary" removable="true" animation="scale"></ui-tag>
            <ui-tag label="Fade" user-avatar="https://i.pravatar.cc/150?img=31" color="success" removable="true" animation="fade"></ui-tag>
            <ui-tag label="Slide" user-avatar="https://i.pravatar.cc/150?img=32" color="info" removable="true" animation="slide"></ui-tag>
            <ui-tag label="Rotate" user-avatar="https://i.pravatar.cc/150?img=33" color="warning" removable="true" animation="rotate"></ui-tag>
          </div>
        </div>
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; border: 1px solid #3b82f6;">
          <p style="margin: 0; color: #1e40af;"><strong>💡 Tip:</strong> Click the × button on any tag to see its closing animation in action!</p>
        </div>
      </div>
    `;
  };
}
