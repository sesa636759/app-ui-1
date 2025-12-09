import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dialog-header',
  styleUrl: 'dialog-header.css',
  shadow: true,
})
export class DialogHeader {
  /**
   * Dialog title
   */
  @Prop() dialogTitle: string = '';

  /**
   * Whether to show minimize button
   */
  @Prop() showMinimize: boolean = true;

  /**
   * Whether to show maximize button
   */
  @Prop() showMaximize: boolean = true;

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
   * Event emitted when minimize button is clicked
   */
  @Event() minimize: EventEmitter;

  /**
   * Event emitted when maximize button is clicked
   */
  @Event() maximize: EventEmitter;

  /**
   * Event emitted when close button is clicked
   */
  @Event() close: EventEmitter;

  private handleMinimize = () => {
    this.minimize.emit();
  };

  private handleMaximize = () => {
    this.maximize.emit();
  };

  private handleClose = () => {
    this.close.emit();
  };

  render() {
    const statusIcons = {
      info: '🔵',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };

    return (
      <div class="dialog-header-section">
        <div class="dialog-title-section">
          <slot>
            {this.dialogTitle && (
              <h3>
                {this.status !== 'default' && (
                  <span class="status-icon">{statusIcons[this.status]}</span>
                )}
                {this.dialogTitle}
              </h3>
            )}
          </slot>
        </div>
        <div class="dialog-controls">
          {this.showMinimize && (
            <button class="dialog-btn dialog-btn-minimize" onClick={this.handleMinimize} title="Minimize">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          )}
          {this.showMaximize && (
            <button class="dialog-btn dialog-btn-maximize" onClick={this.handleMaximize} title="Maximize">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
              </svg>
            </button>
          )}
          {this.showClose && (
            <button class="dialog-btn dialog-btn-close" onClick={this.handleClose} title="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
}