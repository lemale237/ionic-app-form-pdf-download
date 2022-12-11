import { r as registerInstance, h, H as Host } from './index-e23c3ffd.js';
import { b as getIonMode } from './ionic-global-fbc9a2ac.js';
import { c as createColorClasses } from './theme-c2dc54d9.js';

const textCss = ":host(.ion-color){color:var(--ion-color-base)}";

const Text = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { class: Object.assign(Object.assign({}, createColorClasses(this.color)), { [mode]: true }) }, h("slot", null)));
    }
};
Text.style = textCss;

export { Text as ion_text };
