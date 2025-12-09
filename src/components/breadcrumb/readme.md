# ui-breadcrumb



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                          | Type                         | Default     |
| --------------- | ---------------- | ---------------------------------------------------- | ---------------------------- | ----------- |
| `homeIcon`      | `home-icon`      | Home icon                                            | `string`                     | `'🏠'`      |
| `items`         | `items`          | Array of breadcrumb items                            | `BreadcrumbItem[] \| string` | `[]`        |
| `maxItems`      | `max-items`      | Maximum number of items to display before collapsing | `number`                     | `0`         |
| `separator`     | `separator`      | Separator between breadcrumb items                   | `string`                     | `'/'`       |
| `separatorIcon` | `separator-icon` | Custom separator icon (overrides separator text)     | `string`                     | `undefined` |
| `showHome`      | `show-home`      | Show home icon as first item                         | `boolean`                    | `false`     |
| `size`          | `size`           | Size of breadcrumb items                             | `"lg" \| "md" \| "sm"`       | `'md'`      |


## Events

| Event             | Description                                     | Type                          |
| ----------------- | ----------------------------------------------- | ----------------------------- |
| `breadcrumbClick` | Event emitted when a breadcrumb item is clicked | `CustomEvent<BreadcrumbItem>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
