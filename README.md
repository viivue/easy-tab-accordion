# Easy Tab & Accordion (ETA)

[![release](https://badgen.net/github/release/viivue/easy-tab-accordion/)](https://github.com/viivue/easy-tab-accordion/releases/latest)
[![minified](https://badgen.net/badge/minified/10KB/cyan)](https://www.jsdelivr.com/package/gh/viivue/easy-tab-accordion)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/viivue/easy-tab-accordion/badge?style=rounded)](https://www.jsdelivr.com/package/gh/viivue/easy-tab-accordion)
[![license](https://badgen.net/github/license/viivue/easy-tab-accordion/)](https://github.com/viivue/easy-tab-accordion/blob/main/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/baaede11-84dc-46b3-b434-11aad923a156/deploy-status)](https://app.netlify.com/sites/easy-tab-accordion/deploys)

> Javascript library to create tabs or accordion.

## Getting started

### NPM Package

Install NPM package

```shell
npm i @viivue/easy-tab-accordion
```

Import

```js
import "@viivue/easy-tab-accordion";
```

### Download

👉 Self hosted - [Download the latest release](https://github.com/viivue/easy-tab-accordion/releases/latest)

```html

<script src="./easy-tab-accordion.min.js"></script>
```

👉 CDN Hosted - [jsDelivr](https://www.jsdelivr.com/package/gh/viivue/easy-tab-accordion)

```html
<!-- JS (10KB) -->
<script src="https://cdn.jsdelivr.net/gh/viivue/easy-tab-accordion@2.1.7/dist/easy-tab-accordion.min.js"></script>
```

## Initialize

To initialize an ETA script, always remember three things:

1. Wrapper
2. Trigger(s)
3. Receiver(s)

### With HTML

Using these HTML attributes to initialize without JavaScript.

```html
<!-- No Js init -->
<div data-eta>
    <!-- section 1 -->
    <div>
        <button data-eta-trigger="section-1">Section 1</button>
        <div data-eta-receiver="section-1">Content</div>
    </div>

    <!-- section 2 -->
    <div>
        <button data-eta-trigger="section-2">Section 2</button>
        <div data-eta-receiver="section-2">Content</div>
    </div>
</div>
```

Or using data-attributes (with JSON format) to initialize.

```html

<div data-eta='{ "id":"my-id", "animation":"slide", "hash":"false", "duration":"100"}'>
    <!-- section 1 -->
    <div>
        <button data-eta-trigger="section-1">Section 1</button>
        <div data-eta-receiver="section-1">Content</div>
    </div>

    <!-- section 2 -->
    <div>
        <button data-eta-trigger="section-2">Section 2</button>
        <div data-eta-receiver="section-2">Content</div>
    </div>
</div>
```

> ⚠️ Notice that value of `data-eta-trigger` and `data-eta-receiver` must be the same.

### With JavaScript

Assume that we have the HTML like below

```html
<!-- Custom HTML -->
<div class="my-accordion">
    <!-- section 1 -->
    <div>
        <button data-trigger="section-1">Section 1</button>
        <div class="content" id="section-1">Content</div>
    </div>

    <!-- section 2 -->
    <div>
        <button data-trigger="section-2">Section 2</button>
        <div class="content" id="section-2">Content</div>
    </div>
</div>
```

```js
// Init
ETA.init({
    el: document.querySelector('.my-accordion'), // DOM element
    trigger: '[data-trigger]', // CSS selector
    triggerAttr: 'data-trigger', // attribute name
    receiver: '.content', // CSS selector
    receiverAttr: 'id', // attribute name
});
```

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

| Attribute                           | As for option             | 
|-------------------------------------|---------------------------|
| `data-eta-animation="fade"`         | `animation: "fade"`       |
| `data-eta-hash`                     | `hash: true`              | 
| `data-eta-hash-scroll`              | `hashScroll: true`        |

## Events

| Name                             | Description | 
|----------------------------------|-------------|
| `onBeforeInit: (data) => {}`     |             |
| `onAfterInit: (data) => {}`      |             |
| `onBeforeOpen: (data,el) => {}`  |             |
| `onBeforeClose: (data,el) => {}` |             |
| `onAfterOpen: (data,el) => {}`   |             |
| `onAfterClose: (data,el) => {}`  |             |
| `onDestroy: (data) => {}`        |             |
| `onUpdate: (data) => {}`         |             |

## Methods

| Name            | Usage                      | Description                 | 
|-----------------|----------------------------|-----------------------------|
| `toggle`        | `eta.toggle(id)`           | Toggle a section by ID      |
| `toggleByIndex` | `eta.toggleByIndex(index)` | Toggle a section by index   |
| `destroy`       | `eta.destroy()`            | Remove all style and events |
| `init`          | `eta.init()`               | Could be use after destroy  |
| `update`        | `eta.update()`             | Update styling              |
| `on`            | `eta.on()`                 | Assign events               |

Get the instance with JS init

```js
ETA.init({
    id: 'my-eta'
});

const eta = ETA.get('my-eta');

// use methods
eta.update();
eta.on("open", () => {
    // do something
});
```

## Deployment

```shell
# Start dev server
npm run dev

# Distribute production files (set new version in `package.json` first)
npm run prod

# Build dev site (for Netlify only)
npm run build
```

## License

[MIT License](https://github.com/viivue/easy-tab-accordion/blob/main/LICENSE)

Copyright (c) 2023 ViiVue