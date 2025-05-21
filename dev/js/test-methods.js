import md from "../md/methods.md";

export function testMethods(root){
    root.insertAdjacentHTML('beforeend', md);

    ETA.init();

    ETA.init({
        el: document.querySelector('[data-accordion]'),
        id: 'accordion',
        trigger: '[data-accordion-trigger]',
        triggerAttr: 'data-accordion-trigger',
        receiver: '[data-accordion-receiver]',
        receiverAttr: 'data-accordion-receiver',
        allowCollapseAll: false,
        allowExpandAll: true,
        liveBreakpoint: [1500, 1024],
        onBeforeOpen: (obj) => {
            console.log("onBeforeOpen: ", obj);
        },
        onAfterOpen: (obj) => {
            console.log("onAfterOpen: ", obj);
        },
        onBeforeClose: (obj) => {
            console.log("onBeforeClose: ", obj);
        },
        onAfterClose: (obj) => {
            console.log("onAfterClose: ", obj);
        },

        //hash: true
    });
    const accordion = ETA.get('accordion');

    ETA.init({
        el: document.querySelector('[data-expandall]'),
        id: 'expandAll-accordion',
        trigger: '[data-accordion-trigger]',
        triggerAttr: 'data-accordion-trigger',
        receiver: '[data-accordion-receiver]',
        receiverAttr: 'data-accordion-receiver',
        allowExpandAll: true,
    });

    const expandAll = ETA.get('expandAll-accordion');

    /**
     * Button click
     */
    document.querySelectorAll('[data-btn]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switch(e.target.dataset.btn){
                case 'destroy-accordion':
                    accordion.destroy();
                    break;
                case 'expandAll-accordion':
                    expandAll.expandAll();
                    break;
            }
        })
    });

}
