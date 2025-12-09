// Anchor Component Demo
export function initAnchorDemo() {
  const section = document.getElementById('anchor');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">⚓ Anchor Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Smooth scrolling navigation links with active indicator. Perfect for documentation pages and long content.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showVerticalAnchor()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Vertical</button>
      <button onclick="showHorizontalAnchor()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Horizontal</button>
      <button onclick="showDocumentationAnchor()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Documentation Style</button>
      <button onclick="showInteractiveAnchor()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="anchorDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    showVerticalAnchor();
  }, 100);
}

// Vertical Anchor Demo
window.showVerticalAnchor = function() {
  const container = document.getElementById('anchorDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Vertical Anchor Navigation</h3>
      <p>Classic vertical navigation with active indicator line.</p>
      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 40px; margin-top: 30px; min-height: 600px;">
        <div style="position: sticky; top: 20px; height: fit-content;">
          <ui-anchor id="verticalAnchor"></ui-anchor>
        </div>

        <div>
          <div id="v-intro" style="padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-bottom: 30px; min-height: 300px;">
            <h3 style="color: white; margin-top: 0;">🚀 Introduction</h3>
            <p>Welcome to the Anchor component documentation. This component provides smooth scrolling navigation with automatic active state tracking.</p>
            <ul style="margin-top: 20px; line-height: 1.8;">
              <li>Automatic scroll position tracking</li>
              <li>Smooth scroll behavior</li>
              <li>Customizable active indicator</li>
              <li>Support for vertical and horizontal layouts</li>
            </ul>
          </div>

          <div id="v-features" style="padding: 30px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; margin-bottom: 30px; min-height: 300px;">
            <h3 style="color: white; margin-top: 0;">✨ Features</h3>
            <p>The anchor component comes with powerful features:</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
              <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px;">
                <strong>Auto Tracking</strong>
                <p style="margin: 5px 0 0; font-size: 14px;">Automatically highlights the active section</p>
              </div>
              <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px;">
                <strong>Smooth Scroll</strong>
                <p style="margin: 5px 0 0; font-size: 14px;">Native smooth scrolling animation</p>
              </div>
              <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px;">
                <strong>Customizable</strong>
                <p style="margin: 5px 0 0; font-size: 14px;">Multiple configuration options</p>
              </div>
            </div>
          </div>

          <div id="v-usage" style="padding: 30px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; margin-bottom: 30px; min-height: 300px;">
            <h3 style="color: white; margin-top: 0;">📖 Usage</h3>
            <p>Implementing the anchor component is straightforward:</p>
            <pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; overflow-x: auto; margin-top: 15px;"><code>&lt;ui-anchor
  links='[{"id":"1","label":"Section 1","target":"section1"}]'
  orientation="vertical"
  scroll-offset="80"
  show-indicator="true"
&gt;&lt;/ui-anchor&gt;</code></pre>
          </div>

          <div id="v-api" style="padding: 30px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1f2937; border-radius: 12px; margin-bottom: 30px; min-height: 300px;">
            <h3 style="margin-top: 0;">🔧 API Reference</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; background: white; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: rgba(0,0,0,0.05);">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Property</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Type</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><code>links</code></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">string (JSON)</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">[]</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><code>orientation</code></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">vertical | horizontal</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">vertical</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><code>scrollOffset</code></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">number</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">80</td>
                </tr>
                <tr>
                  <td style="padding: 10px;"><code>showIndicator</code></td>
                  <td style="padding: 10px;">boolean</td>
                  <td style="padding: 10px;">true</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const anchor = document.getElementById('verticalAnchor');
    if (anchor) {
      anchor.links = JSON.stringify([
        { id: 'link1', label: '🚀 Introduction', target: 'v-intro' },
        { id: 'link2', label: '✨ Features', target: 'v-features' },
        { id: 'link3', label: '📖 Usage', target: 'v-usage' },
        { id: 'link4', label: '🔧 API Reference', target: 'v-api' }
      ]);
      anchor.orientation = 'vertical';
      anchor.scrollOffset = 100;
      anchor.showIndicator = true;
    }
  }, 200);
};

// Horizontal Anchor Demo
window.showHorizontalAnchor = function() {
  const container = document.getElementById('anchorDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Horizontal Anchor Navigation</h3>
      <p>Horizontal tab-style navigation for content sections.</p>
      <div style="margin-top: 30px;">
        <div style="position: sticky; top: 0; background: white; z-index: 10; padding: 15px 0; border-bottom: 2px solid #e5e7eb; margin-bottom: 30px;">
          <ui-anchor id="horizontalAnchor" orientation="horizontal"></ui-anchor>
        </div>

        <div>
          <div id="h-overview" style="padding: 40px; background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); border-radius: 12px; margin-bottom: 30px; min-height: 400px;">
            <h3 style="margin-top: 0;">📊 Overview</h3>
            <p style="font-size: 18px; line-height: 1.8;">The horizontal orientation is perfect for tab-like navigation at the top of your content sections.</p>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px;">
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="font-size: 32px; margin-bottom: 10px;">🎯</div>
                <strong>Precise</strong>
                <p style="margin: 5px 0 0; color: #6b7280;">Accurate scroll tracking</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="font-size: 32px; margin-bottom: 10px;">⚡</div>
                <strong>Fast</strong>
                <p style="margin: 5px 0 0; color: #6b7280;">Optimized performance</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="font-size: 32px; margin-bottom: 10px;">🎨</div>
                <strong>Flexible</strong>
                <p style="margin: 5px 0 0; color: #6b7280;">Highly customizable</p>
              </div>
            </div>
          </div>

          <div id="h-implementation" style="padding: 40px; background: linear-gradient(to right, #a8edea 0%, #fed6e3 100%); border-radius: 12px; margin-bottom: 30px; min-height: 400px;">
            <h3 style="margin-top: 0;">💻 Implementation</h3>
            <p style="font-size: 18px; line-height: 1.8;">Simple to integrate with any content structure.</p>
            <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h4>Step 1: Add the component</h4>
              <pre style="background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; overflow-x: auto;"><code>&lt;ui-anchor orientation="horizontal" links='...'&gt;&lt;/ui-anchor&gt;</code></pre>
              <h4 style="margin-top: 20px;">Step 2: Define your sections</h4>
              <pre style="background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; overflow-x: auto;"><code>&lt;div id="section1"&gt;Content&lt;/div&gt;</code></pre>
            </div>
          </div>

          <div id="h-customization" style="padding: 40px; background: linear-gradient(to right, #ff9a9e 0%, #fecfef 100%); border-radius: 12px; margin-bottom: 30px; min-height: 400px;">
            <h3 style="margin-top: 0;">🎨 Customization</h3>
            <p style="font-size: 18px; line-height: 1.8;">Customize appearance and behavior to match your design.</p>
            <div style="display: flex; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <strong style="color: #8b5cf6;">Scroll Offset</strong>
                <p style="margin: 10px 0 0; color: #6b7280;">Adjust the offset from top when scrolling to sections</p>
              </div>
              <div style="flex: 1; min-width: 200px; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <strong style="color: #f59e0b;">Active Indicator</strong>
                <p style="margin: 10px 0 0; color: #6b7280;">Show or hide the active link indicator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const anchor = document.getElementById('horizontalAnchor');
    if (anchor) {
      anchor.links = JSON.stringify([
        { id: 'h-link1', label: '📊 Overview', target: 'h-overview' },
        { id: 'h-link2', label: '💻 Implementation', target: 'h-implementation' },
        { id: 'h-link3', label: '🎨 Customization', target: 'h-customization' }
      ]);
      anchor.orientation = 'horizontal';
      anchor.scrollOffset = 100;
      anchor.showIndicator = true;
    }
  }, 200);
};

// Documentation Style Demo
window.showDocumentationAnchor = function() {
  const container = document.getElementById('anchorDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Documentation Style Navigation</h3>
      <p>Professional documentation layout with sidebar navigation.</p>
      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 30px; margin-top: 30px; background: #f9fafb; padding: 30px; border-radius: 12px;">
        <div style="position: sticky; top: 20px; height: fit-content; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h4 style="margin: 0 0 15px 0; color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Table of Contents</h4>
          <ui-anchor id="docsAnchor"></ui-anchor>
        </div>

        <div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div id="doc-getting-started" style="margin-bottom: 50px; min-height: 350px;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Getting Started</h2>
            <p style="color: #4b5563; line-height: 1.8; margin-top: 20px;">The Anchor component is a powerful navigation tool that automatically tracks scroll position and provides smooth scrolling to content sections.</p>
            
            <h3 style="color: #1f2937; margin-top: 30px;">Installation</h3>
            <pre style="background: #1f2937; color: #10b981; padding: 20px; border-radius: 6px; overflow-x: auto;"><code>npm install @your-org/ui-library</code></pre>
            
            <h3 style="color: #1f2937; margin-top: 30px;">Basic Import</h3>
            <pre style="background: #1f2937; color: #fbbf24; padding: 20px; border-radius: 6px; overflow-x: auto;"><code>import '@your-org/ui-library/anchor';</code></pre>
          </div>

          <div id="doc-props" style="margin-bottom: 50px; min-height: 350px;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Properties</h2>
            <p style="color: #4b5563; line-height: 1.8; margin-top: 20px;">Configure the anchor component using these properties:</p>
            
            <div style="margin-top: 25px;">
              <div style="border-left: 4px solid #3b82f6; padding: 15px 20px; background: #eff6ff; border-radius: 4px; margin-bottom: 15px;">
                <code style="color: #1e40af; font-weight: 600;">links</code>
                <span style="color: #6b7280; margin: 0 8px;">•</span>
                <span style="color: #059669;">string (JSON array)</span>
                <p style="margin: 10px 0 0; color: #4b5563;">Array of navigation links with id, label, and target properties.</p>
              </div>
              
              <div style="border-left: 4px solid #10b981; padding: 15px 20px; background: #f0fdf4; border-radius: 4px; margin-bottom: 15px;">
                <code style="color: #065f46; font-weight: 600;">orientation</code>
                <span style="color: #6b7280; margin: 0 8px;">•</span>
                <span style="color: #059669;">'vertical' | 'horizontal'</span>
                <p style="margin: 10px 0 0; color: #4b5563;">Layout direction of the navigation links.</p>
              </div>
              
              <div style="border-left: 4px solid #f59e0b; padding: 15px 20px; background: #fffbeb; border-radius: 4px; margin-bottom: 15px;">
                <code style="color: #92400e; font-weight: 600;">scrollOffset</code>
                <span style="color: #6b7280; margin: 0 8px;">•</span>
                <span style="color: #059669;">number</span>
                <p style="margin: 10px 0 0; color: #4b5563;">Offset in pixels from top when scrolling to sections.</p>
              </div>
              
              <div style="border-left: 4px solid #8b5cf6; padding: 15px 20px; background: #f5f3ff; border-radius: 4px;">
                <code style="color: #5b21b6; font-weight: 600;">showIndicator</code>
                <span style="color: #6b7280; margin: 0 8px;">•</span>
                <span style="color: #059669;">boolean</span>
                <p style="margin: 10px 0 0; color: #4b5563;">Display or hide the active link indicator.</p>
              </div>
            </div>
          </div>

          <div id="doc-events" style="margin-bottom: 50px; min-height: 350px;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Events</h2>
            <p style="color: #4b5563; line-height: 1.8; margin-top: 20px;">Listen to these events for custom behavior:</p>
            
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 20px;">
              <h4 style="margin: 0 0 10px 0; color: #1f2937;">anchorClick</h4>
              <p style="color: #6b7280; margin: 0 0 15px 0;">Emitted when a navigation link is clicked.</p>
              <pre style="background: #1f2937; color: #a78bfa; padding: 15px; border-radius: 6px; overflow-x: auto;"><code>anchor.addEventListener('anchorClick', (event) => {
  console.log('Link:', event.detail.linkId);
  console.log('Target:', event.detail.targetId);
});</code></pre>
            </div>
          </div>

          <div id="doc-examples" style="margin-bottom: 50px; min-height: 350px;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Examples</h2>
            <p style="color: #4b5563; line-height: 1.8; margin-top: 20px;">Real-world usage examples:</p>
            
            <h3 style="color: #1f2937; margin-top: 30px;">📝 Blog Post Navigation</h3>
            <pre style="background: #1f2937; color: #e5e7eb; padding: 20px; border-radius: 6px; overflow-x: auto; margin-top: 15px;"><code>&lt;ui-anchor
  links='[
    {"id":"intro","label":"Introduction","target":"intro-section"},
    {"id":"main","label":"Main Content","target":"main-section"},
    {"id":"conclusion","label":"Conclusion","target":"conclusion-section"}
  ]'
  orientation="vertical"
  scroll-offset="100"
&gt;&lt;/ui-anchor&gt;</code></pre>

            <h3 style="color: #1f2937; margin-top: 30px;">📚 Documentation Sidebar</h3>
            <pre style="background: #1f2937; color: #e5e7eb; padding: 20px; border-radius: 6px; overflow-x: auto; margin-top: 15px;"><code>&lt;ui-anchor
  links='[
    {"id":"api","label":"API Reference","target":"api"},
    {"id":"guide","label":"Guide","target":"guide"},
    {"id":"examples","label":"Examples","target":"examples"}
  ]'
  show-indicator="true"
&gt;&lt;/ui-anchor&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const anchor = document.getElementById('docsAnchor');
    if (anchor) {
      anchor.links = JSON.stringify([
        { id: 'doc1', label: 'Getting Started', target: 'doc-getting-started' },
        { id: 'doc2', label: 'Properties', target: 'doc-props' },
        { id: 'doc3', label: 'Events', target: 'doc-events' },
        { id: 'doc4', label: 'Examples', target: 'doc-examples' }
      ]);
      anchor.orientation = 'vertical';
      anchor.scrollOffset = 100;
      anchor.showIndicator = true;
    }
  }, 200);
};

// Interactive Playground
window.showInteractiveAnchor = function() {
  const container = document.getElementById('anchorDemoContainer');
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
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Orientation:</label>
              <select id="anchorOrientation" onchange="updateInteractiveAnchor()" 
                style="width: 100%; padding: 10px; border: 2px solid #d1d5db; border-radius: 6px; cursor: pointer; background: white; font-size: 14px;">
                <option value="vertical" selected>Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">
                Scroll Offset: <span id="offsetValue" style="color: #3b82f6;">80</span>px
              </label>
              <input type="range" id="anchorScrollOffset" value="80" min="0" max="200" step="10" 
                oninput="document.getElementById('offsetValue').textContent = this.value; updateInteractiveAnchor()"
                style="width: 100%; cursor: pointer;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; color: #9ca3af; margin-top: 5px;">
                <span>0</span>
                <span>200</span>
              </div>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <input type="checkbox" id="anchorShowIndicator" checked onchange="updateInteractiveAnchor()" 
                  style="cursor: pointer; width: 18px; height: 18px;">
                <span style="font-weight: 600; color: #374151;">Show Active Indicator</span>
              </label>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">
                Links Configuration (JSON):
              </label>
              <textarea id="anchorLinks" onchange="updateInteractiveAnchor()" 
                style="width: 100%; padding: 12px; border: 2px solid #d1d5db; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 13px; min-height: 200px; background: white; resize: vertical;">[
  {
    "id": "link1",
    "label": "🎯 Overview",
    "target": "p-section1"
  },
  {
    "id": "link2",
    "label": "💡 Features",
    "target": "p-section2"
  },
  {
    "id": "link3",
    "label": "📝 Details",
    "target": "p-section3"
  },
  {
    "id": "link4",
    "label": "🚀 Summary",
    "target": "p-section4"
  }
]</textarea>
              <p style="margin: 8px 0 0; font-size: 12px; color: #6b7280;">
                💡 Tip: Each link needs <code style="background: #e5e7eb; padding: 2px 4px; border-radius: 3px;">id</code>, 
                <code style="background: #e5e7eb; padding: 2px 4px; border-radius: 3px;">label</code>, and 
                <code style="background: #e5e7eb; padding: 2px 4px; border-radius: 3px;">target</code>
              </p>
            </div>

            <div id="anchorEventOutput" style="background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; display: none; margin-top: 10px;">
              <div style="color: #9ca3af; margin-bottom: 5px;">Event Log:</div>
              <div id="eventContent"></div>
            </div>
          </div>
        </div>
        
        <div style="background: #f9fafb; border-radius: 8px; border: 2px solid #e5e7eb; max-height: 700px; overflow-y: auto; position: relative;" id="scrollContainer">
          <div style="position: sticky; top: 0; background: white; z-index: 5; padding: 15px 20px; border-bottom: 2px solid #e5e7eb;">
            <h4 style="margin: 0; color: #1f2937;">👁️ Live Preview</h4>
          </div>
          
          <div id="playgroundPreviewContainer" style="padding: 20px;">
            <div style="margin-bottom: 20px;">
              <ui-anchor id="playgroundAnchor"></ui-anchor>
            </div>
            
            <div id="p-section1" style="padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; margin-bottom: 20px; min-height: 250px;">
              <h3 style="margin: 0 0 15px 0; color: white;">🎯 Overview Section</h3>
              <p style="line-height: 1.6;">This is the first section of your content. The anchor navigation will automatically track which section is currently visible and update the active indicator accordingly.</p>
              <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 6px; margin-top: 15px;">
                <strong>✨ Key Point:</strong> Scroll through the content to see the active state change automatically.
              </div>
            </div>
            
            <div id="p-section2" style="padding: 30px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 8px; margin-bottom: 20px; min-height: 250px;">
              <h3 style="margin: 0 0 15px 0; color: white;">💡 Features Section</h3>
              <p style="line-height: 1.6;">Explore the powerful features of the anchor component. It provides smooth scrolling with customizable offset and orientation options.</p>
              <ul style="line-height: 1.8; margin-top: 15px;">
                <li>Automatic scroll position tracking</li>
                <li>Smooth scroll animation</li>
                <li>Customizable active indicator</li>
                <li>Event emission on link clicks</li>
              </ul>
            </div>
            
            <div id="p-section3" style="padding: 30px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 8px; margin-bottom: 20px; min-height: 250px;">
              <h3 style="margin: 0 0 15px 0; color: white;">📝 Details Section</h3>
              <p style="line-height: 1.6;">This section contains detailed information. You can click on any anchor link to smoothly scroll to the corresponding section.</p>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
                <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 6px;">
                  <strong>Responsive</strong>
                  <p style="margin: 5px 0 0; font-size: 14px;">Works on all screen sizes</p>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 6px;">
                  <strong>Accessible</strong>
                  <p style="margin: 5px 0 0; font-size: 14px;">Keyboard navigation support</p>
                </div>
              </div>
            </div>
            
            <div id="p-section4" style="padding: 30px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1f2937; border-radius: 8px; margin-bottom: 20px; min-height: 250px;">
              <h3 style="margin: 0 0 15px 0;">🚀 Summary Section</h3>
              <p style="line-height: 1.6; color: #1f2937;">The anchor component is a powerful tool for improving navigation in content-heavy pages. Try modifying the configuration on the left to see real-time changes!</p>
              <div style="background: white; padding: 20px; border-radius: 6px; margin-top: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <strong style="color: #1f2937;">💡 Pro Tip:</strong>
                <p style="margin: 10px 0 0; color: #4b5563;">Use the scroll offset to account for fixed headers or other sticky elements in your layout.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    updateInteractiveAnchor();
  }, 200);
};

window.updateInteractiveAnchor = function() {
  const orientation = document.getElementById('anchorOrientation')?.value || 'vertical';
  const scrollOffset = parseInt(document.getElementById('anchorScrollOffset')?.value || '80');
  const showIndicator = document.getElementById('anchorShowIndicator')?.checked ?? true;
  const linksText = document.getElementById('anchorLinks')?.value || '[]';
  
  const anchor = document.getElementById('playgroundAnchor');
  const eventOutput = document.getElementById('anchorEventOutput');
  const eventContent = document.getElementById('eventContent');
  
  if (!anchor) return;
  
  try {
    const links = JSON.parse(linksText);
    
    anchor.setAttribute('orientation', orientation);
    anchor.setAttribute('scroll-offset', scrollOffset.toString());
    anchor.setAttribute('show-indicator', showIndicator.toString());
    anchor.links = JSON.stringify(links);
    
    // Remove old listener and add new one
    const newAnchor = anchor.cloneNode(true);
    anchor.parentNode.replaceChild(newAnchor, anchor);
    
    const finalAnchor = document.getElementById('playgroundAnchor');
    if (finalAnchor) {
      finalAnchor.addEventListener('anchorClick', (event) => {
        if (eventOutput && eventContent) {
          eventOutput.style.display = 'block';
          const timestamp = new Date().toLocaleTimeString();
          eventContent.innerHTML = `[${timestamp}] Clicked: ${event.detail.linkId} → ${event.detail.targetId}`;
          
          setTimeout(() => {
            eventOutput.style.display = 'none';
          }, 3000);
        }
      });
    }
    
    // Update container layout based on orientation
    const container = document.getElementById('playgroundPreviewContainer');
    if (container && orientation === 'horizontal') {
      container.style.display = 'block';
    } else if (container) {
      container.style.display = 'block';
    }
    
  } catch (error) {
    if (eventOutput && eventContent) {
      eventOutput.style.display = 'block';
      eventContent.style.color = '#ef4444';
      eventContent.textContent = `❌ Invalid JSON: ${error.message}`;
    }
  }
};


// Demo Functions
window.showBasicAnchor = function() {
  const container = document.getElementById('anchorDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 40px; margin-top: 30px;">
      <div style="position: sticky; top: 20px; height: fit-content;">
        <ui-anchor id="anchorNav"></ui-anchor>
      </div>

      <div>
        <div id="section1" style="min-height: 400px; padding: 30px; background: #f9fafb; border-radius: 8px; margin-bottom: 30px;">
          <h3>Section 1: Introduction</h3>
          <p>This is the first section of content. The anchor navigation automatically updates based on scroll position.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div id="section2" style="min-height: 400px; padding: 30px; background: #eff6ff; border-radius: 8px; margin-bottom: 30px;">
          <h3>Section 2: Features</h3>
          <p>Explore the key features and capabilities in this section.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div id="section3" style="min-height: 400px; padding: 30px; background: #f0fdf4; border-radius: 8px; margin-bottom: 30px;">
          <h3>Section 3: Usage</h3>
          <p>Learn how to use this component effectively.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>

        <div id="section4" style="min-height: 400px; padding: 30px; background: #fefce8; border-radius: 8px; margin-bottom: 30px;">
          <h3>Section 4: Examples</h3>
          <p>View practical examples and implementation details.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const anchor = document.getElementById('anchorNav');
    if (anchor) {
      anchor.links = JSON.stringify([
        { id: 'link1', label: 'Introduction', target: 'section1' },
        { id: 'link2', label: 'Features', target: 'section2' },
        { id: 'link3', label: 'Usage', target: 'section3' },
        { id: 'link4', label: 'Examples', target: 'section4' }
      ]);

      anchor.addEventListener('anchorClick', (e) => {
        console.log('Anchor clicked:', e.detail);
      });
    }
  }, 100);
};

// Interactive Playground Functions
window.showInteractiveAnchor = function() {
  const container = document.getElementById('anchorDemoContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Orientation:</label>
              <select id="anchorOrientation" onchange="updateInteractiveAnchor()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="vertical" selected>Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Scroll Offset (px):</label>
              <input type="number" id="anchorScrollOffset" value="80" min="0" max="200" onchange="updateInteractiveAnchor()"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="anchorShowIndicator" checked onchange="updateInteractiveAnchor()" style="cursor: pointer;">
              <label for="anchorShowIndicator" style="cursor: pointer;">Show Active Indicator</label>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Links (JSON):</label>
              <textarea id="anchorLinks" onchange="updateInteractiveAnchor()" 
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 150px;">[
  {"id": "link1", "label": "Section 1", "target": "playgroundSection1"},
  {"id": "link2", "label": "Section 2", "target": "playgroundSection2"},
  {"id": "link3", "label": "Section 3", "target": "playgroundSection3"}
]</textarea>
            </div>
          </div>
        </div>
        
        <div style="flex: 2; min-width: 400px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; max-height: 600px; overflow-y: auto;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveAnchorContainer" style="display: grid; grid-template-columns: 200px 1fr; gap: 20px; margin-top: 20px;">
            <div style="position: sticky; top: 0;">
              <ui-anchor id="interactiveAnchorComponent"></ui-anchor>
            </div>
            <div>
              <div id="playgroundSection1" style="min-height: 200px; padding: 20px; background: #dbeafe; border-radius: 8px; margin-bottom: 20px;">
                <h4>Section 1</h4>
                <p>Content for section 1. Scroll to see the active indicator change.</p>
              </div>
              <div id="playgroundSection2" style="min-height: 200px; padding: 20px; background: #dcfce7; border-radius: 8px; margin-bottom: 20px;">
                <h4>Section 2</h4>
                <p>Content for section 2. The anchor automatically tracks scroll position.</p>
              </div>
              <div id="playgroundSection3" style="min-height: 200px; padding: 20px; background: #fef3c7; border-radius: 8px; margin-bottom: 20px;">
                <h4>Section 3</h4>
                <p>Content for section 3. Click links to smoothly scroll to sections.</p>
              </div>
            </div>
          </div>
          <div id="anchorOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
        </div>
      </div>
    </div>
  `;
  
  updateInteractiveAnchor();
};

window.updateInteractiveAnchor = function() {
  const orientation = document.getElementById('anchorOrientation').value;
  const scrollOffset = parseInt(document.getElementById('anchorScrollOffset').value);
  const showIndicator = document.getElementById('anchorShowIndicator').checked;
  const linksText = document.getElementById('anchorLinks').value;
  
  const anchor = document.getElementById('interactiveAnchorComponent');
  const outputDiv = document.getElementById('anchorOutput');
  
  if (!anchor) return;
  
  try {
    const links = JSON.parse(linksText);
    
    anchor.setAttribute('orientation', orientation);
    anchor.setAttribute('scroll-offset', scrollOffset.toString());
    anchor.setAttribute('show-indicator', showIndicator.toString());
    anchor.links = JSON.stringify(links);
    
    // Add event listener
    anchor.addEventListener('anchorClick', (event) => {
      if (outputDiv) {
        outputDiv.style.display = 'block';
        outputDiv.textContent = `Anchor clicked: ${JSON.stringify(event.detail)}`;
      }
    });
    
    if (outputDiv) {
      outputDiv.style.display = 'none';
    }
  } catch (error) {
    if (outputDiv) {
      outputDiv.style.display = 'block';
      outputDiv.style.color = '#ef4444';
      outputDiv.textContent = `Invalid JSON: ${error.message}`;
    }
  }
};
