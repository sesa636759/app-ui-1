import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  tag: 'ui-breadcrumb',
  styleUrl: 'breadcrumb.css',
  shadow: true,
})
export class Breadcrumb {
  /**
   * Array of breadcrumb items
   */
  @Prop() items: BreadcrumbItem[] | string = [];

  /**
   * Separator between breadcrumb items
   */
  @Prop() separator: string = '/';

  /**
   * Custom separator icon (overrides separator text)
   */
  @Prop() separatorIcon: string;

  /**
   * Maximum number of items to display before collapsing
   */
  @Prop() maxItems: number = 0;

  /**
   * Show home icon as first item
   */
  @Prop() showHome: boolean = false;

  /**
   * Home icon
   */
  @Prop() homeIcon: string = '🏠';

  /**
   * Size of breadcrumb items
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Event emitted when a breadcrumb item is clicked
   */
  @Event() breadcrumbClick: EventEmitter<BreadcrumbItem>;

  private parseItems(): BreadcrumbItem[] {
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

  private handleItemClick = (item: BreadcrumbItem, event: Event) => {
    if (item.disabled || item.active) {
      event.preventDefault();
      return;
    }
    this.breadcrumbClick.emit(item);
  };

  private renderCollapsedItems(items: BreadcrumbItem[]) {
    if (this.maxItems === 0 || items.length <= this.maxItems) {
      return this.renderAllItems(items);
    }

    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-(this.maxItems - 2));
    
    return [
      ...firstItems.map((item, index) => this.renderItem(item, index)),
      this.renderSeparator('collapse'),
      <span class="breadcrumb-collapse">...</span>,
      this.renderSeparator('collapse-after'),
      ...lastItems.map((item, index) => this.renderItem(item, index + items.length - lastItems.length)),
    ];
  }

  private renderAllItems(items: BreadcrumbItem[]) {
    return items.map((item, index) => [
      this.renderItem(item, index),
      index < items.length - 1 && this.renderSeparator(`sep-${index}`),
    ]);
  }

  private renderSeparator(key: string) {
    return (
      <span class="breadcrumb-separator" key={key}>
        {this.separatorIcon ? (
          <span innerHTML={this.separatorIcon}></span>
        ) : (
          this.separator
        )}
      </span>
    );
  }

  private renderItem(item: BreadcrumbItem, index: number) {
    const classes = {
      'breadcrumb-item': true,
      'active': item.active,
      'disabled': item.disabled,
      [`size-${this.size}`]: true,
    };

    const content = (
      <span class="breadcrumb-content">
        {item.icon && <span class="breadcrumb-icon" innerHTML={item.icon}></span>}
        <span class="breadcrumb-label">{item.label}</span>
      </span>
    );

    if (item.href && !item.disabled && !item.active) {
      return (
        <a
          key={`item-${index}`}
          href={item.href}
          class={classes}
          onClick={(e) => this.handleItemClick(item, e)}
        >
          {content}
        </a>
      );
    }

    return (
      <span key={`item-${index}`} class={classes}>
        {content}
      </span>
    );
  }

  render() {
    const items = this.parseItems();
    
    return (
      <nav class={`breadcrumb breadcrumb-${this.size}`} aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          {this.showHome && (
            <li class="breadcrumb-item-wrapper">
              <a href="/" class={`breadcrumb-item home size-${this.size}`}>
                <span class="breadcrumb-icon" innerHTML={this.homeIcon}></span>
              </a>
              {items.length > 0 && this.renderSeparator('home-sep')}
            </li>
          )}
          {items.map((_, index) => (
            <li key={`wrapper-${index}`} class="breadcrumb-item-wrapper">
              {this.maxItems > 0 ? this.renderCollapsedItems(items) : this.renderAllItems(items)}
            </li>
          ))[0]}
        </ol>
      </nav>
    );
  }
}
