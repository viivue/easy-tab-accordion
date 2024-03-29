import {setCSS, removeTransition, getElementHeight} from "./animation";
import {removeActiveClass} from "./helpers";


/**
 * Slide Up
 * @param target
 * @param duration
 * @param fn
 * @since 1.0.0
 */
export function slideUp(target, duration = 500, fn){
    // skip if already closed
    const height = getElementHeight(target);
    if(height === '0px'){
        // callback
        if(typeof fn === 'function') fn();
        return;
    }

    // before
    setCSS(target, {
        boxSizing: 'border-box',
        height
    });

    // animate (set 10ms delay for CSS transition take effect)
    setTimeout(() => {
        setCSS(target, {
            height: '0px',
            marginTop: '0px',
            marginBottom: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
        });
    }, 10);

    // end
    setTimeout(() => {
        setCSS(target, {
            display: 'none',
            height: ''
        });
        removeTransition(target);

        // callback
        if(typeof fn === 'function') fn();
    }, duration + 10);
}


/**
 * Slide Down
 * @param target
 * @param duration
 * @param fn
 * @since 1.0.0
 */
export function slideDown(target, duration = 500, fn){
    // not reset if is already open
    // check display:none because sometimes the browser has a wrong calculation of target's height when it is visible!
    if(parseInt(getElementHeight(target)) === 0 || target.style.display.trim() === 'none'){
        // before
        setCSS(target, {
            boxSizing: 'border-box',
            height: '0px',
            display: 'block'
        });
    }

    // animate (set 10ms delay for CSS transition take effect)
    setTimeout(() => {
        setCSS(target, {
            height: getElementHeight(target),
            marginTop: '',
            marginBottom: '',
            paddingTop: '',
            paddingBottom: '',
        });
    }, 10);

    // end
    setTimeout(() => {
        removeTransition(target);
        setCSS(target, {height: ''});

        // callback
        if(typeof fn === 'function') fn();
    }, duration + 10);
}


/**
 * Destroy Slide
 * @param context
 * @since 2.0.0
 */
export function destroySlide(context){
    context.wrapper.querySelectorAll(context.options.receiver).forEach(target => {
        setCSS(target, {
            display: '',
            height: ''
        });

        removeTransition(target);
    });

    removeActiveClass(context);
}


/**
 * Update Slide
 * @param context
 */
export function updateSlide(context){
    // slide animation can update size using default behavior of CSS height:auto

    // context.dataset.forEach(item => {
    //     const target = item.el;
    //     const duration = context.options.duration;
    //
    //     if(item.active) slideDown(target, duration);
    //     if(!item.active) slideUp(target, duration);
    // });
}