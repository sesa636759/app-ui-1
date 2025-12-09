import { Component, Prop, h, Event, EventEmitter, Method, Element, Listen } from '@stencil/core';

@Component({
  tag: 'ui-smart-stepper',
  styleUrl: 'smart-stepper.css',
  shadow: true,
})
export class SmartStepper {
  /**
   * Orientation of the stepper (horizontal or vertical)
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Size of the stepper
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Current active step index (0-based)
   */
  @Prop({ mutable: true }) activeStep: number = 0;

  /**
   * Reference to the host element
   */
  @Element() host: HTMLElement;

  /**
   * Event emitted when active step changes
   */
  @Event() stepperChange: EventEmitter<{ index: number; step: HTMLElement }>;

  /**
   * Programmatic API: Go to next step
   */
  @Method()
  async next(): Promise<boolean> {
    const steps = this.getStepsSync();
    if (this.activeStep < steps.length - 1) {
      return this.goTo(this.activeStep + 1);
    }
    return false;
  }

  /**
   * Programmatic API: Go to previous step
   */
  @Method()
  async prev(): Promise<boolean> {
    if (this.activeStep > 0) {
      return this.goTo(this.activeStep - 1);
    }
    return false;
  }

  /**
   * Programmatic API: Go to specific step
   */
  @Method()
  async goTo(stepIndex: number): Promise<boolean> {
    const steps = this.getStepsSync();
    if (stepIndex >= 0 && stepIndex < steps.length) {
      this.activeStep = stepIndex;
      this.updateStepVisibility();
      this.stepperChange.emit({
        index: stepIndex,
        step: steps[stepIndex]
      });
      return true;
    }
    return false;
  }

  /**
   * Get current step element
   */
  @Method()
  async getCurrentStep(): Promise<HTMLElement | null> {
    const steps = this.getStepsSync();
    return steps[this.activeStep] || null;
  }

  /**
   * Get all step elements
   */
  @Method()
  async getSteps(): Promise<HTMLElement[]> {
    return this.getStepsSync();
  }

  private getStepsSync(): HTMLElement[] {
    return Array.from(this.host.querySelectorAll('smart-step'));
  }

  private updateStepVisibility(): void {
    const steps = this.getStepsSync();
    steps.forEach((step, index) => {
      const content = step.querySelector('.stepper-content') as HTMLElement;
      if (content) {
        content.style.display = index === this.activeStep ? 'block' : 'none';
      }

      // Update header classes
      const header = step.querySelector('.step-header') as HTMLElement;
      if (header) {
        header.classList.remove('active', 'completed');
        if (index === this.activeStep) {
          header.classList.add('active');
        } else if (index < this.activeStep) {
          header.classList.add('completed');
        }
      }
    });
  }

  private handleStepClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const stepElement = target.closest('smart-step') as HTMLElement;
    if (stepElement) {
      const steps = this.getStepsSync();
      const stepIndex = steps.indexOf(stepElement);
      if (stepIndex !== -1) {
        this.goTo(stepIndex);
      }
    }
  };

  componentDidLoad() {
    this.updateStepVisibility();
  }

  componentDidUpdate() {
    this.updateStepVisibility();
  }

  @Listen('stepClick')
  handleStepClickEvent(event: CustomEvent) {
    event.stopPropagation();
    const stepElement = event.target as HTMLElement;
    const steps = this.getStepsSync();
    const stepIndex = steps.indexOf(stepElement);
    if (stepIndex !== -1) {
      this.goTo(stepIndex);
    }
  }

  render() {
    const containerClasses = [
      'smart-stepper-container',
      `stepper-${this.orientation}`,
      `stepper-${this.size}`
    ].join(' ');

    return (
      <div class={containerClasses}>
        <div class="stepper-header" onClick={this.handleStepClick}>
          <slot></slot>
        </div>
        <div class="stepper-content-area">
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}
