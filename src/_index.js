import {slideDown, slideUp, destroySlide, updateSlide} from "./slide";
import {fadeIn, fadeOut, destroyFade, updateFade} from "./fade";
import {getHash, isValidHash, hashScroll, updateURL} from "./hash";
import {
    validID,
    getToggleState,
    getIndexById,
    getElements,
    removeActiveClass, addActiveClass, getIdByIndex, defaultActiveSections, log, getOptions
} from "./helpers";
import {debounce} from "./utils";
import {initSetup, onLoad, onResize} from "./methods";
import {isLive, validBreakpoints} from "./responsive";
import {scrollIntoView} from "./animation";
import {EventsManager} from '@phucbm/os-util'
import {DEFAULTS} from './configs'

export class EasyTabAccordion{
    constructor(options){
        this._class = {
            enabled: 'easy-tab-accordion-enabled',
            active: 'active',
            hasAssignedTriggerEvent: 'assigned-trigger-event'
        };
        this._attr = {
            container: 'data-eta',
            trigger: 'data-eta-trigger',
            receiver: 'data-eta-receiver',
            hash: 'data-eta-hash',
            hashScroll: 'data-eta-hash-scroll',
            animation: 'data-eta-animation',
        };

        // init events manager
        this.events = new EventsManager(this, {
            names: ['onBeforeInit', 'onAfterInit', 'onBeforeOpen', 'onBeforeClose', 'onAfterOpen', 'onAfterClose', 'onDestroy', 'onUpdate']
        });


        // save options
        this.originalOptions = options;
        // init
        this.init();

        // avoid double click
        this.isAnimating = false;
    }

    init(){
        // setup
        this.options = {...DEFAULTS, ...this.originalOptions};

        if(!this.options.el){
            log(this, 'warn', 'ETA Error, target not found!');
            return;
        }

        this.wrapper = this.options.el;
        this.id = '';
        this.current_id = '';
        this.previous_id = '';
        this.type = '';
        this.hasInitialized = false;
        this.enabled = validBreakpoints(this) ? isLive(this) : true;
        this.count = this.wrapper.querySelectorAll(this.options.trigger).length;

        // check if ETA has already initialized
        if(this.wrapper.classList.contains(this._class.enabled)){
            log(this, 'ETA has initialized');
            return;
        }

        // check the condition at openPanel, when calls close others (because there is no active element at begin)
        this.isFirst = true;

        // update hash from attribute
        this.options.hash = this.wrapper.hasAttribute(this._attr.hash) === true ? true : this.options.hash;
        this.options.hashScroll = this.wrapper.hasAttribute(this._attr.hashScroll) === true ? true : this.options.hashScroll;
        // update animation from attribute
        const animationValue = this.wrapper.getAttribute(this._attr.animation);
        this.options.animation = animationValue !== null ? animationValue : this.options.animation;

        // get options init by data attribute (JSON format)
        this.options = getOptions(this);

        // assign id to wrapper
        this.wrapper.setAttribute(this._attr.container, this.id);

        if(this.count < 1){
            log(this, 'warn', 'Quit init due to child panels not found', this);
            return;
        }

        // init
        if(this.enabled && !this.hasInitialized) initSetup(this);
        if(!this.enabled && this.hasInitialized) this.destroy();

        // toggle via hash
        if(this.enabled){
            if(isValidHash(this)){
                this.toggle(getHash().id, 'hash');
            }else{
                defaultActiveSections(this);
            }
        }

        // watch for resize/load events
        window.addEventListener('resize', debounce(e => onResize(this, e), 300));
        window.addEventListener('load', e => onLoad(this, e));
    }

    destroy(){
        this.hasInitialized = false;
        this.wrapper.classList.remove(this._class.enabled);

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

        // event: onDestroy
        this.events.fire("onDestroy");
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
        this.events.fire("onUpdate");
    }

    openPanel(id = this.current_id){
        if(!validID(this, id)) return;

        const beforeOpen = () => {
            // update section status
            this.dataset[getIndexById(this, id)].active = true;

            // update URL
            updateURL(this, id);

            // events
            this.events.fire("onBeforeOpen");
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

            this.events.fire("onAfterOpen", target);

            // log
            log(this, 'log', 'after open', id);
        };

        // open
        const {current} = getElements(this, id);
        switch(this.options.animation){
            case 'slide':
                current.forEach(el => slideDown(el, this.options.duration, () => afterOpen(el)));
                break;
            case 'fade':
                current.forEach(el => fadeIn(el, this.options.duration, () => afterOpen(el)));
                break;
        }

        // update classes
        addActiveClass(this, id);

        // close all others
        const closeAllOthers = this.options.animation === 'fade' || this.options.animation === 'slide' && !this.options.allowExpandAll;
        if(closeAllOthers) this.dataset.filter(x => x.id !== id).forEach(item => {
            if(item.active || this.isFirst){
                this.closePanel(item.id);
            }
        });
        if(this.isFirst){
            current[0].style.display = 'block';
            this.isFirst = false;
        }
    }

    closePanel(id = this.current_id){
        if(!validID(this, id)) return;

        // event: on Before Close
        this.events.fire("onBeforeClose");

        // event: on After Close
        this.dataset[getIndexById(this, id)].active = false;
        const afterClose = (target) => {
            this.events.fire("onAfterClose", target);

            // toggle animating status
            this.isAnimating = false;
            log(this, 'log', 'Stop animation.');

            // log
            log(this, 'log', 'after close', id);
        };

        // close animation
        const {current} = getElements(this, id);
        switch(this.options.animation){
            case 'slide':
                current.forEach(el => slideUp(el, this.options.duration, () => afterClose(el)));
                break;
            case 'fade':
                current.forEach(el => fadeOut(el, this.options.duration, () => afterClose(el)));
                break;
        }

        // update classes
        removeActiveClass(this, id);
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
        if(toggleState === 1){
            // open
            this.current_id = id;
            this.openPanel(this.current_id);
        }else{
            // close
            this.closePanel(id);
        }
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
        this.instances.push(instance);
    }

    get(id){
        return this.instances.filter(instance => instance.id === id)[0];
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
                window.ETAController.add(new EasyTabAccordion({el, ...options}));
            });
        }

        window.ETAController.add(new EasyTabAccordion(options));
    },
    // Get instance object by ID
    get: id => window.ETAController.get(id)
};

window.ETA.init();