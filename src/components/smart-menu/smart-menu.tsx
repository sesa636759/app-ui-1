// smart-menu.tsx
import { Component, h, State, Listen, Prop, Method, Event, EventEmitter } from '@stencil/core';
import { MenuItem } from './menu-item.interface';

@Component({
  tag: 'ui-smart-context-menu',
  shadow: true,
  styleUrl: 'smart-menu.css',
})
export class SmartMenu {
  @Prop({ mutable: true }) items: MenuItem[] = [];
  @Prop() target?: string; // CSS selector for target element

  /**
   * Event emitted when a menu item is clicked
   */
  @Event() menuItemClick: EventEmitter<{ label: string; item: MenuItem }>;

  @State() visible: boolean = false;
  @State() position: { x: number; y: number } = { x: 0, y: 0 };
  @State() activeSubmenus: { [key: string]: boolean } = {};
  @State() submenuPositions: { [key: string]: { x: number; y: number; direction: 'right' | 'left'; vertical: 'down' | 'up' } } = {};
  private submenuOpenTimeouts: { [key: string]: number } = {};
  private submenuCloseTimeouts: { [key: string]: number } = {};

  private menuRef: HTMLElement;
  private targetElement: HTMLElement | null = null;
  private contextMenuHandler: (event: MouseEvent) => void;

  private targetRetryCount = 0;
  private readonly maxTargetRetries = 10;
  private readonly targetRetryDelay = 100; // ms

  componentDidLoad() {
    this.attachContextMenuHandler();
    // Observe DOM changes to re-attach if target is replaced
    if (this.target) {
      const observer = new MutationObserver(() => {
        this.attachContextMenuHandler();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      (this as any)._targetObserver = observer;
    }
  }

  private attachContextMenuHandler() {
    if (!this.target) {
      // Fallback: listen on document if no target specified
      if (!this.contextMenuHandler) {
        this.contextMenuHandler = (event: MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
          this.show(event.clientX, event.clientY);
        };
        document.addEventListener('contextmenu', this.contextMenuHandler);
      }
      return;
    }
    const el = document.querySelector(this.target) as HTMLElement | null;
    if (el !== this.targetElement) {
      // Remove old listener if target changed
      if (this.targetElement && this.contextMenuHandler) {
        this.targetElement.removeEventListener('contextmenu', this.contextMenuHandler);
      }
      this.targetElement = el;
    }
    if (this.targetElement) {
      if (!this.contextMenuHandler) {
        this.contextMenuHandler = (event: MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
          this.show(event.clientX, event.clientY);
        };
      }
      this.targetElement.addEventListener('contextmenu', this.contextMenuHandler);
      this.targetRetryCount = 0;
    } else if (this.targetRetryCount < this.maxTargetRetries) {
      this.targetRetryCount++;
      setTimeout(() => this.attachContextMenuHandler(), this.targetRetryDelay);
    }
  }

  disconnectedCallback() {
    // Clean up event listener
    if (this.targetElement && this.contextMenuHandler) {
      this.targetElement.removeEventListener('contextmenu', this.contextMenuHandler);
    }
    if ((this as any)._targetObserver) {
      (this as any)._targetObserver.disconnect();
    }
    // Remove document fallback
    if (!this.target && this.contextMenuHandler) {
      document.removeEventListener('contextmenu', this.contextMenuHandler);
    }
  }

  @Listen('click', { target: 'window' })
  handleClickOutside() {
    if (this.visible) {
      this.hide();
    }
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    if (this.visible) {
      this.hide();
    }
  }

  @Method()
  async show(x: number, y: number) {
    this.visible = true;
    this.activeSubmenus = {};
    this.submenuPositions = {};

    setTimeout(() => {
      this.position = this.calculatePosition(x, y, this.menuRef);
    }, 0);
  }

  @Method()
  async hide() {
    this.visible = false;
    this.activeSubmenus = {};
    this.submenuPositions = {};
  }

  calculatePosition(x: number, y: number, element: HTMLElement): { x: number; y: number } {
    if (!element) return { x, y };

    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalX = x;
    let finalY = y;

    // Adjust horizontal position
    if (x + rect.width > viewportWidth) {
      finalX = viewportWidth - rect.width - 5;
    }

    // Adjust vertical position
    if (y + rect.height > viewportHeight) {
      finalY = viewportHeight - rect.height - 5;
    }

    return { x: Math.max(5, finalX), y: Math.max(5, finalY) };
  }

  handleItemClick(item: MenuItem, event: MouseEvent) {
    event.stopPropagation();

    if (item.disabled || item.divider) return;

    if (item.submenu && item.submenu.length > 0) {
      return; // Let hover handle submenu
    }

    if (item.action) {
      item.action();
    }

    // Emit event for demo purposes
    this.menuItemClick.emit({ label: item.label, item });

    this.hide();
  }

  handleItemHover(item: MenuItem, index: number, event: MouseEvent, path: string = '') {
    const currentPath = path ? `${path}-${index}` : `${index}`;
    // Only one submenu per level
    const level = currentPath.split('-').length - 1;
    Object.keys(this.submenuOpenTimeouts).forEach(key => {
      if (key.split('-').length - 1 === level && key !== currentPath) {
        clearTimeout(this.submenuOpenTimeouts[key]);
        delete this.submenuOpenTimeouts[key];
        this.activeSubmenus[key] = false;
      }
    });

    if (item.submenu && item.submenu.length > 0 && !item.disabled) {
      // Add delay before opening submenu
      if (this.submenuOpenTimeouts[currentPath]) clearTimeout(this.submenuOpenTimeouts[currentPath]);
      if (this.submenuCloseTimeouts[currentPath]) clearTimeout(this.submenuCloseTimeouts[currentPath]);
      this.submenuOpenTimeouts[currentPath] = window.setTimeout(() => {
        this.activeSubmenus = { ...this.activeSubmenus, [currentPath]: true };
        setTimeout(() => {
          const submenuElement = document.querySelector(`.submenu-${currentPath}`) as HTMLElement;
          if (submenuElement) {
            const target = event.currentTarget as HTMLElement;
            const targetRect = target.getBoundingClientRect();
            const submenuRect = submenuElement.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Default: open right and down
            let x = targetRect.right;
            let y = targetRect.top;
            let direction: 'right' | 'left' = 'right';
            let vertical: 'down' | 'up' = 'down';

            // Horizontal edge detection (flip left if needed)
            if (x + submenuRect.width > viewportWidth) {
              x = targetRect.left - submenuRect.width;
              direction = 'left';
            }

            // Vertical edge detection (flip up if needed)
            if (y + submenuRect.height > viewportHeight) {
              y = Math.max(5, viewportHeight - submenuRect.height - 5);
              if (y < targetRect.top) vertical = 'up';
            }

            // Clamp to viewport
            x = Math.max(5, Math.min(x, viewportWidth - submenuRect.width - 5));
            y = Math.max(5, Math.min(y, viewportHeight - submenuRect.height - 5));

            this.submenuPositions = {
              ...this.submenuPositions,
              [currentPath]: { x, y, direction, vertical }
            };
          }
        }, 0);
      }, 120); // 120ms delay
    } else {
      // Clear all submenus that are not ancestors of this path
      Object.keys(this.submenuOpenTimeouts).forEach(key => {
        if (!key.startsWith(currentPath) && !currentPath.startsWith(key)) {
          clearTimeout(this.submenuOpenTimeouts[key]);
          delete this.submenuOpenTimeouts[key];
          this.activeSubmenus[key] = false;
        }
      });
      Object.keys(this.submenuCloseTimeouts).forEach(key => {
        if (!key.startsWith(currentPath) && !currentPath.startsWith(key)) {
          clearTimeout(this.submenuCloseTimeouts[key]);
          delete this.submenuCloseTimeouts[key];
        }
      });
      const newActiveSubmenus: { [key: string]: boolean } = {};
      const newSubmenuPositions: { [key: string]: { x: number; y: number; direction: 'right' | 'left'; vertical: 'down' | 'up' } } = {};
      Object.keys(this.activeSubmenus).forEach(key => {
        if (key.startsWith(currentPath) || currentPath.startsWith(key)) {
          newActiveSubmenus[key] = this.activeSubmenus[key];
          if (this.submenuPositions[key]) {
            newSubmenuPositions[key] = this.submenuPositions[key];
          }
        }
      });
      this.activeSubmenus = newActiveSubmenus;
      this.submenuPositions = newSubmenuPositions;
    }
  }

  handleSubmenuClick(item: MenuItem, event: MouseEvent) {
    event.stopPropagation();
    
    if (item.disabled || item.divider) return;
    
    if (item.action) {
      item.action();
    }
    
    this.hide();
  }

  renderMenuItem(item: MenuItem, index: number) {
    if (item.divider) {
      return <div class="menu-divider"></div>;
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;

    const path = `${index}`;
    return (
      <div
        class={{
          'menu-item': true,
          'disabled': item.disabled,
          'has-submenu': hasSubmenu,
          'active': this.activeSubmenus[path]
        }}
        data-path={path}
        onClick={(e) => this.handleItemClick(item, e)}
        onMouseEnter={(e) => this.handleItemHover(item, index, e)}
        onMouseLeave={() => {
          setTimeout(() => {
            const submenu = document.querySelector(`.submenu-${path}`);
            if (!submenu || !submenu.matches(':hover')) {
              this.activeSubmenus[path] = false;
              this.submenuPositions[path] = undefined;
            }
          }, 150);
        }}
      >
        {item.icon && <span class="menu-icon">{item.icon}</span>}
        <span class="menu-label">{item.label}</span>
        {hasSubmenu && <span class="submenu-arrow">▶</span>}
      </div>
    );
  }

  renderSubmenu(items: MenuItem[], path: string, level: number = 1) {
    const position = this.submenuPositions[path];
    if (!position || level > 4) return null;
    const arrow = position.direction === 'left' ? '◀' : '▶';
    return (
      <div
        class={`context-menu submenu submenu-${path} submenu-${position.direction} submenu-${position.vertical}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: `${10000 + level}`
        }}
        onMouseEnter={() => {
          if (this.submenuCloseTimeouts[path]) {
            clearTimeout(this.submenuCloseTimeouts[path]);
            delete this.submenuCloseTimeouts[path];
          }
          this.activeSubmenus[path] = true;
        }}
        onMouseLeave={() => {
          if (this.submenuOpenTimeouts[path]) {
            clearTimeout(this.submenuOpenTimeouts[path]);
            delete this.submenuOpenTimeouts[path];
          }
          this.submenuCloseTimeouts[path] = window.setTimeout(() => {
            this.activeSubmenus[path] = false;
          }, 200);
        }}
      >
        {items.map((item, index) => {
          if (item.divider) {
            return <div class="menu-divider"></div>;
          }
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const currentPath = `${path}-${index}`;
          const isActive = this.activeSubmenus[currentPath];
          return (
            <div
              class={{
                'menu-item': true,
                'disabled': item.disabled,
                'has-submenu': hasSubmenu,
                'active': isActive
              }}
              onClick={(e) => this.handleItemClick(item, e)}
              onMouseEnter={(e) => this.handleItemHover(item, index, e, path)}
              onMouseLeave={() => {
                if (this.submenuOpenTimeouts[currentPath]) {
                  clearTimeout(this.submenuOpenTimeouts[currentPath]);
                  delete this.submenuOpenTimeouts[currentPath];
                }
                this.submenuCloseTimeouts[currentPath] = window.setTimeout(() => {
                  this.activeSubmenus[currentPath] = false;
                }, 200);
              }}
            >
              {item.icon && <span class="menu-icon">{item.icon}</span>}
              <span class="menu-label">{item.label}</span>
              {hasSubmenu && <span class="submenu-arrow">{arrow}</span>}
            </div>
          );
        })}
        {Object.keys(this.activeSubmenus).map(subPath => {
          if (subPath.startsWith(path + '-')) {
            const subItems = this.getItemsByPath(subPath);
            if (subItems && subItems.length > 0) {
              return this.renderSubmenu(subItems, subPath, level + 1);
            }
          }
          return null;
        })}
      </div>
    );
  }

  getItemsByPath(path: string): MenuItem[] | null {
    const indices = path.split('-').map(i => parseInt(i));
    let items = this.items;
    for (let i = 0; i < indices.length; i++) {
      const index = indices[i];
      if (items && items[index] && items[index].submenu) {
        items = items[index].submenu!;
      } else {
        return null;
      }
    }
    return items;
  }

  render() {
    if (!this.visible) return null;
    return (
      <div>
        <div
          class="context-menu"
          ref={(el) => this.menuRef = el}
          style={{
            left: `${this.position.x}px`,
            top: `${this.position.y}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {this.items.map((item, index) => this.renderMenuItem(item, index))}
        </div>
        {Object.keys(this.activeSubmenus).map(path => {
          if (this.activeSubmenus[path]) {
            const items = this.getItemsByPath(path);
            if (items && items.length > 0) {
              const level = path.split('-').length + 1;
              return this.renderSubmenu(items, path, level);
            }
          }
          return null;
        })}
      </div>
    );
  }
}