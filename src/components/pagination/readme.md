# ui-pagination



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                   | Type                                                                                                    | Default             |
| ----------------- | ------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------- |
| `compact`         | `compact`           | Whether to use compact mode (for dropdown and input types)                    | `boolean`                                                                                               | `false`             |
| `currentPage`     | `current-page`      | Current active page (1-based)                                                 | `number`                                                                                                | `1`                 |
| `disabled`        | `disabled`          | Whether pagination is disabled                                                | `boolean`                                                                                               | `false`             |
| `firstText`       | `first-text`        | Custom text for first button                                                  | `string`                                                                                                | `'First'`           |
| `hideNavButtons`  | `hide-nav-buttons`  | Hide navigation buttons (next, previous, first, last) in dropdown/input modes | `boolean`                                                                                               | `false`             |
| `iconOnly`        | `icon-only`         | Whether to show only icons (no text labels)                                   | `boolean`                                                                                               | `false`             |
| `infinite`        | `infinite`          | Whether to use infinite scroll style (shows loading state)                    | `boolean`                                                                                               | `false`             |
| `itemsPerPage`    | `items-per-page`    | Number of items per page                                                      | `number`                                                                                                | `10`                |
| `lastText`        | `last-text`         | Custom text for last button                                                   | `string`                                                                                                | `'Last'`            |
| `loading`         | `loading`           | Loading state for infinite scroll                                             | `boolean`                                                                                               | `false`             |
| `maxVisiblePages` | `max-visible-pages` | Maximum number of page buttons to show                                        | `number`                                                                                                | `5`                 |
| `nextText`        | `next-text`         | Custom text for next button                                                   | `string`                                                                                                | `'Next'`            |
| `pageSizes`       | --                  | Available page sizes for selector                                             | `number[]`                                                                                              | `[10, 25, 50, 100]` |
| `prevText`        | `prev-text`         | Custom text for previous button                                               | `string`                                                                                                | `'Previous'`        |
| `showFirstLast`   | `show-first-last`   | Whether to show first/last buttons                                            | `boolean`                                                                                               | `true`              |
| `showJumpTo`      | `show-jump-to`      | Whether to show jump to page input                                            | `boolean`                                                                                               | `false`             |
| `showPageSize`    | `show-page-size`    | Whether to show page size selector                                            | `boolean`                                                                                               | `false`             |
| `showPrevNext`    | `show-prev-next`    | Whether to show previous/next buttons                                         | `boolean`                                                                                               | `true`              |
| `showTotal`       | `show-total`        | Whether to show total count                                                   | `boolean`                                                                                               | `false`             |
| `size`            | `size`              | Size of the pagination component                                              | `"lg" \| "md" \| "sm"`                                                                                  | `'md'`              |
| `totalItems`      | `total-items`       | Total number of items                                                         | `number`                                                                                                | `0`                 |
| `type`            | `type`              | Type of pagination to display                                                 | `"advanced" \| "basic" \| "compact" \| "detailed" \| "dropdown" \| "indicator" \| "input" \| "minimal"` | `'basic'`           |
| `variant`         | `variant`           | Visual variant of the pagination                                              | `"default" \| "filled" \| "outlined"`                                                                   | `'default'`         |


## Events

| Event                | Description                          | Type                                                   |
| -------------------- | ------------------------------------ | ------------------------------------------------------ |
| `itemsPerPageChange` | Emitted when items per page changes  | `CustomEvent<number>`                                  |
| `pageChange`         | Emitted when page changes            | `CustomEvent<{ page: number; itemsPerPage: number; }>` |
| `validationError`    | Emitted when validation error occurs | `CustomEvent<string>`                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
