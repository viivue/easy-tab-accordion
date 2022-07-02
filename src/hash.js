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

// update url
export function updateURL(id){
    const originalHref = document.location.origin + document.location.pathname;
    document.location = originalHref + '#' + id;
}