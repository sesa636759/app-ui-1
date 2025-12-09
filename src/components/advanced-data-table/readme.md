# ui-advanced-data-table



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                  | Description                                    | Type                                                 | Default                                                                                               |
| ----------------------- | -------------------------- | ---------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `bordered`              | `bordered`                 | Enable borders                                 | `boolean`                                            | `true`                                                                                                |
| `columnGrouping`        | `column-grouping`          | Enable column grouping (multi-level headers)   | `boolean`                                            | `false`                                                                                               |
| `columnPinning`         | `column-pinning`           | Enable column pinning                          | `boolean`                                            | `true`                                                                                                |
| `columnReorder`         | `column-reorder`           | Enable column reordering                       | `boolean`                                            | `true`                                                                                                |
| `columnVisibility`      | `column-visibility`        | Enable column visibility toggle                | `boolean`                                            | `true`                                                                                                |
| `columns`               | `columns`                  | Columns definition                             | `TableColumn[] \| string`                            | `[]`                                                                                                  |
| `config`                | `config`                   | Table configuration                            | `TableConfig \| string`                              | `{     columns: [],     data: [],     selectable: false,     pagination: true,     pageSize: 10,   }` |
| `customActions`         | --                         | Custom actions to show in the row actions menu | `{ label: string; value: string; icon?: string; }[]` | `undefined`                                                                                           |
| `data`                  | `data`                     | Table data                                     | `TableRow[] \| string`                               | `[]`                                                                                                  |
| `editable`              | `editable`                 | Enable inline editing                          | `boolean`                                            | `false`                                                                                               |
| `emptyMessage`          | `empty-message`            | Empty message                                  | `string`                                             | `'No data available'`                                                                                 |
| `expandGroupsByDefault` | `expand-groups-by-default` | Expand groups by default                       | `boolean`                                            | `true`                                                                                                |
| `exportable`            | `exportable`               | Enable export                                  | `boolean`                                            | `true`                                                                                                |
| `filterable`            | `filterable`               | Enable filtering                               | `boolean`                                            | `true`                                                                                                |
| `groupBy`               | `group-by`                 | Field to group by (for row grouping)           | `string`                                             | `''`                                                                                                  |
| `grouping`              | `grouping`                 | Enable data grouping                           | `boolean`                                            | `false`                                                                                               |
| `hoverable`             | `hoverable`                | Enable hover effect                            | `boolean`                                            | `true`                                                                                                |
| `loading`               | `loading`                  | Loading state                                  | `boolean`                                            | `false`                                                                                               |
| `multiFilter`           | `multi-filter`             | Enable multi-column filtering                  | `boolean`                                            | `true`                                                                                                |
| `multiSelect`           | `multi-select`             | Enable multiple row selection                  | `boolean`                                            | `true`                                                                                                |
| `pageSize`              | `page-size`                | Page size                                      | `number`                                             | `10`                                                                                                  |
| `pageSizeOptions`       | `page-size-options`        | Page size options                              | `number[] \| string`                                 | `[5, 10, 25, 50, 100]`                                                                                |
| `pagination`            | `pagination`               | Enable pagination                              | `boolean`                                            | `true`                                                                                                |
| `rowHeight`             | `row-height`               | Row height variant                             | `"comfortable" \| "compact" \| "normal"`             | `'normal'`                                                                                            |
| `rowPinning`            | `row-pinning`              | Enable row pinning                             | `boolean`                                            | `true`                                                                                                |
| `rowReorder`            | `row-reorder`              | Enable row reordering via drag and drop        | `boolean`                                            | `false`                                                                                               |
| `rowSpanning`           | `row-spanning`             | Enable row spanning                            | `boolean`                                            | `false`                                                                                               |
| `searchable`            | `searchable`               | Enable global search                           | `boolean`                                            | `true`                                                                                                |
| `selectable`            | `selectable`               | Enable row selection                           | `boolean`                                            | `false`                                                                                               |
| `serverSide`            | `server-side`              | Server-side mode                               | `boolean`                                            | `false`                                                                                               |
| `showActions`           | `show-actions`             | Show actions menu (3-dot menu) for each row    | `boolean`                                            | `false`                                                                                               |
| `showColumnPanel`       | `show-column-panel`        | Show column panel                              | `boolean`                                            | `false`                                                                                               |
| `showFilterPanel`       | `show-filter-panel`        | Show filter panel                              | `boolean`                                            | `false`                                                                                               |
| `showGroupCount`        | `show-group-count`         | Show group count                               | `boolean`                                            | `true`                                                                                                |
| `showGroupingControls`  | `show-grouping-controls`   | Enable row grouping controls in toolbar        | `boolean`                                            | `true`                                                                                                |
| `showSkeleton`          | `show-skeleton`            | Show skeleton while loading                    | `boolean`                                            | `true`                                                                                                |
| `skeletonRows`          | `skeleton-rows`            | Number of skeleton rows to show                | `number`                                             | `5`                                                                                                   |
| `sortable`              | `sortable`                 | Enable sorting                                 | `boolean`                                            | `true`                                                                                                |
| `stickyHeader`          | `sticky-header`            | Enable sticky header                           | `boolean`                                            | `true`                                                                                                |
| `striped`               | `striped`                  | Enable striped rows                            | `boolean`                                            | `true`                                                                                                |
| `theme`                 | `theme`                    | Theme mode                                     | `"auto" \| "dark" \| "light"`                        | `'auto'`                                                                                              |
| `totalRows`             | `total-rows`               | Total rows (for server-side pagination)        | `number`                                             | `0`                                                                                                   |


## Events

| Event                    | Description | Type                                                                        |
| ------------------------ | ----------- | --------------------------------------------------------------------------- |
| `cellEdit`               |             | `CustomEvent<{ rowId: string \| number; field: string; value: any; }>`      |
| `cellEditStart`          |             | `CustomEvent<{ rowId: string \| number; field: string; value: any; }>`      |
| `cellEditStop`           |             | `CustomEvent<{ rowId: string \| number; field: string; value: any; }>`      |
| `columnOrderChange`      |             | `CustomEvent<{ order: string[]; }>`                                         |
| `columnPin`              |             | `CustomEvent<{ columnId: string; position: "none" \| "left" \| "right"; }>` |
| `columnVisibilityChange` |             | `CustomEvent<{ visible: string[]; }>`                                       |
| `dataExport`             |             | `CustomEvent<{ data: any[]; format: string; }>`                             |
| `filterChange`           |             | `CustomEvent<FilterConfig>`                                                 |
| `groupByChange`          |             | `CustomEvent<{ field: string; }>`                                           |
| `groupToggle`            |             | `CustomEvent<{ groupKey: string; expanded: boolean; }>`                     |
| `pageChange`             |             | `CustomEvent<{ page: number; pageSize: number; }>`                          |
| `rowAction`              |             | `CustomEvent<{ row: any; action: string; }>`                                |
| `rowDelete`              |             | `CustomEvent<{ row: any; }>`                                                |
| `rowDeselect`            |             | `CustomEvent<{ selectedRows: (string \| number)[]; }>`                      |
| `rowEdit`                |             | `CustomEvent<{ row: any; }>`                                                |
| `rowEditStart`           |             | `CustomEvent<{ row: any; }>`                                                |
| `rowEditStop`            |             | `CustomEvent<{ row: any; }>`                                                |
| `rowPin`                 |             | `CustomEvent<{ rowId: number; position: "none" \| "top" \| "bottom"; }>`    |
| `rowReorderEvent`        |             | `CustomEvent<{ fromIndex: number; toIndex: number; }>`                      |
| `rowSelect`              | Events      | `CustomEvent<{ selectedRows: (string \| number)[]; }>`                      |
| `searchChange`           |             | `CustomEvent<{ query: string; }>`                                           |
| `sortChange`             |             | `CustomEvent<SortConfig>`                                                   |


## Methods

### `deselectAllRows() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `deselectRow(rowId: string | number) => Promise<void>`



#### Parameters

| Name    | Type               | Description |
| ------- | ------------------ | ----------- |
| `rowId` | `string \| number` |             |

#### Returns

Type: `Promise<void>`



### `exportData(options?: ExportOptions) => Promise<void>`



#### Parameters

| Name      | Type            | Description |
| --------- | --------------- | ----------- |
| `options` | `ExportOptions` |             |

#### Returns

Type: `Promise<void>`



### `getSelectedRows() => Promise<(string | number)[]>`



#### Returns

Type: `Promise<(string | number)[]>`



### `goToPage(page: number) => Promise<void>`



#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `page` | `number` |             |

#### Returns

Type: `Promise<void>`



### `refresh() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `resetFilters() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `resetSort() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `selectAllRows() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `selectRow(rowId: string | number) => Promise<void>`

Public methods

#### Parameters

| Name    | Type               | Description |
| ------- | ------------------ | ----------- |
| `rowId` | `string \| number` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
