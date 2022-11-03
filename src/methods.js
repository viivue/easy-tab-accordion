import {uniqueId} from "./utils";
import {log} from "./helpers";
import {isLive, responsive, validBreakpoints} from "./responsive";
import {scrollIntoView, setCSS} from "@/animation";
import {getHash} from "@/hash";

export function setupData(context){
    context.options = {
        ...{
            // selectors
            el: document.querySelector(`[${context._attr.container}]`), // DOM element
            id: uniqueId('eta-'),
            trigger: `[${context._attr.trigger}]`, // string selector
            triggerAttr: context._attr.trigger, // attribute name
            receiver: `[${context._attr.receiver}]`, // string selector
            receiverAttr: context._attr.receiver, // attribute name
            activeClass: context._class.active,

            // animation
            animation: 'slide', // slide, fade
            duration: 450,

            // hash
            hash: false, // update hash URL
            hashScroll: false, // scroll into view when page loaded with a valid hash

            // responsive
            liveBreakpoint: [], // [1920, 1024] => destroy if window.width if bigger than 1920 or less than 1024

            // avoid double click
            avoidDoubleClick: true,

            // dev mode => enable console.log
            dev: false,

            // open/close
            activeSection: 0, // default opening sections, will be ignored if there's a valid hash, allow array of index [0,1,2] for slide animation only
            allowCollapseAll: false, // for slide animation only
            allowExpandAll: false, // for slide animation only

            // events
            onBeforeInit: (data) => {
            },
            onAfterInit: (data) => {
            },
            onBeforeOpen: (data, el) => {
            },
            onBeforeClose: (data, el) => {
            },
            onAfterOpen: (data, el) => {
            },
            onAfterClose: (data, el) => {
            },
            onDestroy: (data) => {
            },
            onUpdate: (data) => {
            },
        }, ...context.originalOptions
    };

    if(!context.options.el){
        log(context, 'warn', 'ETA Error, target not found!');
        return;
    }

    context.wrapper = context.options.el;
    context.current_id = '';
    context.previous_id = '';
    context.type = '';
    context.hasInitialized = false;
    context.enabled = validBreakpoints(context) ? isLive(context) : true;
    context.count = context.wrapper.querySelectorAll(context.options.trigger).length;

    // check the condition at openPanel, when calls close others (because there is no active element at begin)
    context.isFirst = true;

    // update hash from attribute
    context.options.hash = context.wrapper.hasAttribute(context._attr.hash) === true ? true : context.options.hash;
    context.options.hashScroll = context.wrapper.hasAttribute(context._attr.hashScroll) === true ? true : context.options.hashScroll;

    // update animation from attribute
    const animationValue = context.wrapper.getAttribute(context._attr.animation);
    context.options.animation = animationValue !== null ? animationValue : context.options.animation;
}


export function initSetup(context){
    // event: onBeforeInit
    context.options.onBeforeInit(context);

    context.hasInitialized = true;
    context.wrapper.classList.add(context._class.enabled);

    // loop through triggers
    context.wrapper.querySelectorAll(context.options.trigger).forEach(trigger => {
        // assign click event
        trigger.addEventListener('click', e => manualTriggerFunction(context, e));
    });

    // loop through receivers
    context.dataset = [];
    context.wrapper.querySelectorAll(context.options.receiver).forEach(el => {
        const id = el.getAttribute(context.options.receiverAttr);
        context.dataset.push({id, el, active: false});

        // setup CSS for fade animation
        if(context.options.animation === 'fade'){
            // tab parent
            setCSS(el.parentElement, {
                overflow: 'hidden',
                position: getComputedStyle(el).position !== 'relative' ? 'relative' : '',
            });

            // tab children
            setCSS(el, {
                position: getComputedStyle(el).position !== 'absolute' ? 'absolute' : '',
                inset: '0 0 auto'
            });
        }
    });

    assignTriggerElements(context);

    // event: onAfterInit
    context.options.onAfterInit(context);
}

function assignTriggerElements(context){
    // find possible trigger and assign click event
    document.querySelectorAll(`a[href^="#"]`).forEach(trigger => {
        const href = trigger.getAttribute('href');
        const id = href[0] === '#' ? href.slice(1) : getHash(href).id;

        if(!id) return;

        context.dataset.forEach(item => {
            if(item.id === id){
                // valid trigger
                trigger.addEventListener('click', e => {
                    e.preventDefault();
                    context.toggle(id, 'manual');
                    scrollIntoView({context});
                });
            }
        });
    });
}


function manualTriggerFunction(context, e){
    e.preventDefault();
    e.stopPropagation();

    const id = e.target.getAttribute(context.options.triggerAttr) || e.target.closest(context.options.trigger).getAttribute(context.options.triggerAttr);
    context.toggle(id, 'manual');
}

export function onResize(context, event){
    context.update();
    responsive(context, event);
}

export function onLoad(context, event){
    context.update();
    responsive(context, event);
}