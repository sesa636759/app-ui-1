import { Component, Prop, h, State, Event, EventEmitter, Element, Listen } from '@stencil/core';
import { CardMenuItem, CardFlipEvent, CardMenuEvent } from './types';

@Component({
  tag: 'ui-card',
  styleUrl: 'card.css',
  shadow: true,
})
export class Card {
  @Element() element: HTMLElement;

  /**
   * Unique identifier for the card
   */
  @Prop() cardId: string = '';

  /**
   * Card variant: 'default' | 'elevated' | 'outlined' | 'filled'
   */
  @Prop() variant: 'default' | 'elevated' | 'outlined' | 'filled' = 'default';

  /**
   * Enable flip animation
   */
  @Prop() flippable: boolean = false;

  /**
   * Enable hover effect
   */
  @Prop() hoverable: boolean = false;

  /**
   * Width of the card
   */
  @Prop() width: string = '100%';

  /**
   * Height of the card
   */
  @Prop() height: string = 'auto';

  /**
   * Menu items (as JSON string)
   */
  @Prop() menuItems: string = '[]';

  /**
   * Show menu button
   */
  @Prop() showMenu: boolean = false;

  /**
   * Enable card expansion
   */
  @Prop() expandable: boolean = false;

  /**
   * Border radius of the card
   */
  @Prop() borderRadius: string = '8px';

  /**
   * Border of the card
   */
  @Prop() border: string = '1px solid #e5e7eb';

  @State() isFlipped: boolean = false;
  @State() isMenuOpen: boolean = false;
  @State() isExpanded: boolean = false;
  @State() parsedMenuItems: CardMenuItem[] = [];

  @Event() cardFlip: EventEmitter<CardFlipEvent>;
  @Event() menuItemClick: EventEmitter<CardMenuEvent>;
  @Event() expandToggle: EventEmitter<{ expanded: boolean }>;

  private menuRef: HTMLDivElement;

  componentWillLoad() {
    this.parseMenuItems();
  }

  @Listen('click', { target: 'window' })
  handleClickOutside(event: MouseEvent) {
    if (this.isMenuOpen && this.menuRef && !this.menuRef.contains(event.target as Node)) {
      this.isMenuOpen = false;
    }
  }

  private parseMenuItems() {
    try {
      this.parsedMenuItems = JSON.parse(this.menuItems);
    } catch (error) {
      console.error('Invalid JSON for menu items:', error);
      this.parsedMenuItems = [];
    }
  }

  private toggleFlip = () => {
    if (!this.flippable) return;
    this.isFlipped = !this.isFlipped;
    this.cardFlip.emit({ flipped: this.isFlipped });
  };

  private toggleExpand = (event?: Event) => {
    if (event) event.stopPropagation();
    if (!this.expandable) return;
    this.isExpanded = !this.isExpanded;
    this.expandToggle.emit({ expanded: this.isExpanded });
  };

  private toggleMenu = (event: Event) => {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  };

  private handleMenuItemClick = (itemId: string, event: Event) => {
    event.stopPropagation();
    const menuItem = this.parsedMenuItems.find(item => item.id === itemId);
    if (menuItem?.disabled) return;

    // Handle expand action internally
    if (itemId === 'expand' && this.expandable) {
      this.toggleExpand();
    }

    this.menuItemClick.emit({
      itemId,
      cardId: this.cardId
    });
    this.isMenuOpen = false;
  };

  private renderMenu() {
    if (!this.showMenu || this.parsedMenuItems.length === 0) return null;

    return (
      <div class="menu-container" ref={(el) => (this.menuRef = el)}>
        <button
          class="card-action-btn"
          onClick={this.toggleMenu}
          aria-label="Card menu"
          aria-expanded={this.isMenuOpen ? 'true' : 'false'}
          aria-haspopup="true"
        >
          ⋮
        </button>
        {this.isMenuOpen && (
          <div class="menu-dropdown" role="menu">
            {this.parsedMenuItems.map(item => {
              if (item.separator) {
                return <div class="menu-separator" role="separator"></div>;
              }
              return (
                <button
                  class={[
                    'menu-item',
                    item.disabled && 'menu-item-disabled'
                  ].filter(Boolean).join(' ')}
                  onClick={(event) => this.handleMenuItemClick(item.id, event)}
                  disabled={item.disabled}
                  role="menuitem"
                  aria-disabled={item.disabled ? 'true' : 'false'}
                >
                  {item.icon && <span class="menu-item-icon">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  private renderFrontCard() {
    const cardClasses = [
      'card',
      `card-${this.variant}`,
      this.hoverable && 'card-hoverable',
      this.flippable && 'card-flippable',
      this.isExpanded && 'card-expanded'
    ].filter(Boolean).join(' ');

    const cardStyle = {
      borderRadius: this.borderRadius,
      border: this.border
    };

    return (
      <div class={cardClasses} style={cardStyle} onClick={this.flippable ? this.toggleFlip : undefined}>
        <div class="card-header">
          <slot name="header"></slot>
          <div class="card-actions">
            <slot name="actions"></slot>
            {this.renderMenu()}
          </div>
        </div>
        <div class="card-content">
          <slot name="content"></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }

  private renderBackCard() {
    if (!this.flippable) return null;

    const cardStyle = {
      borderRadius: this.borderRadius,
      border: this.border
    };

    return (
      <div class="card" style={cardStyle}>
        <div class="card-actions-back">
          <button
            class="card-action-btn"
            onClick={this.toggleFlip}
            aria-label="Flip card back"
          >
            ←
          </button>
        </div>
        <div class="card-content">
          <slot name="back-content"></slot>
        </div>
      </div>
    );
  }

  render() {
    const containerClasses = [
      'card-container',
      this.isFlipped && 'card-container-flipped'
    ].filter(Boolean).join(' ');

    const containerStyle = {
      width: this.width,
      height: this.height
    };

    if (this.flippable) {
      return (
        <div class={containerClasses} style={containerStyle}>
          <div class="card-flipper">
            <div class="card-face card-front">
              {this.renderFrontCard()}
            </div>
            <div class="card-face card-back">
              {this.renderBackCard()}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div class="card-container" style={containerStyle}>
        {this.renderFrontCard()}
      </div>
    );
  }
}
