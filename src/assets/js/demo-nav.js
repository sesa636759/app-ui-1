// Navigation and Section Management
import { loadDemo } from './demo-loader.js';

let currentSectionIndex = 0;
const sections = [];

function initNavigation() {
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach((btn, index) => {
    const sectionId = btn.getAttribute('data-section');
    if (sectionId) {
      sections.push(sectionId);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      navigateNext();
    } else if (e.key === 'ArrowLeft') {
      navigatePrev();
    }
  });
}

async function showSection(sectionId) {
  console.log('showSection called with:', sectionId);
  
  // Scroll to top immediately before doing anything else
  window.scrollTo({ top: 0, behavior: 'auto' });
  
  const allSections = document.querySelectorAll('.demo-section');
  const allButtons = document.querySelectorAll('.nav-btn');

  // Hide all sections
  allSections.forEach((section) => {
    section.classList.remove('section-active');
    section.style.display = 'none';
  });

  // Remove active state from all buttons
  allButtons.forEach((btn) => btn.classList.remove('active'));

  // Load demo if needed (lazy loading)
  console.log('Loading demo for:', sectionId);
  await loadDemo(sectionId);

  // Show target section
  const targetSection = document.getElementById(sectionId);
  console.log('Target section found:', !!targetSection);
  if (targetSection) {
    targetSection.classList.add('section-active');
    targetSection.style.display = 'block';
  }

  // Activate button
  const targetButton = document.querySelector(`[data-section="${sectionId}"]`);
  if (targetButton) {
    targetButton.classList.add('active');
    
    // Scroll button into view if it's outside viewport
    targetButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  currentSectionIndex = sections.indexOf(sectionId);
  
  // Ensure we stay at top after content loads
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}

async function navigateNext() {
  if (currentSectionIndex < sections.length - 1) {
    currentSectionIndex++;
    await showSection(sections[currentSectionIndex]);
  }
}

async function navigatePrev() {
  if (currentSectionIndex > 0) {
    currentSectionIndex--;
    await showSection(sections[currentSectionIndex]);
  }
}

// Theme Management
function setTheme(theme) {
  const html = document.documentElement;
  html.className = theme;
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTheme();
});

// Export for module imports
export { showSection, setTheme };
