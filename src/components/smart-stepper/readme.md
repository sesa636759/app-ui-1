# smart-stepper



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                         | Type                         | Default        |
| ------------- | ------------- | --------------------------------------------------- | ---------------------------- | -------------- |
| `activeStep`  | `active-step` | Current active step index (0-based)                 | `number`                     | `0`            |
| `orientation` | `orientation` | Orientation of the stepper (horizontal or vertical) | `"horizontal" \| "vertical"` | `'horizontal'` |
| `size`        | `size`        | Size of the stepper                                 | `"lg" \| "md" \| "sm"`       | `'md'`         |


## Events

| Event           | Description                            | Type                                                 |
| --------------- | -------------------------------------- | ---------------------------------------------------- |
| `stepperChange` | Event emitted when active step changes | `CustomEvent<{ index: number; step: HTMLElement; }>` |


## Methods

### `getCurrentStep() => Promise<HTMLElement | null>`

Get current step element

#### Returns

Type: `Promise<HTMLElement>`



### `getSteps() => Promise<HTMLElement[]>`

Get all step elements

#### Returns

Type: `Promise<HTMLElement[]>`



### `goTo(stepIndex: number) => Promise<boolean>`

Programmatic API: Go to specific step

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| `stepIndex` | `number` |             |

#### Returns

Type: `Promise<boolean>`



### `next() => Promise<boolean>`

Programmatic API: Go to next step

#### Returns

Type: `Promise<boolean>`



### `prev() => Promise<boolean>`

Programmatic API: Go to previous step

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
