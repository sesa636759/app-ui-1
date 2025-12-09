# ui-transfer-list



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                        | Type                       | Default                     |
| ------------------- | -------------------- | ---------------------------------- | -------------------------- | --------------------------- |
| `disabled`          | `disabled`           | Disabled state                     | `boolean`                  | `false`                     |
| `emptyText`         | `empty-text`         | Custom empty text                  | `string`                   | `'No items'`                |
| `height`            | `height`             | Height of each list                | `string`                   | `'300px'`                   |
| `isDraggable`       | `is-draggable`       | Enable drag and drop               | `boolean`                  | `false`                     |
| `searchPlaceholder` | `search-placeholder` | Placeholder for search input       | `string`                   | `'Search items...'`         |
| `searchable`        | `searchable`         | Enable search functionality        | `boolean`                  | `true`                      |
| `showCount`         | `show-count`         | Show item count                    | `boolean`                  | `true`                      |
| `showDescriptions`  | `show-descriptions`  | Show descriptions                  | `boolean`                  | `true`                      |
| `showSelectAll`     | `show-select-all`    | Show select all checkbox           | `boolean`                  | `true`                      |
| `size`              | `size`               | Size variant                       | `"lg" \| "md" \| "sm"`     | `'md'`                      |
| `sourceItems`       | `source-items`       | Source items (left list)           | `TransferItem[] \| string` | `[]`                        |
| `targetItems`       | `target-items`       | Target items (right list)          | `TransferItem[] \| string` | `[]`                        |
| `titles`            | `titles`             | Titles for source and target lists | `string \| string[]`       | `['Available', 'Selected']` |


## Events

| Event              | Description                          | Type                                                               |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------ |
| `selectionChanged` | Event emitted when selection changes | `CustomEvent<{ sourceSelected: any[]; targetSelected: any[]; }>`   |
| `transferChange`   | Emitted when items are transferred   | `CustomEvent<{ source: TransferItem[]; target: TransferItem[]; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
