"use strict";
function styles(styles) {
    return (target, key, descriptor) => {
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;
        descriptor.set = function (value) {
            originalSet.call(this, value);
            this["style"].styles = styles;
        };
        descriptor.get = function () {
            return originalGet.call(this);
        };
    };
}
function className(classNames) {
    return (target, key, descriptor) => {
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;
        descriptor.set = function (value) {
            originalSet.call(this, value);
            this["class"] = classNames;
        };
        descriptor.get = function () {
            return originalGet.call(this);
        };
    };
}
function style(type, args) {
    return (target, key, descriptor) => {
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;
        descriptor.set = function (value) {
            originalSet.call(this, value);
            this[type] = args;
        };
        descriptor.get = function () {
            return originalGet.call(this);
        };
    };
}
