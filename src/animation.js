export function scrollIntoView(target){
    target.scrollIntoView({
        behavior: 'smooth'
    });
}

export function slideUp(target, duration = 500, fn){
    //this.log(`[animate] slide up`, arguments);

    // before
    target.style.boxSizing = 'border-box';
    target.style.height = target.scrollHeight + 'px';
    setTransition(target, duration);

    // animate
    target.style.height = '0px';

    // end
    setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        removeTransition(target);

        // callback
        if(typeof fn === 'function') fn();
    }, duration);
}

export function slideDown(target, duration = 500, fn){
    //this.log(`[animate] slide down`);

    // before
    target.style.boxSizing = 'border-box';
    target.style.height = '0px';
    target.style.display = 'block';
    setTransition(target, duration);

    // animate
    target.style.height = target.scrollHeight + 'px';

    // end
    setTimeout(() => {
        removeTransition(target);

        // callback
        if(typeof fn === 'function') fn();
    }, duration);
}

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

function setTransition(target, duration){
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.overflow = 'hidden';
}

function removeTransition(target){
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');

    target.style.removeProperty('box-sizing');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
}