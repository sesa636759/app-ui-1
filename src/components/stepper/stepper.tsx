import { Component, Prop, h, State, Watch, Event, EventEmitter, Method, Element } from '@stencil/core';
import { StepperStep, StepperOrientation, StepperSize, StepperStepStatus, StepperFlow, StepperNavigationOptions, StepperTheme } from './types';


@Component({
  tag: 'ui-stepper',
  styleUrl: 'stepper.css',
  shadow: true,
})
export class Stepper {
  /**
   * Array of steps to display
   */
  /**
   * Steps can be provided as an array or a JSON string in the attribute
   */
  @Prop() steps: StepperStep[] | string = [];

  /**
   * Internal normalized steps
   */
  @State() normalizedSteps: StepperStep[] = [];

  /**
   * Orientation of the stepper (horizontal or vertical)
   */
  @Prop() orientation: StepperOrientation = 'horizontal';

  /**
   * Size of the stepper
   */
  @Prop() size: StepperSize = 'md';

  /**
   * Current active step index (0-based)
   */
  @Prop() activeStep: number = 0;

  /**
   * Whether to show step numbers
   */
  @Prop() showNumbers: boolean = true;

  /**
   * Whether to show step descriptions
   */
  @Prop() showDescriptions: boolean = false;

  /**
   * Show optional control buttons (Next/Previous/Finish/Failed)
   */
  @Prop() showControls: boolean = false;

  /**
   * Customize control button labels
   */
  @Prop() labelPrev: string = 'Previous';
  @Prop() labelNext: string = 'Next';
  @Prop() labelFinish: string = 'Finish';
  @Prop() labelFail: string = 'Mark Failed';

  /**
   * Events emitted when control buttons are clicked
   */
  @Event() stepperPrevious: EventEmitter<{ index: number, step: StepperStep }>;
  @Event() stepperNext: EventEmitter<{ index: number, step: StepperStep }>;
  @Event() stepperFinish: EventEmitter<{ index: number, step: StepperStep }>;
  @Event() stepperFail: EventEmitter<{ index: number, step: StepperStep }>;

  /**
   * Custom icon for each status (optional)
   */
  @Prop() customIcons?: { [key in StepperStepStatus]?: string };

  /**
   * Flow type: linear or non-linear
   */
  @Prop() flow: StepperFlow = 'linear';

  /**
   * Whether to use Shadow DOM
   */
  @Prop() shadow: boolean = true;

  /**
   * Theme configuration with CSS variables
   */
  @Prop() theme?: StepperTheme;

  /**
   * Enable keyboard navigation
   */
  @Prop() keyboardNavigation: boolean = true;

  /**
   * Enable responsive collapse/overflow
   */
  @Prop() responsive: boolean = true;

  /**
   * Maximum number of steps to show before collapsing
   */
  @Prop() maxVisibleSteps: number = 5;

  /**
   * Validation errors map
   */
  @State() validationErrors: Map<string, string> = new Map();

  /**
   * Reference to the host element
   */
  @Element() host: HTMLElement;

  /**
   * Event emitted when active step changes
   */
  @Event() stepperChange: EventEmitter<{ index: number; step: StepperStep; previousIndex: number }>;

  /**
   * Event emitted when validation fails
   */
  @Event() stepperValidationError: EventEmitter<{ index: number; step: StepperStep; error: string }>;

  /**
   * Programmatic API: Go to next step
   */
  @Method()
  async next(options: StepperNavigationOptions = {}): Promise<boolean> {
    return this.navigateToStep(this.activeStep + 1, options);
  }

  /**
   * Programmatic API: Go to previous step
   */
  @Method()
  async prev(options: StepperNavigationOptions = {}): Promise<boolean> {
    return this.navigateToStep(this.activeStep - 1, options);
  }

  /**
   * Programmatic API: Go to specific step
   */
  @Method()
  async goTo(stepIndex: number, options: StepperNavigationOptions = {}): Promise<boolean> {
    return this.navigateToStep(stepIndex, options);
  }

  /**
   * Programmatic API: Mark step as completed
   */
  @Method()
  async complete(stepIndex?: number): Promise<void> {
    const index = stepIndex ?? this.activeStep;
    if (index >= 0 && index < this.normalizedSteps.length) {
      this.updateStepStatus(index, 'completed');
    }
  }

  /**
   * Programmatic API: Mark step as failed
   */
  @Method()
  async fail(stepIndex?: number, errorMessage?: string): Promise<void> {
    const index = stepIndex ?? this.activeStep;
    if (index >= 0 && index < this.normalizedSteps.length) {
      this.updateStepStatus(index, 'failed');
      if (errorMessage) {
        this.validationErrors.set(this.normalizedSteps[index].id, errorMessage);
      }
    }
  }

  /**
   * Get current step
   */
  @Method()
  async getCurrentStep(): Promise<StepperStep | null> {
    return this.activeStep >= 0 && this.activeStep < this.normalizedSteps.length
      ? this.normalizedSteps[this.activeStep]
      : null;
  }

  /**
   * Get all steps
   */
  @Method()
  async getSteps(): Promise<StepperStep[]> {
    return [...this.normalizedSteps];
  }

  /**
   * Validate current step
   */
  @Method()
  async validateCurrentStep(): Promise<boolean> {
    return this.validateStep(this.activeStep);
  }

  private async navigateToStep(targetIndex: number, options: StepperNavigationOptions = {}): Promise<boolean> {
    if (targetIndex < 0 || targetIndex >= this.normalizedSteps.length) {
      return false;
    }

    // Removed unused variable currentStep
    const targetStep = this.normalizedSteps[targetIndex];

    // Check if navigation is allowed
    if (!options.force && !this.canNavigateTo(targetIndex)) {
      return false;
    }

    // Validate current step if not skipping validation
    if (!options.skipValidation && this.flow === 'linear') {
      const isValid = await this.validateStep(this.activeStep);
      if (!isValid) {
        return false;
      }
    }

    const previousIndex = this.activeStep;
    this.activeStep = targetIndex;

    // Update step statuses
    this.updateStepStatuses();

    // Emit change event
    this.stepperChange.emit({
      index: targetIndex,
      step: targetStep,
      previousIndex
    });

    return true;
  }

  private canNavigateTo(targetIndex: number): boolean {
    if (this.flow === 'non-linear') {
      return true;
    }

    // In linear flow, can only go to completed steps or next step
    return targetIndex <= this.activeStep + 1;
  }

  private async validateStep(stepIndex: number): Promise<boolean> {
    const step = this.normalizedSteps[stepIndex];
    if (!step || !step.validator) {
      return true;
    }

    try {
      const isValid = await step.validator.validate(step, step.data);
      if (!isValid) {
        const errorMessage = step.validator.errorMessage || 'Validation failed';
        this.validationErrors.set(step.id, errorMessage);
        this.stepperValidationError.emit({
          index: stepIndex,
          step,
          error: errorMessage
        });
        return false;
      }

      // Clear any previous errors
      this.validationErrors.delete(step.id);
      return true;
    } catch (error) {
      const errorMessage = `Validation error: ${error.message}`;
      this.validationErrors.set(step.id, errorMessage);
      this.stepperValidationError.emit({
        index: stepIndex,
        step,
        error: errorMessage
      });
      return false;
    }
  }

  private updateStepStatuses(): void {
    this.normalizedSteps = this.normalizedSteps.map((step, index) => {
      let status: StepperStepStatus = step.status || 'pending';

      if (index < this.activeStep) {
        status = 'completed';
      } else if (index === this.activeStep) {
        status = 'active';
      } else {
        status = 'pending';
      }

      return { ...step, status };
    });
  }

  private updateStepStatus(stepIndex: number, status: StepperStepStatus): void {
    if (stepIndex >= 0 && stepIndex < this.normalizedSteps.length) {
      this.normalizedSteps = this.normalizedSteps.map((step, index) =>
        index === stepIndex ? { ...step, status } : step
      );
    }
  }

  private getStepIcon(status: StepperStepStatus): string {
    if (this.customIcons && this.customIcons[status]) {
      return this.customIcons[status];
    }

    switch (status) {
      case 'completed':
      case 'success':
        return '✓';
      case 'failed':
        return '✕';
      case 'waiting':
        return '⏳';
      case 'info':
        return 'ℹ';
      case 'active':
        return '●';
      default:
        return '○';
    }
  }

  private getStepClasses(step: StepperStep, index: number): string {
    const classes = [
      'stepper-step',
      `stepper-step-${this.size}`,
      `stepper-step-${step.status}`
    ];

    if (index === this.activeStep) {
      classes.push('stepper-step-active');
    }

    if (index < this.activeStep) {
      classes.push('stepper-step-completed');
    }

    return classes.join(' ');
  }

  private parseSteps(input: StepperStep[] | string): StepperStep[] {
    if (Array.isArray(input)) {
      return input;
    }
    if (typeof input === 'string' && input.trim().length) {
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) {
          return parsed as StepperStep[];
        }
      } catch (e) {
        console.warn('ui-stepper: failed to parse steps JSON, using defaults', e);
      }
    }
    // Fallback default steps
    return [
      { id: '1', label: 'Step 1', status: 'completed' },
      { id: '2', label: 'Step 2', status: 'active' },
      { id: '3', label: 'Step 3', status: 'waiting' },
      { id: '4', label: 'Step 4', status: 'waiting' },
    ];
  }

  @Watch('steps')
  stepsChanged(newVal: StepperStep[] | string) {
    this.normalizedSteps = this.parseSteps(newVal);
  }

  componentWillLoad() {
    this.normalizedSteps = this.parseSteps(this.steps);
  }

  private onPrevClick = () => {
    const idx = Math.max(0, this.activeStep - 1);
    const step = this.normalizedSteps[idx];
    this.stepperPrevious.emit({ index: idx, step });
  };

  private onNextClick = () => {
    const idx = Math.min(this.normalizedSteps.length - 1, this.activeStep + 1);
    const step = this.normalizedSteps[idx];
    this.stepperNext.emit({ index: idx, step });
  };

  private onFinishClick = () => {
    const idx = this.activeStep;
    const step = this.normalizedSteps[idx];
    this.stepperFinish.emit({ index: idx, step });
  };

  private onFailClick = () => {
    const idx = this.activeStep;
    const step = this.normalizedSteps[idx];
    this.stepperFail.emit({ index: idx, step });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.keyboardNavigation) return;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.next();
        break;
      case 'Home':
        event.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        event.preventDefault();
        this.goTo(this.normalizedSteps.length - 1);
        break;
    }
  };

  private handleStepClick = (index: number) => {
    if (this.flow === 'non-linear' || index <= this.activeStep + 1) {
      this.goTo(index);
    }
  };

  render() {
    const containerClasses = [
      'stepper-container',
      `stepper-${this.orientation}`,
      `stepper-${this.size}`,
      this.responsive ? 'stepper-responsive' : ''
    ].join(' ');

    const themeVars = this.theme ? {
      '--stepper-primary-color': this.theme.primaryColor,
      '--stepper-secondary-color': this.theme.secondaryColor,
      '--stepper-success-color': this.theme.successColor,
      '--stepper-error-color': this.theme.errorColor,
      '--stepper-warning-color': this.theme.warningColor,
      '--stepper-info-color': this.theme.infoColor,
      '--stepper-text-color': this.theme.textColor,
      '--stepper-background-color': this.theme.backgroundColor,
      '--stepper-border-color': this.theme.borderColor,
      '--stepper-font-size': this.theme.fontSize,
      '--stepper-font-family': this.theme.fontFamily,
    } : {};

    return (
      <div
        class={containerClasses}
        style={themeVars}
        role="tablist"
        aria-orientation={this.orientation}
        aria-label="Step navigation"
        tabindex={this.keyboardNavigation ? 0 : -1}
        onKeyDown={this.handleKeyDown}
      >
        {this.normalizedSteps.map((step, index) => {
          const isLast = index === this.normalizedSteps.length - 1;
          const isClickable = this.flow === 'non-linear' || index <= this.activeStep + 1;
          const connectorStatus = step.status === 'completed' || step.status === 'success'
            ? 'completed'
            : step.status === 'failed'
            ? 'failed'
            : step.status === 'active'
            ? 'active'
            : 'pending';

          const stepClasses = [
            ...this.getStepClasses(step, index).split(' '),
            isClickable ? 'stepper-step-clickable' : '',
            this.validationErrors.has(step.id) ? 'stepper-step-error' : ''
          ].filter(Boolean).join(' ');

          return (
            <div
              key={step.id}
              class={stepClasses}
              style={{position: 'relative'}}
              role="tab"
              aria-selected={index === this.activeStep}
              aria-controls={`step-panel-${step.id}`}
              aria-disabled={!isClickable}
              tabindex={isClickable ? 0 : -1}
              onClick={() => this.handleStepClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleStepClick(index);
                }
              }}
            >
              <div class="stepper-step-wrapper">
                <div
                  class="stepper-step-indicator"
                  style={{position: 'relative'}}
                  aria-label={`Step ${index + 1}: ${step.label} - ${step.status}`}
                >
                  {this.showNumbers && step.status !== 'active' && step.status !== 'completed' && step.status !== 'success' ? (
                    <span class="stepper-step-number" aria-hidden="true">{index + 1}</span>
                  ) : (
                    <span class="stepper-step-icon" aria-hidden="true">{this.getStepIcon(step.status)}</span>
                  )}
                  {!isLast && (
                    <span
                      class={`stepper-connector stepper-connector-${this.orientation} stepper-connector-${connectorStatus}`}
                      aria-hidden="true"
                    ></span>
                  )}
                </div>
                {this.orientation === 'horizontal' ? (
                  <div class="stepper-step-content stepper-step-content-horizontal">
                    <div class="stepper-step-label">{step.label}</div>
                    {this.showDescriptions && step.description && (
                      <div class="stepper-step-description">{step.description}</div>
                    )}
                    {this.validationErrors.has(step.id) && (
                      <div class="stepper-step-error-message" role="alert">
                        {this.validationErrors.get(step.id)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div class="stepper-step-content">
                    <div class="stepper-step-label">{step.label}</div>
                    {this.showDescriptions && step.description && (
                      <div class="stepper-step-description">{step.description}</div>
                    )}
                    {this.validationErrors.has(step.id) && (
                      <div class="stepper-step-error-message" role="alert">
                        {this.validationErrors.get(step.id)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {this.showControls ? (
          <div class="stepper-controls" role="group" aria-label="Step controls">
            <button
              class="stepper-btn prev"
              onClick={this.onPrevClick}
              disabled={this.activeStep <= 0}
              aria-label={this.labelPrev}
            >
              {this.labelPrev}
            </button>
            <button
              class="stepper-btn next"
              onClick={this.onNextClick}
              disabled={this.activeStep >= this.normalizedSteps.length - 1}
              aria-label={this.labelNext}
            >
              {this.labelNext}
            </button>
            <button
              class="stepper-btn finish"
              onClick={this.onFinishClick}
              aria-label={this.labelFinish}
            >
              {this.labelFinish}
            </button>
            <button
              class="stepper-btn fail"
              onClick={this.onFailClick}
              aria-label={this.labelFail}
            >
              {this.labelFail}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}