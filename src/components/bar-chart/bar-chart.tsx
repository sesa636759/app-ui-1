import { Component, Prop, h, State, Watch, Element } from '@stencil/core';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartDataset {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
}

@Component({
  tag: 'ui-bar-chart',
  styleUrl: 'bar-chart.css',
  shadow: true,
})
export class UIBarChart {
  @Element() el: HTMLElement;

  /** Chart title */
  @Prop() chartTitle?: string; // Renamed from title

  /** Chart subtitle */
  @Prop() subtitle?: string;

  /** Chart data - simple format */
  @Prop() data?: BarData[];

  /** Labels for x-axis (when using datasets format) */
  @Prop() labels?: string[];

  /** Datasets (for multiple bar series) */
  @Prop() datasets?: BarChartDataset[];

  /** Chart orientation */
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical';

  /** Show values on bars */
  @Prop() showValues: boolean = true;

  /** Show legend */
  @Prop() showLegend: boolean = true;

  /** Show grid lines */
  @Prop() showGrid: boolean = true;

  /** Chart height in pixels */
  @Prop() height: number = 400;

  /** Chart width (auto if not specified) */
  @Prop() width?: number;

  /** Bar color (default) */
  @Prop() barColor: string = 'var(--primary-color)';

  /** Bar colors array (for multi-color bars) */
  @Prop() barColors?: string[] = ['var(--primary-color)', 'var(--secondary-color)'];

  /** Bar width percentage (1-100) */
  @Prop() barWidth: number = 60;

  /** Animate on load */
  @Prop() enableAnimation: boolean = true; // Renamed from animate

  /** Animation duration in ms */
  @Prop() animationDuration: number = 800;

  /** Enable stacked bars */
  @Prop() stacked: boolean = false;

  /** Y-axis label */
  @Prop() yAxisLabel?: string;

  /** X-axis label */
  @Prop() xAxisLabel?: string;

  /** Min value for Y-axis */
  @Prop() minValue?: number;

  /** Max value for Y-axis */
  @Prop() maxValue?: number;

  /** Number of Y-axis ticks */
  @Prop() yAxisTicks: number = 5;

  /** Show tooltip on hover */
  @Prop() showTooltip: boolean = true;

  /** Responsive */
  @Prop() responsive: boolean = true;

  /** Border radius for bars */
  @Prop() borderRadius: number = 4;

  @State() hoveredBar: { datasetIndex: number; barIndex: number } | null = null;
  @State() chartData: BarData[] = [];
  @State() processedDatasets: BarChartDataset[] = [];
  @State() chartLabels: string[] = [];
  @State() isAnimating: boolean = false;

  private animationStartTime: number = 0;
  private animationFrameId?: number;

  componentWillLoad() {
    this.processChartData();
  }

  @Watch('data')
  @Watch('datasets')
  @Watch('labels')
  dataChanged() {
    this.processChartData();
  }

  componentDidLoad() {
    if (this.enableAnimation) {
      this.startAnimation();
    }
  }

  private processChartData() {
    if (this.datasets && this.datasets.length > 0) {
      // Multiple datasets mode
      this.processedDatasets = this.datasets.map(ds => ({
        ...ds,
        backgroundColor: ds.backgroundColor || this.barColor,
      }));
      this.chartLabels = this.labels || [];
    } else if (this.data && this.data.length > 0) {
      // Simple data mode
      this.chartData = this.data;
      this.processedDatasets = [{
        label: this.chartTitle,
        data: this.data.map(d => d.value),
        backgroundColor: this.barColors || this.data.map(d => d.color || this.barColor),
      }];
      this.chartLabels = this.data.map(d => d.label);
    }
  }

  private startAnimation() {
    this.isAnimating = true;
    this.animationStartTime = Date.now();
    this.animateChart();
  }

  private animateChart = () => {
    const elapsed = Date.now() - this.animationStartTime;
    const progress = Math.min(elapsed / this.animationDuration, 1);

    if (progress < 1) {
      this.animationFrameId = requestAnimationFrame(this.animateChart);
    } else {
      this.isAnimating = false;
    }
  };

  private getAnimationProgress(): number {
    if (!this.isAnimating) return 1;
    const elapsed = Date.now() - this.animationStartTime;
    const progress = Math.min(elapsed / this.animationDuration, 1);
    // Ease out cubic
    return 1 - Math.pow(1 - progress, 3);
  }

  private calculateYAxisValues(): number[] {
    const allValues: number[] = [];
    
    if (this.processedDatasets.length > 0) {
      this.processedDatasets.forEach(dataset => {
        if (this.stacked) {
          // For stacked, we need to sum values at each index
          dataset.data.forEach((val, idx) => {
            if (!allValues[idx]) allValues[idx] = 0;
            allValues[idx] += val;
          });
        } else {
          allValues.push(...dataset.data);
        }
      });
    }

    const min = this.minValue !== undefined ? this.minValue : 0;
    const max = this.maxValue !== undefined ? this.maxValue : Math.max(...allValues, 0);
    
    const range = max - min;
    const step = range / (this.yAxisTicks - 1);
    
    return Array.from({ length: this.yAxisTicks }, (_, i) => min + step * i);
  }

  private getMaxValue(): number {
    const yAxisValues = this.calculateYAxisValues();
    return yAxisValues[yAxisValues.length - 1];
  }

  private getBarHeight(value: number): number {
    const maxValue = this.getMaxValue();
    const progress = this.getAnimationProgress();
    return ((value / maxValue) * 100) * progress;
  }

  private getBarColor(datasetIndex: number, barIndex: number): string {
    const dataset = this.processedDatasets[datasetIndex];
    if (!dataset) return this.barColor;

    if (Array.isArray(dataset.backgroundColor)) {
      return dataset.backgroundColor[barIndex] || this.barColor;
    }
    return dataset.backgroundColor || this.barColor;
  }

  private handleBarHover(datasetIndex: number, barIndex: number) {
    if (this.showTooltip) {
      this.hoveredBar = { datasetIndex, barIndex };
    }
  }

  private handleBarLeave() {
    this.hoveredBar = null;
  }

  private formatValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toFixed(0);
  }

  private renderVerticalChart() {
    const yAxisValues = this.calculateYAxisValues();
    const maxValue = this.getMaxValue();
    const barGroupWidth = 100 / this.chartLabels.length;
    const numDatasets = this.processedDatasets.length;
    const barWidthInGroup = this.stacked ? this.barWidth : (this.barWidth / numDatasets);

    return (
      <div class="chart-container" style={{ height: `${this.height}px`, width: this.width ? `${this.width}px` : 'auto' }}>
        {/* Y-Axis */}
        <div class="y-axis">
          {this.yAxisLabel && <div class="axis-label y-axis-label">{this.yAxisLabel}</div>}
          <div class="y-axis-ticks">
            {yAxisValues.reverse().map(value => (
              <div class="y-tick">
                <span class="y-tick-label">{this.formatValue(value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div class="chart-area">
          {/* Grid Lines */}
          {this.showGrid && (
            <div class="grid-lines">
              {yAxisValues.map(() => <div class="grid-line"></div>)}
            </div>
          )}

          {/* Bars */}
          <div class="bars-container">
            {this.chartLabels.map((label, labelIndex) => (
              <div class="bar-group" style={{ width: `${barGroupWidth}%` }}>
                <div class="bars-wrapper">
                  {this.stacked ? (
                    // Stacked bars
                    <div class="stacked-bar" style={{ width: `${barWidthInGroup}%` }}>
                      {this.processedDatasets.map((dataset, datasetIndex) => {
                        const value = dataset.data[labelIndex] || 0;
                        const height = (value / maxValue) * 100 * this.getAnimationProgress();
                        return (
                          <div
                            class="bar-segment"
                            style={{
                              height: `${height}%`,
                              backgroundColor: this.getBarColor(datasetIndex, labelIndex),
                              borderRadius: datasetIndex === this.processedDatasets.length - 1 
                                ? `${this.borderRadius}px ${this.borderRadius}px 0 0` 
                                : '0',
                            }}
                            onMouseEnter={() => this.handleBarHover(datasetIndex, labelIndex)}
                            onMouseLeave={() => this.handleBarLeave()}
                          >
                            {this.showValues && value > 0 && (
                              <span class="bar-value">{this.formatValue(value)}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Grouped bars
                    this.processedDatasets.map((dataset, datasetIndex) => {
                      const value = dataset.data[labelIndex] || 0;
                      const height = this.getBarHeight(value);
                      const isHovered = this.hoveredBar?.datasetIndex === datasetIndex && 
                                       this.hoveredBar?.barIndex === labelIndex;
                      
                      return (
                        <div
                          class={{ 'bar': true, 'bar-hovered': isHovered }}
                          style={{
                            height: `${height}%`,
                            width: `${barWidthInGroup}%`,
                            backgroundColor: this.getBarColor(datasetIndex, labelIndex),
                            borderRadius: `${this.borderRadius}px ${this.borderRadius}px 0 0`,
                          }}
                          onMouseEnter={() => this.handleBarHover(datasetIndex, labelIndex)}
                          onMouseLeave={() => this.handleBarLeave()}
                        >
                          {this.showValues && value > 0 && (
                            <span class="bar-value">{this.formatValue(value)}</span>
                          )}
                          {isHovered && this.showTooltip && (
                            <div class="tooltip">
                              {dataset.label && <div class="tooltip-label">{dataset.label}</div>}
                              <div class="tooltip-value">{label}: {value}</div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                <div class="x-tick-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* X-Axis Label */}
        {this.xAxisLabel && (
          <div class="axis-label x-axis-label">{this.xAxisLabel}</div>
        )}
      </div>
    );
  }

  private renderHorizontalChart() {
    const yAxisValues = this.calculateYAxisValues();

    return (
      <div class="chart-container horizontal" style={{ height: `${this.height}px`, width: this.width ? `${this.width}px` : 'auto' }}>
        {/* Y-Axis (Labels on left for horizontal) */}
        <div class="y-axis-horizontal">
          {this.chartLabels.map(label => (
            <div class="y-tick-horizontal">
              <span class="y-tick-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div class="chart-area-horizontal">
          {this.showGrid && (
            <div class="grid-lines-horizontal">
              {yAxisValues.map(() => <div class="grid-line-horizontal"></div>)}
            </div>
          )}

          {this.chartLabels.map((label, labelIndex) => (
            <div class="bar-row">
              {this.processedDatasets.map((dataset, datasetIndex) => {
                const value = dataset.data[labelIndex] || 0;
                const width = this.getBarHeight(value);
                const isHovered = this.hoveredBar?.datasetIndex === datasetIndex && 
                                 this.hoveredBar?.barIndex === labelIndex;
                
                return (
                  <div
                    class={{ 'bar-horizontal': true, 'bar-hovered': isHovered }}
                    style={{
                      width: `${width}%`,
                      backgroundColor: this.getBarColor(datasetIndex, labelIndex),
                      borderRadius: `0 ${this.borderRadius}px ${this.borderRadius}px 0`,
                    }}
                    onMouseEnter={() => this.handleBarHover(datasetIndex, labelIndex)}
                    onMouseLeave={() => this.handleBarLeave()}
                  >
                    {this.showValues && value > 0 && (
                      <span class="bar-value-horizontal">{this.formatValue(value)}</span>
                    )}
                    {isHovered && this.showTooltip && (
                      <div class="tooltip">
                        {dataset.label && <div class="tooltip-label">{dataset.label}</div>}
                        <div class="tooltip-value">{label}: {value}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* X-Axis */}
        <div class="x-axis-horizontal">
          {yAxisValues.map(value => (
            <div class="x-tick-horizontal">
              <span class="x-tick-label">{this.formatValue(value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="bar-chart-wrapper">
        {/* Title */}
        {(this.chartTitle || this.subtitle) && (
          <div class="chart-header">
            {this.chartTitle && <h3 class="chart-title">{this.chartTitle}</h3>}
            {this.subtitle && <p class="chart-subtitle">{this.subtitle}</p>}
          </div>
        )}

        {/* Legend */}
        {this.showLegend && this.processedDatasets.length > 1 && (
          <div class="chart-legend">
            {this.processedDatasets.map((dataset, index) => (
              <div class="legend-item">
                <span 
                  class="legend-color" 
                  style={{ backgroundColor: Array.isArray(dataset.backgroundColor) 
                    ? dataset.backgroundColor[0] 
                    : dataset.backgroundColor }}
                ></span>
                <span class="legend-label">{dataset.label || `Series ${index + 1}`}</span>
              </div>
            ))}
          </div>
        )}

        {/* Chart */}
        {this.orientation === 'vertical' ? this.renderVerticalChart() : this.renderHorizontalChart()}
      </div>
    );
  }

  disconnectedCallback() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
