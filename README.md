# Easy Tab & Accordion v1.0.0

[![release](https://badgen.net/github/release/viivue/easy-tab-accordion/)](https://github.com/viivue/easy-tab-accordion/releases/latest)
[![minified](https://badgen.net/badge/minified/7KB/cyan)](https://www.jsdelivr.com/package/gh/viivue/easy-tab-accordion)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/viivue/easy-tab-accordion/badge?style=rounded)](https://www.jsdelivr.com/package/gh/viivue/easy-tab-accordion)
[![license](https://badgen.net/github/license/viivue/easy-tab-accordion/)](https://github.com/viivue/easy-tab-accordion/blob/main/LICENSE)

> Pure Javascript API to create switchable tabs or accordion.

## Getting started

### Download

👉 Self hosted - [Download latest release](https://github.com/viivue/easy-tab-accordion/releases/latest)

```html

<link rel="stylesheet" href="./easy-tab-accordion.css">
<script src="./easy-tab-accordion.js"></script>
```

👉 CDN Hosted - [jsDelivr](https://www.jsdelivr.com/package/gh/viivue/easy-tab-accordion)

```html
<!-- JS (12KB) -->
<script src="https://cdn.jsdelivr.net/gh/viivue/easy-tab-accordion@1.0.0/build/easy-tab-accordion.js"></script>
```

or minified version

```html
<!-- JS (7KB) -->
<script src="https://cdn.jsdelivr.net/gh/viivue/easy-tab-accordion@1.0.0/dist/easy-tab-accordion.min.js"></script>
```

## Init

To init via HTML. We need three things to make a tab/accordion works:

1. Wrapper element
2. Trigger element(s)
3. Receiver element(s)

```html

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

Init via JS. You're free to use your own HTML and attributes.

```js
const eta = new EasyTabAccordion({
    el: document.querySelector('data-eta'),
    trigger: '[data-eta-trigger]',
    triggerAttr: 'data-eta-trigger',
    receiver: '[data-eta-receiver]',
    receiverAttr: 'data-eta-receiver',
});
```

## Options and events

```js
const eta = new EasyTabAccordion({
    el: document.querySelector(`[${this._attr.container}]`), // DOM element
    trigger: `[${this._attr.trigger}]`, // string selector
    triggerAttr: this._attr.trigger, // attribute name
    receiver: `[${this._attr.receiver}]`, // string selector
    receiverAttr: this._attr.receiver, // attribute name
    activeClass: this._class.active,
    animation: 'slide', // slide, fade
    duration: 600,
    hash: false,
    liveBreakpoint: [], // [1920, 1024] => destroy if window.width if bigger than 1920 or less than 1024
    onBeforeOpen: (data, el) => {
    },
    onBeforeClose: (data, el) => {
    },
    onAfterOpen: (data, el) => {
    },
    onAfterClose: (data, el) => {
    },
    onAfterDestroy: (data, el) => {
    },
});
```

## Methods

```js
const eta = new EasyTabAccordion({});

eta.activate('section-2');
eta.activateByIndex(1);
eta.destroy();
```

## Deployment

Install gulp

```shell
npm install
```

And start server

```shell
gulp serve
```