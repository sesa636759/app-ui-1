# ui-timeline



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description         | Type                        | Default     |
| ----------- | ------------ | ------------------- | --------------------------- | ----------- |
| `collapse`  | `collapse`   | Responsive/collapse | `boolean`                   | `false`     |
| `events`    | `events`     | Events definition   | `TimelineEvent[] \| string` | `[]`        |
| `flow`      | `flow`       | Flow type           | `"linear" \| "non-linear"`  | `'linear'`  |
| `theme`     | --           | Theme variables     | `TimelineTheme`             | `undefined` |
| `useShadow` | `use-shadow` | Shadow DOM toggle   | `boolean`                   | `false`     |


## Events

| Event          | Description | Type                                                    |
| -------------- | ----------- | ------------------------------------------------------- |
| `timelineGoTo` |             | `CustomEvent<{ index: number; event: TimelineEvent; }>` |
| `timelineNext` | Events      | `CustomEvent<{ index: number; event: TimelineEvent; }>` |
| `timelinePrev` |             | `CustomEvent<{ index: number; event: TimelineEvent; }>` |


## Methods

### `goTo(index: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `index` | `number` |             |

#### Returns

Type: `Promise<void>`



### `next() => Promise<void>`

Programmatic API

#### Returns

Type: `Promise<void>`



### `prev() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
