import { Component, Prop, h, Event, EventEmitter, Element } from '@stencil/core';
import { PanelSettingsEvent, PanelCloseEvent } from './types';

@Component({
  tag: 'ui-panel',
  styleUrl: 'panel.css',
  shadow: true,
})
export class Panel {
  @Element() element: HTMLElement;

  /**
   * Unique identifier for the panel
   */
  @Prop() panelId: string = '';

  /**
   * Panel width
   */
  @Prop() width: string = '400px';

  /**
   * Panel height
   */
  @Prop() height: string = '300px';

  /**
   * Maximum width of the panel
   */
  @Prop() maxWidth: string = 'none';

  /**
   * Maximum height of the panel
   */
  @Prop() maxHeight: string = 'none';

  /**
   * Show close button
   */
  @Prop() showClose: boolean = true;

  /**
   * Show settings button
   */
  @Prop() showSettings: boolean = true;

  /**
   * Panel title text
   */
  @Prop() panelTitle: string = '';

  @Event() panelClose: EventEmitter<PanelCloseEvent>;
  @Event() panelSettings: EventEmitter<PanelSettingsEvent>;

  private handleClose = () => {
    this.panelClose.emit({ panelId: this.panelId });
  };

  private handleSettings = () => {
    this.panelSettings.emit({ panelId: this.panelId });
  };

  render() {
    const panelStyle = {
      width: this.width,
      height: this.height,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight
    };

    return (
      <div class="panel" style={panelStyle}>
        <div class="panel-header">
          <div class="panel-title">
            {this.panelTitle && <h3 class="panel-title-text">{this.panelTitle}</h3>}
            <slot name="header"></slot>
          </div>
          <div class="panel-actions">
            {this.showSettings && (
              <button
                class="panel-action-btn panel-settings-btn"
                onClick={this.handleSettings}
                aria-label="Panel settings"
                type="button"
              >
                ⚙️
              </button>
            )}
            {this.showClose && (
              <button
                class="panel-action-btn panel-close-btn"
                onClick={this.handleClose}
                aria-label="Close panel"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div class="panel-content">
          <slot name="content"></slot>
        </div>
        <div class="panel-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}
