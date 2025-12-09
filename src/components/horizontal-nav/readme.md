# ui-horizontal-nav



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                   | Type                                                 | Default     |
| ------------- | -------------- | --------------------------------------------- | ---------------------------------------------------- | ----------- |
| `activeId`    | `active-id`    | Active item ID                                | `string`                                             | `undefined` |
| `align`       | `align`        | Alignment of items                            | `"center" \| "end" \| "space-between" \| "start"`    | `'start'`   |
| `displayAs`   | `display-as`   | Display format: 'buttons' (default) or 'list' | `"buttons" \| "list"`                                | `'buttons'` |
| `fullWidth`   | `full-width`   | Full width items                              | `boolean`                                            | `false`     |
| `items`       | `items`        | Navigation items                              | `HorizontalNavItem[] \| string`                      | `[]`        |
| `scrollable`  | `scrollable`   | Enable scrolling for overflow items           | `boolean`                                            | `false`     |
| `showDivider` | `show-divider` | Show divider between items                    | `boolean`                                            | `false`     |
| `size`        | `size`         | Size of navigation items                      | `"lg" \| "md" \| "sm"`                               | `'md'`      |
| `variant`     | `variant`      | Variant style                                 | `"default" \| "pills" \| "segmented" \| "underline"` | `'default'` |


## Events

| Event          | Description                              | Type                             |
| -------------- | ---------------------------------------- | -------------------------------- |
| `navItemClick` | Event emitted when a nav item is clicked | `CustomEvent<HorizontalNavItem>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
