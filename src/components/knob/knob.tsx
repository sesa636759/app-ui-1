import { Component, Prop, h, State, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'ui-knob',
  styleUrl: 'knob.css',
  shadow: true,
})
export class Knob {
  /**
   * Current value
   */
  @Prop({ mutable: true }) value: number = 0;

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
   * Size of the knob
   */
  @Prop() size: number = 120;

  /**
   * Stroke width
   */
  @Prop() strokeWidth: number = 8;

  /**
   * Color of the active arc
   */
  @Prop() color: string = '#3b82f6';

  /**
   * Color of the track
   */
  @Prop() trackColor: string = '#e2e8f0';

  /**
   * Show value label
   */
  @Prop() showValue: boolean = true;

  /**
   * Custom value suffix (e.g., '%', '°', 'dB')
   */
  @Prop() valueSuffix: string = '';

  /**
   * Show min/max labels
   */
  @Prop() showMinMax: boolean = false;

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Read-only state
   */
  @Prop() readonly: boolean = false;

  /**
   * Start angle in degrees (0 = top, 90 = right)
   */
  @Prop() startAngle: number = 135;

  /**
   * End angle in degrees
   */
  @Prop() endAngle: number = 405;

  /**
   * Enable mouse wheel rotation control
   */
  @Prop() enableWheel: boolean = true;

  /**
   * Show tick marks along the arc (useful for speedometer-like gauges)
   */
  @Prop() showTicks: boolean = false;

  /**
   * Number of tick marks to render along the arc
   */
  @Prop() tickCount: number = 10;

  /**
   * Tick color
   */
  @Prop() tickColor: string = '#94a3b8';

  /**
   * Tick length factor relative to radius (0-1)
   */
  @Prop() tickLength: number = 0.1;

  /**
   * Event emitted when value changes
   */
  @Event() knobChange: EventEmitter<number>;

  /**
   * Event emitted while dragging
   */
  @Event() knobInput: EventEmitter<number>;

  @State() isDragging: boolean = false;
  @State() angle: number = 0;

  private knobRef?: HTMLDivElement;

  @Watch('value')
  valueChanged(newValue: number) {
    this.updateAngle(newValue);
  }

  componentWillLoad() {
    this.updateAngle(this.value);
  }

  private updateAngle(value: number) {
    const percentage = (value - this.min) / (this.max - this.min);
    const totalAngle = this.endAngle - this.startAngle;
    this.angle = this.startAngle + totalAngle * percentage;
  }

  private handleMouseDown = (event: MouseEvent) => {
    if (this.disabled || this.readonly) return;
    
    event.preventDefault();
    this.isDragging = true;
    this.updateValueFromEvent(event);
    
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    this.updateValueFromEvent(event);
    this.knobInput.emit(this.value);
  };

  private handleMouseUp = () => {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.knobChange.emit(this.value);
    
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  private handleTouchStart = (event: TouchEvent) => {
    if (this.disabled || this.readonly) return;
    
    event.preventDefault();
    this.isDragging = true;
    this.updateValueFromTouch(event);
  };

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.isDragging) return;
    event.preventDefault();
    this.updateValueFromTouch(event);
    this.knobInput.emit(this.value);
  };

  private handleTouchEnd = () => {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.knobChange.emit(this.value);
  };

  private handleWheel = (event: WheelEvent) => {
    if (!this.enableWheel || this.disabled || this.readonly) return;
    event.preventDefault();
    const direction = Math.sign(event.deltaY); // 1 = down, -1 = up
    const stepDelta = direction * this.step;
    let newValue = this.value - stepDelta; // wheel up increases, down decreases
    newValue = Math.max(this.min, Math.min(this.max, newValue));
    this.value = newValue;
    this.updateAngle(newValue);
    this.knobInput.emit(this.value);
    // Debounced change emit
    clearTimeout((this as any)._wheelTimeout);
    (this as any)._wheelTimeout = setTimeout(() => this.knobChange.emit(this.value), 100);
  };

  private updateValueFromEvent(event: MouseEvent) {
    if (!this.knobRef) return;
    
    const rect = this.knobRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    
    this.calculateValueFromAngle(deltaX, deltaY);
  }

  private updateValueFromTouch(event: TouchEvent) {
    if (!this.knobRef || event.touches.length === 0) return;
    
    const rect = this.knobRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const touch = event.touches[0];
    const deltaX = touch.clientX - centerX;
    const deltaY = touch.clientY - centerY;
    
    this.calculateValueFromAngle(deltaX, deltaY);
  }

  private calculateValueFromAngle(deltaX: number, deltaY: number) {
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    
    // Constrain angle to start/end range
    const totalAngle = this.endAngle - this.startAngle;
    if (angle < this.startAngle) {
      angle = angle + 360 >= this.startAngle ? angle + 360 : this.startAngle;
    }
    if (angle > this.endAngle && angle < this.startAngle + 360) {
      const distToStart = Math.abs(angle - this.startAngle);
      const distToEnd = Math.abs(angle - this.endAngle);
      angle = distToStart < distToEnd ? this.startAngle : this.endAngle;
    }
    
    angle = Math.max(this.startAngle, Math.min(this.endAngle, angle));
    
    const percentage = (angle - this.startAngle) / totalAngle;
    let newValue = this.min + percentage * (this.max - this.min);
    
    // Apply step
    newValue = Math.round(newValue / this.step) * this.step;
    newValue = Math.max(this.min, Math.min(this.max, newValue));
    
    this.value = newValue;
    this.angle = angle;
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  private describeArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
    const start = this.polarToCartesian(centerX, centerY, radius, endAngle);
    const end = this.polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  }

  disconnectedCallback() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const center = this.size / 2;
    const radius = (this.size - this.strokeWidth) / 2;
    
    const trackPath = this.describeArc(center, center, radius, this.startAngle, this.endAngle);
    const valuePath = this.describeArc(center, center, radius, this.startAngle, this.angle);
    
    const knobClasses = {
      'knob-container': true,
      'disabled': this.disabled,
      'readonly': this.readonly,
      'dragging': this.isDragging,
    };

    return (
      <div class="knob-wrapper">
        <div
          class={knobClasses}
          ref={(el) => (this.knobRef = el)}
          style={{ width: `${this.size}px`, height: `${this.size}px` }}
          onMouseDown={this.handleMouseDown}
          onWheel={this.handleWheel}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <svg width={this.size} height={this.size} class="knob-svg">
            {/* Track */}
            <path
              d={trackPath}
              fill="none"
              stroke={this.trackColor}
              stroke-width={this.strokeWidth}
              stroke-linecap="round"
            />

            {/* Ticks (optional) */}
            {this.showTicks && (() => {
              const total = Math.max(2, this.tickCount);
              const ticks = [] as any[];
              const totalAngle = this.endAngle - this.startAngle;
              for (let i = 0; i <= total; i++) {
                const a = this.startAngle + (totalAngle * i) / total;
                const inner = this.polarToCartesian(center, center, radius * (1 - this.tickLength), a);
                const outer = this.polarToCartesian(center, center, radius, a);
                const isMajor = i % Math.max(1, Math.floor(total / 5)) === 0;
                ticks.push(
                  <line
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke={this.tickColor}
                    stroke-width={isMajor ? this.strokeWidth / 2 : this.strokeWidth / 3}
                    stroke-linecap="round"
                  />
                );
              }
              return ticks;
            })()}
            
            {/* Value Arc */}
            <path
              d={valuePath}
              fill="none"
              stroke={this.color}
              stroke-width={this.strokeWidth}
              stroke-linecap="round"
              class="value-arc"
            />
            
            {/* Center Dot */}
            <circle
              cx={center}
              cy={center}
              r={this.strokeWidth / 2}
              fill={this.color}
              class="center-dot"
            />
            
            {/* Indicator Line */}
            {(() => {
              const indicatorStart = this.polarToCartesian(center, center, radius * 0.3, this.angle);
              const indicatorEnd = this.polarToCartesian(center, center, radius * 0.85, this.angle);
              return (
                <line
                  x1={indicatorStart.x}
                  y1={indicatorStart.y}
                  x2={indicatorEnd.x}
                  y2={indicatorEnd.y}
                  stroke={this.color}
                  stroke-width={this.strokeWidth / 2}
                  stroke-linecap="round"
                  class="indicator"
                />
              );
            })()}
          </svg>
          
          {this.showValue && (
            <div class="value-label">
              <span class="value-number">{this.value}</span>
              {this.valueSuffix && <span class="value-suffix">{this.valueSuffix}</span>}
            </div>
          )}
        </div>
        
        {this.showMinMax && (
          <div class="min-max-labels">
            <span class="min-label">{this.min}{this.valueSuffix}</span>
            <span class="max-label">{this.max}{this.valueSuffix}</span>
          </div>
        )}
      </div>
    );
  }
}
