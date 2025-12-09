# ui-knob



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                        | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------ | --------- | ----------- |
| `color`       | `color`        | Color of the active arc                                            | `string`  | `'#3b82f6'` |
| `disabled`    | `disabled`     | Disabled state                                                     | `boolean` | `false`     |
| `enableWheel` | `enable-wheel` | Enable mouse wheel rotation control                                | `boolean` | `true`      |
| `endAngle`    | `end-angle`    | End angle in degrees                                               | `number`  | `405`       |
| `max`         | `max`          | Maximum value                                                      | `number`  | `100`       |
| `min`         | `min`          | Minimum value                                                      | `number`  | `0`         |
| `readonly`    | `readonly`     | Read-only state                                                    | `boolean` | `false`     |
| `showMinMax`  | `show-min-max` | Show min/max labels                                                | `boolean` | `false`     |
| `showTicks`   | `show-ticks`   | Show tick marks along the arc (useful for speedometer-like gauges) | `boolean` | `false`     |
| `showValue`   | `show-value`   | Show value label                                                   | `boolean` | `true`      |
| `size`        | `size`         | Size of the knob                                                   | `number`  | `120`       |
| `startAngle`  | `start-angle`  | Start angle in degrees (0 = top, 90 = right)                       | `number`  | `135`       |
| `step`        | `step`         | Step increment                                                     | `number`  | `1`         |
| `strokeWidth` | `stroke-width` | Stroke width                                                       | `number`  | `8`         |
| `tickColor`   | `tick-color`   | Tick color                                                         | `string`  | `'#94a3b8'` |
| `tickCount`   | `tick-count`   | Number of tick marks to render along the arc                       | `number`  | `10`        |
| `tickLength`  | `tick-length`  | Tick length factor relative to radius (0-1)                        | `number`  | `0.1`       |
| `trackColor`  | `track-color`  | Color of the track                                                 | `string`  | `'#e2e8f0'` |
| `value`       | `value`        | Current value                                                      | `number`  | `0`         |
| `valueSuffix` | `value-suffix` | Custom value suffix (e.g., '%', '°', 'dB')                         | `string`  | `''`        |


## Events

| Event        | Description                      | Type                  |
| ------------ | -------------------------------- | --------------------- |
| `knobChange` | Event emitted when value changes | `CustomEvent<number>` |
| `knobInput`  | Event emitted while dragging     | `CustomEvent<number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
