import md from "../md/init.md";

export function testInit(root){
    root.insertAdjacentHTML('beforeend', md);

    ETA.init();

    ETA.init({
        el: document.querySelector('.my-accordion'), // DOM element
        trigger: '[data-trigger]', // CSS selector
        triggerAttr: 'data-trigger', // attribute name
        receiver: '.content', // CSS selector
        receiverAttr: 'id', // attribute name
        scrollIntoView: true
    });
}