/**!
 * Easy Tab & Accordion v1.0.1
 * https://github.com/viivue/easy-tab-accordion
 * MIT license - 2022
 */
class EasyTabAccordion{
    constructor(options){
        this.dev = false;
        this._class = {
            enabled: 'easy-tab-accordion-enabled',
            active: 'active'
        };
        this._attr = {
            container: 'data-eta',
            trigger: 'data-eta-trigger',
            receiver: 'data-eta-receiver',
            hash: 'data-eta-hash',
            hashScroll: 'data-eta-hash-scroll',
            animation: 'data-eta-animation'
        };

        // handle options
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
                duration: 600,

                // hash
                hash: false,
                hashScroll: false,

                // responsive
                liveBreakpoint: [], // [1920, 1024] => destroy if window.width if bigger than 1920 or less than 1024

                // open/close
                activeSection: 0, // default opening section
                allowCollapseAll: false,

                // events
                onBeforeOpen: (data, el) => {
                },
                onBeforeClose: (data, el) => {
                },
                onAfterOpen: (data, el) => {
                },
                onAfterClose: (data, el) => {
                },
                onAfterDestroy: (data, el) => {
                },
            }, ...options
        }
        this.wrapper = this.options.el;
        this.current_id = '';
        this.previous_id = '';
        this.type = '';
        this.hasInitialized = false;
        this.enabled = this.hasLiveBreakpoint() ? this.isLive() : true;
        this.count = this.wrapper.querySelectorAll(this.options.trigger).length;

        // update hash from attribute
        this.options.hash = this.wrapper.hasAttribute(this._attr.hash) === true ? true : this.options.hash;
        this.options.hashScroll = this.wrapper.hasAttribute(this._attr.hashScroll) === true ? true : this.options.hashScroll;

        // update animation from attribute
        const animationValue = this.wrapper.getAttribute(this._attr.animation);
        this.options.animation = animationValue !== null ? animationValue : this.options.animation;

        // init
        if(this.enabled && !this.hasInitialized) this.init();
        if(!this.enabled && this.hasInitialized) this.destroy();

        // toggle via hash
        if(this.enabled){
            const hashData = this.getHash();
            const hash = hashData.hash;
            const hashID = hashData.id;
            const isValidHash = this.options.hash && hash.length && this.receiver_ids.filter(i => i.id === hashID).length;

            if(isValidHash){
                this.toggle(hashID, 'hash');
            }else{
                // check valid activeSection (section index)
                const isValid = this.options.activeSection >= 0 && this.options.activeSection < this.count;

                // toggle activeSection
                if(isValid){
                    this.toggle(this.receiver_ids[this.options.activeSection].id, 'auto');
                }
            }
        }

        // watch for resize event
        window.addEventListener('resize', e => this.resizeWatcher(e));
        window.addEventListener('load', e => this.resizeWatcher(e));

        // public methods
        return {
            toggle: id => this.toggle(id),
            toggleByIndex: index => this.toggle(this.receiver_ids[index].id),
            destroy: () => this.destroy()
        }
    }

    log(){
        if(this.dev) console.log(...arguments);
    }

    getHash(url = document.location){
        const data = new URL(url);

        // trim params if any
        const indexOfQuestionMark = data.hash.indexOf('?');
        const hash = indexOfQuestionMark > -1 ? data.hash.slice(0, indexOfQuestionMark) : data.hash

        return {
            data,
            hash,
            id: hash.slice(1)
        }
    }

    scrollIntoView(){
        this.wrapper.scrollIntoView({
            behavior: 'smooth'
        });
    }

    // find possible trigger and assign click event
    assignTriggerElements(){
        document.querySelectorAll(`a[href^="#"]`).forEach(trigger => {
            let href = trigger.getAttribute('href');
            let id = href[0] === '#' ? href.slice(1) : this.getHash(href).id;

            if(!id) return;

            this.receiver_ids.forEach(item => {
                if(item.id === id){
                    // valid trigger
                    trigger.addEventListener('click', e => {
                        e.preventDefault();
                        this.toggle(id, 'manual');
                        this.scrollIntoView();
                    });
                }
            })
        });
    }

    hasLiveBreakpoint(){
        return this.options.liveBreakpoint.length === 2;
    }

    // check if is in live breakpoint
    isLive(){
        const isLiveRange = window.innerWidth <= this.options.liveBreakpoint[0] && window.innerWidth >= this.options.liveBreakpoint[1];
        return isLiveRange && this.hasLiveBreakpoint();
    }

    resizeWatcher(e){
        if(this.hasLiveBreakpoint() && this.isLive() !== this.enabled){
            this.enabled = this.isLive();

            if(this.enabled){
                this.init();

                // toggle the current one or the first one
                this.toggle(this.current_id || this.receiver_ids[0].id, 'auto', true);
            }else{
                this.destroy();
            }
        }
    }

    manualTriggerFunction(e){
        e.preventDefault();
        e.stopPropagation();

        const id = e.target.getAttribute(this.options.triggerAttr) || e.target.closest(this.options.trigger).getAttribute(this.options.triggerAttr);
        this.log('manualTriggerFunction', id);
        this.toggle(id, 'manual');
    }

    init(){
        this.log(`Before init`, this);

        this.hasInitialized = true;
        this.enabled = true;
        this.wrapper.classList.add(this._class.enabled);

        // loop through triggers
        this.wrapper.querySelectorAll(this.options.trigger).forEach(trigger => {
            // assign click event
            trigger.addEventListener('click', e => this.manualTriggerFunction(e), true);
        });

        // loop through receivers
        this.receiver_ids = [];
        this.wrapper.querySelectorAll(this.options.receiver).forEach(el => {
            const id = el.getAttribute(this.options.receiverAttr);
            this.receiver_ids.push({id, el, active: false});

            // setup CSS for fade animation
            if(this.options.animation === 'fade'){
                el.style.position = getComputedStyle(el).position !== 'absolute' ? 'absolute' : '';
                el.style.inset = '0';
                el.style.transition = `opacity ${this.options.duration}ms ease`;
                el.style.overflow = 'hidden';

                el.parentElement.style.position = getComputedStyle(el).position !== 'relative' ? 'relative' : '';
                el.parentElement.style.transition = `height ${this.options.duration}ms ease`;
            }
        });

        this.assignTriggerElements();

        this.log(`After init`, this);
    }

    destroy(){
        this.enabled = false;
        this.wrapper.classList.remove(this._class.enabled);

        // loop through triggers
        this.wrapper.querySelectorAll(this.options.trigger).forEach(trigger => {
            trigger.removeEventListener('click', this.manualTriggerFunction, true);
        });

        // loop through receivers
        this.receiver_ids = [];

        // reset CSS for fade animation
        if(this.options.animation === 'fade'){
            this.wrapper.querySelectorAll(this.options.receiver).forEach(el => {
                el.style.opacity = '';
                el.style.visibility = '';
                el.style.position = '';
                el.style.inset = '';
                el.style.transition = '';

                el.parentElement.style.height = '';
                el.parentElement.style.position = '';
                el.parentElement.style.transition = '';
            });
        }

        // reset CSS for slide animation
        if(this.options.animation === 'slide'){
            this.wrapper.querySelectorAll(this.options.receiver).forEach(el => {
                this.slideDown(el, this.options.duration);
            });
        }

        // event: onAfterDestroy
        this.options.onAfterDestroy(this);
    }

    openPanel(id = this.current_id){
        if(!this.validID(id)) return;

        const beforeOpen = () => {
            // update section status
            this.receiver_ids[this.getIndexById(id)].active = true;

            // update URL
            this.updateURL(id);

            // events
            this.options.onBeforeOpen(this);
        }

        // event: on Before Open
        beforeOpen();

        // event: on After Open
        const afterOpen = (target) => {
            // hash scroll
            if(this.type === 'hash' && this.options.hashScroll){
                window.addEventListener('load', () => setTimeout(() => this.scrollIntoView(), 100));
            }

            this.options.onAfterOpen(this, target);
        }

        // get related elements
        const {current} = this.getElements(id);

        // open
        switch(this.options.animation){
            case 'slide':
                current.forEach(el => this.slideDown(el, this.options.duration, () => afterOpen(el)));
                break;
            case 'fade':
                current.forEach(el => this.fadeIn(el, this.options.duration, () => afterOpen(el)));
                break;
        }

        // update classes
        current.forEach(item => item.classList.add(this._class.active));

        // close all others
        this.receiver_ids.filter(x => x.id !== id).forEach(previous => this.closePanel(previous.id));
    }

    closePanel(id = this.current_id){
        if(!this.validID(id)) return;

        // event: on Before Close
        this.options.onBeforeClose(this);

        // event: on After Close
        this.receiver_ids[this.getIndexById(id)].active = false;
        const afterClose = (target) => {
            this.options.onAfterClose(this, target);
        }

        // get related elements
        const {current} = this.getElements(id);

        // close
        switch(this.options.animation){
            case 'slide':
                current.forEach(el => this.slideUp(el, this.options.duration, () => afterClose(el)));
                break;
            case 'fade':
                current.forEach(el => this.fadeOut(el, this.options.duration, () => afterClose(el)));
                break;
        }

        // update classes
        current.forEach(item => {
            item.classList.remove(this._class.active);
        });
    }

    getToggleState(id){
        if(!this.validID(id)) return;
        // close: -1
        // open: 1
        // exit: 0

        const open = this.receiver_ids[this.getIndexById(id)].active;

        // is open and allow collapse all => close
        if(open && this.options.allowCollapseAll) return -1;

        // is open and not allow collapse all => close
        if(open && !this.options.allowCollapseAll) return 0;

        // is close and allow collapse all => open
        if(!open && this.options.allowCollapseAll) return 1;

        // is close and not allow collapse all => open
        if(!open && !this.options.allowCollapseAll) return 1;

        return open ? 1 : -1;
    }

    validID(id){
        return !!this.receiver_ids.filter(i => i.id === id).length;
    }

    toggle(id, type = 'undefined', force = false){
        this.log('[toggle] > start', arguments, this);

        // exit if id is not found
        if(!this.validID(id)){
            this.log(`[toggle] > exit, id[${id}] not found`);
            return;
        }

        const toggleState = this.getToggleState(id);
        if(toggleState === 0) return;

        // before toggle
        this.log('Before toggle', id);

        // update data
        this.type = type;
        this.previous_id = this.current_id ? this.current_id : this.receiver_ids[0].id;
        if(toggleState === 1){
            // open
            this.current_id = id;
            this.openPanel(this.current_id);
        }else{
            // close
            this.closePanel(this.current_id);
        }
    };

    // update url
    updateURL(id, type = this.type){
        const originalHref = document.location.origin + document.location.pathname;
        if(this.options.hash && type === 'manual') document.location = originalHref + '#' + id;
    }

    // get elements (receiver/trigger) by ID
    getElements(id, isReceiver = true){
        const selector = isReceiver ? this.options.receiver : this.options.trigger;
        const attr = isReceiver ? this.options.receiverAttr : this.options.triggerAttr;

        const previous = this.wrapper.querySelectorAll(`${selector}:not([${attr}="${id}"])`);
        const current = this.wrapper.querySelectorAll(`[${attr}="${id}"]`);

        return {previous, current};
    }

    getIndexById(id){
        return this.receiver_ids.findIndex(x => x.id === id);
    }

    slideUp(target, duration = 500, fn){
        //if(this.isAnimating && this.type === 'manual') return;
        //this.isAnimating = true;
        this.log(`[animate] slide up`, arguments);

        // before
        target.style.boxSizing = 'border-box';
        target.style.height = target.scrollHeight + 'px';
        this.setTransition(target, duration);

        // animate
        target.style.height = '0px';

        // end
        setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            this.removeTransition(target);
            //this.isAnimating = false;

            // callback
            if(typeof fn === 'function') fn();
        }, duration);
    }

    slideDown(target, duration = 500, fn){
        //if(this.isAnimating && this.type === 'manual') return;
        //this.isAnimating = true;
        this.log(`[animate] slide down`);

        // before
        target.style.boxSizing = 'border-box';
        target.style.height = '0px';
        target.style.display = 'block';
        this.setTransition(target, duration);

        // animate
        target.style.height = target.scrollHeight + 'px';

        // end
        setTimeout(() => {
            this.removeTransition(target);
            //this.isAnimating = false;

            // callback
            if(typeof fn === 'function') fn();
        }, duration);
    }

    fadeOut(target, duration = 500, fn){
        target.style.opacity = '0';
        target.style.visibility = 'hidden';

        // callback
        if(typeof fn === 'function') fn();
    }

    fadeIn(target, duration = 500, fn){
        target.style.bottom = '';
        target.style.opacity = '1';
        target.style.visibility = 'visible';

        // update parent height
        target.parentElement.style.height = `${target.offsetHeight}px`;
        target.style.bottom = '0';

        // callback
        if(typeof fn === 'function') fn();
    }

    setTransition(target, duration){
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.overflow = 'hidden';
    }

    removeTransition(target){
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');

        target.style.removeProperty('box-sizing');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
    }
}

/**
 * Global init
 */
document.querySelectorAll('[data-eta]').forEach(el => new EasyTabAccordion({el}));