import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'ui-splitter',
  styleUrl: 'splitter.css',
  shadow: true
})
export class UiSplitter {
  @State() split: number = 50; // percentage
  private dragging = false;

  onMouseDown = (ev: MouseEvent) => {
    this.dragging = true;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (ev: MouseEvent) => {
    if (this.dragging) {
      const rect = (this as any).el.shadowRoot.querySelector('.splitter-root').getBoundingClientRect();
      let percent = ((ev.clientX - rect.left) / rect.width) * 100;
      percent = Math.max(10, Math.min(90, percent));
      this.split = percent;
    }
  };

  onMouseUp = () => {
    this.dragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  render() {
    return (
      <div class="splitter-root" style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div class="splitter-panel left" style={{ width: `${this.split}%` }}>
          <slot name="left" />
        </div>
        <div class="splitter-bar" onMouseDown={this.onMouseDown}></div>
        <div class="splitter-panel right" style={{ width: `${100 - this.split}%` }}>
          <slot name="right" />
        </div>
      </div>
    );
  }
}
