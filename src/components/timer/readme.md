# ui-timer



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description         | Type                       | Default     |
| ----------- | ------------ | ------------------- | -------------------------- | ----------- |
| `collapse`  | `collapse`   | Responsive/collapse | `boolean`                  | `false`     |
| `flow`      | `flow`       | Flow type           | `"linear" \| "non-linear"` | `'linear'`  |
| `steps`     | `steps`      | Steps definition    | `TimerStep[] \| string`    | `[]`        |
| `theme`     | --           | Theme variables     | `TimerTheme`               | `undefined` |
| `useShadow` | `use-shadow` | Shadow DOM toggle   | `boolean`                  | `false`     |


## Events

| Event       | Description | Type                                               |
| ----------- | ----------- | -------------------------------------------------- |
| `timerGoTo` |             | `CustomEvent<{ index: number; step: TimerStep; }>` |
| `timerNext` | Events      | `CustomEvent<{ index: number; step: TimerStep; }>` |
| `timerPrev` |             | `CustomEvent<{ index: number; step: TimerStep; }>` |


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
