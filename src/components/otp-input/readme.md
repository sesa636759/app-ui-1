# ui-otp-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                            | Type                               | Default    |
| ------------- | -------------- | ---------------------------------------------------------------------- | ---------------------------------- | ---------- |
| `autoFocus`   | `auto-focus`   | Auto focus first input                                                 | `boolean`                          | `true`     |
| `disabled`    | `disabled`     | Disabled state                                                         | `boolean`                          | `false`    |
| `error`       | `error`        | Error state                                                            | `boolean`                          | `false`    |
| `length`      | `length`       | Number of OTP input fields                                             | `number`                           | `6`        |
| `masked`      | `masked`       | Mask input values (show as dots)                                       | `boolean`                          | `false`    |
| `numericOnly` | `numeric-only` | Allow only numeric input                                               | `boolean`                          | `true`     |
| `separator`   | `separator`    | Show separator after specific positions (comma-separated, e.g., "3,6") | `string`                           | `''`       |
| `size`        | `size`         | Size variant                                                           | `"lg" \| "md" \| "sm"`             | `'md'`     |
| `success`     | `success`      | Success state                                                          | `boolean`                          | `false`    |
| `type`        | `type`         | Input type (number, text, password)                                    | `"number" \| "password" \| "text"` | `'number'` |
| `value`       | `value`        | Initial value                                                          | `string`                           | `''`       |


## Events

| Event         | Description                          | Type                                                   |
| ------------- | ------------------------------------ | ------------------------------------------------------ |
| `otpChange`   | Event emitted when OTP value changes | `CustomEvent<{ value: string; isComplete: boolean; }>` |
| `otpComplete` | Event emitted when OTP is complete   | `CustomEvent<{ value: string; }>`                      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
