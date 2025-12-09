// Popover Component Demo
export function initPopoverDemo() {
  const section = document.getElementById('popover');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">💭 Popover Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Display rich content in floating popover overlays with smart positioning.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicPopover()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showIconPopover()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Icon Only</button>
      <button onclick="showEdgeCases()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Edge Detection</button>
      <button onclick="showInteractivePopover()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="popoverDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    showBasicPopover();
  }, 100);
}

// Basic Popover Demo
window.showBasicPopover = function() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Basic Popovers</h3>
      <p>Simple popovers with different trigger types and placements.</p>

      <div style="margin-top: 30px;">
        <h4>Click Trigger</h4>
        <p style="color: #6b7280; margin-bottom: 16px;">Click the button to show/hide the popover</p>
        <ui-popover trigger="click" placement="top" heading="Information" content="<p>This is a <strong>popover</strong> with HTML content. Click outside to close it.</p>">
          <button style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Click Me
          </button>
        </ui-popover>
      </div>

      <div style="margin-top: 50px;">
        <h4>Hover Trigger</h4>
        <p style="color: #6b7280; margin-bottom: 16px;">Hover over the button to show the popover</p>
        <ui-popover trigger="hover" placement="right" content="<p>This popover appears on <em>hover</em>. Move your mouse away to hide it.</p>">
          <button style="padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Hover Me
          </button>
        </ui-popover>
      </div>

      <div style="margin-top: 50px;">
        <h4>Different Placements</h4>
        <p style="color: #6b7280; margin-bottom: 16px;">Popovers can be positioned in various directions</p>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin-top: 80px; margin-bottom: 80px;">
          <ui-popover trigger="click" placement="top" content="<p>Top placement</p>">
            <button style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Top</button>
          </ui-popover>
          
          <ui-popover trigger="click" placement="bottom" content="<p>Bottom placement</p>">
            <button style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Bottom</button>
          </ui-popover>
          
          <ui-popover trigger="click" placement="left" content="<p>Left placement</p>">
            <button style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Left</button>
          </ui-popover>
          
          <ui-popover trigger="click" placement="right" content="<p>Right placement</p>">
            <button style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Right</button>
          </ui-popover>
        </div>
      </div>

      <div style="margin-top: 50px;">
        <h4>Rich Content</h4>
        <p style="color: #6b7280; margin-bottom: 16px;">Popovers support rich HTML content</p>
        <ui-popover 
          trigger="click" 
          placement="bottom" 
          heading="User Profile"
          width="320px"
          content='
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
              <div>
                <div style="font-weight: 600;">John Doe</div>
                <div style="font-size: 12px; color: #6b7280;">Software Developer</div>
              </div>
            </div>
            <p style="margin: 8px 0;">Passionate about building great user experiences.</p>
            <button style="width: 100%; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 6px; margin-top: 8px; cursor: pointer;">
              View Profile
            </button>
          '>
          <button style="padding: 10px 20px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            View User Info
          </button>
        </ui-popover>
      </div>
    </div>
  `;
};

// Icon Only Popover Demo
window.showIconPopover = function() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Icon-Only Button Popovers</h3>
      <p>Perfect for toolbar actions, notifications, and compact interfaces.</p>

      <div style="margin-top: 30px;">
        <h4>Action Icons</h4>
        <p style="color: #6b7280; margin-bottom: 16px;">Common action buttons with icon-only triggers</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <ui-popover trigger="hover" placement="top" content="<p><strong>Add Item</strong><br/>Create a new item</p>">
            <button style="width: 40px; height: 40px; background-color: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center;">
              ➕
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="top" content="<p><strong>Edit</strong><br/>Modify content</p>">
            <button style="width: 40px; height: 40px; background-color: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">
              ✏️
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="top" content="<p><strong>Delete</strong><br/>Remove item</p>">
            <button style="width: 40px; height: 40px; background-color: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">
              🗑️
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="top" content="<p><strong>Settings</strong><br/>Configure options</p>">
            <button style="width: 40px; height: 40px; background-color: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">
              ⚙️
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="top" content="<p><strong>Share</strong><br/>Share with others</p>">
            <button style="width: 40px; height: 40px; background-color: #8b5cf6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">
              📤
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="top" content="<p><strong>Download</strong><br/>Save to device</p>">
            <button style="width: 40px; height: 40px; background-color: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">
              ⬇️
            </button>
          </ui-popover>
        </div>
      </div>

      <div style="margin-top: 50px;">
        <h4>Notification Icons</h4>
        <p style="color: #6b7280; margin-bottom: 16px;">Status and notification indicators</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <ui-popover 
            trigger="click" 
            placement="bottom" 
            heading="Notifications"
            width="300px"
            content='
              <div style="max-height: 200px; overflow-y: auto;">
                <div style="padding: 10px; border-bottom: 1px solid #e5e7eb; display: flex; gap: 10px;">
                  <span style="font-size: 20px;">💬</span>
                  <div>
                    <div style="font-weight: 600; font-size: 13px;">New message</div>
                    <div style="font-size: 12px; color: #6b7280;">Sarah sent you a message</div>
                  </div>
                </div>
                <div style="padding: 10px; border-bottom: 1px solid #e5e7eb; display: flex; gap: 10px;">
                  <span style="font-size: 20px;">✅</span>
                  <div>
                    <div style="font-weight: 600; font-size: 13px;">Task completed</div>
                    <div style="font-size: 12px; color: #6b7280;">Project review finished</div>
                  </div>
                </div>
                <div style="padding: 10px; display: flex; gap: 10px;">
                  <span style="font-size: 20px;">⚠️</span>
                  <div>
                    <div style="font-weight: 600; font-size: 13px;">Warning</div>
                    <div style="font-size: 12px; color: #6b7280;">Storage almost full</div>
                  </div>
                </div>
              </div>
            '>
            <button style="width: 44px; height: 44px; background-color: white; color: #1f2937; border: 2px solid #e5e7eb; border-radius: 50%; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; position: relative;">
              🔔
              <span style="position: absolute; top: -4px; right: -4px; width: 18px; height: 18px; background: #ef4444; border-radius: 50%; color: white; font-size: 10px; font-weight: 600; display: flex; align-items: center; justify-content: center;">3</span>
            </button>
          </ui-popover>

          <ui-popover 
            trigger="click" 
            placement="bottom" 
            heading="User Menu"
            width="200px"
            content='
              <div>
                <a href="#" style="display: block; padding: 10px; text-decoration: none; color: #1f2937; border-bottom: 1px solid #e5e7eb; font-size: 14px;">👤 Profile</a>
                <a href="#" style="display: block; padding: 10px; text-decoration: none; color: #1f2937; border-bottom: 1px solid #e5e7eb; font-size: 14px;">⚙️ Settings</a>
                <a href="#" style="display: block; padding: 10px; text-decoration: none; color: #ef4444; font-size: 14px;">🚪 Logout</a>
              </div>
            '>
            <button style="width: 44px; height: 44px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 50%; cursor: pointer; color: white; font-size: 18px; font-weight: 600; display: flex; align-items: center; justify-content: center;">
              JD
            </button>
          </ui-popover>

          <ui-popover 
            trigger="hover" 
            placement="bottom"
            content='<p><strong>Help & Support</strong><br/>Get assistance</p>'>
            <button style="width: 44px; height: 44px; background-color: #3b82f6; color: white; border: none; border-radius: 50%; cursor: pointer; font-size: 24px; font-weight: 600; display: flex; align-items: center; justify-content: center;">
              ?
            </button>
          </ui-popover>
        </div>
      </div>

      <div style="margin-top: 50px;">
        <h4>Compact Icon Toolbar</h4>
        <p style="color: #6b7280; margin-bottom: 16px;">Space-efficient toolbar with icon buttons</p>
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; display: inline-flex; gap: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <ui-popover trigger="hover" placement="bottom" content="<p>Bold (Ctrl+B)</p>">
            <button style="width: 32px; height: 32px; background: transparent; border: none; border-radius: 4px; cursor: pointer; font-weight: 700; font-size: 14px; color: #1f2937;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
              B
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="bottom" content="<p>Italic (Ctrl+I)</p>">
            <button style="width: 32px; height: 32px; background: transparent; border: none; border-radius: 4px; cursor: pointer; font-style: italic; font-size: 14px; color: #1f2937;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
              I
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="bottom" content="<p>Underline (Ctrl+U)</p>">
            <button style="width: 32px; height: 32px; background: transparent; border: none; border-radius: 4px; cursor: pointer; text-decoration: underline; font-size: 14px; color: #1f2937;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
              U
            </button>
          </ui-popover>

          <div style="width: 1px; background: #e5e7eb; margin: 4px 4px;"></div>

          <ui-popover trigger="hover" placement="bottom" content="<p>Align Left</p>">
            <button style="width: 32px; height: 32px; background: transparent; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
              ≡
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="bottom" content="<p>Insert Link</p>">
            <button style="width: 32px; height: 32px; background: transparent; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
              🔗
            </button>
          </ui-popover>

          <ui-popover trigger="hover" placement="bottom" content="<p>Insert Image</p>">
            <button style="width: 32px; height: 32px; background: transparent; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
              🖼️
            </button>
          </ui-popover>
        </div>
      </div>
    </div>
  `;
};

// Edge Cases Demo
window.showEdgeCases = function() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Edge Detection & Auto-Positioning</h3>
      <p>Popovers automatically adjust their position to stay within the viewport.</p>

      <div style="margin-top: 30px; background: #f9fafb; border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px; position: relative; min-height: 400px;">
        <p style="color: #6b7280; margin-bottom: 20px;">Click buttons near the edges to see automatic position adjustment:</p>
        
        <!-- Top Left Corner -->
        <div style="position: absolute; top: 20px; left: 20px;">
          <ui-popover trigger="click" placement="bottom-start" heading="Top-Left Corner" content="<p>This popover should stay within viewport even when triggered from the corner.</p>">
            <button style="padding: 10px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              📍 Top-Left
            </button>
          </ui-popover>
        </div>

        <!-- Top Right Corner -->
        <div style="position: absolute; top: 20px; right: 20px;">
          <ui-popover trigger="click" placement="bottom-end" heading="Top-Right Corner" content="<p>This popover adjusts to prevent cutting off at the right edge of the screen.</p>">
            <button style="padding: 10px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
              📍 Top-Right
            </button>
          </ui-popover>
        </div>

        <!-- Bottom Left Corner -->
        <div style="position: absolute; bottom: 20px; left: 20px;">
          <ui-popover trigger="click" placement="top-start" heading="Bottom-Left Corner" content="<p>When space is limited below, the popover flips to show above.</p>">
            <button style="padding: 10px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">
              📍 Bottom-Left
            </button>
          </ui-popover>
        </div>

        <!-- Bottom Right Corner -->
        <div style="position: absolute; bottom: 20px; right: 20px;">
          <ui-popover trigger="click" placement="top-end" heading="Bottom-Right Corner" content="<p>Smart positioning ensures content is always visible and accessible.</p>">
            <button style="padding: 10px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              📍 Bottom-Right
            </button>
          </ui-popover>
        </div>

        <!-- Center with long content -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <ui-popover 
            trigger="click" 
            placement="right" 
            heading="Long Content Test"
            width="350px"
            content='
              <p>This popover has longer content to test overflow handling:</p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Maximum width is constrained to viewport</li>
                <li>Vertical scrolling enabled if needed</li>
                <li>Position adjusts based on available space</li>
                <li>Always maintains proper padding from edges</li>
              </ul>
              <p style="margin-top: 10px;">Try resizing your browser window to see how the popover adapts.</p>
            '>
            <button style="padding: 12px 24px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
              📄 Long Content
            </button>
          </ui-popover>
        </div>
      </div>

      <div style="margin-top: 30px; background: #eff6ff; border-radius: 8px; padding: 20px; border: 1px solid #bfdbfe;">
        <h4 style="margin: 0 0 10px 0; color: #1e40af;">💡 Smart Positioning Features:</h4>
        <ul style="margin: 0; color: #1e40af; line-height: 1.8;">
          <li><strong>Edge Detection:</strong> Automatically detects viewport boundaries</li>
          <li><strong>Auto-Flip:</strong> Changes position (top↔bottom, left↔right) when needed</li>
          <li><strong>Width Constraint:</strong> Ensures popover never exceeds viewport width</li>
          <li><strong>Scroll Support:</strong> Adds scrolling for tall content</li>
          <li><strong>Dynamic Updates:</strong> Repositions on window resize or scroll</li>
        </ul>
      </div>
    </div>
  `;
};

// Interactive Playground
window.showInteractivePopover = function() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);">
      <h3 style="margin-top: 0; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 28px;">🎮</span>
        Interactive Playground
      </h3>
      <p style="color: #6b7280; margin-bottom: 30px;">Experiment with different configurations and see changes in real-time.</p>
      
      <div style="display: grid; grid-template-columns: 350px 1fr; gap: 30px;">
        <div style="background: #f9fafb; padding: 25px; border-radius: 8px; border: 1px solid #e5e7eb; height: fit-content;">
          <h4 style="margin: 0 0 20px 0; color: #1f2937;">⚙️ Configuration</h4>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Trigger:</label>
              <select id="popoverTrigger" onchange="updateInteractivePopover()" 
                style="width: 100%; padding: 10px; border: 2px solid #d1d5db; border-radius: 6px; cursor: pointer; background: white; font-size: 14px;">
                <option value="click" selected>Click</option>
                <option value="hover">Hover</option>
                <option value="focus">Focus</option>
              </select>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Placement:</label>
              <select id="popoverPlacement" onchange="updateInteractivePopover()" 
                style="width: 100%; padding: 10px; border: 2px solid #d1d5db; border-radius: 6px; cursor: pointer; background: white; font-size: 14px;">
                <option value="top" selected>Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top-start">Top Start</option>
                <option value="top-end">Top End</option>
                <option value="bottom-start">Bottom Start</option>
                <option value="bottom-end">Bottom End</option>
              </select>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Width:</label>
              <input type="text" id="popoverWidth" value="280px" onchange="updateInteractivePopover()"
                style="width: 100%; padding: 10px; border: 2px solid #d1d5db; border-radius: 6px; font-size: 14px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Heading:</label>
              <input type="text" id="popoverHeading" value="Information" onchange="updateInteractivePopover()"
                style="width: 100%; padding: 10px; border: 2px solid #d1d5db; border-radius: 6px; font-size: 14px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Content (HTML):</label>
              <textarea id="popoverContent" onchange="updateInteractivePopover()" 
                style="width: 100%; padding: 12px; border: 2px solid #d1d5db; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 13px; min-height: 150px; background: white; resize: vertical;"><p>This is the <strong>popover content</strong>. You can include HTML elements like:</p>
<ul style="margin: 10px 0; padding-left: 20px;">
  <li>Lists</li>
  <li><strong>Bold text</strong></li>
  <li><em>Italic text</em></li>
</ul></textarea>
              <p style="margin: 8px 0 0; font-size: 12px; color: #6b7280;">
                💡 Tip: Use HTML tags for formatting
              </p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <input type="checkbox" id="popoverShowArrow" checked onchange="updateInteractivePopover()" 
                  style="cursor: pointer; width: 18px; height: 18px;">
                <span style="font-weight: 600; color: #374151;">Show Arrow</span>
              </label>
            </div>

            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Button Style:</label>
              <select id="popoverButtonStyle" onchange="updateInteractivePopover()" 
                style="width: 100%; padding: 10px; border: 2px solid #d1d5db; border-radius: 6px; cursor: pointer; background: white; font-size: 14px;">
                <option value="text" selected>Text Button</option>
                <option value="icon">Icon Only</option>
                <option value="both">Icon + Text</option>
              </select>
            </div>

            <div id="popoverEventLog" style="background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; display: none; margin-top: 10px; max-height: 100px; overflow-y: auto;">
              <div style="color: #9ca3af; margin-bottom: 5px;">Event Log:</div>
              <div id="eventLogContent"></div>
            </div>
          </div>
        </div>
        
        <div style="background: #f9fafb; border-radius: 8px; border: 2px solid #e5e7eb; padding: 40px; display: flex; flex-direction: column;">
          <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            <h4 style="margin: 0 0 10px 0; color: #1f2937;">👁️ Live Preview</h4>
            <p style="color: #6b7280; font-size: 13px; margin: 0;">Interact with the button to see the popover:</p>
          </div>
          
          <div id="interactivePopoverContainer" style="flex: 1; display: flex; justify-content: center; align-items: center; min-height: 300px; background: white; border-radius: 8px; border: 1px solid #e5e7eb; position: relative;">
          </div>

          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px; margin-top: 20px;">
            <h5 style="margin: 0 0 10px 0; color: #1e40af; font-size: 14px;">💡 Tips:</h5>
            <ul style="margin: 0; color: #1e40af; font-size: 13px; line-height: 1.6; padding-left: 20px;">
              <li>Try different placements to see auto-positioning</li>
              <li>Use icon-only buttons for compact interfaces</li>
              <li>Test edge detection by placing near preview borders</li>
              <li>HTML content allows rich formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    updateInteractivePopover();
  }, 100);
};

window.updateInteractivePopover = function() {
  const trigger = document.getElementById('popoverTrigger')?.value || 'click';
  const placement = document.getElementById('popoverPlacement')?.value || 'top';
  const width = document.getElementById('popoverWidth')?.value || '280px';
  const heading = document.getElementById('popoverHeading')?.value || '';
  const content = document.getElementById('popoverContent')?.value || '<p>Content</p>';
  const showArrow = document.getElementById('popoverShowArrow')?.checked ?? true;
  const buttonStyle = document.getElementById('popoverButtonStyle')?.value || 'text';
  
  const container = document.getElementById('interactivePopoverContainer');
  const eventLog = document.getElementById('popoverEventLog');
  const eventLogContent = document.getElementById('eventLogContent');
  
  if (!container) return;

  let buttonHTML = '';
  switch(buttonStyle) {
    case 'icon':
      buttonHTML = `
        <button style="width: 44px; height: 44px; background-color: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center;">
          ⚙️
        </button>
      `;
      break;
    case 'both':
      buttonHTML = `
        <button style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px;">
          <span style="font-size: 18px;">✨</span>
          ${trigger === 'click' ? 'Click Me' : trigger === 'hover' ? 'Hover Me' : 'Focus Me'}
        </button>
      `;
      break;
    default:
      buttonHTML = `
        <button style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
          ${trigger === 'click' ? 'Click Me' : trigger === 'hover' ? 'Hover Over Me' : 'Focus Me'}
        </button>
      `;
  }
  
  const escapedContent = content.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
  
  container.innerHTML = `
    <ui-popover
      id="interactivePopoverComponent"
      trigger="${trigger}"
      placement="${placement}"
      width="${width}"
      ${heading ? `heading="${heading}"` : ''}
      content='${escapedContent}'
      show-arrow="${showArrow}"
    >
      ${buttonHTML}
    </ui-popover>
  `;

  // Add event listener for logging
  setTimeout(() => {
    const popover = document.getElementById('interactivePopoverComponent');
    if (popover && eventLog && eventLogContent) {
      const logEvent = (eventName, detail) => {
        eventLog.style.display = 'block';
        const timestamp = new Date().toLocaleTimeString();
        eventLogContent.innerHTML = `[${timestamp}] ${eventName}: ${JSON.stringify(detail)}`;
        
        setTimeout(() => {
          eventLog.style.display = 'none';
        }, 3000);
      };

      // Listen for custom events if any
      popover.addEventListener('popoverShow', (e) => logEvent('popoverShow', e.detail));
      popover.addEventListener('popoverHide', (e) => logEvent('popoverHide', e.detail));
    }
  }, 100);
};
