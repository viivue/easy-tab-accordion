import {setCSS, setTransition, removeTransition, getElementMarginHeight} from "./animation";


/**
 * Slide Up
 * @param target
 * @param duration
 * @param fn
 * @since 1.0.0
 */
export function slideUp(target, duration = 500, fn){
    // before
    setCSS(target, {
        boxSizing: 'border-box',
        height: target.scrollHeight + 'px'
    });
    setTransition(target, duration);

    // animate
    setCSS(target, {
        height: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
    });

    // end
    setTimeout(() => {
        setCSS(target, {
            display: 'none',
            height: ''
        });
        removeTransition(target);

        // callback
        if(typeof fn === 'function') fn();
    }, duration);
}


/**
 * Slide Down
 * @param target
 * @param duration
 * @param fn
 * @since 1.0.0
 */
export function slideDown(target, duration = 500, fn){
    // before
    setCSS(target, {
        boxSizing: 'border-box',
        height: '0px',
        display: 'block'
    });
    setTransition(target, duration);

    // animate
    setCSS(target, {
        height: `${target.scrollHeight + getElementMarginHeight(target)}px`,
        marginTop: '',
        marginBottom: '',
        paddingTop: '',
        paddingBottom: '',
    });

    // end
    setTimeout(() => {
        removeTransition(target);

        // callback
        if(typeof fn === 'function') fn();
    }, duration);
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
}


/**
 * Update Slide
 * @param context
 */
export function updateSlide(context){
    context.receiver_ids.forEach(item => {
        const target = item.el;
        const duration = context.options.duration;

        if(item.active) slideDown(target, duration);
        if(!item.active) slideUp(target, duration);
    });
}