import {slideDown, slideUp, destroySlide, updateSlide} from "./slide";
import {fadeIn, fadeOut, destroyFade, updateFade} from "./fade";
import {hashScroll, updateURL} from "./hash";
import {
    validID,
    getToggleState,
    getPanelIndexById,
    getElements,
    removeActiveClass, addActiveClass, getIdByIndex, log
} from "./helpers";
import {debounce, uniqueId} from "./utils";
import {initSetup, onLoad, onResize} from "./methods";
import {isLive, validBreakpoints} from "./responsive";
import {scrollIntoView} from "./animation";
import {CLASSES, ATTRS, DEFAULTS} from './configs';
import {EventsManager, getOptionsFromAttribute} from "@phucbm/os-util";

export class EasyTabAccordion{
    constructor(options){
        // update options
        this.options = {...DEFAULTS, id: uniqueId('eta-'), ...options};
        if(!this.options.el){
            log(this, 'warn', 'ETA Error, target not found!');
            return;
        }

        // get options init by data attribute (JSON format)
        this.options = getOptionsFromAttribute({
            target: this.options.el,
            defaultOptions: this.options,
            attributeName: ATTRS.container,
            numericValues: ['duration', 'activeSection'],
            dev: DEFAULTS.dev
        });

        // init events manager
        this.events = new EventsManager(this, {
            names: ['onBeforeInit', 'onAfterInit', 'onBeforeOpen', 'onBeforeClose', 'onAfterOpen', 'onAfterClose', 'onDestroy', 'onUpdate'],
        });

        // init
        this.init();

        // avoid double click
        this.isAnimating = false;
    }

    /******************************
     * EVENTS
     ******************************/
    /**
     * Assign late-events
     */
    on(eventName, callback){
        this.events.add(eventName, callback);
    };

    init(){
        this.wrapper = this.options.el;
        this.id = this.options.id;
        this.current_id = '';
        this.previous_id = '';
        this.type = '';
        this.hasInitialized = false;
        this.enabled = validBreakpoints(this) ? isLive(this) : true;
        this.count = this.wrapper.querySelectorAll(this.options.trigger).length;

        // check duplicated ID
        const isDuplicatedID = !!window.ETAController.get(this.id);
        if(isDuplicatedID){
            console.warn(`Found duplicated ID: "${this.id}", the ID should be unique.`)
        }

        // check if ETA has already initialized
        if(this.wrapper.classList.contains(CLASSES.enabled)){
            log(this, 'ETA has initialized');
            return;
        }

        // check the condition at openPanel, when calls close others (because there is no active element at begin)
        this.isFirst = true;

        // update hash from attribute
        this.options.hash = this.wrapper.hasAttribute(ATTRS.hash) === true ? true : this.options.hash;
        this.options.hashScroll = this.wrapper.hasAttribute(ATTRS.hashScroll) === true ? true : this.options.hashScroll;
        // update animation from attribute
        const animationValue = this.wrapper.getAttribute(ATTRS.animation);
        this.options.animation = animationValue !== null ? animationValue : this.options.animation;

        // assign id to wrapper
        this.wrapper.setAttribute(ATTRS.container, this.id);

        if(this.count < 1){
            log(this, 'warn', 'Quit init due to child panels not found', this);
            return;
        }

        // init
        if(this.enabled && !this.hasInitialized) initSetup(this);
        if(!this.enabled && this.hasInitialized) this.destroy();

        // watch for resize/load events
        window.addEventListener('resize', debounce(e => onResize(this, e), 300));
        window.addEventListener('load', e => onLoad(this, e));

        window.ETAController.add(this);
    }

    /******************************
     * Methods: ETA
     ******************************/
    destroy(){
        this.hasInitialized = false;
        this.wrapper.classList.remove(CLASSES.enabled);

        // loop through triggers
        this.wrapper.querySelectorAll(this.options.trigger).forEach(trigger => {
            trigger.outerHTML = `${trigger.outerHTML}`; // a trick to remove all events by cloning itself
        });

        // loop through receivers
        this.dataset = [];

        // reset CSS for fade animation
        switch(this.options.animation){
            case "slide":
                destroySlide(this);
                break;
            case "fade":
                destroyFade(this);
                break;
        }

        // Remove instance
        window.ETAController.remove(this.id);

        // event: onDestroy
        this.events.fire('onDestroy');
    }

    update(){
        switch(this.options.animation){
            case "slide":
                updateSlide(this);
                break;
            case "fade":
                updateFade(this);
                break;
        }

        // event: onUpdate
        this.events.fire('onUpdate');
    }


    /******************************
     * Methods: Panel
     ******************************/
    openPanel(panelId = this.current_id, isStrict = false){
        panelId = `${panelId}`;
        if(!validID(this, panelId)) return;
        const panel = this.getPanelByID(panelId);

        // only open when is currently closing
        if(isStrict && panel.active){
            log(this, 'warn', `openPanel(${panelId}) does not run as the panel is already opened!`);
            return;
        }

        const beforeOpen = () => {
            // update section status
            //this.dataset[getPanelIndexById(this, id)].active = true;
            this.getPanelByID(panelId).active = true;

            // update URL
            updateURL(this, panelId);

            // events
            this.events.fire('onBeforeOpen', {
                type: this.type,
                current_id: this.current_id,
                previous_id: this.previous_id,
            });
        };

        // event: on Before Open
        beforeOpen();

        // event: on After Open
        const afterOpen = (target) => {
            hashScroll(this);

            // scroll into view
            if(this.options.scrollIntoView){
                scrollIntoView({context: this, target});
            }

            // toggle animating status
            this.isAnimating = false;
            log(this, 'log', 'Stop animation.');

            this.events.fire('onAfterOpen', {
                target,
                type: this.type,
                current_id: this.current_id,
                previous_id: this.previous_id,
            });

            // log
            log(this, 'log', 'after open', panelId);
        };

        // open
        const {current} = getElements(this, panelId);
        switch(this.options.animation){
            case 'slide':
                current.forEach(el => slideDown(el, this.options.duration, () => afterOpen(el)));
                break;
            case 'fade':
                current.forEach(el => fadeIn(el, this.options.duration, () => afterOpen(el)));
                break;
        }

        // update classes
        addActiveClass(this, panelId);

        // close all others
        const closeAllOthers = this.options.animation === 'fade' || this.options.animation === 'slide' && !this.options.allowExpandAll;
        if(closeAllOthers) this.dataset.filter(x => x.id !== panelId).forEach(item => {
            if(item.active || this.isFirst){
                this.closePanel(item.id);
            }
        });
        if(this.isFirst){
            current[0].style.display = 'block';
            this.isFirst = false;
        }
    }

    closePanel(panelId = this.current_id, isStrict = false){
        if(!validID(this, panelId)) return;
        const panel = this.getPanelByID(panelId);

        // only open when is currently closing
        if(isStrict && !panel.active){
            console.warn(`closePanel(${panelId}) does not run as the panel is already closed!`);
            return;
        }

        // event: on Before Close
        this.events.fire('onBeforeClose', {
            type: this.type,
            current_id: this.current_id,
            previous_id: this.previous_id,
        });

        // event: on After Close
        //this.dataset[getPanelIndexById(this, id)].active = false;
        this.getPanelByID(panelId).active = false;
        const afterClose = (target) => {
            this.events.fire('onAfterClose', {target});

            // toggle animating status
            this.isAnimating = false;
            log(this, 'log', 'Stop animation.');

            // log
            log(this, 'log', 'after close', panelId);
        };

        // close animation
        const {current} = getElements(this, panelId);
        switch(this.options.animation){
            case 'slide':
                current.forEach(el => slideUp(el, this.options.duration, () => afterClose(el)));
                break;
            case 'fade':
                current.forEach(el => fadeOut(el, this.options.duration, () => afterClose(el)));
                break;
        }

        // update classes
        removeActiveClass(this, panelId);
    }

    getPanelByID(panelId){
        return this.dataset[getPanelIndexById(this, panelId)];
    }

    toggle(id, type = 'undefined', force = false){
        // exit if id is not found
        if(!validID(this, id)){
            log(this, 'warn', 'invalid id');
            return;
        }

        const toggleState = getToggleState(this, id);
        if(toggleState === 0) return;

        // start animation
        this.isAnimating = true;
        log(this, 'log', 'Start animation.');

        // update data
        this.type = type;
        this.previous_id = this.current_id ? this.current_id : getIdByIndex(this, 0);
        this.current_id = id;
        if(toggleState === 1){
            // open
            this.openPanel(this.current_id);
        }else{
            // close
            this.closePanel(id);
        }
    }

    expandAll(){
        // only allow to expand all when allow to expand all
        if(!this.options.allowExpandAll) return;
        this.dataset.forEach(({active, id}) => {
            if(!active){
                this.openPanel(id);
            }
        });
    }

    toggleByIndex(index){
        this.toggle(getIdByIndex(this, index));
    }
}

/**
 * Private class Controller
 * This class will hold instances of the library's objects
 */
class Controller{
    constructor(){
        this.instances = [];
    }

    add(instance){
        if(this.instances.filter(item => item.id === instance.id).length > 0) return;
        this.instances.push(instance);
    }

    get(id){
        return this.instances.filter(instance => instance.id === id)[0];
    }

    remove(id){
        this.instances = this.instances.filter(instance => {
            if(instance.id !== id) return true;
            if(instance.hasInitialized) instance.destroy();
            return false;
        });
    }
}


/**
 * Public library data
 * access via window.ETAController
 */
window.ETAController = new Controller();

/**
 * Public library object
 * access via window.ETA
 */
window.ETA = {
    // init new instances
    init: (options = undefined) => {
        // no param
        if(typeof options === 'undefined'){
            // init with attribute
            document.querySelectorAll('[data-eta]').forEach(el => {
                new EasyTabAccordion({el, ...options});
            });
            return;
        }

        new EasyTabAccordion(options);
    },
    // Get instance object by ID
    get: id => window.ETAController.get(id)
};

window.ETA.init();