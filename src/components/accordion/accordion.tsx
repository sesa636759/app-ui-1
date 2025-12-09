import { Component, Prop, h, State, Event, EventEmitter, Element, Listen, Method, Watch } from '@stencil/core';
import { AccordionItem, AccordionChangeEvent, AccordionAnimation } from './types';

@Component({
  tag: 'ui-accordion',
  styleUrl: 'accordion.css',
  shadow: true,
})
export class Accordion {
  @Element() element: HTMLElement;

  /**
   * Array of accordion items (as JSON string)
   */
  @Prop() items: string = '[]';

  /**
   * Allow multiple items to be open at once
   */
  @Prop() multiple: boolean = false;

  /**
   * IDs of items that should be open by default (as JSON string)
   */
  @Prop() defaultOpen: string = '[]';

  /**
   * Animation duration in milliseconds
   */
  @Prop() animationDuration: number = 300;

  /**
   * Animation timing function
   */
  @Prop() animationTiming: AccordionAnimation = 'ease';

  /**
   * Show numbered indicators above the accordion
   */
  @Prop() showNumbers: boolean = false;

  /**
   * Custom arrow icon for collapsed state
   */
  @Prop() arrowIconCollapsed: string = '▶';

  /**
   * Custom arrow icon for expanded state
   */
  @Prop() arrowIconExpanded: string = '▼';

  /**
   * Hide arrow icon completely
   */
  @Prop() hideArrow: boolean = false;

  /**
   * Disable the entire accordion
   */
  @Prop() disabled: boolean = false;

  @State() openItems: string[] = [];
  @State() parsedItems: AccordionItem[] = [];
  @State() parsedDefaultOpen: string[] = [];

  @Event() accordionChange: EventEmitter<AccordionChangeEvent>;

  private contentElements: Map<string, HTMLElement> = new Map();

  @Watch('items')
  parseItems(newValue: string) {
    try {
      this.parsedItems = JSON.parse(newValue);
      // Clear content elements map when items change
      this.contentElements.clear();
    } catch (error) {
      console.error('Invalid JSON for accordion items:', error);
      this.parsedItems = [];
    }
  }

  @Watch('defaultOpen')
  parseDefaultOpen(newValue: string) {
    try {
      this.parsedDefaultOpen = JSON.parse(newValue);
      this.openItems = [...this.parsedDefaultOpen];
    } catch (error) {
      console.error('Invalid JSON for defaultOpen:', error);
      this.parsedDefaultOpen = [];
    }
  }

  @Watch('multiple')
  onMultipleChange(newValue: boolean, oldValue: boolean) {
    console.log('Multiple mode changed from', oldValue, 'to', newValue);
    // When switching from multi to single mode, keep only the first open item
    if (oldValue && !newValue && this.openItems.length > 1) {
      this.openItems = [this.openItems[0]];
    }
    // Force re-render by creating new array reference
    this.openItems = [...this.openItems];
  }

  @Watch('animationDuration')
  onAnimationDurationChange() {
    // Trigger re-render
    this.openItems = [...this.openItems];
  }

  @Watch('showNumbers')
  onShowNumbersChange() {
    // Trigger re-render
    this.openItems = [...this.openItems];
  }

  componentWillLoad() {
    console.log('Accordion componentWillLoad - items:', this.items);
    console.log('Accordion componentWillLoad - defaultOpen:', this.defaultOpen);
    // Initialize parsed items
    this.parseItems(this.items);
    this.parseDefaultOpen(this.defaultOpen);
    // Initialize open items based on defaultOpen prop
    this.openItems = [...this.parsedDefaultOpen];
  }

  componentDidUpdate() {
    // Set content for all items after render
    this.parsedItems.forEach(item => {
      const contentElement = this.contentElements.get(item.id);
      if (contentElement) {
        contentElement.innerHTML = item.content;
      }
    });
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.element.contains(event.target as Node)) return;

    const target = event.target as HTMLElement;
    const item = target.closest('.accordion-item');

    if (!item) return;

    const itemId = item.getAttribute('data-id');
    if (!itemId) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleItem(itemId);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem(itemId);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem(itemId);
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastItem();
        break;
    }
  }

  private toggleItem(itemId: string) {
    if (this.disabled) return;
    const item = this.parsedItems.find(i => i.id === itemId);
    if (item?.disabled) return;

    const newOpenItems = [...this.openItems];
    console.log('Toggle item:', itemId, 'Multiple mode:', this.multiple, 'Current open items:', this.openItems);

    if (this.multiple) {
      if (newOpenItems.includes(itemId)) {
        this.openItems = newOpenItems.filter(id => id !== itemId);
      } else {
        this.openItems = [...newOpenItems, itemId];
      }
    } else {
      if (newOpenItems.includes(itemId)) {
        this.openItems = [];
      } else {
        this.openItems = [itemId];
      }
    }

    console.log('New open items:', this.openItems);

    this.accordionChange.emit({
      itemId,
      isOpen: this.openItems.includes(itemId),
      openItems: [...this.openItems]
    });
  }

  private focusNextItem(currentId: string) {
    const currentIndex = this.parsedItems.findIndex(item => item.id === currentId);
    const nextIndex = (currentIndex + 1) % this.parsedItems.length;
    this.focusItem(this.parsedItems[nextIndex].id);
  }

  private focusPreviousItem(currentId: string) {
    const currentIndex = this.parsedItems.findIndex(item => item.id === currentId);
    const prevIndex = currentIndex === 0 ? this.parsedItems.length - 1 : currentIndex - 1;
    this.focusItem(this.parsedItems[prevIndex].id);
  }

  private focusFirstItem() {
    if (this.parsedItems.length > 0) {
      this.focusItem(this.parsedItems[0].id);
    }
  }

  private focusLastItem() {
    if (this.parsedItems.length > 0) {
      this.focusItem(this.parsedItems[this.parsedItems.length - 1].id);
    }
  }

  private focusItem(itemId: string) {
    const itemElement = this.element.querySelector(`[data-id="${itemId}"] .accordion-header`) as HTMLElement;
    if (itemElement) {
      itemElement.focus();
    }
  }

  @Method()
  async openItem(itemId: string) {
    const item = this.parsedItems.find(i => i.id === itemId);
    if (item?.disabled) return;

    let newOpenItems = [...this.openItems];
    if (!this.multiple) {
      newOpenItems = [];
    }
    if (!newOpenItems.includes(itemId)) {
      newOpenItems.push(itemId);
    }
    this.openItems = newOpenItems;
  }

  @Method()
  async closeItem(itemId: string) {
    this.openItems = this.openItems.filter(id => id !== itemId);
  }

  @Method()
  async toggleItemById(itemId: string) {
    this.toggleItem(itemId);
  }

  @Method()
  async openAll() {
    if (this.multiple) {
      this.openItems = this.parsedItems.map(item => item.id);
    }
  }

  @Method()
  async closeAll() {
    this.openItems = [];
  }

  private renderItem(item: AccordionItem) {
    const isOpen = this.openItems.includes(item.id);
    const isDisabled = this.disabled || item.disabled || false;

    const itemClasses = [
      'accordion-item',
      isOpen && 'accordion-item-open',
      isDisabled && 'accordion-item-disabled'
    ].filter(Boolean).join(' ');

    const headerClasses = [
      'accordion-header',
      isDisabled && 'accordion-header-disabled'
    ].filter(Boolean).join(' ');

    const contentClasses = [
      'accordion-content',
      isOpen && 'accordion-content-open'
    ].filter(Boolean).join(' ');

    return (
      <div class={itemClasses} data-id={item.id}>
        <button
          class={headerClasses}
          onClick={() => this.toggleItem(item.id)}
          disabled={isDisabled}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${item.id}`}
          aria-label={`${isOpen ? 'Close' : 'Open'} ${item.title}`}
          tabindex={isDisabled ? -1 : 0}
        >
          <div class="accordion-header-content">
            {item.image && (
              <img src={item.image} alt="" class="accordion-image" />
            )}
            {item.icon && (
              <span class="accordion-icon">{item.icon}</span>
            )}
            <span class="accordion-title">{item.title}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span class="accordion-badge">{item.badge}</span>
            )}
          </div>
          {!this.hideArrow && (
            <span class="accordion-arrow" aria-hidden="true">
              {isOpen ? this.arrowIconExpanded : this.arrowIconCollapsed}
            </span>
          )}
        </button>

        <div
          class={contentClasses}
          id={`accordion-content-${item.id}`}
          aria-labelledby={`accordion-header-${item.id}`}
          role="region"
          style={{
            '--animation-duration': `${this.animationDuration}ms`,
            '--animation-timing': this.animationTiming
          }}
        >
          <div 
            class="accordion-content-inner"
            ref={(el) => {
              if (el) {
                this.contentElements.set(item.id, el);
                // Don't set content here, let componentDidUpdate handle it
              }
            }}
          ></div>
        </div>
      </div>
    );
  }

  private renderNumberedIndicators() {
    return (
      <div class="accordion-indicators" role="tablist" aria-label="Accordion navigation">
        {this.parsedItems.map((item, index) => {
          const isOpen = this.openItems.includes(item.id);
          const isDisabled = this.disabled || item.disabled || false;

          const indicatorClasses = [
            'accordion-indicator',
            isOpen && 'accordion-indicator-active',
            isDisabled && 'accordion-indicator-disabled'
          ].filter(Boolean).join(' ');

          return (
            <button
              key={item.id}
              class={indicatorClasses}
              onClick={() => this.toggleItem(item.id)}
              disabled={isDisabled}
              aria-label={`Open ${item.title}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              tabindex={isDisabled ? -1 : 0}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    const containerClasses = [
      'accordion-container'
    ].join(' ');

    return (
      <div class={containerClasses} role="tablist" aria-multiselectable={this.multiple}>
        {this.showNumbers && this.renderNumberedIndicators()}
        {this.parsedItems.map(item => this.renderItem(item))}
      </div>
    );
  }
}