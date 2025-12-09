import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';

export type RatingType = 'star' | 'smiley' | 'thumb';

@Component({
  tag: 'ui-rating',
  styleUrl: 'rating.css',
  shadow: true,
})
export class Rating {
  /**
   * Type of rating
   */
  @Prop() type: RatingType = 'star';

  /**
   * Current rating value
   */
  @Prop({ mutable: true }) value: number = 0;

  /**
   * Maximum rating value (for star and smiley types)
   */
  @Prop() max: number = 5;

  /**
   * Size of the rating icons
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Color of active rating
   */
  @Prop() color: 'primary' | 'warning' | 'success' | 'danger' = 'warning';

  /**
   * Read-only mode
   */
  @Prop() readonly: boolean = false;

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Allow half ratings (only for star type)
   */
  @Prop() allowHalf: boolean = false;

  /**
   * Show rating value text
   */
  @Prop() showValue: boolean = false;

  /**
   * Custom labels for ratings
   */
  @Prop() labels?: string;

  @State() hoverValue: number = 0;

  /**
   * Emitted when rating changes
   */
  @Event() ratingChange: EventEmitter<number>;

  private getLabels(): string[] {
    if (this.labels) {
      try {
        return typeof this.labels === 'string' ? JSON.parse(this.labels) : this.labels;
      } catch {
        return [];
      }
    }
    return [];
  }

  private handleClick = (rating: number) => {
    if (this.readonly || this.disabled) return;
    
    if (this.type === 'thumb') {
      // Thumb: toggle between 1 (up), -1 (down), 0 (none)
      if (this.value === rating) {
        this.value = 0;
      } else {
        this.value = rating;
      }
    } else {
      // Star/Smiley: toggle if same rating clicked
      if (this.value === rating) {
        this.value = 0;
      } else {
        this.value = rating;
      }
    }
    
    this.ratingChange.emit(this.value);
  };

  private handleMouseEnter = (rating: number) => {
    if (this.readonly || this.disabled) return;
    this.hoverValue = rating;
  };

  private handleMouseLeave = () => {
    if (this.readonly || this.disabled) return;
    this.hoverValue = 0;
  };

  private getStarIcon(index: number): string {
    const currentValue = this.hoverValue || this.value;
    
    if (this.allowHalf) {
      if (currentValue >= index) return '★';
      if (currentValue >= index - 0.5) return '⯨';
      return '☆';
    }
    
    return currentValue >= index ? '★' : '☆';
  }

  private getSmileyIcon(index: number): string {
    const smileys = ['😢', '😕', '😐', '🙂', '😄'];
    const currentValue = this.hoverValue || this.value;
    
    if (currentValue === index) {
      return smileys[index - 1] || '😐';
    }
    
    // Return grayscale or outlined version when not selected
    return currentValue >= index ? smileys[index - 1] : '⚪';
  }

  private renderStarRating() {
    const items = [];
    
    for (let i = 1; i <= this.max; i++) {
      const isActive = (this.hoverValue || this.value) >= i;
      const isHalf = this.allowHalf && (this.hoverValue || this.value) >= i - 0.5 && (this.hoverValue || this.value) < i;
      
      items.push(
        <button
          class={{
            'rating-item': true,
            'rating-item-active': isActive,
            'rating-item-half': isHalf,
            'rating-item-hover': this.hoverValue >= i,
          }}
          onClick={() => this.handleClick(i)}
          onMouseEnter={() => this.handleMouseEnter(i)}
          onMouseLeave={this.handleMouseLeave}
          disabled={this.disabled}
          aria-label={`Rate ${i} out of ${this.max}`}
        >
          {this.getStarIcon(i)}
        </button>
      );
    }
    
    return items;
  }

  private renderSmileyRating() {
    const items = [];
    const labels = this.getLabels();
    
    for (let i = 1; i <= this.max; i++) {
      const isActive = (this.hoverValue || this.value) === i;
      const isSelected = this.value === i;
      
      items.push(
        <div class="smiley-item-wrapper">
          <button
            class={{
              'rating-item': true,
              'rating-item-smiley': true,
              'rating-item-active': isActive,
              'rating-item-selected': isSelected,
            }}
            onClick={() => this.handleClick(i)}
            onMouseEnter={() => this.handleMouseEnter(i)}
            onMouseLeave={this.handleMouseLeave}
            disabled={this.disabled}
            aria-label={labels[i - 1] || `Rate ${i} out of ${this.max}`}
          >
            {this.getSmileyIcon(i)}
          </button>
          {labels[i - 1] && (
            <span class="smiley-label">{labels[i - 1]}</span>
          )}
        </div>
      );
    }
    
    return items;
  }

  private renderThumbRating() {
    const thumbUpActive = this.value === 1 || this.hoverValue === 1;
    const thumbDownActive = this.value === -1 || this.hoverValue === -1;
    
    return [
      <button
        class={{
          'rating-item': true,
          'rating-item-thumb': true,
          'rating-item-active': thumbUpActive,
          'rating-item-thumb-up': true,
        }}
        onClick={() => this.handleClick(1)}
        onMouseEnter={() => this.handleMouseEnter(1)}
        onMouseLeave={this.handleMouseLeave}
        disabled={this.disabled}
        aria-label="Thumbs up"
      >
        👍
      </button>,
      <button
        class={{
          'rating-item': true,
          'rating-item-thumb': true,
          'rating-item-active': thumbDownActive,
          'rating-item-thumb-down': true,
        }}
        onClick={() => this.handleClick(-1)}
        onMouseEnter={() => this.handleMouseEnter(-1)}
        onMouseLeave={this.handleMouseLeave}
        disabled={this.disabled}
        aria-label="Thumbs down"
      >
        👎
      </button>,
    ];
  }

  render() {
    const classes = {
      'rating-container': true,
      [`rating-${this.type}`]: true,
      [`rating-${this.size}`]: true,
      [`rating-${this.color}`]: true,
      'rating-readonly': this.readonly,
      'rating-disabled': this.disabled,
    };

    const labels = this.getLabels();
    const currentLabel = this.type === 'thumb' 
      ? (this.value === 1 ? 'Liked' : this.value === -1 ? 'Disliked' : '')
      : labels[(this.hoverValue || this.value) - 1];

    return (
      <div class={classes}>
        <div class="rating-items">
          {this.type === 'star' && this.renderStarRating()}
          {this.type === 'smiley' && this.renderSmileyRating()}
          {this.type === 'thumb' && this.renderThumbRating()}
        </div>
        {(this.showValue || currentLabel) && (
          <div class="rating-value">
            {currentLabel && <span class="rating-label">{currentLabel}</span>}
            {this.showValue && this.type !== 'thumb' && (
              <span class="rating-number">
                {(this.hoverValue || this.value).toFixed(this.allowHalf ? 1 : 0)} / {this.max}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}
