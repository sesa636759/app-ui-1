import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { Chart, ChartType, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  tag: 'app-chart',
  styleUrl: 'app-chart.css',
  shadow: true,
})
export class AppChart {
  @Element() el: HTMLElement;

  @Prop({ reflect: true }) chartType: ChartType = 'line';
  @Prop() data: ChartData;
  @Prop() options: ChartOptions = {};
  @Prop() colors: string[] = [];
  @Prop() showLegend: boolean = true;
  @Prop() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /**
   * Responsive behavior (Chart.js option passthrough)
   */
  @Prop() responsive: boolean = true;

  /**
   * Maintain aspect ratio (Chart.js option passthrough)
   */
  @Prop() maintainAspectRatio: boolean = false;

  /**
   * Aspect ratio when maintainAspectRatio is true
   */
  @Prop() aspectRatio?: number;

  /**
   * Begin axes at zero
   */
  @Prop() xBeginAtZero: boolean = false;
  @Prop() yBeginAtZero: boolean = true;

  /**
   * Stack bars/lines where applicable
   */
  @Prop() stacked: boolean = false;

  /**
   * Chart title text (uses Chart.js title plugin)
   */
  @Prop() chartTitle?: string;

  @State() chart: Chart;

  private canvas: HTMLCanvasElement;

  componentDidLoad() {
    this.initChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  disconnectedCallback() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  @Watch('chartType')
  @Watch('data')
  @Watch('options')
  @Watch('colors')
  @Watch('showLegend')
  @Watch('legendPosition')
  watchProps() {
    this.updateChart();
  }

  private initChart() {
    if (!this.canvas) {
      const container = this.el.shadowRoot.querySelector('.chart-container');
      if (!container) {
        console.error('Chart container not found');
        return;
      }
      this.canvas = document.createElement('canvas');
      container.appendChild(this.canvas);
    }

    if (!this.data || !this.data.datasets) {
      console.warn('No chart data provided');
      return;
    }

    const ctx = this.canvas.getContext('2d');
    const chartData = this.prepareData();
    const chartOptions = this.prepareOptions();

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: chartData,
      options: chartOptions,
    });
  }

  private updateChart() {
    if (!this.chart) {
      // Chart not initialized yet, initialize it
      this.initChart();
      return;
    }

    if (!this.data || !this.data.datasets) {
      console.warn('No chart data to update');
      return;
    }

    const chartData = this.prepareData();
    const chartOptions = this.prepareOptions();

    // Check if chart type changed - need to destroy and recreate
    if ((this.chart as any).config?.type !== this.chartType) {
      this.chart.destroy();
      this.initChart();
      return;
    }

    this.chart.data = chartData;
    this.chart.options = chartOptions;
    this.chart.update('none'); // Update without animation for smoother UX
  }

  private prepareData(): ChartData {
    if (!this.data) return { datasets: [] };

    const data = { ...this.data };

    if (this.colors.length > 0) {
      data.datasets = data.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: this.colors[index % this.colors.length],
        borderColor: this.colors[index % this.colors.length],
      }));
    }

    return data;
  }

  private prepareOptions(): ChartOptions {
    const options: ChartOptions = {
      responsive: this.responsive,
      maintainAspectRatio: this.maintainAspectRatio,
      ...(this.aspectRatio != null ? { aspectRatio: this.aspectRatio } : {}),
      plugins: {
        legend: {
          display: this.showLegend,
          position: this.legendPosition,
        },
        tooltip: {
          enabled: true,
        },
        title: this.chartTitle ? { display: true, text: this.chartTitle } : { display: false },
      },
      ...this.options,
    };

    // Add chart-specific options
    switch (this.chartType) {
      case 'line':
      case 'bar':
        options.scales = {
          x: {
            stacked: this.stacked,
            ...(this.xBeginAtZero ? { beginAtZero: true } : {}),
          },
          y: {
            stacked: this.stacked,
            ...(this.yBeginAtZero ? { beginAtZero: true } : {}),
          },
        };
        break;
      case 'pie':
      case 'doughnut':
        // No specific scales needed
        break;
      case 'radar':
        options.scales = {
          r: {
            ...(this.yBeginAtZero ? { beginAtZero: true } : {}),
          },
        };
        break;
      case 'polarArea':
        // Polar area specific options
        break;
      case 'bubble':
      case 'scatter':
        options.scales = {
          x: {
            type: 'linear',
            position: 'bottom',
            ...(this.xBeginAtZero ? { beginAtZero: true } : {}),
          },
          y: {
            type: 'linear',
            ...(this.yBeginAtZero ? { beginAtZero: true } : {}),
          },
        };
        break;
    }

    return options;
  }

  render() {
    return <div class="chart-container"></div>;
  }
}
