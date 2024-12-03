## Layouts

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
