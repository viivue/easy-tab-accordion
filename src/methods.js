import {responsive} from "./responsive";
import {setCSS, setTransition} from "./animation";
import {getHash, isValidHash} from "./hash";
import {defaultActiveSections} from "./helpers";
import {CLASSES} from './configs';

export function initSetup(context){
    // event: onBeforeInit
    context.events.fire("onBeforeInit");

    context.wrapper.classList.add(CLASSES.enabled);

    // loop through triggers
    context.wrapper.querySelectorAll(context.options.trigger).forEach(trigger => {
        // assign click event
        trigger.addEventListener('click', e => manualTriggerFunction(context, e));

        // add a class to check if the trigger has assigned an event
        trigger.classList.add(CLASSES.hasAssignedTriggerEvent);
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

            const getStyle = () => getComputedStyle(el).position !== 'absolute' ? 'absolute' : '';

            const styleObj = {
                position: getStyle(),
                inset: '0 0 auto'
            };

            // tab children
            setTimeout(() => {
                setCSS(el, styleObj);
            }, 1);
        }

        setTransition(el, context.options.duration);
    });

    assignTriggerElements(context);

    // toggle via hash
    if(context.enabled){
        if(isValidHash(context)){
            context.toggle(getHash().id, 'hash');
        }else{
            defaultActiveSections(context);
        }
    }

    // initialized flag
    context.hasInitialized = true;

    // event: onAfterInit
    context.events.fire("onAfterInit");
}

function assignTriggerElements(context){
    // find possible trigger and assign click event
    document.querySelectorAll(`a[href^="#"]`).forEach(trigger => {
        const href = trigger.getAttribute('href');
        const id = href[0] === '#' ? href.slice(1) : getHash(href).id;

        if(!id) return;

        context.dataset.forEach(item => {
            if(item.id === id){
                // already assigned trigger event
                if(trigger.classList.contains(CLASSES.hasAssignedTriggerEvent)) return;

                // valid trigger
                trigger.addEventListener('click', e => {
                    if(context.options.isPreventDefault){
                        e.preventDefault();
                    }
                    context.toggle(id, 'manual');
                });
            }
        });
    });
}


function manualTriggerFunction(context, e){
    if(context.options.isPreventDefault){
        e.preventDefault();
    }
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