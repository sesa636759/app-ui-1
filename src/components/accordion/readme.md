# ui-accordion



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                  | Type                                                                       | Default  |
| -------------------- | ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- | -------- |
| `animationDuration`  | `animation-duration`   | Animation duration in milliseconds                           | `number`                                                                   | `300`    |
| `animationTiming`    | `animation-timing`     | Animation timing function                                    | `"ease" \| "ease-in" \| "ease-in-out" \| "ease-out" \| "linear" \| "none"` | `'ease'` |
| `arrowIconCollapsed` | `arrow-icon-collapsed` | Custom arrow icon for collapsed state                        | `string`                                                                   | `'▶'`    |
| `arrowIconExpanded`  | `arrow-icon-expanded`  | Custom arrow icon for expanded state                         | `string`                                                                   | `'▼'`    |
| `defaultOpen`        | `default-open`         | IDs of items that should be open by default (as JSON string) | `string`                                                                   | `'[]'`   |
| `disabled`           | `disabled`             | Disable the entire accordion                                 | `boolean`                                                                  | `false`  |
| `hideArrow`          | `hide-arrow`           | Hide arrow icon completely                                   | `boolean`                                                                  | `false`  |
| `items`              | `items`                | Array of accordion items (as JSON string)                    | `string`                                                                   | `'[]'`   |
| `multiple`           | `multiple`             | Allow multiple items to be open at once                      | `boolean`                                                                  | `false`  |
| `showNumbers`        | `show-numbers`         | Show numbered indicators above the accordion                 | `boolean`                                                                  | `false`  |


## Events

| Event             | Description | Type                                |
| ----------------- | ----------- | ----------------------------------- |
| `accordionChange` |             | `CustomEvent<AccordionChangeEvent>` |


## Methods

### `closeAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `closeItem(itemId: string) => Promise<void>`



#### Parameters

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| `itemId` | `string` |             |

#### Returns

Type: `Promise<void>`



### `openAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openItem(itemId: string) => Promise<void>`



#### Parameters

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| `itemId` | `string` |             |

#### Returns

Type: `Promise<void>`



### `toggleItemById(itemId: string) => Promise<void>`



#### Parameters

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| `itemId` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
