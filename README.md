# Easy Tab & Accordion v1.0.1

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
<script src="https://cdn.jsdelivr.net/gh/viivue/easy-tab-accordion@1.0.1/build/easy-tab-accordion.js"></script>
```

or minified version

```html
<!-- JS (7KB) -->
<script src="https://cdn.jsdelivr.net/gh/viivue/easy-tab-accordion@1.0.1/dist/easy-tab-accordion.min.js"></script>
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
    el: document.querySelector('.wrapper'), // DOM element
    trigger: 'button.trigger', // string selector
    triggerAttr: 'data-trigger', // attribute name
    receiver: '.content', // string selector
    receiverAttr: 'id', // attribute name
});
```

## Options and events

```js
const eta = new EasyTabAccordion({
    el: document.querySelector('.wrapper'), // DOM element
    trigger: 'button.trigger', // string selector
    triggerAttr: 'data-trigger', // attribute name
    receiver: '.content', // string selector
    receiverAttr: 'id', // attribute name
    activeClass: 'active',
    animation: 'slide', // slide, fade
    duration: 600, // animation duration
    hash: false, // update hash on URL, open tab/accordion via hash
    liveBreakpoint: [], // [1920, 1024] => destroy if window.width if bigger than 1920 or less than 1024
    activeSection: 0, // will show order of item show, close all if activeSection < 0 or activeSection >= length item
    allowCollapseAll: false,
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

Hash and animation could be set via attributes.

```html
<div data-eta data-eta-hash="true" data-eta-animation="fade">
    ...
</div>
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

Release new version

```shell
gulp release
```
