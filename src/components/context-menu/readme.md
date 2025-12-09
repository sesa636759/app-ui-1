# ui-context-menu



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                           | Type                          | Default         |
| ------------------ | -------------------- | --------------------------------------------------------------------- | ----------------------------- | --------------- |
| `closeOnSelect`    | `close-on-select`    | Close menu when selecting an item                                     | `boolean`                     | `true`          |
| `items`            | `items`              | Menu items, can be JSON string or array                               | `ContextMenuItem[] \| string` | `[]`            |
| `openOn`           | `open-on`            | Listen trigger on: contextmenu, click                                 | `"click" \| "contextmenu"`    | `'contextmenu'` |
| `reserveIconSpace` | `reserve-icon-space` | Reserve space for icons area even if item has no icon                 | `boolean`                     | `true`          |
| `submenuOpenDelay` | `submenu-open-delay` | Delay for submenu opening on hover (ms)                               | `number`                      | `120`           |
| `target`           | `target`             | Optional CSS selector for a target element to attach the context menu | `string`                      | `undefined`     |
| `targetOnly`       | `target-only`        | Attach to slotted target only; otherwise listen at document           | `boolean`                     | `false`         |
| `viewportPadding`  | `viewport-padding`   | Pixel padding from viewport edges                                     | `number`                      | `8`             |


## Events

| Event           | Description                        | Type                                                      |
| --------------- | ---------------------------------- | --------------------------------------------------------- |
| `itemSelect`    | Emits when an item is selected     | `CustomEvent<{ item: ContextMenuItem; path: number[]; }>` |
| `menuItemClick` | Alias event used by existing demos | `CustomEvent<{ item: ContextMenuItem; path: number[]; }>` |
| `menuToggle`    | Emits when menu toggles            | `CustomEvent<boolean>`                                    |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openAt(point: Point) => Promise<void>`



#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| `point` | `Point` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
