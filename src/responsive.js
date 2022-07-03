/**
 * Responsive
 * @param context
 * @param event
 */
export function responsive(context, event){
    if(hasLiveBreakpoint(context) && isLive(context) !== context.enabled){
        context.enabled = isLive(context);

        if(context.enabled){
            context.init();

            // toggle the current one or the first one
            context.toggle(context.current_id || context.receiver_ids[0].id, 'auto', true);
        }else{
            context.destroy();
        }
    }
}


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