# ui-dropdown



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                      | Type                     | Default              |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------- |
| `appearance`  | `appearance`   | Appearance: default dropdown or button-like (no arrow)                                                                                           | `"button" \| "dropdown"` | `'dropdown'`         |
| `cascading`   | `cascading`    | Enable cascading/hierarchical selection                                                                                                          | `boolean`                | `false`              |
| `clearable`   | `clearable`    | Show clear button                                                                                                                                | `boolean`                | `true`               |
| `disabled`    | `disabled`     | Disabled state                                                                                                                                   | `boolean`                | `false`              |
| `maxHeight`   | `max-height`   | Maximum height of dropdown (in pixels)                                                                                                           | `number`                 | `300`                |
| `multiSelect` | `multi-select` | Enable multi-select mode                                                                                                                         | `boolean`                | `false`              |
| `options`     | `options`      | Options as JSON string                                                                                                                           | `string`                 | `'[]'`               |
| `placeholder` | `placeholder`  | Placeholder text                                                                                                                                 | `string`                 | `'Select an option'` |
| `searchable`  | `searchable`   | Show search/filter input                                                                                                                         | `boolean`                | `false`              |
| `showArrow`   | `show-arrow`   | Controls visibility of the arrow icon. If false, no arrow is shown. Defaults to true for dropdown appearance; false when appearance is 'button'. | `boolean`                | `undefined`          |
| `size`        | `size`         | Size variant                                                                                                                                     | `"lg" \| "md" \| "sm"`   | `'md'`               |
| `value`       | `value`        | Selected value(s) - string for single, comma-separated for multi                                                                                 | `string`                 | `''`                 |


## Events

| Event           | Description                  | Type                                                                 |
| --------------- | ---------------------------- | -------------------------------------------------------------------- |
| `dropdownClose` | Emitted when dropdown closes | `CustomEvent<void>`                                                  |
| `dropdownOpen`  | Emitted when dropdown opens  | `CustomEvent<void>`                                                  |
| `valueChange`   | Emitted when value changes   | `CustomEvent<{ value: string; selectedOptions: DropdownOption[]; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
