import { Component, Prop, h } from '@stencil/core';

export type SkeletonShape = 'rectangle' | 'circle' | 'square' | 'oval' | 'rounded-square' | 'rounded-rectangle' | 'rounded' | 'text' | 'avatar' | 'button' | 'card' | 'list-item';
export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  tag: 'skeleton-loader',
  styleUrl: 'skeleton-loader.css',
  shadow: true,
})
export class SkeletonLoader {
  /**
   * Shape of the skeleton
   */
  @Prop() shape: SkeletonShape = 'rectangle';

  /**
   * Predefined size of the skeleton (xs, sm, md, lg, xl, 2xl)
   */
  @Prop() size: SkeletonSize = 'md';

  /**
   * Width of the skeleton
   */
  @Prop() width: string = '100%';

  /**
   * Height of the skeleton
   */
  @Prop() height: string = '20px';

  /**
   * Border radius for rounded shapes
   */
  @Prop() borderRadius: string = '4px';

  /**
   * Whether to show animation
   */
  @Prop() animated: boolean = true;

  /**
   * Animation type: 'pulse' or 'wave'
   */
  @Prop() animationType: 'pulse' | 'wave' = 'pulse';

  /**
   * Custom class for additional styling
   */
  @Prop() customClass: string = '';

  private getSizeDimensions() {
    const sizeMap = {
      'xs': { width: '16px', height: '16px' },
      'sm': { width: '24px', height: '24px' },
      'md': { width: '32px', height: '32px' },
      'lg': { width: '48px', height: '48px' },
      'xl': { width: '64px', height: '64px' },
      '2xl': { width: '80px', height: '80px' },
    };

    return sizeMap[this.size] || sizeMap['md'];
  }

  private getSkeletonStyles() {
    // Use size dimensions as defaults if width/height are not explicitly set
    const sizeDims = this.getSizeDimensions();
    const baseStyles: any = {
      width: this.width !== '100%' ? this.width : sizeDims.width,
      height: this.height !== '20px' ? this.height : sizeDims.height,
    };

    switch (this.shape) {
      case 'circle':
        baseStyles.borderRadius = '50%';
        // Ensure width and height are equal for circles
        const circleSize = Math.min(parseInt(this.width), parseInt(this.height) || parseInt(this.width));
        baseStyles.width = `${circleSize}px`;
        baseStyles.height = `${circleSize}px`;
        break;

      case 'square':
        // Ensure width and height are equal for squares
        const squareSize = Math.min(parseInt(this.width), parseInt(this.height) || parseInt(this.width));
        baseStyles.width = `${squareSize}px`;
        baseStyles.height = `${squareSize}px`;
        baseStyles.borderRadius = '0';
        break;

      case 'oval':
        baseStyles.borderRadius = '50%';
        // Oval allows different width and height (ellipse)
        break;

      case 'rounded-square':
        // Ensure width and height are equal for rounded squares
        const roundedSquareSize = Math.min(parseInt(this.width), parseInt(this.height) || parseInt(this.width));
        baseStyles.width = `${roundedSquareSize}px`;
        baseStyles.height = `${roundedSquareSize}px`;
        baseStyles.borderRadius = this.borderRadius;
        break;

      case 'rounded-rectangle':
        baseStyles.borderRadius = this.borderRadius;
        // Rounded rectangle allows different width and height
        break;

      case 'rounded':
        baseStyles.borderRadius = this.borderRadius;
        break;

      case 'text':
        baseStyles.borderRadius = '4px';
        // Text shapes use smaller heights based on size
        const textSizeMap = {
          'xs': '12px',
          'sm': '14px',
          'md': '16px',
          'lg': '18px',
          'xl': '20px',
          '2xl': '24px',
        };
        baseStyles.height = textSizeMap[this.size] || '16px';
        break;

      case 'avatar':
        baseStyles.borderRadius = '50%';
        const avatarSize = this.getSizeDimensions();
        baseStyles.width = this.width !== '100%' ? this.width : avatarSize.width;
        baseStyles.height = this.height !== '20px' ? this.height : avatarSize.height;
        break;

      case 'button':
        baseStyles.borderRadius = '6px';
        // Button height based on size
        const buttonHeightMap = {
          'xs': '24px',
          'sm': '28px',
          'md': '32px',
          'lg': '36px',
          'xl': '40px',
          '2xl': '44px',
        };
        baseStyles.height = this.height !== '20px' ? this.height : (buttonHeightMap[this.size] || '32px');
        break;

      case 'card':
        baseStyles.borderRadius = '8px';
        const cardHeightMap = {
          'xs': '80px',
          'sm': '100px',
          'md': '120px',
          'lg': '160px',
          'xl': '200px',
          '2xl': '240px',
        };
        baseStyles.minHeight = this.height !== '20px' ? this.height : (cardHeightMap[this.size] || '120px');
        break;

      case 'list-item':
        baseStyles.borderRadius = '4px';
        const listItemHeightMap = {
          'xs': '32px',
          'sm': '36px',
          'md': '40px',
          'lg': '48px',
          'xl': '56px',
          '2xl': '64px',
        };
        baseStyles.height = this.height !== '20px' ? this.height : (listItemHeightMap[this.size] || '40px');
        break;

      default: // rectangle
        baseStyles.borderRadius = '0';
        break;
    }

    return baseStyles;
  }

  render() {
    const skeletonClass = {
      'skeleton-loader': true,
      'skeleton-animated': this.animated,
      [`skeleton-${this.animationType}`]: this.animated,
      [`skeleton-${this.shape}`]: true,
      [this.customClass]: !!this.customClass,
    };

    const styles = this.getSkeletonStyles();

    return (
      <div class={skeletonClass} style={styles}>
        {this.shape === 'card' && (
          <div class="skeleton-card-content">
            <div class="skeleton-card-header">
              <div class="skeleton-circle" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
              <div class="skeleton-card-title">
                <div class="skeleton-text" style={{ width: '60%', height: '16px', borderRadius: '4px' }}></div>
                <div class="skeleton-text" style={{ width: '40%', height: '12px', borderRadius: '4px' }}></div>
              </div>
            </div>
            <div class="skeleton-card-body">
              <div class="skeleton-text" style={{ width: '100%', height: '14px', borderRadius: '4px' }}></div>
              <div class="skeleton-text" style={{ width: '80%', height: '14px', borderRadius: '4px' }}></div>
              <div class="skeleton-text" style={{ width: '90%', height: '14px', borderRadius: '4px' }}></div>
            </div>
          </div>
        )}

        {this.shape === 'list-item' && (
          <div class="skeleton-list-content">
            <div class="skeleton-circle" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
            <div class="skeleton-list-text">
              <div class="skeleton-text" style={{ width: '70%', height: '14px', borderRadius: '4px' }}></div>
              <div class="skeleton-text" style={{ width: '50%', height: '12px', borderRadius: '4px' }}></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
