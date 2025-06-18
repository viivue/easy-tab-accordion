import {manualTriggerFunction} from "@/methods";

export function addAccessibilitySupport(context, trigger) {
    trigger.setAttribute('role', 'button');
    if (context.options.a11ySupport) {
        // add tabindex to improve accessibility
        trigger.setAttribute('tabindex', '0');
        // add event interaction support (accessibility)
        trigger.addEventListener('keydown', e => {
            if(e.key !== " " && e.key !== "Enter"){
                return;
            }
            // Support accessible interaction via Enter or Space keys.
            manualTriggerFunction(context, e);
        });
    }
}