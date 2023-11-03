// public styles
import '@viivue/atomic-css';
import 'honcau';

// private style
import './style.scss';

// source script
//import '@/_index';
import {EasyTabAccordion} from "@/_index";

// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;
document.querySelector('[data-description]').innerHTML = packageInfo.description;

/**
 * Lib usage
 */
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
    //allowExpandAll: true,
    //liveBreakpoint: [1920, 1024]
    //hash: true
});

ETA.init({
    animation: 'fade',
    el: document.querySelector('[data-tabs]'),
    id: 'tab',
    trigger: '[data-tabs-trigger]',
    triggerAttr: 'data-tabs-trigger',
    receiver: '[data-tabs-receiver]',
    receiverAttr: 'data-tabs-receiver',
    //hash: true
});
ETA.init({
    animation: 'fade',
    el: document.querySelector('[data-tabs]'),
    id: 'tab',
    trigger: '[data-tabs-trigger]',
    triggerAttr: 'data-tabs-trigger',
    receiver: '[data-tabs-receiver]',
    receiverAttr: 'data-tabs-receiver',
    //hash: true
});
ETA.init({
    animation: 'fade',
    el: document.querySelector('[data-tabs]'),
    id: 'tab',
    trigger: '[data-tabs-trigger]',
    triggerAttr: 'data-tabs-trigger',
    receiver: '[data-tabs-receiver]',
    receiverAttr: 'data-tabs-receiver',
    //hash: true
});
ETA.init({
    animation: 'fade',
    el: document.querySelector('[data-tabs]'),
    id: 'tabtest',
    trigger: '[data-tabs-trigger]',
    triggerAttr: 'data-tabs-trigger',
    receiver: '[data-tabs-receiver]',
    receiverAttr: 'data-tabs-receiver',
    //hash: true
});
const tab = ETA.get('tab');

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
            case 'update-accordion':
                accordion.update();
                break;
            case 'destroy-tab':
                tab.destroy();
                break;
            case 'init-tab':
                break;
        }
    })
});