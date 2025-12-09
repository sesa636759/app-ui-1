# aside-panel



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                                | Type                                     | Default   |
| --------------------- | ------------------------ | -------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| `closeOnEscape`       | `close-on-escape`        | Whether the panel can be closed by pressing Escape key                     | `boolean`                                | `true`    |
| `closeOnOverlayClick` | `close-on-overlay-click` | Whether clicking the overlay closes the panel                              | `boolean`                                | `true`    |
| `closeable`           | `closeable`              | Whether to show the close button                                           | `boolean`                                | `true`    |
| `direction`           | `direction`              | Direction from which the panel slides in: 'left', 'right', 'top', 'bottom' | `"bottom" \| "left" \| "right" \| "top"` | `'right'` |
| `maxSize`             | `max-size`               | Maximum size (width or height) in pixels                                   | `number`                                 | `800`     |
| `minSize`             | `min-size`               | Minimum size (width or height) in pixels                                   | `number`                                 | `200`     |
| `open`                | `open`                   | Whether the aside panel is open                                            | `boolean`                                | `false`   |
| `resizable`           | `resizable`              | Whether the panel is resizable                                             | `boolean`                                | `false`   |
| `size`                | `size`                   | Width of the panel (for left/right) or height (for top/bottom)             | `string`                                 | `'320px'` |


## Events

| Event          | Description                             | Type                             |
| -------------- | --------------------------------------- | -------------------------------- |
| `asideClosed`  | Event emitted when the panel is closed  | `CustomEvent<void>`              |
| `asideOpened`  | Event emitted when the panel is opened  | `CustomEvent<void>`              |
| `asideResized` | Event emitted when the panel is resized | `CustomEvent<{ size: number; }>` |


## Methods

### `hide() => Promise<void>`

Close the panel

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Open the panel

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle the panel open/closed

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
