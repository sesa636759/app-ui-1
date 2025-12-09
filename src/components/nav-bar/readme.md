# nav-bar



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                 | Type        | Default       |
| ------------------- | -------------------- | --------------------------------------------------------------------------- | ----------- | ------------- |
| `appTitle`          | `app-title`          | Application title                                                           | `string`    | `undefined`   |
| `bottomItems`       | --                   | Navigation items for the bottom section                                     | `NavItem[]` | `[]`          |
| `collapsed`         | `collapsed`          | Whether the navigation is collapsed (mobile/hamburger mode)                 | `boolean`   | `true`        |
| `logoAlt`           | `logo-alt`           | Logo alt text                                                               | `string`    | `'Logo'`      |
| `logoUrl`           | `logo-url`           | Logo URL                                                                    | `string`    | `undefined`   |
| `maxVisibleItems`   | `max-visible-items`  | Maximum number of visible items before showing overflow menu (0 = show all) | `number`    | `0`           |
| `searchPlaceholder` | `search-placeholder` | Search placeholder text                                                     | `string`    | `'Search...'` |
| `showHamburger`     | `show-hamburger`     | Whether to show the hamburger menu icon                                     | `boolean`   | `true`        |
| `showSearch`        | `show-search`        | Whether to show search input for filtering items                            | `boolean`   | `false`       |
| `topItems`          | --                   | Navigation items for the top section                                        | `NavItem[]` | `[]`          |


## Events

| Event            | Description                              | Type                                                                |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| `navItemClicked` | Event emitted when a nav item is clicked | `CustomEvent<{ item: NavItem \| NavSubItem; isSubitem: boolean; }>` |
| `navToggled`     | Event emitted when navigation is toggled | `CustomEvent<{ collapsed: boolean; }>`                              |


## Methods

### `collapse() => Promise<void>`

Collapse the navigation

#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`

Expand the navigation

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle the navigation collapsed state

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
