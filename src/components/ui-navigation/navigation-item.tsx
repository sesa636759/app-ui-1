import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { NavigationItem } from './navigation-types';

@Component({
  tag: 'navigation-item',
  styleUrl: 'navigation-item.css',
  shadow: true
})
export class NavigationItemComponent {
  @Prop() item: NavigationItem;
  @Prop() collapsed: boolean = false;
  @Prop() active: boolean = false;
  @Prop() open: boolean = false;
  @Prop() animationDuration: number = 350;
  @Prop() indentation: number = 0;
  @Event() navItemClick: EventEmitter<NavigationItem>;
  @Event() submenuToggle: EventEmitter<string>;
  handleClick = () => {
    if (this.item.children && this.item.children.length > 0) {
      this.submenuToggle.emit(this.item.id);
    } else {
      this.navItemClick.emit(this.item);
    }
  };
  render() {
    return (
      <li
        class={{
          'nav-item': true,
          'active': this.active,
          'disabled': this.item.disabled,
          'has-children': this.item.children && this.item.children.length > 0,
          'open': this.open,
        }}
        style={{ paddingLeft: `${this.indentation * 20}px` }}
        tabindex={this.item.disabled ? -1 : 0}
        aria-disabled={this.item.disabled ? 'true' : 'false'}
        aria-expanded={this.open ? 'true' : 'false'}
        onClick={this.handleClick}
        onKeyDown={e => { if (e.key === 'Enter') this.handleClick(); }}
      >
        {this.item.icon && <span class="nav-icon">{this.item.icon}</span>}
        {!this.collapsed && <span class="nav-label">{this.item.label}</span>}
        {this.item.badge && <span class="nav-badge">{this.item.badge}</span>}
        {this.item.children && this.item.children.length > 0 && (
          <span class="nav-arrow">{this.open ? '▼' : '▶'}</span>
        )}
        {/* Submenu */}
        {this.item.children && this.item.children.length > 0 && (
          <ul
            class="nav-submenu"
            style={{
              maxHeight: this.open ? '500px' : '0',
              transition: `max-height ${this.animationDuration}ms var(--nav-easing), opacity ${this.animationDuration}ms var(--nav-easing)`,
              opacity: this.open ? '1' : '0'
            }}
          >
            {this.item.children.map(child => (
              <navigation-item
                item={child}
                collapsed={this.collapsed}
                active={this.active}
                open={false}
                animationDuration={this.animationDuration}
                indentation={this.indentation + 1}
                onNavItemClick={ev => this.navItemClick.emit(ev.detail)}
                onSubmenuToggle={ev => this.submenuToggle.emit(ev.detail)}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
}
