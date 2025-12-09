import { Component, Prop, h } from '@stencil/core';
import { AvatarProps } from './types';

@Component({
  tag: 'ui-avatar',
  styleUrl: 'avatar.css',
  shadow: true,
})
export class Avatar implements AvatarProps {
  /**
   * Content to display (letter or text)
   */
  @Prop() content?: string;

  /**
   * Image source URL
   */
  @Prop() src?: string;

  /**
   * Icon to display (e.g., SVG or icon name)
   */
  @Prop() icon?: string;

  /**
   * Shape of the avatar: 'square' or 'circle'
   */
  @Prop() shape: 'square' | 'circle' = 'circle';

  /**
   * Badge text to display on the avatar
   */
  @Prop() badge?: string;

  /**
   * Badge color (applies to both dot and text badges). Accepts any CSS color.
   * Example: "#22c55e", "rgb(34,197,94)", "var(--success)".
   */
  @Prop() badgeColor?: string;

  /**
   * Size of the avatar (e.g., '40px', '2rem')
   */
  @Prop() size: string = '40px';

  private renderContent() {
    if (this.src) {
      return <img src={this.src} alt="Avatar" class="avatar-image" />;
    } else if (this.icon) {
      return <span class="avatar-icon">{this.icon}</span>;
    } else if (this.content) {
      return <span class="avatar-content">{this.content.charAt(0).toUpperCase()}</span>;
    }
    return null;
  }

  render() {
    const avatarClasses = [
      'avatar',
      `avatar-${this.shape}`,
      this.src ? 'avatar-has-image' : ''
    ].filter(Boolean).join(' ');

    const avatarStyle = {
      width: this.size,
      height: this.size,
    };

    const isDot = this.badge && this.badge.toLowerCase() === 'dot';
    const badgeStyle = this.badgeColor ? { '--avatar-badge-color': this.badgeColor } as any : undefined;

    return (
      <div class={avatarClasses} style={avatarStyle}>
        {this.renderContent()}
        {this.badge && (
          isDot ? (
            <div class="avatar-badge avatar-badge-dot" style={badgeStyle} aria-label="notification" />
          ) : (
            <div class="avatar-badge" style={badgeStyle}>
              {this.badge}
            </div>
          )
        )}
      </div>
    );
  }
}
