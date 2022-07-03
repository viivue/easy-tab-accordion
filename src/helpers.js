/**
 * Check if is in live breakpoint
 * @param context
 * @returns {boolean}
 * @since 1.0.0
 */
export function isLive(context){
    const isLiveRange = window.innerWidth <= context.options.liveBreakpoint[0] && window.innerWidth >= context.options.liveBreakpoint[1];
    return isLiveRange && hasLiveBreakpoint(context);
}


/**
 * Has valid live breakpoint
 * @param context
 * @returns {boolean}
 * @since 1.0.0
 */
export function hasLiveBreakpoint(context){
    return context.options.liveBreakpoint.length === 2;
}


/**
 * Has valid id
 * @param context
 * @param id
 * @returns {boolean}
 * @since 2.0.0
 */
export function validID(context, id){
    return !!context.receiver_ids.filter(i => i.id === id).length;
}


/**
 * Get toggle state
 * @param context
 * @param id
 * @returns {boolean|number|number}
 * @since 2.0.0
 */
export function getToggleState(context, id){
    if(!validID(context, id)) return false;
    // close: -1
    // open: 1
    // exit: 0

    const open = context.receiver_ids[getIndexById(context, id)].active;
    const allowCollapseAll = context.options.animation === 'slide' ? context.options.allowCollapseAll : false;

    // is open and allow collapse all => close
    if(open && allowCollapseAll) return -1;

    // is open and not allow collapse all => close
    if(open && !allowCollapseAll) return 0;

    // is close and allow collapse all => open
    if(!open && allowCollapseAll) return 1;

    // is close and not allow collapse all => open
    if(!open && !allowCollapseAll) return 1;

    return open ? 1 : -1;
}


/**
 * Get elements (receiver/trigger) by ID
 * @param context
 * @param id
 * @returns {{currentTrigger: NodeListOf<Element>, current: NodeListOf<Element>, previous: NodeListOf<Element>, previousTrigger: NodeListOf<Element>}}
 * @since 2.0.0
 */
export function getElements(context, id){
    const selector = isReceiver => isReceiver ? context.options.receiver : context.options.trigger;
    const attr = isReceiver => isReceiver ? context.options.receiverAttr : context.options.triggerAttr;

    const previous = context.wrapper.querySelectorAll(`${selector(true)}:not([${attr(true)}="${id}"])`);
    const current = context.wrapper.querySelectorAll(`[${attr(true)}="${id}"]`);

    const previousTrigger = context.wrapper.querySelectorAll(`${selector(false)}:not([${attr(false)}="${id}"])`);
    const currentTrigger = context.wrapper.querySelectorAll(`[${attr(false)}="${id}"]`);

    return {previous, current, previousTrigger, currentTrigger};
}


/**
 * Get index by ID
 * @param context
 * @param id
 * @returns {number}
 * @since 2.0.0
 */
export function getIndexById(context, id){
    return context.receiver_ids.findIndex(x => x.id === id);
}


/**
 * Get ID by index
 * @param context
 * @param index
 * @returns {*}
 * @since 2.0.0
 */
export function getIdByIndex(context, index){
    return context.receiver_ids[index].id;
}


/**
 * Remove active class
 * @param context
 * @param id
 * @since 2.0.0
 */
export function removeActiveClass(context, id){
    const {current, currentTrigger} = getElements(context, id ? id : context.current_id);

    // update classes
    current.forEach(item => item.classList.remove(context._class.active));
    currentTrigger.forEach(item => item.classList.remove(context._class.active));
}


/**
 * Add active class
 * @param context
 * @param id
 * @since 2.0.0
 */
export function addActiveClass(context, id){
    const {current, currentTrigger} = getElements(context, id ? id : context.current_id);

    // update classes
    if(current) current.forEach(item => item.classList.add(context._class.active));
    if(currentTrigger) currentTrigger.forEach(item => item.classList.add(context._class.active));
}