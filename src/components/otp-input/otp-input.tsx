import { Component, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';

@Component({
  tag: 'ui-otp-input',
  styleUrl: 'otp-input.css',
  shadow: true,
})
export class OtpInput {
  @Element() el: HTMLElement;

  /**
   * Number of OTP input fields
   */
  @Prop() length: number = 6;

  /**
   * Input type (number, text, password)
   */
  @Prop() type: 'number' | 'text' | 'password' = 'number';

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Auto focus first input
   */
  @Prop() autoFocus: boolean = true;

  /**
   * Allow only numeric input
   */
  @Prop() numericOnly: boolean = true;

  /**
   * Show separator after specific positions (comma-separated, e.g., "3,6")
   */
  @Prop() separator: string = '';

  /**
   * Mask input values (show as dots)
   */
  @Prop() masked: boolean = false;

  /**
   * Initial value
   */
  @Prop() value: string = '';

  /**
   * Error state
   */
  @Prop() error: boolean = false;

  /**
   * Success state
   */
  @Prop() success: boolean = false;

  /**
   * Current OTP values
   */
  @State() otpValues: string[] = [];

  /**
   * Active input index
   */
  @State() activeIndex: number = -1;

  /**
   * Event emitted when OTP is complete
   */
  @Event() otpComplete: EventEmitter<{ value: string }>;

  /**
   * Event emitted when OTP value changes
   */
  @Event() otpChange: EventEmitter<{ value: string; isComplete: boolean }>;

  private inputRefs: HTMLInputElement[] = [];

  componentWillLoad() {
    this.initializeValues();
  }

  @Watch('value')
  handleValueChange() {
    this.initializeValues();
  }

  @Watch('length')
  handleLengthChange() {
    this.initializeValues();
  }

  private initializeValues() {
    const values = Array(this.length).fill('');
    if (this.value) {
      const chars = this.value.split('').slice(0, this.length);
      chars.forEach((char, index) => {
        values[index] = char;
      });
    }
    this.otpValues = values;
  }

  private handleInput = (index: number, event: Event) => {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Handle numeric only
    if (this.numericOnly && this.type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }

    // Get only the last character if multiple chars are entered
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Update the value
    const newValues = [...this.otpValues];
    newValues[index] = value;
    this.otpValues = newValues;

    // Move to next input if value is entered
    if (value && index < this.length - 1) {
      this.focusInput(index + 1);
    }

    // Emit change event
    const otpValue = this.otpValues.join('');
    const isComplete = otpValue.length === this.length && !otpValue.includes('');
    
    this.otpChange.emit({ value: otpValue, isComplete });

    // Emit complete event if OTP is fully entered
    if (isComplete) {
      this.otpComplete.emit({ value: otpValue });
    }
  };

  private handleKeyDown = (index: number, event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;

    // Handle backspace
    if (event.key === 'Backspace') {
      if (!input.value && index > 0) {
        // Move to previous input if current is empty
        this.focusInput(index - 1);
      } else {
        // Clear current input
        const newValues = [...this.otpValues];
        newValues[index] = '';
        this.otpValues = newValues;
        
        const otpValue = this.otpValues.join('');
        this.otpChange.emit({ value: otpValue, isComplete: false });
      }
    }

    // Handle arrow keys
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    }

    if (event.key === 'ArrowRight' && index < this.length - 1) {
      event.preventDefault();
      this.focusInput(index + 1);
    }

    // Handle delete
    if (event.key === 'Delete') {
      const newValues = [...this.otpValues];
      newValues[index] = '';
      this.otpValues = newValues;
      
      const otpValue = this.otpValues.join('');
      this.otpChange.emit({ value: otpValue, isComplete: false });
    }
  };

  private handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    
    let processedData = pastedData;
    if (this.numericOnly) {
      processedData = pastedData.replace(/[^0-9]/g, '');
    }

    const chars = processedData.split('').slice(0, this.length);
    const newValues = Array(this.length).fill('');
    
    chars.forEach((char, index) => {
      newValues[index] = char;
    });

    this.otpValues = newValues;

    // Focus the next empty input or last input
    const nextEmptyIndex = newValues.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      this.focusInput(nextEmptyIndex);
    } else {
      this.focusInput(this.length - 1);
    }

    // Emit events
    const otpValue = this.otpValues.join('');
    const isComplete = otpValue.length === this.length && !otpValue.includes('');
    
    this.otpChange.emit({ value: otpValue, isComplete });

    if (isComplete) {
      this.otpComplete.emit({ value: otpValue });
    }
  };

  private handleFocus = (index: number) => {
    this.activeIndex = index;
    // Select the content when focused
    setTimeout(() => {
      this.inputRefs[index]?.select();
    }, 0);
  };

  private handleBlur = () => {
    this.activeIndex = -1;
  };

  private focusInput(index: number) {
    if (index >= 0 && index < this.length && this.inputRefs[index]) {
      this.inputRefs[index].focus();
    }
  }

  private shouldShowSeparator(index: number): boolean {
    if (!this.separator) return false;
    const positions = this.separator.split(',').map(p => parseInt(p.trim()));
    return positions.includes(index + 1);
  }

  componentDidLoad() {
    if (this.autoFocus && !this.disabled) {
      setTimeout(() => {
        this.focusInput(0);
      }, 100);
    }
  }

  /**
   * Public method to clear all inputs
   */
  async clear() {
    this.otpValues = Array(this.length).fill('');
    this.focusInput(0);
    this.otpChange.emit({ value: '', isComplete: false });
  }

  /**
   * Public method to get current OTP value
   */
  async getValue(): Promise<string> {
    return this.otpValues.join('');
  }

  /**
   * Public method to set OTP value
   */
  async setValue(value: string) {
    const chars = value.split('').slice(0, this.length);
    const newValues = Array(this.length).fill('');
    chars.forEach((char, index) => {
      newValues[index] = char;
    });
    this.otpValues = newValues;
    
    const otpValue = this.otpValues.join('');
    const isComplete = otpValue.length === this.length && !otpValue.includes('');
    this.otpChange.emit({ value: otpValue, isComplete });
    
    if (isComplete) {
      this.otpComplete.emit({ value: otpValue });
    }
  }

  render() {
    return (
      <div
        class={{
          'otp-container': true,
          [`otp-${this.size}`]: true,
          'otp-disabled': this.disabled,
          'otp-error': this.error,
          'otp-success': this.success,
        }}
      >
        {Array.from({ length: this.length }, (_, index) => (
          <div class="otp-input-wrapper">
            <input
              ref={el => (this.inputRefs[index] = el as HTMLInputElement)}
              type={this.type}
              class={{
                'otp-input': true,
                'otp-input-active': this.activeIndex === index,
                'otp-input-filled': !!this.otpValues[index],
              }}
              value={this.masked && this.otpValues[index] ? '•' : this.otpValues[index]}
              maxlength={1}
              disabled={this.disabled}
              onInput={e => this.handleInput(index, e)}
              onKeyDown={e => this.handleKeyDown(index, e)}
              onFocus={() => this.handleFocus(index)}
              onBlur={() => this.handleBlur()}
              onPaste={index === 0 ? this.handlePaste : undefined}
              inputmode={this.numericOnly ? 'numeric' : 'text'}
              pattern={this.numericOnly ? '[0-9]*' : undefined}
              autocomplete="one-time-code"
            />
            {this.shouldShowSeparator(index) && (
              <span class="otp-separator">-</span>
            )}
          </div>
        ))}
      </div>
    );
  }
}
