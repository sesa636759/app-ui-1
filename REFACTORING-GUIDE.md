# Index.html Refactoring Guide

## Problem
The current `src/index.html` file is **10,599 lines** long, making it:
- Difficult to maintain and update
- Slow to load and parse
- Hard to navigate and debug
- Poor for team collaboration

## Solution: Modular Architecture

### New Structure
```
src/
├── index.html (new - only 85 lines!)
├── assets/
│   ├── styles/
│   │   └── demo.css
│   ├── js/
│   │   ├── demo-nav.js
│   │   └── component-config.js
│   └── demos/
│       ├── sections.html (extracted sections)
│       ├── accordion-demo.html
│       ├── tabs-demo.html
│       └── ... (one file per component)
```

### Benefits
1. **Maintainability**: Each component demo is in its own file
2. **Performance**: Lazy loading of demo sections
3. **Collaboration**: Multiple developers can work on different demos
4. **Reusability**: Shared styles and scripts
5. **Scalability**: Easy to add new components

## Migration Steps

### Step 1: Use the New Structure (Recommended)
Replace `src/index.html` with `src/index-refactored.html`:

```bash
# Backup original
mv src/index.html src/index-original.html

# Use new version
mv src/index-refactored.html src/index.html
```

### Step 2: Extract Demo Sections
Use the provided script to extract each component demo:

```bash
node scripts/extract-demos.js
```

This will:
- Parse the original index.html
- Extract each `<div class="demo-section">` block
- Save each to `src/assets/demos/{component-name}-demo.html`
- Generate `sections.html` with all demos

### Step 3: Update Build Configuration
Ensure the build copies assets:

In `stencil.config.ts`:
```typescript
copy: [
  { src: 'assets', dest: 'build/assets' }
]
```

### Step 4: Test
```bash
npm run build
npm start
```

## File Descriptions

### `src/index.html` (NEW - 85 lines)
- Main entry point
- Loads dependencies
- Renders navigation
- Loads demo sections dynamically

### `src/assets/styles/demo.css`
- All demo-specific styles
- Component navigation styles
- Layout and theme styles

### `src/assets/js/demo-nav.js`
- Section navigation logic
- Keyboard shortcuts (← → arrows)
- Theme management
- URL routing (optional)

### `src/assets/js/component-config.js`
- Component registry
- Navigation labels and icons
- Component metadata

### `src/assets/demos/*.html`
- Individual component demos
- Can be loaded on-demand
- Easy to update and test

## Advanced Features (Optional)

### 1. Lazy Loading
Load demos only when needed:
```javascript
async function showSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    // Load demo on demand
    const response = await fetch(`/build/assets/demos/${sectionId}-demo.html`);
    const html = await response.text();
    // Inject into DOM
  }
}
```

### 2. Code Splitting
Split demos into separate bundles:
```javascript
// Use dynamic imports
const demo = await import(`./demos/${componentId}.js`);
demo.init();
```

### 3. URL Routing
Add URL-based navigation:
```javascript
window.addEventListener('hashchange', () => {
  const section = location.hash.slice(1) || 'home';
  showSection(section);
});
```

## Next Steps

1. Review the new files created
2. Test the refactored version
3. Extract remaining demos from original index.html
4. Update documentation
5. Consider implementing lazy loading for better performance

## Rollback Plan

If issues arise:
```bash
mv src/index.html src/index-refactored.html
mv src/index-original.html src/index.html
```

## Questions?

The refactored version provides a solid foundation for a maintainable demo app.
You can incrementally migrate demos or start fresh with new component demos.
