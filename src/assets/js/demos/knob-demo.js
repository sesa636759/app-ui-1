// Knob Demo
export function initKnobDemo() {
  const section = document.getElementById('knob');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🎛️ Knob Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Rotary control knob for precise value selection. Drag around the dial or use your mouse wheel to rotate.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicKnob()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showColorKnob()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Colors</button>
      <button onclick="showSizesKnob()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showInteractiveKnob()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
      <button onclick="showSpeedometerKnob()" style="padding: 8px 16px; background-color: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer;">🚗 Speedometer</button>
    </div>

    <div id="knobDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    window.showBasicKnob = function() {
      const container = document.getElementById('knobDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Basic Knob</h3>
          <div style="display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; padding: 20px;">
            <div style="text-align: center;">
              <ui-knob value="50" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="75" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="30" show-value="true" enable-wheel="true"></ui-knob>
            </div>
          </div>
        </div>
      `;
    };

    window.showColorKnob = function() {
      const container = document.getElementById('knobDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Different Colors</h3>
          <div style="display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; padding: 20px;">
            <div style="text-align: center;">
              <ui-knob value="60" color="#3b82f6" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="45" color="#10b981" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="80" color="#ef4444" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="35" color="#f59e0b" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="90" color="#8b5cf6" show-value="true" enable-wheel="true"></ui-knob>
            </div>
          </div>
        </div>
      `;
    };

    window.showSizesKnob = function() {
      const container = document.getElementById('knobDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Different Sizes</h3>
          <div style="display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; align-items: center; padding: 20px;">
            <div style="text-align: center;">
              <ui-knob value="50" size="80" stroke-width="6" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="65" size="120" stroke-width="8" show-value="true" enable-wheel="true"></ui-knob>
            </div>
            <div style="text-align: center;">
              <ui-knob value="80" size="160" stroke-width="10" show-value="true" enable-wheel="true"></ui-knob>
            </div>
          </div>
        </div>
      `;
    };

    window.showSpeedometerKnob = function() {
      const container = document.getElementById('knobDemoContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="demo-block">
          <h3>Speedometer</h3>
          <p style="color:#64748b;">Use buttons to accelerate/decelerate. Wheel and drag also work.</p>
          <div style="display:flex; gap:24px; align-items:center; justify-content:center; flex-wrap:wrap; padding: 20px;">
            <div style="text-align:center;">
              <ui-knob id="speedKnob" value="0" min="0" max="240" step="10" size="180" stroke-width="10" color="#16a34a" track-color="#e5e7eb" show-value="true" value-suffix=" km/h" show-ticks="true" tick-count="12" tick-color="#94a3b8" tick-length="0.12" start-angle="135" end-angle="405"></ui-knob>
              <div style="margin-top:12px; display:flex; gap:12px; justify-content:center;">
                <button id="speedDec" style="padding:8px 14px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer;">Brake −</button>
                <button id="speedInc" style="padding:8px 14px; background:#dc2626; color:#fff; border:none; border-radius:6px; cursor:pointer;">Gas +</button>
              </div>
            </div>
          </div>
        </div>
      `;

      const knob = document.getElementById('speedKnob');
      const dec = document.getElementById('speedDec');
      const inc = document.getElementById('speedInc');
      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
      const numAttr = (el, name, def=0) => {
        const v = el?.getAttribute(name);
        const n = Number(v);
        return Number.isFinite(n) ? n : def;
      };

      const applyDelta = (deltaSteps) => {
        const current = numAttr(knob, 'value', 0);
        const step = numAttr(knob, 'step', 10);
        const min = numAttr(knob, 'min', 0);
        const max = numAttr(knob, 'max', 240);
        const next = clamp(current + deltaSteps * step, min, max);
        knob.setAttribute('value', String(next));
      };

      dec && (dec.onclick = () => applyDelta(-1));
      inc && (inc.onclick = () => applyDelta(1));
    };

    window.showInteractiveKnob = function() {
      const container = document.getElementById('knobDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h3>🎮 Interactive Playground</h3>
          <div style="display: flex; gap: 30px; flex-wrap: wrap; margin-top: 20px;">
            <div style="flex: 1; min-width: 300px;">
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <button type="button" onclick="applyKnobPreset('volume')" style="padding:6px 10px; background:#3b82f6; color:#fff; border:none; border-radius:6px; cursor:pointer;">Preset: Volume %</button>
                  <button type="button" onclick="applyKnobPreset('temperature')" style="padding:6px 10px; background:#f59e0b; color:#fff; border:none; border-radius:6px; cursor:pointer;">Preset: Temp °C</button>
                  <button type="button" onclick="applyKnobPreset('speed')" style="padding:6px 10px; background:#0ea5e9; color:#fff; border:none; border-radius:6px; cursor:pointer;">Preset: Speed km/h</button>
                  <button type="button" onclick="applyKnobPreset('rpm')" style="padding:6px 10px; background:#9333ea; color:#fff; border:none; border-radius:6px; cursor:pointer;">Preset: Tachometer RPM</button>
                </div>
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Value:</label>
                  <input type="number" id="knobValue" value="50" min="0" max="100" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Min Value:</label>
                  <input type="number" id="knobMin" value="0" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Max Value:</label>
                  <input type="number" id="knobMax" value="100" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Step:</label>
                  <input type="number" id="knobStep" value="1" min="1" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
                  <input type="number" id="knobSize" value="120" min="50" max="300" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                <div style="display:flex; gap:12px;">
                  <div style="flex:1;">
                    <label style="display:block; margin-bottom:5px; font-weight:500;">Start Angle:</label>
                    <input type="number" id="knobStartAngle" value="135" min="0" max="360" oninput="updateInteractiveKnob()"
                      style="width:100%; padding:8px; border:1px solid #d1d5db; border-radius:4px;">
                  </div>
                  <div style="flex:1;">
                    <label style="display:block; margin-bottom:5px; font-weight:500;">End Angle:</label>
                    <input type="number" id="knobEndAngle" value="405" min="0" max="540" oninput="updateInteractiveKnob()"
                      style="width:100%; padding:8px; border:1px solid #d1d5db; border-radius:4px;">
                  </div>
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Stroke Width:</label>
                  <input type="number" id="knobStrokeWidth" value="8" min="2" max="20" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Color:</label>
                  <input type="color" id="knobColor" value="#3b82f6" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 4px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 5px; font-weight: 500;">Value Suffix (unit):</label>
                  <input type="text" id="knobValueSuffix" value="" oninput="updateInteractiveKnob()"
                    style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;" placeholder="e.g., %, km/h, °">
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" id="knobShowValue" checked onchange="updateInteractiveKnob()" style="cursor: pointer;">
                  <label for="knobShowValue" style="cursor: pointer;">Show Value</label>
                </div>
                                <div style="display: flex; align-items: center; gap: 10px;">
                                  <input type="checkbox" id="knobEnableWheel" checked onchange="updateInteractiveKnob()" style="cursor: pointer;">
                                  <label for="knobEnableWheel" style="cursor: pointer;">Enable Mouse Wheel</label>
                                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" id="knobShowMinMax" onchange="updateInteractiveKnob()" style="cursor: pointer;">
                  <label for="knobShowMinMax" style="cursor: pointer;">Show Min/Max</label>
                </div>

                <hr style="margin:6px 0; border:none; border-top:1px solid #e5e7eb;">
                <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                  <div style="flex:1; min-width:150px;">
                    <label style="display:block; margin-bottom:5px; font-weight:500;">Show Ticks:</label>
                    <input type="checkbox" id="knobShowTicks" onchange="updateInteractiveKnob()" style="cursor:pointer;">
                  </div>
                  <div style="flex:1; min-width:150px;">
                    <label style="display:block; margin-bottom:5px; font-weight:500;">Tick Count:</label>
                    <input type="number" id="knobTickCount" value="10" min="2" max="60" oninput="updateInteractiveKnob()"
                      style="width:100%; padding:8px; border:1px solid #d1d5db; border-radius:4px;">
                  </div>
                  <div style="flex:1; min-width:150px;">
                    <label style="display:block; margin-bottom:5px; font-weight:500;">Tick Length:</label>
                    <input type="number" id="knobTickLength" value="0.1" step="0.01" min="0.02" max="0.4" oninput="updateInteractiveKnob()"
                      style="width:100%; padding:8px; border:1px solid #d1d5db; border-radius:4px;">
                  </div>
                  <div style="flex:1; min-width:150px;">
                    <label style="display:block; margin-bottom:5px; font-weight:500;">Tick Color:</label>
                    <input type="color" id="knobTickColor" value="#94a3b8" oninput="updateInteractiveKnob()"
                      style="width:100%; padding:4px; border:1px solid #d1d5db; border-radius:4px; cursor:pointer;">
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" id="knobReadonly" onchange="updateInteractiveKnob()" style="cursor: pointer;">
                  <label for="knobReadonly" style="cursor: pointer;">Read Only</label>
                </div>
              </div>
            </div>
            
            <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; display: flex; flex-direction: column; gap: 16px; justify-content: center; align-items: center;">
              <div id="interactiveKnobContainer" tabindex="0" aria-label="Knob playground" style="outline:none;"></div>
              <div style="display:flex; gap:12px; align-items:center;">
                <button id="knobDecrementBtn" style="padding:8px 14px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer;">− Decrease</button>
                <button id="knobIncrementBtn" style="padding:8px 14px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer;">+ Increase</button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      updateInteractiveKnob();
    };

    window.updateInteractiveKnob = function() {
      const value = document.getElementById('knobValue')?.value || 50;
      const min = document.getElementById('knobMin')?.value || 0;
      const max = document.getElementById('knobMax')?.value || 100;
      const step = document.getElementById('knobStep')?.value || 1;
      const size = document.getElementById('knobSize')?.value || 120;
      const strokeWidth = document.getElementById('knobStrokeWidth')?.value || 8;
      const color = document.getElementById('knobColor')?.value || '#3b82f6';
      const startAngle = document.getElementById('knobStartAngle')?.value || 135;
      const endAngle = document.getElementById('knobEndAngle')?.value || 405;
      const valueSuffix = document.getElementById('knobValueSuffix')?.value || '';
      const showValue = document.getElementById('knobShowValue')?.checked !== false;
      const showMinMax = document.getElementById('knobShowMinMax')?.checked || false;
      const enableWheel = document.getElementById('knobEnableWheel')?.checked !== false;
      const readonly = document.getElementById('knobReadonly')?.checked || false;
      const showTicks = document.getElementById('knobShowTicks')?.checked || false;
      const tickCount = document.getElementById('knobTickCount')?.value || 10;
      const tickLength = document.getElementById('knobTickLength')?.value || 0.1;
      const tickColor = document.getElementById('knobTickColor')?.value || '#94a3b8';
      
      const container = document.getElementById('interactiveKnobContainer');
      if (!container) return;
      
      container.innerHTML = '';
      
      const knob = document.createElement('ui-knob');
      knob.setAttribute('value', value);
      knob.setAttribute('min', min);
      knob.setAttribute('max', max);
      knob.setAttribute('step', step);
      knob.setAttribute('size', size);
      knob.setAttribute('stroke-width', strokeWidth);
      knob.setAttribute('color', color);
      knob.setAttribute('start-angle', startAngle);
      knob.setAttribute('end-angle', endAngle);
      if (valueSuffix) knob.setAttribute('value-suffix', valueSuffix);
      if (showValue) knob.setAttribute('show-value', 'true');
      if (readonly) knob.setAttribute('readonly', 'true');
      if (enableWheel) knob.setAttribute('enable-wheel', 'true');
      if (showMinMax) knob.setAttribute('show-min-max', 'true');
      if (showTicks) knob.setAttribute('show-ticks', 'true');
      if (showTicks) knob.setAttribute('tick-count', String(tickCount));
      if (showTicks) knob.setAttribute('tick-length', String(tickLength));
      if (showTicks) knob.setAttribute('tick-color', String(tickColor));
      
      container.appendChild(knob);
      
      // Listen for value changes (committed)
      knob.addEventListener('knobChange', (event) => {
        const valueInput = document.getElementById('knobValue');
        if (valueInput) valueInput.value = event.detail;
      });
      // Listen for live input while dragging/wheeling
      knob.addEventListener('knobInput', (event) => {
        const valueInput = document.getElementById('knobValue');
        if (valueInput) valueInput.value = event.detail;
      });

      // Wire inc/dec buttons to adjust knob value programmatically
      const decBtn = document.getElementById('knobDecrementBtn');
      const incBtn = document.getElementById('knobIncrementBtn');
      const toNumber = (el) => Number((el && el.value) || 0);

      const applyDelta = (delta) => {
        const current = Number(knob.getAttribute('value')) || 0;
        const s = Number(step);
        const newVal = Math.max(Number(min), Math.min(Number(max), current + delta * (s || 1)));
        knob.setAttribute('value', String(newVal));
        // also reflect in the form input
        const valueInput = document.getElementById('knobValue');
        if (valueInput) valueInput.value = String(newVal);
      };

      if (decBtn) decBtn.onclick = () => applyDelta(-1);
      if (incBtn) incBtn.onclick = () => applyDelta(1);
      const containerEl = document.getElementById('interactiveKnobContainer');
      if (containerEl) {
        containerEl.onkeydown = (e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            applyDelta(-1);
            e.preventDefault();
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            applyDelta(1);
            e.preventDefault();
          }
        };
      }
    };

    // Presets for quick configuration
    window.applyKnobPreset = function(name) {
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = String(val); };
      const setChecked = (id, checked) => { const el = document.getElementById(id); if (el) el.checked = !!checked; };
      switch (name) {
        case 'volume':
          setVal('knobMin', 0);
          setVal('knobMax', 100);
          setVal('knobStep', 5);
          setVal('knobValue', 40);
          setVal('knobColor', '#3b82f6');
          setVal('knobValueSuffix', '%');
          setChecked('knobShowMinMax', true);
          setChecked('knobShowValue', true);
          setChecked('knobEnableWheel', true);
          setChecked('knobShowTicks', false);
          break;
        case 'temperature':
          setVal('knobMin', -20);
          setVal('knobMax', 50);
          setVal('knobStep', 1);
          setVal('knobValue', 22);
          setVal('knobColor', '#ef4444');
          setVal('knobValueSuffix', ' °C');
          setChecked('knobShowMinMax', true);
          setChecked('knobShowValue', true);
          setChecked('knobEnableWheel', true);
          setChecked('knobShowTicks', true);
          setVal('knobTickCount', 14);
          setVal('knobTickLength', 0.08);
          setVal('knobTickColor', '#94a3b8');
          break;
        case 'speed':
          setVal('knobMin', 0);
          setVal('knobMax', 240);
          setVal('knobStep', 10);
          setVal('knobValue', 60);
          setVal('knobColor', '#16a34a');
          setVal('knobValueSuffix', ' km/h');
          setChecked('knobShowMinMax', true);
          setChecked('knobShowValue', true);
          setChecked('knobEnableWheel', true);
          setChecked('knobShowTicks', true);
          setVal('knobTickCount', 12);
          setVal('knobTickLength', 0.12);
          setVal('knobTickColor', '#94a3b8');
          setVal('knobStartAngle', 135);
          setVal('knobEndAngle', 405);
          break;
        case 'rpm':
          setVal('knobMin', 0);
          setVal('knobMax', 8000);
          setVal('knobStep', 250);
          setVal('knobValue', 1500);
          setVal('knobColor', '#ef4444');
          setVal('knobValueSuffix', ' RPM');
          setChecked('knobShowMinMax', true);
          setChecked('knobShowValue', true);
          setChecked('knobEnableWheel', true);
          setChecked('knobShowTicks', true);
          setVal('knobTickCount', 16);
          setVal('knobTickLength', 0.1);
          setVal('knobTickColor', '#64748b');
          setVal('knobStartAngle', 180);
          setVal('knobEndAngle', 420);
          break;
      }
      updateInteractiveKnob();
    };

    showBasicKnob();
  }, 100);
}
