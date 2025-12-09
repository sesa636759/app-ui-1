// Component Demo Functions
export function initAvatarDemo() {
  const section = document.getElementById('avatar');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">👤 Avatar Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>User avatars with initials, images, icons, and customizable sizes.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicAvatars()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showAvatarSizes()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showAvatarColors()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Colors</button>
      <button onclick="showAvatarShapes()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Shapes</button>
      <button onclick="showAvatarGroup()" style="padding: 8px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">Avatar Group</button>
      <button onclick="showAvatarWithBadge()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">With Badge</button>
      <button onclick="showInteractiveAvatar()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="avatarDemoContainer" style="margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;"></div>
  `;

  // Initialize with basic avatars
  setTimeout(() => showBasicAvatars(), 100);

  // Avatar Demo Functions
  window.showBasicAvatars = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <ui-avatar content="JD" size="40px" shape="circle"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Letter Avatar</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar src="https://i.pravatar.cc/150?img=1" size="40px" shape="circle"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Image Avatar</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar icon="👤" size="40px" shape="circle"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Icon Avatar</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="AB" size="40px" shape="square"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Square Shape</p>
        </div>
      </div>
    `;
  };

  window.showAvatarColors = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <ui-avatar content="JD" size="40px" bg-color="#3b82f6"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Blue</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="SM" size="40px" bg-color="#10b981"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Green</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="AB" size="40px" bg-color="#f59e0b"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Yellow</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="CD" size="40px" bg-color="#ef4444"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Red</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="EF" size="40px" bg-color="#8b5cf6"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Purple</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="GH" size="40px" bg-color="#ec4899"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Pink</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="IJ" size="40px" bg-color="#06b6d4"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Cyan</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="KL" size="40px" bg-color="#64748b"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Gray</p>
        </div>
      </div>
    `;
  };

  window.showAvatarSizes = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <ui-avatar content="S" size="32px"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Small (32px)</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="M" size="40px"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Medium (40px)</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="L" size="56px"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Large (56px)</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="XL" size="72px"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Extra Large (72px)</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="XXL" size="96px"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">2XL (96px)</p>
        </div>
      </div>
    `;
  };

  window.showAvatarWithBadge = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <ui-avatar content="JD" size="48px" badge="3"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Notification Badge</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar src="https://i.pravatar.cc/150?img=2" size="48px" badge="99+"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">High Count</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar content="AB" size="48px" badge="•"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Status Indicator</p>
        </div>
        <div style="text-align: center;">
          <ui-avatar icon="👤" size="48px" badge="!"></ui-avatar>
          <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Alert Badge</p>
        </div>
      </div>
    `;
  };

  window.showAvatarGroup = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>User Group (7 avatars, max 5 visible)</h4>
        <div id="group1"></div>
      </div>

      <div style="margin-bottom: 30px;">
        <h4>Team Members Small (4 avatars, max 3 visible)</h4>
        <div id="group2"></div>
      </div>

      <div>
        <h4>Large Group (6 avatars, max 4 visible)</h4>
        <div id="group3"></div>
      </div>
    `;

    // Group 1: Default size with 7 avatars
    const group1 = document.getElementById('group1');
    const avatarGroup1 = document.createElement('ui-avatar-group');
    avatarGroup1.setAttribute('max', '5');
    avatarGroup1.setAttribute('size', '40px');
    avatarGroup1.avatars = [
      { src: 'https://i.pravatar.cc/150?img=1', size: '40px', shape: 'circle' },
      { src: 'https://i.pravatar.cc/150?img=2', size: '40px', shape: 'circle' },
      { src: 'https://i.pravatar.cc/150?img=3', size: '40px', shape: 'circle' },
      { content: 'AB', size: '40px', shape: 'circle' },
      { content: 'CD', size: '40px', shape: 'circle' },
      { content: 'EF', size: '40px', shape: 'circle' },
      { content: 'GH', size: '40px', shape: 'circle' }
    ];
    group1.appendChild(avatarGroup1);

    // Group 2: Small size with 4 avatars
    const group2 = document.getElementById('group2');
    const avatarGroup2 = document.createElement('ui-avatar-group');
    avatarGroup2.setAttribute('max', '3');
    avatarGroup2.setAttribute('size', '32px');
    avatarGroup2.avatars = [
      { src: 'https://i.pravatar.cc/150?img=4', size: '32px', shape: 'circle' },
      { src: 'https://i.pravatar.cc/150?img=5', size: '32px', shape: 'circle' },
      { content: 'JD', size: '32px', shape: 'circle' },
      { content: 'SM', size: '32px', shape: 'circle' }
    ];
    group2.appendChild(avatarGroup2);

    // Group 3: Large size with 6 avatars
    const group3 = document.getElementById('group3');
    const avatarGroup3 = document.createElement('ui-avatar-group');
    avatarGroup3.setAttribute('max', '4');
    avatarGroup3.setAttribute('size', '56px');
    avatarGroup3.avatars = [
      { src: 'https://i.pravatar.cc/150?img=6', size: '56px', shape: 'circle' },
      { src: 'https://i.pravatar.cc/150?img=7', size: '56px', shape: 'circle' },
      { src: 'https://i.pravatar.cc/150?img=8', size: '56px', shape: 'circle' },
      { content: 'PK', size: '56px', shape: 'circle' },
      { content: 'RL', size: '56px', shape: 'circle' },
      { content: 'MN', size: '56px', shape: 'circle' }
    ];
    group3.appendChild(avatarGroup3);
  };

  window.showAvatarShapes = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Circle Shape (Default)</h4>
        <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
          <ui-avatar content="JD" size="40px" shape="circle"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=1" size="40px" shape="circle"></ui-avatar>
          <ui-avatar icon="👤" size="40px" shape="circle"></ui-avatar>
          <ui-avatar content="AB" size="56px" shape="circle" badge="5"></ui-avatar>
        </div>
      </div>

      <div>
        <h4>Square Shape</h4>
        <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
          <ui-avatar content="JD" size="40px" shape="square"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=2" size="40px" shape="square"></ui-avatar>
          <ui-avatar icon="🏢" size="40px" shape="square"></ui-avatar>
          <ui-avatar content="AB" size="56px" shape="square" badge="3"></ui-avatar>
        </div>
      </div>
    `;
  };

  window.updateAvatarDemo = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    const shape = document.getElementById('avatarShape')?.value || 'circle';
    const size = document.getElementById('avatarSize')?.value || '40px';
    const badge = document.getElementById('avatarBadge')?.checked || false;
    const contentType = document.getElementById('avatarContentType')?.value || 'letter';

    let content = '';
    let src = '';
    let icon = '';

    switch(contentType) {
      case 'letter':
        content = 'JD';
        break;
      case 'image':
        src = 'https://i.pravatar.cc/150?img=3';
        break;
      case 'icon':
        icon = '👤';
        break;
    }

    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <ui-avatar 
          ${content ? `content="${content}"` : ''} 
          ${src ? `src="${src}"` : ''} 
          ${icon ? `icon="${icon}"` : ''} 
          size="${size}" 
          shape="${shape}"
          ${badge ? 'badge="5"' : ''}
        ></ui-avatar>
        <p style="margin-top: 20px; color: #6b7280;">
          Size: <strong>${size}</strong> | 
          Shape: <strong>${shape}</strong> | 
          Type: <strong>${contentType}</strong>
          ${badge ? ' | Badge: Yes' : ''}
        </p>
      </div>
    `;
  };

  window.showAvatarUseCases = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <!-- User Profile Card -->
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: white;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <ui-avatar src="https://i.pravatar.cc/150?img=5" size="56px"></ui-avatar>
            <div>
              <h4 style="margin: 0; color: #1f2937;">John Doe</h4>
              <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">Senior Developer</p>
            </div>
          </div>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Full-stack developer with 5+ years experience in web technologies.</p>
        </div>

        <!-- Message List Item -->
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: white;">
          <div style="display: flex; gap: 12px; margin-bottom: 15px;">
            <ui-avatar content="SM" size="40px" badge="3"></ui-avatar>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h5 style="margin: 0; color: #1f2937;">Sarah Miller</h5>
                <span style="font-size: 12px; color: #6b7280;">2m ago</span>
              </div>
              <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">Hey! Did you check the latest updates?</p>
            </div>
          </div>
          <div style="display: flex; gap: 12px;">
            <ui-avatar icon="🤖" size="40px"></ui-avatar>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h5 style="margin: 0; color: #1f2937;">Bot Assistant</h5>
                <span style="font-size: 12px; color: #6b7280;">5m ago</span>
              </div>
              <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">Your report is ready for review.</p>
            </div>
          </div>
        </div>

        <!-- Team Members -->
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: white;">
          <h4 style="margin: 0 0 15px; color: #1f2937;">Project Team</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <ui-avatar src="https://i.pravatar.cc/150?img=6" size="32px"></ui-avatar>
              <div style="flex: 1;">
                <p style="margin: 0; font-weight: 500; color: #1f2937;">Alex Chen</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #6b7280;">Project Manager</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <ui-avatar src="https://i.pravatar.cc/150?img=7" size="32px"></ui-avatar>
              <div style="flex: 1;">
                <p style="margin: 0; font-weight: 500; color: #1f2937;">Emma Wilson</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #6b7280;">UI Designer</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <ui-avatar content="RK" size="32px"></ui-avatar>
              <div style="flex: 1;">
                <p style="margin: 0; font-weight: 500; color: #1f2937;">Raj Kumar</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #6b7280;">Developer</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Panel -->
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: white;">
          <h4 style="margin: 0 0 15px; color: #1f2937;">Recent Activity</h4>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="display: flex; gap: 12px;">
              <ui-avatar src="https://i.pravatar.cc/150?img=8" size="36px" badge="•"></ui-avatar>
              <div style="flex: 1;">
                <p style="margin: 0; color: #1f2937; font-size: 14px;"><strong>Mike Ross</strong> liked your post</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">Just now</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <ui-avatar content="LP" size="36px" shape="square"></ui-avatar>
              <div style="flex: 1;">
                <p style="margin: 0; color: #1f2937; font-size: 14px;"><strong>Lisa Park</strong> commented on your photo</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">10 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.showInteractiveAvatar = function() {
    const container = document.getElementById('avatarDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the avatar properties and see changes in real-time!</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 16px;">Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Content Type:</span>
              <select id="avatarType" onchange="toggleAvatarInputs()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="initials" selected>Initials</option>
                <option value="image">Image URL</option>
                <option value="icon">Icon/Emoji</option>
              </select>
            </label>
            
            <label id="initialsInput" style="display: flex; flex-direction: column; gap: 4px;">
              <span>Initials:</span>
              <input type="text" id="avatarInitials" value="JD" maxlength="3" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label id="imageInput" style="display: none; flex-direction: column; gap: 4px;">
              <span>Image URL:</span>
              <input type="text" id="avatarImage" value="https://i.pravatar.cc/150?img=1" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label id="iconInput" style="display: none; flex-direction: column; gap: 4px;">
              <span>Icon/Emoji:</span>
              <input type="text" id="avatarIcon" value="👤" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Size (px):</span>
              <input type="number" id="avatarSize" value="64" min="24" max="200" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Shape:</span>
              <select id="avatarShape" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="circle" selected>Circle</option>
                <option value="square">Square</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Badge (optional):</span>
              <input type="text" id="avatarBadge" placeholder="e.g., 5" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
          </div>
          <button onclick="updateInteractiveAvatar()" 
            style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Apply Changes
          </button>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; padding: 60px; background-color: white; border-radius: 8px;">
          <div id="interactiveAvatarContainer"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      updateInteractiveAvatar();
    }, 50);
  };

  window.toggleAvatarInputs = function() {
    const type = document.getElementById('avatarType').value;
    document.getElementById('initialsInput').style.display = type === 'initials' ? 'flex' : 'none';
    document.getElementById('imageInput').style.display = type === 'image' ? 'flex' : 'none';
    document.getElementById('iconInput').style.display = type === 'icon' ? 'flex' : 'none';
  };

  window.updateInteractiveAvatar = function() {
    const type = document.getElementById('avatarType').value;
    const size = document.getElementById('avatarSize').value;
    const shape = document.getElementById('avatarShape').value;
    const badge = document.getElementById('avatarBadge').value;
    
    let contentAttr = '';
    if (type === 'initials') {
      const initials = document.getElementById('avatarInitials').value;
      contentAttr = `content="${initials}"`;
    } else if (type === 'image') {
      const image = document.getElementById('avatarImage').value;
      contentAttr = `src="${image}"`;
    } else if (type === 'icon') {
      const icon = document.getElementById('avatarIcon').value;
      contentAttr = `icon="${icon}"`;
    }
    
    const avatarContainer = document.getElementById('interactiveAvatarContainer');
    if (avatarContainer) {
      avatarContainer.innerHTML = `
        <ui-avatar 
          ${contentAttr}
          size="${size}px"
          shape="${shape}"
          ${badge ? `badge="${badge}"` : ''}>
        </ui-avatar>
      `;
    }
  };

  // Initialize avatar demo
  setTimeout(() => {
    if (document.getElementById('avatarDemoContainer')) {
      showBasicAvatars();
    }
  }, 100);
}

// Avatar Group Demo Functions
export function initAvatarGroupDemo() {
  const section = document.getElementById('avatar-group');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">👥 Avatar Group Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Display multiple avatars in a stacked group with overflow counter.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicAvatarGroup()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic Group</button>
      <button onclick="showAvatarGroupSizes()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showAvatarGroupMax()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Max Display</button>
      <button onclick="showAvatarGroupShapes()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Shapes</button>
      <button onclick="showInteractiveAvatarGroup()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="avatarGroupDemoContainer" style="margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;"></div>
  `;

  // Initialize with basic avatar group
  setTimeout(() => showBasicAvatarGroup(), 100);

  window.showBasicAvatarGroup = function() {
    const container = document.getElementById('avatarGroupDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Basic Avatar Group</h4>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">Stack multiple avatars together with automatic overflow handling</p>
        <ui-avatar-group max="5" size="40px">
          <ui-avatar src="https://i.pravatar.cc/150?img=1"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=2"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=3"></ui-avatar>
          <ui-avatar content="AB" bg-color="#3b82f6"></ui-avatar>
          <ui-avatar content="CD" bg-color="#10b981"></ui-avatar>
          <ui-avatar content="EF" bg-color="#f59e0b"></ui-avatar>
          <ui-avatar content="GH" bg-color="#ef4444"></ui-avatar>
        </ui-avatar-group>
      </div>

      <div style="margin-bottom: 30px;">
        <h4>With Mixed Content</h4>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">Combine images, initials, and icons</p>
        <ui-avatar-group max="4" size="48px">
          <ui-avatar src="https://i.pravatar.cc/150?img=4"></ui-avatar>
          <ui-avatar content="JD" bg-color="#8b5cf6"></ui-avatar>
          <ui-avatar icon="👤" bg-color="#ec4899"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=5"></ui-avatar>
          <ui-avatar content="SM" bg-color="#06b6d4"></ui-avatar>
        </ui-avatar-group>
      </div>
    `;
  };

  window.showAvatarGroupSizes = function() {
    const container = document.getElementById('avatarGroupDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Small (32px)</h4>
        <ui-avatar-group max="5" size="32px">
          <ui-avatar src="https://i.pravatar.cc/150?img=1"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=2"></ui-avatar>
          <ui-avatar content="AB"></ui-avatar>
          <ui-avatar content="CD"></ui-avatar>
          <ui-avatar content="EF"></ui-avatar>
          <ui-avatar content="GH"></ui-avatar>
        </ui-avatar-group>
      </div>

      <div style="margin-bottom: 30px;">
        <h4>Medium (40px - Default)</h4>
        <ui-avatar-group max="5" size="40px">
          <ui-avatar src="https://i.pravatar.cc/150?img=3"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=4"></ui-avatar>
          <ui-avatar content="IJ"></ui-avatar>
          <ui-avatar content="KL"></ui-avatar>
          <ui-avatar content="MN"></ui-avatar>
          <ui-avatar content="OP"></ui-avatar>
        </ui-avatar-group>
      </div>

      <div style="margin-bottom: 30px;">
        <h4>Large (56px)</h4>
        <ui-avatar-group max="5" size="56px">
          <ui-avatar src="https://i.pravatar.cc/150?img=5"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=6"></ui-avatar>
          <ui-avatar content="QR"></ui-avatar>
          <ui-avatar content="ST"></ui-avatar>
          <ui-avatar content="UV"></ui-avatar>
          <ui-avatar content="WX"></ui-avatar>
        </ui-avatar-group>
      </div>

      <div>
        <h4>Extra Large (72px)</h4>
        <ui-avatar-group max="5" size="72px">
          <ui-avatar src="https://i.pravatar.cc/150?img=7"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=8"></ui-avatar>
          <ui-avatar content="YZ"></ui-avatar>
          <ui-avatar content="AA"></ui-avatar>
          <ui-avatar content="BB"></ui-avatar>
        </ui-avatar-group>
      </div>
    `;
  };

  window.showAvatarGroupMax = function() {
    const container = document.getElementById('avatarGroupDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Show Maximum 3 Avatars</h4>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">+4 more hidden</p>
        <ui-avatar-group max="3" size="48px">
          <ui-avatar src="https://i.pravatar.cc/150?img=1"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=2"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=3"></ui-avatar>
          <ui-avatar content="AB"></ui-avatar>
          <ui-avatar content="CD"></ui-avatar>
          <ui-avatar content="EF"></ui-avatar>
          <ui-avatar content="GH"></ui-avatar>
        </ui-avatar-group>
      </div>

      <div style="margin-bottom: 30px;">
        <h4>Show Maximum 5 Avatars</h4>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">+3 more hidden</p>
        <ui-avatar-group max="5" size="48px">
          <ui-avatar src="https://i.pravatar.cc/150?img=4"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=5"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=6"></ui-avatar>
          <ui-avatar content="IJ"></ui-avatar>
          <ui-avatar content="KL"></ui-avatar>
          <ui-avatar content="MN"></ui-avatar>
          <ui-avatar content="OP"></ui-avatar>
          <ui-avatar content="QR"></ui-avatar>
        </ui-avatar-group>
      </div>

      <div>
        <h4>Show All (max=0)</h4>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">No limit, display all avatars</p>
        <ui-avatar-group max="0" size="48px">
          <ui-avatar src="https://i.pravatar.cc/150?img=7"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=8"></ui-avatar>
          <ui-avatar content="ST"></ui-avatar>
          <ui-avatar content="UV"></ui-avatar>
          <ui-avatar content="WX"></ui-avatar>
        </ui-avatar-group>
      </div>
    `;
  };

  window.showAvatarGroupShapes = function() {
    const container = document.getElementById('avatarGroupDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 30px;">
        <h4>Circle Shape (Default)</h4>
        <ui-avatar-group max="5" size="48px" shape="circle">
          <ui-avatar src="https://i.pravatar.cc/150?img=1"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=2"></ui-avatar>
          <ui-avatar content="AB"></ui-avatar>
          <ui-avatar content="CD"></ui-avatar>
          <ui-avatar content="EF"></ui-avatar>
          <ui-avatar content="GH"></ui-avatar>
        </ui-avatar-group>
      </div>

      <div>
        <h4>Square Shape</h4>
        <ui-avatar-group max="5" size="48px" shape="square">
          <ui-avatar src="https://i.pravatar.cc/150?img=3"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=4"></ui-avatar>
          <ui-avatar content="IJ"></ui-avatar>
          <ui-avatar content="KL"></ui-avatar>
          <ui-avatar content="MN"></ui-avatar>
          <ui-avatar content="OP"></ui-avatar>
        </ui-avatar-group>
      </div>
    `;
  };

  window.showInteractiveAvatarGroup = function() {
    const container = document.getElementById('avatarGroupDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <h3>🎮 Interactive Avatar Group Playground</h3>
      <p style="color: #6b7280; margin-bottom: 20px;">Customize the avatar group in real-time</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; padding: 20px; background-color: white; border-radius: 8px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Max Visible:</label>
          <input type="number" id="groupMaxInput" value="5" min="0" max="10" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            oninput="updateAvatarGroupPlayground()">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Size:</label>
          <input type="number" id="groupSizeInput" value="48" min="24" max="96" step="8"
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            oninput="updateAvatarGroupPlayground()">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Shape:</label>
          <select id="groupShapeSelect" 
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            onchange="updateAvatarGroupPlayground()">
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Avatar Count:</label>
          <input type="number" id="groupCountInput" value="7" min="1" max="15"
            style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;"
            oninput="updateAvatarGroupPlayground()">
        </div>
      </div>

      <div id="avatarGroupPlaygroundPreview" style="padding: 40px; background-color: white; border-radius: 8px; text-align: center;"></div>
    `;

    window.updateAvatarGroupPlayground = function() {
      const preview = document.getElementById('avatarGroupPlaygroundPreview');
      const max = document.getElementById('groupMaxInput').value;
      const size = document.getElementById('groupSizeInput').value;
      const shape = document.getElementById('groupShapeSelect').value;
      const count = parseInt(document.getElementById('groupCountInput').value);

      let avatarsHTML = '';
      for (let i = 0; i < count; i++) {
        if (i % 3 === 0) {
          avatarsHTML += `<ui-avatar src="https://i.pravatar.cc/150?img=${i + 1}"></ui-avatar>`;
        } else {
          const letters = String.fromCharCode(65 + (i % 26)) + String.fromCharCode(65 + ((i + 1) % 26));
          const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
          avatarsHTML += `<ui-avatar content="${letters}" bg-color="${colors[i % colors.length]}"></ui-avatar>`;
        }
      }

      preview.innerHTML = `
        <ui-avatar-group max="${max}" size="${size}px" shape="${shape}">
          ${avatarsHTML}
        </ui-avatar-group>
        <div style="margin-top: 20px; color: #6b7280; font-size: 14px;">
          <p>Total: ${count} avatars | Showing: ${Math.min(max || count, count)} | Hidden: ${Math.max(0, count - (max || count))}</p>
        </div>
      `;
    };

    updateAvatarGroupPlayground();
  };
}
