// Component Demo Functions
export function initOtpInputDemo() {
  const section = document.getElementById('otp-input');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🔢 OTP Input Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>One-time password input with customizable length and styling.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicOtp()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic (4 digits)</button>
      <button onclick="showSixDigitOtp()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">6 Digits</button>
      <button onclick="showMaskedOtp()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Masked</button>
      <button onclick="showInteractiveOtp()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="otpDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    // OTP Input Demo Functions
    window.showBasicOtp = function() {
    const container = document.getElementById('otpDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h4>Basic OTP Input</h4>
        <p style="color: #6b7280; font-size: 13px;">Enter a 4-digit verification code</p>
        <div style="display: flex; justify-content: center; margin: 20px 0;">
          <ui-otp-input id="basicOtp" length="4"></ui-otp-input>
        </div>
        <div id="otpValue" style="margin-top: 20px; padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
          <strong>Current Value:</strong>
          <div style="margin-top: 8px; color: #6b7280; font-family: monospace; font-size: 16px;">----</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const otp = document.getElementById('basicOtp');
      if (otp) {
        otp.addEventListener('otpChange', (e) => {
          const valueDisplay = document.querySelector('#otpValue div');
          if (valueDisplay) {
            const display = e.detail.value || '----';
            valueDisplay.innerHTML = `<span style="color: #1e40af; letter-spacing: 4px;">${display}</span>`;
          }
        });

        otp.addEventListener('otpComplete', (e) => {
          const valueDisplay = document.querySelector('#otpValue div');
          if (valueDisplay) {
            valueDisplay.innerHTML = `<span style="color: #059669;">✅ Complete: ${e.detail.value}</span>`;
          }
        });
      }
    }, 100);
  };

  window.showOtpSizes = function() {
    const container = document.getElementById('otpDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h4>OTP Input Sizes</h4>
        <p style="color: #6b7280; font-size: 13px; margin-bottom: 32px;">Different size variants for various use cases</p>
        
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Small (4 digits)</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input length="4" size="sm"></ui-otp-input>
            </div>
          </div>
          
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Medium (6 digits)</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input length="6" size="md"></ui-otp-input>
            </div>
          </div>
          
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Large (6 digits)</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input length="6" size="lg"></ui-otp-input>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.showOtpSeparator = function() {
    const container = document.getElementById('otpDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h4>OTP with Separators</h4>
        <p style="color: #6b7280; font-size: 13px; margin-bottom: 32px;">Visual grouping with custom separators</p>
        
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Dash Separator (3-3 format)</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input id="dashOtp" length="6" separator="-" separator-position="3"></ui-otp-input>
            </div>
          </div>
          
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Space Separator (2-2-2 format)</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input id="spaceOtp" length="6" separator=" " separator-positions="2,4"></ui-otp-input>
            </div>
          </div>
          
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Dot Separator (4-4 format)</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input id="dotOtp" length="8" separator="•" separator-position="4" size="lg"></ui-otp-input>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.showOtpMasked = function() {
    const container = document.getElementById('otpDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h4>Masked OTP Input</h4>
        <p style="color: #6b7280; font-size: 13px;">Password-style input for sensitive codes</p>
        
        <div style="margin: 32px 0;">
          <div style="display: flex; justify-content: center;">
            <ui-otp-input id="maskedOtp" length="6" masked="true" size="lg"></ui-otp-input>
          </div>
          
          <div style="margin-top: 20px;">
            <label style="display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="toggleMask" style="cursor: pointer;">
              <span style="color: #374151;">Show OTP</span>
            </label>
          </div>
        </div>
        
        <div id="maskedValue" style="padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
          <strong>Value:</strong>
          <div style="margin-top: 8px; color: #6b7280; font-family: monospace;">••••••</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const otp = document.getElementById('maskedOtp');
      const toggle = document.getElementById('toggleMask');
      
      if (otp && toggle) {
        toggle.addEventListener('change', (e) => {
          otp.masked = !e.target.checked;
        });

        otp.addEventListener('otpChange', (e) => {
          const valueDisplay = document.querySelector('#maskedValue div');
          if (valueDisplay) {
            const display = e.detail.value 
              ? toggle.checked ? e.detail.value : '•'.repeat(e.detail.value.length)
              : '••••••';
            valueDisplay.innerHTML = `<span style="color: #1e40af; letter-spacing: 4px;">${display}</span>`;
          }
        });
      }
    }, 100);
  };

  window.showOtpStates = function() {
    const container = document.getElementById('otpDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h4>OTP Input States</h4>
        <p style="color: #6b7280; font-size: 13px; margin-bottom: 32px;">Different validation and interaction states</p>
        
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Default State</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input length="4"></ui-otp-input>
            </div>
          </div>
          
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Success State</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input length="4" state="success" value="1234"></ui-otp-input>
            </div>
            <p style="color: #059669; font-size: 12px; margin-top: 8px;">✓ Code verified successfully</p>
          </div>
          
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Error State</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input length="4" state="error" value="9999"></ui-otp-input>
            </div>
            <p style="color: #dc2626; font-size: 12px; margin-top: 8px;">✕ Invalid verification code</p>
          </div>
          
          <div>
            <h5 style="margin-bottom: 12px; color: #374151;">Disabled State</h5>
            <div style="display: flex; justify-content: center;">
              <ui-otp-input length="4" disabled="true" value="5678"></ui-otp-input>
            </div>
            <p style="color: #6b7280; font-size: 12px; margin-top: 8px;">Input is disabled</p>
          </div>
        </div>
      </div>
    `;
  };

  window.showOtpVerification = function() {
    const container = document.getElementById('otpDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 500px; margin: 0 auto;">
        <div style="text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="width: 64px; height: 64px; margin: 0 auto 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px;">
            📧
          </div>
          
          <h3 style="margin: 0 0 8px 0; color: #111827;">Email Verification</h3>
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px 0;">
            We've sent a 6-digit code to<br>
            <strong style="color: #374151;">user@example.com</strong>
          </p>
          
          <div style="display: flex; justify-content: center; margin: 24px 0;">
            <ui-otp-input id="verifyOtp" length="6" size="lg" separator="-" separator-position="3"></ui-otp-input>
          </div>
          
          <div id="verifyStatus" style="min-height: 24px; margin: 16px 0;"></div>
          
          <button id="verifyBtn" disabled style="width: 100%; padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; opacity: 0.5; transition: all 0.2s;">
            Verify Code
          </button>
          
          <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
            Didn't receive the code?
            <button id="resendBtn" style="color: #667eea; background: none; border: none; cursor: pointer; font-weight: 500; text-decoration: underline;">
              Resend
            </button>
          </p>
          
          <div id="timerDisplay" style="color: #6b7280; font-size: 12px; margin-top: 8px;"></div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const otp = document.getElementById('verifyOtp');
      const verifyBtn = document.getElementById('verifyBtn');
      const resendBtn = document.getElementById('resendBtn');
      const status = document.getElementById('verifyStatus');
      const timerDisplay = document.getElementById('timerDisplay');
      
      let timeLeft = 60;
      let timerInterval = null;
      
      const startTimer = () => {
        timeLeft = 60;
        resendBtn.disabled = true;
        resendBtn.style.opacity = '0.5';
        resendBtn.style.cursor = 'not-allowed';
        
        timerInterval = setInterval(() => {
          timeLeft--;
          timerDisplay.textContent = `Resend available in ${timeLeft}s`;
          
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            resendBtn.disabled = false;
            resendBtn.style.opacity = '1';
            resendBtn.style.cursor = 'pointer';
            timerDisplay.textContent = '';
          }
        }, 1000);
      };
      
      startTimer();
      
      if (otp && verifyBtn && resendBtn && status) {
        otp.addEventListener('otpChange', (e) => {
          verifyBtn.disabled = e.detail.value?.length !== 6;
          verifyBtn.style.opacity = e.detail.value?.length === 6 ? '1' : '0.5';
          verifyBtn.style.cursor = e.detail.value?.length === 6 ? 'pointer' : 'not-allowed';
          
          if (otp.state === 'error') {
            otp.state = 'default';
            status.innerHTML = '';
          }
        });
        
        verifyBtn.addEventListener('click', () => {
          const code = otp.value;
          status.innerHTML = '<div style="color: #6b7280;">Verifying...</div>';
          
          // Simulate API call
          setTimeout(() => {
            if (code === '123456') {
              otp.state = 'success';
              status.innerHTML = '<div style="color: #059669; font-weight: 500;">✓ Verification successful!</div>';
              verifyBtn.textContent = 'Verified';
              verifyBtn.disabled = true;
              verifyBtn.style.background = '#059669';
            } else {
              otp.state = 'error';
              status.innerHTML = '<div style="color: #dc2626; font-weight: 500;">✕ Invalid code. Please try again.</div>';
            }
          }, 1000);
        });
        
        resendBtn.addEventListener('click', () => {
          if (!resendBtn.disabled) {
            otp.value = '';
            otp.state = 'default';
            status.innerHTML = '<div style="color: #059669;">✓ New code sent!</div>';
            setTimeout(() => { status.innerHTML = ''; }, 3000);
            startTimer();
          }
        });
      }
    }, 100);
  };

  // Initialize home OTP input
  window.initHomeOtp = function() {
    const otp = document.getElementById('homeOtp');
    if (!otp) return;
    
    setTimeout(() => {
      otp.addEventListener('otpComplete', (e) => {
        console.log('OTP Complete:', e.detail.value);
      });
    }, 200);
  };

  showBasicOtp();
  }, 100);

  // Interactive Playground
  window.showInteractiveOtp = function() {
    const container = document.getElementById('otpDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 250px;">
            <h3>🎮 Interactive Playground</h3>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Length:</label>
                <input type="number" id="otpLength" value="6" min="3" max="10" onchange="updateInteractiveOtp()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Type:</label>
                <select id="otpType" onchange="updateInteractiveOtp()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="number" selected>Number</option>
                  <option value="text">Text</option>
                  <option value="password">Password</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
                <select id="otpSize" onchange="updateInteractiveOtp()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Separator (e.g., "3,6"):</label>
                <input type="text" id="otpSeparator" value="" onchange="updateInteractiveOtp()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="otpMasked" onchange="updateInteractiveOtp()" style="cursor: pointer;">
                <label for="otpMasked" style="cursor: pointer;">Masked</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="otpNumericOnly" checked onchange="updateInteractiveOtp()" style="cursor: pointer;">
                <label for="otpNumericOnly" style="cursor: pointer;">Numeric Only</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="otpAutoFocus" checked onchange="updateInteractiveOtp()" style="cursor: pointer;">
                <label for="otpAutoFocus" style="cursor: pointer;">Auto Focus</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="otpError" onchange="updateInteractiveOtp()" style="cursor: pointer;">
                <label for="otpError" style="cursor: pointer;">Error State</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="otpDisabled" onchange="updateInteractiveOtp()" style="cursor: pointer;">
                <label for="otpDisabled" style="cursor: pointer;">Disabled</label>
              </div>
            </div>
          </div>
          
          <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h4 style="margin-top: 0;">Preview:</h4>
            <div style="display: flex; justify-content: center; margin-top: 30px;">
              <div id="interactiveOtpContainer"></div>
            </div>
            <div id="otpOutput" style="margin-top: 30px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
          </div>
        </div>
      </div>
    `;
    
    updateInteractiveOtp();
  };

  window.updateInteractiveOtp = function() {
    const length = document.getElementById('otpLength').value;
    const type = document.getElementById('otpType').value;
    const size = document.getElementById('otpSize').value;
    const separator = document.getElementById('otpSeparator').value;
    const masked = document.getElementById('otpMasked').checked;
    const numericOnly = document.getElementById('otpNumericOnly').checked;
    const autoFocus = document.getElementById('otpAutoFocus').checked;
    const error = document.getElementById('otpError').checked;
    const disabled = document.getElementById('otpDisabled').checked;
    
    const container = document.getElementById('interactiveOtpContainer');
    const outputDiv = document.getElementById('otpOutput');
    
    if (!container) return;
    
    container.innerHTML = `
      <ui-otp-input
        id="interactiveOtpComponent"
        length="${length}"
        type="${type}"
        size="${size}"
        ${separator ? `separator="${separator}"` : ''}
        ${masked ? 'masked="true"' : ''}
        ${numericOnly ? 'numeric-only="true"' : ''}
        ${autoFocus ? 'auto-focus="true"' : ''}
        ${error ? 'error="true"' : ''}
        ${disabled ? 'disabled="true"' : ''}
      ></ui-otp-input>
    `;
    
    setTimeout(() => {
      const otpComponent = document.getElementById('interactiveOtpComponent');
      if (otpComponent) {
        otpComponent.addEventListener('otpChange', (event) => {
          outputDiv.style.display = 'block';
          outputDiv.textContent = `Value: ${event.detail.value || '(empty)'}`;
        });
        
        otpComponent.addEventListener('otpComplete', (event) => {
          outputDiv.style.display = 'block';
          outputDiv.textContent = `✓ Complete! Value: ${event.detail.value}`;
        });
      }
    }, 100);
  };
}
