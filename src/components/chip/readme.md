# ui-chip



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                     | Type                                                                       | Default     |
| ------------------- | -------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | ----------- |
| `animation`         | `animation`          | Animation type for opening/closing              | `"bounce" \| "fade" \| "none" \| "scale" \| "slide"`                       | `'scale'`   |
| `animationDuration` | `animation-duration` | Animation duration in milliseconds              | `number`                                                                   | `300`       |
| `badge`             | `badge`              | Badge value to display near the label           | `number \| string`                                                         | `undefined` |
| `clickable`         | `clickable`          | Whether the chip is clickable                   | `boolean`                                                                  | `false`     |
| `color`             | `color`              | Color scheme                                    | `"danger" \| "info" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |
| `counter`           | `counter`            | Counter value to display at the end of the chip | `number \| string`                                                         | `undefined` |
| `disabled`          | `disabled`           | Whether the chip is disabled                    | `boolean`                                                                  | `false`     |
| `icon`              | `icon`               | Icon to display (can be emoji or text)          | `string`                                                                   | `undefined` |
| `image`             | `image`              | Image source URL for avatar style               | `string`                                                                   | `undefined` |
| `label`             | `label`              | Label text for the chip                         | `string`                                                                   | `undefined` |
| `removable`         | `removable`          | Whether the chip is removable                   | `boolean`                                                                  | `false`     |
| `size`              | `size`               | Size of the chip                                | `"lg" \| "md" \| "sm"`                                                     | `'md'`      |
| `userAvatar`        | `user-avatar`        | User avatar URL (displayed as circular avatar)  | `string`                                                                   | `undefined` |
| `variant`           | `variant`            | Variant style                                   | `"filled" \| "outlined" \| "text"`                                         | `'filled'`  |


## Events

| Event        | Description                        | Type                |
| ------------ | ---------------------------------- | ------------------- |
| `chipClick`  | Event emitted when chip is clicked | `CustomEvent<void>` |
| `chipRemove` | Event emitted when chip is removed | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
