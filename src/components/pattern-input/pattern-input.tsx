import { Component, Prop, Event, EventEmitter, h, Host, State, Watch } from '@stencil/core';

@Component({
  tag: 'ui-pattern-input',
  styleUrl: 'pattern-input.css',
  shadow: true,
})
export class UIPatternInput {
  private inputElement?: HTMLInputElement;
  private debounceTimer?: any;

  /** Current input value */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** Input pattern for display (e.g., "(###) ###-####" for phone) */
  @Prop() pattern?: string;

  /** Validation regex pattern */
  @Prop() validationRegex?: string;

  /** Placeholder text */
  @Prop() placeholder?: string;

  /** Label text */
  @Prop() label?: string;

  /** Input name for forms */
  @Prop() name?: string;

  /** Disabled state */
  @Prop() disabled: boolean = false;

  /** Required field */
  @Prop() required: boolean = false;

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Show validation status */
  @Prop() showValidation: boolean = true;

  /** Allowed characters regex (default: all) */
  @Prop() allowedChars?: string;

  /** Auto-format as user types */
  @Prop() autoFormat: boolean = true;

  /** Mask character for pattern (default: #) */
  @Prop() maskChar: string = '#';

  /** Show character counter */
  @Prop() showCounter: boolean = false;

  /** Max length */
  @Prop() maxLength?: number;

  /** Input type restriction */
  @Prop() inputType: 'text' | 'numeric' | 'alpha' | 'alphanumeric' | 'custom' = 'text';

  /** Helper text */
  @Prop() helperText?: string;

  /** Error message */
  @Prop() errorMessage?: string;

  /** Success message */
  @Prop() successMessage?: string;

  /** Validation state */
  @State() isValid: boolean = true;
  @State() isTouched: boolean = false;
  @State() isFocused: boolean = false;

  /** Value change event */
  @Event() patternInputChange: EventEmitter<{ value: string; formatted: string; isValid: boolean }>;

  /** Input event */
  @Event() patternInput: EventEmitter<{ value: string; formatted: string }>;

  /** Focus event */
  @Event() patternInputFocus: EventEmitter<void>;

  /** Blur event */
  @Event() patternInputBlur: EventEmitter<void>;

  /** Validation event */
  @Event() patternInputValidate: EventEmitter<{ isValid: boolean; value: string }>;

  @Watch('value')
  valueChanged(newValue: string) {
    this.validateInput(newValue);
  }

  componentDidLoad() {
    if (this.value) {
      this.validateInput(this.value);
    }
  }

  private getInputTypeRegex(): RegExp | null {
    switch (this.inputType) {
      case 'numeric':
        return /^[0-9]*$/;
      case 'alpha':
        return /^[a-zA-Z]*$/;
      case 'alphanumeric':
        return /^[a-zA-Z0-9]*$/;
      case 'custom':
        return this.allowedChars ? new RegExp(this.allowedChars) : null;
      default:
        return null;
    }
  }

  private isCharAllowed(char: string, currentValue: string): boolean {
    const typeRegex = this.getInputTypeRegex();
    if (typeRegex) {
      const testValue = currentValue + char;
      return typeRegex.test(testValue);
    }
    return true;
  }

  private extractRawValue(formatted: string): string {
    if (!this.pattern) return formatted;
    // Remove all non-alphanumeric characters except spaces
    return formatted.replace(/[^\w\s]/g, '').replace(/\s+/g, '');
  }

  private formatValue(raw: string): string {
    if (!this.pattern || !this.autoFormat) return raw;

    let formatted = '';
    let rawIndex = 0;

    for (let i = 0; i < this.pattern.length && rawIndex < raw.length; i++) {
      const patternChar = this.pattern[i];
      
      if (patternChar === this.maskChar) {
        formatted += raw[rawIndex];
        rawIndex++;
      } else {
        formatted += patternChar;
      }
    }

    return formatted;
  }

  private validateInput(value: string): boolean {
    if (!value && !this.required) {
      this.isValid = true;
      return true;
    }

    if (!value && this.required) {
      this.isValid = false;
      return false;
    }

    if (this.validationRegex) {
      try {
        const regex = new RegExp(this.validationRegex);
        const rawValue = this.extractRawValue(value);
        this.isValid = regex.test(rawValue);
      } catch (e) {
        console.error('Invalid validation regex:', e);
        this.isValid = false;
      }
    } else {
      this.isValid = true;
    }

    return this.isValid;
  }

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    let newValue = input.value;

    // Extract raw characters
    const raw = this.extractRawValue(newValue);

    // Apply formatting if enabled
    const formatted = this.autoFormat ? this.formatValue(raw) : raw;

    // Update value
    this.value = formatted;
    input.value = formatted;

    // Validate
    const isValid = this.validateInput(formatted);

    // Emit events
    this.patternInput.emit({ value: raw, formatted });
    
    // Debounced change event
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.patternInputChange.emit({ value: raw, formatted, isValid });
      this.patternInputValidate.emit({ isValid, value: raw });
    }, 300);
  };

  private handleKeyPress = (event: KeyboardEvent) => {
    if (this.disabled) return;

    const char = event.key;
    
    // Allow control keys
    if (char.length > 1 || event.ctrlKey || event.metaKey) return;

    const currentValue = this.extractRawValue(this.value);
    
    // Check if character is allowed
    if (!this.isCharAllowed(char, currentValue)) {
      event.preventDefault();
      return;
    }

    // Check max length
    if (this.maxLength && currentValue.length >= this.maxLength) {
      event.preventDefault();
    }
  };

  private handlePaste = (event: ClipboardEvent) => {
    if (this.disabled) return;

    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    
    // Filter pasted text based on allowed characters
    let filtered = '';
    for (const char of pastedText) {
      if (this.isCharAllowed(char, filtered)) {
        filtered += char;
      }
    }

    // Apply max length
    if (this.maxLength) {
      const currentRaw = this.extractRawValue(this.value);
      const remaining = this.maxLength - currentRaw.length;
      filtered = filtered.substring(0, remaining);
    }

    // Insert filtered text
    const formatted = this.autoFormat ? this.formatValue(filtered) : filtered;
    this.value = formatted;
    if (this.inputElement) {
      this.inputElement.value = formatted;
    }

    // Validate and emit
    const isValid = this.validateInput(formatted);
    this.patternInputChange.emit({ value: filtered, formatted, isValid });
  };

  private handleFocus = () => {
    this.isFocused = true;
    this.patternInputFocus.emit();
  };

  private handleBlur = () => {
    this.isFocused = false;
    this.isTouched = true;
    this.patternInputBlur.emit();
  };

  private getValidationMessage(): string | null {
    if (!this.isTouched || !this.showValidation) return null;

    if (!this.isValid && this.errorMessage) {
      return this.errorMessage;
    }

    if (this.isValid && this.value && this.successMessage) {
      return this.successMessage;
    }

    return null;
  }

  private getCharCount(): { current: number; max?: number } {
    const raw = this.extractRawValue(this.value);
    return {
      current: raw.length,
      max: this.maxLength,
    };
  }

  render() {
    const validationMsg = this.getValidationMessage();
    const charCount = this.getCharCount();
    const showError = this.isTouched && !this.isValid && this.showValidation;
    const showSuccess = this.isTouched && this.isValid && this.value && this.showValidation;

    return (
      <Host
        class={{
          'pattern-input-host': true,
          'pattern-input-disabled': this.disabled,
          'pattern-input-focused': this.isFocused,
          'pattern-input-error': showError,
          'pattern-input-success': showSuccess,
        }}
      >
        <div class="pattern-input-wrapper">
          {this.label && (
            <label class="pattern-input-label">
              {this.label}
              {this.required && <span class="pattern-input-required">*</span>}
            </label>
          )}

          <div
            class={{
              'pattern-input-container': true,
              [`pattern-input-${this.size}`]: true,
              'pattern-input-container-focused': this.isFocused,
              'pattern-input-container-error': showError,
              'pattern-input-container-success': showSuccess,
            }}
          >
            <input
              ref={el => (this.inputElement = el)}
              type="text"
              class="pattern-input-field"
              value={this.value}
              placeholder={this.placeholder || this.pattern}
              disabled={this.disabled}
              required={this.required}
              name={this.name}
              maxLength={this.pattern?.length || this.maxLength}
              onInput={this.handleInput}
              onKeyPress={this.handleKeyPress}
              onPaste={this.handlePaste}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              aria-invalid={showError ? 'true' : 'false'}
              aria-required={this.required ? 'true' : 'false'}
            />

            {this.showValidation && (
              <span class="pattern-input-status">
                {showError && <span class="status-icon status-error">✕</span>}
                {showSuccess && <span class="status-icon status-success">✓</span>}
              </span>
            )}
          </div>

          <div class="pattern-input-footer">
            <div class="pattern-input-messages">
              {this.helperText && !validationMsg && (
                <span class="helper-text">{this.helperText}</span>
              )}
              {validationMsg && (
                <span
                  class={{
                    'validation-message': true,
                    'validation-error': showError,
                    'validation-success': showSuccess,
                  }}
                >
                  {validationMsg}
                </span>
              )}
            </div>

            {this.showCounter && (
              <span class="char-counter">
                {charCount.current}
                {charCount.max && ` / ${charCount.max}`}
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
