import { Component, Prop, State, Event, EventEmitter, h, Host, Element } from '@stencil/core';

export interface CascadeOption {
  label: string;
  value: string | number;
  children?: CascadeOption[];
  disabled?: boolean;
  icon?: string;
}

@Component({
  tag: 'ui-cascade-select',
  styleUrl: 'cascade-select.css',
  shadow: true,
})
export class CascadeSelect {
  @Element() hostElement: HTMLElement;

  /**
   * Options for cascade selection
   */
  @Prop() options: CascadeOption[] | string = [];

  /**
   * Selected values (array of values from each level)
   */
  @Prop({ mutable: true }) value: any[] | string = [];

  /**
   * Placeholder text
   */
  @Prop() placeholder: string = 'Select';

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Show full path in input
   */
  @Prop() showFullPath: boolean = true;

  /**
   * Path separator
   */
  @Prop() separator: string = ' / ';

  /**
   * Allow clearing selection
   */
  @Prop() clearable: boolean = true;

  /**
   * Expandable trigger mode
   */
  @Prop() expandTrigger: 'click' | 'hover' = 'hover';

  /**
   * Change on select (select parent or only leaf nodes)
   */
  @Prop() changeOnSelect: boolean = false;

  /**
   * Panel open state
   */
  @State() isOpen: boolean = false;

  /**
   * Current selection path
   */
  @State() selectedPath: CascadeOption[] = [];

  /**
   * Active path (for hover/expansion)
   */
  @State() activePath: CascadeOption[] = [];

  /**
   * Emitted when selection changes
   */
  @Event() cascadeChange: EventEmitter<any[]>;

  /**
   * Emitted when panel opens/closes
   */
  @Event() cascadeToggle: EventEmitter<boolean>;

  private getOptions(): CascadeOption[] {
    if (typeof this.options === 'string') {
      try {
        return JSON.parse(this.options);
      } catch {
        return [];
      }
    }
    return this.options;
  }

  private getValue(): any[] {
    if (typeof this.value === 'string') {
      try {
        return JSON.parse(this.value);
      } catch {
        return [];
      }
    }
    return this.value || [];
  }

  private findPathByValues(options: CascadeOption[], values: any[], path: CascadeOption[] = []): CascadeOption[] | null {
    if (values.length === 0) return path;

    for (const option of options) {
      if (option.value === values[0]) {
        const newPath = [...path, option];
        if (values.length === 1) return newPath;
        if (option.children) {
          const result = this.findPathByValues(option.children, values.slice(1), newPath);
          if (result) return result;
        }
      }
    }
    return null;
  }

  componentWillLoad() {
    this.updateSelectedPath();
  }

  componentDidLoad() {
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  private updateSelectedPath() {
    const values = this.getValue();
    if (values.length > 0) {
      const path = this.findPathByValues(this.getOptions(), values);
      if (path) {
        this.selectedPath = path;
      }
    } else {
      this.selectedPath = [];
    }
  }

  private handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (this.hostElement && !this.hostElement.contains(target)) {
      this.closePanel();
    }
  };

  private togglePanel = () => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.cascadeToggle.emit(this.isOpen);
    if (this.isOpen) {
      this.activePath = [...this.selectedPath];
    }
  };

  private closePanel = () => {
    if (this.isOpen) {
      this.isOpen = false;
      this.cascadeToggle.emit(false);
      this.activePath = [];
    }
  };

  private handleOptionClick = (option: CascadeOption, level: number) => {
    if (option.disabled) return;

    const newPath = [...this.activePath.slice(0, level), option];
    
    // If click trigger, expand on click
    if (this.expandTrigger === 'click') {
      this.activePath = newPath;
    }

    // If changeOnSelect is true or it's a leaf node, update selection
    const isLeaf = !option.children || option.children.length === 0;
    if (this.changeOnSelect || isLeaf) {
      this.selectedPath = newPath;
      const values = newPath.map(o => o.value);
      this.value = values;
      this.cascadeChange.emit(values);

      if (isLeaf) {
        this.closePanel();
      }
    }
  };

  private handleOptionHover = (option: CascadeOption, level: number) => {
    if (this.expandTrigger === 'hover' && !option.disabled) {
      this.activePath = [...this.activePath.slice(0, level), option];
    }
  };

  private clearSelection = (event: MouseEvent) => {
    event.stopPropagation();
    this.selectedPath = [];
    this.activePath = [];
    this.value = [];
    this.cascadeChange.emit([]);
  };

  private getDisplayText(): string {
    if (this.selectedPath.length === 0) return '';
    
    if (this.showFullPath) {
      return this.selectedPath.map(o => o.label).join(this.separator);
    } else {
      return this.selectedPath[this.selectedPath.length - 1].label;
    }
  }

  private renderColumn(options: CascadeOption[], level: number) {
    const activeOption = this.activePath[level];

    return (
      <div class="cascade-column">
        <ul class="cascade-menu">
          {options.map(option => {
            const isActive = activeOption?.value === option.value;
            const isSelected = this.selectedPath[level]?.value === option.value;
            const hasChildren = option.children && option.children.length > 0;

            return (
              <li
                class={{
                  'cascade-option': true,
                  'cascade-option-active': isActive,
                  'cascade-option-selected': isSelected,
                  'cascade-option-disabled': option.disabled,
                  'cascade-option-has-children': hasChildren,
                }}
                onClick={() => this.handleOptionClick(option, level)}
                onMouseEnter={() => this.handleOptionHover(option, level)}
              >
                {option.icon && <span class="cascade-option-icon">{option.icon}</span>}
                <span class="cascade-option-label">{option.label}</span>
                {hasChildren && <span class="cascade-option-arrow">›</span>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  private renderPanel() {
    if (!this.isOpen) return null;

    const columns: any[] = [];
    const options = this.getOptions();
    
    // Always show first level
    columns.push(this.renderColumn(options, 0));

    // Show subsequent levels based on active path
    let currentOptions = options;
    for (let i = 0; i < this.activePath.length; i++) {
      const activeOption = this.activePath[i];
      const found = currentOptions.find(o => o.value === activeOption.value);
      
      if (found && found.children && found.children.length > 0) {
        columns.push(this.renderColumn(found.children, i + 1));
        currentOptions = found.children;
      }
    }

    return (
      <div class="cascade-panel">
        <div class="cascade-columns">
          {columns}
        </div>
      </div>
    );
  }

  render() {
    const displayText = this.getDisplayText();
    const hasValue = this.selectedPath.length > 0;

    return (
      <Host>
        <div
          class={{
            'cascade-select': true,
            [`cascade-select-${this.size}`]: true,
            'cascade-select-open': this.isOpen,
            'cascade-select-disabled': this.disabled,
          }}
        >
          <div class="cascade-input" onClick={this.togglePanel}>
            <span class={{
              'cascade-input-text': true,
              'cascade-input-placeholder': !hasValue,
            }}>
              {hasValue ? displayText : this.placeholder}
            </span>
            <div class="cascade-input-suffix">
              {hasValue && this.clearable && !this.disabled && (
                <span class="cascade-clear" onClick={this.clearSelection}>×</span>
              )}
              <span class={{
                'cascade-arrow': true,
                'cascade-arrow-up': this.isOpen,
              }}>▼</span>
            </div>
          </div>

          {this.renderPanel()}
        </div>
      </Host>
    );
  }
}
