export class InstanceLoader {
    constructor(context) {
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: context
        });
    }
    getInstance(name, ...args) {
        const instance = Object.create(this.context[name].prototype);
        instance.constructor.apply(instance, args);
        return instance;
    }
}
