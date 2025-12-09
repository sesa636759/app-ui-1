# ui-bar-chart



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                    | Type                         | Default                                              |
| ------------------- | -------------------- | ---------------------------------------------- | ---------------------------- | ---------------------------------------------------- |
| `animationDuration` | `animation-duration` | Animation duration in ms                       | `number`                     | `800`                                                |
| `barColor`          | `bar-color`          | Bar color (default)                            | `string`                     | `'var(--primary-color)'`                             |
| `barColors`         | --                   | Bar colors array (for multi-color bars)        | `string[]`                   | `['var(--primary-color)', 'var(--secondary-color)']` |
| `barWidth`          | `bar-width`          | Bar width percentage (1-100)                   | `number`                     | `60`                                                 |
| `borderRadius`      | `border-radius`      | Border radius for bars                         | `number`                     | `4`                                                  |
| `chartTitle`        | `chart-title`        | Chart title                                    | `string`                     | `undefined`                                          |
| `data`              | --                   | Chart data - simple format                     | `BarData[]`                  | `undefined`                                          |
| `datasets`          | --                   | Datasets (for multiple bar series)             | `BarChartDataset[]`          | `undefined`                                          |
| `enableAnimation`   | `enable-animation`   | Animate on load                                | `boolean`                    | `true`                                               |
| `height`            | `height`             | Chart height in pixels                         | `number`                     | `400`                                                |
| `labels`            | --                   | Labels for x-axis (when using datasets format) | `string[]`                   | `undefined`                                          |
| `maxValue`          | `max-value`          | Max value for Y-axis                           | `number`                     | `undefined`                                          |
| `minValue`          | `min-value`          | Min value for Y-axis                           | `number`                     | `undefined`                                          |
| `orientation`       | `orientation`        | Chart orientation                              | `"horizontal" \| "vertical"` | `'vertical'`                                         |
| `responsive`        | `responsive`         | Responsive                                     | `boolean`                    | `true`                                               |
| `showGrid`          | `show-grid`          | Show grid lines                                | `boolean`                    | `true`                                               |
| `showLegend`        | `show-legend`        | Show legend                                    | `boolean`                    | `true`                                               |
| `showTooltip`       | `show-tooltip`       | Show tooltip on hover                          | `boolean`                    | `true`                                               |
| `showValues`        | `show-values`        | Show values on bars                            | `boolean`                    | `true`                                               |
| `stacked`           | `stacked`            | Enable stacked bars                            | `boolean`                    | `false`                                              |
| `subtitle`          | `subtitle`           | Chart subtitle                                 | `string`                     | `undefined`                                          |
| `width`             | `width`              | Chart width (auto if not specified)            | `number`                     | `undefined`                                          |
| `xAxisLabel`        | `x-axis-label`       | X-axis label                                   | `string`                     | `undefined`                                          |
| `yAxisLabel`        | `y-axis-label`       | Y-axis label                                   | `string`                     | `undefined`                                          |
| `yAxisTicks`        | `y-axis-ticks`       | Number of Y-axis ticks                         | `number`                     | `5`                                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
