import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';

export interface SpeedDialAction {
  id: string;
  label: string;
  icon: string;
  color?: string;
  disabled?: boolean;
}

@Component({
  tag: 'ui-speed-dial',
  styleUrl: 'speed-dial.css',
  shadow: true,
})
export class SpeedDial {
  /**
   * Position of the speed dial button
   */
  @Prop() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' = 'bottom-right';

  /**
   * Speed dial actions
   */
  @Prop() actions: SpeedDialAction[] | string = [];

  /**
   * Icon for the main button
   */
  @Prop() icon: string = '+';

  /**
   * Color scheme
   */
  @Prop() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';

  /**
   * Size of the button
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Direction of dial opening
   */
  @Prop() direction?: 'up' | 'down' | 'left' | 'right' | 'auto' = 'auto';

  /**
   * Tooltip position
   */
  @Prop() tooltipPosition?: 'left' | 'right' | 'top' | 'bottom' | 'auto' = 'auto';

  /**
   * Show tooltips
   */
  @Prop() showTooltips: boolean = true;

  /**
   * Open state
   */
  @State() isOpen: boolean = false;

  /**
   * Emitted when an action is clicked
   */
  @Event() actionClick: EventEmitter<string>;

  /**
   * Emitted when speed dial opens/closes
   */
  @Event() speedDialToggle: EventEmitter<boolean>;

  private getActions(): SpeedDialAction[] {
    if (typeof this.actions === 'string') {
      try {
        return JSON.parse(this.actions);
      } catch {
        return [];
      }
    }
    return this.actions;
  }

  private getDialDirection(): string {
    if (this.direction !== 'auto') {
      return this.direction;
    }

    // Auto-determine direction based on position
    if (this.position === 'center') {
      return 'up';
    } else if (this.position.startsWith('bottom')) {
      return 'up';
    } else if (this.position.startsWith('top')) {
      return 'down';
    } else if (this.position.endsWith('right')) {
      return 'left';
    } else {
      return 'right';
    }
  }

  private getTooltipPosition(): string {
    if (this.tooltipPosition !== 'auto') {
      return this.tooltipPosition;
    }

    // Auto-determine tooltip position based on button position
    if (this.position.endsWith('right')) {
      return 'left';
    } else if (this.position.endsWith('left')) {
      return 'right';
    } else if (this.position.startsWith('top')) {
      return 'bottom';
    } else {
      return 'top';
    }
  }

  private toggleDial = () => {
    this.isOpen = !this.isOpen;
    this.speedDialToggle.emit(this.isOpen);
  };

  private handleActionClick = (action: SpeedDialAction) => {
    if (action.disabled) return;
    this.actionClick.emit(action.id);
    this.isOpen = false;
    this.speedDialToggle.emit(false);
  };

  private handleBackdropClick = () => {
    if (this.isOpen) {
      this.isOpen = false;
      this.speedDialToggle.emit(false);
    }
  };

  render() {
    const actions = this.getActions();
    const dialDirection = this.getDialDirection();
    const tooltipPos = this.getTooltipPosition();

    const containerClasses = {
      'speed-dial-container': true,
      [`speed-dial-${this.position}`]: true,
      [`speed-dial-${this.size}`]: true,
      'speed-dial-open': this.isOpen,
    };

    const mainButtonClasses = {
      'speed-dial-button': true,
      'speed-dial-main': true,
      [`speed-dial-${this.color}`]: true,
      'speed-dial-button-open': this.isOpen,
    };

    const actionsClasses = {
      'speed-dial-actions': true,
      [`speed-dial-actions-${dialDirection}`]: true,
    };

    return (
      <div class={containerClasses}>
        {this.isOpen && (
          <div class="speed-dial-backdrop" onClick={this.handleBackdropClick}></div>
        )}

        <div class={actionsClasses}>
          {this.isOpen && actions.map((action, index) => (
            <div
              class={{
                'speed-dial-action-wrapper': true,
                'speed-dial-action-disabled': action.disabled,
              }}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <button
                class={{
                  'speed-dial-action': true,
                  'speed-dial-action-disabled': action.disabled,
                }}
                onClick={() => this.handleActionClick(action)}
                disabled={action.disabled}
                aria-label={action.label}
                style={{
                  backgroundColor: action.color || undefined,
                }}
              >
                <span class="speed-dial-action-icon">{action.icon}</span>
              </button>
              {this.showTooltips && action.label && (
                <div class={`speed-dial-tooltip speed-dial-tooltip-${tooltipPos}`}>
                  {action.label}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          class={mainButtonClasses}
          onClick={this.toggleDial}
          aria-label="Speed dial menu"
          aria-expanded={this.isOpen ? 'true' : 'false'}
        >
          <span class="speed-dial-icon">{this.icon}</span>
        </button>
      </div>
    );
  }
}
