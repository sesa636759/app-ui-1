import { Component, Prop, Event, EventEmitter, h, State, Element, Watch } from '@stencil/core';

@Component({
  tag: 'ui-chip',
  styleUrl: 'chip.css',
  shadow: true,
})
export class Chip {
    /**
     * Watch for counter changes to trigger re-render
     */
    @Watch('counter')
    handleCounterChange(_newValue: string | number) {
      // No-op: triggers re-render
    }
  @Element() element: HTMLElement;

  /**
   * Label text for the chip
   */
  @Prop() label: string;

  /**
   * Icon to display (can be emoji or text)
   */
  @Prop() icon?: string;

  /**
   * Image source URL for avatar style
   */
  @Prop() image?: string;

  /**
   * User avatar URL (displayed as circular avatar)
   */
  @Prop() userAvatar?: string;

  /**
   * Variant style
   */
  @Prop() variant: 'filled' | 'outlined' | 'text' = 'filled';

  /**
   * Color scheme
   */
  @Prop() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';

  /**
   * Size of the chip
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the chip is removable
   */
  @Prop() removable: boolean = false;

  /**
   * Whether the chip is clickable
   */
  @Prop() clickable: boolean = false;

  /**
   * Whether the chip is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Animation type for opening/closing
   */
  @Prop() animation: 'fade' | 'scale' | 'slide' | 'bounce' | 'none' = 'scale';

  /**
   * Animation duration in milliseconds
   */
  @Prop() animationDuration: number = 300;

  @State() isClosing: boolean = false;
  @State() isOpening: boolean = true;

  /**
   * Event emitted when chip is removed
   */
  @Event() chipRemove: EventEmitter<void>;

  /**
   * Event emitted when chip is clicked
   */
  @Event() chipClick: EventEmitter<void>;

  /**
   * Counter value to display at the end of the chip
   */
  @Prop() counter?: string | number;

  /**
   * Badge value to display near the label
   */
  @Prop() badge?: string | number;

  private handleRemove = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.isClosing = true;
      // Wait for animation to complete before emitting event
      setTimeout(() => {
        this.chipRemove.emit();
        // Remove the element from DOM
        this.element.remove();
      }, this.animationDuration);
    }
  };

  componentDidLoad() {
    // Trigger opening animation
    setTimeout(() => {
      this.isOpening = false;
    }, 50);
  }

  private handleClick = () => {
    if (this.clickable && !this.disabled) {
      this.chipClick.emit();
    }
  };

  render() {
    const classes = [
      'chip',
      `chip-${this.variant}`,
      `chip-${this.color}`,
      `chip-${this.size}`,
      this.clickable ? 'chip-clickable' : '',
      this.disabled ? 'chip-disabled' : '',
      this.isClosing ? `chip-closing-${this.animation}` : '',
      this.isOpening ? `chip-opening-${this.animation}` : '',
    ].filter(Boolean).join(' ');

    return (
      <div 
        class={classes} 
        onClick={this.handleClick}
        style={{
          '--animation-duration': `${this.animationDuration}ms`
        }}
      >
        {this.userAvatar && (
          <img src={this.userAvatar} alt="" class="chip-avatar" />
        )}
        {this.image && !this.userAvatar && (
          <img src={this.image} alt="" class="chip-image" />
        )}
        {this.icon && !this.image && !this.userAvatar && (
          <span class="chip-icon">{this.icon}</span>
        )}
        <span class="chip-label">{this.label}</span>
        {this.badge && (
          <span class="chip-badge">{this.badge}</span>
        )}
        {this.counter && (
          <span class="chip-counter">{this.counter}</span>
        )}
        {this.removable && (
          <button
            class="chip-remove"
            onClick={this.handleRemove}
            disabled={this.disabled}
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </div>
    );
  }
}
