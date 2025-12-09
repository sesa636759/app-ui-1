export type TimerFlow = 'linear' | 'non-linear';
export type TimerStepStatus = 'completed' | 'active' | 'pending' | 'disabled' | 'success' | 'failed' | 'waiting' | 'info';
export type TimerValidatorType = 'sync' | 'async';

export interface TimerValidator {
  type: TimerValidatorType;
  validate: (step: TimerStep, data?: any) => boolean | Promise<boolean>;
}

export interface TimerStep {
  label: string;
  description?: string;
  status?: TimerStepStatus;
  children?: TimerStep[];
  validator?: TimerValidator;
  duration?: number; // in seconds
}

export interface TimerTheme {
  [key: string]: string;
}
