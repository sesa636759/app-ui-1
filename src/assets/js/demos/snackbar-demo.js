// Snackbar Demo Functions
export function initSnackbarDemo() {
  const section = document.getElementById('snackbar');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📨 Snackbar Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Toast notifications for displaying messages to users.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicSnackbars()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic Types</button>
      <button onclick="showVariantSnackbars()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Variants</button>
      <button onclick="showSizeSnackbars()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showActionSnackbar()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">With Action</button>
      <button onclick="showInteractiveSnackbar()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <ui-snackbar id="demoSnackbar" position="bottom-center"></ui-snackbar>
  `;

  setTimeout(() => {
    const snackbar = document.getElementById('demoSnackbar');

    window.showBasicSnackbars = function () {
      snackbar.add({
        type: 'success',
        message: 'Operation completed successfully!'
      });
      setTimeout(() => snackbar.add({
        type: 'error',
        message: 'An error occurred. Please try again.'
      }), 300);
      setTimeout(() => snackbar.add({
        type: 'warning',
        message: 'Warning: This action cannot be undone.'
      }), 600);
      setTimeout(() => snackbar.add({
        type: 'info',
        message: 'New feature available! Check it out.'
      }), 900);
    };

    window.showVariantSnackbars = function () {
      snackbar.add({
        type: 'success',
        message: 'Filled variant (default)',
        variant: 'filled'
      });
      setTimeout(() => snackbar.add({
        type: 'info',
        message: 'Outlined variant with border',
        variant: 'outlined'
      }), 300);
      setTimeout(() => snackbar.add({
        type: 'warning',
        message: 'Soft variant with light background',
        variant: 'soft'
      }), 600);
    };

    window.showSizeSnackbars = function () {
      snackbar.add({
        type: 'info',
        message: 'Small size - compact notification',
        size: 'sm'
      });
      setTimeout(() => snackbar.add({
        type: 'success',
        message: 'Medium size - default notification',
        size: 'md'
      }), 300);
      setTimeout(() => snackbar.add({
        type: 'warning',
        message: 'Large size - spacious notification with more content',
        size: 'lg'
      }), 600);
    };

  window.showActionSnackbar = function () {
    snackbar.add({
      type: 'success',
      message: 'File uploaded successfully!',
      link: {
        text: 'View File',
        url: '#files'
      }
    });
  };

  window.showInteractiveSnackbar = function() {
    const section = document.getElementById('snackbar');
    if (!section) return;

    section.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h2 style="margin: 0;">📨 Snackbar Component</h2>
        <button onclick="showSection('home')"
          style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
          Back to Home</button>
      </div>
      <p>Toast notifications for displaying messages to users.</p>

      <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
        <button onclick="initSnackbarDemo()" style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">← Back to Demos</button>
      </div>

      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the snackbar properties and trigger notifications!</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
          <h4 style="margin: 0 0 16px;">Message Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Message:</span>
              <input type="text" id="snackbarMessage" value="This is a test message!" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Type:</span>
              <select id="snackbarType" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info" selected>Info</option>
              </select>
            </label>

            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Variant:</span>
              <select id="snackbarVariant" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="filled" selected>Filled</option>
                <option value="outlined">Outlined</option>
                <option value="soft">Soft</option>
              </select>
            </label>

            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Size:</span>
              <select id="snackbarSize" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="sm">Small</option>
                <option value="md" selected>Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Position:</span>
              <select id="snackbarPositionCtrl" onchange="updateSnackbarPosition()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="top-left">Top Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center" selected>Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Animation:</span>
              <select id="snackbarAnimation" onchange="updateSnackbarAnimation()" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="slide-down" selected>Slide Down</option>
                <option value="slide-up">Slide Up</option>
                <option value="fade">Fade</option>
                <option value="scale">Scale</option>
                <option value="bounce">Bounce</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Max Visible:</span>
              <input type="number" id="snackbarMaxVisibleCtrl" value="3" min="1" max="10" onchange="updateSnackbarMaxVisible()"
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="snackbarWithLink" style="cursor: pointer;">
              <span>Add Action Link</span>
            </label>
          </div>
          
          <button onclick="triggerInteractiveSnackbar()" 
            style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
            Show Snackbar
          </button>
          <button onclick="showMultipleInteractiveSnackbars()" 
            style="margin-left: 10px; padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
            Show 3 Stacked
          </button>
          <button onclick="clearAllInteractiveSnackbars()" 
            style="margin-left: 10px; padding: 10px 20px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
            Clear All
          </button>
        </div>
        
        <div style="margin-top: 12px; padding: 12px; background-color: #eff6ff; border-radius: 6px; border: 1px solid #bfdbfe;">
          <p style="margin: 0; font-size: 13px; color: #1e40af;">
            💡 <strong>Tip:</strong> Configure the snackbar settings above and click "Show Snackbar" to see the result!
          </p>
        </div>
      </div>

      <ui-snackbar id="interactiveSnackbar" position="bottom-center" max-visible="3"></ui-snackbar>
    `;

    setTimeout(() => {
      const interactiveSnackbar = document.getElementById('interactiveSnackbar');
      
      window.triggerInteractiveSnackbar = function() {
        const message = document.getElementById('snackbarMessage')?.value || 'Test message';
        const type = document.getElementById('snackbarType')?.value || 'info';
        const variant = document.getElementById('snackbarVariant')?.value || 'filled';
        const size = document.getElementById('snackbarSize')?.value || 'md';
        const withLink = document.getElementById('snackbarWithLink')?.checked || false;
        
        const snackbarConfig = {
          type: type,
          message: message,
          variant: variant,
          size: size
        };
        
        if (withLink) {
          snackbarConfig.link = {
            text: 'Take Action',
            url: '#action'
          };
        }
        
        interactiveSnackbar.add(snackbarConfig);
      };
      
      window.showMultipleInteractiveSnackbars = function() {
        const messages = [
          { type: 'success', message: 'First notification!', variant: 'filled', size: 'sm' },
          { type: 'info', message: 'Second notification!', variant: 'outlined', size: 'md' },
          { type: 'warning', message: 'Third notification!', variant: 'soft', size: 'lg' }
        ];
        
        messages.forEach((msg, index) => {
          setTimeout(() => {
            interactiveSnackbar.add(msg);
          }, index * 300);
        });
      };
      
      window.updateSnackbarPosition = function() {
        const position = document.getElementById('snackbarPositionCtrl')?.value || 'bottom-center';
        interactiveSnackbar.position = position;
      };
      
      window.updateSnackbarAnimation = function() {
        const animation = document.getElementById('snackbarAnimation')?.value || 'slide-down';
        interactiveSnackbar.openMode = animation;
      };
      
      window.updateSnackbarMaxVisible = function() {
        const maxVisible = parseInt(document.getElementById('snackbarMaxVisibleCtrl')?.value) || 3;
        interactiveSnackbar.maxVisible = maxVisible;
      };
      
      window.clearAllInteractiveSnackbars = function() {
        interactiveSnackbar.closeAll();
      };
      
      interactiveSnackbar.addEventListener('snackbarLinkClicked', (e) => {
        console.log('Snackbar link clicked:', e.detail);
        alert(`Link clicked: ${e.detail.link.text}`);
      });
    }, 100);
  };

  window.showSnackbarWithLink = function () {
    snackbar.add({
      type: 'info',
      message: 'Your profile has been updated.',
      link: {
        text: 'View Profile',
        url: '#profile'
      }
    });
  };

  window.showMultipleSnackbars = function () {
    const messages = [
      { type: 'success', message: 'File uploaded successfully!' },
      { type: 'info', message: 'Processing your request...' },
      { type: 'warning', message: 'Low disk space detected.' }
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        snackbar.add(msg);
      }, index * 500);
    });
  };

  window.clearAllSnackbars = function () {
    snackbar.closeAll();
  };

  window.changeSnackbarPosition = function () {
    const position = document.getElementById('snackbarPosition').value;
    snackbar.position = position;
  };

  window.changeSnackbarOpenMode = function () {
    const openMode = document.getElementById('snackbarOpenMode').value;
    snackbar.openMode = openMode;
  };

  window.changeSnackbarMaxVisible = function () {
    const maxVisible = parseInt(document.getElementById('snackbarMaxVisible').value);
    snackbar.maxVisible = maxVisible;
  };

  window.setPreset = function (openMode, position) {
    document.getElementById('snackbarOpenMode').value = openMode;
    document.getElementById('snackbarPosition').value = position;
    snackbar.openMode = openMode;
    snackbar.position = position;

    // Show a test snackbar with the new settings
    setTimeout(() => {
      snackbar.add({
        type: 'info',
        message: `Testing ${openMode} animation at ${position}!`
      });
    }, 100);
  };

  // Listen to snackbar events
  snackbar.addEventListener('snackbarClosed', (e) => {
    console.log('Snackbar closed:', e.detail);
  });

  snackbar.addEventListener('snackbarLinkClicked', (e) => {
    console.log('Snackbar link clicked:', e.detail);
    alert(`Link clicked: ${e.detail.link.text} -> ${e.detail.link.url}`);
  });
  }, 100);
}
