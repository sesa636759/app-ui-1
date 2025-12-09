// Speedometer Component Demo
export function initSpeedometerDemo() {
  const section = document.getElementById('speedometer');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🎯 Speedometer Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Animated gauge component for displaying metrics, progress, and performance indicators.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicSpeedometer()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showSpeedometerRanges()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Color Ranges</button>
      <button onclick="showSpeedometerVariants()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Variants</button>
      <button onclick="showSpeedometerSizes()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showSpeedometerLive()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Live Demo</button>
      <button onclick="showSpeedometerPlayground()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="speedometerDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    showBasicSpeedometer();
  }, 100);
}

window.showBasicSpeedometer = function() {
  const container = document.getElementById('speedometerDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Basic Speedometers</h3>
      <p>Simple speedometer gauges with different configurations.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-top: 30px; justify-items: center;">
        <div style="text-align: center;">
          <h4>Speed (km/h)</h4>
          <ui-speedometer id="speedometer1" value="65" max-value="200" unit="km/h" label="Speed"></ui-speedometer>
          <div style="margin-top: 15px;">
            <button onclick="updateSpeedometer('speedometer1', 45)" style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">45</button>
            <button onclick="updateSpeedometer('speedometer1', 85)" style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">85</button>
            <button onclick="updateSpeedometer('speedometer1', 150)" style="padding: 6px 12px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">150</button>
            <button onclick="updateSpeedometer('speedometer1', 180)" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">180</button>
          </div>
        </div>

        <div style="text-align: center;">
          <h4>Progress (%)</h4>
          <ui-speedometer id="speedometer2" value="75" max-value="100" show-percentage label="Progress"></ui-speedometer>
          <div style="margin-top: 15px;">
            <button onclick="updateSpeedometer('speedometer2', 25)" style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">25%</button>
            <button onclick="updateSpeedometer('speedometer2', 50)" style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">50%</button>
            <button onclick="updateSpeedometer('speedometer2', 75)" style="padding: 6px 12px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">75%</button>
            <button onclick="updateSpeedometer('speedometer2', 95)" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">95%</button>
          </div>
        </div>

        <div style="text-align: center;">
          <h4>Temperature (°C)</h4>
          <ui-speedometer id="speedometer3" value="28" min-value="-20" max-value="50" unit="°C" label="Temperature"></ui-speedometer>
          <div style="margin-top: 15px;">
            <button onclick="updateSpeedometer('speedometer3', -10)" style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">-10°</button>
            <button onclick="updateSpeedometer('speedometer3', 15)" style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">15°</button>
            <button onclick="updateSpeedometer('speedometer3', 35)" style="padding: 6px 12px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">35°</button>
            <button onclick="updateSpeedometer('speedometer3', 45)" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">45°</button>
          </div>
        </div>
      </div>
    </div>
  `;

  window.updateSpeedometer = function(id, value) {
    const speedometer = document.getElementById(id);
    if (speedometer) {
      speedometer.value = value;
    }
  };
};

window.showSpeedometerRanges = function() {
  const container = document.getElementById('speedometerDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Color Ranges</h3>
      <p>Speedometers with different color ranges indicating zones.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-top: 30px; justify-items: center;">
        <div style="text-align: center;">
          <h4>Safe/Warning/Danger</h4>
          <ui-speedometer 
            id="rangeSpeedometer1" 
            value="85" 
            max-value="200" 
            unit="km/h" 
            label="Speed"
          ></ui-speedometer>
          <div style="margin-top: 15px;">
            <button onclick="updateSpeedometer('rangeSpeedometer1', 40)" style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Safe</button>
            <button onclick="updateSpeedometer('rangeSpeedometer1', 110)" style="padding: 6px 12px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Warning</button>
            <button onclick="updateSpeedometer('rangeSpeedometer1', 175)" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Danger</button>
          </div>
        </div>

        <div style="text-align: center;">
          <h4>Performance Score</h4>
          <ui-speedometer 
            id="rangeSpeedometer2" 
            value="72" 
            max-value="100" 
            unit="pts" 
            label="Score"
          ></ui-speedometer>
          <div style="margin-top: 15px;">
            <button onclick="updateSpeedometer('rangeSpeedometer2', 30)" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Poor</button>
            <button onclick="updateSpeedometer('rangeSpeedometer2', 60)" style="padding: 6px 12px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Fair</button>
            <button onclick="updateSpeedometer('rangeSpeedometer2', 85)" style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Good</button>
          </div>
        </div>

        <div style="text-align: center;">
          <h4>Battery Level</h4>
          <ui-speedometer 
            id="rangeSpeedometer3" 
            value="45" 
            max-value="100" 
            unit="%" 
            label="Battery"
          ></ui-speedometer>
          <div style="margin-top: 15px;">
            <button onclick="updateSpeedometer('rangeSpeedometer3', 10)" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Critical</button>
            <button onclick="updateSpeedometer('rangeSpeedometer3', 30)" style="padding: 6px 12px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Low</button>
            <button onclick="updateSpeedometer('rangeSpeedometer3', 80)" style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 3px;">Full</button>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const speedometer1 = document.getElementById('rangeSpeedometer1');
    if (speedometer1) {
      speedometer1.ranges = JSON.stringify([
        { min: 0, max: 80, color: '#10b981' },
        { min: 80, max: 140, color: '#f59e0b' },
        { min: 140, max: 200, color: '#ef4444' }
      ]);
    }

    const speedometer2 = document.getElementById('rangeSpeedometer2');
    if (speedometer2) {
      speedometer2.ranges = JSON.stringify([
        { min: 0, max: 50, color: '#ef4444' },
        { min: 50, max: 75, color: '#f59e0b' },
        { min: 75, max: 100, color: '#10b981' }
      ]);
    }

    const speedometer3 = document.getElementById('rangeSpeedometer3');
    if (speedometer3) {
      speedometer3.ranges = JSON.stringify([
        { min: 0, max: 20, color: '#ef4444' },
        { min: 20, max: 50, color: '#f59e0b' },
        { min: 50, max: 100, color: '#10b981' }
      ]);
    }
  }, 100);
};

window.showSpeedometerVariants = function() {
  const container = document.getElementById('speedometerDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Different Variants</h3>
      <p>Various speedometer configurations and use cases.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-top: 30px; justify-items: center;">
        <div style="text-align: center;">
          <h4>RPM Gauge</h4>
          <ui-speedometer 
            id="rpmGauge" 
            value="3500" 
            max-value="8000" 
            unit="RPM" 
            label="Engine"
            needle-color="#ef4444"
          ></ui-speedometer>
        </div>

        <div style="text-align: center;">
          <h4>Fuel Gauge</h4>
          <ui-speedometer 
            id="fuelGauge" 
            value="65" 
            max-value="100" 
            unit="L" 
            label="Fuel"
            needle-color="#10b981"
          ></ui-speedometer>
        </div>

        <div style="text-align: center;">
          <h4>Pressure (PSI)</h4>
          <ui-speedometer 
            id="pressureGauge" 
            value="32" 
            max-value="60" 
            unit="PSI" 
            label="Pressure"
            needle-color="#3b82f6"
          ></ui-speedometer>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const rpmGauge = document.getElementById('rpmGauge');
    if (rpmGauge) {
      rpmGauge.ranges = JSON.stringify([
        { min: 0, max: 4000, color: '#10b981' },
        { min: 4000, max: 6000, color: '#f59e0b' },
        { min: 6000, max: 8000, color: '#ef4444' }
      ]);
    }
  }, 100);
};

window.showSpeedometerSizes = function() {
  const container = document.getElementById('speedometerDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Different Sizes</h3>
      <p>Speedometers in various sizes for different layouts.</p>
      
      <div style="display: flex; gap: 40px; margin-top: 30px; align-items: flex-end; justify-content: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <h4>Small (150px)</h4>
          <ui-speedometer value="65" max-value="100" unit="%" size="150"></ui-speedometer>
        </div>

        <div style="text-align: center;">
          <h4>Medium (200px)</h4>
          <ui-speedometer value="65" max-value="100" unit="%" size="200"></ui-speedometer>
        </div>

        <div style="text-align: center;">
          <h4>Large (280px)</h4>
          <ui-speedometer value="65" max-value="100" unit="%" size="280" label="Progress"></ui-speedometer>
        </div>
      </div>
    </div>
  `;
};

window.showSpeedometerLive = function() {
  const container = document.getElementById('speedometerDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Live Animated Demo</h3>
      <p>Real-time animated speedometers with automatic value updates.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-top: 30px; justify-items: center;">
        <div style="text-align: center;">
          <h4>Network Speed</h4>
          <ui-speedometer 
            id="liveSpeed" 
            value="0" 
            max-value="100" 
            unit="Mbps" 
            label="Download"
          ></ui-speedometer>
        </div>

        <div style="text-align: center;">
          <h4>CPU Usage</h4>
          <ui-speedometer 
            id="liveCPU" 
            value="0" 
            max-value="100" 
            unit="%" 
            label="CPU"
          ></ui-speedometer>
        </div>

        <div style="text-align: center;">
          <h4>Memory Usage</h4>
          <ui-speedometer 
            id="liveMemory" 
            value="0" 
            max-value="100" 
            unit="%" 
            label="RAM"
          ></ui-speedometer>
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <button id="startLiveBtn" onclick="startLiveDemo()" style="padding: 10px 24px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; margin: 0 5px;">Start</button>
        <button onclick="stopLiveDemo()" style="padding: 10px 24px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; margin: 0 5px;">Stop</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const liveCPU = document.getElementById('liveCPU');
    if (liveCPU) {
      liveCPU.ranges = JSON.stringify([
        { min: 0, max: 50, color: '#10b981' },
        { min: 50, max: 80, color: '#f59e0b' },
        { min: 80, max: 100, color: '#ef4444' }
      ]);
    }

    const liveMemory = document.getElementById('liveMemory');
    if (liveMemory) {
      liveMemory.ranges = JSON.stringify([
        { min: 0, max: 60, color: '#10b981' },
        { min: 60, max: 85, color: '#f59e0b' },
        { min: 85, max: 100, color: '#ef4444' }
      ]);
    }
  }, 100);

  let liveInterval;

  window.startLiveDemo = function() {
    const liveSpeed = document.getElementById('liveSpeed');
    const liveCPU = document.getElementById('liveCPU');
    const liveMemory = document.getElementById('liveMemory');

    liveInterval = setInterval(() => {
      if (liveSpeed) liveSpeed.value = Math.random() * 100;
      if (liveCPU) liveCPU.value = 30 + Math.random() * 60;
      if (liveMemory) liveMemory.value = 40 + Math.random() * 50;
    }, 2000);
  };

  window.stopLiveDemo = function() {
    if (liveInterval) {
      clearInterval(liveInterval);
    }
  };
};

window.showSpeedometerPlayground = function() {
  const container = document.getElementById('speedometerDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>🎮 Interactive Playground</h3>
      <p>Customize and experiment with speedometer properties.</p>
      
      <div style="display: grid; grid-template-columns: 350px 1fr; gap: 30px; margin-top: 30px;">
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; height: fit-content;">
          <h4 style="margin-top: 0;">Configuration</h4>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Value</label>
            <input type="range" id="playValue" min="0" max="100" value="65" oninput="updatePlayground()" style="width: 100%;">
            <span id="playValueDisplay" style="font-size: 13px; color: #6b7280;">65</span>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Size</label>
            <input type="range" id="playSize" min="150" max="320" value="220" oninput="updatePlayground()" style="width: 100%;">
            <span id="playSizeDisplay" style="font-size: 13px; color: #6b7280;">220px</span>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Max Value</label>
            <input type="number" id="playMaxValue" value="100" oninput="updatePlayground()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Unit</label>
            <input type="text" id="playUnit" value="%" oninput="updatePlayground()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Label</label>
            <input type="text" id="playLabel" value="Progress" oninput="updatePlayground()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
              <input type="checkbox" id="playShowTicks" checked onchange="updatePlayground()" style="width: 16px; height: 16px;">
              <span>Show Ticks</span>
            </label>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
              <input type="checkbox" id="playShowPercentage" onchange="updatePlayground()" style="width: 16px; height: 16px;">
              <span>Show as Percentage</span>
            </label>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Animation Duration (ms)</label>
            <input type="number" id="playAnimation" value="1000" oninput="updatePlayground()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Needle Color</label>
            <input type="color" id="playNeedleColor" value="#1f2937" oninput="updatePlayground()" style="width: 100%; height: 40px; border: 1px solid #d1d5db; border-radius: 4px;">
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: center;">
          <ui-speedometer id="playgroundSpeedometer"></ui-speedometer>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    updatePlayground();
  }, 100);
};

window.updatePlayground = function() {
  const value = parseInt(document.getElementById('playValue').value);
  const size = parseInt(document.getElementById('playSize').value);
  const maxValue = parseInt(document.getElementById('playMaxValue').value);
  const unit = document.getElementById('playUnit').value;
  const label = document.getElementById('playLabel').value;
  const showTicks = document.getElementById('playShowTicks').checked;
  const showPercentage = document.getElementById('playShowPercentage').checked;
  const animationDuration = parseInt(document.getElementById('playAnimation').value);
  const needleColor = document.getElementById('playNeedleColor').value;

  document.getElementById('playValueDisplay').textContent = value;
  document.getElementById('playSizeDisplay').textContent = size + 'px';

  const speedometer = document.getElementById('playgroundSpeedometer');
  if (speedometer) {
    speedometer.value = value;
    speedometer.size = size;
    speedometer.maxValue = maxValue;
    speedometer.unit = unit;
    speedometer.label = label;
    speedometer.showTicks = showTicks;
    speedometer.showPercentage = showPercentage;
    speedometer.animationDuration = animationDuration;
    speedometer.needleColor = needleColor;
    
    speedometer.ranges = JSON.stringify([
      { min: 0, max: maxValue * 0.5, color: '#10b981' },
      { min: maxValue * 0.5, max: maxValue * 0.8, color: '#f59e0b' },
      { min: maxValue * 0.8, max: maxValue, color: '#ef4444' }
    ]);
  }
};
