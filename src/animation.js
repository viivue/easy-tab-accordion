import {removeActiveClass} from "./helpers";

/**
 * Scroll into view
 * @param target
 */
export function scrollIntoView(target){
    target.scrollIntoView({
        behavior: 'smooth'
    });
}


/**
 * Fade
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

export function fadeIn(target, duration = 500, fn){
    // before
    setTransition(target, duration);
    setTransition(target.parentElement, duration);

    // animate
    setCSS(target, {
        opacity: '1',
        visibility: 'visible'
    });

    // update parent height
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
 * Helpers
 */

export function getElementMarginHeight(el){
    const computedStyle = getComputedStyle(el);
    return parseInt(computedStyle.getPropertyValue('margin-top') + computedStyle.getPropertyValue('margin-bottom'), 10);
}

export function setCSS(target, props){
    Object.assign(target.style, props);
}

export function setTransition(target, duration){
    setCSS(target, {
        transitionProperty: "height, margin, padding, opacity",
        transitionDuration: duration + 'ms',
        overflow: 'hidden'
    });
}

export function removeTransition(target){
    setCSS(target, {
        overflow: '',
        transitionProperty: '',
        transitionDuration: '',
        boxSizing: '',
        paddingTop: '',
        paddingBottom: '',
        marginTop: '',
        marginBottom: ''
    });
}
