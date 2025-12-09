// Component Demo Functions
export function initAdividerDemo() {
  const section = document.getElementById('adivider');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📏 Divider Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Horizontal and vertical dividers with optional text.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicDividers()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showTextDividers()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">With Text</button>
      <button onclick="showStyledDividers()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Styled</button>
      <button onclick="showDoubleDividers()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Double Lines</button>
      <button onclick="showVerticalDividers()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Vertical</button>
      <button onclick="showInteractiveDivider()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="dividerDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicDividers = function() {
      const container = document.getElementById('dividerDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="margin: 20px 0;">
          <div style="padding: 15px; background: #f9fafb; border-radius: 6px; margin-bottom: 10px;">
            Content Section 1
          </div>
          <a-divider></a-divider>
          <div style="padding: 15px; background: #f0f9ff; border-radius: 6px; margin-top: 10px; margin-bottom: 10px;">
            Content Section 2
          </div>
          <a-divider></a-divider>
          <div style="padding: 15px; background: #f9fafb; border-radius: 6px; margin-top: 10px;">
            Content Section 3
          </div>
        </div>
      `;
    };

    window.showTextDividers = function() {
      const container = document.getElementById('dividerDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="margin: 20px 0;">
          <div style="padding: 15px; background: #f9fafb; border-radius: 6px;">
            Introduction Section
          </div>
          <a-divider text="Main Content" text-align="center"></a-divider>
          <div style="padding: 15px; background: #f0f9ff; border-radius: 6px;">
            Main content goes here with important information.
          </div>
          <a-divider text="Additional Info" text-align="left"></a-divider>
          <div style="padding: 15px; background: #fef3c7; border-radius: 6px;">
            Additional information and details.
          </div>
          <a-divider text="End" text-align="right"></a-divider>
        </div>
      `;
    };

    window.showStyledDividers = function() {
      const container = document.getElementById('dividerDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="margin: 20px 0;">
          <h4 style="margin-bottom: 10px;">Solid Divider</h4>
          <a-divider variant="solid" text="Solid"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">Dashed Divider</h4>
          <a-divider variant="dashed" text="Dashed"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">Dotted Divider</h4>
          <a-divider variant="dotted" text="Dotted"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">Different Sizes</h4>
          <a-divider size="sm" text="Small"></a-divider>
          <a-divider size="md" text="Medium" style="margin: 15px 0;"></a-divider>
          <a-divider size="lg" text="Large"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">Text Transform</h4>
          <a-divider text="capitalize text (default)" text-transform="capitalize"></a-divider>
          <a-divider text="uppercase text" text-transform="uppercase" style="margin: 15px 0;"></a-divider>
          <a-divider text="lowercase text" text-transform="lowercase" style="margin: 15px 0;"></a-divider>
          <a-divider text="No Transform" text-transform="none"></a-divider>
        </div>
      `;
    };

    window.showDoubleDividers = function() {
      const container = document.getElementById('dividerDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="margin: 20px 0;">
          <h4 style="margin-bottom: 10px;">Double Solid</h4>
          <a-divider variant="double-solid" text="Double Solid"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">Double Dashed</h4>
          <a-divider variant="double-dashed" text="Double Dashed"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">Double Dotted</h4>
          <a-divider variant="double-dotted" text="Double Dotted"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">Without Text</h4>
          <a-divider variant="double-solid"></a-divider>
          <a-divider variant="double-dashed" style="margin: 15px 0;"></a-divider>
          <a-divider variant="double-dotted"></a-divider>
          
          <h4 style="margin: 20px 0 10px;">With Different Text Alignments</h4>
          <a-divider variant="double-solid" text="Left Aligned" text-align="left"></a-divider>
          <a-divider variant="double-dashed" text="Center Aligned" text-align="center" style="margin: 15px 0;"></a-divider>
          <a-divider variant="double-dotted" text="Right Aligned" text-align="right"></a-divider>
        </div>
      `;
    };

    window.showVerticalDividers = function() {
      const container = document.getElementById('dividerDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="margin: 20px 0;">
          <h4 style="margin-bottom: 10px;">Basic Vertical Dividers</h4>
          <div style="display: flex; height: 200px; align-items: stretch; gap: 20px; margin-bottom: 30px;">
            <div style="flex: 1; padding: 20px; background: #f0f9ff; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <h4 style="margin: 0 0 10px;">Left Section</h4>
              <p style="margin: 0;">This is content on the left side of the vertical divider.</p>
            </div>
            <a-divider orientation="vertical"></a-divider>
            <div style="flex: 1; padding: 20px; background: #fef3c7; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <h4 style="margin: 0 0 10px;">Middle Section</h4>
              <p style="margin: 0;">This is content in the middle.</p>
            </div>
            <a-divider orientation="vertical"></a-divider>
            <div style="flex: 1; padding: 20px; background: #f0fdf4; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <h4 style="margin: 0 0 10px;">Right Section</h4>
              <p style="margin: 0;">This is content on the right side.</p>
            </div>
          </div>
          
          <h4 style="margin: 20px 0 10px;">Vertical Dividers with Text (Stacked Letters)</h4>
          <div style="display: flex; height: 250px; align-items: stretch; gap: 20px;">
            <div style="flex: 1; padding: 20px; background: #f0f9ff; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <h4 style="margin: 0 0 10px;">Section 1</h4>
              <p style="margin: 0;">Text at TOP</p>
            </div>
            <a-divider orientation="vertical" text="TOP" text-align="top"></a-divider>
            <div style="flex: 1; padding: 20px; background: #fef3c7; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <h4 style="margin: 0 0 10px;">Section 2</h4>
              <p style="margin: 0;">Text at CENTER</p>
            </div>
            <a-divider orientation="vertical" text="CENTER" text-align="center"></a-divider>
            <div style="flex: 1; padding: 20px; background: #f0fdf4; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <h4 style="margin: 0 0 10px;">Section 3</h4>
              <p style="margin: 0;">Text at BOTTOM</p>
            </div>
            <a-divider orientation="vertical" text="BOTTOM" text-align="bottom"></a-divider>
            <div style="flex: 1; padding: 20px; background: #fce7f3; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <h4 style="margin: 0 0 10px;">Section 4</h4>
              <p style="margin: 0;">End section</p>
            </div>
          </div>
        </div>
      `;
    };

    window.showInteractiveDivider = function() {
      const container = document.getElementById('dividerDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Customize the divider properties and see changes in real-time!</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Orientation:</span>
                <select id="dividerOrientation" oninput="updateInteractiveDivider()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="horizontal" selected>Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Variant:</span>
                <select id="dividerVariant" oninput="updateInteractiveDivider()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="solid" selected>Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double-solid">Double Solid</option>
                  <option value="double-dashed">Double Dashed</option>
                  <option value="double-dotted">Double Dotted</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Size:</span>
                <select id="dividerSize" oninput="updateInteractiveDivider()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </label>
              
              <label id="textAlignLabel" style="display: flex; flex-direction: column; gap: 4px;">
                <span>Text Align:</span>
                <select id="dividerTextAlign" oninput="updateInteractiveDivider()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="left">Left</option>
                  <option value="center" selected>Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
              
              <label id="textLabel" style="display: flex; flex-direction: column; gap: 4px;">
                <span>Text (optional):</span>
                <input type="text" id="dividerText" value="Section Divider" oninput="updateInteractiveDivider()"
                  placeholder="Leave empty for no text"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label id="textTransformLabel" style="display: flex; flex-direction: column; gap: 4px;">
                <span>Text Transform:</span>
                <select id="dividerTextTransform" oninput="updateInteractiveDivider()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="capitalize" selected>Capitalize (Default)</option>
                  <option value="uppercase">Uppercase</option>
                  <option value="lowercase">Lowercase</option>
                  <option value="none">None</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Line Color:</span>
                <input type="color" id="dividerColor" value="#d1d5db" oninput="updateInteractiveDivider()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; height: 38px;">
              </label>
              
              <label id="textColorLabel" style="display: flex; flex-direction: column; gap: 4px;">
                <span>Text Color:</span>
                <input type="color" id="dividerTextColor" value="#6b7280" oninput="updateInteractiveDivider()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; height: 38px;">
              </label>
            </div>
            <div style="margin-top: 16px; padding: 12px; background: #e0e7ff; border-radius: 6px; font-size: 13px; color: #4338ca;">
              💡 <strong>Tip:</strong> All changes apply instantly! Try changing colors, text, and orientation.
            </div>
          </div>
          
          <div id="dividerPreviewContainer"></div>
        </div>
      `;

      setTimeout(() => {
        updateInteractiveDivider();
      }, 50);
    };

    window.updateInteractiveDivider = function() {
      const orientation = document.getElementById('dividerOrientation').value;
      const variant = document.getElementById('dividerVariant').value;
      const size = document.getElementById('dividerSize').value;
      const textAlign = document.getElementById('dividerTextAlign').value;
      const text = document.getElementById('dividerText').value;
      const textTransform = document.getElementById('dividerTextTransform').value;
      const color = document.getElementById('dividerColor').value;
      const textColor = document.getElementById('dividerTextColor').value;
      
      // Show/hide text-related controls based on orientation
      const isVertical = orientation === 'vertical';
      document.getElementById('textLabel').style.display = 'flex';
      document.getElementById('textAlignLabel').style.display = 'flex';
      document.getElementById('textTransformLabel').style.display = isVertical ? 'none' : 'flex';
      document.getElementById('textColorLabel').style.display = text ? 'flex' : 'none';
      
      const previewContainer = document.getElementById('dividerPreviewContainer');
      if (previewContainer) {
        if (orientation === 'horizontal') {
          previewContainer.innerHTML = `
            <div style="padding: 20px; background-color: white; border-radius: 8px;">
              <div style="padding: 20px; background: #f0f9ff; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px;">Content Section 1</h4>
                <p style="margin: 0; color: #6b7280;">This is the content above the divider.</p>
              </div>
              
              <a-divider 
                orientation="${orientation}"
                variant="${variant}"
                size="${size}"
                ${text ? `text="${text}"` : ''}
                text-align="${textAlign}"
                ${text && !isVertical ? `text-transform="${textTransform}"` : ''}
                color="${color}"
                ${text ? `text-color="${textColor}"` : ''}>
              </a-divider>
              
              <div style="padding: 20px; background: #fef3c7; border-radius: 8px; margin-top: 20px;">
                <h4 style="margin: 0 0 10px;">Content Section 2</h4>
                <p style="margin: 0; color: #6b7280;">This is the content below the divider.</p>
              </div>
            </div>
          `;
        } else {
          previewContainer.innerHTML = `
            <div style="padding: 20px; background-color: white; border-radius: 8px;">
              <div style="display: flex; height: 250px; align-items: stretch; gap: 20px;">
                <div style="flex: 1; padding: 20px; background: #f0f9ff; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
                  <h4 style="margin: 0 0 10px;">Left Section</h4>
                  <p style="margin: 0; color: #6b7280;">Content on the left side of the vertical divider.</p>
                </div>
                
                <a-divider 
                  orientation="${orientation}"
                  variant="${variant}"
                  size="${size}"
                  ${text ? `text="${text}"` : ''}
                  ${text && isVertical ? `text-align="${textAlign}"` : ''}
                  color="${color}"
                  ${text ? `text-color="${textColor}"` : ''}>
                </a-divider>
                
                <div style="flex: 1; padding: 20px; background: #fef3c7; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
                  <h4 style="margin: 0 0 10px;">Right Section</h4>
                  <p style="margin: 0; color: #6b7280;">Content on the right side of the vertical divider.</p>
                </div>
              </div>
            </div>
          `;
        }
      }
    };

    showBasicDividers();
  }, 100);
}
