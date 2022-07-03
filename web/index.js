import '@/styles/index.scss'

import homeHtml from "@/html/home.html";
import {EasyTabAccordion} from "@/../src/easy-tab-accordion";

/**
 * Create HTML
 */
const app = document.querySelector('#root')
app.innerHTML = homeHtml;


/**
 * Init
 */
const accordion = new EasyTabAccordion({
    el: document.querySelector('[data-accordion]'),
    trigger: '[data-accordion-trigger]',
    triggerAttr: 'data-accordion-trigger',
    receiver: '[data-accordion-receiver]',
    receiverAttr: 'data-accordion-receiver',
    allowCollapseAll: true,
    //hash: true
});

const tab = new EasyTabAccordion({
    animation: 'fade',
    el: document.querySelector('[data-tabs]'),
    trigger: '[data-tabs-trigger]',
    triggerAttr: 'data-tabs-trigger',
    receiver: '[data-tabs-receiver]',
    receiverAttr: 'data-tabs-receiver',
    allowCollapseAll: true,
    //hash: true
});

/**
 * Button click
 */
document.querySelectorAll('[data-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        switch(e.target.dataset.btn){
            case 'destroy-accordion':
                accordion.destroy();
                break;
            case 'init-accordion':
                break;
            case 'destroy-tab':
                tab.destroy();
                break;
            case 'init-tab':
                break;
        }
    })
});