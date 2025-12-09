# ui-range-slider



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                    | Type                     | Default     |
| ---------------------- | ------------------------ | ---------------------------------------------- | ------------------------ | ----------- |
| `color`                | `color`                  | Color of the slider                            | `string`                 | `'#3b82f6'` |
| `customSteps`          | `custom-steps`           | Custom step marks (non-linear scaling)         | `number[] \| string`     | `[]`        |
| `disabled`             | `disabled`               | Disabled state                                 | `boolean`                | `false`     |
| `displayFormat`        | `display-format`         | Display format function or string              | `string`                 | `''`        |
| `endIcon`              | `end-icon`               | End icon/text                                  | `string`                 | `''`        |
| `endValue`             | `end-value`              | Range mode - end value                         | `number`                 | `75`        |
| `marks`                | `marks`                  | Custom marks                                   | `SliderMark[] \| string` | `[]`        |
| `max`                  | `max`                    | Maximum value                                  | `number`                 | `100`       |
| `min`                  | `min`                    | Minimum value                                  | `number`                 | `0`         |
| `range`                | `range`                  | Enable range mode (two thumbs)                 | `boolean`                | `false`     |
| `restrictedValues`     | `restricted-values`      | Restricted values (only allow specific values) | `number[] \| string`     | `[]`        |
| `showMarks`            | `show-marks`             | Show marks                                     | `boolean`                | `false`     |
| `showTooltip`          | `show-tooltip`           | Show value tooltip                             | `boolean`                | `true`      |
| `showValue`            | `show-value`             | Show current value label                       | `boolean`                | `true`      |
| `size`                 | `size`                   | Size variant                                   | `"lg" \| "md" \| "sm"`   | `'md'`      |
| `startIcon`            | `start-icon`             | Start icon/text                                | `string`                 | `''`        |
| `startValue`           | `start-value`            | Range mode - start value                       | `number`                 | `25`        |
| `step`                 | `step`                   | Step increment                                 | `number`                 | `1`         |
| `tooltipAlwaysVisible` | `tooltip-always-visible` | Tooltip always visible                         | `boolean`                | `false`     |
| `trackColor`           | `track-color`            | Track color                                    | `string`                 | `'#e5e7eb'` |
| `value`                | `value`                  | Current value (single slider)                  | `number`                 | `50`        |
| `vertical`             | `vertical`               | Vertical orientation                           | `boolean`                | `false`     |


## Events

| Event             | Description                | Type                                                     |
| ----------------- | -------------------------- | -------------------------------------------------------- |
| `sliderChange`    | Emitted when value changes | `CustomEvent<number \| { start: number; end: number; }>` |
| `sliderDragEnd`   | Emitted on drag end        | `CustomEvent<void>`                                      |
| `sliderDragStart` | Emitted on drag start      | `CustomEvent<void>`                                      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
