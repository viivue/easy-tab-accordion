import {removeActiveClass} from "./helpers";
import {getElementMarginHeight, removeTransition, setCSS, setTransition} from "./animation";


/**
 * Fade Out
 * @param target
 * @param duration
 * @param fn
 */
export function fadeOut(target, duration = 500, fn){
    // before
    setTransition(target, duration);

    // animate
    setCSS(target, {
        opacity: '0',
        visibility: 'hidden'
    });

    // end
    setTimeout(() => {
        removeTransition(target);

        // callback
        if(typeof fn === 'function') fn();
    }, duration);
}


/**
 * Fade In
 * @param target
 * @param duration
 * @param fn
 */
export function fadeIn(target, duration = 500, fn){
    // before
    setTransition(target, duration);
    setTransition(target.parentElement, duration);

    // animate
    setCSS(target, {
        opacity: '1',
        visibility: 'visible'
    });
    setCSS(target.parentElement, {height: `${target.scrollHeight + getElementMarginHeight(target)}px`});

    // end
    setTimeout(() => {
        removeTransition(target);
        removeTransition(target.parentElement);

        // callback
        if(typeof fn === 'function') fn();
    }, duration);
}


/**
 * Destroy Fade
 * @param context
 */
export function destroyFade(context){
    context.wrapper.querySelectorAll(context.options.receiver).forEach(target => {
        setCSS(target, {
            opacity: '',
            visibility: '',
            position: '',
            inset: ''
        });
        setCSS(target.parentElement, {
            height: '',
            position: ''
        });

        removeTransition(target);
        removeTransition(target.parentElement);
    });

    removeActiveClass(context);
}