# ui-rating



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                      | Type                                              | Default     |
| ----------- | ------------ | ------------------------------------------------ | ------------------------------------------------- | ----------- |
| `allowHalf` | `allow-half` | Allow half ratings (only for star type)          | `boolean`                                         | `false`     |
| `color`     | `color`      | Color of active rating                           | `"danger" \| "primary" \| "success" \| "warning"` | `'warning'` |
| `disabled`  | `disabled`   | Disabled state                                   | `boolean`                                         | `false`     |
| `labels`    | `labels`     | Custom labels for ratings                        | `string`                                          | `undefined` |
| `max`       | `max`        | Maximum rating value (for star and smiley types) | `number`                                          | `5`         |
| `readonly`  | `readonly`   | Read-only mode                                   | `boolean`                                         | `false`     |
| `showValue` | `show-value` | Show rating value text                           | `boolean`                                         | `false`     |
| `size`      | `size`       | Size of the rating icons                         | `"lg" \| "md" \| "sm"`                            | `'md'`      |
| `type`      | `type`       | Type of rating                                   | `"smiley" \| "star" \| "thumb"`                   | `'star'`    |
| `value`     | `value`      | Current rating value                             | `number`                                          | `0`         |


## Events

| Event          | Description                 | Type                  |
| -------------- | --------------------------- | --------------------- |
| `ratingChange` | Emitted when rating changes | `CustomEvent<number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
