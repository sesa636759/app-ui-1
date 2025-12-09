export interface TreeNode {
  key: string | number;
  label: string;
  icon?: string;
  avatar?: string;
  avatars?: Array<{ src?: string; label?: string; initials?: string; color?: string }>;
  locked?: boolean;
  lockTooltip?: string;
  disabled?: boolean;
  checked?: boolean;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
  metadata?: any;
}

export interface TreeListChangeEvent {
  node: TreeNode;
  expanded: boolean;
}

export interface TreeListSelectEvent {
  node: TreeNode;
  selected: boolean;
}

export interface TreeListActionEvent {
  node: TreeNode;
  action: string;
}
