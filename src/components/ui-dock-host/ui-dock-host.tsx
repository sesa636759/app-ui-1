import { Component, h, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'ui-dock-host',
  styleUrl: 'ui-dock-host.css',
  shadow: true
})
export class UiDockHost {
  @Element() el: HTMLElement;
  @Prop() dock: 'left' | 'right' | 'top' | 'bottom' | 'float' = 'left';
  @Prop() width: string = '320px';
  @Prop() height: string = '320px';
  @State() position = { x: 100, y: 100 };
  private dragOffset = { x: 0, y: 0 };
  private dragging = false;

  onHeaderMouseDown = (ev: MouseEvent) => {
    if (this.dock === 'float') {
      this.dragging = true;
      this.dragOffset = {
        x: ev.clientX - this.position.x,
        y: ev.clientY - this.position.y
      };
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseMove = (ev: MouseEvent) => {
    if (this.dragging) {
      // Assign a new object to trigger reactivity
      this.position = {
        x: ev.clientX - this.dragOffset.x,
        y: ev.clientY - this.dragOffset.y
      };
    }
    if (this.resizing) {
      const newWidth = Math.max(120, ev.clientX - this.el.getBoundingClientRect().left);
      const newHeight = Math.max(80, ev.clientY - this.el.getBoundingClientRect().top);
      this.width = newWidth + 'px';
      this.height = newHeight + 'px';
    }
  };

  onMouseUp = () => {
    this.dragging = false;
    this.resizing = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
  private resizing = false;
  // Removed unused resizeStart

  onResizeMouseDown = (ev: MouseEvent) => {
    if (this.dock === 'float') {
      ev.stopPropagation();
      this.resizing = true;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  };

  toggleFloat = () => {
    const newDock = this.dock === 'float' ? 'left' : 'float';
    const event = new CustomEvent('dockChange', { detail: { dock: newDock }, bubbles: true });
    this.el.dispatchEvent(event);
  };

  getDockStyle() {
    if (this.dock === 'float') {
      return {
        position: 'fixed',
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: this.width,
        height: this.height,
        zIndex: '9999',
      };
    }
    switch (this.dock) {
      case 'left':
        return { position: 'fixed', left: '0px', top: '0px', bottom: '0px', width: this.width, zIndex: '9999' };
      case 'right':
        return { position: 'fixed', right: '0px', top: '0px', bottom: '0px', width: this.width, zIndex: '9999' };
      case 'top':
        return { position: 'fixed', left: '0px', top: '0px', right: '0px', height: this.height, zIndex: '9999' };
      case 'bottom':
        return { position: 'fixed', left: '0px', right: '0px', bottom: '0px', height: this.height, zIndex: '9999' };
      default:
        return {};
    }
  }

  render() {
    const isFloating = this.dock === 'float';
    return (
      <div class={`dock-host ${isFloating ? 'floating' : this.dock}`} style={this.getDockStyle()}>
        <div class="dock-header" onMouseDown={this.onHeaderMouseDown}>
          <span class="dock-header-content"><slot name="header">Dock Host</slot></span>
          <button class="dock-float-btn" onClick={this.toggleFloat} title={isFloating ? 'Dock' : 'Float'}>
            {isFloating ? '🗂️ Dock' : '🗖 Float'}
          </button>
        </div>
        <div class="dock-content">
          <slot></slot>
        </div>
        {isFloating && (
          <div
            class="dock-resize-handle"
            onMouseDown={this.onResizeMouseDown}
            style={{ position: 'absolute', right: '0', bottom: '0', width: '16px', height: '16px', cursor: 'nwse-resize', zIndex: '10' }}
          ></div>
        )}
      </div>
    );
  }
}
