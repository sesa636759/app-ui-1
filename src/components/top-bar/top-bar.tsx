import { Component, Prop, h, State } from '@stencil/core';

export interface TopBarAction {
  id: string;
  icon: string;
  label: string;
  badge?: string;
  onClick?: () => void;
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  divider?: boolean;
}

@Component({
  tag: 'ui-top-bar',
  styleUrl: 'top-bar.css',
  shadow: true,
})
export class TopBar {
  /**
   * Company name
   */
  @Prop() companyName: string = 'Company Name';

  /**
   * Company logo/icon
   */
  @Prop() companyLogo: string = '🏢';

  /**
   * User name
   */
  @Prop() userName: string = 'John Doe';

  /**
   * User avatar/icon
   */
  @Prop() userAvatar: string = '👤';

  /**
   * Action icons as JSON string
   */
  @Prop() actions: string | TopBarAction[] = '[]';

  /**
   * User menu items as JSON string
   */
  @Prop() userMenuItems: string | UserMenuItem[] = '[]';

  /**
   * Background color
   */
  @Prop() backgroundColor: string = 'var(--background-color)';

  /**
   * Text color
   */
  @Prop() textColor: string = 'var(--text-color)';

  /**
   * Show shadow
   */
  @Prop() showShadow: boolean = true;

  @State() isUserMenuOpen: boolean = false;

  private userMenuRef: HTMLElement;

  private parseActions(): TopBarAction[] {
    if (typeof this.actions === 'string') {
      try {
        return JSON.parse(this.actions);
      } catch (e) {
        return [];
      }
    }
    return this.actions;
  }

  private parseUserMenuItems(): UserMenuItem[] {
    if (typeof this.userMenuItems === 'string') {
      try {
        return JSON.parse(this.userMenuItems);
      } catch (e) {
        return [];
      }
    }
    return this.userMenuItems;
  }

  private handleUserProfileClick = () => {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  };

  private handleUserMenuItemClick = (item: UserMenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    this.isUserMenuOpen = false;
  };

  private handleClickOutside = (event: MouseEvent) => {
    if (this.userMenuRef && !this.userMenuRef.contains(event.target as Node)) {
      this.isUserMenuOpen = false;
    }
  };

  componentDidLoad() {
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    const actions = this.parseActions();
    const userMenuItems = this.parseUserMenuItems();

    const containerStyle = {
      backgroundColor: this.backgroundColor,
      color: this.textColor,
    };

    return (
      <div 
        class={{
          'top-bar-container': true,
          'with-shadow': this.showShadow,
        }}
        style={containerStyle}
      >
        {/* Company Section */}
        <div class="company-section">
          <div class="company-logo">{this.companyLogo}</div>
          <div class="company-name">{this.companyName}</div>
        </div>

        {/* Center Section - Slot for custom content */}
        <div class="center-section">
          <slot></slot>
        </div>

        {/* Actions Section */}
        <div class="actions-section">
          {actions.map(action => (
            <button
              key={action.id}
              class="action-button"
              onClick={() => action.onClick?.()}
              title={action.label}
            >
              <span class="action-icon">{action.icon}</span>
              {action.badge && (
                <span class="action-badge">{action.badge}</span>
              )}
            </button>
          ))}

          {/* User Profile */}
          <div 
            class="user-profile-container"
            ref={el => this.userMenuRef = el}
          >
            <button
              class={{
                'user-profile-button': true,
                'active': this.isUserMenuOpen,
              }}
              onClick={this.handleUserProfileClick}
            >
              <span class="user-avatar">{this.userAvatar}</span>
              <span class="user-name">{this.userName}</span>
              <span class={{
                'dropdown-arrow': true,
                'open': this.isUserMenuOpen,
              }}>▼</span>
            </button>

            {/* User Menu Dropdown */}
            {this.isUserMenuOpen && (
              <div class="user-menu">
                {userMenuItems.map(item => (
                  <div key={item.id}>
                    {item.divider ? (
                      <div class="menu-divider"></div>
                    ) : (
                      <button
                        class="menu-item"
                        onClick={() => this.handleUserMenuItemClick(item)}
                      >
                        {item.icon && <span class="menu-item-icon">{item.icon}</span>}
                        <span class="menu-item-label">{item.label}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
