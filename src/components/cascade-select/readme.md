# ui-cascade-select



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                         | Type                        | Default    |
| ---------------- | ------------------ | --------------------------------------------------- | --------------------------- | ---------- |
| `changeOnSelect` | `change-on-select` | Change on select (select parent or only leaf nodes) | `boolean`                   | `false`    |
| `clearable`      | `clearable`        | Allow clearing selection                            | `boolean`                   | `true`     |
| `disabled`       | `disabled`         | Disabled state                                      | `boolean`                   | `false`    |
| `expandTrigger`  | `expand-trigger`   | Expandable trigger mode                             | `"click" \| "hover"`        | `'hover'`  |
| `options`        | `options`          | Options for cascade selection                       | `CascadeOption[] \| string` | `[]`       |
| `placeholder`    | `placeholder`      | Placeholder text                                    | `string`                    | `'Select'` |
| `separator`      | `separator`        | Path separator                                      | `string`                    | `' / '`    |
| `showFullPath`   | `show-full-path`   | Show full path in input                             | `boolean`                   | `true`     |
| `size`           | `size`             | Size variant                                        | `"lg" \| "md" \| "sm"`      | `'md'`     |
| `value`          | `value`            | Selected values (array of values from each level)   | `any[] \| string`           | `[]`       |


## Events

| Event           | Description                     | Type                   |
| --------------- | ------------------------------- | ---------------------- |
| `cascadeChange` | Emitted when selection changes  | `CustomEvent<any[]>`   |
| `cascadeToggle` | Emitted when panel opens/closes | `CustomEvent<boolean>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
