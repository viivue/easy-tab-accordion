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
        // liveBreakpoint: [1920, 1024],
        //hash: true
    });
    const accordion = ETA.get('accordion');

    ETA.init({
        el: document.querySelector('[data-expand-all]'),
        id: 'expand-all-accordion',
        trigger: '[data-accordion-trigger]',
        triggerAttr: 'data-accordion-trigger',
        receiver: '[data-accordion-receiver]',
        receiverAttr: 'data-accordion-receiver',
        allowExpandAll: true,
    });

    const expandAll = ETA.get('expand-all-accordion');

    /**
     * Button click
     */
    document.querySelectorAll('[data-btn]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switch(e.target.dataset.btn){
                case 'destroy-accordion':
                    accordion.destroy();
                    break;
                case 'expand-all-accordion':
                    expandAll.expandAll();
                    break;
            }
        })
    });

}
