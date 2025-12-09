// Smart Stepper demo data and initialization

const smartStepperSteps = [
  { label: 'Login', status: 'completed' },
  { label: 'Profile', status: 'active' },
  { label: 'Settings', status: 'pending' }
];

export function initSmartStepperDemo(targetSelector = '#smart-stepper-demo-section') {
  console.log('✅ initSmartStepperDemo called');
  // Use the main demo section container if no custom selector is provided
  const container = document.querySelector(targetSelector) || document.getElementById('smart-stepper');
  if (!container) return;

  // Create smart-stepper with <smart-step> children
  const smartStepper = document.createElement('ui-smart-stepper');
  smartStepper.setAttribute('orientation', 'horizontal');
  smartStepper.setAttribute('size', 'md');

  // Helper to create a smart-step
  function createStep(header, content) {
    const step = document.createElement('smart-step');
    step.header = header;
    step.innerHTML = `<div style='padding:16px;'>${content}</div>`;
    return step;
  }

  // Initial steps
  const steps = [
    createStep('Login', 'Login step content'),
    createStep('Profile', 'Profile step content'),
    createStep('Settings', 'Settings step content'),
  ];
  steps.forEach(step => smartStepper.appendChild(step));
  container.appendChild(smartStepper);

  // Demo controls container
  const controls = document.createElement('div');
  controls.style.display = 'flex';
  controls.style.flexWrap = 'wrap';
  controls.style.gap = '10px';
  controls.style.margin = '20px 0';

  // Next
  const nextBtn = document.createElement('ui-button');
  nextBtn.textContent = 'Next';
  nextBtn.setAttribute('variant', 'primary');
  nextBtn.addEventListener('click', () => smartStepper.next());
  controls.appendChild(nextBtn);

  // Prev
  const prevBtn = document.createElement('ui-button');
  prevBtn.textContent = 'Prev';
  prevBtn.setAttribute('variant', 'secondary');
  prevBtn.addEventListener('click', () => smartStepper.prev());
  controls.appendChild(prevBtn);

  // Go to Login (step 0)
  const goToBtn = document.createElement('ui-button');
  goToBtn.textContent = 'Go to Login';
  goToBtn.setAttribute('variant', 'info');
  goToBtn.addEventListener('click', () => smartStepper.goTo(0));
  controls.appendChild(goToBtn);

  // Go to Profile (step 1)
  const goToProfileBtn = document.createElement('ui-button');
  goToProfileBtn.textContent = 'Go to Profile';
  goToProfileBtn.setAttribute('variant', 'info');
  goToProfileBtn.addEventListener('click', () => smartStepper.goTo(1));
  controls.appendChild(goToProfileBtn);

  // Go to Settings (step 2)
  const goToSettingsBtn = document.createElement('ui-button');
  goToSettingsBtn.textContent = 'Go to Settings';
  goToSettingsBtn.setAttribute('variant', 'info');
  goToSettingsBtn.addEventListener('click', () => smartStepper.goTo(2));
  controls.appendChild(goToSettingsBtn);

  // Reset
  const resetBtn = document.createElement('ui-button');
  resetBtn.textContent = 'Reset';
  resetBtn.setAttribute('variant', 'danger');
  resetBtn.addEventListener('click', () => {
    while (smartStepper.firstChild) smartStepper.removeChild(smartStepper.firstChild);
    steps.forEach(step => smartStepper.appendChild(step.cloneNode(true)));
    smartStepper.setAttribute('orientation', 'horizontal');
    smartStepper.setAttribute('size', 'md');
    smartStepper.goTo(0);
  });
  controls.appendChild(resetBtn);

  // Set Steps (change steps)
  const setStepsBtn = document.createElement('ui-button');
  setStepsBtn.textContent = 'Set Steps: 2';
  setStepsBtn.setAttribute('variant', 'warning');
  setStepsBtn.addEventListener('click', () => {
    while (smartStepper.firstChild) smartStepper.removeChild(smartStepper.firstChild);
    const newSteps = [
      createStep('Step A', 'Step A content'),
      createStep('Step B', 'Step B content'),
    ];
    newSteps.forEach(step => smartStepper.appendChild(step));
    smartStepper.goTo(0);
  });
  controls.appendChild(setStepsBtn);

  // Get Current Step
  const getCurrentStepBtn = document.createElement('ui-button');
  getCurrentStepBtn.textContent = 'Get Current Step';
  getCurrentStepBtn.setAttribute('variant', 'success');
  getCurrentStepBtn.addEventListener('click', () => {
    alert('Current step index: ' + smartStepper.activeStep);
  });
  controls.appendChild(getCurrentStepBtn);

  // Get Steps
  const getStepsBtn = document.createElement('ui-button');
  getStepsBtn.textContent = 'Get Steps';
  getStepsBtn.setAttribute('variant', 'success');
  getStepsBtn.addEventListener('click', () => {
    const stepHeaders = Array.from(smartStepper.querySelectorAll('smart-step')).map(s => s.header);
    alert('Steps: ' + JSON.stringify(stepHeaders));
  });
  controls.appendChild(getStepsBtn);

  // Change orientation
  const orientationBtn = document.createElement('ui-button');
  orientationBtn.textContent = 'Toggle Orientation';
  orientationBtn.setAttribute('variant', 'secondary');
  orientationBtn.addEventListener('click', () => {
    const current = smartStepper.getAttribute('orientation');
    smartStepper.setAttribute('orientation', current === 'horizontal' ? 'vertical' : 'horizontal');
  });
  controls.appendChild(orientationBtn);

  // Change size
  const sizeBtn = document.createElement('ui-button');
  sizeBtn.textContent = 'Toggle Size';
  sizeBtn.setAttribute('variant', 'secondary');
  sizeBtn.addEventListener('click', () => {
    const current = smartStepper.getAttribute('size');
    smartStepper.setAttribute('size', current === 'md' ? 'lg' : 'md');
  });
  controls.appendChild(sizeBtn);

  container.appendChild(controls);
}

// Example usage:
// initSmartStepperDemo();
