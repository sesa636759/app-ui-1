# ui-switch



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                       | Type                                                                       | Default     |
| ------------------ | -------------------- | --------------------------------- | -------------------------------------------------------------------------- | ----------- |
| `checked`          | `checked`            | Checked state                     | `boolean`                                                                  | `false`     |
| `disabled`         | `disabled`           | Disabled state                    | `boolean`                                                                  | `false`     |
| `iconOff`          | `icon-off`           | Icon when unchecked               | `string`                                                                   | `undefined` |
| `iconOn`           | `icon-on`            | Icon when checked                 | `string`                                                                   | `undefined` |
| `label`            | `label`              | Label text                        | `string`                                                                   | `undefined` |
| `labelPosition`    | `label-position`     | Label position                    | `"left" \| "right"`                                                        | `'right'`   |
| `loading`          | `loading`            | Loading state (shows spinner)     | `boolean`                                                                  | `false`     |
| `name`             | `name`               | Name attribute for forms          | `string`                                                                   | `undefined` |
| `required`         | `required`           | Required field indicator          | `boolean`                                                                  | `false`     |
| `shape`            | `shape`              | Shape style                       | `"default" \| "pill" \| "rounded" \| "square"`                             | `'default'` |
| `showDefaultIcons` | `show-default-icons` | Show check/cross icons by default | `boolean`                                                                  | `false`     |
| `size`             | `size`               | Size variant                      | `"lg" \| "md" \| "sm" \| "xl" \| "xs"`                                     | `'md'`      |
| `value`            | `value`              | Value attribute for forms         | `string`                                                                   | `undefined` |
| `variant`          | `variant`            | Color variant                     | `"danger" \| "info" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event          | Description  | Type                                                 |
| -------------- | ------------ | ---------------------------------------------------- |
| `switchBlur`   | Blur event   | `CustomEvent<void>`                                  |
| `switchChange` | Change event | `CustomEvent<{ checked: boolean; value?: string; }>` |
| `switchFocus`  | Focus event  | `CustomEvent<void>`                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
