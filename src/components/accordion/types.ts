export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  image?: string;
  badge?: number;
  disabled?: boolean;
}

export interface AccordionChangeEvent {
  itemId: string;
  isOpen: boolean;
  openItems: string[];
}

export type AccordionAnimation = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'none';