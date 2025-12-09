// Dialog Demo
export function initDialogDemo() {
  const section = document.getElementById('dialog');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">💬 Dialog Box Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Modal dialogs with customizable headers, content, and footers.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicDialog()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showDialogSizes()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showDialogVariants()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Variants & Status</button>
      <button onclick="showDialogTypes()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Types</button>
      <button onclick="showFormDialog()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Form Dialog</button>
      <button onclick="showInteractiveDialog()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="dialogDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    const dialogContainer = document.getElementById('dialogDemoContainer');
    if (!dialogContainer) return;

    // Dialog helper functions
    window.openDialog = (id) => {
      const dialog = document.getElementById(id);
      if (dialog) dialog.show();
    };

    window.closeDialog = (id) => {
      const dialog = document.getElementById(id);
      if (dialog) dialog.hide();
    };

    window.showBasicDialog = function() {
      dialogContainer.innerHTML = `
        <div class="demo-block">
          <h3>Basic Dialog</h3>
          <button onclick="openDialog('basicDialog')" 
            style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Open Basic Dialog
          </button>

          <dialog-box id="basicDialog">
            <h3 slot="header">Welcome</h3>
            <div>
              <p>This is a basic dialog with header, content, and footer sections.</p>
              <p>You can customize each section as needed.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('basicDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Close
              </button>
              <button onclick="alert('Action confirmed!'); closeDialog('basicDialog');" 
                style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Confirm
              </button>
            </div>
          </dialog-box>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #f0f9ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 Dialogs can contain any content and are fully customizable.
            </p>
          </div>
          
          <div id="eventLog" style="margin-top: 16px; padding: 12px; background-color: #f3f4f6; border-radius: 6px; border: 1px solid #d1d5db;">
            <h4 style="margin: 0 0 8px; font-size: 14px; color: #374151;">Event Log:</h4>
            <div id="eventLogContent" style="font-family: monospace; font-size: 12px; color: #6b7280; max-height: 100px; overflow-y: auto;">
              <div style="color: #9ca3af;">Waiting for events...</div>
            </div>
          </div>
        </div>
      `;
      
      setTimeout(() => {
        const dialog = document.getElementById('basicDialog');
        if (dialog) {
          dialog.addEventListener('dialogClosed', () => {
            logEvent('dialogClosed: Dialog was closed');
          });
          dialog.addEventListener('dialogMaximized', (e) => {
            logEvent(`dialogMaximized: maximized=${e.detail.maximized}`);
          });
          dialog.addEventListener('dialogMinimized', (e) => {
            logEvent(`dialogMinimized: minimized=${e.detail.minimized}`);
          });
        }
      }, 100);
    };
    
    window.logEvent = function(message) {
      const logContent = document.getElementById('eventLogContent');
      if (logContent) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.style.color = '#059669';
        entry.textContent = `[${timestamp}] ${message}`;
        
        // Clear "waiting" message if present
        if (logContent.querySelector('[style*="color: #9ca3af"]')) {
          logContent.innerHTML = '';
        }
        
        logContent.insertBefore(entry, logContent.firstChild);
        
        // Limit to 5 entries
        while (logContent.children.length > 5) {
          logContent.removeChild(logContent.lastChild);
        }
      }
    };

    window.showDialogSizes = function() {
      dialogContainer.innerHTML = `
        <div class="demo-block">
          <h3>Dialog Sizes</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button onclick="openDialog('smallDialog')" 
              style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Small Dialog
            </button>
            <button onclick="openDialog('mediumDialog')" 
              style="padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Medium Dialog
            </button>
            <button onclick="openDialog('largeDialog')" 
              style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Large Dialog
            </button>
            <button onclick="openDialog('fullDialog')" 
              style="padding: 10px 20px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Full Width Dialog
            </button>
          </div>

          <dialog-box id="smallDialog" width="300px">
            <h3 slot="header">Small Dialog</h3>
            <div><p>This is a small dialog, perfect for quick confirmations.</p></div>
            <div slot="footer">
              <button onclick="closeDialog('smallDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
          </dialog-box>

          <dialog-box id="mediumDialog" width="500px">
            <h3 slot="header">Medium Dialog</h3>
            <div><p>This is a medium-sized dialog, the default size for most use cases.</p></div>
            <div slot="footer">
              <button onclick="closeDialog('mediumDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
          </dialog-box>

          <dialog-box id="largeDialog" width="800px">
            <h3 slot="header">Large Dialog</h3>
            <div>
              <p>This is a large dialog, suitable for forms or detailed content.</p>
              <p>It provides more space for complex interactions.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('largeDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
          </dialog-box>

          <dialog-box id="fullDialog" maximized="true">
            <h3 slot="header">Full Width Dialog</h3>
            <div><p>This dialog takes the full width of the screen.</p></div>
            <div slot="footer">
              <button onclick="closeDialog('fullDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
          </dialog-box>
        </div>
      `;
    };

    window.showDialogVariants = function() {
      dialogContainer.innerHTML = `
        <div class="demo-block">
          <h3>Dialog Variants & Status</h3>
          <p>Dialogs with outlined and filled variants, styled by status type.</p>
          
          <h4 style="margin-top: 24px; color: #374151;">Outlined Variant</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px;">
            <button onclick="openDialog('outlinedInfoDialog')" 
              style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Outlined Info
            </button>
            <button onclick="openDialog('outlinedSuccessDialog')" 
              style="padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Outlined Success
            </button>
            <button onclick="openDialog('outlinedWarningDialog')" 
              style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Outlined Warning
            </button>
            <button onclick="openDialog('outlinedErrorDialog')" 
              style="padding: 10px 20px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Outlined Error
            </button>
          </div>

          <h4 style="margin-top: 24px; color: #374151;">Filled Variant</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px;">
            <button onclick="openDialog('filledInfoDialog')" 
              style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Filled Info
            </button>
            <button onclick="openDialog('filledSuccessDialog')" 
              style="padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Filled Success
            </button>
            <button onclick="openDialog('filledWarningDialog')" 
              style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Filled Warning
            </button>
            <button onclick="openDialog('filledErrorDialog')" 
              style="padding: 10px 20px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Filled Error
            </button>
          </div>

          <!-- Outlined Variants -->
          <dialog-box id="outlinedInfoDialog" variant="outlined" status="info" dialog-title="Information">
            <div>
              <p>This is an informational dialog with outlined variant.</p>
              <p>The border color matches the info status.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('outlinedInfoDialog')" 
                style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Got it</button>
            </div>
          </dialog-box>

          <dialog-box id="outlinedSuccessDialog" variant="outlined" status="success" dialog-title="Success">
            <div>
              <p>Operation completed successfully!</p>
              <p>This uses the outlined variant with success status.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('outlinedSuccessDialog')" 
                style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
            </div>
          </dialog-box>

          <dialog-box id="outlinedWarningDialog" variant="outlined" status="warning" dialog-title="Warning">
            <div>
              <p>Please review this warning before continuing.</p>
              <p>The outlined variant with warning status provides clear visual feedback.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('outlinedWarningDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
              <button onclick="closeDialog('outlinedWarningDialog')" 
                style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;">Continue</button>
            </div>
          </dialog-box>

          <dialog-box id="outlinedErrorDialog" variant="outlined" status="error" dialog-title="Error">
            <div>
              <p>An error occurred while processing your request.</p>
              <p>The outlined variant with error status clearly indicates the issue.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('outlinedErrorDialog')" 
                style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
          </dialog-box>

          <!-- Filled Variants -->
          <dialog-box id="filledInfoDialog" variant="filled" status="info" dialog-title="Information">
            <div>
              <p>This is an informational dialog with filled variant.</p>
              <p>The background gradient and border accent create a cohesive look.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('filledInfoDialog')" 
                style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Got it</button>
            </div>
          </dialog-box>

          <dialog-box id="filledSuccessDialog" variant="filled" status="success" dialog-title="Success">
            <div>
              <p>Your action was completed successfully!</p>
              <p>The filled variant with success status uses a subtle gradient background.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('filledSuccessDialog')" 
                style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
            </div>
          </dialog-box>

          <dialog-box id="filledWarningDialog" variant="filled" status="warning" dialog-title="Warning">
            <div>
              <p>This is a warning message with filled variant.</p>
              <p>The warm gradient background emphasizes the warning nature.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('filledWarningDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
              <button onclick="closeDialog('filledWarningDialog')" 
                style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;">Continue</button>
            </div>
          </dialog-box>

          <dialog-box id="filledErrorDialog" variant="filled" status="error" dialog-title="Error">
            <div>
              <p>A critical error has occurred.</p>
              <p>The filled variant with error status uses a gradient to draw attention.</p>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('filledErrorDialog')" 
                style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
          </dialog-box>
        </div>
      `;
    };

    window.showDialogTypes = function() {
      dialogContainer.innerHTML = `
        <div class="demo-block">
          <h3>Dialog Types</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button onclick="openDialog('infoDialog')" 
              style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Info Dialog
            </button>
            <button onclick="openDialog('successDialog')" 
              style="padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Success Dialog
            </button>
            <button onclick="openDialog('warningDialog')" 
              style="padding: 10px 20px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Warning Dialog
            </button>
            <button onclick="openDialog('errorDialog')" 
              style="padding: 10px 20px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Error Dialog
            </button>
          </div>

          <dialog-box id="infoDialog">
            <h3 slot="header">ℹ️ Information</h3>
            <div><p>This is an informational message.</p></div>
            <div slot="footer">
              <button onclick="closeDialog('infoDialog')" 
                style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Got it</button>
            </div>
          </dialog-box>

          <dialog-box id="successDialog">
            <h3 slot="header">✓ Success</h3>
            <div><p>Operation completed successfully!</p></div>
            <div slot="footer">
              <button onclick="closeDialog('successDialog')" 
                style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
            </div>
          </dialog-box>

          <dialog-box id="warningDialog">
            <h3 slot="header">⚠️ Warning</h3>
            <div><p>Please review before continuing.</p></div>
            <div slot="footer">
              <button onclick="closeDialog('warningDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
              <button onclick="closeDialog('warningDialog')" 
                style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;">Continue</button>
            </div>
          </dialog-box>

          <dialog-box id="errorDialog">
            <h3 slot="header">✕ Error</h3>
            <div><p>An error occurred. Please try again.</p></div>
            <div slot="footer">
              <button onclick="closeDialog('errorDialog')" 
                style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
          </dialog-box>
        </div>
      `;
    };

    window.showFormDialog = function() {
      dialogContainer.innerHTML = `
        <div class="demo-block">
          <h3>Form Dialog</h3>
          <button onclick="openDialog('formDialog')" 
            style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Open Form Dialog
          </button>

          <dialog-box id="formDialog" width="600px">
            <h3 slot="header">User Information</h3>
            <div>
              <form id="userForm" style="display: flex; flex-direction: column; gap: 16px;">
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span>Name:</span>
                  <input type="text" name="name" placeholder="Enter your name" 
                    style="padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;" required>
                </label>
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span>Email:</span>
                  <input type="email" name="email" placeholder="Enter your email" 
                    style="padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;" required>
                </label>
                <label style="display: flex; flex-direction: column; gap: 4px;">
                  <span>Message:</span>
                  <textarea name="message" placeholder="Enter your message" rows="4" 
                    style="padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;"></textarea>
                </label>
              </form>
            </div>
            <div slot="footer">
              <button onclick="closeDialog('formDialog')" 
                style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
              <button onclick="handleFormSubmit(); closeDialog('formDialog');" 
                style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
            </div>
          </dialog-box>
        </div>
      `;
    };

    window.handleFormSubmit = function() {
      const form = document.getElementById('userForm');
      if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        alert(`Form submitted:\n${JSON.stringify(data, null, 2)}`);
      }
    };

    window.showInteractiveDialog = function() {
      dialogContainer.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Customize the dialog properties and see changes in real-time!</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <h4 style="margin: 0 0 16px;">Settings</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Variant:</span>
                <select id="dialogVariant" onchange="updateInteractiveDialog()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="outlined">Outlined</option>
                  <option value="filled">Filled</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Status:</span>
                <select id="dialogStatus" onchange="updateInteractiveDialog()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="default">Default</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Width:</span>
                <input type="text" id="dialogWidth" value="500px" oninput="updateInteractiveDialog()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Header Text:</span>
                <input type="text" id="dialogHeaderText" value="Interactive Dialog" oninput="updateInteractiveDialog()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span>Content Text:</span>
                <input type="text" id="dialogContentText" value="Customize this dialog using the controls above." oninput="updateInteractiveDialog()"
                  style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="dialogShowMinimize" checked onchange="updateInteractiveDialog()" style="cursor: pointer;">
                <span>Show Minimize</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="dialogShowMaximize" checked onchange="updateInteractiveDialog()" style="cursor: pointer;">
                <span>Show Maximize</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="dialogShowClose" checked onchange="updateInteractiveDialog()" style="cursor: pointer;">
                <span>Show Close</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="dialogShowHeader" checked onchange="updateInteractiveDialog()" style="cursor: pointer;">
                <span>Show Header</span>
              </label>
              
              <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
                <input type="checkbox" id="dialogShowFooter" checked onchange="updateInteractiveDialog()" style="cursor: pointer;">
                <span>Show Footer</span>
              </label>
            </div>
            
            <div style="margin-top: 16px;">
              <button onclick="openDialog('interactiveDialog')" 
                style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                Open Dialog
              </button>
            </div>
          </div>
          
          <div id="interactiveDialogContainer"></div>
          
          <div id="interactiveEventLog" style="margin-top: 16px; padding: 12px; background-color: #f3f4f6; border-radius: 6px; border: 1px solid #d1d5db;">
            <h4 style="margin: 0 0 8px; font-size: 14px; color: #374151;">Event Log:</h4>
            <div id="interactiveEventLogContent" style="font-family: monospace; font-size: 12px; color: #6b7280; max-height: 100px; overflow-y: auto;">
              <div style="color: #9ca3af;">Waiting for events...</div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        updateInteractiveDialog();
      }, 50);
    };
    
    window.logInteractiveEvent = function(message) {
      const logContent = document.getElementById('interactiveEventLogContent');
      if (logContent) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.style.color = '#059669';
        entry.textContent = `[${timestamp}] ${message}`;
        
        // Clear "waiting" message if present
        if (logContent.querySelector('[style*="color: #9ca3af"]')) {
          logContent.innerHTML = '';
        }
        
        logContent.insertBefore(entry, logContent.firstChild);
        
        // Limit to 5 entries
        while (logContent.children.length > 5) {
          logContent.removeChild(logContent.lastChild);
        }
      }
    };

    window.updateInteractiveDialog = function() {
      const variant = document.getElementById('dialogVariant')?.value || 'outlined';
      const status = document.getElementById('dialogStatus')?.value || 'default';
      const width = document.getElementById('dialogWidth')?.value || '500px';
      const headerText = document.getElementById('dialogHeaderText')?.value || 'Dialog';
      const contentText = document.getElementById('dialogContentText')?.value || 'Content';
      const showMinimize = document.getElementById('dialogShowMinimize')?.checked !== false;
      const showMaximize = document.getElementById('dialogShowMaximize')?.checked !== false;
      const showClose = document.getElementById('dialogShowClose')?.checked !== false;
      const showHeader = document.getElementById('dialogShowHeader')?.checked !== false;
      const showFooter = document.getElementById('dialogShowFooter')?.checked !== false;
      
      const container = document.getElementById('interactiveDialogContainer');
      if (container) {
        container.innerHTML = `
          <dialog-box id="interactiveDialog" 
            width="${width}"
            variant="${variant}"
            status="${status}"
            dialog-title="${showHeader ? headerText : ''}"
            show-minimize="${showMinimize}"
            show-maximize="${showMaximize}"
            show-close="${showClose}">
            ${!showHeader ? '' : ''}
            <div>
              <p>${contentText}</p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 12px;">
                <strong>Variant:</strong> ${variant} | <strong>Status:</strong> ${status} | <strong>Width:</strong> ${width}
              </p>
            </div>
            ${showFooter ? `
              <div slot="footer">
                <button onclick="closeDialog('interactiveDialog')" 
                  style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                <button onclick="alert('Action confirmed!')" 
                  style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Confirm</button>
              </div>
            ` : ''}
          </dialog-box>
        `;
        
        setTimeout(() => {
          const dialog = document.getElementById('interactiveDialog');
          if (dialog) {
            dialog.addEventListener('dialogClosed', () => {
              logInteractiveEvent('dialogClosed: Dialog was closed');
            });
            dialog.addEventListener('dialogMaximized', (e) => {
              logInteractiveEvent(`dialogMaximized: maximized=${e.detail.maximized}`);
            });
            dialog.addEventListener('dialogMinimized', (e) => {
              logInteractiveEvent(`dialogMinimized: minimized=${e.detail.minimized}`);
            });
          }
        }, 100);
      }
    };

    showBasicDialog();
  }, 100);
}
