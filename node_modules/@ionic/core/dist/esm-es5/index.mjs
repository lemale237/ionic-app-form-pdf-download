import './index-e23c3ffd.js';
export { g as getPlatforms, i as isPlatform } from './ionic-global-fbc9a2ac.js';
import './utils-918b8264.js';
import './helpers-5c745fbd.js';
export { c as createAnimation } from './animation-6064ebf7.js';
export { a as LIFECYCLE_DID_ENTER, c as LIFECYCLE_DID_LEAVE, L as LIFECYCLE_WILL_ENTER, b as LIFECYCLE_WILL_LEAVE, d as LIFECYCLE_WILL_UNLOAD } from './index-b60886e1.js';
export { iosTransitionAnimation } from './ios.transition-4d4e1cfa.js';
export { mdTransitionAnimation } from './md.transition-c0dc4c62.js';
export { g as getTimeGivenProgression } from './cubic-bezier-685f606a.js';
export { createGesture } from './index-6f647ec8.js';
export { I as IonicSafeString } from './index-79d74e0b.js';
import './hardware-back-button-7b6ede21.js';
export { m as menuController } from './index-88d5bee7.js';
export { b as actionSheetController, a as alertController, l as loadingController, m as modalController, p as pickerController, c as popoverController, t as toastController } from './overlays-e78a87c2.js';
var setupConfig = function (config) {
    var win = window;
    var Ionic = win.Ionic;
    if (Ionic && Ionic.config && Ionic.config.constructor.name !== 'Object') {
        console.error('ionic config was already initialized');
        return;
    }
    win.Ionic = win.Ionic || {};
    win.Ionic.config = Object.assign(Object.assign({}, win.Ionic.config), config);
    return win.Ionic.config;
};
var getMode = function () {
    var win = window;
    var config = win && win.Ionic && win.Ionic.config;
    if (config) {
        if (config.mode) {
            return config.mode;
        }
        else {
            return config.get('mode');
        }
    }
    return 'md';
};
export { getMode, setupConfig };
