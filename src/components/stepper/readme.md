# ui-stepper



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                         | Type                                                                                                                                                | Default         |
| -------------------- | --------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `activeStep`         | `active-step`         | Current active step index (0-based)                                 | `number`                                                                                                                                            | `0`             |
| `customIcons`        | --                    | Custom icon for each status (optional)                              | `{ disabled?: string; info?: string; success?: string; completed?: string; active?: string; pending?: string; failed?: string; waiting?: string; }` | `undefined`     |
| `flow`               | `flow`                | Flow type: linear or non-linear                                     | `"linear" \| "non-linear"`                                                                                                                          | `'linear'`      |
| `keyboardNavigation` | `keyboard-navigation` | Enable keyboard navigation                                          | `boolean`                                                                                                                                           | `true`          |
| `labelFail`          | `label-fail`          |                                                                     | `string`                                                                                                                                            | `'Mark Failed'` |
| `labelFinish`        | `label-finish`        |                                                                     | `string`                                                                                                                                            | `'Finish'`      |
| `labelNext`          | `label-next`          |                                                                     | `string`                                                                                                                                            | `'Next'`        |
| `labelPrev`          | `label-prev`          | Customize control button labels                                     | `string`                                                                                                                                            | `'Previous'`    |
| `maxVisibleSteps`    | `max-visible-steps`   | Maximum number of steps to show before collapsing                   | `number`                                                                                                                                            | `5`             |
| `orientation`        | `orientation`         | Orientation of the stepper (horizontal or vertical)                 | `"horizontal" \| "vertical"`                                                                                                                        | `'horizontal'`  |
| `responsive`         | `responsive`          | Enable responsive collapse/overflow                                 | `boolean`                                                                                                                                           | `true`          |
| `shadow`             | `shadow`              | Whether to use Shadow DOM                                           | `boolean`                                                                                                                                           | `true`          |
| `showControls`       | `show-controls`       | Show optional control buttons (Next/Previous/Finish/Failed)         | `boolean`                                                                                                                                           | `false`         |
| `showDescriptions`   | `show-descriptions`   | Whether to show step descriptions                                   | `boolean`                                                                                                                                           | `false`         |
| `showNumbers`        | `show-numbers`        | Whether to show step numbers                                        | `boolean`                                                                                                                                           | `true`          |
| `size`               | `size`                | Size of the stepper                                                 | `"lg" \| "md" \| "sm"`                                                                                                                              | `'md'`          |
| `steps`              | `steps`               | Steps can be provided as an array or a JSON string in the attribute | `StepperStep[] \| string`                                                                                                                           | `[]`            |
| `theme`              | --                    | Theme configuration with CSS variables                              | `StepperTheme`                                                                                                                                      | `undefined`     |


## Events

| Event                    | Description                                     | Type                                                                        |
| ------------------------ | ----------------------------------------------- | --------------------------------------------------------------------------- |
| `stepperChange`          | Event emitted when active step changes          | `CustomEvent<{ index: number; step: StepperStep; previousIndex: number; }>` |
| `stepperFail`            |                                                 | `CustomEvent<{ index: number; step: StepperStep; }>`                        |
| `stepperFinish`          |                                                 | `CustomEvent<{ index: number; step: StepperStep; }>`                        |
| `stepperNext`            |                                                 | `CustomEvent<{ index: number; step: StepperStep; }>`                        |
| `stepperPrevious`        | Events emitted when control buttons are clicked | `CustomEvent<{ index: number; step: StepperStep; }>`                        |
| `stepperValidationError` | Event emitted when validation fails             | `CustomEvent<{ index: number; step: StepperStep; error: string; }>`         |


## Methods

### `complete(stepIndex?: number) => Promise<void>`

Programmatic API: Mark step as completed

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| `stepIndex` | `number` |             |

#### Returns

Type: `Promise<void>`



### `fail(stepIndex?: number, errorMessage?: string) => Promise<void>`

Programmatic API: Mark step as failed

#### Parameters

| Name           | Type     | Description |
| -------------- | -------- | ----------- |
| `stepIndex`    | `number` |             |
| `errorMessage` | `string` |             |

#### Returns

Type: `Promise<void>`



### `getCurrentStep() => Promise<StepperStep | null>`

Get current step

#### Returns

Type: `Promise<StepperStep>`



### `getSteps() => Promise<StepperStep[]>`

Get all steps

#### Returns

Type: `Promise<StepperStep[]>`



### `goTo(stepIndex: number, options?: StepperNavigationOptions) => Promise<boolean>`

Programmatic API: Go to specific step

#### Parameters

| Name        | Type                       | Description |
| ----------- | -------------------------- | ----------- |
| `stepIndex` | `number`                   |             |
| `options`   | `StepperNavigationOptions` |             |

#### Returns

Type: `Promise<boolean>`



### `next(options?: StepperNavigationOptions) => Promise<boolean>`

Programmatic API: Go to next step

#### Parameters

| Name      | Type                       | Description |
| --------- | -------------------------- | ----------- |
| `options` | `StepperNavigationOptions` |             |

#### Returns

Type: `Promise<boolean>`



### `prev(options?: StepperNavigationOptions) => Promise<boolean>`

Programmatic API: Go to previous step

#### Parameters

| Name      | Type                       | Description |
| --------- | -------------------------- | ----------- |
| `options` | `StepperNavigationOptions` |             |

#### Returns

Type: `Promise<boolean>`



### `validateCurrentStep() => Promise<boolean>`

Validate current step

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
