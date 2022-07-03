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
 * Get margin height of element
 * @param el
 * @returns {number}
 */
export function getElementMarginHeight(el){
    const computedStyle = getComputedStyle(el);
    return parseInt(computedStyle.getPropertyValue('margin-top') + computedStyle.getPropertyValue('margin-bottom'), 10);
}


/**
 * Set CSS
 * @param target
 * @param props
 */
export function setCSS(target, props){
    Object.assign(target.style, props);
}


/**
 * Set transition
 * @param target
 * @param duration
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
