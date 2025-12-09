import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

export interface TransferItem {
  key: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
}

@Component({
  tag: 'ui-transfer-list',
  styleUrl: 'transfer-list.css',
  shadow: true,
})
export class TransferList {
  /**
   * Source items (left list)
   */
  @Prop({ mutable: true }) sourceItems: TransferItem[] | string = [];

  /**
   * Target items (right list)
   */
  @Prop({ mutable: true }) targetItems: TransferItem[] | string = [];

  /**
   * Titles for source and target lists
   */
  @Prop() titles: string[] | string = ['Available', 'Selected'];

  /**
   * Enable search functionality
   */
  @Prop() searchable: boolean = true;

  /**
   * Placeholder for search input
   */
  @Prop() searchPlaceholder: string = 'Search items...';

  /**
   * Show select all checkbox
   */
  @Prop() showSelectAll: boolean = true;

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Height of each list
   */
  @Prop() height: string = '300px';

  /**
   * Show item count
   */
  @Prop() showCount: boolean = true;

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Show descriptions
   */
  @Prop() showDescriptions: boolean = true;

  /**
   * Enable drag and drop
   */
  @Prop() isDraggable: boolean = false;

  /**
   * Custom empty text
   */
  @Prop() emptyText: string = 'No items';

  /**
   * Search query for source list
   */
  @State() sourceSearch: string = '';

  /**
   * Search query for target list
   */
  @State() targetSearch: string = '';

  /**
   * Selected items in source list
   */
  @State() sourceSelected: Set<string | number> = new Set();

  /**
   * Selected items in target list
   */
  @State() targetSelected: Set<string | number> = new Set();

  /**
   * Emitted when items are transferred
   */
  @Event() transferChange: EventEmitter<{ source: TransferItem[]; target: TransferItem[] }>;

  /**
   * Event emitted when selection changes
   */
  @Event() selectionChanged: EventEmitter<{ sourceSelected: any[]; targetSelected: any[] }>;

  private getSourceItems(): TransferItem[] {
    if (typeof this.sourceItems === 'string') {
      try {
        return JSON.parse(this.sourceItems);
      } catch {
        return [];
      }
    }
    return this.sourceItems;
  }

  private getTargetItems(): TransferItem[] {
    if (typeof this.targetItems === 'string') {
      try {
        return JSON.parse(this.targetItems);
      } catch {
        return [];
      }
    }
    return this.targetItems;
  }

  private getTitles(): string[] {
    if (typeof this.titles === 'string') {
      try {
        return JSON.parse(this.titles);
      } catch {
        return ['Available', 'Selected'];
      }
    }
    return this.titles;
  }

  private filterItems(items: TransferItem[], search: string): TransferItem[] {
    if (!search) return items;
    const query = search.toLowerCase();
    return items.filter(
      item =>
        item.label.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
    );
  }

  private handleItemClick = (side: 'source' | 'target', key: string | number) => {
    const selected = side === 'source' ? this.sourceSelected : this.targetSelected;
    const newSelected = new Set(selected);

    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }

    if (side === 'source') {
      this.sourceSelected = newSelected;
    } else {
      this.targetSelected = newSelected;
    }

    this.emitSelectionChange();
  };

  private handleSelectAll = (side: 'source' | 'target', checked: boolean) => {
    const items = side === 'source' ? this.getSourceItems() : this.getTargetItems();
    const search = side === 'source' ? this.sourceSearch : this.targetSearch;
    const filteredItems = this.filterItems(items, search);
    const enabledItems = filteredItems.filter(item => !item.disabled);

    if (side === 'source') {
      this.sourceSelected = checked ? new Set(enabledItems.map(item => item.key)) : new Set();
    } else {
      this.targetSelected = checked ? new Set(enabledItems.map(item => item.key)) : new Set();
    }

    this.emitSelectionChange();
  };

  private moveToTarget = () => {
    if (this.disabled) return;

    const sourceItems = this.getSourceItems();
    const targetItems = this.getTargetItems();
    const itemsToMove = sourceItems.filter(item => this.sourceSelected.has(item.key));

    this.sourceItems = sourceItems.filter(item => !this.sourceSelected.has(item.key));
    this.targetItems = [...targetItems, ...itemsToMove];
    this.sourceSelected = new Set();

    this.transferChange.emit({
      source: this.getSourceItems(),
      target: this.getTargetItems(),
    });
    this.emitSelectionChange();
  };

  private moveToSource = () => {
    if (this.disabled) return;

    const sourceItems = this.getSourceItems();
    const targetItems = this.getTargetItems();
    const itemsToMove = targetItems.filter(item => this.targetSelected.has(item.key));

    this.targetItems = targetItems.filter(item => !this.targetSelected.has(item.key));
    this.sourceItems = [...sourceItems, ...itemsToMove];
    this.targetSelected = new Set();

    this.transferChange.emit({
      source: this.getSourceItems(),
      target: this.getTargetItems(),
    });
    this.emitSelectionChange();
  };

  private moveAllToTarget = () => {
    if (this.disabled) return;

    const sourceItems = this.getSourceItems();
    const targetItems = this.getTargetItems();
    const enabledItems = sourceItems.filter(item => !item.disabled);

    this.sourceItems = sourceItems.filter(item => item.disabled);
    this.targetItems = [...targetItems, ...enabledItems];
    this.sourceSelected = new Set();

    this.transferChange.emit({
      source: this.getSourceItems(),
      target: this.getTargetItems(),
    });
    this.emitSelectionChange();
  };

  private moveAllToSource = () => {
    if (this.disabled) return;

    const sourceItems = this.getSourceItems();
    const targetItems = this.getTargetItems();
    const enabledItems = targetItems.filter(item => !item.disabled);

    this.targetItems = targetItems.filter(item => item.disabled);
    this.sourceItems = [...sourceItems, ...enabledItems];
    this.targetSelected = new Set();

    this.transferChange.emit({
      source: this.getSourceItems(),
      target: this.getTargetItems(),
    });
    this.emitSelectionChange();
  };

  private emitSelectionChange() {
    this.selectionChanged.emit({
      sourceSelected: Array.from(this.sourceSelected),
      targetSelected: Array.from(this.targetSelected),
    });
  }

  private handleDragStart = (event: DragEvent, item: TransferItem) => {
    if (this.disabled || item.disabled) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  private handleDrop = (event: DragEvent, targetSide: 'source' | 'target') => {
    event.preventDefault();
    if (this.disabled) return;

    try {
      const item: TransferItem = JSON.parse(event.dataTransfer.getData('text/plain'));
      const sourceItems = this.getSourceItems();
      const targetItems = this.getTargetItems();

      if (targetSide === 'target') {
        // Move to target
        if (sourceItems.find(i => i.key === item.key)) {
          this.sourceItems = sourceItems.filter(i => i.key !== item.key);
          this.targetItems = [...targetItems, item];
        }
      } else {
        // Move to source
        if (targetItems.find(i => i.key === item.key)) {
          this.targetItems = targetItems.filter(i => i.key !== item.key);
          this.sourceItems = [...sourceItems, item];
        }
      }

      this.transferChange.emit({
        source: this.getSourceItems(),
        target: this.getTargetItems(),
      });
    } catch (e) {
      console.error('Drop failed:', e);
    }
  };

  private handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  private renderList(side: 'source' | 'target') {
    const items = side === 'source' ? this.getSourceItems() : this.getTargetItems();
    const search = side === 'source' ? this.sourceSearch : this.targetSearch;
    const selected = side === 'source' ? this.sourceSelected : this.targetSelected;
    const titles = this.getTitles();
    const title = side === 'source' ? titles[0] : titles[1];

    const filteredItems = this.filterItems(items, search);
    const enabledFilteredItems = filteredItems.filter(item => !item.disabled);
    const allSelected = enabledFilteredItems.length > 0 && enabledFilteredItems.every(item => selected.has(item.key));
    const someSelected = enabledFilteredItems.some(item => selected.has(item.key)) && !allSelected;

    return (
      <div class="transfer-list">
        <div class="transfer-header">
          <div class="transfer-title">
            {this.showSelectAll && (
              <label class="transfer-checkbox-label">
                <input
                  type="checkbox"
                  class="transfer-checkbox"
                  checked={allSelected}
                  indeterminate={someSelected}
                  disabled={this.disabled || enabledFilteredItems.length === 0}
                  onChange={e => this.handleSelectAll(side, (e.target as HTMLInputElement).checked)}
                />
                <span class="transfer-title-text">{title}</span>
              </label>
            )}
            {!this.showSelectAll && <span class="transfer-title-text">{title}</span>}
            {this.showCount && (
              <span class="transfer-count">
                {selected.size > 0 ? `${selected.size}/` : ''}
                {filteredItems.length}
              </span>
            )}
          </div>
        </div>

        {this.searchable && (
          <div class="transfer-search">
            <input
              type="text"
              class="transfer-search-input"
              placeholder={this.searchPlaceholder}
              value={search}
              disabled={this.disabled}
              onInput={e =>
                side === 'source'
                  ? (this.sourceSearch = (e.target as HTMLInputElement).value)
                  : (this.targetSearch = (e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}

        <div
          class="transfer-body"
          style={{ height: this.height }}
          onDrop={e => this.isDraggable && this.handleDrop(e, side)}
          onDragOver={e => this.isDraggable && this.handleDragOver(e)}
        >
          {filteredItems.length === 0 ? (
            <div class="transfer-empty">{this.emptyText}</div>
          ) : (
            <ul class="transfer-items">
              {filteredItems.map(item => (
                <li
                  class={{
                    'transfer-item': true,
                    'transfer-item-selected': selected.has(item.key),
                    'transfer-item-disabled': item.disabled,
                  }}
                  draggable={this.isDraggable && !this.disabled && !item.disabled}
                  onDragStart={e => this.handleDragStart(e, item)}
                  onClick={() => !item.disabled && this.handleItemClick(side, item.key)}
                >
                  <label class="transfer-item-label">
                    <input
                      type="checkbox"
                      class="transfer-checkbox"
                      checked={selected.has(item.key)}
                      disabled={item.disabled || this.disabled}
                      onChange={() => {}}
                    />
                    <div class="transfer-item-content">
                      {item.icon && <span class="transfer-item-icon">{item.icon}</span>}
                      <div class="transfer-item-text">
                        <div class="transfer-item-title">{item.label}</div>
                        {this.showDescriptions && item.description && (
                          <div class="transfer-item-description">{item.description}</div>
                        )}
                      </div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  render() {
    const hasSourceSelection = this.sourceSelected.size > 0;
    const hasTargetSelection = this.targetSelected.size > 0;
    const sourceItems = this.getSourceItems();
    const targetItems = this.getTargetItems();
    const hasSourceItems = sourceItems.filter(item => !item.disabled).length > 0;
    const hasTargetItems = targetItems.filter(item => !item.disabled).length > 0;

    return (
      <Host>
        <div
          class={{
            'transfer-container': true,
            [`transfer-${this.size}`]: true,
            'transfer-disabled': this.disabled,
          }}
        >
          {this.renderList('source')}

          <div class="transfer-controls">
            <button
              class="transfer-button"
              disabled={!hasSourceSelection || this.disabled}
              onClick={this.moveToTarget}
              title="Move selected to target"
            >
              ›
            </button>
            <button
              class="transfer-button"
              disabled={!hasSourceItems || this.disabled}
              onClick={this.moveAllToTarget}
              title="Move all to target"
            >
              »
            </button>
            <button
              class="transfer-button"
              disabled={!hasTargetSelection || this.disabled}
              onClick={this.moveToSource}
              title="Move selected to source"
            >
              ‹
            </button>
            <button
              class="transfer-button"
              disabled={!hasTargetItems || this.disabled}
              onClick={this.moveAllToSource}
              title="Move all to source"
            >
              «
            </button>
          </div>

          {this.renderList('target')}
        </div>
      </Host>
    );
  }
}
