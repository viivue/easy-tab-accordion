/**!
 * Easy Tab & Accordion v1.0.0
 * https://github.com/viivue/easy-tab-accordion
 * MIT license - 2022
 */
class EasyTabAccordion{
    constructor(options){
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
        this.config = {
            ...{
                el: document.querySelector(`[${this._attr.container}]`), // DOM element
                trigger: `[${this._attr.trigger}]`, // string selector
                triggerAttr: this._attr.trigger, // attribute name
                receiver: `[${this._attr.receiver}]`, // string selector
                receiverAttr: this._attr.receiver, // attribute name
                activeClass: this._class.active,
                animation: 'slide', // slide, fade
                duration: 600,
                hash: false,
                hashScroll: false,
                liveBreakpoint: [], // [1920, 1024] => destroy if window.width if bigger than 1920 or less than 1024
                activeSection: 0, // will show order of item show, close all if activeSection < 0 or activeSection >= length item
                allowCollapseAll: false,
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
        this.wrapper = this.config.el;
        this.current_id = '';
        this.previous_id = '';
        this.type = '';
        this.hasInit = false;
        this.enabled = this.hasLiveBreakpoint() ? this.isLive() : true;
        this.length = this.wrapper.querySelectorAll(this.config.trigger).length;

        // update hash from attribute
        this.config.hash = this.wrapper.hasAttribute(this._attr.hash) === true ? true : this.config.hash;
        this.config.hashScroll = this.wrapper.hasAttribute(this._attr.hashScroll) === true ? true : this.config.hashScroll;

        // update animation from attribute
        const animationValue = this.wrapper.getAttribute(this._attr.animation);
        this.config.animation = animationValue !== null ? animationValue : this.config.animation;

        // init
        if(this.enabled && !this.hasInit) this.init();
        if(!this.enabled && this.hasInit) this.destroy();

        // activate via hash
        if(this.enabled){
            const hashData = this.getHash();
            const hash = hashData.hash;
            const hashID = hashData.id;
            const isValidHash = this.config.hash && hash.length && this.receiver_ids.filter(i => i.id === hashID).length;

            if(isValidHash){
                this.activate(hashID, 'hash');
            }else{
                // check activeSection exists
                const isExists = this.config.activeSection >= 0 && this.config.activeSection < this.length;

                // activate activeSection
                if(isExists){
                    this.activate(this.receiver_ids[this.config.activeSection].id, 'auto');
                }else{
                    this.wrapper.querySelectorAll(this.config.receiver).forEach(receiver => {
                        this.close(receiver.getAttribute(`${this.config.receiverAttr}`));
                    });
                }
            }
        }

        // watch for resize event
        window.addEventListener('resize', e => this.resizeWatcher(e));
        window.addEventListener('load', e => this.resizeWatcher(e));

        // public methods
        return {
            activate: id => this.activate(id),
            activateByIndex: index => this.activate(this.receiver_ids[index].id),
            destroy: () => this.destroy()
        }
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
        document.querySelectorAll(`a[href]`).forEach(trigger => {
            let href = trigger.getAttribute('href');
            let id = href[0] === '#' ? href.slice(1) : this.getHash(href).id;

            if(!id) return;

            this.receiver_ids.forEach(i => {
                if(i.id === id){
                    // valid trigger
                    trigger.addEventListener('click', e => {
                        e.preventDefault();
                        this.activate(id, 'manual');
                        this.scrollIntoView();
                    });
                }
            })
        });
    }

    hasLiveBreakpoint(){
        return this.config.liveBreakpoint.length === 2;
    }

    // check if is in live breakpoint
    isLive(){
        const isLiveRange = window.innerWidth <= this.config.liveBreakpoint[0] && window.innerWidth >= this.config.liveBreakpoint[1];
        return isLiveRange && this.hasLiveBreakpoint();
    }

    resizeWatcher(e){
        if(this.hasLiveBreakpoint() && this.isLive() !== this.enabled){
            this.enabled = this.isLive();

            if(this.enabled){
                this.init();

                // activate the current one or the first one
                this.activate(this.current_id || this.receiver_ids[0].id, 'auto', true);
            }else{
                this.destroy();
            }
        }
    }

    manualTriggerFunction(e){
        e.preventDefault();
        e.stopPropagation();

        const id = e.target.getAttribute(this.config.triggerAttr) || e.target.closest(this.config.trigger).getAttribute(this.config.triggerAttr);
        this.activate(id, 'manual');
    }

    init(){
        this.hasInit = true;
        this.enabled = true;
        this.wrapper.classList.add(this._class.enabled);

        // loop through triggers
        this.wrapper.querySelectorAll(this.config.trigger).forEach(trigger => {
            trigger.addEventListener('click', e => this.manualTriggerFunction(e), true);
        });

        // loop through receivers
        this.receiver_ids = [];
        this.wrapper.querySelectorAll(this.config.receiver).forEach(el => {
            const id = el.getAttribute(this.config.receiverAttr);
            this.receiver_ids.push({id, el});

            // setup CSS for fade animation
            if(this.config.animation === 'fade'){
                el.style.position = getComputedStyle(el).position !== 'absolute' ? 'absolute' : '';
                el.style.inset = '0';
                el.style.transition = `opacity ${this.config.duration}ms ease`;
                el.style.overflow = 'hidden';

                el.parentElement.style.position = getComputedStyle(el).position !== 'relative' ? 'relative' : '';
                el.parentElement.style.transition = `height ${this.config.duration}ms ease`;
            }
        });

        this.assignTriggerElements();
    }

    destroy(){
        this.enabled = false;
        this.wrapper.classList.remove(this._class.enabled);

        // loop through triggers
        this.wrapper.querySelectorAll(this.config.trigger).forEach(trigger => {
            trigger.removeEventListener('click', this.manualTriggerFunction, true);
        });

        // loop through receivers
        this.receiver_ids = [];

        // reset CSS for fade animation
        if(this.config.animation === 'fade'){
            this.wrapper.querySelectorAll(this.config.receiver).forEach(el => {
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
        if(this.config.animation === 'slide'){
            this.wrapper.querySelectorAll(this.config.receiver).forEach(el => {
                this.slideDown(el, this.config.duration);
            });
        }

        // event: onBeforeOpen
        this.config.onAfterDestroy(this);
    }

    // update url
    updateUrl(){
        const originalHref = document.location.origin + document.location.pathname;
        if(this.config.hash && type === 'manual') document.location = originalHref + '#' + id;
    }


    // close receiver
    close(idReceiver){
        const receiverClose = this.wrapper.querySelector(`[${this.config.receiverAttr}="${idReceiver}"]`);
        // event: onBeforeClose
        this.config.onBeforeClose(this);

        // slide animation
        if(this.config.animation === 'slide'){
            // event: onAfterOpen
            this.slideUp(receiverClose, this.config.duration, () => this.config.onAfterClose(this, receiverClose));
        }

        // fade animation
        if(this.config.animation === 'fade'){
            receiverClose.style.opacity = '0';
            receiverClose.style.visibility = 'hidden';

            // event: onAfterOpen
            setTimeout(() => this.config.onAfterClose(this, receiverClose), this.config.duration);
        }

        // update class
        this.wrapper.querySelector(`[${this.config.receiverAttr}="${idReceiver}"]`).classList.remove(this._class.active);
        this.wrapper.querySelector(`[${this.config.triggerAttr}="${idReceiver}"]`).classList.remove(this._class.active);

        // update url
        this.updateUrl();
    }

    // open receiver
    open(idReceiver){
        const receiverOpen = this.wrapper.querySelector(`[${this.config.receiverAttr}="${idReceiver}"]`);

        // event: onBeforeOpen
        this.config.onBeforeOpen(this, receiverOpen);

        // slide animation
        if(this.config.animation === 'slide'){
            // event: onAfterOpen
            this.slideDown(receiverOpen, this.config.duration, () => this.config.onAfterOpen(this, receiverOpen));
        }

        // fade animation
        if(this.config.animation === 'fade'){
            receiverOpen.style.opacity = '1';
            receiverOpen.style.visibility = 'visible';

            // update parent height
            receiverOpen.parentElement.style.height = `${receiverOpen.offsetHeight}px`;

            // event: onAfterOpen
            setTimeout(() => this.config.onAfterOpen(this, receiverOpen), this.config.duration);
        }

        // update class
        this.wrapper.querySelector(`[${this.config.receiverAttr}="${idReceiver}"]`).classList.add(this._class.active);
        this.wrapper.querySelector(`[${this.config.triggerAttr}="${idReceiver}"]`).classList.add(this._class.active);

        // update url
        this.updateUrl();
    }

    activate(id, type = 'undefined', force = false){
        // if active already
        if((!force && id === this.current_id) || !id.length){
            // if allow collapse all
            if(this.config.allowCollapseAll){
                const receiverElement = this.wrapper.querySelector(`[${this.config.receiverAttr}="${id}"]`);
                if(receiverElement.classList.contains(this._class.active)){
                    // close
                    this.close(id);
                }else{
                    // open when click again
                    this.open(id);
                }
            }
            return;
        }

        // skip if id is not found
        if(!this.receiver_ids.filter(i => i.id === id).length) return;

        // update data
        this.type = type;
        this.previous_id = this.current_id ? this.current_id : this.receiver_ids[0].id;
        this.current_id = id;

        // get related elements
        const prevReceivers = this.wrapper.querySelectorAll(`${this.config.receiver}:not([${this.config.receiverAttr}="${this.current_id}"])`);
        const newReceivers = this.wrapper.querySelectorAll(`[${this.config.receiverAttr}="${this.current_id}"]`);

        // show
        newReceivers.forEach(el => {

            this.open(el.getAttribute(`${this.config.receiverAttr}`));

            // event: onBeforeOpen
            this.config.onBeforeOpen(this, el);

            // slide animation
            if(this.config.animation === 'slide'){
                // event: onAfterOpen
                this.slideDown(el, this.config.duration, () => this.config.onAfterOpen(this, el));
            }

            // fade animation
            if(this.config.animation === 'fade'){
                el.style.bottom = '';
                el.style.opacity = '1';
                el.style.visibility = 'visible';

                // update parent height
                el.parentElement.style.height = `${el.offsetHeight}px`;
                el.style.bottom = '0';

                // event: onAfterOpen
                setTimeout(() => this.config.onAfterOpen(this, el), this.config.duration);
            }

        });

        // close
        prevReceivers.forEach(el => {
            this.close(el.getAttribute(`${this.config.receiverAttr}`));
        });

        // hash scroll
        if(type === 'hash' && this.config.hashScroll){
            window.addEventListener('load', () => setTimeout(() => this.scrollIntoView(), 100));
        }
    };

    slideUp(target, duration = 500, fn = () => {
    }){
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');

            if(typeof fn === 'function') fn();
        }, duration);
    }

    slideDown(target, duration = 500, fn = () => {
    }){
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;

        if(display === 'none') display = 'block';

        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');

            if(typeof fn === 'function') fn();
        }, duration);
    }
}

/**
 * Global init
 */
document.querySelectorAll('[data-eta]').forEach(el => new EasyTabAccordion({el}));