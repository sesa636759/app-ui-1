import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

export interface SliderMark {
  value: number;
  label?: string;
}

@Component({
  tag: 'ui-range-slider',
  styleUrl: 'range-slider.css',
  shadow: true,
})
export class RangeSlider {
  private trackElement: HTMLDivElement;
  private isDragging: boolean = false;
  private activeThumb: 'start' | 'end' | null = null;

  /**
   * Minimum value
   */
  @Prop() min: number = 0;

  /**
   * Maximum value
   */
  @Prop() max: number = 100;

  /**
   * Step increment
   */
  @Prop() step: number = 1;

  /**
   * Current value (single slider)
   */
  @Prop({ mutable: true }) value: number = 50;

  /**
   * Range mode - start value
   */
  @Prop({ mutable: true }) startValue: number = 25;

  /**
   * Range mode - end value
   */
  @Prop({ mutable: true }) endValue: number = 75;

  /**
   * Enable range mode (two thumbs)
   */
  @Prop() range: boolean = false;

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Show value tooltip
   */
  @Prop() showTooltip: boolean = true;

  /**
   * Tooltip always visible
   */
  @Prop() tooltipAlwaysVisible: boolean = false;

  /**
   * Color of the slider
   */
  @Prop() color: string = '#3b82f6';

  /**
   * Track color
   */
  @Prop() trackColor: string = '#e5e7eb';

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Start icon/text
   */
  @Prop() startIcon: string = '';

  /**
   * End icon/text
   */
  @Prop() endIcon: string = '';

  /**
   * Display format function or string
   */
  @Prop() displayFormat: string = '';

  /**
   * Show marks
   */
  @Prop() showMarks: boolean = false;

  /**
   * Custom marks
   */
  @Prop() marks: SliderMark[] | string = [];

  /**
   * Restricted values (only allow specific values)
   */
  @Prop() restrictedValues: number[] | string = [];

  /**
   * Vertical orientation
   */
  @Prop() vertical: boolean = false;

  /**
   * Show current value label
   */
  @Prop() showValue: boolean = true;

  /**
   * Custom step marks (non-linear scaling)
   */
  @Prop() customSteps: number[] | string = [];

  /**
   * Hover state for tooltip
   */
  @State() isHovering: boolean = false;

  /**
   * Dragging state
   */
  @State() isDraggingState: boolean = false;

  /**
   * Emitted when value changes
   */
  @Event() sliderChange: EventEmitter<number | { start: number; end: number }>;

  /**
   * Emitted on drag start
   */
  @Event() sliderDragStart: EventEmitter<void>;

  /**
   * Emitted on drag end
   */
  @Event() sliderDragEnd: EventEmitter<void>;

  componentDidLoad() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  disconnectedCallback() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  private getMarks(): SliderMark[] {
    if (typeof this.marks === 'string') {
      try {
        return JSON.parse(this.marks);
      } catch {
        return [];
      }
    }
    return this.marks;
  }

  private getRestrictedValues(): number[] {
    if (typeof this.restrictedValues === 'string') {
      try {
        return JSON.parse(this.restrictedValues);
      } catch {
        return [];
      }
    }
    return this.restrictedValues;
  }

  private getCustomSteps(): number[] {
    if (typeof this.customSteps === 'string') {
      try {
        return JSON.parse(this.customSteps);
      } catch {
        return [];
      }
    }
    return this.customSteps;
  }

  private getNearestValue(value: number): number {
    const restricted = this.getRestrictedValues();
    if (restricted.length > 0) {
      // Find nearest restricted value
      return restricted.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    }

    const customSteps = this.getCustomSteps();
    if (customSteps.length > 0) {
      // Find nearest custom step
      return customSteps.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    }

    // Regular step
    const steps = Math.round((value - this.min) / this.step);
    return Math.min(this.max, Math.max(this.min, this.min + steps * this.step));
  }

  private getPositionFromValue(value: number): number {
    const customSteps = this.getCustomSteps();
    if (customSteps.length > 0) {
      // Non-linear scaling based on custom steps
      const sortedSteps = [...customSteps].sort((a, b) => a - b);
      const index = sortedSteps.indexOf(value);
      if (index !== -1) {
        return (index / (sortedSteps.length - 1)) * 100;
      }
      // If value not in steps, find position between steps
      for (let i = 0; i < sortedSteps.length - 1; i++) {
        if (value >= sortedSteps[i] && value <= sortedSteps[i + 1]) {
          const ratio = (value - sortedSteps[i]) / (sortedSteps[i + 1] - sortedSteps[i]);
          const segmentStart = (i / (sortedSteps.length - 1)) * 100;
          const segmentEnd = ((i + 1) / (sortedSteps.length - 1)) * 100;
          return segmentStart + ratio * (segmentEnd - segmentStart);
        }
      }
    }

    // Linear scaling
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private getValueFromPosition(position: number): number {
    const customSteps = this.getCustomSteps();
    if (customSteps.length > 0) {
      // Non-linear scaling
      const sortedSteps = [...customSteps].sort((a, b) => a - b);
      const index = Math.round((position / 100) * (sortedSteps.length - 1));
      return sortedSteps[Math.max(0, Math.min(index, sortedSteps.length - 1))];
    }

    // Linear scaling
    const rawValue = this.min + (position / 100) * (this.max - this.min);
    return this.getNearestValue(rawValue);
  }

  private handleTrackClick = (event: MouseEvent) => {
    if (this.disabled) return;

    const rect = this.trackElement.getBoundingClientRect();
    const position = this.vertical
      ? ((rect.bottom - event.clientY) / rect.height) * 100
      : ((event.clientX - rect.left) / rect.width) * 100;

    const newValue = this.getValueFromPosition(Math.max(0, Math.min(100, position)));

    if (this.range) {
      const startPos = this.getPositionFromValue(this.startValue);
      const endPos = this.getPositionFromValue(this.endValue);
      const clickPos = position;

      // Determine which thumb to move
      const distToStart = Math.abs(clickPos - startPos);
      const distToEnd = Math.abs(clickPos - endPos);

      if (distToStart < distToEnd) {
        this.startValue = Math.min(newValue, this.endValue);
      } else {
        this.endValue = Math.max(newValue, this.startValue);
      }
      this.sliderChange.emit({ start: this.startValue, end: this.endValue });
    } else {
      this.value = newValue;
      this.sliderChange.emit(this.value);
    }
  };

  private handleThumbMouseDown = (thumb: 'start' | 'end' | null) => (event: MouseEvent) => {
    if (this.disabled) return;
    event.preventDefault();
    this.isDragging = true;
    this.isDraggingState = true;
    this.activeThumb = thumb;
    this.sliderDragStart.emit();
  };

  private handleThumbTouchStart = (thumb: 'start' | 'end' | null) => (event: TouchEvent) => {
    if (this.disabled) return;
    event.preventDefault();
    this.isDragging = true;
    this.isDraggingState = true;
    this.activeThumb = thumb;
    this.sliderDragStart.emit();
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging || this.disabled) return;
    this.updateValueFromEvent(event.clientX, event.clientY);
  };

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.isDragging || this.disabled) return;
    const touch = event.touches[0];
    this.updateValueFromEvent(touch.clientX, touch.clientY);
  };

  private updateValueFromEvent(clientX: number, clientY: number) {
    if (!this.trackElement) return;

    const rect = this.trackElement.getBoundingClientRect();
    const position = this.vertical
      ? ((rect.bottom - clientY) / rect.height) * 100
      : ((clientX - rect.left) / rect.width) * 100;

    const newValue = this.getValueFromPosition(Math.max(0, Math.min(100, position)));

    if (this.range) {
      if (this.activeThumb === 'start') {
        this.startValue = Math.min(newValue, this.endValue);
      } else if (this.activeThumb === 'end') {
        this.endValue = Math.max(newValue, this.startValue);
      }
      this.sliderChange.emit({ start: this.startValue, end: this.endValue });
    } else {
      this.value = newValue;
      this.sliderChange.emit(this.value);
    }
  }

  private handleMouseUp = () => {
    if (this.isDragging) {
      this.isDragging = false;
      this.isDraggingState = false;
      this.activeThumb = null;
      this.sliderDragEnd.emit();
    }
  };

  private handleTouchEnd = () => {
    if (this.isDragging) {
      this.isDragging = false;
      this.isDraggingState = false;
      this.activeThumb = null;
      this.sliderDragEnd.emit();
    }
  };

  private formatValue(value: number): string {
    if (this.displayFormat) {
      try {
        return this.displayFormat.replace('{value}', value.toString());
      } catch {
        return value.toString();
      }
    }
    return value.toString();
  }

  private renderMarks() {
    const marks = this.getMarks();
    const customSteps = this.getCustomSteps();
    
    let marksToRender: SliderMark[] = marks;

    if (marksToRender.length === 0 && this.showMarks) {
      // Auto-generate marks based on steps
      const steps = customSteps.length > 0 ? customSteps : [];
      if (steps.length === 0) {
        for (let i = this.min; i <= this.max; i += this.step) {
          steps.push(i);
        }
      }
      marksToRender = steps.map(val => ({ value: val }));
    }

    return marksToRender.map(mark => {
      const position = this.getPositionFromValue(mark.value);
      const style = this.vertical
        ? { bottom: `${position}%` }
        : { left: `${position}%` };

      return (
        <div class="slider-mark" style={style}>
          <div class="slider-mark-dot"></div>
          {mark.label && <div class="slider-mark-label">{mark.label}</div>}
        </div>
      );
    });
  }

  render() {
    const startPos = this.range ? this.getPositionFromValue(this.startValue) : 0;
    const endPos = this.range ? this.getPositionFromValue(this.endValue) : this.getPositionFromValue(this.value);

    const rangeStyle = this.vertical
      ? {
          bottom: `${startPos}%`,
          height: `${endPos - startPos}%`,
          backgroundColor: this.color,
        }
      : {
          left: `${startPos}%`,
          width: `${endPos - startPos}%`,
          backgroundColor: this.color,
        };

    return (
      <Host>
        <div
          class={{
            'slider-container': true,
            [`slider-${this.size}`]: true,
            'slider-vertical': this.vertical,
            'slider-disabled': this.disabled,
            'slider-dragging': this.isDraggingState,
          }}
          onMouseEnter={() => (this.isHovering = true)}
          onMouseLeave={() => (this.isHovering = false)}
        >
          {this.startIcon && (
            <div class="slider-icon slider-start-icon">{this.startIcon}</div>
          )}

          <div class="slider-wrapper">
            <div
              class="slider-track"
              ref={el => (this.trackElement = el)}
              onClick={this.handleTrackClick}
              style={{ backgroundColor: this.trackColor }}
            >
              <div class="slider-range" style={rangeStyle}></div>

              {this.showMarks && <div class="slider-marks">{this.renderMarks()}</div>}

              {this.range && (
                <div
                  class={{
                    'slider-thumb': true,
                    'slider-thumb-active': this.activeThumb === 'start',
                  }}
                  style={
                    this.vertical
                      ? { bottom: `${startPos}%`, backgroundColor: this.color }
                      : { left: `${startPos}%`, backgroundColor: this.color }
                  }
                  onMouseDown={this.handleThumbMouseDown('start')}
                  onTouchStart={this.handleThumbTouchStart('start')}
                >
                  {(this.showTooltip && (this.tooltipAlwaysVisible || this.isHovering || this.isDraggingState)) && (
                    <div class="slider-tooltip">{this.formatValue(this.startValue)}</div>
                  )}
                </div>
              )}

              <div
                class={{
                  'slider-thumb': true,
                  'slider-thumb-active': !this.range || this.activeThumb === 'end',
                }}
                style={
                  this.vertical
                    ? { bottom: `${endPos}%`, backgroundColor: this.color }
                    : { left: `${endPos}%`, backgroundColor: this.color }
                }
                onMouseDown={this.handleThumbMouseDown(this.range ? 'end' : null)}
                onTouchStart={this.handleThumbTouchStart(this.range ? 'end' : null)}
              >
                {(this.showTooltip && (this.tooltipAlwaysVisible || this.isHovering || this.isDraggingState)) && (
                  <div class="slider-tooltip">
                    {this.formatValue(this.range ? this.endValue : this.value)}
                  </div>
                )}
              </div>
            </div>

            {this.showValue && (
              <div class="slider-value-display">
                {this.range
                  ? `${this.formatValue(this.startValue)} - ${this.formatValue(this.endValue)}`
                  : this.formatValue(this.value)}
              </div>
            )}
          </div>

          {this.endIcon && (
            <div class="slider-icon slider-end-icon">{this.endIcon}</div>
          )}
        </div>
      </Host>
    );
  }
}
