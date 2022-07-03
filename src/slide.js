import {setCSS, setTransition, removeTransition, getElementHeight} from "./animation";


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
    if(height === '0px') return;

    // before
    setCSS(target, {
        boxSizing: 'border-box',
        height
    });
    setTransition(target, duration);

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
    // before
    setCSS(target, {
        boxSizing: 'border-box',
        height: '0px',
        display: 'block'
    });
    setTransition(target, duration);

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
}


/**
 * Update Slide
 * @param context
 */
export function updateSlide(context){
    // slide animation can update size using default behavior of CSS height:auto

    // context.receiver_ids.forEach(item => {
    //     const target = item.el;
    //     const duration = context.options.duration;
    //
    //     if(item.active) slideDown(target, duration);
    //     if(!item.active) slideUp(target, duration);
    // });
}