import { Component, Prop, h, State, Event, EventEmitter, Element, Listen, Method, Watch } from '@stencil/core';
import { TabItem, TabChangeEvent } from './types';

@Component({
  tag: 'ui-tabs',
  styleUrl: 'tabs.css',
  shadow: true,
})
export class Tabs {
  @Element() element: HTMLElement;

  /**
   * Array of tab items (as JSON string)
   */
  @Prop() items: string = '[]';

  /**
   * ID of the tab that should be active by default
   */
  @Prop() defaultActive: string = '';

  /**
   * Animation duration in milliseconds
   */
  @Prop() animationDuration: number = 300;

  /**
   * Orientation of tabs: 'horizontal' or 'vertical'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Show close all button
   */
  @Prop() showCloseAll: boolean = false;

  /**
   * Maximum width for tab titles (in pixels)
   */
  @Prop() maxTabWidth: number = 200;

  /**
   * Maximum visible length for tab titles (characters). If exceeded, title is ellipsized via CSS and full text is available in tooltip.
   */
  @Prop() maxTitleLength: number = 24;

  /**
   * Enable text wrapping in tabs
   */
  @Prop() wrapText: boolean = false;

  /**
   * Position of tabs header: 'left', 'center', 'right', 'full-width'
   */
  @Prop() position: 'left' | 'center' | 'right' | 'full-width' = 'left';

  /**
   * Scroll mode: 'auto' (auto-scroll to active), 'manual' (user controls), 'none' (no scroll)
   */
  @Prop() scrollMode: 'auto' | 'manual' | 'none' = 'manual';

  /**
   * Animation on tab selection
   */
  @Prop() selectionAnimation: 'slide' | 'fade' | 'scale' | 'none' = 'slide';

  /**
   * Icon position: 'start', 'end', 'top', 'bottom'
   */
  @Prop() iconPosition: 'start' | 'end' | 'top' | 'bottom' = 'start';

  /**
   * Show only icons (hide titles)
   */
  @Prop() iconOnly: boolean = false;

  @State() activeTab: string = '';
  @State() parsedItems: TabItem[] = [];
  @State() showScrollButtons: boolean = false;

  @Event() tabChange: EventEmitter<TabChangeEvent>;
  @Event() tabClose: EventEmitter<string>;
  @Event() closeAll: EventEmitter<void>;
  @Event() tabEdit: EventEmitter<string>;
  @Event() tabDelete: EventEmitter<string>;
  @Event() tabOpenPanel: EventEmitter<string>;

  private contentElements: Map<string, HTMLElement> = new Map();
  private tabsHeaderRef?: HTMLElement;
  private resizeObserver?: ResizeObserver;

  @Watch('items')
  parseItems(newValue: string) {
    try {
      this.parsedItems = JSON.parse(newValue);
      // Clear content elements map when items change
      this.contentElements.clear();
      // Set default active tab if not set
      if (!this.activeTab && this.parsedItems.length > 0) {
        this.activeTab = this.defaultActive || this.parsedItems[0].id;
      }
    } catch (error) {
      console.error('Invalid JSON for tab items:', error);
      this.parsedItems = [];
    }
  }

  @Watch('defaultActive')
  onDefaultActiveChange(newValue: string) {
    if (newValue && this.parsedItems.some(item => item.id === newValue)) {
      this.activeTab = newValue;
    }
  }

  componentWillLoad() {
    console.log('Tabs componentWillLoad - items:', this.items);
    console.log('Tabs componentWillLoad - defaultActive:', this.defaultActive);
    // Initialize parsed items
    this.parseItems(this.items);
    // Initialize active tab
    this.activeTab = this.defaultActive || (this.parsedItems.length > 0 ? this.parsedItems[0].id : '');
  }

  componentDidLoad() {
    this.checkScrollButtons();
    if (this.scrollMode === 'auto') {
      this.scrollToActiveTab();
    }
    // Set up resize observer to check scroll buttons
    this.resizeObserver = new ResizeObserver(() => {
      this.checkScrollButtons();
    });
    if (this.tabsHeaderRef) {
      this.resizeObserver.observe(this.tabsHeaderRef);
    }
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  componentDidUpdate() {
    // Set content for all items after render
    this.parsedItems.forEach(item => {
      const contentElement = this.contentElements.get(item.id);
      if (contentElement) {
        contentElement.innerHTML = item.content;
      }
    });
    
    // Auto-scroll to active tab if mode is auto
    if (this.scrollMode === 'auto') {
      this.scrollToActiveTab();
    }
    
    this.checkScrollButtons();
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.element.contains(event.target as Node)) return;

    const target = event.target as HTMLElement;
    const tab = target.closest('.tab-header');

    if (!tab) return;

    const tabId = tab.getAttribute('data-id');
    if (!tabId) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectTab(tabId);
        break;
      case 'ArrowRight':
        if (this.orientation === 'horizontal') {
          event.preventDefault();
          this.focusNextTab(tabId);
        }
        break;
      case 'ArrowLeft':
        if (this.orientation === 'horizontal') {
          event.preventDefault();
          this.focusPreviousTab(tabId);
        }
        break;
      case 'ArrowDown':
        if (this.orientation === 'vertical') {
          event.preventDefault();
          this.focusNextTab(tabId);
        }
        break;
      case 'ArrowUp':
        if (this.orientation === 'vertical') {
          event.preventDefault();
          this.focusPreviousTab(tabId);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstTab();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastTab();
        break;
    }
  }

  private selectTab(tabId: string) {
    const item = this.parsedItems.find(i => i.id === tabId);
    if (item?.disabled) return;

    const previousTab = this.activeTab;
    this.activeTab = tabId;

    this.tabChange.emit({
      tabId: previousTab,
      activeTab: tabId
    });
  }

  private handleCloseTab(tabId: string, event: Event) {
    event.stopPropagation();
    
    // Remove the tab from the parsed items
    const tabIndex = this.parsedItems.findIndex(item => item.id === tabId);
    if (tabIndex === -1) return;

    // If the closed tab is active, switch to another tab
    if (this.activeTab === tabId && this.parsedItems.length > 1) {
      // Switch to the next tab, or previous if it's the last tab
      const newActiveIndex = tabIndex < this.parsedItems.length - 1 ? tabIndex : tabIndex - 1;
      this.activeTab = this.parsedItems[newActiveIndex].id;
    }

    // Remove the tab
    this.parsedItems = this.parsedItems.filter(item => item.id !== tabId);
    
    // Clear the content element reference
    this.contentElements.delete(tabId);
    
    // Emit the close event
    this.tabClose.emit(tabId);
  }

  private focusNextTab(currentId: string) {
    const currentIndex = this.parsedItems.findIndex(item => item.id === currentId);
    const nextIndex = (currentIndex + 1) % this.parsedItems.length;
    this.focusTab(this.parsedItems[nextIndex].id);
  }

  private focusPreviousTab(currentId: string) {
    const currentIndex = this.parsedItems.findIndex(item => item.id === currentId);
    const prevIndex = currentIndex === 0 ? this.parsedItems.length - 1 : currentIndex - 1;
    this.focusTab(this.parsedItems[prevIndex].id);
  }

  private focusFirstTab() {
    if (this.parsedItems.length > 0) {
      this.focusTab(this.parsedItems[0].id);
    }
  }

  private focusLastTab() {
    if (this.parsedItems.length > 0) {
      this.focusTab(this.parsedItems[this.parsedItems.length - 1].id);
    }
  }

  private focusTab(tabId: string) {
    const tabElement = this.element.querySelector(`[data-id="${tabId}"] .tab-header`) as HTMLElement;
    if (tabElement) {
      tabElement.focus();
    }
  }

  private scrollToActiveTab() {
    if (!this.tabsHeaderRef || this.scrollMode === 'none') return;
    
    const activeTabElement = this.element.shadowRoot?.querySelector('.tab-header-active') as HTMLElement;
    if (activeTabElement && this.orientation === 'horizontal') {
      const containerRect = this.tabsHeaderRef.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      const scrollLeft = this.tabsHeaderRef.scrollLeft;
      
      // Calculate if tab is out of view
      if (tabRect.left < containerRect.left) {
        this.tabsHeaderRef.scrollLeft = scrollLeft - (containerRect.left - tabRect.left) - 20;
      } else if (tabRect.right > containerRect.right) {
        this.tabsHeaderRef.scrollLeft = scrollLeft + (tabRect.right - containerRect.right) + 20;
      }
    }
  }

  private checkScrollButtons() {
    if (!this.tabsHeaderRef || this.scrollMode === 'none') {
      this.showScrollButtons = false;
      return;
    }
    
    if (this.orientation === 'horizontal') {
      this.showScrollButtons = this.tabsHeaderRef.scrollWidth > this.tabsHeaderRef.clientWidth;
    } else {
      this.showScrollButtons = this.tabsHeaderRef.scrollHeight > this.tabsHeaderRef.clientHeight;
    }
  }

  private scrollTabs(direction: 'left' | 'right' | 'up' | 'down') {
    if (!this.tabsHeaderRef) return;
    
    const scrollAmount = 200;
    if (direction === 'left') {
      this.tabsHeaderRef.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      this.tabsHeaderRef.scrollLeft += scrollAmount;
    } else if (direction === 'up') {
      this.tabsHeaderRef.scrollTop -= scrollAmount;
    } else if (direction === 'down') {
      this.tabsHeaderRef.scrollTop += scrollAmount;
    }
  }

  @Method()
  async selectTabById(tabId: string) {
    this.selectTab(tabId);
  }

  @Method()
  async getActiveTab() {
    return this.activeTab;
  }

  @Method()
  async destroyComponent() {
    // Emit closeAll event before removing
    this.closeAll.emit();
    // Clear all content elements
    this.contentElements.clear();
    // Clear all tabs
    this.parsedItems = [];
    this.activeTab = '';
    // Remove the element from DOM
    this.element.remove();
  }

  private handleCloseAll(event: Event) {
    event.stopPropagation();
    this.destroyComponent();
  }

  private renderTab(item: TabItem) {
    const isActive = this.activeTab === item.id;
    const isDisabled = item.disabled || false;

    const tabClasses = [
      'tab-header',
      isActive && 'tab-header-active',
      isDisabled && 'tab-header-disabled',
      this.iconOnly && 'tab-header-icon-only',
      `icon-position-${this.iconPosition}`,
      this.wrapText && 'tab-header-wrap'
    ].filter(Boolean).join(' ');

    const tabStyle = {
      maxWidth: this.position !== 'full-width' ? `${this.maxTabWidth}px` : 'none',
      ...(item.color && isActive ? { '--tab-active-color': item.color, '--tab-active-border': item.color } : {})
    };

    const needsTooltip = !this.iconOnly && item.title && item.title.length > this.maxTitleLength;

    return (
      <button
        class={tabClasses}
        data-id={item.id}
        onClick={() => this.selectTab(item.id)}
        disabled={isDisabled}
        aria-selected={isActive}
        aria-controls={`tab-content-${item.id}`}
        aria-label={`Select ${item.title} tab`}
        tabindex={isDisabled ? -1 : 0}
        role="tab"
        style={tabStyle}
        title={needsTooltip || this.iconOnly ? item.title : undefined}
      >
        <div class="tab-header-content">
          {item.icon && (
            <span class="tab-icon">{item.icon}</span>
          )}
          {!this.iconOnly && (
            <span class="tab-title">{item.title}</span>
          )}
          {item.badge !== undefined && item.badge > 0 && (
            <span class="tab-badge">{item.badge}</span>
          )}
          {item.actions && (
            <div class="tab-actions">
              <button class="tab-menu" type="button" aria-label={`Actions for ${item.title}`} onClick={(e) => { e.stopPropagation(); }}>
                ⋯
              </button>
              <div class="tab-menu-popover" role="menu">
                <button type="button" class="tab-menu-item" role="menuitem" onClick={(e) => { e.stopPropagation(); this.tabEdit.emit(item.id); }}>Edit</button>
                <button type="button" class="tab-menu-item" role="menuitem" onClick={(e) => { e.stopPropagation(); this.tabDelete.emit(item.id); }}>Delete</button>
                <button type="button" class="tab-menu-item" role="menuitem" onClick={(e) => { e.stopPropagation(); this.tabOpenPanel.emit(item.id); }}>Open Panel</button>
              </div>
            </div>
          )}
          {item.closable && (
            <button
              class="tab-close"
              onClick={(event) => this.handleCloseTab(item.id, event)}
              aria-label={`Close ${item.title} tab`}
              type="button"
            >
              ×
            </button>
          )}
        </div>
      </button>
    );
  }

  private renderContent(item: TabItem) {
    const isActive = this.activeTab === item.id;

    const contentClasses = [
      'tab-content',
      isActive && 'tab-content-active',
      `animation-${this.selectionAnimation}`
    ].filter(Boolean).join(' ');

    return (
      <div
        class={contentClasses}
        id={`tab-content-${item.id}`}
        aria-labelledby={`tab-header-${item.id}`}
        role="tabpanel"
        aria-hidden={!isActive}
        style={{
          '--animation-duration': `${this.animationDuration}ms`
        }}
      >
        <div
          class="tab-content-inner"
          ref={(el) => {
            if (el) {
              this.contentElements.set(item.id, el);
              // Don't set content here, let componentDidUpdate handle it
            }
          }}
        ></div>
      </div>
    );
  }

  render() {
    const containerClasses = [
      'tabs-container',
      `tabs-${this.orientation}`,
      `tabs-position-${this.position}`,
      this.scrollMode !== 'none' && 'tabs-scrollable'
    ].filter(Boolean).join(' ');

    const headerWrapperClasses = [
      'tabs-header-wrapper',
      this.showScrollButtons && this.scrollMode !== 'none' && 'show-scroll-buttons'
    ].filter(Boolean).join(' ');

    return (
      <div class={containerClasses} role="tablist" aria-orientation={this.orientation}>
        <div class={headerWrapperClasses}>
          {this.showScrollButtons && this.scrollMode !== 'none' && this.orientation === 'horizontal' && (
            <button
              class="scroll-button scroll-left"
              onClick={() => this.scrollTabs('left')}
              aria-label="Scroll tabs left"
              type="button"
            >
              ‹
            </button>
          )}
          {this.showScrollButtons && this.scrollMode !== 'none' && this.orientation === 'vertical' && (
            <button
              class="scroll-button scroll-up"
              onClick={() => this.scrollTabs('up')}
              aria-label="Scroll tabs up"
              type="button"
            >
              ‹
            </button>
          )}
          <div 
            class="tabs-header" 
            ref={(el) => this.tabsHeaderRef = el}
          >
            {this.parsedItems.map(item => this.renderTab(item))}
            {this.showCloseAll && (
              <button
                class="tab-close-all"
                onClick={(event) => this.handleCloseAll(event)}
                aria-label="Close all tabs"
                type="button"
                title="Close All"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          {this.showScrollButtons && this.scrollMode !== 'none' && this.orientation === 'horizontal' && (
            <button
              class="scroll-button scroll-right"
              onClick={() => this.scrollTabs('right')}
              aria-label="Scroll tabs right"
              type="button"
            >
              ›
            </button>
          )}
          {this.showScrollButtons && this.scrollMode !== 'none' && this.orientation === 'vertical' && (
            <button
              class="scroll-button scroll-down"
              onClick={() => this.scrollTabs('down')}
              aria-label="Scroll tabs down"
              type="button"
            >
              ›
            </button>
          )}
        </div>
        <div class="tabs-content">
          {this.parsedItems.map(item => this.renderContent(item))}
        </div>
      </div>
    );
  }
}
