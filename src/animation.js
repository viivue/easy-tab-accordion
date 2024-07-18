/**
 * Scroll into view
 * @param context
 * @param target
 * @since 1.0.0
 */
export function scrollIntoView({context, target}){
    const parentTarget = target.parentNode;

    // skip auto trigger
    if(context.type === 'auto') return;

    // animation:fade => change target to wrapper
    if(context.options.animation === 'fade'){
        target = context.wrapper;
    }

    // scroll to wrapper if target is not set
    if(!target){
        target = context.wrapper;
    }

    if(typeof jQuery !== 'undefined'){
        jQuery('html,body').animate({
            scrollTop: parentTarget.offsetTop
        });
    }else{
        window.scrollTo({
            top: parentTarget.offsetTop,
            behavior: 'smooth'
        });
    }
}


/**
 * Get margin height of element
 * @param el
 * @returns {number}
 * @since 2.0.0
 */
export function getElementMarginHeight(el){
    const computedStyle = getComputedStyle(el);
    return parseInt(computedStyle.getPropertyValue('margin-top') + computedStyle.getPropertyValue('margin-bottom'), 10);
}


/**
 * Get element height including margin
 * @param target
 * @returns {string}
 */
export function getElementHeight(target){
    return target.scrollHeight + getElementMarginHeight(target) + 'px';
}


/**
 * Set CSS
 * @param target
 * @param props
 * @since 2.0.0
 */
export function setCSS(target, props){
    Object.assign(target.style, props);
}


/**
 * Set transition
 * @param target
 * @param duration
 * @since 2.0.0
 */
export function setTransition(target, duration){
    setCSS(target, {
        transitionProperty: "height, margin, padding, opacity",
        transitionDuration: duration + 'ms',
        overflow: 'hidden'
    });
}


/**
 * Remove transition
 * @param target
 * @since 2.0.0
 */
export function removeTransition(target){
    setCSS(target, {
        boxSizing: '',
        paddingTop: '',
        paddingBottom: '',
        marginTop: '',
        marginBottom: ''
    });
}
