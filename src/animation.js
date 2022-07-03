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
        height: target.scrollHeight + 'px',
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

function setTransition(target, duration){
    setCSS(target, {
        transitionProperty: "height, margin, padding",
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
        marginBottom: '',
    });
}

function setCSS(target, props){
    Object.assign(target.style, props);
}

/**
 * Fade
 */

export function fadeOut(target, duration = 500, fn){
    target.style.opacity = '0';
    target.style.visibility = 'hidden';

    // end
    setTimeout(() => {
        // callback
        if(typeof fn === 'function') fn();
    }, duration);
}

export function fadeIn(target, duration = 500, fn){
    target.style.bottom = '';
    target.style.opacity = '1';
    target.style.visibility = 'visible';

    // update parent height
    target.parentElement.style.height = `${target.offsetHeight}px`;
    target.style.bottom = '0';

    // end
    setTimeout(() => {
        // callback
        if(typeof fn === 'function') fn();
    }, duration);
}