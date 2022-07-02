import '@/styles/index.scss'
import {EasyTabAccordion} from "@/js/easy-tab-accordion";
import homeHtml from "@/html/home.html";

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