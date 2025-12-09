# ui-speed-dial



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                       | Type                                                                       | Default          |
| ----------------- | ------------------ | --------------------------------- | -------------------------------------------------------------------------- | ---------------- |
| `actions`         | `actions`          | Speed dial actions                | `SpeedDialAction[] \| string`                                              | `[]`             |
| `color`           | `color`            | Color scheme                      | `"danger" \| "info" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'`      |
| `direction`       | `direction`        | Direction of dial opening         | `"auto" \| "down" \| "left" \| "right" \| "up"`                            | `'auto'`         |
| `icon`            | `icon`             | Icon for the main button          | `string`                                                                   | `'+'`            |
| `position`        | `position`         | Position of the speed dial button | `"bottom-left" \| "bottom-right" \| "center" \| "top-left" \| "top-right"` | `'bottom-right'` |
| `showTooltips`    | `show-tooltips`    | Show tooltips                     | `boolean`                                                                  | `true`           |
| `size`            | `size`             | Size of the button                | `"lg" \| "md" \| "sm"`                                                     | `'md'`           |
| `tooltipPosition` | `tooltip-position` | Tooltip position                  | `"auto" \| "bottom" \| "left" \| "right" \| "top"`                         | `'auto'`         |


## Events

| Event             | Description                          | Type                   |
| ----------------- | ------------------------------------ | ---------------------- |
| `actionClick`     | Emitted when an action is clicked    | `CustomEvent<string>`  |
| `speedDialToggle` | Emitted when speed dial opens/closes | `CustomEvent<boolean>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
