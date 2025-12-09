# ui-anchor



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                 | Type                         | Default      |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `activeLink`      | `active-link`      | Active link ID                                                                              | `string`                     | `''`         |
| `links`           | `links`            | Anchor links array (as JSON string)                                                         | `string`                     | `'[]'`       |
| `orientation`     | `orientation`      | Orientation: 'vertical' or 'horizontal'                                                     | `"horizontal" \| "vertical"` | `'vertical'` |
| `scrollContainer` | `scroll-container` | The container element for the scrollable content. If not provided, the window will be used. | `string`                     | `undefined`  |
| `scrollOffset`    | `scroll-offset`    | Offset from top when scrolling (in pixels)                                                  | `number`                     | `80`         |
| `showIndicator`   | `show-indicator`   | Show active indicator line                                                                  | `boolean`                    | `true`       |


## Events

| Event         | Description                               | Type                                                 |
| ------------- | ----------------------------------------- | ---------------------------------------------------- |
| `anchorClick` | Event emitted when anchor link is clicked | `CustomEvent<{ linkId: string; targetId: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
