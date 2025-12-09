// Component Demo Functions
export function initRangeSliderDemo() {
  const section = document.getElementById('range-slider');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🏚️ Range Slider Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Slider input for selecting values or ranges with customizable styling.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicSlider()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showRangeSlider()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Range</button>
      <button onclick="showSteppedSlider()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Stepped</button>
      <button onclick="showColoredSlider()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Colored</button>
      <button onclick="showVerticalSlider()" style="padding: 8px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">Vertical</button>
      <button onclick="showInteractiveSlider()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="sliderDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    // Range Slider Demo Functions
    window.showBasicSlider = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Basic Slider</h4>
          <ui-range-slider id="basicSlider" min="0" max="100" value="50"></ui-range-slider>
          <div id="basicValue" style="margin-top: 12px; padding: 10px; background: #f0f9ff; border-radius: 6px; text-align: center;">
            Value: <strong>50</strong>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const slider = document.getElementById('basicSlider');
      if (slider) {
        slider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('basicValue');
          if (valueDiv) {
            valueDiv.innerHTML = `Value: <strong>${e.detail}</strong>`;
          }
        });
      }
    }, 100);
  };

  window.showRangeSlider = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Price Range Selector</h4>
          <p style="color: #6b7280; font-size: 13px;">Select a price range</p>
          <ui-range-slider 
            id="rangeSlider" 
            range="true"
            min="0" 
            max="1000" 
            start-value="200" 
            end-value="800"
            display-format="$\${value}"
            color="#10b981"></ui-range-slider>
          <div id="rangeValue" style="margin-top: 12px; padding: 10px; background: #dcfce7; border-radius: 6px; text-align: center;">
            Range: <strong>$200 - $800</strong>
          </div>
        </div>
        <div>
          <h4>Temperature Range</h4>
          <p style="color: #6b7280; font-size: 13px;">Set temperature limits</p>
          <ui-range-slider 
            id="tempSlider" 
            range="true"
            min="-20" 
            max="50" 
            start-value="10" 
            end-value="30"
            display-format="\${value}°C"
            color="#ef4444"></ui-range-slider>
        </div>
      </div>
    `;
    setTimeout(() => {
      const slider = document.getElementById('rangeSlider');
      if (slider) {
        slider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('rangeValue');
          if (valueDiv) {
            valueDiv.innerHTML = `Range: <strong>$${e.detail.start} - $${e.detail.end}</strong>`;
          }
        });
      }
    }, 100);
  };

  window.showSliderWithIcons = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Volume Control</h4>
          <ui-range-slider 
            min="0" 
            max="100" 
            value="70"
            start-icon="🔇"
            end-icon="🔊"
            color="#3b82f6"></ui-range-slider>
        </div>
        <div>
          <h4>Brightness</h4>
          <ui-range-slider 
            min="0" 
            max="100" 
            value="60"
            start-icon="🌙"
            end-icon="☀️"
            color="#f59e0b"></ui-range-slider>
        </div>
        <div>
          <h4>Speed</h4>
          <ui-range-slider 
            min="0" 
            max="100" 
            value="45"
            start-icon="🐢"
            end-icon="🚀"
            color="#8b5cf6"></ui-range-slider>
        </div>
        <div>
          <h4>With Text Labels</h4>
          <ui-range-slider 
            min="0" 
            max="100" 
            value="50"
            start-icon="Min"
            end-icon="Max"
            color="#ec4899"></ui-range-slider>
        </div>
      </div>
    `;
  };

  window.showSliderSizes = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Small Size</h4>
          <ui-range-slider size="sm" value="40" color="#3b82f6"></ui-range-slider>
        </div>
        <div>
          <h4>Medium Size (Default)</h4>
          <ui-range-slider size="md" value="60" color="#10b981"></ui-range-slider>
        </div>
        <div>
          <h4>Large Size</h4>
          <ui-range-slider size="lg" value="80" color="#f59e0b"></ui-range-slider>
        </div>
        <div style="display: flex; gap: 40px; align-items: center; justify-content: center; padding: 20px;">
          <div>
            <h4 style="text-align: center;">Vertical Small</h4>
            <ui-range-slider vertical="true" size="sm" value="30" color="#8b5cf6"></ui-range-slider>
          </div>
          <div>
            <h4 style="text-align: center;">Vertical Medium</h4>
            <ui-range-slider vertical="true" size="md" value="60" color="#ec4899"></ui-range-slider>
          </div>
          <div>
            <h4 style="text-align: center;">Vertical Large</h4>
            <ui-range-slider vertical="true" size="lg" value="80" color="#ef4444"></ui-range-slider>
          </div>
        </div>
      </div>
    `;
  };

  window.showSliderColors = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4 style="color: #3b82f6;">Blue</h4>
          <ui-range-slider value="60" color="#3b82f6"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #10b981;">Green</h4>
          <ui-range-slider value="70" color="#10b981"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #f59e0b;">Orange</h4>
          <ui-range-slider value="50" color="#f59e0b"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #ef4444;">Red</h4>
          <ui-range-slider value="80" color="#ef4444"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #8b5cf6;">Purple</h4>
          <ui-range-slider value="45" color="#8b5cf6"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #ec4899;">Pink</h4>
          <ui-range-slider value="65" color="#ec4899"></ui-range-slider>
        </div>
        <div>
          <h4>Custom Track Color</h4>
          <ui-range-slider value="55" color="#10b981" track-color="#fecaca"></ui-range-slider>
        </div>
      </div>
    `;
  };

  window.showSliderSteps = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Regular Steps (Step: 10)</h4>
          <p style="color: #6b7280; font-size: 13px;">Values snap to multiples of 10</p>
          <ui-range-slider 
            min="0" 
            max="100" 
            step="10"
            value="50"
            show-marks="true"></ui-range-slider>
        </div>
        <div>
          <h4>Custom Steps (Non-linear)</h4>
          <p style="color: #6b7280; font-size: 13px;">0, 10, 25, 50, 100, 200, 500</p>
          <ui-range-slider 
            id="customStepSlider"
            min="0" 
            max="500"
            value="50"
            show-marks="true"
            color="#8b5cf6"></ui-range-slider>
        </div>
        <div>
          <h4>With Labels</h4>
          <ui-range-slider 
            id="labelSlider"
            min="0" 
            max="5"
            step="1"
            value="2"
            show-marks="true"
            color="#ec4899"></ui-range-slider>
        </div>
      </div>
    `;
    setTimeout(() => {
      const customSlider = document.getElementById('customStepSlider');
      if (customSlider) {
        customSlider.customSteps = [0, 10, 25, 50, 100, 200, 500];
      }

      const labelSlider = document.getElementById('labelSlider');
      if (labelSlider) {
        labelSlider.marks = [
          { value: 0, label: 'None' },
          { value: 1, label: 'Low' },
          { value: 2, label: 'Med' },
          { value: 3, label: 'High' },
          { value: 4, label: 'Max' },
          { value: 5, label: 'Ultra' }
        ];
      }
    }, 100);
  };

  window.showVerticalSlider = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px;">
        <h3>Vertical Sliders</h3>
        <p style="color: #6b7280; margin-bottom: 24px;">Sliders can be displayed vertically for different UI layouts.</p>
        
        <div style="display: flex; gap: 60px; align-items: flex-start; justify-content: center; padding: 30px; background-color: #f9fafb; border-radius: 8px; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <h4 style="margin: 0;">Volume</h4>
            <ui-range-slider 
              id="verticalVolume"
              vertical="true"
              min="0" 
              max="100" 
              value="70"
              color="#3b82f6"
              start-icon="🔇"
              end-icon="🔊"></ui-range-slider>
            <div id="volumeValue" style="padding: 8px 16px; background: #dbeafe; border-radius: 6px; font-size: 14px;">
              <strong>70%</strong>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <h4 style="margin: 0;">Brightness</h4>
            <ui-range-slider 
              id="verticalBrightness"
              vertical="true"
              min="0" 
              max="100" 
              value="60"
              color="#f59e0b"
              start-icon="🌙"
              end-icon="☀️"></ui-range-slider>
            <div id="brightnessValue" style="padding: 8px 16px; background: #fef3c7; border-radius: 6px; font-size: 14px;">
              <strong>60%</strong>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <h4 style="margin: 0;">Temperature</h4>
            <ui-range-slider 
              id="verticalTemp"
              vertical="true"
              range="true"
              min="0" 
              max="100" 
              start-value="30"
              end-value="70"
              color="#ef4444"></ui-range-slider>
            <div id="tempValue" style="padding: 8px 16px; background: #fee2e2; border-radius: 6px; font-size: 14px;">
              <strong>30-70°C</strong>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <h4 style="margin: 0;">Priority</h4>
            <ui-range-slider 
              id="verticalPriority"
              vertical="true"
              min="1" 
              max="5" 
              value="3"
              step="1"
              show-marks="true"
              color="#8b5cf6"></ui-range-slider>
            <div id="priorityValue" style="padding: 8px 16px; background: #ede9fe; border-radius: 6px; font-size: 14px;">
              <strong>Medium</strong>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <h4 style="margin: 0;">Speed</h4>
            <ui-range-slider 
              id="verticalSpeed"
              vertical="true"
              min="0" 
              max="100" 
              value="45"
              color="#10b981"
              size="lg"
              start-icon="🐢"
              end-icon="🚀"></ui-range-slider>
            <div id="speedValue" style="padding: 8px 16px; background: #d1fae5; border-radius: 6px; font-size: 14px;">
              <strong>45%</strong>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background-color: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4>Different Sizes</h4>
          <div style="display: flex; gap: 40px; align-items: flex-end; justify-content: center; padding: 20px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <span style="font-size: 13px; color: #6b7280;">Small</span>
              <ui-range-slider 
                vertical="true"
                size="sm"
                value="40"
                color="#3b82f6"></ui-range-slider>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <span style="font-size: 13px; color: #6b7280;">Medium</span>
              <ui-range-slider 
                vertical="true"
                size="md"
                value="60"
                color="#10b981"></ui-range-slider>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <span style="font-size: 13px; color: #6b7280;">Large</span>
              <ui-range-slider 
                vertical="true"
                size="lg"
                value="80"
                color="#f59e0b"></ui-range-slider>
            </div>
          </div>
        </div>
      </div>
    `;
    
    setTimeout(() => {
      const volumeSlider = document.getElementById('verticalVolume');
      if (volumeSlider) {
        volumeSlider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('volumeValue');
          if (valueDiv) {
            valueDiv.innerHTML = `<strong>${e.detail}%</strong>`;
          }
        });
      }
      
      const brightnessSlider = document.getElementById('verticalBrightness');
      if (brightnessSlider) {
        brightnessSlider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('brightnessValue');
          if (valueDiv) {
            valueDiv.innerHTML = `<strong>${e.detail}%</strong>`;
          }
        });
      }
      
      const tempSlider = document.getElementById('verticalTemp');
      if (tempSlider) {
        tempSlider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('tempValue');
          if (valueDiv) {
            valueDiv.innerHTML = `<strong>${e.detail.start}-${e.detail.end}°C</strong>`;
          }
        });
      }
      
      const prioritySlider = document.getElementById('verticalPriority');
      if (prioritySlider) {
        const priorities = { 1: 'Very Low', 2: 'Low', 3: 'Medium', 4: 'High', 5: 'Critical' };
        prioritySlider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('priorityValue');
          if (valueDiv) {
            valueDiv.innerHTML = `<strong>${priorities[e.detail]}</strong>`;
          }
        });
      }
      
      const speedSlider = document.getElementById('verticalSpeed');
      if (speedSlider) {
        speedSlider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('speedValue');
          if (valueDiv) {
            valueDiv.innerHTML = `<strong>${e.detail}%</strong>`;
          }
        });
      }
    }, 100);
  };

  window.showInteractiveSlider = function() {
    console.log('showInteractiveSlider called');
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the slider properties and see changes in real-time!</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
          <h4 style="margin: 0 0 16px;">Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Min Value:</span>
              <input type="number" id="sliderMin" value="0" oninput="updateInteractiveSlider()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Max Value:</span>
              <input type="number" id="sliderMax" value="100" oninput="updateInteractiveSlider()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Step:</span>
              <input type="number" id="sliderStep" value="1" min="1" oninput="updateInteractiveSlider()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Value:</span>
              <input type="number" id="sliderValue" value="50" oninput="updateInteractiveSlider()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Size:</span>
              <select id="sliderSize" oninput="updateInteractiveSlider()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="sm">Small</option>
                <option value="md" selected>Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Color:</span>
              <input type="color" id="sliderColor" value="#3b82f6" oninput="updateInteractiveSlider()"
                style="padding: 4px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; height: 40px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Track Color:</span>
              <input type="color" id="sliderTrackColor" value="#e5e7eb" oninput="updateInteractiveSlider()"
                style="padding: 4px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; height: 40px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Start Icon:</span>
              <input type="text" id="sliderStartIcon" placeholder="e.g., 🔇 or Min" oninput="updateInteractiveSlider()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 4px;">
                <button onclick="document.getElementById('sliderStartIcon').value='🔇'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">🔇 Volume</button>
                <button onclick="document.getElementById('sliderStartIcon').value='🌙'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">🌙 Dark</button>
                <button onclick="document.getElementById('sliderStartIcon').value='🐢'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">🐢 Slow</button>
                <button onclick="document.getElementById('sliderStartIcon').value='Min'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">Min</button>
              </div>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>End Icon:</span>
              <input type="text" id="sliderEndIcon" placeholder="e.g., 🔊 or Max" oninput="updateInteractiveSlider()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 4px;">
                <button onclick="document.getElementById('sliderEndIcon').value='🔊'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">🔊 Volume</button>
                <button onclick="document.getElementById('sliderEndIcon').value='☀️'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">☀️ Light</button>
                <button onclick="document.getElementById('sliderEndIcon').value='🚀'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">🚀 Fast</button>
                <button onclick="document.getElementById('sliderEndIcon').value='Max'; updateInteractiveSlider();" style="padding: 4px 8px; font-size: 11px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">Max</button>
              </div>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Display Format:</span>
              <input type="text" id="sliderDisplayFormat" placeholder="e.g., \\${value}%" oninput="updateInteractiveSlider()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="sliderRange" onchange="updateInteractiveSlider()" style="cursor: pointer;">
              <span>Range Mode</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="sliderVertical" onchange="updateInteractiveSlider()" style="cursor: pointer;">
              <span>Vertical</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="sliderShowMarks" onchange="updateInteractiveSlider()" style="cursor: pointer;">
              <span>Show Marks</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="sliderDisabled" onchange="updateInteractiveSlider()" style="cursor: pointer;">
              <span>Disabled</span>
            </label>
          </div>
          
          <div id="rangeControls" style="margin-top: 16px; display: none; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 12px;">Range Mode Settings:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Start Value:</span>
                <input type="number" id="sliderStartValue" value="30" oninput="updateInteractiveSlider()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>End Value:</span>
                <input type="number" id="sliderEndValue" value="70" oninput="updateInteractiveSlider()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
            </div>
          </div>
        </div>
        
        <div style="padding: 20px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div id="interactiveSliderContainer" style="min-height: 100px; display: flex; align-items: center; justify-content: center;"></div>
          <div id="sliderCurrentValue" style="margin-top: 16px; padding: 12px; background-color: #dbeafe; border-radius: 6px; text-align: center; font-family: monospace;">
            Value: <strong>50</strong>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      updateInteractiveSlider();
      
      // Toggle range controls visibility
      const rangeCheckbox = document.getElementById('sliderRange');
      if (rangeCheckbox) {
        rangeCheckbox.addEventListener('change', () => {
          const rangeControls = document.getElementById('rangeControls');
          if (rangeControls) {
            rangeControls.style.display = rangeCheckbox.checked ? 'block' : 'none';
          }
        });
      }
    }, 50);
  };

  window.updateInteractiveSlider = function() {
    const min = document.getElementById('sliderMin')?.value || '0';
    const max = document.getElementById('sliderMax')?.value || '100';
    const step = document.getElementById('sliderStep')?.value || '1';
    const value = document.getElementById('sliderValue')?.value || '50';
    const size = document.getElementById('sliderSize')?.value || 'md';
    const color = document.getElementById('sliderColor')?.value || '#3b82f6';
    const trackColor = document.getElementById('sliderTrackColor')?.value || '#e5e7eb';
    const startIcon = document.getElementById('sliderStartIcon')?.value || '';
    const endIcon = document.getElementById('sliderEndIcon')?.value || '';
    const displayFormat = document.getElementById('sliderDisplayFormat')?.value || '';
    const isRange = document.getElementById('sliderRange')?.checked || false;
    const vertical = document.getElementById('sliderVertical')?.checked || false;
    const showMarks = document.getElementById('sliderShowMarks')?.checked || false;
    const disabled = document.getElementById('sliderDisabled')?.checked || false;
    const startValue = document.getElementById('sliderStartValue')?.value || '30';
    const endValue = document.getElementById('sliderEndValue')?.value || '70';
    
    const container = document.getElementById('interactiveSliderContainer');
    const valueDisplay = document.getElementById('sliderCurrentValue');
    
    if (container) {
      let html = `
        <ui-range-slider 
          id="interactiveSlider"
          min="${min}" 
          max="${max}" 
          step="${step}"
          ${isRange ? `range="true" start-value="${startValue}" end-value="${endValue}"` : `value="${value}"`}
          size="${size}"
          color="${color}"
          track-color="${trackColor}"
          ${startIcon ? `start-icon="${startIcon}"` : ''}
          ${endIcon ? `end-icon="${endIcon}"` : ''}
          ${displayFormat ? `display-format="${displayFormat}"` : ''}
          ${vertical ? 'vertical="true"' : ''}
          ${showMarks ? 'show-marks="true"' : ''}
          ${disabled ? 'disabled="true"' : ''}>
        </ui-range-slider>
      `;
      container.innerHTML = html;
      
      // Update value display
      if (valueDisplay) {
        if (isRange) {
          valueDisplay.innerHTML = `Range: <strong>${startValue} - ${endValue}</strong>`;
        } else {
          valueDisplay.innerHTML = `Value: <strong>${value}</strong>`;
        }
      }
      
      // Add event listener to track changes
      setTimeout(() => {
        const slider = document.getElementById('interactiveSlider');
        if (slider && valueDisplay) {
          slider.addEventListener('sliderChange', (e) => {
            if (isRange && e.detail.start !== undefined) {
              valueDisplay.innerHTML = `Range: <strong>${e.detail.start} - ${e.detail.end}</strong>`;
            } else {
              valueDisplay.innerHTML = `Value: <strong>${e.detail}</strong>`;
            }
          });
        }
      }, 100);
    }
  };

  window.showSteppedSlider = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Regular Steps (Step: 10)</h4>
          <p style="color: #6b7280; font-size: 13px;">Values snap to multiples of 10</p>
          <ui-range-slider 
            min="0" 
            max="100" 
            step="10"
            value="50"
            show-marks="true"></ui-range-slider>
        </div>
        <div>
          <h4>T-Shirt Sizes</h4>
          <p style="color: #6b7280; font-size: 13px;">Select a size</p>
          <ui-range-slider 
            id="sizeSlider"
            min="0" 
            max="4"
            value="2"
            show-marks="true"
            color="#3b82f6"></ui-range-slider>
          <div id="sizeValue" style="margin-top: 12px; padding: 10px; background: #dbeafe; border-radius: 6px; text-align: center;">
            Size: <strong>M</strong>
          </div>
        </div>
        <div>
          <h4>Priority Levels</h4>
          <p style="color: #6b7280; font-size: 13px;">Low, Medium, High, Critical</p>
          <ui-range-slider 
            id="prioritySlider"
            min="1" 
            max="4"
            value="2"
            show-marks="true"
            color="#ef4444"></ui-range-slider>
          <div id="priorityValue" style="margin-top: 12px; padding: 10px; background: #fee2e2; border-radius: 6px; text-align: center;">
            Priority: <strong>Medium</strong>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const sizeSlider = document.getElementById('sizeSlider');
      if (sizeSlider) {
        const sizes = ['XS', 'S', 'M', 'L', 'XL'];
        sizeSlider.restrictedValues = [0, 1, 2, 3, 4];
        sizeSlider.marks = [
          { value: 0, label: 'XS' },
          { value: 1, label: 'S' },
          { value: 2, label: 'M' },
          { value: 3, label: 'L' },
          { value: 4, label: 'XL' }
        ];
        sizeSlider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('sizeValue');
          if (valueDiv) {
            valueDiv.innerHTML = `Size: <strong>${sizes[e.detail]}</strong>`;
          }
        });
      }

      const prioritySlider = document.getElementById('prioritySlider');
      if (prioritySlider) {
        const priorities = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
        prioritySlider.restrictedValues = [1, 2, 3, 4];
        prioritySlider.marks = [
          { value: 1, label: 'Low' },
          { value: 2, label: 'Med' },
          { value: 3, label: 'High' },
          { value: 4, label: 'Crit' }
        ];
        prioritySlider.addEventListener('sliderChange', (e) => {
          const valueDiv = document.getElementById('priorityValue');
          if (valueDiv) {
            valueDiv.innerHTML = `Priority: <strong>${priorities[e.detail]}</strong>`;
          }
        });
      }
    }, 100);
  };

  window.showColoredSlider = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4 style="color: #3b82f6;">Blue</h4>
          <ui-range-slider value="60" color="#3b82f6"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #10b981;">Green</h4>
          <ui-range-slider value="70" color="#10b981"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #f59e0b;">Orange</h4>
          <ui-range-slider value="50" color="#f59e0b"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #ef4444;">Red</h4>
          <ui-range-slider value="80" color="#ef4444"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #8b5cf6;">Purple</h4>
          <ui-range-slider value="45" color="#8b5cf6"></ui-range-slider>
        </div>
        <div>
          <h4 style="color: #ec4899;">Pink</h4>
          <ui-range-slider value="65" color="#ec4899"></ui-range-slider>
        </div>
        <div>
          <h4>Custom Track Color</h4>
          <ui-range-slider value="55" color="#10b981" track-color="#fecaca"></ui-range-slider>
        </div>
      </div>
    `;
  };

  window.showSliderMarks = function() {
    const container = document.getElementById('sliderDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Simple Marks</h4>
          <ui-range-slider 
            min="0" 
            max="10"
            step="1"
            value="5"
            show-marks="true"
            color="#3b82f6"></ui-range-slider>
        </div>
        <div>
          <h4>Marks with Labels</h4>
          <ui-range-slider 
            id="marksLabelSlider"
            min="0" 
            max="100"
            value="50"
            show-marks="true"
            color="#10b981"></ui-range-slider>
        </div>
        <div>
          <h4>Range with Marks</h4>
          <ui-range-slider 
            id="rangeMarksSlider"
            range="true"
            min="0" 
            max="100"
            start-value="30"
            end-value="70"
            show-marks="true"
            color="#f59e0b"></ui-range-slider>
        </div>
        <div style="display: flex; gap: 20px; justify-content: center; padding: 20px;">
          <div>
            <h4 style="text-align: center;">Vertical with Marks</h4>
            <ui-range-slider 
              id="verticalMarksSlider"
              vertical="true"
              min="0" 
              max="10"
              step="2"
              value="6"
              show-marks="true"
              color="#8b5cf6"></ui-range-slider>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const marksSlider = document.getElementById('marksLabelSlider');
      if (marksSlider) {
        marksSlider.marks = [
          { value: 0, label: 'Start' },
          { value: 25, label: '25%' },
          { value: 50, label: 'Half' },
          { value: 75, label: '75%' },
          { value: 100, label: 'End' }
        ];
      }

      const rangeMarks = document.getElementById('rangeMarksSlider');
      if (rangeMarks) {
        rangeMarks.marks = [
          { value: 0, label: '0' },
          { value: 50, label: '50' },
          { value: 100, label: '100' }
        ];
      }

      const verticalMarks = document.getElementById('verticalMarksSlider');
      if (verticalMarks) {
        verticalMarks.marks = [
          { value: 0, label: 'Min' },
          { value: 5, label: 'Mid' },
          { value: 10, label: 'Max' }
        ];
      }
    }, 100);
  };

  showBasicSlider();
  }, 100);
}
