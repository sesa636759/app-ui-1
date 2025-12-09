# ui-tag



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                 | Type                                                                                    | Default     |
| ------------------- | -------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------- |
| `animation`         | `animation`          | Animation type for opening/closing                          | `"fade" \| "none" \| "rotate" \| "scale" \| "slide"`                                    | `'scale'`   |
| `animationDuration` | `animation-duration` | Animation duration in milliseconds                          | `number`                                                                                | `300`       |
| `badge`             | `badge`              | Badge content to display                                    | `number \| string`                                                                      | `undefined` |
| `badgeColor`        | `badge-color`        | Badge color variant                                         | `"danger" \| "default" \| "info" \| "primary" \| "secondary" \| "success" \| "warning"` | `'default'` |
| `color`             | `color`              | Color variant                                               | `"danger" \| "default" \| "info" \| "primary" \| "secondary" \| "success" \| "warning"` | `'default'` |
| `counter`           | `counter`            | Counter value to display at the end of the tag              | `number \| string`                                                                      | `undefined` |
| `icon`              | `icon`               | Icon to display at the start                                | `string`                                                                                | `undefined` |
| `image`             | `image`              | Image source URL to display at the start                    | `string`                                                                                | `undefined` |
| `label`             | `label`              | Tag label text                                              | `string`                                                                                | `undefined` |
| `removable`         | `removable`          | Whether tag is removable                                    | `boolean`                                                                               | `false`     |
| `rounded`           | `rounded`            | Whether tag is rounded                                      | `boolean`                                                                               | `false`     |
| `size`              | `size`               | Size of the tag                                             | `"lg" \| "md" \| "sm"`                                                                  | `'md'`      |
| `userAvatar`        | `user-avatar`        | User avatar URL (displayed as circular avatar at the start) | `string`                                                                                | `undefined` |
| `variant`           | `variant`            | Tag variant                                                 | `"filled" \| "light" \| "outlined"`                                                     | `'filled'`  |


## Events

| Event       | Description                       | Type                |
| ----------- | --------------------------------- | ------------------- |
| `tagRemove` | Event emitted when tag is removed | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
