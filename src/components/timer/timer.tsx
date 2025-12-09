import { Component, Prop, h, State, Method, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { TimerStep, TimerFlow, TimerTheme } from './types';

@Component({
  tag: 'ui-timer',
  styleUrl: 'timer.css',
  shadow: false // Shadow DOM optional, can be toggled via prop
})
export class Timer {
  @Element() el: HTMLElement;

  /** Steps definition */
  @Prop() steps: TimerStep[] | string = [];
  @State() normalizedSteps: TimerStep[] = [];

  /** Flow type */
  @Prop() flow: TimerFlow = 'linear';

  /** Current active step */
  @State() activeStep: number = 0;

  /** Theme variables */
  @Prop() theme?: TimerTheme;

  /** Shadow DOM toggle */
  @Prop() useShadow: boolean = false;

  /** Responsive/collapse */
  @Prop() collapse: boolean = false;

  /** Events */
  @Event() timerNext: EventEmitter<{ index: number, step: TimerStep }>;
  @Event() timerPrev: EventEmitter<{ index: number, step: TimerStep }>;
  @Event() timerGoTo: EventEmitter<{ index: number, step: TimerStep }>;

  /** Watch for steps prop changes */
  @Watch('steps')
  normalizeSteps(newSteps: TimerStep[] | string) {
    if (typeof newSteps === 'string') {
      try {
        this.normalizedSteps = JSON.parse(newSteps);
      } catch {
        this.normalizedSteps = [];
      }
    } else {
      this.normalizedSteps = newSteps || [];
    }
  }

  componentWillLoad() {
    this.normalizeSteps(this.steps);
  }

  /** Programmatic API */
  @Method()
  async next() {
    if (this.activeStep < this.normalizedSteps.length - 1) {
      this.activeStep++;
      this.timerNext.emit({ index: this.activeStep, step: this.normalizedSteps[this.activeStep] });
    }
  }

  @Method()
  async prev() {
    if (this.activeStep > 0) {
      this.activeStep--;
      this.timerPrev.emit({ index: this.activeStep, step: this.normalizedSteps[this.activeStep] });
    }
  }

  @Method()
  async goTo(index: number) {
    if (index >= 0 && index < this.normalizedSteps.length) {
      this.activeStep = index;
      this.timerGoTo.emit({ index, step: this.normalizedSteps[index] });
    }
  }

  /** Keyboard navigation & ARIA */
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      this.next();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      this.prev();
    }
  };

  /** Lazy rendering for steps */
  renderStep(step: TimerStep, index: number) {
    if (this.collapse && index !== this.activeStep) return null;
    return (
      <div
        class={{
          'timer-step': true,
          'timer-step-active': index === this.activeStep,
          [`timer-step-${step.status}`]: !!step.status
        }}
        role="group"
        aria-label={step.label}
        tabIndex={index === this.activeStep ? 0 : -1}
      >
        <div class="timer-label">{step.label}</div>
        {step.description && <div class="timer-desc">{step.description}</div>}
        {step.duration && <div class="timer-duration">{step.duration}s</div>}
        {step.children && step.children.length > 0 && (
          <div class="timer-nested">
            {step.children.map((child, i) => this.renderStep(child, i))}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div
        class="timer-container"
        style={this.theme ? Object.entries(this.theme).reduce((acc, [k, v]) => { acc[`--${k}`] = v; return acc; }, {} as any) : {}}
        role="list"
        aria-label="Timer Steps"
        onKeyDown={this.handleKeyDown}
      >
        {this.normalizedSteps.map((step, i) => this.renderStep(step, i))}
      </div>
    );
  }
}
