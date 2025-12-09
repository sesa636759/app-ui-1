# ui-avatar-group



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                       | Type            | Default     |
| ------------ | ------------- | ------------------------------------------------- | --------------- | ----------- |
| `avatars`    | --            | Array of avatar props                             | `AvatarProps[]` | `[]`        |
| `max`        | `max`         | Alias for maxVisible (backward compatibility)     | `number`        | `undefined` |
| `maxVisible` | `max-visible` | Maximum number of avatars to show before grouping | `number`        | `5`         |
| `size`       | `size`        | Size of avatars (used to calculate overlap)       | `string`        | `'40px'`    |


## Dependencies

### Used by

 - [ui-tree-list](../tree-list)

### Depends on

- [ui-avatar](../avatar)

### Graph
```mermaid
graph TD;
  ui-avatar-group --> ui-avatar
  ui-tree-list --> ui-avatar-group
  style ui-avatar-group fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
