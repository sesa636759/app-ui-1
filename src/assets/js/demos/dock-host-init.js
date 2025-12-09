export function initDockHostDemo() {
  const container = document.getElementById('dock-host');
  if (!container) return;
  container.innerHTML = `
    <ui-dock-host dock="left" width="320px" height="100vh">
      <div slot="header">Dock Host Demo</div>
      <div>
        <h3>Docked Content</h3>
        <p>This panel is docked to the left edge. You can float it and drag!</p>
        <button onclick="alert('Dock Host Action!')">Test Action</button>
      </div>
    </ui-dock-host>
    <ui-dock-host dock="bottom" width="100vw" height="180px">
      <div slot="header">Bottom Dock</div>
      <div>
        <h3>Bottom Docked Content</h3>
        <p>This panel is docked to the bottom edge.</p>
      </div>
    </ui-dock-host>
  `;
}
