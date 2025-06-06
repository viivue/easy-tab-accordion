## Methods

| Name            | Usage                                     | Description                                                           | 
|-----------------|-------------------------------------------|-----------------------------------------------------------------------|
| `toggle`        | `eta.toggle(panelId)`                     | Toggle a panel                                                        |
| `openPanel`     | `eta.openPanel(panelId, isStrict=false)`  | Open a panel. Turn `isStrict` on to only open is currently closing.   |
| `closePanel`    | `eta.closePanel(panelId, isStrict=false)` | Close a panel. Turn `isStrict` on to only close is currently opening. |
| `toggleByIndex` | `eta.toggleByIndex(index)`                | Toggle a section by index                                             |
| `destroy`       | `eta.destroy()`                           | Remove all style and events                                           |
| `init`          | `eta.init()`                              | Could be use after destroy                                            |
| `update`        | `eta.update()`                            | Update styling                                                        |
| `on`            | `eta.on()`                                | Assign events                                                         |

Get the instance with JS init

```js
ETA.init({
    id: 'my-eta'
});

const eta = ETA.get('my-eta');

// use methods
eta.update();

eta.on("destroy", () => {
    // do something
});
```

### Destroy method

<div data-accordion>
            <div>   
                  <button data-accordion-trigger="section-1">Section 1</button>
                 <div data-accordion-receiver="section-1">
                    <p>Fusce quisque nam ac tortor sagittis. Nullam habitasse integer
                        aliquam potenti magnis conubia nisl tincidunt non nascetur molestie dignissim.
                        pellentesque faucibus lectus. Scelerisque cursus magnis imperdiet nec consectetur dis dictum
                        odio.</p>
                 </div>
            </div>
            <div>
                <button data-accordion-trigger="section-2">Section 2</button>
                <div data-accordion-receiver="section-2">
                    <p>Mauris leo rutrum auctor si massa. Nibh parturient nam porta congue tincidunt consectetuer
                        sagittis a convallis facilisis.
                    </p>
                </div>
            </div>
        <div class="btn-group">
            <button class="btn red" data-btn="destroy-accordion">Destroy</button>
        </div>
</div>


### expandAll() method

<div data-expand-all>
            <div>   
                  <button data-accordion-trigger="section-3">Section 3</button>
                 <div data-accordion-receiver="section-3">
                    <p>Fusce quisque nam ac tortor sagittis. Nullam habitasse integer
                        aliquam potenti magnis conubia nisl tincidunt non nascetur molestie dignissim.
                        pellentesque faucibus lectus. Scelerisque cursus magnis imperdiet nec consectetur dis dictum
                        odio.</p>
                 </div>
            </div>
            <div>
                <button data-accordion-trigger="section-4">Section 4</button>
                <div data-accordion-receiver="section-4">
                    <p>Mauris leo rutrum auctor si massa. Nibh parturient nam porta congue tincidunt consectetuer
                        sagittis a convallis facilisis. Nibh parturient nam porta congue tincidunt consectetuer
                        sagittis a convallis facilisis.
                    </p>
                </div>
            </div>
        <div class="btn-group">
            <button class="btn red" data-btn="expand-all-accordion">Expand All</button>
        </div>
</div>

Assume that we have the HTML below

<details>
<summary>View code</summary>

```html

<div data-accordion>
    <div>
        <button data-accordion-trigger="section-1">Section 1</button>
        <div data-accordion-receiver="section-1">
            <p>Fusce quisque nam ac tortor sagittis. Nullam habitasse integer
                aliquam potenti magnis conubia nisl tincidunt non nascetur molestie dignissim.
                pellentesque faucibus lectus. Scelerisque cursus magnis imperdiet nec consectetur dis dictum
                odio.</p>
        </div>
    </div>
    <div>
        <button data-accordion-trigger="section-2">Section 2</button>
        <div data-accordion-receiver="section-2">
            <p>Mauris leo rutrum auctor si massa. Nibh parturient nam porta congue tincidunt consectetuer
                sagittis a convallis facilisis.
            </p>
        </div>
    </div>
    <div class="btn-group">
        <button class="btn red" data-btn="destroy-accordion">Destroy</button>
    </div>
</div>
```

```js
ETA.init({
    el: document.querySelector('[data-accordion]'),
    id: 'accordion',
    trigger: '[data-accordion-trigger]',
    triggerAttr: 'data-accordion-trigger',
    receiver: '[data-accordion-receiver]',
    receiverAttr: 'data-accordion-receiver',
    allowCollapseAll: false,
    //allowExpandAll: true,
    //liveBreakpoint: [1920, 1024]
    //hash: true
});
const accordion = ETA.get('accordion');

/**
 * Button click
 */
document.querySelectorAll('[data-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        switch(e.target.dataset.btn){
            case 'destroy-accordion':
                accordion.destroy();
                break;
        }
    })
});
```

</details>

## Accessibility Support

EasyTabAccordion provides built-in support for accessible interaction with triggers and panels.

| Key                | Behavior                              |
|--------------------|---------------------------------------|
| `Tab`              | Move focus between accordion triggers |
| `Shift + Tab`      | Move focus backward between triggers  |
| `Enter` or `Space` | Toggle the currently focused panel    |

Users can interact with accordion headers using standard input methods such as keyboard or assistive technologies, ensuring a more inclusive experience.

### Example


<div data-accordion-accessibility style="margin-bottom:10px">
    <div>
        <p data-accordion-trigger="panel-1" style="margin-bottom:10px">Section 1</p>
        <div data-accordion-receiver="panel-1">
            <p>Fusce quisque nam ac tortor sagittis. Nullam habitasse integer
                aliquam potenti magnis conubia nisl tincidunt non nascetur molestie dignissim.
                pellentesque faucibus lectus. Scelerisque cursus magnis imperdiet nec consectetur dis dictum
                odio.</p>
            <p>Fusce quisque nam ac tortor sagittis. Nullam habitasse integer
                aliquam potenti magnis conubia nisl tincidunt non nascetur molestie dignissim.
                pellentesque faucibus lectus. Scelerisque cursus magnis imperdiet nec consectetur dis dictum
                odio.</p>
        </div>
    </div>
</div>

When focused on `Section 1`, pressing **Enter** or **Space** will toggle the associated panel.

---
