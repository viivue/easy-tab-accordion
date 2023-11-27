## Use

### Default init

#### With attribute

Using these HTML attributes to initialize without JavaScript.

<div data-eta>
    <div>
        <button data-eta-trigger="section-1">Section 1</button>
        <div data-eta-receiver="section-1">
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Amet architecto dolorem, dolores ducimus eaque
        eligendi harum hic id iste magnam natus non, officia reiciendis, repellendus voluptate. Atque ipsum quia rem.
        </div>
    </div>
    <div>
        <button data-eta-trigger="section-2">Section 2</button>
        <div data-eta-receiver="section-2">
         Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Amet architecto dolorem, dolores ducimus eaque
        eligendi harum hic id iste magnam natus non, officia reiciendis, repellendus voluptate. Atque ipsum quia rem.
        </div>
    </div>
</div>

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

---

#### With JSON

<div data-eta='{ "id":"my-id", "animation":"slide", "hash":"false", "duration":"100"}'>
    <div>
        <button data-eta-trigger="section-1">Section 1</button>
        <div data-eta-receiver="section-1">
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Amet architecto dolorem, dolores ducimus eaque
        eligendi harum hic id iste magnam natus non, officia reiciendis, repellendus voluptate. Atque ipsum quia rem.
        </div>
    </div>
    <div>
        <button data-eta-trigger="section-2">Section 2</button>
        <div data-eta-receiver="section-2">
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Amet architecto dolorem, dolores ducimus eaque
        eligendi harum hic id iste magnam natus non, officia reiciendis, repellendus voluptate. Atque ipsum quia rem.
        </div>
    </div>
</div>

Using data-attributes (with JSON format) to initialize.

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

> ⚠️ Notice that value of data-eta-trigger and data-eta-receiver must be the same.

---

### Custom init

<div class="my-accordion">
    <div>
        <button data-trigger="section-1">Section 1</button>
        <div class="content" id="section-1">Content</div>
    </div>
    <div>
        <button data-trigger="section-2">Section 2</button>
        <div class="content" id="section-2">Content</div>
    </div>
</div>

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

---

