import { Component, Prop, h, Event, EventEmitter, Method, State } from '@stencil/core';

@Component({
  tag: 'dialog-box',
  styleUrl: 'dialog-box.css',
  shadow: true,
})
export class DialogBox {
  /**
   * Whether the dialog is open
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Dialog title
   */
  @Prop() dialogTitle: string = '';

  /**
   * Whether the dialog is maximized
   */
  @Prop({ mutable: true, reflect: true }) maximized: boolean = false;

  /**
   * Whether the dialog is minimized
   */
  @Prop({ mutable: true, reflect: true }) minimized: boolean = false;

  /**
   * Dialog width
   */
  @Prop() width: string = '500px';

  /**
   * Dialog height
   */
  @Prop() height: string = 'auto';

  /**
   * Whether to show maximize button
   */
  @Prop() showMaximize: boolean = true;

  /**
   * Whether to show minimize button
   */
  @Prop() showMinimize: boolean = true;

  /**
   * Whether to show close button
   */
  @Prop() showClose: boolean = true;

  /**
   * Dialog variant style
   */
  @Prop() variant: 'outlined' | 'filled' = 'outlined';

  /**
   * Dialog status/type
   */
  @Prop() status: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default';

  /**
   * Event emitted when dialog is closed
   */
  @Event() dialogClosed: EventEmitter;

  /**
   * Event emitted when dialog is maximized
   */
  @Event() dialogMaximized: EventEmitter<{ maximized: boolean }>;

  /**
   * Event emitted when dialog is minimized
   */
  @Event() dialogMinimized: EventEmitter<{ minimized: boolean }>;

  @State() dragStartX: number = 0;
  @State() dragStartY: number = 0;
  @State() isDragging: boolean = false;

  private dialogElement: HTMLElement;

  /**
   * Open the dialog
   */
  @Method()
  async show() {
    this.open = true;
  }

  /**
   * Close the dialog
   */
  @Method()
  async hide() {
    this.open = false;
    this.dialogClosed.emit();
  }

  /**
   * Maximize the dialog
   */
  @Method()
  async maximize() {
    this.maximized = !this.maximized;
    this.minimized = false;
    this.dialogMaximized.emit({ maximized: this.maximized });
  }

  /**
   * Minimize the dialog
   */
  @Method()
  async minimize() {
    this.minimized = !this.minimized;
    this.maximized = false;
    this.dialogMinimized.emit({ minimized: this.minimized });
  }

  private handleClose = () => {
    this.hide();
  };

  private handleMaximize = () => {
    this.maximize();
  };

  private handleMinimize = () => {
    this.minimize();
  };

  private handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.hide();
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.dialogElement.offsetLeft;
      this.dragStartY = e.clientY - this.dialogElement.offsetTop;
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (this.isDragging && !this.maximized) {
      const newLeft = e.clientX - this.dragStartX;
      const newTop = e.clientY - this.dragStartY;
      this.dialogElement.style.left = `${newLeft}px`;
      this.dialogElement.style.top = `${newTop}px`;
    }
  };

  private handleMouseUp = () => {
    this.isDragging = false;
  };

  render() {
    if (!this.open) {
      return null;
    }

    const dialogClasses = {
      'dialog-box': true,
      'maximized': this.maximized,
      'minimized': this.minimized,
      [`variant-${this.variant}`]: true,
      [`status-${this.status}`]: this.status !== 'default',
    };

    const dialogStyles = {
      width: this.maximized ? '100vw' : this.width,
      height: this.maximized ? '100vh' : this.height,
    };

    return (
      <div class="dialog-backdrop" onClick={this.handleBackdropClick}>
        <div
          ref={(el) => (this.dialogElement = el)}
          class={dialogClasses}
          style={dialogStyles}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          <dialog-header
            dialogTitle={this.dialogTitle}
            showMinimize={this.showMinimize}
            showMaximize={this.showMaximize}
            showClose={this.showClose}
            variant={this.variant}
            status={this.status}
            onMinimize={this.handleMinimize}
            onMaximize={this.handleMaximize}
            onClose={this.handleClose}
          >
            <slot name="header"></slot>
          </dialog-header>

          <dialog-content>
            <slot></slot>
          </dialog-content>

          <dialog-footer>
            <slot name="footer"></slot>
          </dialog-footer>
        </div>
      </div>
    );
  }
}