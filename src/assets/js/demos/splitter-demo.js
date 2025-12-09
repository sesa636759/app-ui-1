// Demo for ui-splitter
window.renderSplitterDemo = function() {
  const container = document.getElementById('splitter-demo');
  if (!container) return;
  container.innerHTML = `
    <ui-splitter style="height:300px;width:100%">
      <div slot="left">
        <h3>Left Panel</h3>
        <p>This is the left side. Try dragging the center bar!</p>
      </div>
      <div slot="right">
        <h3>Right Panel</h3>
        <p>This is the right side. Resize me!</p>
      </div>
    </ui-splitter>
  `;
};
document.addEventListener('DOMContentLoaded', window.renderSplitterDemo);
