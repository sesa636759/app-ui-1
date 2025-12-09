import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'ui-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class UIButton {
  /** Button label text */
  @Prop() label?: string;

  /** Optional icon content (can be text/icon font or emoji) */
  @Prop() icon?: string;

  /** Render icon only (no label) */
  @Prop() iconOnly: boolean = false;

  /** Icon position relative to label */
  @Prop() iconPosition: 'left' | 'right' = 'left';

  /** Visual variant */
  @Prop() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost' = 'primary';

  /** Size */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Disabled state */
  @Prop() disabled: boolean = false;

  /** Loading state (shows spinner) */
  @Prop() loading: boolean = false;

  /** Full width button */
  @Prop() fullWidth: boolean = false;

  /** Rounded style */
  @Prop() rounded: boolean = false;

  /** Pill-shaped (fully rounded) */
  @Prop() pill: boolean = false;

  /** Button type */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Click event */
  @Event() buttonClick: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  };

  render() {
    const showIcon = !!this.icon && !this.loading;
    const showLabel = !this.iconOnly && !!this.label;

    return (
      <button
        class={{
          'btn': true,
          [`btn-${this.variant}`]: true,
          [`btn-${this.size}`]: true,
          'btn-disabled': this.disabled || this.loading,
          'btn-icon-only': this.iconOnly && !this.loading,
          'btn-loading': this.loading,
          'btn-full-width': this.fullWidth,
          'btn-rounded': this.rounded,
          'btn-pill': this.pill,
        }}
        type={this.type}
        disabled={this.disabled || this.loading}
        onClick={this.handleClick}
      >
        {this.loading && (
          <span class="btn-spinner">
            <svg class="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"/>
            </svg>
          </span>
        )}
        {showIcon && this.iconPosition === 'left' && (
          <span class="btn-icon" aria-hidden="true">{this.icon}</span>
        )}
        {showLabel && (
          <span class="btn-label">{this.label}</span>
        )}
        {showIcon && this.iconPosition === 'right' && (
          <span class="btn-icon" aria-hidden="true">{this.icon}</span>
        )}
      </button>
    );
  }
}
