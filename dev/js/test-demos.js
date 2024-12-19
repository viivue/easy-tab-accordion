import md from "../md/demos.md";

export function testDemos(root){
    root.insertAdjacentHTML('beforeend', md);

    ETA.init();
}