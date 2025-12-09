import { Component, Prop, State, h, Element, Listen } from '@stencil/core';
import { AvatarGroupProps } from './types';

@Component({
  tag: 'ui-avatar-group',
  styleUrl: 'avatar-group.css',
  shadow: true,
})
export class AvatarGroup implements AvatarGroupProps {
  @Element() host: HTMLElement;

  /**
   * Array of avatar props
   */
  @Prop() avatars: AvatarGroupProps['avatars'] = [];

  /**
   * Maximum number of avatars to show before grouping
   */
  @Prop() maxVisible: number = 5;

  /**
   * Alias for maxVisible (backward compatibility)
   */
  @Prop() max: number;

  /**
   * Size of avatars (used to calculate overlap)
   */
  @Prop() size: string = '40px';

  @State() isHovered: boolean = false;
  @State() slottedAvatars: Element[] = [];
  @State() hoveredAvatar: { src?: string; content?: string; index: number } | null = null;

  componentDidLoad() {
    // Initialize once after load; subsequent updates handled by slotchange
    this.updateSlottedAvatars();
  }

  private updateSlottedAvatars() {
    const slot = this.host.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const elements = (slot as HTMLSlotElement).assignedElements();
    const filtered = elements.filter(el => el.tagName.toLowerCase() === 'ui-avatar');

    // Only update state if it actually changed to avoid re-render loops
    const changed = filtered.length !== this.slottedAvatars.length ||
      filtered.some((el, idx) => this.slottedAvatars[idx] !== el);

    if (changed) {
      this.slottedAvatars = filtered;
    }
  }

  @Listen('slotchange')
  handleSlotChange() {
    // Update when slot content changes; avoids updating state during render
    this.updateSlottedAvatars();
  }

  private handleMouseEnter = () => {
    this.isHovered = true;
  };

  private handleMouseLeave = () => {
    this.isHovered = false;
  };

  private handleAvatarMouseEnter = (avatar: any, index: number) => {
    this.hoveredAvatar = { src: avatar.src, content: avatar.content, index };
  };

  private handleAvatarMouseLeave = () => {
    this.hoveredAvatar = null;
  };

  render() {
    const maxToShow = this.max || this.maxVisible;
    const totalAvatars = this.avatars.length > 0 ? this.avatars.length : this.slottedAvatars.length;
    const extraCount = Math.max(0, totalAvatars - maxToShow);

    // Calculate 50% overlap: show only 50% of avatar width
    const sizeValue = parseInt(this.size);
    const overlapMargin = -(sizeValue * 0.5); // 50% overlap

    // If avatars prop is used
    if (this.avatars.length > 0) {
      const visibleAvatars = this.isHovered ? this.avatars : this.avatars.slice(0, maxToShow);
      
      return (
        <div
          class="avatar-group"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={{
            '--overlap-margin': `${overlapMargin}px`,
            '--avatar-size': this.size
          }}
        >
          {visibleAvatars.map((avatar, index) => (
            <ui-avatar
              key={index}
              content={avatar.content}
              src={avatar.src}
              icon={avatar.icon}
              shape="circle"
              badge={avatar.badge}
              size={avatar.size || this.size}
              class={this.isHovered ? 'avatar-elevated' : ''}
              style={{ zIndex: `${visibleAvatars.length - index}` }}
              onMouseEnter={() => this.handleAvatarMouseEnter(avatar, index)}
              onMouseLeave={this.handleAvatarMouseLeave}
            />
          ))}
          {!this.isHovered && extraCount > 0 && (
            <div class="avatar-extra" style={{ width: this.size, height: this.size }}>
              +{extraCount}
            </div>
          )}
          {this.hoveredAvatar && (
            <div class="avatar-modal-backdrop" onClick={this.handleAvatarMouseLeave}>
              <div class="avatar-modal">
                {this.hoveredAvatar.src ? (
                  <img src={this.hoveredAvatar.src} alt="Avatar" />
                ) : (
                  <div class="avatar-modal-content">{this.hoveredAvatar.content}</div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // If using slotted content
    return (
      <div
        class={`avatar-group ${this.isHovered ? 'expanded' : ''}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{
          '--max-visible': maxToShow.toString(),
          '--total-avatars': totalAvatars.toString(),
          '--overlap-margin': `${overlapMargin}px`,
          '--avatar-size': this.size
        }}
      >
        <slot />
        {!this.isHovered && extraCount > 0 && (
          <div class="avatar-extra" style={{ width: this.size, height: this.size }}>
            +{extraCount}
          </div>
        )}
      </div>
    );
  }
}
