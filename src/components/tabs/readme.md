# ui-tabs



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                                         | Type                                            | Default        |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------- |
| `animationDuration`  | `animation-duration`  | Animation duration in milliseconds                                                                                                  | `number`                                        | `300`          |
| `defaultActive`      | `default-active`      | ID of the tab that should be active by default                                                                                      | `string`                                        | `''`           |
| `iconOnly`           | `icon-only`           | Show only icons (hide titles)                                                                                                       | `boolean`                                       | `false`        |
| `iconPosition`       | `icon-position`       | Icon position: 'start', 'end', 'top', 'bottom'                                                                                      | `"bottom" \| "end" \| "start" \| "top"`         | `'start'`      |
| `items`              | `items`               | Array of tab items (as JSON string)                                                                                                 | `string`                                        | `'[]'`         |
| `maxTabWidth`        | `max-tab-width`       | Maximum width for tab titles (in pixels)                                                                                            | `number`                                        | `200`          |
| `maxTitleLength`     | `max-title-length`    | Maximum visible length for tab titles (characters). If exceeded, title is ellipsized via CSS and full text is available in tooltip. | `number`                                        | `24`           |
| `orientation`        | `orientation`         | Orientation of tabs: 'horizontal' or 'vertical'                                                                                     | `"horizontal" \| "vertical"`                    | `'horizontal'` |
| `position`           | `position`            | Position of tabs header: 'left', 'center', 'right', 'full-width'                                                                    | `"center" \| "full-width" \| "left" \| "right"` | `'left'`       |
| `scrollMode`         | `scroll-mode`         | Scroll mode: 'auto' (auto-scroll to active), 'manual' (user controls), 'none' (no scroll)                                           | `"auto" \| "manual" \| "none"`                  | `'manual'`     |
| `selectionAnimation` | `selection-animation` | Animation on tab selection                                                                                                          | `"fade" \| "none" \| "scale" \| "slide"`        | `'slide'`      |
| `showCloseAll`       | `show-close-all`      | Show close all button                                                                                                               | `boolean`                                       | `false`        |
| `wrapText`           | `wrap-text`           | Enable text wrapping in tabs                                                                                                        | `boolean`                                       | `false`        |


## Events

| Event          | Description | Type                          |
| -------------- | ----------- | ----------------------------- |
| `closeAll`     |             | `CustomEvent<void>`           |
| `tabChange`    |             | `CustomEvent<TabChangeEvent>` |
| `tabClose`     |             | `CustomEvent<string>`         |
| `tabDelete`    |             | `CustomEvent<string>`         |
| `tabEdit`      |             | `CustomEvent<string>`         |
| `tabOpenPanel` |             | `CustomEvent<string>`         |


## Methods

### `destroyComponent() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getActiveTab() => Promise<string>`



#### Returns

Type: `Promise<string>`



### `selectTabById(tabId: string) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `tabId` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
