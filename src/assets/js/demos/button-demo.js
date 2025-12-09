// Button Component Demo - Injects HTML and wires interactive examples
export function initButtonDemo() {
    console.log('✅ initButtonDemo called');
  const section = document.getElementById('button');
  if (!section) return;

  section.innerHTML = `
    <h2>🔘 Button Component</h2>
    <p>Comprehensive button component with multiple variants, sizes, states, and features.</p>
    <div class="demo-block">
      <h3>Variants</h3>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0;">
        <ui-button label="Primary" variant="primary"></ui-button>
        <ui-button label="Secondary" variant="secondary"></ui-button>
        <ui-button label="Success" variant="success"></ui-button>
        <ui-button label="Danger" variant="danger"></ui-button>
        <ui-button label="Warning" variant="warning"></ui-button>
        <ui-button label="Info" variant="info"></ui-button>
        <ui-button label="Outline" variant="outline"></ui-button>
        <ui-button label="Ghost" variant="ghost"></ui-button>
      </div>
    </div>
    <div class="demo-block">
      <h3>Sizes</h3>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin: 16px 0;">
        <ui-button label="Extra Small" size="xs" variant="primary"></ui-button>
        <ui-button label="Small" size="sm" variant="primary"></ui-button>
        <ui-button label="Medium" size="md" variant="primary"></ui-button>
        <ui-button label="Large" size="lg" variant="primary"></ui-button>
        <ui-button label="Extra Large" size="xl" variant="primary"></ui-button>
      </div>
    </div>
    <div class="demo-block">
      <h3>With Icons</h3>
      <h4>Icon Left</h4>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 12px 0;">
        <ui-button label="Save" icon="💾" variant="primary"></ui-button>
        <ui-button label="Delete" icon="🗑️" variant="danger"></ui-button>
        <ui-button label="Download" icon="⬇️" variant="success"></ui-button>
        <ui-button label="Settings" icon="⚙️" variant="secondary"></ui-button>
      </div>
      <h4>Icon Right</h4>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 12px 0;">
        <ui-button id="btnNext" label="Next" icon="→" icon-position="right" variant="primary"></ui-button>
        <ui-button id="btnSend" label="Send" icon="📤" icon-position="right" variant="info"></ui-button>
      </div>
      <h4>Icon Only</h4>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 12px 0;">
        <ui-button icon="❤️" icon-only variant="danger" size="sm"></ui-button>
        <ui-button icon="⭐" icon-only variant="warning" size="md"></ui-button>
        <ui-button icon="🔍" icon-only variant="primary" size="lg"></ui-button>
        <ui-button icon="✓" icon-only variant="success" size="xl"></ui-button>
      </div>
    </div>
    <div class="demo-block">
      <h3>States</h3>
      <h4>Loading</h4>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 12px 0;">
        <ui-button label="Loading" loading variant="primary"></ui-button>
        <ui-button label="Processing" loading variant="success"></ui-button>
        <ui-button icon="🔄" loading icon-only variant="info"></ui-button>
      </div>
      <h4>Disabled</h4>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 12px 0;">
        <ui-button label="Disabled" disabled variant="primary"></ui-button>
        <ui-button label="Disabled" disabled variant="success"></ui-button>
        <ui-button label="Disabled" disabled variant="danger"></ui-button>
      </div>
    </div>
    <div class="demo-block">
      <h3>Border Radius</h3>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 12px 0;">
        <ui-button label="Default" variant="primary"></ui-button>
        <ui-button label="Rounded" rounded variant="success"></ui-button>
        <ui-button label="Pill" pill variant="info"></ui-button>
        <ui-button icon="❤️" icon-only pill variant="danger"></ui-button>
      </div>
    </div>
    <div class="demo-block">
      <h3>Full Width</h3>
      <div style="max-width: 400px;">
        <ui-button label="Full Width Button" full-width variant="primary" style="margin-bottom: 12px;"></ui-button>
        <ui-button label="Another Full Width" full-width variant="success" icon="✓"></ui-button>
      </div>
    </div>
    <div class="demo-block">
      <h3>Interactive Example</h3>
      <p style="color: #6b7280; font-size: 14px; margin-bottom: 12px;">Click buttons to see events in console</p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <ui-button id="btnDemo1" label="Click Me!" variant="primary" icon="👆"></ui-button>
        <ui-button id="btnDemo2" label="Show Alert" variant="warning" icon="⚠️"></ui-button>
        <ui-button id="btnDemo3" label="Toggle Loading" variant="info" icon="🔄"></ui-button>
      </div>
    </div>
  `;

  // Wire interactive examples
  const btn1 = document.getElementById('btnDemo1');
  const btn2 = document.getElementById('btnDemo2');
  const btn3 = document.getElementById('btnDemo3');

  if (btn1) {
    btn1.addEventListener('buttonClick', (e) => {
      console.log('Button 1 clicked:', e);
    });
  }

  if (btn2) {
    btn2.addEventListener('buttonClick', () => {
      alert('Button clicked!');
    });
  }

  if (btn3) {
    let isLoading = false;
    btn3.addEventListener('buttonClick', () => {
      isLoading = !isLoading;
      btn3.loading = isLoading;
      console.log('Loading state:', isLoading);
    });
  }

  // Additional examples
  const btnNext = document.getElementById('btnNext');
  const btnSend = document.getElementById('btnSend');
  btnNext?.addEventListener('buttonClick', () => console.log('Next clicked'));
  btnSend?.addEventListener('buttonClick', () => console.log('Send clicked'));
}
