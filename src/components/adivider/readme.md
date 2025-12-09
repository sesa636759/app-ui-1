# a-divider

A flexible divider component that can display text and supports various styles and orientations.

## Basic Usage

```html
<!-- Simple horizontal divider -->
<a-divider></a-divider>

<!-- Divider with text -->
<a-divider text="OR"></a-divider>

<!-- Text alignment -->
<a-divider text="Left" text-align="left"></a-divider>
<a-divider text="Center" text-align="center"></a-divider>
<a-divider text="Right" text-align="right"></a-divider>

<!-- Vertical divider -->
<a-divider orientation="vertical" text="OR"></a-divider>
```

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                          | Type                                                                                      | Default        |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------- |
| `color`         | `color`          | Custom color for the divider line (CSS color value)                                                                  | `string`                                                                                  | `''`           |
| `orientation`   | `orientation`    | Orientation of the divider: 'horizontal' or 'vertical'                                                               | `"horizontal" \| "vertical"`                                                              | `'horizontal'` |
| `size`          | `size`           | Size/thickness of the divider line: 'sm', 'md', or 'lg'                                                              | `"lg" \| "md" \| "sm"`                                                                    | `'md'`         |
| `text`          | `text`           | Text to display on the divider                                                                                       | `string`                                                                                  | `''`           |
| `textAlign`     | `text-align`     | Text alignment: 'left', 'center', or 'right'                                                                         | `"center" \| "left" \| "right"`                                                           | `'center'`     |
| `textColor`     | `text-color`     | Custom color for the text (CSS color value)                                                                          | `string`                                                                                  | `''`           |
| `textTransform` | `text-transform` | Text transformation: 'none', 'capitalize', 'uppercase', 'lowercase'                                                  | `"capitalize" \| "lowercase" \| "none" \| "uppercase"`                                    | `'capitalize'` |
| `variant`       | `variant`        | Visual variant of the divider line: 'solid', 'dashed', 'dotted', 'double-solid', 'double-dashed', or 'double-dotted' | `"dashed" \| "dotted" \| "double-dashed" \| "double-dotted" \| "double-solid" \| "solid"` | `'solid'`      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
