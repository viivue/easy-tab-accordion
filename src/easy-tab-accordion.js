import {slideDown, slideUp, destroySlide, updateSlide} from "./slide";
import {fadeIn, fadeOut, destroyFade, updateFade} from "./fade";
import {scrollIntoView, setCSS} from "./animation";
import {getHash, isValidHash, hashScroll, updateURL} from "./hash";
import {
    validID,
    getToggleState,
    getIndexById,
    getElements,
    removeActiveClass, addActiveClass, getIdByIndex, defaultActiveSections, log
} from "./helpers";
import {debounce} from "./utils";
import {validBreakpoints, isLive, responsive} from "./responsive";

export class EasyTabAccordion{
    constructor(options){
        this._class = {
            enabled: 'easy-tab-accordion-enabled', active: 'active'
        };
        this._attr = {
            container: 'data-eta',
            trigger: 'data-eta-trigger',
            receiver: 'data-eta-receiver',
            hash: 'data-eta-hash',
            hashScroll: 'data-eta-hash-scroll',
            animation: 'data-eta-animation'
        };

        // save options
        this.originalOptions = options;

        // init
        this.initialize();

        // avoid double click
        if (this.options.avoidDoubleClick) {
            this.isAnimating = true;
        }

        // public methods
        return {
            toggle: id => this.toggle(id),
            toggleByIndex: index => this.toggle(getIdByIndex(this, index)),
            destroy: () => this.destroy(),
            init: () => this.initialize(),
            update: () => this.update()
        }
    }

    initialize(){
        // setup
        this.setupData();

        // init
        if(this.enabled && !this.hasInitialized) this.init();
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
        window.addEventListener('resize', debounce(e => this.onResize(e), 300));
        window.addEventListener('load', e => this.onLoad(e));
    }

    setupData(){
        this.options = {
            ...{
                // selectors
                el: document.querySelector(`[${this._attr.container}]`), // DOM element
                trigger: `[${this._attr.trigger}]`, // string selector
                triggerAttr: this._attr.trigger, // attribute name
                receiver: `[${this._attr.receiver}]`, // string selector
                receiverAttr: this._attr.receiver, // attribute name
                activeClass: this._class.active,

                // animation
                animation: 'slide', // slide, fade
                duration: 450,

                // hash
                hash: false, // update hash URL
                hashScroll: false, // scroll into view when page loaded with a valid hash

                // responsive
                liveBreakpoint: [], // [1920, 1024] => destroy if window.width if bigger than 1920 or less than 1024

                // avoid double click
                avoidDoubleClick: true,

                // dev mode => enable console.log
                dev: false,

                // open/close
                activeSection: 0, // default opening sections, will be ignored if there's a valid hash, allow array of index [0,1,2] for slide animation only
                allowCollapseAll: false, // for slide animation only
                allowExpandAll: false, // for slide animation only

                // events
                onBeforeInit: (data) => {
                },
                onAfterInit: (data) => {
                },
                onBeforeOpen: (data, el) => {
                },
                onBeforeClose: (data, el) => {
                },
                onAfterOpen: (data, el) => {
                },
                onAfterClose: (data, el) => {
                },
                onDestroy: (data) => {
                },
                onUpdate: (data) => {
                },
            }, ...this.originalOptions
        }

        if(!this.options.el){
            log(this,'ETA Error, target not found!', 'warn');
            return;
        }

        this.wrapper = this.options.el;
        this.current_id = '';
        this.previous_id = '';
        this.type = '';
        this.hasInitialized = false;
        this.enabled = validBreakpoints(this) ? isLive(this) : true;
        this.count = this.wrapper.querySelectorAll(this.options.trigger).length;

        // update hash from attribute
        this.options.hash = this.wrapper.hasAttribute(this._attr.hash) === true ? true : this.options.hash;
        this.options.hashScroll = this.wrapper.hasAttribute(this._attr.hashScroll) === true ? true : this.options.hashScroll;

        // update animation from attribute
        const animationValue = this.wrapper.getAttribute(this._attr.animation);
        this.options.animation = animationValue !== null ? animationValue : this.options.animation;
    }

    init(){
        // event: onBeforeInit
        this.options.onBeforeInit(this);

        this.hasInitialized = true;
        this.wrapper.classList.add(this._class.enabled);

        // loop through triggers
        this.wrapper.querySelectorAll(this.options.trigger).forEach(trigger => {
            // assign click event
            trigger.addEventListener('click', this.manualTriggerFunction.bind(this));
        });

        // loop through receivers
        this.dataset = [];
        this.wrapper.querySelectorAll(this.options.receiver).forEach(el => {
            const id = el.getAttribute(this.options.receiverAttr);
            this.dataset.push({id, el, active: false});

            // setup CSS for fade animation
            if(this.options.animation === 'fade'){
                // tab parent
                setCSS(el.parentElement, {
                    overflow: 'hidden',
                    position: getComputedStyle(el).position !== 'relative' ? 'relative' : '',
                });

                // tab children
                setCSS(el, {
                    position: getComputedStyle(el).position !== 'absolute' ? 'absolute' : '',
                    inset: '0 0 auto'
                });
            }
        });

        this.assignTriggerElements();

        // event: onAfterInit
        this.options.onAfterInit(this);
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
        this.options.onDestroy(this);
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
        this.options.onUpdate(this);
    }

    openPanel(id = this.current_id){
        if(!validID(this, id)) return;

        const beforeOpen = () => {
            // update section status
            this.dataset[getIndexById(this, id)].active = true;

            // update URL
            updateURL(this, id);

            // events
            this.options.onBeforeOpen(this);
        }

        // event: on Before Open
        beforeOpen();

        // event: on After Open
        const afterOpen = (target) => {
            hashScroll(this);

            this.options.onAfterOpen(this, target);

            // log
            log(this, `after open ${id}`);

            // toggle animating status
            if (this.options.avoidDoubleClick) {
                this.isAnimating = false;
            }
        }

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
        if(closeAllOthers) this.dataset.filter(x => x.id !== id).forEach(item => this.closePanel(item.id));
    }

    closePanel(id = this.current_id){
        if(!validID(this, id)) return;

        // event: on Before Close
        this.options.onBeforeClose(this);

        // event: on After Close
        this.dataset[getIndexById(this, id)].active = false;
        const afterClose = (target) => {
            this.options.onAfterClose(this, target);

            // log
            log(this, `after close ${id}`);

            // toggle animating status
            if (this.options.avoidDoubleClick) {
                this.isAnimating = false;
            }
        }

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
        if(!validID(this, id)) {
            log(this, 'invalid id', 'warn');
        }

        const toggleState = getToggleState(this, id);
        if(toggleState === 0) return;

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


    onResize(event){
        this.update();
        responsive(this, event);
    }

    onLoad(event){
        this.update();
        responsive(this, event);
    }


    assignTriggerElements(){
        // find possible trigger and assign click event
        document.querySelectorAll(`a[href^="#"]`).forEach(trigger => {
            const href = trigger.getAttribute('href');
            const id = href[0] === '#' ? href.slice(1) : getHash(href).id;

            if(!id) return;

            this.dataset.forEach(item => {
                if(item.id === id){
                    // valid trigger
                    trigger.addEventListener('click', e => {
                        e.preventDefault();
                        this.toggle(id, 'manual');
                        scrollIntoView({context: this});
                    });
                }
            })
        });
    }

    manualTriggerFunction(e){
        e.preventDefault();
        e.stopPropagation();

        const id = e.target.getAttribute(this.options.triggerAttr) || e.target.closest(this.options.trigger).getAttribute(this.options.triggerAttr);
        this.toggle(id, 'manual');
    }

}

/**
 * Global init
 */
document.querySelectorAll('[data-eta]').forEach(el => new EasyTabAccordion({el}));