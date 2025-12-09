export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  badge?: string;
  children?: NavigationItem[];
  disabled?: boolean;
}
export type NavigationBlock = 'header' | 'primary' | 'secondary' | 'footer' | 'custom-1' | 'custom-2';
