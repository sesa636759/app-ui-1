export interface CardMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
}

export interface CardFlipEvent {
  flipped: boolean;
}

export interface CardMenuEvent {
  itemId: string;
  cardId?: string;
}
