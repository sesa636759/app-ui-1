import { Component, Prop, State, Event, EventEmitter, h, Element, Method, Host, Watch } from '@stencil/core';

export interface ContextMenuItem {
  label: string;
  value?: string | number;
  disabled?: boolean;
  icon?: string; // emoji or text icon
  shortcut?: string; // e.g., Ctrl+N
  checked?: boolean;
  divider?: boolean; // internal name
  separator?: boolean; // compatibility alias used by demos
  children?: ContextMenuItem[];
}

interface Point { x: number; y: number }

@Component({
  tag: 'ui-context-menu',
  styleUrl: 'context-menu.css',
  shadow: true,
})
export class UiContextMenu {
  @Element() hostEl!: HTMLElement;

  /** Menu items, can be JSON string or array */
  @Prop() items: ContextMenuItem[] | string = [];

  @Watch('items')
  onItemsChange() {
    // Items changed, component will automatically re-render
  }

  /** Listen trigger on: contextmenu, click */
  @Prop() openOn: 'contextmenu' | 'click' = 'contextmenu';

  /** Optional CSS selector for a target element to attach the context menu */
  @Prop() target?: string;

  @Watch('target')
  onTargetChange() {
    this.attachTarget();
  }

  /** Close menu when selecting an item */
  @Prop() closeOnSelect: boolean = true;

  /** Pixel padding from viewport edges */
  @Prop() viewportPadding: number = 8;

  /** Delay for submenu opening on hover (ms) */
  @Prop() submenuOpenDelay: number = 120;

  /** Attach to slotted target only; otherwise listen at document */
  @Prop() targetOnly: boolean = false;

  /** Reserve space for icons area even if item has no icon */
  @Prop() reserveIconSpace: boolean = true;

  /** Emits when an item is selected */
  @Event() itemSelect!: EventEmitter<{ item: ContextMenuItem, path: number[] }>;
  /** Alias event used by existing demos */
  @Event() menuItemClick!: EventEmitter<{ item: ContextMenuItem, path: number[] }>;

  /** Emits when menu toggles */
  @Event() menuToggle!: EventEmitter<boolean>;

  @State() open: boolean = false;
  @State() pos: Point = { x: 0, y: 0 };
  @State() activePath: number[] = []; // indices per level
  @State() hoverPath: number[] = []; // used for hover tracking
  @State() typeahead: string = '';
  @State() submenuSide: ('right' | 'left')[] = []; // computed per level

  private rootMenuEl?: HTMLElement;
  private openTimeout?: number;
  private lastKeyTime = 0;
  private keyBuffer = '';
  private slottedTarget?: HTMLElement;
  private lastAnchorEls: (HTMLElement | undefined)[] = [];
  private targetElement?: HTMLElement;

  componentDidLoad() {
    this.attachTarget();
    document.addEventListener('click', this.onGlobalClick, { capture: true });
    document.addEventListener('contextmenu', this.onGlobalContextMenu, { capture: true });
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('scroll', this.onWindowResize, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.onGlobalClick, { capture: true } as any);
    document.removeEventListener('contextmenu', this.onGlobalContextMenu, { capture: true } as any);
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('scroll', this.onWindowResize, true);
  }

  private attachTarget() {
    // Explicit target selector takes precedence
    if (this.target) {
      try {
        const el = document.querySelector(this.target) as HTMLElement | null;
        if (el) {
          this.targetElement = el;
          const evt = this.openOn === 'click' ? 'click' : 'contextmenu';
          el.addEventListener(evt, this.onTargetTrigger);
        }
      } catch {}
    }

    // Fallback to slotted target
    if (!this.targetElement) {
      const slot = this.hostEl.shadowRoot?.querySelector('slot');
      if (slot) {
        const assigned = (slot as HTMLSlotElement).assignedElements();
        if (assigned.length > 0) {
          this.slottedTarget = assigned[0] as HTMLElement;
          this.targetElement = this.slottedTarget;
          const evt = this.openOn === 'click' ? 'click' : 'contextmenu';
          this.slottedTarget.addEventListener(evt, this.onTargetTrigger);
        }
      }
    }
  }

  private normalizeItems(items: ContextMenuItem[]): ContextMenuItem[] {
    // Map 'separator' to 'divider' for internal handling
    return (items || []).map(it => {
      const copy: ContextMenuItem = { ...it } as any;
      if ((copy as any).separator === true) copy.divider = true;
      if (copy.children && copy.children.length) copy.children = this.normalizeItems(copy.children);
      return copy;
    });
  }

  private parseItems(): ContextMenuItem[] {
    let arr: ContextMenuItem[] = [];
    if (typeof this.items === 'string') {
      try { arr = JSON.parse(this.items) } catch { arr = [] }
    } else {
      arr = this.items || [];
    }
    return this.normalizeItems(arr);
  }

  private onTargetTrigger = (e: MouseEvent) => {
    if (this.openOn === 'contextmenu') e.preventDefault();
    const point = { x: e.clientX, y: e.clientY };
    this.openAt(point);
  }

  private onGlobalContextMenu = (e: MouseEvent) => {
    if (this.targetOnly) return;
    if (this.openOn !== 'contextmenu') return;
    // If explicit target provided, only open when inside that target
    if (this.targetElement && !this.targetElement.contains(e.target as Node)) return;
    if (this.hostEl.contains(e.target as Node)) return; // ignore inside shadow host
    e.preventDefault();
    const point = { x: e.clientX, y: e.clientY };
    this.openAt(point);
  }

  private onGlobalClick = (e: MouseEvent) => {
    if (!this.open) return;
    const target = e.target as Node;
    // Close if clicked outside menu or clicking non-left button
    if (!this.hostEl.contains(target)) {
      this.close();
    }
  }

  private onWindowResize = () => {
    if (!this.open) return;
    // Re-clamp position on resize/scroll
    requestAnimationFrame(() => this.clampRootPosition());
  }

  @Method()
  async openAt(point: Point) {
    this.open = true;
    this.pos = { ...point };
    this.activePath = [];
    this.hoverPath = [];
    this.submenuSide = [];
    this.menuToggle.emit(true);
    requestAnimationFrame(() => {
      this.rootMenuEl = this.hostEl.shadowRoot?.querySelector('.ctx-menu') as HTMLElement;
      this.clampRootPosition();
      // Focus for keyboard navigation
      (this.rootMenuEl?.querySelector('[role="menu"]') as HTMLElement)?.focus();
    });
  }

  @Method()
  async close() {
    if (this.open) {
      this.open = false;
      this.menuToggle.emit(false);
      this.activePath = [];
      this.hoverPath = [];
      this.submenuSide = [];
    }
  }

  private clampRectToViewport(rect: DOMRect, padding: number) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dx = Math.min(0, vw - padding - rect.right) + Math.max(0, padding - rect.left);
    const dy = Math.min(0, vh - padding - rect.bottom) + Math.max(0, padding - rect.top);
    return { dx, dy };
  }

  private clampRootPosition() {
    if (!this.rootMenuEl) return;
    const el = this.rootMenuEl;
    const rect = el.getBoundingClientRect();
    const { dx, dy } = this.clampRectToViewport(rect, this.viewportPadding);
    const newX = Math.round(this.pos.x + dx);
    const newY = Math.round(this.pos.y + dy);
    this.pos = { x: newX, y: newY };
    // Update transform origin for nicer animation
    const originX = (dx < 0) ? '100%' : (dx > 0) ? '0%' : '50%';
    const originY = (dy < 0) ? '100%' : (dy > 0) ? '0%' : '50%';
    el.style.setProperty('--ctx-origin-x', originX);
    el.style.setProperty('--ctx-origin-y', originY);
  }

  private openSubmenu(level: number, index: number, anchorEl: HTMLElement) {
    // Compute submenu side based on viewport space
    const anchorRect = anchorEl.getBoundingClientRect();
    const spaceRight = window.innerWidth - anchorRect.right;
    const spaceLeft = anchorRect.left;
    const side = spaceRight >= 240 || spaceRight >= spaceLeft ? 'right' : 'left';
    this.submenuSide = [...this.submenuSide.slice(0, level), side];

    // Update active path
    this.activePath = [...this.activePath.slice(0, level), index];
    this.lastAnchorEls[level] = anchorEl;

    // After render, adjust submenu position to keep within viewport
    this.scheduleSubmenuPosition(level);
  }

  private handleMouseEnterItem(level: number, index: number, el: HTMLElement) {
    window.clearTimeout(this.openTimeout);
    this.openTimeout = window.setTimeout(() => {
      this.openSubmenu(level, index, el);
      this.hoverPath = [...this.activePath];
    }, this.submenuOpenDelay);
  }

  private handleClickItem(item: ContextMenuItem, path: number[], ev: MouseEvent) {
    if (item.disabled || item.divider) return;
    if (item.children && item.children.length > 0) {
      // open submenu immediately on click
      const target = ev.currentTarget as HTMLElement;
      const level = path.length - 1;
      this.openSubmenu(level, path[level], target);
      return;
    }
    this.itemSelect.emit({ item, path });
    this.menuItemClick.emit({ item, path });
    if (this.closeOnSelect) this.close();
  }

  private getItemsAtPath(path: number[]): ContextMenuItem[] {
    let options = this.parseItems();
    for (const idx of path.slice(0, -1)) {
      const node = options[idx];
      if (!node || !node.children) return [];
      options = node.children;
    }
    return options;
  }

  private navMove(level: number, delta: number) {
    const items = this.getItemsAtPath(this.activePath.slice(0, level + 1));
    const currentIndex = this.activePath[level] ?? -1;
    let nextIdx = currentIndex + delta;
    const clamp = (i: number) => Math.max(0, Math.min(i, items.length - 1));
    // Skip dividers/disabled
    const isSelectable = (i: number) => {
      const it = items[i];
      return it && !it.divider && !it.disabled;
    };
    nextIdx = clamp(nextIdx);
    while (!isSelectable(nextIdx) && (delta > 0 ? nextIdx < items.length - 1 : nextIdx > 0)) {
      nextIdx = clamp(nextIdx + delta);
    }
    this.activePath = [...this.activePath.slice(0, level), nextIdx];
    // Try positioning submenu if it opens due to selection change
    const anchor = this.getAnchorElForLevel(level);
    if (anchor) this.scheduleSubmenuPosition(level);
  }

  private keydown = (e: KeyboardEvent) => {
    if (!this.open) return;
    const level = this.activePath.length ? this.activePath.length - 1 : 0;
    const currentLevelItems = this.getItemsAtPath(this.activePath.slice(0, level + 1));
    const currentIndex = this.activePath[level] ?? 0;
    const currentItem = currentLevelItems[currentIndex];

    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); this.navMove(level, +1); break;
      case 'ArrowUp': e.preventDefault(); this.navMove(level, -1); break;
      case 'ArrowRight': {
        e.preventDefault();
        if (currentItem?.children?.length) {
          this.activePath = [...this.activePath, 0];
          this.submenuSide = [...this.submenuSide, 'right'];
          const anchor = this.getAnchorElForLevel(level);
          if (anchor) this.scheduleSubmenuPosition(level);
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (this.activePath.length > 0) {
          this.activePath = this.activePath.slice(0, -1);
          this.submenuSide = this.submenuSide.slice(0, -1);
        } else {
          this.close();
        }
        break;
      }
      case 'Enter': {
        e.preventDefault();
        if (currentItem) this.itemSelect.emit({ item: currentItem, path: [...this.activePath] });
        if (this.closeOnSelect) this.close();
        break;
      }
      case 'Escape': this.close(); break;
      default: {
        // typeahead
        const now = Date.now();
        if (now - this.lastKeyTime > 600) this.keyBuffer = '';
        this.lastKeyTime = now;
        if (e.key.length === 1) {
          this.keyBuffer += e.key.toLowerCase();
          const items = this.getItemsAtPath(this.activePath.slice(0, level + 1));
          const idx = items.findIndex(it => !it.divider && !it.disabled && (it.label || '').toLowerCase().startsWith(this.keyBuffer));
          if (idx >= 0) this.activePath = [...this.activePath.slice(0, level), idx];
        }
      }
    }
  }

  private getAnchorElForLevel(level: number): HTMLElement | undefined {
    // Find the LI element corresponding to activePath[level]
    try {
      const root = this.hostEl.shadowRoot?.querySelector('.ctx-menu > .ctx-list') as HTMLElement;
      if (!root) return undefined;
      let ul: HTMLElement = root;
      for (let i = 0; i <= level; i++) {
        const idx = this.activePath[i];
        if (idx == null) return undefined;
        const lis = ul.querySelectorAll(':scope > .ctx-item');
        const li = lis[idx] as HTMLElement;
        if (!li) return undefined;
        if (i === level) return li;
        // Next level UL resides inside submenu of this LI
        const nextUl = li.querySelector(':scope > .ctx-submenu > .ctx-list') as HTMLElement;
        if (!nextUl) return undefined;
        ul = nextUl;
      }
    } catch {}
    return undefined;
  }

  private scheduleSubmenuPosition(level: number) {
    requestAnimationFrame(() => this.positionSubmenu(level));
  }

  private positionSubmenu(level: number) {
    const anchorEl = this.lastAnchorEls[level] || this.getAnchorElForLevel(level);
    if (!anchorEl) return;
    const submenu = anchorEl.querySelector(':scope > .ctx-submenu') as HTMLElement | null;
    if (!submenu) return;

    const padding = this.viewportPadding;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Measure submenu
    const rect = submenu.getBoundingClientRect();
    const anchorRect = anchorEl.getBoundingClientRect();

    // Horizontal flip if needed
    const overflowRight = rect.right > vw - padding;
    const overflowLeft = rect.left < padding;
    const side = this.submenuSide[level] || 'right';
    if ((side === 'right' && overflowRight) || (side === 'left' && overflowLeft)) {
      const spaceRight = vw - anchorRect.right;
      const spaceLeft = anchorRect.left;
      const desiredSide: 'right' | 'left' = spaceLeft > spaceRight ? 'left' : 'right';
      if (desiredSide !== side) {
        this.submenuSide = [...this.submenuSide.slice(0, level), desiredSide];
        // Re-run after flip renders
        requestAnimationFrame(() => this.positionSubmenu(level));
        return;
      }
    }

    // Vertical shift to keep within viewport
    let offsetY = 0;
    const afterRect = submenu.getBoundingClientRect();
    const overflowBottom = afterRect.bottom > vh - padding;
    const overflowTop = afterRect.top < padding;
    if (overflowBottom) {
      offsetY -= Math.ceil(afterRect.bottom - (vh - padding));
    }
    if (overflowTop) {
      offsetY += Math.ceil(padding - afterRect.top);
    }
    // Apply offset if any
    if (offsetY !== 0) {
      submenu.style.top = `${offsetY}px`;
    } else {
      submenu.style.top = '0px';
    }

    // Clamp height if submenu is taller than viewport
    const maxH = vh - padding * 2;
    if (afterRect.height > maxH) {
      submenu.style.maxHeight = `${maxH}px`;
      submenu.style.overflowY = 'auto';
    } else {
      submenu.style.maxHeight = '';
      submenu.style.overflowY = '';
    }
  }

  private renderItems(items: ContextMenuItem[], level: number) {
    const activeIdx = this.activePath[level] ?? -1;
    const side = this.submenuSide[level] || 'right';
    return (
      <ul class="ctx-list" role="menu" tabindex={0} onKeyDown={this.keydown}>
        {items.map((item, idx) => {
          if (item.divider) {
            return <li class="ctx-divider" role="separator" />;
          }
          const isActive = idx === activeIdx;
          const hasChildren = !!item.children?.length;
          return (
            <li
              class={{
                'ctx-item': true,
                'ctx-item-active': isActive,
                'ctx-item-disabled': !!item.disabled,
                'ctx-item-has-children': hasChildren,
              }}
              role="menuitem"
              aria-haspopup={hasChildren ? 'menu' : null}
              aria-disabled={item.disabled ? 'true' : null}
              onMouseEnter={(ev) => this.handleMouseEnterItem(level, idx, ev.currentTarget as HTMLElement)}
              onClick={(ev) => this.handleClickItem(item, [...this.activePath.slice(0, level), idx], ev)}
            >
              {this.reserveIconSpace && <span class="ctx-icon-area">{item.icon ? item.icon : ''}</span>}
              {!this.reserveIconSpace && item.icon && <span class="ctx-icon-area">{item.icon}</span>}
              <span class="ctx-label">{item.label}</span>
              {item.shortcut && <span class="ctx-shortcut">{item.shortcut}</span>}
              {hasChildren && <span class="ctx-sub-arrow">›</span>}
              {hasChildren && isActive && (
                <div class={{ 'ctx-submenu': true, [`ctx-sub-${side}`]: true }}>
                  {this.renderItems(item.children!, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const items = this.parseItems();
    return (
      <Host>
        <slot></slot>
        {this.open && (
          <div class="ctx-menu" style={{ left: `${this.pos.x}px`, top: `${this.pos.y}px` }}>
            {this.renderItems(items, 0)}
          </div>
        )}
      </Host>
    );
  }
}
