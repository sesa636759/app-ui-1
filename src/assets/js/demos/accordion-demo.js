// Accordion Demo
export function initAccordionDemo() {
  const section = document.getElementById('accordion');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📑 Accordion Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Collapsible content sections with smooth animations.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicAccordion()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showMultipleAccordion()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Multiple Open</button>
      <button onclick="showNumberedAccordion()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">With Numbers</button>
      <button onclick="showIconAccordion()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">With Icons</button>
      <button onclick="showInteractiveAccordion()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="accordionDemoContainer" style="margin-top: 20px;"></div>
  `;

  // Initialize with basic accordion
  setTimeout(() => {
    window.showBasicAccordion = function() {
      const container = document.getElementById('accordionDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Basic Accordion</h3>
          <ui-accordion id="basicAccordion"></ui-accordion>
        </div>
      `;

      setTimeout(() => {
        const basicAccordion = document.getElementById('basicAccordion');
        if (basicAccordion) {
          basicAccordion.items = JSON.stringify([
            {
              id: 'item1',
              title: 'What is Stencil?',
              content: 'Stencil is a toolchain for building reusable, scalable Design Systems. It generates Web Components that can be used in any framework or no framework at all.',
              icon: 'ℹ️'
            },
            {
              id: 'item2',
              title: 'Why use Web Components?',
              content: '<ul style="margin:0;"><li>Web Components standard</li><li>TypeScript support</li><li>Framework agnostic</li><li>Lazy loading</li><li>Pre-rendering</li></ul>',
              icon: '⚡'
            },
            {
              id: 'item3',
              title: 'Getting Started',
              content: 'Install Stencil CLI with <code>npm init stencil</code> and choose a starter template. Then run <code>npm start</code> to begin development.',
              icon: '🚀'
            }
          ]);
          basicAccordion.defaultOpen = JSON.stringify(['item1']);
        }
      }, 50);
    };

    window.showMultipleAccordion = function() {
      const container = document.getElementById('accordionDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Multiple Open Mode</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Multiple sections can be open at the same time.</p>
          <ui-accordion id="multiAccordion" multiple="true"></ui-accordion>
        </div>
      `;

      setTimeout(() => {
        const multiAccordion = document.getElementById('multiAccordion');
        if (multiAccordion) {
          multiAccordion.items = JSON.stringify([
            {
              id: 'multi1',
              title: 'Design Tokens',
              content: 'Centralized design values for colors, spacing, typography, and more.',
              icon: '🎨'
            },
            {
              id: 'multi2',
              title: 'Component Library',
              content: 'Reusable UI components that maintain consistency across your application.',
              icon: '📦'
            },
            {
              id: 'multi3',
              title: 'Documentation',
              content: 'Comprehensive guides and API references for all components.',
              icon: '📚'
            },
            {
              id: 'multi4',
              title: 'Best Practices',
              content: 'Guidelines and patterns for building maintainable applications.',
              icon: '✨'
            }
          ]);
          multiAccordion.defaultOpen = JSON.stringify(['multi1', 'multi2']);
        }
      }, 50);
    };

    window.showNumberedAccordion = function() {
      const container = document.getElementById('accordionDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Accordion with Numbers</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Great for step-by-step instructions.</p>
          <ui-accordion id="numberedAccordion" show-numbers="true"></ui-accordion>
        </div>
      `;

      setTimeout(() => {
        const numberedAccordion = document.getElementById('numberedAccordion');
        if (numberedAccordion) {
          numberedAccordion.items = JSON.stringify([
            {
              id: 'step1',
              title: 'Step 1: Install',
              content: 'Run <code>npm install</code> to install all dependencies.',
              icon: '📥'
            },
            {
              id: 'step2',
              title: 'Step 2: Configure',
              content: 'Set up your configuration files and environment variables.',
              icon: '⚙️'
            },
            {
              id: 'step3',
              title: 'Step 3: Build',
              content: 'Execute <code>npm run build</code> to compile your project.',
              icon: '🔨'
            },
            {
              id: 'step4',
              title: 'Step 4: Deploy',
              content: 'Deploy your built application to your hosting platform.',
              icon: '🚀'
            }
          ]);
        }
      }, 50);
    };

    window.showIconAccordion = function() {
      const container = document.getElementById('accordionDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>Accordion with Custom Icons</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Each section has its own icon.</p>
          <ui-accordion id="iconAccordion"></ui-accordion>
        </div>
      `;

      setTimeout(() => {
        const iconAccordion = document.getElementById('iconAccordion');
        if (iconAccordion) {
          iconAccordion.items = JSON.stringify([
            {
              id: 'security',
              title: 'Security',
              content: 'End-to-end encryption, secure authentication, and data protection.',
              icon: '🔒'
            },
            {
              id: 'performance',
              title: 'Performance',
              content: 'Optimized for speed with lazy loading, code splitting, and caching.',
              icon: '⚡'
            },
            {
              id: 'accessibility',
              title: 'Accessibility',
              content: 'WCAG 2.1 compliant with full keyboard navigation and screen reader support.',
              icon: '♿'
            },
            {
              id: 'mobile',
              title: 'Mobile First',
              content: 'Responsive design that works seamlessly on all devices.',
              icon: '📱'
            }
          ]);
          iconAccordion.defaultOpen = JSON.stringify(['security']);
        }
      }, 50);
    };

    window.showInteractiveAccordion = function() {
      const container = document.getElementById('accordionDemoContainer');
      if (!container) return;
      
      container.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Try different settings and see changes in real-time!</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="accordionMultiple" style="cursor: pointer;">
                <span>Allow Multiple Open</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="accordionShowNumbers" style="cursor: pointer;">
                <span>Show Numbers</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="accordionDisabled" style="cursor: pointer;">
                <span>Disable All</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="accordionHideArrow" style="cursor: pointer;">
                <span>Hide Arrow</span>
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Animation Duration (ms):</span>
                <input type="number" id="accordionDuration" value="300" min="0" max="2000" step="100"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Animation Timing:</span>
                <select id="accordionTiming" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="ease" selected>Ease</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                  <option value="linear">Linear</option>
                </select>
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Arrow Icon (Collapsed):</span>
                <input type="text" id="accordionArrowCollapsed" value="▶" maxlength="3"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Arrow Icon (Expanded):</span>
                <input type="text" id="accordionArrowExpanded" value="▼" maxlength="3"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
            </div>
            <button onclick="updateInteractiveAccordion()" 
              style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Apply Changes
            </button>
          </div>
          
          <ui-accordion id="interactiveAccordion"></ui-accordion>
        </div>
      `;

      setTimeout(() => {
        const interactiveAccordion = document.getElementById('interactiveAccordion');
        if (interactiveAccordion) {
          interactiveAccordion.items = JSON.stringify([
            {
              id: 'item1',
              title: 'With Icon',
              content: 'This section has an icon. Icons can be emojis or any text character.',
              icon: '🎨',
              badge: 3
            },
            {
              id: 'item2',
              title: 'With Image',
              content: 'This section has an image instead of an icon.',
              image: 'https://via.placeholder.com/24',
              badge: 5
            },
            {
              id: 'item3',
              title: 'With Badge',
              content: 'This section shows a badge with a notification count.',
              icon: '📬',
              badge: 12
            },
            {
              id: 'item4',
              title: 'Disabled Item',
              content: 'This section is disabled and cannot be toggled.',
              icon: '🔒',
              disabled: true
            }
          ]);
          interactiveAccordion.defaultOpen = JSON.stringify(['item1']);
        }

        window.updateInteractiveAccordion = function() {
          const accordion = document.getElementById('interactiveAccordion');
          const isMultiple = document.getElementById('accordionMultiple').checked;
          const showNumbers = document.getElementById('accordionShowNumbers').checked;
          const isDisabled = document.getElementById('accordionDisabled').checked;
          const hideArrow = document.getElementById('accordionHideArrow').checked;
          const duration = document.getElementById('accordionDuration').value;
          const timing = document.getElementById('accordionTiming').value;
          const arrowCollapsed = document.getElementById('accordionArrowCollapsed').value;
          const arrowExpanded = document.getElementById('accordionArrowExpanded').value;

          if (accordion) {
            // Update attributes
            accordion.setAttribute('multiple', isMultiple);
            accordion.setAttribute('show-numbers', showNumbers);
            accordion.setAttribute('disabled', isDisabled);
            accordion.setAttribute('hide-arrow', hideArrow);
            accordion.setAttribute('animation-duration', duration);
            accordion.setAttribute('animation-timing', timing);
            accordion.setAttribute('arrow-icon-collapsed', arrowCollapsed);
            accordion.setAttribute('arrow-icon-expanded', arrowExpanded);

            // Keep current items
            accordion.items = JSON.stringify([
              {
                id: 'item1',
                title: 'With Icon',
                content: 'This section has an icon. Icons can be emojis or any text character.',
                icon: '🎨',
                badge: 3
              },
              {
                id: 'item2',
                title: 'With Image',
                content: 'This section has an image instead of an icon.',
                image: 'https://via.placeholder.com/24',
                badge: 5
              },
              {
                id: 'item3',
                title: 'With Badge',
                content: 'This section shows a badge with a notification count.',
                icon: '📬',
                badge: 12
              },
              {
                id: 'item4',
                title: 'Disabled Item',
                content: 'This section is disabled and cannot be toggled.',
                icon: '🔒',
                disabled: true
              }
            ]);
          }
        };
      }, 50);
    };

    showBasicAccordion();
  }, 100);
}
