import { Component, Prop, Event, EventEmitter, h, State, Element } from '@stencil/core';

@Component({
  tag: 'ui-tag',
  styleUrl: 'tag.css',
  shadow: true,
})
export class Tag {
  @Element() element: HTMLElement;

  /**
   * Tag label text
   */
  @Prop() label: string;

  /**
   * Color variant
   */
  @Prop() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'default' = 'default';

  /**
   * Size of the tag
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Tag variant
   */
  @Prop() variant: 'filled' | 'outlined' | 'light' = 'filled';

  /**
   * Whether tag is removable
   */
  @Prop() removable: boolean = false;

  /**
   * Whether tag is rounded
   */
  @Prop() rounded: boolean = false;

  /**
   * Icon to display at the start
   */
  @Prop() icon?: string;

  /**
   * Image source URL to display at the start
   */
  @Prop() image?: string;

  /**
   * User avatar URL (displayed as circular avatar at the start)
   */
  @Prop() userAvatar?: string;

  /**
   * Animation type for opening/closing
   */
  @Prop() animation: 'fade' | 'scale' | 'slide' | 'rotate' | 'none' = 'scale';

  /**
   * Animation duration in milliseconds
   */
  @Prop() animationDuration: number = 300;

  @State() isClosing: boolean = false;
  @State() isOpening: boolean = true;

  /**
   * Event emitted when tag is removed
   */
  @Event() tagRemove: EventEmitter<void>;

  private handleRemove = (e: Event) => {
    e.stopPropagation();
    this.isClosing = true;
    // Wait for animation to complete before emitting event
    setTimeout(() => {
      this.tagRemove.emit();
      // Remove the element from DOM
      this.element.remove();
    }, this.animationDuration);
  };

  componentDidLoad() {
    // Trigger opening animation
    setTimeout(() => {
      this.isOpening = false;
    }, 50);
  }

  /**
   * Badge content to display
   */
  @Prop() badge?: string | number;

  /**
   * Badge color variant
   */
  @Prop() badgeColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'default' = 'default';

  /**
   * Counter value to display at the end of the tag
   */
  @Prop() counter?: string | number;

  render() {
    const classes = [
      'tag',
      `tag-${this.color}`,
      `tag-${this.size}`,
      `tag-${this.variant}`,
      this.rounded ? 'tag-rounded' : '',
      this.isClosing ? `tag-closing-${this.animation}` : '',
      this.isOpening ? `tag-opening-${this.animation}` : '',
    ].filter(Boolean).join(' ');

    return (
      <span 
        class={classes}
        style={{
          '--animation-duration': `${this.animationDuration}ms`
        }}
      >
        {this.userAvatar && (
          <img src={this.userAvatar} alt="" class="tag-avatar" />
        )}
        {this.image && !this.userAvatar && (
          <img src={this.image} alt="" class="tag-image" />
        )}
        {this.icon && !this.image && !this.userAvatar && (
          <span class="tag-icon">{this.icon}</span>
        )}
        <span class="tag-label">{this.label}</span>
        {this.badge && (
          <span class={`tag-badge tag-badge-${this.badgeColor}`}>{this.badge}</span>
        )}
        {this.counter && (
          <span class="tag-counter">{this.counter}</span>
        )}
        {this.removable && (
          <button
            class="tag-remove"
            onClick={this.handleRemove}
            aria-label="Remove tag"
          >
            ×
          </button>
        )}
      </span>
    );
  }
}
