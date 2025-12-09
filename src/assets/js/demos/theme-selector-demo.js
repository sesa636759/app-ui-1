// Theme Selector Demo Functions
export function initThemeSelectorDemo() {
  const section = document.getElementById('theme-selector');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🎨 Theme Selector</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Switch between light and dark themes to customize the appearance of your application.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showThemeOptions()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Theme Options</button>
      <button onclick="showThemePreview()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Theme Preview</button>
      <button onclick="showThemeCustomization()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Customization</button>
      <button onclick="showInteractiveTheme()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="themeDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    const themeContainer = document.getElementById('themeDemoContainer');
    if (!themeContainer) return;

    window.showThemeOptions = function() {
      const currentTheme = document.documentElement.className || 'light';
      
      themeContainer.innerHTML = `
        <div class="demo-block">
          <h3>Available Themes</h3>
          <p style="color: #6b7280; margin-bottom: 20px;">Select a theme to apply it globally to the application.</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <!-- Light Theme Card -->
            <div onclick="applyTheme('light')" 
              style="padding: 20px; border-radius: 12px; border: 2px solid ${currentTheme === 'light' ? '#3b82f6' : '#e5e7eb'}; 
              background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); cursor: pointer; transition: all 0.3s ease;
              box-shadow: ${currentTheme === 'light' ? '0 4px 6px rgba(59, 130, 246, 0.2)' : '0 2px 4px rgba(0,0,0,0.1)'};"
              onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.15)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='${currentTheme === 'light' ? '0 4px 6px rgba(59, 130, 246, 0.2)' : '0 2px 4px rgba(0,0,0,0.1)'}';">
              
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); display: flex; align-items: center; justify-content: center; font-size: 20px;">
                  ☀️
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 18px; color: #1f2937;">Light Theme</h4>
                  <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">Default theme</p>
                </div>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px;">Clean and bright interface perfect for daytime use.</p>
              
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #ffffff; border: 1px solid #e5e7eb;"></div>
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #f9fafb; border: 1px solid #e5e7eb;"></div>
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #3b82f6;"></div>
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #10b981;"></div>
              </div>
              
              ${currentTheme === 'light' ? '<div style="margin-top: 12px; padding: 8px; background: #dbeafe; border-radius: 6px; text-align: center; font-size: 12px; color: #1e40af; font-weight: 500;">✓ Currently Active</div>' : ''}
            </div>

            <!-- Dark Theme Card -->
            <div onclick="applyTheme('dark')" 
              style="padding: 20px; border-radius: 12px; border: 2px solid ${currentTheme === 'dark' ? '#3b82f6' : '#374151'}; 
              background: linear-gradient(135deg, #1f2937 0%, #111827 100%); cursor: pointer; transition: all 0.3s ease;
              box-shadow: ${currentTheme === 'dark' ? '0 4px 6px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.3)'};"
              onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.4)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='${currentTheme === 'dark' ? '0 4px 6px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.3)'}';">
              
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); display: flex; align-items: center; justify-content: center; font-size: 20px;">
                  🌙
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 18px; color: #f9fafb;">Dark Theme</h4>
                  <p style="margin: 4px 0 0; font-size: 12px; color: #9ca3af;">Night mode</p>
                </div>
              </div>
              
              <p style="color: #9ca3af; font-size: 14px; margin: 0 0 12px;">Reduced eye strain for low-light environments.</p>
              
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #111827; border: 1px solid #374151;"></div>
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #1f2937; border: 1px solid #374151;"></div>
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #3b82f6;"></div>
                <div style="width: 30px; height: 30px; border-radius: 6px; background: #10b981;"></div>
              </div>
              
              ${currentTheme === 'dark' ? '<div style="margin-top: 12px; padding: 8px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; text-align: center; font-size: 12px; color: #60a5fa; font-weight: 500;">✓ Currently Active</div>' : ''}
            </div>
          </div>
          
          <div style="margin-top: 24px; padding: 16px; background-color: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 <strong>Tip:</strong> Your theme preference is saved automatically and will persist across sessions.
            </p>
          </div>
        </div>
      `;
    };

    window.showThemePreview = function() {
      const currentTheme = document.documentElement.className || 'light';
      
      themeContainer.innerHTML = `
        <div class="demo-block">
          <h3>Theme Preview</h3>
          <p style="color: #6b7280; margin-bottom: 20px;">Preview how components look in different themes.</p>
          
          <div style="display: flex; gap: 12px; margin-bottom: 20px;">
            <button onclick="previewTheme('light')" 
              style="padding: 10px 20px; background-color: ${currentTheme === 'light' ? '#3b82f6' : '#6b7280'}; color: white; border: none; border-radius: 6px; cursor: pointer;">
              ☀️ Light Preview
            </button>
            <button onclick="previewTheme('dark')" 
              style="padding: 10px 20px; background-color: ${currentTheme === 'dark' ? '#3b82f6' : '#6b7280'}; color: white; border: none; border-radius: 6px; cursor: pointer;">
              🌙 Dark Preview
            </button>
          </div>
          
          <div id="themePreviewContent" style="padding: 30px; border-radius: 12px; background-color: #f9fafb; border: 2px solid #e5e7eb;">
            <h4 style="margin: 0 0 16px; color: #1f2937;">Component Examples</h4>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <ui-badge label="Success" variant="filled" color="success"></ui-badge>
              <ui-badge label="Primary" variant="filled" color="primary"></ui-badge>
              <ui-badge label="Warning" variant="outlined" color="warning"></ui-badge>
              <ui-badge label="Danger" variant="outlined" color="danger"></ui-badge>
            </div>
            
            <div style="margin-top: 20px;">
              <ui-chip label="Technology" icon="💻" removable="true" color="primary"></ui-chip>
              <ui-chip label="Design" icon="🎨" removable="true" color="success"></ui-chip>
              <ui-chip label="Innovation" icon="💡" removable="true" color="warning"></ui-chip>
            </div>
            
            <div style="margin-top: 20px;">
              <ui-card>
                <h5 slot="header" style="margin: 0;">Sample Card</h5>
                <p style="margin: 0; color: #6b7280;">This is how a card component looks in the current theme.</p>
                <div slot="footer" style="display: flex; gap: 8px;">
                  <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Action</button>
                  <button style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
                </div>
              </ui-card>
            </div>
          </div>
        </div>
      `;
    };

    window.showThemeCustomization = function() {
      themeContainer.innerHTML = `
        <div class="demo-block">
          <h3>Theme Customization</h3>
          <p style="color: #6b7280; margin-bottom: 20px;">Customize theme settings and preferences.</p>
          
          <div style="background-color: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 20px; color: #1f2937;">Quick Settings</h4>
            
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                <div>
                  <h5 style="margin: 0 0 4px; color: #1f2937;">Auto Theme Switching</h5>
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">Automatically switch based on system preference</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="autoTheme" onchange="toggleAutoTheme(this.checked)">
                  <span style="position: relative; display: inline-block; width: 50px; height: 26px; background-color: #cbd5e1; border-radius: 26px; cursor: pointer; transition: 0.3s;"></span>
                </label>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                <div>
                  <h5 style="margin: 0 0 4px; color: #1f2937;">High Contrast Mode</h5>
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">Increase contrast for better visibility</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="highContrast" onchange="toggleHighContrast(this.checked)">
                  <span style="position: relative; display: inline-block; width: 50px; height: 26px; background-color: #cbd5e1; border-radius: 26px; cursor: pointer; transition: 0.3s;"></span>
                </label>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                <div>
                  <h5 style="margin: 0 0 4px; color: #1f2937;">Reduced Motion</h5>
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">Minimize animations and transitions</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="reducedMotion" onchange="toggleReducedMotion(this.checked)">
                  <span style="position: relative; display: inline-block; width: 50px; height: 26px; background-color: #cbd5e1; border-radius: 26px; cursor: pointer; transition: 0.3s;"></span>
                </label>
              </div>
            </div>
            
            <div style="margin-top: 24px; padding: 16px; background-color: #fef3c7; border-radius: 8px; border: 1px solid #fbbf24;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                ⚙️ <strong>Note:</strong> Theme customization features are coming soon. These toggles are for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      `;
    };

    window.applyTheme = function(theme) {
      if (typeof setTheme === 'function') {
        setTheme(theme);
        showThemeOptions(); // Refresh the display
      } else {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
        showThemeOptions(); // Refresh the display
      }
    };

    window.previewTheme = function(theme) {
      const previewContent = document.getElementById('themePreviewContent');
      if (previewContent) {
        if (theme === 'dark') {
          previewContent.style.backgroundColor = '#1f2937';
          previewContent.style.borderColor = '#374151';
          previewContent.querySelector('h4').style.color = '#f9fafb';
        } else {
          previewContent.style.backgroundColor = '#f9fafb';
          previewContent.style.borderColor = '#e5e7eb';
          previewContent.querySelector('h4').style.color = '#1f2937';
        }
      }
    };

    window.toggleAutoTheme = function(enabled) {
      console.log('Auto theme switching:', enabled);
      localStorage.setItem('autoTheme', enabled);
    };

    window.toggleHighContrast = function(enabled) {
      console.log('High contrast mode:', enabled);
      if (enabled) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };

    window.toggleReducedMotion = function(enabled) {
      console.log('Reduced motion:', enabled);
      if (enabled) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
    };

    showThemeOptions();
  }, 100);
}

// Interactive Playground Functions
window.showInteractiveTheme = function() {
  const themeContainer = document.getElementById('themeDemoContainer');
  if (!themeContainer) return;
  
  const currentTheme = document.documentElement.className || 'light';
  
  themeContainer.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Current Theme:</label>
              <select id="themeSelect" onchange="updateInteractiveTheme()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="light" ${currentTheme === 'light' ? 'selected' : ''}>☀️ Light</option>
                <option value="dark" ${currentTheme === 'dark' ? 'selected' : ''}>🌙 Dark</option>
              </select>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 10px; font-weight: 500;">Test Components:</label>
              <div style="padding: 15px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                <div style="margin-bottom: 12px;">
                  <strong style="display: block; margin-bottom: 8px; font-size: 14px;">Badges:</strong>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <ui-badge label="Primary" variant="filled" color="primary"></ui-badge>
                    <ui-badge label="Success" variant="filled" color="success"></ui-badge>
                    <ui-badge label="Warning" variant="outlined" color="warning"></ui-badge>
                    <ui-badge label="Danger" variant="outlined" color="danger"></ui-badge>
                  </div>
                </div>
                
                <div style="margin-bottom: 12px;">
                  <strong style="display: block; margin-bottom: 8px; font-size: 14px;">Chips:</strong>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <ui-chip label="Technology" icon="💻" color="primary"></ui-chip>
                    <ui-chip label="Design" icon="🎨" color="success"></ui-chip>
                  </div>
                </div>
                
                <div>
                  <strong style="display: block; margin-bottom: 8px; font-size: 14px;">Button:</strong>
                  <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Theme Features:</label>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" id="themeAutoSwitch" onchange="updateThemeAutoSwitch(this.checked)" style="cursor: pointer;">
                  <label for="themeAutoSwitch" style="cursor: pointer; font-size: 14px;">Auto Theme (System)</label>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" id="themeHighContrast" onchange="updateThemeHighContrast(this.checked)" style="cursor: pointer;">
                  <label for="themeHighContrast" style="cursor: pointer; font-size: 14px;">High Contrast</label>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" id="themeReducedMotion" onchange="updateThemeReducedMotion(this.checked)" style="cursor: pointer;">
                  <label for="themeReducedMotion" style="cursor: pointer; font-size: 14px;">Reduced Motion</label>
                </div>
              </div>
            </div>
            
            <div style="padding: 12px; background: #dbeafe; border-radius: 6px; font-size: 13px;">
              <strong style="color: #1e40af;">💡 Tip:</strong>
              <span style="color: #1e3a8a;"> Switch themes and see the preview update in real-time!</span>
            </div>
          </div>
        </div>
        
        <div style="flex: 1; min-width: 400px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveThemePreview" style="margin-top: 20px; padding: 20px; border-radius: 8px; background: white; border: 1px solid #e5e7eb; transition: all 0.3s ease;">
            <h3 style="margin: 0 0 16px; color: #1f2937;">Sample Content</h3>
            <p style="margin: 0 0 16px; color: #6b7280;">This is how your content looks in the current theme. The colors, contrasts, and styles automatically adapt based on your theme selection.</p>
            
            <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 6px;">
              <h4 style="margin: 0 0 8px; color: #374151;">Card Example</h4>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">Cards and containers adapt to the theme with appropriate backgrounds and borders.</p>
            </div>
            
            <div style="margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
              <div style="padding: 8px 16px; background: #3b82f6; color: white; border-radius: 6px; font-size: 14px;">Primary</div>
              <div style="padding: 8px 16px; background: #10b981; color: white; border-radius: 6px; font-size: 14px;">Success</div>
              <div style="padding: 8px 16px; background: #f59e0b; color: white; border-radius: 6px; font-size: 14px;">Warning</div>
              <div style="padding: 8px 16px; background: #ef4444; color: white; border-radius: 6px; font-size: 14px;">Danger</div>
            </div>
          </div>
          <div id="themeOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px;">
            Current theme: <strong>${currentTheme}</strong>
          </div>
        </div>
      </div>
    </div>
  `;
};

window.updateInteractiveTheme = function() {
  const theme = document.getElementById('themeSelect').value;
  const outputDiv = document.getElementById('themeOutput');
  const preview = document.getElementById('interactiveThemePreview');
  
  // Apply theme
  if (typeof setTheme === 'function') {
    setTheme(theme);
  } else {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }
  
  // Update preview
  if (preview) {
    if (theme === 'dark') {
      preview.style.backgroundColor = '#1f2937';
      preview.style.borderColor = '#374151';
      preview.style.color = '#f9fafb';
      preview.querySelector('h3').style.color = '#f9fafb';
      preview.querySelectorAll('p').forEach(p => p.style.color = '#d1d5db');
      preview.querySelector('h4').style.color = '#e5e7eb';
      const card = preview.querySelector('div[style*="background: #f9fafb"]');
      if (card) {
        card.style.backgroundColor = '#111827';
      }
    } else {
      preview.style.backgroundColor = 'white';
      preview.style.borderColor = '#e5e7eb';
      preview.style.color = '#1f2937';
      preview.querySelector('h3').style.color = '#1f2937';
      preview.querySelectorAll('p').forEach(p => p.style.color = '#6b7280');
      preview.querySelector('h4').style.color = '#374151';
      const card = preview.querySelector('div[style*="background"]');
      if (card && card.querySelector('h4')) {
        card.style.backgroundColor = '#f9fafb';
      }
    }
  }
  
  if (outputDiv) {
    outputDiv.innerHTML = `Current theme: <strong>${theme}</strong> - Theme preference saved!`;
  }
};

window.updateThemeAutoSwitch = function(enabled) {
  const outputDiv = document.getElementById('themeOutput');
  console.log('Auto theme switching:', enabled);
  localStorage.setItem('autoTheme', enabled);
  
  if (outputDiv) {
    outputDiv.innerHTML = `Auto theme switching: <strong>${enabled ? 'Enabled' : 'Disabled'}</strong>`;
  }
  
  if (enabled) {
    // Detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    document.getElementById('themeSelect').value = systemTheme;
    updateInteractiveTheme();
  }
};

window.updateThemeHighContrast = function(enabled) {
  const outputDiv = document.getElementById('themeOutput');
  console.log('High contrast mode:', enabled);
  
  if (enabled) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
  
  if (outputDiv) {
    outputDiv.innerHTML = `High contrast mode: <strong>${enabled ? 'Enabled' : 'Disabled'}</strong>`;
  }
};

window.updateThemeReducedMotion = function(enabled) {
  const outputDiv = document.getElementById('themeOutput');
  console.log('Reduced motion:', enabled);
  
  if (enabled) {
    document.documentElement.classList.add('reduced-motion');
  } else {
    document.documentElement.classList.remove('reduced-motion');
  }
  
  if (outputDiv) {
    outputDiv.innerHTML = `Reduced motion: <strong>${enabled ? 'Enabled' : 'Disabled'}</strong>`;
  }
};
