// Demo Loader - Dynamically loads component demos
const demoModules = {
  'accordion': () => import('/build/assets/js/demos/accordion-demo.js'),
  'nav-bar': () => import('/build/assets/js/demos/nav-bar-demo.js'),
  'aside-panel': () => import('/build/assets/js/demos/aside-panel-demo.js'),
  'tabs': () => import('/build/assets/js/demos/tabs-demo.js'),
  'dialog': () => import('/build/assets/js/demos/dialog-demo.js'),
  'snackbar': () => import('/build/assets/js/demos/snackbar-demo.js'),
  'adivider': () => import('/build/assets/js/demos/divider-demo.js'),
  'stepper': () => import('/build/assets/js/demos/stepper-demo.js'),
  'picklist': () => import('/build/assets/js/demos/picklist-demo.js'),
  'card': () => import('/build/assets/js/demos/card-demo.js'),
  'panel': () => import('/build/assets/js/demos/panel-demo.js'),
  'avatar': () => import('/build/assets/js/demos/avatar-demo.js'),
  'avatar-group': () => import('/build/assets/js/demos/avatar-demo.js'),
  'chip': () => import('/build/assets/js/demos/chip-demo.js'),
  'badge': () => import('/build/assets/js/demos/badge-demo.js'),
  'tag': () => import('/build/assets/js/demos/tag-demo.js'),
  'meter-group': () => import('/build/assets/js/demos/meter-group-demo.js'),
  'scroll-top': () => import('/build/assets/js/demos/scroll-top-demo.js'),
  'rating': () => import('/build/assets/js/demos/rating-demo.js'),
  'speed-dial': () => import('/build/assets/js/demos/speed-dial-demo.js'),
  'otp-input': () => import('/build/assets/js/demos/otp-input-demo.js'),
  'context-menu': () => import('/build/assets/js/demos/context-menu-demo.js'),
  'smart-menu': () => import('/build/assets/js/demos/smart-menu-demo.js'),
  'smart-stepper': () => import('/build/assets/js/demos/smart-stepper-demo.js'),
  'advanced-data-table': () => import('/build/assets/js/demos/advanced-data-table-demo.js'),
  'cascade-select': () => import('/build/assets/js/demos/cascade-select-demo.js'),
  'range-slider': () => import('/build/assets/js/demos/range-slider-demo.js'),
  'transfer-list': () => import('/build/assets/js/demos/transfer-list-demo.js'),
  'tree-list': () => import('/build/assets/js/demos/tree-list-demo.js'),
  'pagination': () => import('/build/assets/js/demos/pagination-demo.js'),
  'skeleton': () => import('/build/assets/js/demos/skeleton-demo.js'),
  'timeline': () => import('/build/assets/js/demos/timeline-demo.js'),
  'top-bar': () => import('/build/assets/js/demos/top-bar-demo.js'),
  'dock': () => import('/build/assets/js/demos/dock-demo.js'),
  'dropdown': () => import('/build/assets/js/demos/dropdown-demo.js'),
  'popover': () => import('/build/assets/js/demos/popover-demo.js'),
  'speedometer': () => import('/build/assets/js/demos/speedometer-demo.js'),
  'anchor': () => import('/build/assets/js/demos/anchor-demo.js'),
  'theme-selector': () => import('/build/assets/js/demos/theme-selector-demo.js'),
  'breadcrumb': () => import('/build/assets/js/demos/breadcrumb-demo.js'),
  'horizontal-nav': () => import('/build/assets/js/demos/horizontal-nav-demo.js'),
  'knob': () => import('/build/assets/js/demos/knob-demo.js'),
  'chart': () => import('/build/assets/js/demos/app-chart-demo.js'),
};

const loadedDemos = new Set();

export async function loadDemo(sectionId) {
  // Skip if already loaded or if it's the home section
  if (sectionId === 'home' || loadedDemos.has(sectionId)) {
    return true;
  }

  const loader = demoModules[sectionId];
  if (!loader) {
    console.warn(`No demo loader found for: ${sectionId}`);
    return false;
  }

  try {
    const module = await loader();
    const initFunction = module[`init${kebabToPascal(sectionId)}Demo`];
    
    if (initFunction) {
      initFunction();
      loadedDemos.add(sectionId);
      return true;
    } else {
      console.error(`Init function not found for: ${sectionId}`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to load demo: ${sectionId}`, error);
    return false;
  }
}

// Helper to convert kebab-case to PascalCase
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Preload critical demos
export async function preloadCriticalDemos() {
  const critical = ['accordion', 'nav-bar', 'dialog'];
  await Promise.all(critical.map(id => loadDemo(id)));
}
