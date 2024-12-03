import md from "../md/options.md";

export function testOptions(root){
    root.insertAdjacentHTML('beforeend', md);

    ETA.init();
}