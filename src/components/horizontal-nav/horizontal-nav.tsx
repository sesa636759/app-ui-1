import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';

export interface HorizontalNavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  badge?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  tag: 'ui-horizontal-nav',
  styleUrl: 'horizontal-nav.css',
  shadow: true,
})
export class HorizontalNav {
  /**
   * Navigation items
   */
  @Prop() items: HorizontalNavItem[] | string = [];

  /**
   * Active item ID
   */
  @Prop({ mutable: true }) activeId: string;

  /**
   * Variant style
   */
  @Prop() variant: 'default' | 'pills' | 'underline' | 'segmented' = 'default';

  /**
   * Size of navigation items
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Alignment of items
   */
  @Prop() align: 'start' | 'center' | 'end' | 'space-between' = 'start';

  /**
   * Enable scrolling for overflow items
   */
  @Prop() scrollable: boolean = false;

  /**
   * Show divider between items
   */
  @Prop() showDivider: boolean = false;

  /**
   * Full width items
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Display format: 'buttons' (default) or 'list'
   */
  @Prop() displayAs: 'buttons' | 'list' = 'buttons';

  /**
   * Event emitted when a nav item is clicked
   */
  @Event() navItemClick: EventEmitter<HorizontalNavItem>;

  @State() scrollLeft: number = 0;
  @State() canScrollLeft: boolean = false;
  @State() canScrollRight: boolean = false;

  private navRef?: HTMLElement;

  private parseItems(): HorizontalNavItem[] {
    if (typeof this.items === 'string') {
      try {
        return JSON.parse(this.items);
      } catch (e) {
        console.error('Failed to parse items JSON:', e);
        return [];
      }
    }
    return this.items;
  }

  private handleItemClick = (item: HorizontalNavItem, event: Event) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.href) {
      event.preventDefault();
    }

    this.activeId = item.id;
    this.navItemClick.emit(item);
  };

  private handleScroll = () => {
    if (!this.navRef) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = this.navRef;
    this.scrollLeft = scrollLeft;
    this.canScrollLeft = scrollLeft > 0;
    this.canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
  };

  private scrollToDirection = (direction: 'left' | 'right') => {
    if (!this.navRef) return;
    
    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? this.navRef.scrollLeft - scrollAmount 
      : this.navRef.scrollLeft + scrollAmount;
    
    this.navRef.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  componentDidLoad() {
    if (this.scrollable && this.navRef) {
      this.handleScroll();
    }
  }

  render() {
    const items = this.parseItems();
    
    const containerClasses = {
      'horizontal-nav-container': true,
      'scrollable': this.scrollable,
    };

    const navClasses = {
      'horizontal-nav': true,
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      [`align-${this.align}`]: true,
      'full-width': this.fullWidth,
      'with-divider': this.showDivider,
      [`display-${this.displayAs}`]: true,
    };

    return (
      <div class={containerClasses}>
        {this.scrollable && this.canScrollLeft && (
          <button
            class="scroll-button left"
            onClick={() => this.scrollToDirection('left')}
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}
        
        <nav
          class={navClasses}
          ref={(el) => (this.navRef = el)}
          onScroll={this.handleScroll}
        >
          <ul class="nav-list">
            {items.map((item) => this.renderItem(item))}
          </ul>
        </nav>

        {this.scrollable && this.canScrollRight && (
          <button
            class="scroll-button right"
            onClick={() => this.scrollToDirection('right')}
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    );
  }

  private renderItem(item: HorizontalNavItem) {
    const isActive = item.active || item.id === this.activeId;
    
    const itemClasses = {
      'nav-item': true,
      'active': isActive,
      'disabled': item.disabled,
    };

    const content = (
      <span class="nav-item-content">
        {item.icon && <span class="nav-icon" innerHTML={item.icon}></span>}
        <span class="nav-label">{item.label}</span>
        {item.badge && <span class="nav-badge">{item.badge}</span>}
      </span>
    );

    return (
      <li key={item.id} class="nav-list-item">
        {item.href && !item.disabled ? (
          <a
            href={item.href}
            class={itemClasses}
            onClick={(e) => this.handleItemClick(item, e)}
          >
            {content}
          </a>
        ) : (
          <button
            class={itemClasses}
            disabled={item.disabled}
            onClick={(e) => this.handleItemClick(item, e)}
          >
            {content}
          </button>
        )}
      </li>
    );
  }
}
