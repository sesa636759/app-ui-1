# ui-card



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                     | Type                                                | Default               |
| -------------- | --------------- | --------------------------------------------------------------- | --------------------------------------------------- | --------------------- |
| `border`       | `border`        | Border of the card                                              | `string`                                            | `'1px solid #e5e7eb'` |
| `borderRadius` | `border-radius` | Border radius of the card                                       | `string`                                            | `'8px'`               |
| `cardId`       | `card-id`       | Unique identifier for the card                                  | `string`                                            | `''`                  |
| `expandable`   | `expandable`    | Enable card expansion                                           | `boolean`                                           | `false`               |
| `flippable`    | `flippable`     | Enable flip animation                                           | `boolean`                                           | `false`               |
| `height`       | `height`        | Height of the card                                              | `string`                                            | `'auto'`              |
| `hoverable`    | `hoverable`     | Enable hover effect                                             | `boolean`                                           | `false`               |
| `menuItems`    | `menu-items`    | Menu items (as JSON string)                                     | `string`                                            | `'[]'`                |
| `showMenu`     | `show-menu`     | Show menu button                                                | `boolean`                                           | `false`               |
| `variant`      | `variant`       | Card variant: 'default' \| 'elevated' \| 'outlined' \| 'filled' | `"default" \| "elevated" \| "filled" \| "outlined"` | `'default'`           |
| `width`        | `width`         | Width of the card                                               | `string`                                            | `'100%'`              |


## Events

| Event           | Description | Type                                  |
| --------------- | ----------- | ------------------------------------- |
| `cardFlip`      |             | `CustomEvent<CardFlipEvent>`          |
| `expandToggle`  |             | `CustomEvent<{ expanded: boolean; }>` |
| `menuItemClick` |             | `CustomEvent<CardMenuEvent>`          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
