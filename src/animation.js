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
 * Slide
 */

export function slideUp(target, duration = 500, fn){
    //this.log(`[animate] slide up`, arguments);

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

export function slideDown(target, duration = 500, fn){
    //this.log(`[animate] slide down`);

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
 * Fade
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

function getElementMarginHeight(el){
    const computedStyle = getComputedStyle(el);
    return parseInt(computedStyle.getPropertyValue('margin-top') + computedStyle.getPropertyValue('margin-bottom'), 10);
}

export function setCSS(target, props){
    Object.assign(target.style, props);
}

function setTransition(target, duration){
    setCSS(target, {
        transitionProperty: "height, margin, padding, opacity",
        transitionDuration: duration + 'ms',
        overflow: 'hidden'
    });
}

function removeTransition(target){
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
