import {scrollIntoView} from "./animation";

/**
 * Get hash information
 * @param url
 * @returns {{data: module:url.URL, id: string, hash: string}}
 * @since 1.0.0
 */
export function getHash(url = document.location){
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


/**
 * Update hash URL
 * @param context
 * @param id
 * @since 1.0.0
 */
export function updateURL(context, id){
    // only update hash on manual change
    if(!context.options.hash || context.type !== 'manual') return;

    // create new URL with hash from id
    const originalHref = document.location.origin + document.location.pathname;
    document.location = originalHref + '#' + id;
}


/**
 * Is valid hash from the current URL
 * @param context
 * @returns {0|number}
 */
export function isValidHash(context){
    const hashData = getHash();
    const hash = hashData.hash;
    const hashID = hashData.id;
    return context.options.hash && hash.length && context.dataset.filter(i => i.id === hashID).length;
}


/**
 * Scroll into view by hash
 * @param context
 */
export function hashScroll(context){
    if(context.type !== 'hash' || !context.options.hashScroll) return;

    // scroll into view after 100ms
    window.addEventListener('load', () => setTimeout(() => scrollIntoView({context}), 100));
}