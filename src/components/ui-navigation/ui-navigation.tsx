import { Component, h, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { NavigationItem, NavigationBlock } from './navigation-types';

@Component({
  tag: 'ui-navigation',
  styleUrl: 'ui-navigation.css',
  shadow: true
})
export class UiNavigation {
  @Element() el: HTMLElement;
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Prop() collapsed: boolean = false;
  @Prop() floating: boolean = false;
  @Prop() theme: 'default' | 'dark' | 'glass' | 'custom' = 'default';
  @Prop() width: string = '240px';
  @Prop() collapsedWidth: string = '64px';
  @Prop() height: string = '100vh';
  @Prop() collapsedHeight: string = '64px';
  @Prop() animationDuration: number = 350;
  @Prop() easing: string = 'cubic-bezier(0.4,0,0.2,1)';
  @Prop() blocks: NavigationBlock[] = ['header', 'primary', 'secondary', 'footer'];
  @Prop() items: NavigationItem[] = [];
  @Prop() shadowDom: boolean = true;
  @State() internalCollapsed: boolean = this.collapsed;
  @State() activeItem: string = '';
  @State() openSubmenus: { [id: string]: boolean } = {};
  @Event() navItemClick: EventEmitter<NavigationItem>;
  @Event() navToggle: EventEmitter<boolean>;
  @Event() submenuOpenChange: EventEmitter<{ id: string; open: boolean }>;
  @Watch('collapsed')
  onCollapsedChange(newVal: boolean) { this.internalCollapsed = newVal; }
  toggleCollapse = () => { this.internalCollapsed = !this.internalCollapsed; this.navToggle.emit(this.internalCollapsed); };
  handleItemClick = (item: NavigationItem) => { if (!item.disabled) { this.activeItem = item.id; this.navItemClick.emit(item); } };
  handleSubmenuToggle = (id: string) => { this.openSubmenus = { ...this.openSubmenus, [id]: !this.openSubmenus[id] }; this.submenuOpenChange.emit({ id, open: this.openSubmenus[id] }); };
  renderBlock(block: NavigationBlock) {
    switch (block) {
      case 'header': return <slot name="header"></slot>;
      case 'primary':
        return (
          <nav class="nav-primary" role="navigation" aria-label="Primary">
            <ul>
              {this.items.map(item => (
                <navigation-item
                  item={item}
                  collapsed={this.internalCollapsed}
                  active={this.activeItem === item.id}
                  open={!!this.openSubmenus[item.id]}
                  onNavItemClick={ev => this.handleItemClick(ev.detail)}
                  onSubmenuToggle={ev => this.handleSubmenuToggle(ev.detail)}
                  animationDuration={this.animationDuration}
                  indentation={0}
                />
              ))}
            </ul>
          </nav>
        );
      case 'secondary': return <slot name="secondary"></slot>;
      case 'footer': return <slot name="footer"></slot>;
      default: return <slot name={block}></slot>;
    }
  }
  render() {
    const styleVars = {
      '--nav-width': this.internalCollapsed ? this.collapsedWidth : this.width,
      '--nav-height': this.orientation === 'horizontal' ? (this.internalCollapsed ? this.collapsedHeight : this.height) : '100vh',
      '--nav-animation-duration': `${this.animationDuration}ms`,
      '--nav-easing': this.easing,
    };
    return (
      <aside
        class={`ui-navigation ${this.orientation} ${this.theme} ${this.floating ? 'floating' : ''} ${this.internalCollapsed ? 'collapsed' : 'expanded'}`}
        style={styleVars}
        role="navigation"
        aria-orientation={this.orientation}
      >
        {this.blocks.map(block => this.renderBlock(block))}
        <button class="nav-toggle" onClick={this.toggleCollapse} aria-label="Toggle navigation">
          {this.internalCollapsed ? '▶' : '◀'}
        </button>
      </aside>
    );
  }
}
