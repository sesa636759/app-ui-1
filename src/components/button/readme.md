# ui-button

A comprehensive, feature-rich button component with multiple variants, sizes, states, and customization options.

## Features

- 🎨 **8 Variants**: Primary, Secondary, Success, Danger, Warning, Info, Outline, Ghost
- 📏 **5 Sizes**: Extra Small (xs), Small (sm), Medium (md), Large (lg), Extra Large (xl)
- ⏳ **Loading State**: Built-in loading spinner
- 🔒 **Disabled State**: Visual and functional disabled support
- 🎯 **Icon Support**: Left, right, or icon-only buttons
- 📐 **Full Width**: Stretch to container width
- 🔄 **Border Radius**: Default, rounded, or pill-shaped
- 🎪 **Event Handling**: Click event emission
- ♿ **Accessible**: Keyboard navigation and focus states

## Basic Usage

```html
<ui-button label="Click Me"></ui-button>
```

## Examples

### Variants

```html
<ui-button label="Primary" variant="primary"></ui-button>
<ui-button label="Secondary" variant="secondary"></ui-button>
<ui-button label="Success" variant="success"></ui-button>
<ui-button label="Danger" variant="danger"></ui-button>
<ui-button label="Warning" variant="warning"></ui-button>
<ui-button label="Info" variant="info"></ui-button>
<ui-button label="Outline" variant="outline"></ui-button>
<ui-button label="Ghost" variant="ghost"></ui-button>
```

### Sizes

```html
<ui-button label="Extra Small" size="xs"></ui-button>
<ui-button label="Small" size="sm"></ui-button>
<ui-button label="Medium" size="md"></ui-button>
<ui-button label="Large" size="lg"></ui-button>
<ui-button label="Extra Large" size="xl"></ui-button>
```

### With Icons

```html
<!-- Icon on left (default) -->
<ui-button label="Save" icon="💾" variant="primary"></ui-button>

<!-- Icon on right -->
<ui-button label="Next" icon="→" icon-position="right"></ui-button>

<!-- Icon only -->
<ui-button icon="❤️" icon-only variant="danger"></ui-button>
```

### Loading State

```html
<ui-button label="Loading..." loading variant="primary"></ui-button>
```

### Disabled State

```html
<ui-button label="Disabled" disabled variant="primary"></ui-button>
```

### Full Width

```html
<ui-button label="Full Width Button" full-width variant="primary"></ui-button>
```

### Border Radius Options

```html
<!-- Default (6px) -->
<ui-button label="Default"></ui-button>

<!-- Rounded (12px) -->
<ui-button label="Rounded" rounded></ui-button>

<!-- Pill (fully rounded) -->
<ui-button label="Pill" pill></ui-button>
```

### Event Handling

```html
<ui-button id="myButton" label="Click Me"></ui-button>

<script>
  const button = document.getElementById('myButton');
  button.addEventListener('buttonClick', (event) => {
    console.log('Button clicked!', event);
  });
</script>
```

### Real-world Examples

```html
<!-- Form submission -->
<ui-button 
  label="Submit" 
  variant="success" 
  icon="✓" 
  type="submit"
></ui-button>

<!-- Delete action -->
<ui-button 
  label="Delete" 
  variant="danger" 
  icon="🗑️"
></ui-button>

<!-- Loading action -->
<ui-button 
  label="Saving..." 
  variant="primary" 
  loading
></ui-button>

<!-- Social actions -->
<ui-button icon="❤️" icon-only variant="danger" size="sm"></ui-button>
<ui-button icon="💬" icon-only variant="info" size="sm"></ui-button>
```


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                            | Type                                                                                               | Default     |
| -------------- | --------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------- |
| `disabled`     | `disabled`      | Disabled state                                         | `boolean`                                                                                          | `false`     |
| `fullWidth`    | `full-width`    | Full width button                                      | `boolean`                                                                                          | `false`     |
| `icon`         | `icon`          | Optional icon content (can be text/icon font or emoji) | `string`                                                                                           | `undefined` |
| `iconOnly`     | `icon-only`     | Render icon only (no label)                            | `boolean`                                                                                          | `false`     |
| `iconPosition` | `icon-position` | Icon position relative to label                        | `"left" \| "right"`                                                                                | `'left'`    |
| `label`        | `label`         | Button label text                                      | `string`                                                                                           | `undefined` |
| `loading`      | `loading`       | Loading state (shows spinner)                          | `boolean`                                                                                          | `false`     |
| `pill`         | `pill`          | Pill-shaped (fully rounded)                            | `boolean`                                                                                          | `false`     |
| `rounded`      | `rounded`       | Rounded style                                          | `boolean`                                                                                          | `false`     |
| `size`         | `size`          | Size                                                   | `"lg" \| "md" \| "sm" \| "xl" \| "xs"`                                                             | `'md'`      |
| `type`         | `type`          | Button type                                            | `"button" \| "reset" \| "submit"`                                                                  | `'button'`  |
| `variant`      | `variant`       | Visual variant                                         | `"danger" \| "ghost" \| "info" \| "outline" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event         | Description | Type                      |
| ------------- | ----------- | ------------------------- |
| `buttonClick` | Click event | `CustomEvent<MouseEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
