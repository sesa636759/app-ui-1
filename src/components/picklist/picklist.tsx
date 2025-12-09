import { Component, Prop, h, State, Event, EventEmitter, Element, Listen, Method, Watch } from '@stencil/core';
import { PicklistOption, PicklistMode, PicklistSize, PicklistVariant, PicklistChangeEvent } from './types';

@Component({
  tag: 'ui-picklist',
  styleUrl: 'picklist.css',
  shadow: false,
})
export class Picklist {
  @Element() element: HTMLElement;

  /**
   * Array of options to display
   */
  @Prop() options: PicklistOption[] | string = [];

  @Watch('options')
  optionsChanged() {
    this.parseOptions();
    this.updateSelectedOptions();
  }

  private parseOptions() {
    if (typeof this.options === 'string') {
      try {
        this._parsedOptions = JSON.parse(this.options);
      } catch (e) {
        console.error('Invalid options JSON:', e);
        this._parsedOptions = [];
      }
    } else {
      this._parsedOptions = this.options || [];
    }
  }

  private _parsedOptions: PicklistOption[] = [];

  /**
   * Selected value(s)
   */
  @Prop({ mutable: true }) value: string | number | (string | number)[] = null;

  @Watch('value')
  valueChanged() {
    this.updateSelectedOptions();
  }

  /**
   * Selection mode: single or multi
   */
  @Prop() mode: PicklistMode = 'single';

  /**
   * Size variant
   */
  @Prop() size: PicklistSize = 'md';

  /**
   * Visual variant
   */
  @Prop() variant: PicklistVariant = 'default';

  /**
   * Placeholder text
   */
  @Prop() placeholder: string = 'Select an option...';

  /**
   * Whether the picklist is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the picklist is in loading state
   */
  @Prop() loading: boolean = false;

  /**
   * Whether to show search input
   */
  @Prop() searchable: boolean = false;

  /**
   * Search placeholder text
   */
  @Prop() searchPlaceholder: string = 'Search...';

  /**
   * Maximum number of options to show (for performance)
   */
  @Prop() maxOptions: number = 100;

  /**
   * Whether to allow clearing the selection
   */
  @Prop() clearable: boolean = false;

  /**
   * Custom trigger content (slot)
   */
  @Prop() customTrigger: boolean = false;

  /**
   * Event emitted when selection changes
   */
  @Event() picklistChange: EventEmitter<PicklistChangeEvent>;

  /**
   * Event emitted when dropdown opens
   */
  @Event() picklistOpen: EventEmitter<void>;

  /**
   * Event emitted when dropdown closes
   */
  @Event() picklistClose: EventEmitter<void>;

  @State() isOpen: boolean = false;
  @State() searchQuery: string = '';
  @State() highlightedIndex: number = -1;
  @State() selectedOptions: PicklistOption[] = [];

  private triggerRef: HTMLElement;
  private searchInputRef: HTMLInputElement;

  componentWillLoad() {
    this.parseOptions();
    this.updateSelectedOptions();
  }

  @Listen('click', { target: 'window' })
  handleWindowClick(event: Event) {
    if (!this.element.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeDropdown();
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.moveHighlight(1);
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.moveHighlight(-1);
        event.preventDefault();
        break;
      case 'Enter':
        this.selectHighlightedOption();
        event.preventDefault();
        break;
    }
  }

  private updateSelectedOptions() {
    if (this.mode === 'single') {
      const selectedOption = this._parsedOptions.find(opt => opt.value === this.value);
      this.selectedOptions = selectedOption ? [selectedOption] : [];
    } else {
      const values = Array.isArray(this.value) ? this.value : [];
      this.selectedOptions = this._parsedOptions.filter(opt => values.includes(opt.value));
    }
  }

  private get filteredOptions(): PicklistOption[] {
    let filtered = this._parsedOptions;

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(option =>
        option.label.toLowerCase().includes(query) ||
        (option.description && option.description.toLowerCase().includes(query))
      );
    }

    return filtered.slice(0, this.maxOptions);
  }

  private get displayValue(): string {
    if (this.selectedOptions.length === 0) {
      return this.placeholder;
    }

    if (this.mode === 'single') {
      return this.selectedOptions[0].label;
    } else {
      if (this.selectedOptions.length === 1) {
        return this.selectedOptions[0].label;
      }
      return `${this.selectedOptions.length} selected`;
    }
  }

  private moveHighlight(direction: number) {
    const options = this.filteredOptions;
    const maxIndex = options.length - 1;

    if (maxIndex < 0) return;

    this.highlightedIndex = Math.max(0, Math.min(maxIndex, this.highlightedIndex + direction));
  }

  private selectHighlightedOption() {
    const options = this.filteredOptions;
    if (this.highlightedIndex >= 0 && this.highlightedIndex < options.length) {
      this.selectOption(options[this.highlightedIndex]);
    }
  }

  private selectOption(option: PicklistOption) {
    if (option.disabled) return;

    if (this.mode === 'single') {
      this.value = option.value;
      this.closeDropdown();
    } else {
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(option.value);

      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }

      this.value = currentValues;
    }

    this.emitChangeEvent();
  }

  private removeOption(option: PicklistOption) {
    if (this.mode === 'multi') {
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(option.value);
      if (index > -1) {
        currentValues.splice(index, 1);
        this.value = currentValues;
        this.emitChangeEvent();
      }
    }
  }

  private clearSelection() {
    this.value = this.mode === 'single' ? null : [];
    this.emitChangeEvent();
  }

  private emitChangeEvent() {
    this.picklistChange.emit({
      value: this.value,
      selectedOptions: [...this.selectedOptions]
    });
  }

  private toggleDropdown() {
    if (this.disabled || this.loading) return;

    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private openDropdown() {
    this.isOpen = true;
    this.highlightedIndex = -1;
    this.searchQuery = '';
    this.picklistOpen.emit();

    // Focus search input if searchable
    setTimeout(() => {
      if (this.searchable && this.searchInputRef) {
        this.searchInputRef.focus();
      }
    }, 10);
  }

  private closeDropdown() {
    this.isOpen = false;
    this.picklistClose.emit();
  }

  @Method()
  async open() {
    this.openDropdown();
  }

  @Method()
  async close() {
    this.closeDropdown();
  }

  @Method()
  async focusTrigger() {
    if (this.triggerRef) {
      this.triggerRef.focus();
    }
  }

  private handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.highlightedIndex = -1;
  }

  private renderTrigger() {
    const triggerClasses = [
      'picklist-trigger',
      `picklist-trigger-${this.size}`,
      `picklist-trigger-${this.variant}`,
      {
        'picklist-trigger-open': this.isOpen,
        'picklist-trigger-disabled': this.disabled,
        'picklist-trigger-loading': this.loading,
        'picklist-trigger-has-value': this.selectedOptions.length > 0
      }
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={(el) => this.triggerRef = el}
        class={triggerClasses}
        onClick={() => this.toggleDropdown()}
        tabindex={this.disabled ? -1 : 0}
        role="combobox"
        aria-expanded={this.isOpen}
        aria-haspopup="listbox"
        aria-label={this.placeholder}
      >
        {this.customTrigger ? (
          <slot name="trigger"></slot>
        ) : (
          <div class="picklist-trigger-content">
            <span class="picklist-trigger-text">{this.displayValue}</span>
            <div class="picklist-trigger-icons">
              {this.loading && <span class="picklist-loading-icon">⟳</span>}
              {this.clearable && this.selectedOptions.length > 0 && !this.loading && (
                <button
                  class="picklist-clear-button"
                  onClick={(e) => { e.stopPropagation(); this.clearSelection(); }}
                  aria-label="Clear selection"
                >
                  ×
                </button>
              )}
              <span class="picklist-arrow">{this.isOpen ? '▲' : '▼'}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  private renderDropdown() {
    if (!this.isOpen) return null;

    const dropdownClasses = [
      'picklist-dropdown',
      `picklist-dropdown-${this.size}`
    ].join(' ');

    return (
      <div
        class={dropdownClasses}
        role="listbox"
      >
        {this.searchable && (
          <div class="picklist-search">
            <input
              ref={(el) => this.searchInputRef = el}
              type="text"
              class="picklist-search-input"
              placeholder={this.searchPlaceholder}
              value={this.searchQuery}
              onInput={(e) => this.handleSearchInput(e)}
            />
          </div>
        )}

        <div class="picklist-options">
          {this.filteredOptions.length === 0 ? (
            <div class="picklist-empty">No options found</div>
          ) : (
            this.filteredOptions.map((option, index) => this.renderOption(option, index))
          )}
        </div>

        {this.mode === 'multi' && this.selectedOptions.length > 0 && (
          <div class="picklist-footer">
            <button
              class="picklist-clear-all"
              onClick={() => this.clearSelection()}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    );
  }

  private renderOption(option: PicklistOption, index: number) {
    const isSelected = this.selectedOptions.some(selected => selected.value === option.value);
    const isHighlighted = index === this.highlightedIndex;

    const optionClasses = [
      'picklist-option',
      {
        'picklist-option-selected': isSelected,
        'picklist-option-highlighted': isHighlighted,
        'picklist-option-disabled': option.disabled
      }
    ].filter(Boolean).join(' ');

    return (
      <div
        key={option.value}
        class={optionClasses}
        onClick={() => this.selectOption(option)}
        role="option"
        aria-selected={isSelected}
      >
        {this.mode === 'multi' && (
          <span class="picklist-option-checkbox">
            {isSelected ? '☑' : '☐'}
          </span>
        )}

        <div class="picklist-option-content">
          <div class="picklist-option-label">
            {option.icon && <span class="picklist-option-icon">{option.icon}</span>}
            {option.label}
          </div>
          {option.description && (
            <div class="picklist-option-description">{option.description}</div>
          )}
        </div>
      </div>
    );
  }

  private renderSelectedTags() {
    if (this.mode !== 'multi' || !this.isOpen) return null;

    return (
      <div class="picklist-selected-tags">
        {this.selectedOptions.map(option => (
          <span key={option.value} class="picklist-tag">
            {option.label}
            <button
              class="picklist-tag-remove"
              onClick={(e) => { e.stopPropagation(); this.removeOption(option); }}
              aria-label={`Remove ${option.label}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    );
  }

  render() {
    const containerClasses = [
      'picklist-container',
      `picklist-${this.size}`,
      `picklist-${this.variant}`,
      {
        'picklist-disabled': this.disabled,
        'picklist-loading': this.loading,
        'picklist-open': this.isOpen
      }
    ].filter(Boolean).join(' ');

    return (
      <div class={containerClasses}>
        {this.renderSelectedTags()}
        {this.renderTrigger()}
        {this.renderDropdown()}
      </div>
    );
  }
}