import { Component, Prop, h } from '@stencil/core';

export interface MeterValue {
  label: string;
  value: number;
  color?: string;
}

@Component({
  tag: 'ui-meter-group',
  styleUrl: 'meter-group.css',
  shadow: true,
})
export class MeterGroup {
  /**
   * Array of meter values
   */
  @Prop() values: MeterValue[] | string = [];

  /**
   * Orientation of the meter
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Height/thickness of the meter
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Show labels
   */
  @Prop() showLabels: boolean = true;

  /**
   * Show values
   */
  @Prop() showValues: boolean = true;

  /**
   * Show legend
   */
  @Prop() showLegend: boolean = false;

  /**
   * Shape of the meter
   */
  @Prop() shape: 'line' | 'circle' = 'line';

  /**
   * Minimum value
   */
  @Prop() min: number = 0;

  /**
   * Maximum value
   */
  @Prop() max: number = 100;

  private getValues(): MeterValue[] {
    if (typeof this.values === 'string') {
      try {
        return JSON.parse(this.values);
      } catch {
        return [];
      }
    }
    return this.values || [];
  }

  private getPercentage(value: number): number {
    const range = this.max - this.min;
    return ((value - this.min) / range) * 100;
  }

  private getDefaultColor(index: number): string {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return colors[index % colors.length];
  }

  private renderCircleMeter() {
    const values = this.getValues();
    const total = values.reduce((sum, item) => sum + item.value, 0);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    
    let currentOffset = 0;
    const segments = values.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const strokeDasharray = (percentage / 100) * circumference;
      const strokeDashoffset = -currentOffset;
      const color = item.color || this.getDefaultColor(index);
      
      currentOffset += strokeDasharray;
      
      return {
        ...item,
        color,
        strokeDasharray: `${strokeDasharray} ${circumference}`,
        strokeDashoffset,
        percentage: percentage.toFixed(1)
      };
    });

    const strokeWidth = this.size === 'sm' ? 8 : this.size === 'lg' ? 16 : 12;

    return (
      <div class="meter-circle-container">
        <svg viewBox="0 0 120 120" class="meter-circle">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            stroke-width={strokeWidth}
          />
          {segments.map((segment) => (
            <g>
              <title>{`${segment.label}: ${segment.value}`}</title>
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={segment.color}
                stroke-width={strokeWidth}
                stroke-dasharray={segment.strokeDasharray}
                stroke-dashoffset={segment.strokeDashoffset}
                stroke-linecap="round"
                transform="rotate(-90 60 60)"
              />
            </g>
          ))}
          {this.showValues && (
            <text x="60" y="60" text-anchor="middle" dominant-baseline="middle" class="circle-total-value">
              {total}
            </text>
          )}
        </svg>
      </div>
    );
  }

  render() {
    const values = this.getValues();
    const total = values.reduce((sum, item) => sum + item.value, 0);

    const containerClasses = [
      'meter-group',
      `meter-${this.orientation}`,
      `meter-${this.size}`,
      `meter-${this.shape}`,
    ].join(' ');

    return (
      <div class={containerClasses}>
        {this.shape === 'circle' ? (
          this.renderCircleMeter()
        ) : (
          <div class="meter-container">
            {values.map((item, index) => {
              const percentage = this.getPercentage(item.value);
              const color = item.color || this.getDefaultColor(index);
              
              return (
                <div
                  class="meter-segment"
                  style={{
                    [this.orientation === 'horizontal' ? 'width' : 'height']: `${percentage}%`,
                    backgroundColor: color,
                  }}
                  title={`${item.label}: ${item.value}`}
                >
                  {this.showValues && (
                    <span class="meter-value">{item.value}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {(this.showLabels || this.showLegend) && (
          <div class="meter-legend">
            {values.map((item, index) => {
              const color = item.color || this.getDefaultColor(index);
              const percentage = ((item.value / total) * 100).toFixed(1);
              
              return (
                <div class="legend-item">
                  <span class="legend-color" style={{ backgroundColor: color }}></span>
                  <span class="legend-label">{item.label}</span>
                  {this.showValues && (
                    <span class="legend-value">{item.value} ({percentage}%)</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
