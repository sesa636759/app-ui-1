import { Component, Prop, h, State, Event, EventEmitter, Method } from '@stencil/core';

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  badge?: string;
  active?: boolean;
  disabled?: boolean;
  subitems?: NavSubItem[];
  sectionHeader?: string;
}

export interface NavSubItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  tag: 'nav-bar',
  styleUrl: 'nav-bar.css',
  shadow: true,
})
export class NavBar {
  /**
   * Navigation items for the top section
   */
  @Prop() topItems: NavItem[] = [];

  /**
   * Navigation items for the bottom section
   */
  @Prop() bottomItems: NavItem[] = [];

  /**
   * Whether the navigation is collapsed (mobile/hamburger mode)
   */
  @Prop({ mutable: true, reflect: true }) collapsed: boolean = true;

  /**
   * Whether to show the hamburger menu icon
   */
  @Prop() showHamburger: boolean = true;

  /**
   * Logo URL
   */
  @Prop() logoUrl: string;

  /**
   * Logo alt text
   */
  @Prop() logoAlt: string = 'Logo';

  /**
   * Application title
   */
  @Prop() appTitle: string;

  /**
   * Whether to show search input for filtering items
   */
  @Prop() showSearch: boolean = false;

  /**
   * Search placeholder text
   */
  @Prop() searchPlaceholder: string = 'Search...';

  /**
   * Maximum number of visible items before showing overflow menu (0 = show all)
   */
  @Prop() maxVisibleItems: number = 0;

  /**
   * Event emitted when a nav item is clicked
   */
  @Event() navItemClicked: EventEmitter<{ item: NavItem | NavSubItem; isSubitem: boolean }>;

  /**
   * Event emitted when navigation is toggled
   */
  @Event() navToggled: EventEmitter<{ collapsed: boolean }>;

  @State() expandedItems: Set<string> = new Set();
  @State() searchQuery: string = '';
  @State() showOverflowMenu: boolean = false;
  @State() isHoveringMenu: boolean = false;
  @State() overflowMenuPosition: { top: string; left: string } = { top: '0px', left: '0px' };

  private overflowTriggerRef?: HTMLDivElement;

  /**
   * Toggle the navigation collapsed state
   */
  @Method()
  async toggle() {
    this.collapsed = !this.collapsed;
    this.navToggled.emit({ collapsed: this.collapsed });
  }

  /**
   * Expand the navigation
   */
  @Method()
  async expand() {
    this.collapsed = false;
    this.navToggled.emit({ collapsed: this.collapsed });
  }

  /**
   * Collapse the navigation
   */
  @Method()
  async collapse() {
    this.collapsed = true;
    this.navToggled.emit({ collapsed: this.collapsed });
  }

  private handleHamburgerClick = () => {
    this.toggle();
  };

  private handleSearchInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
  };

  private filterItems = (items: NavItem[]): NavItem[] => {
    if (!this.searchQuery) return items;
    
    return items.filter(item => {
      const labelMatch = item.label.toLowerCase().includes(this.searchQuery);
      const subitemMatch = item.subitems?.some(sub => 
        sub.label.toLowerCase().includes(this.searchQuery)
      );
      return labelMatch || subitemMatch;
    });
  };

  private splitItemsByVisibility = (items: NavItem[]): { visible: NavItem[], overflow: NavItem[] } => {
    if (this.maxVisibleItems === 0 || items.length <= this.maxVisibleItems) {
      return { visible: items, overflow: [] };
    }
    return {
      visible: items.slice(0, this.maxVisibleItems),
      overflow: items.slice(this.maxVisibleItems)
    };
  };

  private calculateOverflowMenuPosition = () => {
    if (!this.overflowTriggerRef) return;

    const triggerRect = this.overflowTriggerRef.getBoundingClientRect();
    const menuWidth = 280; // Approximate menu width
    const menuMaxHeight = 500;
    
    // Position the menu aligned with the trigger button
    let left = triggerRect.right + 8; // 8px gap from trigger
    let top = triggerRect.top;

    // Check if menu would overflow viewport on the right
    if (left + menuWidth > window.innerWidth) {
      // Position to the left of navbar instead
      left = triggerRect.left - menuWidth - 8;
    }

    // Check if menu would overflow viewport on the bottom
    if (top + menuMaxHeight > window.innerHeight) {
      // Align bottom of menu with bottom of viewport
      top = Math.max(8, window.innerHeight - menuMaxHeight - 8);
    }

    // Ensure menu doesn't go above viewport
    top = Math.max(8, top);

    this.overflowMenuPosition = {
      top: `${top}px`,
      left: `${left}px`
    };
  };

  private handleOverflowTriggerEnter = () => {
    this.calculateOverflowMenuPosition();
    this.showOverflowMenu = true;
  };

  private toggleSubitems = (itemId: string) => {
    const newExpanded = new Set(this.expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    this.expandedItems = newExpanded;
  };

  private handleItemClick = (item: NavItem, e: MouseEvent) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }

    if (item.subitems && item.subitems.length > 0) {
      e.preventDefault();
      this.toggleSubitems(item.id);
    } else {
      this.navItemClicked.emit({ item, isSubitem: false });
    }
  };

  private handleSubitemClick = (_item: NavItem, subitem: NavSubItem, e: MouseEvent) => {
    if (subitem.disabled) {
      e.preventDefault();
      return;
    }

    this.navItemClicked.emit({ item: subitem, isSubitem: true });
  };

  private renderNavItem = (item: NavItem) => {
    const hasSubitems = item.subitems && item.subitems.length > 0;
    const isExpanded = this.expandedItems.has(item.id);
    const itemClass = {
      'nav-item': true,
      'active': item.active,
      'disabled': item.disabled,
      'has-subitems': hasSubitems,
      'expanded': isExpanded,
    };

    return (
      <div>
        {item.sectionHeader && (
          <div class="nav-section-header">{item.sectionHeader}</div>
        )}
        <div class={itemClass}>
        <a
          href={item.href || '#'}
          class="nav-item-link"
          onClick={(e) => this.handleItemClick(item, e)}
        >
          {item.icon && (
            <span class="nav-item-icon" innerHTML={item.icon}></span>
          )}
          <span class="nav-item-label">{item.label}</span>
          {item.badge && (
            <span class="nav-item-badge">{item.badge}</span>
          )}
          {hasSubitems && (
            <span class="nav-item-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
              </svg>
            </span>
          )}
        </a>

        {hasSubitems && isExpanded && (
          <div class="nav-subitems">
            {item.subitems.map(subitem => this.renderSubitem(item, subitem))}
          </div>
        )}
        </div>
      </div>
    );
  };

  private renderSubitem = (parentItem: NavItem, subitem: NavSubItem) => {
    const subitemClass = {
      'nav-subitem': true,
      'active': subitem.active,
      'disabled': subitem.disabled,
    };

    return (
      <a
        href={subitem.href || '#'}
        class={subitemClass}
        onClick={(e) => this.handleSubitemClick(parentItem, subitem, e)}
      >
        <span class="nav-subitem-label">{subitem.label}</span>
      </a>
    );
  };

  render() {
    return (
      <nav class={`nav-bar ${this.collapsed ? 'collapsed' : 'expanded'}`}>
        {/* Header */}
        <div class="nav-header">
          {this.logoUrl && (
            <img src={this.logoUrl} alt={this.logoAlt} class="nav-logo" />
          )}
          {this.appTitle && (
            <span class="nav-title">{this.appTitle}</span>
          )}
          {this.showHamburger && (
            <button
              class="nav-hamburger"
              onClick={this.handleHamburgerClick}
              aria-label={this.collapsed ? 'Expand navigation' : 'Collapse navigation'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                {this.collapsed ? (
                  <g>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </g>
                ) : (
                  <g>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </g>
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Search */}
        {this.showSearch && !this.collapsed && (
          <div class="nav-search">
            <input
              type="text"
              class="nav-search-input"
              placeholder={this.searchPlaceholder}
              onInput={this.handleSearchInput}
            />
          </div>
        )}

        {/* Content */}
        <div class="nav-content">
          {/* Top Section */}
          {this.topItems && this.topItems.length > 0 && (() => {
            const filteredItems = this.filterItems(this.topItems);
            const { visible, overflow } = this.splitItemsByVisibility(filteredItems);
            return (
              <div class="nav-section nav-section-top">
                {visible.map(item => this.renderNavItem(item))}
                {overflow.length > 0 && (
                  <div class="nav-overflow">
                    <div
                      class="nav-overflow-trigger"
                      ref={(el) => this.overflowTriggerRef = el}
                      onMouseEnter={this.handleOverflowTriggerEnter}
                      onMouseLeave={() => {
                        // Delay hiding to allow mouse to move to menu
                        setTimeout(() => {
                          if (!this.isHoveringMenu) {
                            this.showOverflowMenu = false;
                          }
                        }, 100);
                      }}
                    >
                      <span class="nav-item-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </span>
                      <span class="nav-item-label">More ({overflow.length})</span>
                    </div>
                    {this.showOverflowMenu && (
                      <div
                        class="nav-overflow-menu"
                        onMouseEnter={() => {
                          this.isHoveringMenu = true;
                          this.showOverflowMenu = true;
                        }}
                        onMouseLeave={() => {
                          this.isHoveringMenu = false;
                          setTimeout(() => {
                            this.showOverflowMenu = false;
                          }, 100);
                        }}
                        style={{
                          left: this.overflowMenuPosition.left,
                          top: this.overflowMenuPosition.top
                        }}
                      >
                        {overflow.map(item => this.renderNavItem(item))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Bottom Section */}
          {this.bottomItems && this.bottomItems.length > 0 && (
            <div class="nav-section nav-section-bottom">
              {this.filterItems(this.bottomItems).map(item => this.renderNavItem(item))}
            </div>
          )}
        </div>
      </nav>
    );
  }
}
