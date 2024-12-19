## Demos

### Accordion

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
        Tellus pharetra eget euismod lacus dis phasellus viverra neque habitant. Cubilia cras pede commodo donec non dictumst praesent. Odio semper cras eros inceptos nullam ridiculus. Luctus posuere adipiscing facilisis dolor blandit et phasellus viverra a. Blandit nam cubilia etiam magnis conubia aliquam curabitur.
        </div>
    </div>
</div>

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

### Tab

<div data-eta='{"animation":"fade"}'>
    <div>
        <button data-eta-trigger="section-1">Section 1</button>
        <button data-eta-trigger="section-2">Section 2</button>
    </div>
    <div>
        <div data-eta-receiver="section-1">
            Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Amet architecto dolorem, dolores ducimus eaque
            eligendi harum hic id iste magnam natus non, officia reiciendis, repellendus voluptate. Atque ipsum quia rem.
        </div>
        <div data-eta-receiver="section-2">
            Tellus pharetra eget euismod lacus dis phasellus viverra neque habitant. Cubilia cras pede commodo donec non dictumst praesent. Odio semper cras eros inceptos nullam ridiculus. Luctus posuere adipiscing facilisis dolor blandit et phasellus viverra a. Blandit nam cubilia etiam magnis conubia aliquam curabitur.
        </div>
    </div>
</div>

```html

<div data-eta='{"animation":"fade"}'>
    <!-- trigger -->
    <div>
        <button data-eta-trigger="section-1">Section 1</button>
        <button data-eta-trigger="section-2">Section 2</button>
    </div>

    <!-- content -->
    <div>
        <div data-eta-receiver="section-1">Content</div>
        <div data-eta-receiver="section-2">Content</div>
    </div>
</div>
```