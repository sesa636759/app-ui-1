import { Component, Prop, h, Event, EventEmitter, Watch, State, Method, Listen } from '@stencil/core';

@Component({
  tag: 'aside-panel',
  styleUrl: 'aside-panel.css',
  shadow: true,
})
export class AsidePanel {
  /**
   * Whether the aside panel is open
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Direction from which the panel slides in: 'left', 'right', 'top', 'bottom'
   */
  @Prop() direction: 'left' | 'right' | 'top' | 'bottom' = 'right';

  /**
   * Width of the panel (for left/right) or height (for top/bottom)
   */
  @Prop() size: string = '320px';

  /**
   * Whether to show the close button
   */
  @Prop() closeable: boolean = true;

  /**
   * Whether clicking the overlay closes the panel
   */
  @Prop() closeOnOverlayClick: boolean = true;

  /**
   * Whether the panel can be closed by pressing Escape key
   */
  @Prop() closeOnEscape: boolean = true;

  /**
   * Whether the panel is resizable
   */
  @Prop() resizable: boolean = false;

  /**
   * Minimum size (width or height) in pixels
   */
  @Prop() minSize: number = 200;

  /**
   * Maximum size (width or height) in pixels
   */
  @Prop() maxSize: number = 800;

  /**
   * Event emitted when the panel is closed
   */
  @Event() asideClosed: EventEmitter<void>;

  /**
   * Event emitted when the panel is opened
   */
  @Event() asideOpened: EventEmitter<void>;

  /**
   * Event emitted when the panel is resized
   */
  @Event() asideResized: EventEmitter<{ size: number }>

  @State() currentSize: number;
  @State() isResizing: boolean = false;

  private startPos: number = 0;
  private startSize: number = 0;

  @Watch('open')
  watchOpenHandler(newValue: boolean) {
    if (newValue) {
      this.asideOpened.emit();
    } else {
      this.asideClosed.emit();
    }
  }

  componentWillLoad() {
    this.currentSize = parseInt(this.size);
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (this.open && this.closeOnEscape && event.key === 'Escape') {
      this.handleClose();
    }
  }

  /**
   * Toggle the panel open/closed
   */
  @Method()
  async toggle() {
    this.open = !this.open;
  }

  /**
   * Open the panel
   */
  @Method()
  async show() {
    this.open = true;
  }

  /**
   * Close the panel
   */
  @Method()
  async hide() {
    this.open = false;
  }

  private handleResizeStart = (e: MouseEvent) => {
    if (!this.resizable) return;
    
    e.preventDefault();
    this.isResizing = true;
    
    if (this.direction === 'left' || this.direction === 'right') {
      this.startPos = e.clientX;
    } else {
      this.startPos = e.clientY;
    }
    
    this.startSize = this.currentSize;
    
    document.addEventListener('mousemove', this.handleResizeMove);
    document.addEventListener('mouseup', this.handleResizeEnd);
  };

  private handleResizeMove = (e: MouseEvent) => {
    if (!this.isResizing) return;
    
    let delta = 0;
    
    if (this.direction === 'left') {
      delta = e.clientX - this.startPos;
    } else if (this.direction === 'right') {
      delta = this.startPos - e.clientX;
    } else if (this.direction === 'top') {
      delta = e.clientY - this.startPos;
    } else if (this.direction === 'bottom') {
      delta = this.startPos - e.clientY;
    }
    
    let newSize = this.startSize + delta;
    newSize = Math.max(this.minSize, Math.min(this.maxSize, newSize));
    
    this.currentSize = newSize;
  };

  private handleResizeEnd = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);
    this.asideResized.emit({ size: this.currentSize });
  };

  private handleClose = () => {
    this.open = false;
    this.asideClosed.emit();
  };

  private handleOverlayClick = () => {
    if (this.closeOnOverlayClick) {
      this.handleClose();
    }
  };

  private getPanelStyles() {
    const styles: any = {};
    const sizeValue = this.currentSize ? `${this.currentSize}px` : this.size;
    
    if (this.direction === 'left' || this.direction === 'right') {
      styles.width = sizeValue;
      styles.height = '100%';
      styles.top = '0';
      styles[this.direction] = '0';
    } else {
      styles.height = sizeValue;
      styles.width = '100%';
      styles.left = '0';
      styles[this.direction] = '0';
    }

    return styles;
  }

  render() {
    return (
      <div class={`aside-container ${this.open ? 'open' : ''}`}>
        {/* Overlay */}
        <div 
          class={`overlay ${this.open ? 'visible' : ''}`}
          onClick={this.handleOverlayClick}
        ></div>

        {/* Panel */}
        <div 
          class={`panel panel-${this.direction} ${this.open ? 'open' : ''} ${this.isResizing ? 'resizing' : ''}`}
          style={this.getPanelStyles()}
        >
          {this.resizable && (
            <div 
              class={`resize-handle resize-handle-${this.direction}`}
              onMouseDown={this.handleResizeStart}
            ></div>
          )}
          
          {this.closeable && (
            <button 
              class="close-btn"
              onClick={this.handleClose}
              aria-label="Close panel"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          
          <div class="panel-header">
            <slot name="header"></slot>
          </div>
          
          <div class="panel-content">
            <slot name="content"></slot>
            <slot></slot>
          </div>
          
          <div class="panel-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    );
  }
}
