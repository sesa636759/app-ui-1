export interface TabItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
  closable?: boolean;
  color?: string; // User-defined tab color
  actions?: boolean; // Show 3-dots actions menu for this tab
}

export interface TabChangeEvent {
  tabId: string;
  activeTab: string;
}
