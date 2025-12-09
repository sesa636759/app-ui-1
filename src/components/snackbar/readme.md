# ui-snackbar



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                                                                                                                                                                                  | Type                                                                                              | Default        |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------- |
| `maxVisible` | `max-visible` | Maximum number of visible snackbars                                                                                                                                                                                                                                          | `number`                                                                                          | `5`            |
| `openMode`   | `open-mode`   | Open animation mode for snackbars - 'slide-down': Slide down from top (default) - 'slide-up': Slide up from bottom - 'slide-left': Slide in from left - 'slide-right': Slide in from right - 'fade': Fade in only - 'scale': Scale in with fade - 'bounce': Bounce in effect | `"bounce" \| "fade" \| "scale" \| "slide-down" \| "slide-left" \| "slide-right" \| "slide-up"`    | `'slide-down'` |
| `position`   | `position`    | Position of the snackbar container                                                                                                                                                                                                                                           | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "top-center" \| "top-left" \| "top-right"` | `'top-right'`  |
| `size`       | `size`        | Default size for snackbars - 'sm': Small (compact) - 'md': Medium (default) - 'lg': Large (spacious)                                                                                                                                                                         | `"lg" \| "md" \| "sm"`                                                                            | `'md'`         |
| `stackMode`  | `stack-mode`  | Stack mode for snackbars (only applies when maxVisible > 1) - 'stack': New snackbars appear on top, dismiss oldest first - 'queue': New snackbars appear on bottom, dismiss oldest first - 'lifo': New snackbars appear on top, dismiss newest first                         | `"lifo" \| "queue" \| "stack"`                                                                    | `'stack'`      |
| `variant`    | `variant`     | Default variant for snackbars - 'filled': Solid background (default) - 'outlined': Border only with transparent background - 'soft': Light background with colored text                                                                                                      | `"filled" \| "outlined" \| "soft"`                                                                | `'filled'`     |


## Events

| Event                 | Description                                   | Type                                                                                     |
| --------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `snackbarClosed`      | Event emitted when a snackbar is closed       | `CustomEvent<{ id: string; item: SnackbarItem; }>`                                       |
| `snackbarLinkClicked` | Event emitted when a snackbar link is clicked | `CustomEvent<{ id: string; item: SnackbarItem; link: { text: string; url: string; }; }>` |


## Methods

### `add(item: Omit<SnackbarItem, "id">) => Promise<string>`

Add a new snackbar

#### Parameters

| Name   | Type                                                                                                                                                 | Description |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `item` | `{ link?: { text: string; url: string; }; type: SnackbarType; size?: SnackbarSize; variant?: SnackbarVariant; message: string; duration?: number; }` |             |

#### Returns

Type: `Promise<string>`



### `close(id: string) => Promise<void>`

Close a specific snackbar

#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`



### `closeAll() => Promise<void>`

Close all snackbars

#### Returns

Type: `Promise<void>`



### `closeNext() => Promise<void>`

Close the next snackbar based on stack mode

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
