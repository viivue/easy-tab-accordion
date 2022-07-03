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

export function getIndexById(context, id){
    return context.receiver_ids.findIndex(x => x.id === id);
}

// get elements (receiver/trigger) by ID
export function getElements(context, id, isReceiver = true){
    const selector = isReceiver ? context.options.receiver : context.options.trigger;
    const attr = isReceiver ? context.options.receiverAttr : context.options.triggerAttr;

    const previous = context.wrapper.querySelectorAll(`${selector}:not([${attr}="${id}"])`);
    const current = context.wrapper.querySelectorAll(`[${attr}="${id}"]`);

    return {previous, current};
}