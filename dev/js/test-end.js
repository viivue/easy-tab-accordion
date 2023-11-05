import md from "../md/end.md";

export function testEnd(root){
    root.insertAdjacentHTML('beforeend', md);

    ETA.init();
}