## Options

### Selectors

| Name         | Type        | Default               | Required | Description                                |
|--------------|-------------|-----------------------|----------|--------------------------------------------|
| el           | DOM element | `[data-eta]`          | ✅        | Wrapper element                            |
| trigger      | string      | `[data-eta-trigger]`  | ✅        | CSS selector for trigger elements          |
| triggerAttr  | string      | `data-eta-trigger`    | ✅        | Attribute name of trigger elements         |
| receiver     | string      | `[data-eta-receiver]` | ✅        | CSS selector for receiver elements         |
| receiverAttr | string      | `data-eta-receiver`   | ✅        | Attribute name of receiver elements        |
| activeClass  | string      | `"active"`            | ❌        | Class name for active trigger and receiver |

> ⚠️ Notice that value of `triggerAttr` and `receiverAttr` must be the same.

### Animation

| Name           | Type    | Default   | Description                                                                                               |
|----------------|---------|-----------|-----------------------------------------------------------------------------------------------------------|
| animation      | string  | `"slide"` | `"slide"` for accordion style (slide up and slide down), `"fade"` for tabbed style (fade in and fade out) |
| duration       | number  | `450`     | Duration of animation in millisecond                                                                      |
| scrollIntoView | boolean | `false`   | Scroll panel into view when open                                                                          |

### Hash

| Name       | Type    | Default | Description                                         |
|------------|---------|---------|-----------------------------------------------------|
| hash       | boolean | `false` | Update hash URL                                     |
| hashScroll | boolean | `false` | Scroll into view when page loaded with a valid hash |

### Responsive

| Name           | Type  | Default | Description             |
|----------------|-------|---------|-------------------------|
| liveBreakpoint | array | `[]`    | An array of two numbers |

`liveBreakpoint` defines a range to enable ETA, when the browser's width is outside this range ETA will be destroyed (
detecting via window resizing event).

For instance:

- `liveBreakpoint:[99999,768]`: destroy ETA on screen that smaller than 768px
- `liveBreakpoint:[1024,-1]`: destroy ETA on screen that bigger than 1024px

### Open and close

| Name          | Type         | Default | Description                                                                                  |
|---------------|--------------|---------|----------------------------------------------------------------------------------------------|
| activeSection | number/array | `0`     | Index(s) of section to be active on init, array input only available for `animation:"slide"` |

#### For `animation:"slide"` only

| Name             | Type    | Default | Description                                     |
|------------------|---------|---------|-------------------------------------------------|
| allowCollapseAll | boolean | `false` | Allow to collapse all sections at the same time |
| allowExpandAll   | boolean | `false` | Allow to expand all sections at the same time   |

#### Prevent default option

| Name             | Type    | Default | Description                                                        |
|------------------|---------|---------|--------------------------------------------------------------------|
| isPreventDefault | boolean | `true`  | Allow preventing the default behavior when clicking on the trigger |

### HTML attributes

Add these attributes on the wrapper element.

| Attribute                   | As for option       | 
|-----------------------------|---------------------|
| `data-eta-animation="fade"` | `animation: "fade"` |
| `data-eta-hash`             | `hash: true`        | 
| `data-eta-hash-scroll`      | `hashScroll: true`  |

---
