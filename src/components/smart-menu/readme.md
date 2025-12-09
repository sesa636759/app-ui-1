# ui-smart-menu



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type         | Default     |
| -------- | --------- | ----------- | ------------ | ----------- |
| `items`  | --        |             | `MenuItem[]` | `[]`        |
| `target` | `target`  |             | `string`     | `undefined` |


## Events

| Event           | Description                               | Type                                              |
| --------------- | ----------------------------------------- | ------------------------------------------------- |
| `menuItemClick` | Event emitted when a menu item is clicked | `CustomEvent<{ label: string; item: MenuItem; }>` |


## Methods

### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show(x: number, y: number) => Promise<void>`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `x`  | `number` |             |
| `y`  | `number` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
