/**
 * Scroll into view
 * @param context
 * @param target
 * @since 1.0.0
 */
export function scrollIntoView({context, target}){
    // scroll to wrapper if target is not set
    if(!target) target = context.wrapper;

    target.scrollIntoView({
        behavior: 'smooth'
    });
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
