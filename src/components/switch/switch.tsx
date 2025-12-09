import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'ui-switch',
  styleUrl: 'switch.css',
  shadow: true,
})
export class UISwitch {
  /** Checked state */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** Disabled state */
  @Prop() disabled: boolean = false;

  /** Loading state (shows spinner) */
  @Prop() loading: boolean = false;

  /** Size variant */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Color variant */
  @Prop() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';

  /** Shape style */
  @Prop() shape: 'default' | 'rounded' | 'pill' | 'square' = 'default';

  /** Label text */
  @Prop() label?: string;

  /** Label position */
  @Prop() labelPosition: 'left' | 'right' = 'right';

  /** Icon when unchecked */
  @Prop() iconOff?: string;

  /** Icon when checked */
  @Prop() iconOn?: string;

  /** Show check/cross icons by default */
  @Prop() showDefaultIcons: boolean = false;

  /** Required field indicator */
  @Prop() required: boolean = false;

  /** Name attribute for forms */
  @Prop() name?: string;

  /** Value attribute for forms */
  @Prop() value?: string;

  /** Change event */
  @Event() switchChange: EventEmitter<{ checked: boolean; value?: string }>;

  /** Focus event */
  @Event() switchFocus: EventEmitter<void>;

  /** Blur event */
  @Event() switchBlur: EventEmitter<void>;

  private handleChange = (event: Event) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.switchChange.emit({ checked: this.checked, value: this.value });
  };

  private handleFocus = () => {
    if (!this.disabled && !this.loading) {
      this.switchFocus.emit();
    }
  };

  private handleBlur = () => {
    if (!this.disabled && !this.loading) {
      this.switchBlur.emit();
    }
  };

  private getIcon() {
    if (this.loading) {
      return (
        <span class="switch-spinner">
          <svg class="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"/>
          </svg>
        </span>
      );
    }

    if (this.checked) {
      if (this.iconOn) return <span class="switch-icon">{this.iconOn}</span>;
      if (this.showDefaultIcons) return <span class="switch-icon">✓</span>;
    } else {
      if (this.iconOff) return <span class="switch-icon">{this.iconOff}</span>;
      if (this.showDefaultIcons) return <span class="switch-icon">✕</span>;
    }

    return null;
  }

  render() {
    const labelElement = this.label && (
      <span class="switch-label">
        {this.label}
        {this.required && <span class="switch-required">*</span>}
      </span>
    );

    return (
      <Host
        class={{
          'switch-host': true,
          'switch-disabled': this.disabled || this.loading,
          'switch-checked': this.checked,
        }}
      >
        <label
          class={{
            'switch-container': true,
            [`switch-${this.size}`]: true,
            [`switch-${this.variant}`]: true,
            [`switch-${this.shape}`]: true,
            'switch-label-left': this.labelPosition === 'left',
            'switch-label-right': this.labelPosition === 'right',
          }}
        >
          {this.labelPosition === 'left' && labelElement}
          
          <span class="switch-wrapper">
            <input
              type="checkbox"
              class="switch-input"
              checked={this.checked}
              disabled={this.disabled || this.loading}
              name={this.name}
              value={this.value}
              required={this.required}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              aria-checked={this.checked ? 'true' : 'false'}
              aria-disabled={this.disabled || this.loading ? 'true' : 'false'}
            />
            <span
              class={{
                'switch-track': true,
                'switch-track-checked': this.checked,
                'switch-track-disabled': this.disabled || this.loading,
              }}
            >
              <span
                class={{
                  'switch-thumb': true,
                  'switch-thumb-checked': this.checked,
                }}
              >
                {this.getIcon()}
              </span>
            </span>
          </span>

          {this.labelPosition === 'right' && labelElement}
        </label>
      </Host>
    );
  }
}
