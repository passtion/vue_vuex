/*!
 * Vux v0.1.3 (https://vux.li)
 * Licensed under the MIT license
 */
module.exports = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
}([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(4);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            show: {
                type: Boolean,
                "default": false
            },
            maskTransition: {
                type: String,
                "default": "vux-fade"
            },
            dialogTransition: {
                type: String,
                "default": "vux-dialog"
            },
            hideOnBlur: Boolean,
            scroll: {
                type: Boolean,
                "default": true
            }
        },
        watch: {
            show: function show(val) {
                this.$emit(val ? "on-show" : "on-hide");
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=weui_dialog_alert @touchmove="!this.scroll && $event.preventDefault()"> <div class=weui_mask @click="hideOnBlur && (show = false)" v-show=show :transition=maskTransition></div> <div class=weui_dialog v-show=show :transition=dialogTransition> <slot></slot> </div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(2);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(3);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);