import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class Badge {
  /**
   * Content/number to display in badge
   */
  @Prop() value?: string | number;

  /**
   * Maximum value to display before showing "+"
   */
  @Prop() max?: number = 99;

  /**
   * Color variant
   */
  @Prop() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'danger';

  /**
   * Badge size
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Show as dot instead of number
   */
  @Prop() dot: boolean = false;

  /**
   * Position of the badge
   */
  @Prop() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';

  /**
   * Variant style
   */
  @Prop() variant: 'standard' | 'outlined' = 'standard';

  private getDisplayValue(): string {
    if (this.dot) return '';
    if (this.value === undefined || this.value === null) return '';
    
    const numValue = typeof this.value === 'number' ? this.value : parseInt(this.value);
    if (isNaN(numValue)) return this.value.toString();
    
    return numValue > this.max ? `${this.max}+` : numValue.toString();
  }

  render() {
    const classes = [
      'badge',
      `badge-${this.color}`,
      `badge-${this.size}`,
      `badge-${this.position}`,
      `badge-${this.variant}`,
      this.dot ? 'badge-dot' : '',
    ].filter(Boolean).join(' ');

    return (
      <div class="badge-wrapper">
        <slot></slot>
        <span class={classes}>
          {this.getDisplayValue()}
        </span>
      </div>
    );
  }
}
