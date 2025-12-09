
export type TimelineFlow = 'linear' | 'non-linear';
export type TimelineEventStatus = 'completed' | 'active' | 'pending' | 'disabled' | 'success' | 'failed' | 'waiting' | 'info';
export type TimelineValidatorType = 'sync' | 'async';

export interface TimelineValidator {
  type: TimelineValidatorType;
  validate: (event: TimelineEvent, data?: any) => boolean | Promise<boolean>;
}

export interface TimelineEvent {
  label: string;
  description?: string;
  status?: TimelineEventStatus;
  children?: TimelineEvent[];
  validator?: TimelineValidator;
  timestamp?: string;
  icon?: string;
}

export interface TimelineTheme {
  [key: string]: string;
}
