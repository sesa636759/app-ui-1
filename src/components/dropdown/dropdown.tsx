import { Component, Prop, State, h, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  children?: DropdownOption[];
  icon?: string;
}

@Component({
  tag: 'ui-dropdown',
  styleUrl: 'dropdown.css',
  shadow: true,
})
export class Dropdown {
  @Element() hostElement: HTMLElement;

  /**
   * Options as JSON string
   */
  @Prop() options: string = '[]';

  /**
   * Placeholder text
   */
  @Prop() placeholder: string = 'Select an option';

  /**
   * Enable multi-select mode
   */
  @Prop() multiSelect: boolean = false;

  /**
   * Enable cascading/hierarchical selection
   */
  @Prop() cascading: boolean = false;

  /**
   * Selected value(s) - string for single, comma-separated for multi
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Show search/filter input
   */
  @Prop() searchable: boolean = false;

  /**
   * Maximum height of dropdown (in pixels)
   */
  @Prop() maxHeight: number = 300;

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Appearance: default dropdown or button-like (no arrow)
   */
  @Prop() appearance: 'dropdown' | 'button' = 'dropdown';

  /**
   * Controls visibility of the arrow icon. If false, no arrow is shown.
   * Defaults to true for dropdown appearance; false when appearance is 'button'.
   */
  @Prop() showArrow?: boolean;

  /**
   * Show clear button
   */
  @Prop() clearable: boolean = true;

  @State() isOpen: boolean = false;
  @State() parsedOptions: DropdownOption[] = [];
  @State() selectedValues: Set<string> = new Set();
  @State() searchQuery: string = '';
  @State() expandedNodes: Set<string> = new Set();
  @State() dropdownPosition: 'bottom' | 'top' = 'bottom';
  @State() menuLeft: number = 0;
  @State() menuTop: number = 0;
  @State() menuWidth: number = 0;

  /**
   * Emitted when value changes
   */
  @Event() valueChange: EventEmitter<{ value: string; selectedOptions: DropdownOption[] }>;

  /**
   * Emitted when dropdown opens
   */
  @Event() dropdownOpen: EventEmitter<void>;

  /**
   * Emitted when dropdown closes
   */
  @Event() dropdownClose: EventEmitter<void>;

  private searchInputRef: HTMLInputElement;

  @Watch('options')
  handleOptionsChange(newValue: string) {
    this.parseOptions(newValue);
  }

  @Watch('value')
  handleValueChange(newValue: string) {
    this.updateSelectedValues(newValue);
  }

  componentWillLoad() {
    this.parseOptions(this.options);
    this.updateSelectedValues(this.value);
  }

  connectedCallback() {
    // Recalculate position on viewport changes while open
    this.handleViewportChange = this.handleViewportChange.bind(this);
    window.addEventListener('scroll', this.handleViewportChange, true);
    window.addEventListener('resize', this.handleViewportChange);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleViewportChange, true);
    window.removeEventListener('resize', this.handleViewportChange);
  }

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent) {
    if (!this.hostElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  private parseOptions(optionsString: string) {
    try {
      this.parsedOptions = JSON.parse(optionsString);
    } catch (error) {
      console.error('Invalid JSON for dropdown options:', error);
      this.parsedOptions = [];
    }
  }

  private updateSelectedValues(valueString: string) {
    if (!valueString) {
      this.selectedValues = new Set();
    } else if (this.multiSelect) {
      this.selectedValues = new Set(valueString.split(',').filter(v => v));
    } else {
      this.selectedValues = new Set([valueString]);
    }
  }

  private toggleDropdown = () => {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.dropdownOpen.emit();
      // Calculate position based on available space
      this.calculateDropdownPosition();
      // Focus search input if searchable
      setTimeout(() => {
        if (this.searchable && this.searchInputRef) {
          this.searchInputRef.focus();
        }
        // After first paint, measure menu height for precise upward positioning
        const menuEl = this.hostElement.shadowRoot?.querySelector('.dropdown-menu') as HTMLElement | null;
        if (menuEl) {
          const menuRect = menuEl.getBoundingClientRect();
          // If opening upward, place the menu immediately above the trigger using measured height
          if (this.dropdownPosition === 'top') {
            const triggerRect = this.hostElement.getBoundingClientRect();
            const desiredTop = Math.round(triggerRect.top - menuRect.height - 4);
            this.menuTop = Math.max(4, desiredTop);
            this.menuLeft = Math.round(triggerRect.left);
            this.menuWidth = Math.round(triggerRect.width);
          }
        }
      }, 50);
    } else {
      this.dropdownClose.emit();
      this.searchQuery = '';
    }
  };

  private calculateDropdownPosition() {
    requestAnimationFrame(() => {
      const triggerRect = this.hostElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const estimatedDropdownHeight = Math.min(this.maxHeight + 20, 400); // Add padding for search/borders

      // If not enough space below but more space above, open upward
      if (spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow) {
        this.dropdownPosition = 'top';
      } else {
        this.dropdownPosition = 'bottom';
      }

      // Use fixed positioning to escape parent overflow clipping
      this.menuLeft = Math.round(triggerRect.left);
      this.menuWidth = Math.round(triggerRect.width);
      if (this.dropdownPosition === 'bottom') {
        this.menuTop = Math.round(triggerRect.bottom + 4); // 4px gap
      } else {
        // Place menu above; approximate using maxHeight
        this.menuTop = Math.round(triggerRect.top - (this.maxHeight ? this.maxHeight : estimatedDropdownHeight) - 4);
        // Prevent negative top
        if (this.menuTop < 4) this.menuTop = Math.max(4, triggerRect.top - 10);
      }
    });
  }

  private handleViewportChange() {
    if (this.isOpen) {
      this.calculateDropdownPosition();
    }
  }

  private closeDropdown = () => {
    if (this.isOpen) {
      this.isOpen = false;
      this.dropdownClose.emit();
      this.searchQuery = '';
    }
  };

  private handleOptionClick = (option: DropdownOption, event: Event) => {
    event.stopPropagation();

    if (option.disabled) return;

    if (this.cascading && option.children && option.children.length > 0) {
      // Toggle expansion for cascading nodes
      this.toggleNode(option.value);
      return;
    }

    if (this.multiSelect) {
      // Multi-select mode
      const newSelected = new Set(this.selectedValues);
      if (newSelected.has(option.value)) {
        newSelected.delete(option.value);
      } else {
        newSelected.add(option.value);
      }
      this.selectedValues = newSelected;
      this.value = Array.from(newSelected).join(',');
    } else {
      // Single-select mode
      this.selectedValues = new Set([option.value]);
      this.value = option.value;
      this.closeDropdown();
    }

    this.emitChangeEvent();
  };

  private toggleNode = (value: string) => {
    const newExpanded = new Set(this.expandedNodes);
    if (newExpanded.has(value)) {
      newExpanded.delete(value);
    } else {
      newExpanded.add(value);
    }
    this.expandedNodes = newExpanded;
  };

  private handleClear = (event: Event) => {
    event.stopPropagation();
    this.selectedValues = new Set();
    this.value = '';
    this.emitChangeEvent();
  };

  private handleSearchInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
  };

  private emitChangeEvent() {
    const selectedOptions = this.getSelectedOptions();
    this.valueChange.emit({
      value: this.value,
      selectedOptions
    });
  }

  private getSelectedOptions(): DropdownOption[] {
    const selected: DropdownOption[] = [];
    const findSelected = (options: DropdownOption[]) => {
      options.forEach(option => {
        if (this.selectedValues.has(option.value)) {
          selected.push(option);
        }
        if (option.children) {
          findSelected(option.children);
        }
      });
    };
    findSelected(this.parsedOptions);
    return selected;
  }

  private filterOptions(options: DropdownOption[]): DropdownOption[] {
    if (!this.searchQuery) return options;

    return options.filter(option => {
      const matchesLabel = option.label.toLowerCase().includes(this.searchQuery);
      const hasMatchingChildren = option.children && 
        this.filterOptions(option.children).length > 0;
      return matchesLabel || hasMatchingChildren;
    }).map(option => ({
      ...option,
      children: option.children ? this.filterOptions(option.children) : undefined
    }));
  }

  private renderOption(option: DropdownOption, level: number = 0) {
    const isSelected = this.selectedValues.has(option.value);
    const isExpanded = this.expandedNodes.has(option.value);
    const hasChildren = this.cascading && option.children && option.children.length > 0;

    return (
      <div class="dropdown-option-wrapper" key={option.value}>
        <div
          class={{
            'dropdown-option': true,
            'dropdown-option-selected': isSelected,
            'dropdown-option-disabled': option.disabled,
            'dropdown-option-parent': hasChildren
          }}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={(e) => this.handleOptionClick(option, e)}
        >
          {hasChildren && (
            <span class={`dropdown-expand-icon ${isExpanded ? 'expanded' : ''}`}>
              ▶
            </span>
          )}
          {this.multiSelect && !hasChildren && (
            <span class={`dropdown-checkbox ${isSelected ? 'checked' : ''}`}>
              {isSelected && '✓'}
            </span>
          )}
          {option.icon && <span class="dropdown-option-icon">{option.icon}</span>}
          <span class="dropdown-option-label">{option.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div class="dropdown-children">
            {option.children.map(child => this.renderOption(child, level + 1))}
          </div>
        )}
      </div>
    );
  }

  private getDisplayText(): string {
    if (this.selectedValues.size === 0) {
      return this.placeholder;
    }

    if (this.multiSelect) {
      const selectedOptions = this.getSelectedOptions();
      if (selectedOptions.length === 1) {
        return selectedOptions[0].label;
      }
      return `${selectedOptions.length} items selected`;
    } else {
      const selectedOptions = this.getSelectedOptions();
      return selectedOptions.length > 0 ? selectedOptions[0].label : this.placeholder;
    }
  }

  render() {
    const filteredOptions = this.filterOptions(this.parsedOptions);
    const displayText = this.getDisplayText();
    const hasSelection = this.selectedValues.size > 0;
    const showArrow = this.showArrow !== undefined ? this.showArrow : this.appearance !== 'button';

    return (
      <div 
        class={{
          'dropdown-container': true,
          [`dropdown-${this.size}`]: true,
          'dropdown-disabled': this.disabled,
          'dropdown-open': this.isOpen,
          'dropdown-appearance-button': this.appearance === 'button'
        }}
      >
        <div 
          class="dropdown-trigger"
          onClick={this.toggleDropdown}
        >
          <span class={{
            'dropdown-display': true,
            'dropdown-placeholder': !hasSelection
          }}>
            {displayText}
          </span>
          <div class="dropdown-icons">
            {hasSelection && this.clearable && !this.disabled && (
              <span 
                class="dropdown-clear"
                onClick={this.handleClear}
              >
                ✕
              </span>
            )}
            {showArrow && (
              <span class={`dropdown-arrow ${this.isOpen ? 'open' : ''}`}>
                ▼
              </span>
            )}
          </div>
        </div>

        {this.isOpen && (
          <div 
            class={{
              'dropdown-menu': true,
              'dropdown-menu-top': this.dropdownPosition === 'top'
            }}
            style={{ 
              maxHeight: `${this.maxHeight}px`,
              position: 'fixed',
              left: `${this.menuLeft}px`,
              top: `${this.menuTop}px`,
              width: `${this.menuWidth}px`,
              zIndex: '10000'
            }}
          >
            {this.searchable && (
              <div class="dropdown-search">
                <input
                  type="text"
                  class="dropdown-search-input"
                  placeholder="Search..."
                  value={this.searchQuery}
                  onInput={this.handleSearchInput}
                  ref={el => this.searchInputRef = el}
                />
              </div>
            )}
            <div class="dropdown-options">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => this.renderOption(option))
              ) : (
                <div class="dropdown-empty">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
