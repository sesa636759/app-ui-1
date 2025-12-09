# ui-dock



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                            | Type                                     | Default    |
| ------------ | ------------- | ------------------------------------------------------ | ---------------------------------------- | ---------- |
| `blurEffect` | `blur-effect` | Background blur effect                                 | `boolean`                                | `true`     |
| `items`      | `items`       | Array of dock items (as JSON string)                   | `string`                                 | `'[]'`     |
| `magnify`    | `magnify`     | Magnification effect on hover                          | `boolean`                                | `true`     |
| `position`   | `position`    | Position of the dock: 'bottom', 'top', 'left', 'right' | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'` |
| `showLabels` | `show-labels` | Show labels on hover                                   | `boolean`                                | `true`     |
| `size`       | `size`        | Size of the dock: 'sm', 'md', 'lg'                     | `"lg" \| "md" \| "sm"`                   | `'md'`     |


## Events

| Event           | Description | Type                              |
| --------------- | ----------- | --------------------------------- |
| `dockItemClick` |             | `CustomEvent<DockItemClickEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
