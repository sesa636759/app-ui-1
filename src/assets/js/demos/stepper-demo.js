// Stepper demo data and initialization

const stepperSteps = [
  { label: 'Step 1', status: 'completed' },
  { label: 'Step 2', status: 'active' },
  { label: 'Step 3', status: 'pending' }
];

export function initStepperDemo(targetSelector = '#stepper-demo-section') {
  console.log('✅ initStepperDemo called');
  const container = document.querySelector(targetSelector);
  if (!container) return;

  // Create ui-stepper with <step> children
  const stepper = document.createElement('ui-stepper');
  stepper.setAttribute('orientation', 'horizontal');
  stepper.setAttribute('size', 'md');

  // Helper to create a step
  function createStep(label, content) {
    const step = document.createElement('step');
    step.setAttribute('label', label);
    step.innerHTML = `<div style='padding:16px;'>${content}</div>`;
    return step;
  }

  // Initial steps
  const steps = [
    createStep('Login', 'Login step content'),
    createStep('Profile', 'Profile step content'),
    createStep('Settings', 'Settings step content'),
  ];
  steps.forEach(step => stepper.appendChild(step));
  container.appendChild(stepper);

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
  nextBtn.addEventListener('click', () => stepper.next());
  controls.appendChild(nextBtn);

  // Prev
  const prevBtn = document.createElement('ui-button');
  prevBtn.textContent = 'Prev';
  prevBtn.setAttribute('variant', 'secondary');
  prevBtn.addEventListener('click', () => stepper.prev());
  controls.appendChild(prevBtn);

  // Go to Login (step 0)
  const goToBtn = document.createElement('ui-button');
  goToBtn.textContent = 'Go to Login';
  goToBtn.setAttribute('variant', 'info');
  goToBtn.addEventListener('click', () => stepper.goTo(0));
  controls.appendChild(goToBtn);

  // Go to Profile (step 1)
  const goToProfileBtn = document.createElement('ui-button');
  goToProfileBtn.textContent = 'Go to Profile';
  goToProfileBtn.setAttribute('variant', 'info');
  goToProfileBtn.addEventListener('click', () => stepper.goTo(1));
  controls.appendChild(goToProfileBtn);

  // Go to Settings (step 2)
  const goToSettingsBtn = document.createElement('ui-button');
  goToSettingsBtn.textContent = 'Go to Settings';
  goToSettingsBtn.setAttribute('variant', 'info');
  goToSettingsBtn.addEventListener('click', () => stepper.goTo(2));
  controls.appendChild(goToSettingsBtn);

  // Reset
  const resetBtn = document.createElement('ui-button');
  resetBtn.textContent = 'Reset';
  resetBtn.setAttribute('variant', 'danger');
  resetBtn.addEventListener('click', () => {
    while (stepper.firstChild) stepper.removeChild(stepper.firstChild);
    steps.forEach(step => stepper.appendChild(step.cloneNode(true)));
    stepper.setAttribute('orientation', 'horizontal');
    stepper.setAttribute('size', 'md');
    stepper.goTo(0);
  });
  controls.appendChild(resetBtn);

  // Set Steps (change steps)
  const setStepsBtn = document.createElement('ui-button');
  setStepsBtn.textContent = 'Set Steps: 2';
  setStepsBtn.setAttribute('variant', 'warning');
  setStepsBtn.addEventListener('click', () => {
    while (stepper.firstChild) stepper.removeChild(stepper.firstChild);
    const newSteps = [
      createStep('Step A', 'Step A content'),
      createStep('Step B', 'Step B content'),
    ];
    newSteps.forEach(step => stepper.appendChild(step));
    stepper.goTo(0);
  });
  controls.appendChild(setStepsBtn);

  // Get Current Step
  const getCurrentStepBtn = document.createElement('ui-button');
  getCurrentStepBtn.textContent = 'Get Current Step';
  getCurrentStepBtn.setAttribute('variant', 'success');
  getCurrentStepBtn.addEventListener('click', () => {
    alert('Current step index: ' + stepper.activeStep);
  });
  controls.appendChild(getCurrentStepBtn);

  // Get Steps
  const getStepsBtn = document.createElement('ui-button');
  getStepsBtn.textContent = 'Get Steps';
  getStepsBtn.setAttribute('variant', 'success');
  getStepsBtn.addEventListener('click', () => {
    const stepLabels = Array.from(stepper.querySelectorAll('step')).map(s => s.getAttribute('label'));
    alert('Steps: ' + JSON.stringify(stepLabels));
  });
  controls.appendChild(getStepsBtn);

  // Change orientation
  const orientationBtn = document.createElement('ui-button');
  orientationBtn.textContent = 'Toggle Orientation';
  orientationBtn.setAttribute('variant', 'secondary');
  orientationBtn.addEventListener('click', () => {
    const current = stepper.getAttribute('orientation');
    stepper.setAttribute('orientation', current === 'horizontal' ? 'vertical' : 'horizontal');
  });
  controls.appendChild(orientationBtn);

  // Change size
  const sizeBtn = document.createElement('ui-button');
  sizeBtn.textContent = 'Toggle Size';
  sizeBtn.setAttribute('variant', 'secondary');
  sizeBtn.addEventListener('click', () => {
    const current = stepper.getAttribute('size');
    stepper.setAttribute('size', current === 'md' ? 'lg' : 'md');
  });
  controls.appendChild(sizeBtn);

  container.appendChild(controls);
}
