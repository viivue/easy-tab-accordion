import {arrayUnique, isEmptyString} from "./utils";


/**
 * Has valid id
 * @param context
 * @param id
 * @returns {boolean}
 * @since 2.0.0
 */
export function validID(context, id){
    return !!context.dataset.filter(i => i.id === id).length;
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

    // check if option is avoid double click
    if(context.options.avoidDoubleClick){
        if(context.isAnimating){
            log(context, 'warn', `Block [${id}] to avoid double click on animating item.`);
            return 0;
        }
    }

    const open = context.dataset[getIndexById(context, id)].active;
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


export function defaultActiveSections(context){
    let activeIndexes = [];
    const activeSection = context.options.activeSection;

    switch(context.options.animation){
        case 'slide':
            switch(typeof activeSection){
                case "number":
                    activeIndexes.push(activeSection);
                    break;
                case "object":
                    if(context.options.allowExpandAll && context.options.animation === 'slide'){
                        // only allow to activate multiple sections when allow to expand all
                        activeIndexes = arrayUnique(activeSection);
                    }else{
                        // if not allow to expand all => only expand the first index
                        activeIndexes.push(activeSection[0]);
                    }
                    break;
            }
            break;
        case 'fade':
            // fade animation always have one active section
            switch(typeof activeSection){
                case "number":
                    activeIndexes.push(isValidIndex(context, activeSection) ? activeSection : 0);
                    break;
                case "object":
                    const firstIndex = activeSection[0];
                    activeIndexes.push(isValidIndex(context, firstIndex) ? firstIndex : 0);
                    break;
            }
            break;
    }

    activeIndexes.forEach(index => {
        if(!isValidIndex(context, index)) return;
        context.toggle(getIdByIndex(context, index), 'auto');
    });

    // close not active sections
    context.dataset.filter(item => !item.active).forEach(item => context.closePanel(item.id));
}

function isValidIndex(context, index){
    return index >= 0 && index < context.count;
}


/**
 * Get elements (receiver/trigger) by ID
 * @param context
 * @param id
 * @returns {{currentTrigger: NodeListOf<Element>, current: NodeListOf<Element>}}
 * @since 2.0.0
 */
export function getElements(context, id){
    const selector = isReceiver => isReceiver ? context.options.receiver : context.options.trigger;
    const attr = isReceiver => isReceiver ? context.options.receiverAttr : context.options.triggerAttr;

    if(id){
        const previous = context.wrapper.querySelectorAll(`${selector(true)}:not([${attr(true)}="${id}"])`);
        const current = context.wrapper.querySelectorAll(`[${attr(true)}="${id}"]`);

        const previousTrigger = context.wrapper.querySelectorAll(`${selector(false)}:not([${attr(false)}="${id}"])`);
        const currentTrigger = context.wrapper.querySelectorAll(`[${attr(false)}="${id}"]`);

        return {previous, current, previousTrigger, currentTrigger};
    }else{
        const current = context.wrapper.querySelectorAll(`[${attr(true)}]`);
        const currentTrigger = context.wrapper.querySelectorAll(`[${attr(false)}]`);

        return {current, currentTrigger};
    }
}


/**
 * Get index by ID
 * @param context
 * @param id
 * @returns {number}
 * @since 2.0.0
 */
export function getIndexById(context, id){
    return context.dataset.findIndex(x => x.id === id);
}


/**
 * Get ID by index
 * @param context
 * @param index
 * @returns {*}
 * @since 2.0.0
 */
export function getIdByIndex(context, index){
    return context.dataset[index].id;
}


/**
 * Remove active class
 * @param context
 * @param id
 * @since 2.0.0
 */
export function removeActiveClass(context, id){
    const {current, currentTrigger} = getElements(context, id);

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

export function log(context, status, ...message){
    if(context.options.dev){
        console?.[status](...message);
    }
}


/**
 * Get JSON options
 * ID priority: data-attribute > selector#id > unique id
 * @version 0.0.1
 * @returns {object}
 */
export function getOptions(context, defaultOptions){
    if(!defaultOptions){
        defaultOptions = context.options || context.config || {};
    }

    const numeric = ['duration', 'activeSection']; // convert these props to float
    const wrapper = context.wrapper;

    // options from attribute
    let dataAttribute = wrapper.getAttribute(context._attr.container);
    let options = {};

    // data attribute doesn't exist or not JSON format -> string
    const attributeIsNotJSON = !dataAttribute || !isJSON(dataAttribute);

    // data attribute is not json format or string
    if(attributeIsNotJSON){
        options = {...defaultOptions};

        // data attribute exist => string
        if(dataAttribute) options.id = dataAttribute;
        else options.id = '';
    }else{
        options = JSON.parse(dataAttribute);

        for(const [key, value] of Object.entries(options)){
            // convert boolean string to real boolean
            if(value === "false") options[key] = false;
            else if(value === "true") options[key] = true;
            // convert string to float
            else if(numeric.includes(key) && typeof value === 'string' && value.length > 0) options[key] = parseFloat(value);
            else options[key] = value;
        }
    }

    // reassign id
    const id = options.id || wrapper.id || defaultOptions.id;
    context.id = id;
    options.id = id;

    options = {...defaultOptions, ...options};

    return options;
}


/**
 * Is JSON string
 * https://stackoverflow.com/a/32278428/6453822
 * @param string
 * @returns {any|boolean}
 */
function isJSON(string){
    try{
        return (JSON.parse(string) && !!string);
    }catch(e){
        return false;
    }
}