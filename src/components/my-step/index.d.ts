export interface HTMLMyStepElement extends HTMLElement {
  title: string;
  icon: string;
  subtitle: string;
  badge: string;
  tooltip: string;
  disabled: boolean;
  status: string;
  index: number;
  validate?: () => boolean | Promise<boolean>;
  renderContent?: () => any;
}
