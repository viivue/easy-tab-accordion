import {uniqueId} from './utils'

/**
 * Classes
 * */
export const CLASSES = {
    enabled: 'easy-tab-accordion-enabled',
    active: 'active',
    hasAssignedTriggerEvent: 'assigned-trigger-event',
};
/**
 * Attributes
 * */
export const ATTRS = {
    container: 'data-eta',
    trigger: 'data-eta-trigger',
    receiver: 'data-eta-receiver',
    hash: 'data-eta-hash',
    hashScroll: 'data-eta-hash-scroll',
    animation: 'data-eta-animation',
};
/**
 * Defaults
 * */
export const DEFAULTS = {
    // selectors
    el: document.querySelector('[data-eta]'), // DOM element
    id: uniqueId('eta-'),
    trigger: '[data-eta-trigger]', // string selector
    triggerAttr: 'data-eta-trigger', // attribute name
    receiver: '[data-eta-receiver]', // string selector
    receiverAttr: 'data-eta-receiver', // attribute name
    activeClass: 'active',

    // animation
    animation: 'slide', // slide, fade
    duration: 450,
    scrollIntoView: false, // scroll panel into view when open

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

    // prevent default when click to trigger element
    isPreventDefault: true,
}