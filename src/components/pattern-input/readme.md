# ui-pattern-input



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                  | Type                                                           | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------- | ----------- |
| `allowedChars`    | `allowed-chars`    | Allowed characters regex (default: all)                      | `string`                                                       | `undefined` |
| `autoFormat`      | `auto-format`      | Auto-format as user types                                    | `boolean`                                                      | `true`      |
| `disabled`        | `disabled`         | Disabled state                                               | `boolean`                                                      | `false`     |
| `errorMessage`    | `error-message`    | Error message                                                | `string`                                                       | `undefined` |
| `helperText`      | `helper-text`      | Helper text                                                  | `string`                                                       | `undefined` |
| `inputType`       | `input-type`       | Input type restriction                                       | `"alpha" \| "alphanumeric" \| "custom" \| "numeric" \| "text"` | `'text'`    |
| `label`           | `label`            | Label text                                                   | `string`                                                       | `undefined` |
| `maskChar`        | `mask-char`        | Mask character for pattern (default: #)                      | `string`                                                       | `'#'`       |
| `maxLength`       | `max-length`       | Max length                                                   | `number`                                                       | `undefined` |
| `name`            | `name`             | Input name for forms                                         | `string`                                                       | `undefined` |
| `pattern`         | `pattern`          | Input pattern for display (e.g., "(###) ###-####" for phone) | `string`                                                       | `undefined` |
| `placeholder`     | `placeholder`      | Placeholder text                                             | `string`                                                       | `undefined` |
| `required`        | `required`         | Required field                                               | `boolean`                                                      | `false`     |
| `showCounter`     | `show-counter`     | Show character counter                                       | `boolean`                                                      | `false`     |
| `showValidation`  | `show-validation`  | Show validation status                                       | `boolean`                                                      | `true`      |
| `size`            | `size`             | Size variant                                                 | `"lg" \| "md" \| "sm"`                                         | `'md'`      |
| `successMessage`  | `success-message`  | Success message                                              | `string`                                                       | `undefined` |
| `validationRegex` | `validation-regex` | Validation regex pattern                                     | `string`                                                       | `undefined` |
| `value`           | `value`            | Current input value                                          | `string`                                                       | `''`        |


## Events

| Event                  | Description        | Type                                                                   |
| ---------------------- | ------------------ | ---------------------------------------------------------------------- |
| `patternInput`         | Input event        | `CustomEvent<{ value: string; formatted: string; }>`                   |
| `patternInputBlur`     | Blur event         | `CustomEvent<void>`                                                    |
| `patternInputChange`   | Value change event | `CustomEvent<{ value: string; formatted: string; isValid: boolean; }>` |
| `patternInputFocus`    | Focus event        | `CustomEvent<void>`                                                    |
| `patternInputValidate` | Validation event   | `CustomEvent<{ isValid: boolean; value: string; }>`                    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
