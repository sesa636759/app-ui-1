import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'a-divider',
  styleUrl: 'adivider.css',
  shadow: true,
})
export class ADivider {
  /**
   * Text to display on the divider
   */
  @Prop() text: string = '';

  /**
   * Orientation of the divider: 'horizontal' or 'vertical'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Visual variant of the divider line: 'solid', 'dashed', 'dotted', 'double-solid', 'double-dashed', or 'double-dotted'
   */
  @Prop() variant: 'solid' | 'dashed' | 'dotted' | 'double-solid' | 'double-dashed' | 'double-dotted' = 'solid';

  /**
   * Size/thickness of the divider line: 'sm', 'md', or 'lg'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Text alignment: 'left', 'center', or 'right'
   */
  @Prop() textAlign: 'left' | 'center' | 'right' = 'center';

  /**
   * Custom color for the divider line (CSS color value)
   */
  @Prop() color: string = '';

  /**
   * Custom color for the text (CSS color value)
   */
  @Prop() textColor: string = '';

  /**
   * Text transformation: 'none', 'capitalize', 'uppercase', 'lowercase'
   */
  @Prop() textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase' = 'capitalize';

  render() {
    const classes = [
      'adivider',
      `adivider-${this.orientation}`,
      `adivider-${this.variant}`,
      `adivider-${this.size}`,
      `adivider-text-${this.textAlign}`,
      this.color || this.textColor ? 'adivider-custom' : ''
    ].filter(Boolean).join(' ');

    const style = {
      ...(this.color && { '--divider-color': this.color }),
      ...(this.textColor && { '--divider-text-color': this.textColor }),
      ...(this.textTransform && { '--divider-text-transform': this.textTransform })
    };

    // For solid/dashed/dotted: only one line if no text, or one line on each side if text
    // For double variants: always two lines (above and below for horizontal)
    if (this.variant === 'double-solid' || this.variant === 'double-dashed' || this.variant === 'double-dotted') {
      return (
        <div class={classes} style={style} role="separator" aria-label={this.text || 'divider'}>
          <div class="adivider-line"></div>
          {this.text && (
            <span class="adivider-text">{this.text}</span>
          )}
          <div class="adivider-line"></div>
        </div>
      );
    }
    if (this.text) {
      return (
        <div class={classes} style={style} role="separator" aria-label={this.text || 'divider'}>
          <div class="adivider-line"></div>
          <span class="adivider-text">{this.text}</span>
          <div class="adivider-line"></div>
        </div>
      );
    }
    // Solid, dashed, dotted: only one line if no text
    return (
      <div class={classes} style={style} role="separator" aria-label={this.text || 'divider'}>
        <div class="adivider-line"></div>
      </div>
    );
  }
}