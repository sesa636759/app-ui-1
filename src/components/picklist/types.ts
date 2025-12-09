export interface PicklistOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: string;
  description?: string;
}

export type PicklistMode = 'single' | 'multi';
export type PicklistSize = 'sm' | 'md' | 'lg';
export type PicklistVariant = 'default' | 'bordered' | 'ghost';

export interface PicklistChangeEvent {
  value: string | number | (string | number)[];
  selectedOptions: PicklistOption[];
}