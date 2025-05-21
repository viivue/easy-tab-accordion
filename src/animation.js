/**
 * Scroll into view
 * @since 1.0.0
 */
export function scrollIntoView({context, offset}){
    const target = context.wrapper;

    // skip auto trigger
    if(context.type === 'auto'){
        if(context.options.dev) console.log(`Skip scrollIntoView for auto trigger.`);
        return;
    }

    // animation:fade => change target to wrapper
    // if(context.options.animation === 'fade'){
    //     target = context.wrapper;
    // }

    // scroll to wrapper if target is not set
    // if(!target){
    //     target = context.wrapper;
    // }

    // Calculate the true distance from the top of the document
    offset = offset ? offset : parseInt(context.options.scrollOffset) || 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

    // Use jQuery if available
    if(typeof jQuery !== 'undefined'){
        jQuery('html, body').animate({
            scrollTop: targetPosition
        }, 500); // 500ms animation duration
    }else{
        // Use native smooth scrolling (modern browsers)
        window.scrollTo({
            top: targetPosition,
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
        transitionProperty: "all",
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
