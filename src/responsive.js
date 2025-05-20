import {arraySortInteger} from "./utils";

/**
 * Responsive
 * @param context
 * @param event
 */
export function responsive(context, event){
    if(validBreakpoints(context) && isLive(context) !== context.enabled){
        context.enabled = isLive(context);

        if(context.enabled){
            context.init();
            ETAController.add(context);
        }else{
            context.destroy();
            ETAController.remove(context.id);
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
    return isLiveRange && validBreakpoints(context);
}


/**
 * Has valid live breakpoint
 * @param context
 * @returns {boolean}
 * @since 1.0.0
 */
export function validBreakpoints(context){
    let breakpoints = arraySortInteger(context.options.liveBreakpoint, false);
    breakpoints = breakpoints.slice(0, 2);
    return breakpoints.length === 2;
}