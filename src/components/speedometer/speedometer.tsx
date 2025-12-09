import { Component, Prop, State, h, Watch, Element } from '@stencil/core';

@Component({
  tag: 'ui-speedometer',
  styleUrl: 'speedometer.css',
  shadow: true,
})
export class Speedometer {
  @Element() hostElement: HTMLElement;

  /**
   * Current value to display
   */
  @Prop() value: number = 0;

  /**
   * Minimum value
   */
  @Prop() minValue: number = 0;

  /**
   * Maximum value
   */
  @Prop() maxValue: number = 100;

  /**
   * Size of the speedometer in pixels
   */
  @Prop() size: number = 200;

  /**
   * Label text displayed below the value
   */
  @Prop() label: string = '';

  /**
   * Unit text (e.g., 'km/h', 'mph', '%')
   */
  @Prop() unit: string = '';

  /**
   * Show percentage instead of actual value
   */
  @Prop() showPercentage: boolean = false;

  /**
   * Color ranges as JSON string: [{ min, max, color }]
   */
  @Prop() ranges: string = '[]';

  /**
   * Needle color
   */
  @Prop() needleColor: string = '#1f2937';

  /**
   * Show tick marks
   */
  @Prop() showTicks: boolean = true;

  /**
   * Number of major ticks
   */
  @Prop() tickCount: number = 10;

  /**
   * Animation duration in milliseconds
   */
  @Prop() animationDuration: number = 1000;

  /**
   * Start angle in degrees (default -135 for 270° arc)
   */
  @Prop() startAngle: number = -135;

  /**
   * End angle in degrees (default 135 for 270° arc)
   */
  @Prop() endAngle: number = 135;

  /**
   * Gradient colors for the arc
   */
  @Prop() gradientColors: string = '';

  @State() animatedValue: number = 0;
  @State() parsedRanges: Array<{ min: number; max: number; color: string }> = [];

  private animationFrame: number;
  private animationStartTime: number;
  private animationStartValue: number;

  @Watch('value')
  handleValueChange(newValue: number) {
    this.animateToValue(newValue);
  }

  @Watch('ranges')
  handleRangesChange(newValue: string) {
    this.parseRanges(newValue);
  }

  componentWillLoad() {
    this.parseRanges(this.ranges);
    this.animatedValue = this.value;
  }

  componentDidLoad() {
    this.animateToValue(this.value);
  }

  disconnectedCallback() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private parseRanges(rangesString: string) {
    if (!rangesString) {
      this.parsedRanges = [];
      return;
    }
    try {
      this.parsedRanges = JSON.parse(rangesString);
    } catch (error) {
      console.error('Invalid JSON for speedometer ranges:', error);
      this.parsedRanges = [];
    }
  }

  private animateToValue(targetValue: number) {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationStartTime = performance.now();
    this.animationStartValue = this.animatedValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - this.animationStartTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);

      // Easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      this.animatedValue = this.animationStartValue + (targetValue - this.animationStartValue) * eased;

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.animatedValue = targetValue;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private getColorForValue(value: number): string {
    if (this.parsedRanges.length === 0) {
      return 'var(--primary-color)'; // Default theme-based color
    }

    const range = this.parsedRanges.find(r => value >= r.min && value <= r.max);
    return range ? range.color : this.parsedRanges[0].color;
  }

  private valueToAngle(value: number): number {
    const percentage = (value - this.minValue) / (this.maxValue - this.minValue);
    const totalAngle = this.endAngle - this.startAngle;
    return this.startAngle + totalAngle * percentage;
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  private createArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
    const start = this.polarToCartesian(centerX, centerY, radius, endAngle);
    const end = this.polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  }

  private renderArc() {
    const center = this.size / 2;
    const radius = (this.size / 2) - 30;
    const strokeWidth = 20;

    // Background arc
    const backgroundPath = this.createArc(center, center, radius, this.startAngle, this.endAngle);

    // Value arc (colored based on ranges or gradient)
    const currentAngle = this.valueToAngle(this.animatedValue);
    const valuePath = this.createArc(center, center, radius, this.startAngle, currentAngle);
    const valueColor = this.getColorForValue(this.animatedValue);

    return (
      <g>
        {/* Background arc */}
        <path
          d={backgroundPath}
          fill="none"
          stroke="#e5e7eb"
          stroke-width={strokeWidth}
          stroke-linecap="round"
        />

        {/* Range segments */}
        {this.parsedRanges.length > 0 ? (
          this.parsedRanges.map(range => {
            const rangeStartAngle = this.valueToAngle(range.min);
            const rangeEndAngle = this.valueToAngle(range.max);
            const rangePath = this.createArc(center, center, radius, rangeStartAngle, rangeEndAngle);
            return (
              <path
                d={rangePath}
                fill="none"
                stroke={range.color}
                stroke-width={strokeWidth}
                stroke-linecap="round"
                opacity="0.3"
              />
            );
          })
        ) : null}

        {/* Active value arc */}
        <path
          d={valuePath}
          fill="none"
          stroke={valueColor}
          stroke-width={strokeWidth}
          stroke-linecap="round"
          class="value-arc"
        />
      </g>
    );
  }

  private renderTicks() {
    if (!this.showTicks) return null;

    const center = this.size / 2;
    const outerRadius = (this.size / 2) - 20;
    const innerRadius = outerRadius - 10;
    const ticks = [];

    for (let i = 0; i <= this.tickCount; i++) {
      const percentage = i / this.tickCount;
      const angle = this.startAngle + (this.endAngle - this.startAngle) * percentage;
      const outer = this.polarToCartesian(center, center, outerRadius, angle);
      const inner = this.polarToCartesian(center, center, innerRadius, angle);

      ticks.push(
        <line
          x1={outer.x}
          y1={outer.y}
          x2={inner.x}
          y2={inner.y}
          stroke="#9ca3af"
          stroke-width="2"
          stroke-linecap="round"
        />
      );

      // Add labels for major ticks
      if (i % 2 === 0) {
        const labelRadius = innerRadius - 15;
        const labelPos = this.polarToCartesian(center, center, labelRadius, angle);
        const tickValue = this.minValue + (this.maxValue - this.minValue) * percentage;
        const displayValue = Math.round(tickValue);

        ticks.push(
          <text
            x={labelPos.x}
            y={labelPos.y}
            text-anchor="middle"
            dominant-baseline="middle"
            class="tick-label"
          >
            {displayValue}
          </text>
        );
      }
    }

    return <g>{ticks}</g>;
  }

  private renderNeedle() {
    const center = this.size / 2;
    const needleLength = (this.size / 2) - 40;
    const needleWidth = 4;
    const angle = this.valueToAngle(this.animatedValue);
    const tip = this.polarToCartesian(center, center, needleLength, angle);

    // Create needle shape
    const angleRad = (angle - 90) * Math.PI / 180;
    const perpAngle1 = angleRad + Math.PI / 2;
    const perpAngle2 = angleRad - Math.PI / 2;

    const base1 = {
      x: center + needleWidth * Math.cos(perpAngle1),
      y: center + needleWidth * Math.sin(perpAngle1)
    };
    const base2 = {
      x: center + needleWidth * Math.cos(perpAngle2),
      y: center + needleWidth * Math.sin(perpAngle2)
    };

    const needlePath = `M ${base1.x} ${base1.y} L ${tip.x} ${tip.y} L ${base2.x} ${base2.y} Z`;

    return (
      <g>
        {/* Needle */}
        <path
          d={needlePath}
          fill={this.needleColor}
          class="needle"
        />
        {/* Center circle */}
        <circle
          cx={center}
          cy={center}
          r="8"
          fill={this.needleColor}
        />
        <circle
          cx={center}
          cy={center}
          r="4"
          fill="#fff"
        />
      </g>
    );
  }

  private renderValue() {
    const displayValue = this.showPercentage
      ? Math.round(((this.animatedValue - this.minValue) / (this.maxValue - this.minValue)) * 100)
      : Math.round(this.animatedValue * 10) / 10;

    const displayUnit = this.showPercentage ? '%' : this.unit;

    return (
      <div class="value-display">
        <div class="value-number">
          {displayValue}
          {displayUnit && <span class="value-unit">{displayUnit}</span>}
        </div>
        {this.label && <div class="value-label">{this.label}</div>}
      </div>
    );
  }

  render() {
    return (
      <div
        class="speedometer-container"
        style={{
          width: `${this.size}px`,
          height: `${this.size}px`,
          ['--value-bottom' as any]: `${Math.max(6, Math.round(this.size * 0.04))}px`,
        }}
      >
        <svg
          width={this.size}
          height={this.size}
          viewBox={`0 0 ${this.size} ${this.size}`}
          class="speedometer-svg"
        >
          {this.renderArc()}
          {this.renderTicks()}
          {this.renderNeedle()}
        </svg>
        {this.renderValue()}
      </div>
    );
  }
}
