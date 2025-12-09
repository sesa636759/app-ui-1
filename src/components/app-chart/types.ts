import { ChartType, ChartData, ChartOptions } from 'chart.js/auto';

export interface ChartProps {
  chartType: ChartType;
  data: ChartData;
  options?: ChartOptions;
  colors?: string[];
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface ChartEvent {
  type: string;
  data: any;
}

export type SupportedChartTypes =
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'polarArea'
  | 'bubble'
  | 'scatter'
  | 'area'
  | 'mixed';

export interface AdvancedChartOptions extends ChartOptions {
  plugins?: {
    [key: string]: any;
  };
}
