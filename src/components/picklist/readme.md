# ui-picklist



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                         | Type                                       | Default                 |
| ------------------- | -------------------- | --------------------------------------------------- | ------------------------------------------ | ----------------------- |
| `clearable`         | `clearable`          | Whether to allow clearing the selection             | `boolean`                                  | `false`                 |
| `customTrigger`     | `custom-trigger`     | Custom trigger content (slot)                       | `boolean`                                  | `false`                 |
| `disabled`          | `disabled`           | Whether the picklist is disabled                    | `boolean`                                  | `false`                 |
| `loading`           | `loading`            | Whether the picklist is in loading state            | `boolean`                                  | `false`                 |
| `maxOptions`        | `max-options`        | Maximum number of options to show (for performance) | `number`                                   | `100`                   |
| `mode`              | `mode`               | Selection mode: single or multi                     | `"multi" \| "single"`                      | `'single'`              |
| `options`           | `options`            | Array of options to display                         | `PicklistOption[] \| string`               | `[]`                    |
| `placeholder`       | `placeholder`        | Placeholder text                                    | `string`                                   | `'Select an option...'` |
| `searchPlaceholder` | `search-placeholder` | Search placeholder text                             | `string`                                   | `'Search...'`           |
| `searchable`        | `searchable`         | Whether to show search input                        | `boolean`                                  | `false`                 |
| `size`              | `size`               | Size variant                                        | `"lg" \| "md" \| "sm"`                     | `'md'`                  |
| `value`             | `value`              | Selected value(s)                                   | `(string \| number)[] \| number \| string` | `null`                  |
| `variant`           | `variant`            | Visual variant                                      | `"bordered" \| "default" \| "ghost"`       | `'default'`             |


## Events

| Event            | Description                          | Type                               |
| ---------------- | ------------------------------------ | ---------------------------------- |
| `picklistChange` | Event emitted when selection changes | `CustomEvent<PicklistChangeEvent>` |
| `picklistClose`  | Event emitted when dropdown closes   | `CustomEvent<void>`                |
| `picklistOpen`   | Event emitted when dropdown opens    | `CustomEvent<void>`                |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `focusTrigger() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
