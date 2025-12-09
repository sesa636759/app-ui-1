export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';
export type StepperStepStatus = 'completed' | 'active' | 'pending' | 'disabled' | 'success' | 'failed' | 'waiting' | 'info';
export type StepperFlow = 'linear' | 'non-linear';
export type StepperValidatorType = 'sync' | 'async';

export interface StepperValidator {
  type: StepperValidatorType;
  validate: (step: StepperStep, data?: any) => boolean | Promise<boolean>;
  errorMessage?: string;
}

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  status?: StepperStepStatus;
  children?: StepperStep[]; // For nested steps
  validator?: StepperValidator;
  data?: any; // Custom data for the step
  lazy?: boolean; // Whether to lazy render this step
}

export interface StepperNavigationOptions {
  skipValidation?: boolean;
  force?: boolean;
}

export interface StepperTheme {
  primaryColor?: string;
  secondaryColor?: string;
  successColor?: string;
  errorColor?: string;
  warningColor?: string;
  infoColor?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  fontSize?: string;
  fontFamily?: string;
}
