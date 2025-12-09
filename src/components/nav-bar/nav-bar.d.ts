export interface NavItem {
  key: string;
  icon?: string;
  label?: string;
  badge?: string | number;
  tooltip?: string;
  disabled?: boolean;
  active?: boolean;
  children?: NavItem[];
  route?: string;
}
export interface NavBarConfig {
  orientation?: 'horizontal' | 'vertical';
  position?: 'left' | 'right' | 'top' | 'bottom' | 'floating' | 'docked';
  collapsed?: boolean;
  items: NavItem[];
  theme?: 'light' | 'dark' | any;
  width?: string;
  collapsedWidth?: string;
  itemSize?: string;
  padding?: string;
  animationSpeed?: number;
  animationEasing?: string;
  pin?: boolean;
}
