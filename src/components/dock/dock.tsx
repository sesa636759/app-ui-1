import { Component, Prop, h, State, Event, EventEmitter } from '@stencil/core';

export interface DockItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

export interface DockItemClickEvent {
  itemId: string;
  item: DockItem;
}

@Component({
  tag: 'ui-dock',
  styleUrl: 'dock.css',
  shadow: true,
})
export class Dock {
  /**
   * Array of dock items (as JSON string)
   */
  @Prop() items: string = '[]';

  /**
   * Position of the dock: 'bottom', 'top', 'left', 'right'
   */
  @Prop() position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

  /**
   * Size of the dock: 'sm', 'md', 'lg'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Magnification effect on hover
   */
  @Prop() magnify: boolean = true;

  /**
   * Background blur effect
   */
  @Prop() blurEffect: boolean = true;

  /**
   * Show labels on hover
   */
  @Prop() showLabels: boolean = true;

  @State() parsedItems: DockItem[] = [];
  @State() hoveredIndex: number = -1;

  @Event() dockItemClick: EventEmitter<DockItemClickEvent>;

  componentWillLoad() {
    this.parseItems(this.items);
  }

  componentWillUpdate() {
    this.parseItems(this.items);
  }

  private parseItems(itemsString: string) {
    try {
      this.parsedItems = JSON.parse(itemsString);
    } catch (error) {
      console.error('Invalid JSON for dock items:', error);
      this.parsedItems = [];
    }
  }

  private handleItemClick(item: DockItem) {
    if (item.disabled) return;

    this.dockItemClick.emit({
      itemId: item.id,
      item: item
    });
  }

  private handleMouseEnter(index: number) {
    this.hoveredIndex = index;
  }

  private handleMouseLeave() {
    this.hoveredIndex = -1;
  }

  private getMagnificationScale(index: number): number {
    if (!this.magnify || this.hoveredIndex === -1) return 1;

    const distance = Math.abs(index - this.hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.2;
    return 1;
  }

  private renderDockItem(item: DockItem, index: number) {
    const scale = this.getMagnificationScale(index);
    const isHovered = this.hoveredIndex === index;

    return (
      <div
        class={{
          'dock-item': true,
          'dock-item-disabled': item.disabled,
          'dock-item-hovered': isHovered
        }}
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.2s ease'
        }}
        onClick={() => this.handleItemClick(item)}
        onMouseEnter={() => this.handleMouseEnter(index)}
        onMouseLeave={() => this.handleMouseLeave()}
        role="button"
        tabindex={item.disabled ? -1 : 0}
        aria-label={item.label}
        aria-disabled={item.disabled ? 'true' : 'false'}
      >
        <div class="dock-item-content">
          {item.icon && (
            <div class="dock-item-icon" innerHTML={item.icon}></div>
          )}
          {item.badge !== undefined && item.badge > 0 && (
            <span class="dock-item-badge">{item.badge}</span>
          )}
        </div>
        {this.showLabels && (
          <div class="dock-item-label">{item.label}</div>
        )}
      </div>
    );
  }

  render() {
    const dockClasses = {
      'dock-container': true,
      [`dock-${this.position}`]: true,
      [`dock-${this.size}`]: true,
      'dock-blur': this.blurEffect
    };

    return (
      <div class={dockClasses}>
        <div class="dock-items">
          {this.parsedItems.map((item, index) => this.renderDockItem(item, index))}
        </div>
      </div>
    );
  }
}
