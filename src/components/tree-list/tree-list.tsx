import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';
import { TreeNode } from './types';

@Component({
  tag: 'ui-tree-list',
  styleUrl: 'tree-list.css',
  shadow: true,
})
export class TreeList {
  /**
   * Tree data
   */
  @Prop() data: TreeNode[] | string = [];

  /**
   * Allow multiple selection
   */
  @Prop() multiSelect: boolean = false;

  /**
   * Show expand/collapse icons
   */
  @Prop() showExpandIcon: boolean = true;

  /**
   * Show connecting lines
   */
  @Prop() showLines: boolean = true;

  /**
   * Show checkboxes
   */
  @Prop() showCheckbox: boolean = false;

  /**
   * Enable selection
   */
  @Prop() selectable: boolean = true;

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Expand all nodes by default
   */
  @Prop() defaultExpandAll: boolean = false;

  /**
   * Selected node keys
   */
  @State() selectedKeys: Set<string | number> = new Set();

  /**
   * Checked node keys (for checkboxes)
   */
  @State() checkedKeys: Set<string | number> = new Set();

  /**
   * Expanded node keys
   */
  @State() expandedKeys: Set<string | number> = new Set();

  /**
   * Active action menu node
   */
  @State() activeMenuNode: string | number | null = null;

  /**
   * Event emitted when node is expanded/collapsed
   */
  @Event() treeExpand: EventEmitter<{ node: TreeNode; expanded: boolean }>;

  /**
   * Event emitted when node is selected
   */
  @Event() treeSelect: EventEmitter<{ node: TreeNode; selected: boolean }>;

  /**
   * Event emitted when checkbox is toggled
   */
  @Event() treeCheck: EventEmitter<{ node: TreeNode; checked: boolean; checkedKeys: (string | number)[] }>;

  /**
   * Event emitted when action menu is clicked
   */
  @Event() treeAction: EventEmitter<{ node: TreeNode; action: string }>;

  componentWillLoad() {
    if (this.defaultExpandAll) {
      this.expandAllNodes();
    }
  }

  private getData(): TreeNode[] {
    if (typeof this.data === 'string') {
      try {
        return JSON.parse(this.data);
      } catch {
        return [];
      }
    }
    return this.data;
  }

  private expandAllNodes() {
    const expandKeys = new Set<string | number>();
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          expandKeys.add(node.key);
          traverse(node.children);
        }
      });
    };
    traverse(this.getData());
    this.expandedKeys = expandKeys;
  }

  private handleToggleExpand = (node: TreeNode, event: Event) => {
    event.stopPropagation();
    if (node.disabled || !node.children || node.children.length === 0) return;

    const newExpandedKeys = new Set(this.expandedKeys);
    if (newExpandedKeys.has(node.key)) {
      newExpandedKeys.delete(node.key);
      this.treeExpand.emit({ node, expanded: false });
    } else {
      newExpandedKeys.add(node.key);
      this.treeExpand.emit({ node, expanded: true });
    }
    this.expandedKeys = newExpandedKeys;
  };

  private handleSelect = (node: TreeNode, event: Event) => {
    event.stopPropagation();
    if (node.disabled || !this.selectable) return;

    const newSelectedKeys = new Set(this.selectedKeys);
    if (this.multiSelect) {
      if (newSelectedKeys.has(node.key)) {
        newSelectedKeys.delete(node.key);
        this.treeSelect.emit({ node, selected: false });
      } else {
        newSelectedKeys.add(node.key);
        this.treeSelect.emit({ node, selected: true });
      }
    } else {
      newSelectedKeys.clear();
      newSelectedKeys.add(node.key);
      this.treeSelect.emit({ node, selected: true });
    }
    this.selectedKeys = newSelectedKeys;
  };

  private handleCheckboxChange = (node: TreeNode, event: Event) => {
    event.stopPropagation();
    if (node.disabled) return;

    const newCheckedKeys = new Set(this.checkedKeys);
    const checked = !newCheckedKeys.has(node.key);
    
    if (checked) {
      newCheckedKeys.add(node.key);
    } else {
      newCheckedKeys.delete(node.key);
    }
    
    this.checkedKeys = newCheckedKeys;
    this.treeCheck.emit({ 
      node, 
      checked,
      checkedKeys: Array.from(newCheckedKeys)
    });
  };

  private handleMenuToggle = (node: TreeNode, event: Event) => {
    event.stopPropagation();
    if (node.disabled) return;

    this.activeMenuNode = this.activeMenuNode === node.key ? null : node.key;
  };

  private handleMenuAction = (node: TreeNode, action: string, event: Event) => {
    event.stopPropagation();
    this.treeAction.emit({ node, action });
    this.activeMenuNode = null;
  };

  private handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.tree-node-actions')) {
      this.activeMenuNode = null;
    }
  };

  connectedCallback() {
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  private renderNode(node: TreeNode, level: number = 0) {
    const isExpanded = this.expandedKeys.has(node.key);
    const isSelected = this.selectedKeys.has(node.key);
    const isChecked = this.checkedKeys.has(node.key);
    const hasChildren = node.children && node.children.length > 0;
    const showMenu = this.activeMenuNode === node.key;

    return (
      <div class="tree-node-wrapper" key={node.key}>
        <div
          class={{
            'tree-node': true,
            'tree-node-selected': isSelected,
            'tree-node-disabled': node.disabled,
            'tree-node-expanded': isExpanded,
          }}
          style={{ paddingLeft: `${level * 24}px` }}
          onClick={(e) => this.handleSelect(node, e)}
        >
          {/* Expand/Collapse Icon */}
          <div class="tree-node-expand">
            {hasChildren && this.showExpandIcon ? (
              <button
                class="tree-expand-btn"
                onClick={(e) => this.handleToggleExpand(node, e)}
                disabled={node.disabled}
              >
                <span class={isExpanded ? 'expand-icon-open' : 'expand-icon-closed'}>
                  {isExpanded ? '▼' : '▶'}
                </span>
              </button>
            ) : (
              <span class="tree-expand-placeholder"></span>
            )}
          </div>

          {/* Checkbox */}
          {this.showCheckbox && (
            <div class="tree-node-checkbox">
              <input
                type="checkbox"
                checked={isChecked}
                disabled={node.disabled}
                onClick={(e) => this.handleCheckboxChange(node, e)}
                onChange={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Node Icon */}
          {node.icon && (
            <div class="tree-node-icon">
              {node.icon}
            </div>
          )}

          {/* Node Label */}
          <div class="tree-node-label">
            {node.label}
          </div>

          {/* Right Side Actions */}
          <div class="tree-node-right">
            {/* Lock Icon */}
            {node.locked && (
              <div class="tree-node-lock" title={node.lockTooltip || "Locked"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--text-color)" class="lock-icon">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                </svg>
              </div>
            )}

            {/* Avatar Group */}
            {node.avatars && node.avatars.length > 0 && (
              <div class="tree-node-avatar-group">
                <ui-avatar-group max={3} size="sm">
                  {node.avatars.map((avatar, idx) => (
                    <ui-avatar
                      key={idx}
                      src={avatar.src}
                      label={avatar.label}
                      initials={avatar.initials}
                      color={avatar.color}
                      size="sm"
                    />
                  ))}
                </ui-avatar-group>
              </div>
            )}

            {/* Single Avatar */}
            {!node.avatars && node.avatar && (
              <div class="tree-node-avatar">
                {typeof node.avatar === 'string' ? (
                  <ui-avatar src={node.avatar} size="sm" />
                ) : (
                  node.avatar
                )}
              </div>
            )}

            {/* Three Dots Menu */}
            <div class="tree-node-actions">
              <button
                class="tree-action-btn"
                onClick={(e) => this.handleMenuToggle(node, e)}
                disabled={node.disabled}
                title="More options"
              >
                ⋮
              </button>

              {showMenu && (
                <div class="tree-action-menu">
                  <button
                    class="tree-action-item"
                    onClick={(e) => this.handleMenuAction(node, 'edit', e)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    class="tree-action-item"
                    onClick={(e) => this.handleMenuAction(node, 'delete', e)}
                  >
                    🗑️ Delete
                  </button>
                  <button
                    class="tree-action-item"
                    onClick={(e) => this.handleMenuAction(node, 'duplicate', e)}
                  >
                    📋 Duplicate
                  </button>
                  {!node.locked && (
                    <button
                      class="tree-action-item"
                      onClick={(e) => this.handleMenuAction(node, 'lock', e)}
                    >
                      🔒 Lock
                    </button>
                  )}
                  {node.locked && (
                    <button
                      class="tree-action-item"
                      onClick={(e) => this.handleMenuAction(node, 'unlock', e)}
                    >
                      🔓 Unlock
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div class="tree-node-children">
            {node.children.map(child => this.renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  }

  render() {
    const data = this.getData();

    return (
      <Host>
        <div
          class={{
            'tree-list': true,
            [`tree-list-${this.size}`]: true,
            'tree-list-disabled': this.disabled,
            'tree-list-lines': this.showLines,
          }}
        >
          {data.length === 0 ? (
            <div class="tree-empty">No items</div>
          ) : (
            data.map(node => this.renderNode(node))
          )}
        </div>
      </Host>
    );
  }
}
