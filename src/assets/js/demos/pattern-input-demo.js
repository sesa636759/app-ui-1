/**
 * Pattern Input Component Demo Script
 * Handles all interactive demos and examples for the ui-pattern-input component
 */

export function initializePatternInputDemo() {
  console.log('🎯 Initializing Pattern Input Demo...');

  // Event Logging
  const eventLog = document.getElementById('patternInputEventLog');
  
  function logEvent(message, color = '#3b82f6') {
    if (!eventLog) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.style.color = color;
    logEntry.style.marginBottom = '4px';
    logEntry.textContent = `[${timestamp}] ${message}`;
    eventLog.appendChild(logEntry);
    eventLog.scrollTop = eventLog.scrollHeight;

    // Keep only last 20 entries
    while (eventLog.children.length > 20) {
      eventLog.removeChild(eventLog.firstChild);
    }
  }

  // Clear log on init
  if (eventLog) {
    eventLog.innerHTML = '<div style="color: #9ca3af;">Type in the inputs above to see events...</div>';
  }

  // Phone Number Input
  const phoneInput = document.getElementById('phoneInput');
  if (phoneInput) {
    phoneInput.addEventListener('patternInputChange', (e) => {
      const { value, formatted, isValid } = e.detail;
      const status = isValid ? '✅' : '❌';
      logEvent(`${status} Phone: ${formatted} (raw: ${value}) - Valid: ${isValid}`, isValid ? '#10b981' : '#ef4444');
    });

    phoneInput.addEventListener('patternInputValidate', (e) => {
      console.log('Phone validation:', e.detail);
    });
  }

  // Credit Card Input
  const creditCardInput = document.getElementById('creditCardInput');
  if (creditCardInput) {
    creditCardInput.addEventListener('patternInputChange', (e) => {
      const { value, formatted, isValid } = e.detail;
      logEvent(`💳 Card: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#6b7280');
    });

    // Detect card type
    creditCardInput.addEventListener('patternInput', (e) => {
      const cardNumber = e.detail.value;
      let cardType = 'Unknown';
      
      if (cardNumber.startsWith('4')) cardType = 'Visa';
      else if (cardNumber.startsWith('5')) cardType = 'Mastercard';
      else if (cardNumber.startsWith('3')) cardType = 'Amex';
      
      if (cardNumber.length >= 1) {
        console.log('Card type:', cardType);
      }
    });
  }

  // SSN Input
  const ssnInput = document.getElementById('ssnInput');
  if (ssnInput) {
    ssnInput.addEventListener('patternInputChange', (e) => {
      const { formatted, isValid } = e.detail;
      logEvent(`🔒 SSN: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#f59e0b');
    });
  }

  // Date Input
  const dateInput = document.getElementById('dateInput');
  if (dateInput) {
    dateInput.addEventListener('patternInputChange', (e) => {
      const { formatted, isValid } = e.detail;
      logEvent(`📅 Date: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#6b7280');
    });
  }

  // ZIP Code Input
  const zipInput = document.getElementById('zipInput');
  if (zipInput) {
    zipInput.addEventListener('patternInputChange', (e) => {
      const { formatted, isValid } = e.detail;
      logEvent(`📮 ZIP: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#6b7280');
    });
  }

  // License Plate Input
  const licensePlateInput = document.getElementById('licensePlateInput');
  if (licensePlateInput) {
    licensePlateInput.addEventListener('patternInputChange', (e) => {
      const { formatted, isValid } = e.detail;
      logEvent(`🚗 License: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#6b7280');
    });
  }

  // Time Input
  const timeInput = document.getElementById('timeInput');
  if (timeInput) {
    timeInput.addEventListener('patternInputChange', (e) => {
      const { formatted, isValid } = e.detail;
      logEvent(`⏰ Time: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#6b7280');
    });
  }

  // IP Address Input
  const ipInput = document.getElementById('ipInput');
  if (ipInput) {
    ipInput.addEventListener('patternInputChange', (e) => {
      const { formatted, isValid } = e.detail;
      logEvent(`🌐 IP: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#6b7280');
    });
  }

  // Product Code Input
  const productCodeInput = document.getElementById('productCodeInput');
  if (productCodeInput) {
    productCodeInput.addEventListener('patternInputChange', (e) => {
      const { formatted, isValid } = e.detail;
      logEvent(`📦 Product: ${formatted} - Valid: ${isValid}`, isValid ? '#10b981' : '#6b7280');
    });
  }

  // Playground Configuration
  const playgroundInput = document.getElementById('playgroundInput');
  const playgroundConfig = {
    pattern: document.getElementById('playPatternPattern'),
    validationRegex: document.getElementById('playPatternValidation'),
    inputType: document.getElementById('playPatternInputType'),
    size: document.getElementById('playPatternSize'),
    autoFormat: document.getElementById('playPatternAutoFormat'),
    showValidation: document.getElementById('playPatternShowValidation'),
    showCounter: document.getElementById('playPatternShowCounter'),
    required: document.getElementById('playPatternRequired'),
    disabled: document.getElementById('playPatternDisabled'),
    label: document.getElementById('playPatternLabel'),
    placeholder: document.getElementById('playPatternPlaceholder'),
    helperText: document.getElementById('playPatternHelper'),
    errorMessage: document.getElementById('playPatternError'),
    successMessage: document.getElementById('playPatternSuccess'),
    maxLength: document.getElementById('playPatternMaxLength'),
  };

  function updatePlaygroundInput() {
    if (!playgroundInput) return;

    if (playgroundConfig.pattern?.value) 
      playgroundInput.pattern = playgroundConfig.pattern.value;
    
    if (playgroundConfig.validationRegex?.value) 
      playgroundInput.validationRegex = playgroundConfig.validationRegex.value || undefined;
    
    if (playgroundConfig.inputType) 
      playgroundInput.inputType = playgroundConfig.inputType.value;
    
    if (playgroundConfig.size) 
      playgroundInput.size = playgroundConfig.size.value;
    
    if (playgroundConfig.autoFormat) 
      playgroundInput.autoFormat = playgroundConfig.autoFormat.checked;
    
    if (playgroundConfig.showValidation) 
      playgroundInput.showValidation = playgroundConfig.showValidation.checked;
    
    if (playgroundConfig.showCounter) 
      playgroundInput.showCounter = playgroundConfig.showCounter.checked;
    
    if (playgroundConfig.required) 
      playgroundInput.required = playgroundConfig.required.checked;
    
    if (playgroundConfig.disabled) 
      playgroundInput.disabled = playgroundConfig.disabled.checked;
    
    if (playgroundConfig.label) 
      playgroundInput.label = playgroundConfig.label.value || undefined;
    
    if (playgroundConfig.placeholder) 
      playgroundInput.placeholder = playgroundConfig.placeholder.value || undefined;
    
    if (playgroundConfig.helperText) 
      playgroundInput.helperText = playgroundConfig.helperText.value || undefined;
    
    if (playgroundConfig.errorMessage) 
      playgroundInput.errorMessage = playgroundConfig.errorMessage.value || undefined;
    
    if (playgroundConfig.successMessage) 
      playgroundInput.successMessage = playgroundConfig.successMessage.value || undefined;
    
    if (playgroundConfig.maxLength?.value) 
      playgroundInput.maxLength = parseInt(playgroundConfig.maxLength.value) || undefined;
  }

  // Attach playground listeners
  Object.values(playgroundConfig).forEach(control => {
    if (control) {
      const eventType = control.type === 'checkbox' ? 'change' : 'input';
      control.addEventListener(eventType, updatePlaygroundInput);
    }
  });

  // Initialize playground
  updatePlaygroundInput();

  if (playgroundInput) {
    playgroundInput.addEventListener('patternInputChange', (e) => {
      logEvent(`🎮 Playground: ${e.detail.formatted} - Valid: ${e.detail.isValid}`, '#8b5cf6');
    });
  }

  // Preset Patterns Buttons
  const presetButtons = document.querySelectorAll('[data-preset]');
  presetButtons.forEach(button => {
    button.addEventListener('click', () => {
      const preset = button.getAttribute('data-preset');
      applyPreset(preset);
    });
  });

  function applyPreset(preset) {
    const presets = {
      phone: {
        pattern: '(###) ###-####',
        validation: '^\\d{10}$',
        inputType: 'numeric',
        label: 'Phone Number',
        helper: 'US Phone format',
        error: 'Invalid phone number',
        success: 'Valid phone number',
      },
      card: {
        pattern: '#### #### #### ####',
        validation: '^\\d{16}$',
        inputType: 'numeric',
        label: 'Credit Card',
        helper: '16-digit card number',
        error: 'Invalid card number',
        success: 'Valid card number',
      },
      date: {
        pattern: '##/##/####',
        validation: '^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$',
        inputType: 'numeric',
        label: 'Date',
        helper: 'MM/DD/YYYY',
        error: 'Invalid date',
        success: 'Valid date',
      },
      ssn: {
        pattern: '###-##-####',
        validation: '^\\d{9}$',
        inputType: 'numeric',
        label: 'SSN',
        helper: 'Social Security Number',
        error: 'Invalid SSN',
        success: 'Valid SSN',
      },
      time: {
        pattern: '##:##',
        validation: '^([01]\\d|2[0-3]):([0-5]\\d)$',
        inputType: 'numeric',
        label: 'Time',
        helper: 'HH:MM (24-hour)',
        error: 'Invalid time',
        success: 'Valid time',
      },
    };

    const config = presets[preset];
    if (!config) return;

    if (playgroundConfig.pattern) playgroundConfig.pattern.value = config.pattern;
    if (playgroundConfig.validationRegex) playgroundConfig.validationRegex.value = config.validation;
    if (playgroundConfig.inputType) playgroundConfig.inputType.value = config.inputType;
    if (playgroundConfig.label) playgroundConfig.label.value = config.label;
    if (playgroundConfig.helperText) playgroundConfig.helperText.value = config.helper;
    if (playgroundConfig.errorMessage) playgroundConfig.errorMessage.value = config.error;
    if (playgroundConfig.successMessage) playgroundConfig.successMessage.value = config.success;

    updatePlaygroundInput();
    logEvent(`📋 Applied preset: ${preset}`, '#6366f1');
  }

  // Form Demo
  const patternForm = document.getElementById('patternInputForm');
  const formOutput = document.getElementById('patternFormOutput');

  if (patternForm) {
    patternForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = patternForm.querySelectorAll('ui-pattern-input');
      const data = {};
      let allValid = true;

      inputs.forEach(input => {
        if (input.name) {
          data[input.name] = {
            value: input.value,
            isValid: input.getAttribute('data-valid') !== 'false',
          };
          if (!data[input.name].isValid) allValid = false;
        }
      });

      if (formOutput) {
        formOutput.textContent = JSON.stringify(data, null, 2);
      }

      if (allValid) {
        logEvent('✅ Form submitted successfully', '#10b981');
      } else {
        logEvent('❌ Form has validation errors', '#ef4444');
      }
    });

    // Track validation state
    const formInputs = patternForm.querySelectorAll('ui-pattern-input');
    formInputs.forEach(input => {
      input.addEventListener('patternInputValidate', (e) => {
        input.setAttribute('data-valid', e.detail.isValid);
      });
    });
  }

  // Copy formatted value example
  const copyButtons = document.querySelectorAll('[data-copy-input]');
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const inputId = button.getAttribute('data-copy-input');
      const input = document.getElementById(inputId);
      
      if (input && input.value) {
        navigator.clipboard.writeText(input.value).then(() => {
          logEvent(`📋 Copied: ${input.value}`, '#6366f1');
          button.textContent = '✓ Copied!';
          setTimeout(() => {
            button.textContent = '📋 Copy';
          }, 2000);
        });
      }
    });
  });

  console.log('✅ Pattern Input Demo Initialized');
}

// New: init function to inject HTML then initialize behaviors
export function initPatternInputDemo() {
  const section = document.getElementById('pattern-input');
  if (!section) return;

  // Inject extracted HTML for the Pattern Input demos
  section.innerHTML = `
    <h2>🎯 Pattern Input Component</h2>
    <p>Advanced input component with auto-formatting, validation, and character restrictions. Perfect for phone numbers, credit cards, dates, and custom patterns.</p>
    
    <div class=\"demo-block\">
      <h3>Common Patterns</h3>
      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;\">
        <ui-pattern-input id=\"phoneInput\" label=\"Phone Number\" pattern=\"(###) ###-####\" validation-regex=\"^\\\\d{10}$\" input-type=\"numeric\" placeholder=\"(123) 456-7890\" helper-text=\"US phone number format\" error-message=\"Please enter a valid 10-digit phone number\" success-message=\"Valid phone number!\" show-validation required></ui-pattern-input>
        <ui-pattern-input id=\"creditCardInput\" label=\"Credit Card Number\" pattern=\"#### #### #### ####\" validation-regex=\"^\\\\d{16}$\" input-type=\"numeric\" placeholder=\"1234 5678 9012 3456\" helper-text=\"16-digit card number\" error-message=\"Invalid card number\" success-message=\"Valid card number\" show-counter max-length=\"16\" show-validation></ui-pattern-input>
        <ui-pattern-input id=\"ssnInput\" label=\"Social Security Number\" pattern=\"###-##-####\" validation-regex=\"^\\\\d{9}$\" input-type=\"numeric\" placeholder=\"123-45-6789\" helper-text=\"Format: XXX-XX-XXXX\" error-message=\"Invalid SSN format\" success-message=\"Valid SSN\" show-validation required></ui-pattern-input>
        <ui-pattern-input id=\"dateInput\" label=\"Date\" pattern=\"##/##/####\" validation-regex=\"^(0[1-9]|1[0-2])\\\\/(0[1-9]|[12]\\\\d|3[01])\\\\/\\\\d{4}$\" input-type=\"numeric\" placeholder=\"MM/DD/YYYY\" helper-text=\"Enter date in MM/DD/YYYY format\" error-message=\"Invalid date format\" success-message=\"Valid date\" show-validation></ui-pattern-input>
        <ui-pattern-input id=\"zipInput\" label=\"ZIP Code\" pattern=\"#####-####\" validation-regex=\"^\\\\d{5}(\\\\d{4})?$\" input-type=\"numeric\" placeholder=\"12345-6789\" helper-text=\"5 or 9 digit ZIP code\" error-message=\"Invalid ZIP code\" show-validation></ui-pattern-input>
        <ui-pattern-input id=\"timeInput\" label=\"Time (24-hour)\" pattern=\"##:##\" validation-regex=\"^([01]\\\\d|2[0-3]):([0-5]\\\\d)$\" input-type=\"numeric\" placeholder=\"HH:MM\" helper-text=\"24-hour time format\" error-message=\"Invalid time (use 00:00-23:59)\" success-message=\"Valid time\" show-validation></ui-pattern-input>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Advanced Patterns</h3>
      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;\">
        <ui-pattern-input id=\"ipInput\" label=\"IP Address\" pattern=\"###.###.###.###\" validation-regex=\"^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$\" input-type=\"numeric\" placeholder=\"192.168.1.1\" helper-text=\"IPv4 address\" error-message=\"Invalid IP address\" show-validation></ui-pattern-input>
        <ui-pattern-input id=\"licensePlateInput\" label=\"License Plate\" pattern=\"### ####\" input-type=\"alphanumeric\" placeholder=\"ABC 1234\" helper-text=\"Format: XXX XXXX\" show-validation size=\"lg\"></ui-pattern-input>
        <ui-pattern-input id=\"productCodeInput\" label=\"Product Code\" pattern=\"###-###-###\" input-type=\"alphanumeric\" placeholder=\"ABC-123-XYZ\" helper-text=\"Alphanumeric code with dashes\" show-counter max-length=\"9\" show-validation></ui-pattern-input>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Different Sizes</h3>
      <div style=\"display: flex; flex-direction: column; gap: 16px; max-width: 400px; margin: 20px 0;\">
        <ui-pattern-input label=\"Small Size\" pattern=\"(###) ###-####\" input-type=\"numeric\" placeholder=\"Phone number\" size=\"sm\"></ui-pattern-input>
        <ui-pattern-input label=\"Medium Size (Default)\" pattern=\"(###) ###-####\" input-type=\"numeric\" placeholder=\"Phone number\" size=\"md\"></ui-pattern-input>
        <ui-pattern-input label=\"Large Size\" pattern=\"(###) ###-####\" input-type=\"numeric\" placeholder=\"Phone number\" size=\"lg\"></ui-pattern-input>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Input Type Restrictions</h3>
      <p style=\"color: #6b7280; font-size: 14px; margin-bottom: 16px;\">Try typing different characters to see restrictions in action</p>
      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;\">
        <ui-pattern-input label=\"Numeric Only\" input-type=\"numeric\" placeholder=\"Only numbers allowed\" helper-text=\"Try typing letters - they won't appear\" show-counter max-length=\"10\"></ui-pattern-input>
        <ui-pattern-input label=\"Alpha Only\" input-type=\"alpha\" placeholder=\"Only letters allowed\" helper-text=\"Numbers and symbols blocked\" show-counter max-length=\"20\"></ui-pattern-input>
        <ui-pattern-input label=\"Alphanumeric\" input-type=\"alphanumeric\" placeholder=\"Letters and numbers\" helper-text=\"Special characters blocked\" show-counter max-length=\"15\"></ui-pattern-input>
        <ui-pattern-input label=\"Custom (A-F, 0-9)\" input-type=\"custom\" allowed-chars=\"^[A-Fa-f0-9]*$\" placeholder=\"Hex characters only\" helper-text=\"Hexadecimal input\" show-counter max-length=\"8\"></ui-pattern-input>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>States & Features</h3>
      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;\">
        <ui-pattern-input label=\"With Character Counter\" pattern=\"#### ####\" input-type=\"numeric\" placeholder=\"8 digits\" show-counter max-length=\"8\"></ui-pattern-input>
        <ui-pattern-input label=\"Disabled Input\" pattern=\"(###) ###-####\" value=\"(555) 123-4567\" disabled></ui-pattern-input>
        <ui-pattern-input label=\"Required Field\" pattern=\"###-####\" input-type=\"numeric\" placeholder=\"Required\" required show-validation error-message=\"This field is required\"></ui-pattern-input>
        <ui-pattern-input label=\"No Auto-format\" pattern=\"(###) ###-####\" input-type=\"numeric\" placeholder=\"Manual formatting\" auto-format=\"false\" helper-text=\"Auto-format disabled\"></ui-pattern-input>
      </div>
    </div>
    
    <div class=\"demo-block\">
      <h3>Interactive Demo</h3>
      <p style=\"color: #6b7280; font-size: 14px; margin-bottom: 12px;\">Type in the inputs above to see real-time events</p>
      <div id=\"patternInputEventLog\" style=\"background: #1f2937; color: #e5e7eb; padding: 16px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 13px; max-height: 250px; overflow-y: auto;\">
        <div style=\"color: #9ca3af;\">Events will appear here...</div>
      </div>
    </div>
    
    <div class=\"demo-block playground\">
      <h3>🎮 Interactive Playground</h3>
      <p style=\"color: #6b7280; font-size: 14px; margin-bottom: 16px;\">Customize the pattern input with live preview</p>
      <div style=\"display: flex; gap: 24px; flex-wrap: wrap;\">
        <div style=\"flex: 1; min-width: 300px;\">
          <h4 style=\"margin: 0 0 16px 0;\">Configuration</h4>
          <div style=\"display: flex; flex-direction: column; gap: 12px;\">
            <div>
              <label style=\"display: block; margin-bottom: 4px; font-weight: 500; font-size: 14px;\">Pattern:</label>
              <input type=\"text\" id=\"playPatternPattern\" value=\"(###) ###-####\" placeholder=\"e.g., (###) ###-####\" style=\"width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-family: monospace;\" />
              <small style=\"color: #6b7280;\">Use # as placeholder</small>
            </div>
            <div>
              <label style=\"display: block; margin-bottom: 4px; font-weight: 500; font-size: 14px;\">Validation Regex:</label>
              <input type=\"text\" id=\"playPatternValidation\" value=\"^\\\\d{10}$\" placeholder=\"e.g., ^\\\\d{10}$\" style=\"width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-family: monospace;\" />
              <small style=\"color: #6b7280;\">JavaScript regex pattern</small>
            </div>
            <div>
              <label style=\"display: block; margin-bottom: 4px; font-weight: 500; font-size: 14px;\">Input Type:</label>
              <select id=\"playPatternInputType\" style=\"width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;\">
                <option value=\"text\">Text (Any)</option>
                <option value=\"numeric\" selected>Numeric</option>
                <option value=\"alpha\">Alpha</option>
                <option value=\"alphanumeric\">Alphanumeric</option>
                <option value=\"custom\">Custom (Regex)</option>
              </select>
            </div>
            <div>
              <label style=\"display: block; margin-bottom: 4px; font-weight: 500; font-size: 14px;\">Size:</label>
              <select id=\"playPatternSize\" style=\"width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;\">
                <option value=\"sm\">Small</option>
                <option value=\"md\" selected>Medium</option>
                <option value=\"lg\">Large</option>
              </select>
            </div>
            <div style=\"display:flex; gap:10px; flex-wrap:wrap;\">
              <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playPatternAutoFormat\" checked> Auto format</label>
              <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playPatternShowValidation\" checked> Show validation</label>
              <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playPatternShowCounter\"> Show counter</label>
              <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playPatternRequired\"> Required</label>
              <label style=\"display:flex; align-items:center; gap:8px;\"><input type=\"checkbox\" id=\"playPatternDisabled\"> Disabled</label>
            </div>
            <div style=\"display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;\">
              <label style=\"display:block;\"><span>Label</span><input type=\"text\" id=\"playPatternLabel\" value=\"Playground Input\" style=\"width:100%; padding:8px; border:1px solid #d1d5db; border-radius:6px;\"></label>
              <label style=\"display:block;\"><span>Placeholder</span><input type=\"text\" id=\"playPatternPlaceholder\" value=\"Enter value\" style=\"width:100%; padding:8px; border:1px solid #d1d5db; border-radius:6px;\"></label>
              <label style=\"display:block;\"><span>Helper Text</span><input type=\"text\" id=\"playPatternHelper\" value=\"Try different inputs\" style=\"width:100%; padding:8px; border:1px solid #d1d5db; border-radius:6px;\"></label>
              <label style=\"display:block;\"><span>Error Message</span><input type=\"text\" id=\"playPatternError\" value=\"Invalid input\" style=\"width:100%; padding:8px; border:1px solid #d1d5db; border-radius:6px;\"></label>
              <label style=\"display:block;\"><span>Success Message</span><input type=\"text\" id=\"playPatternSuccess\" value=\"Looks good!\" style=\"width:100%; padding:8px; border:1px solid #d1d5db; border-radius:6px;\"></label>
              <label style=\"display:block;\"><span>Max Length</span><input type=\"number\" id=\"playPatternMaxLength\" value=\"16\" min=\"1\" style=\"width:100%; padding:8px; border:1px solid #d1d5db; border-radius:6px;\"></label>
            </div>
          </div>
        </div>
        <div style=\"flex:1; min-width:280px;\">
          <h4 style=\"margin: 0 0 16px 0;\">Preview</h4>
          <div class=\"playground-preview\" style=\"padding: 24px; background: #f3f4f6; border-radius: 8px;\">
            <ui-pattern-input id=\"playgroundInput\" label=\"Playground Input\" pattern=\"(###) ###-####\" input-type=\"numeric\" placeholder=\"Enter value\" helper-text=\"Try different inputs\" show-validation></ui-pattern-input>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize behaviors
  initializePatternInputDemo();
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePatternInputDemo);
} else {
  setTimeout(initializePatternInputDemo, 100);
}
