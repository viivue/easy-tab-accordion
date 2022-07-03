// check if is in live breakpoint
export function isLive(context){
    const isLiveRange = window.innerWidth <= context.options.liveBreakpoint[0] && window.innerWidth >= context.options.liveBreakpoint[1];
    return isLiveRange && hasLiveBreakpoint(context);
}

export function hasLiveBreakpoint(context){
    return context.options.liveBreakpoint.length === 2;
}

export function validID(context, id){
    return !!context.receiver_ids.filter(i => i.id === id).length;
}

export function getToggleState(context, id){
    if(!validID(context, id)) return;
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

// get elements (receiver/trigger) by ID
export function getElements(context, id){
    const selector = isReceiver => isReceiver ? context.options.receiver : context.options.trigger;
    const attr = isReceiver => isReceiver ? context.options.receiverAttr : context.options.triggerAttr;

    const previous = context.wrapper.querySelectorAll(`${selector(true)}:not([${attr(true)}="${id}"])`);
    const current = context.wrapper.querySelectorAll(`[${attr(true)}="${id}"]`);

    const previousTrigger = context.wrapper.querySelectorAll(`${selector(false)}:not([${attr(false)}="${id}"])`);
    const currentTrigger = context.wrapper.querySelectorAll(`[${attr(false)}="${id}"]`);

    return {previous, current, previousTrigger, currentTrigger};
}

export function getIndexById(context, id){
    return context.receiver_ids.findIndex(x => x.id === id);
}

export function getIdByIndex(context, index){
    return context.receiver_ids[index].id;
}

export function removeActiveClass(context, id){
    const {current, currentTrigger} = getElements(context, id ? id : context.current_id);

    // update classes
    current.forEach(item => item.classList.remove(context._class.active));
    currentTrigger.forEach(item => item.classList.remove(context._class.active));
}

export function addActiveClass(context, id){
    const {current, currentTrigger} = getElements(context, id ? id : context.current_id);

    // update classes
    if(current) current.forEach(item => item.classList.add(context._class.active));
    if(currentTrigger) currentTrigger.forEach(item => item.classList.add(context._class.active));
}