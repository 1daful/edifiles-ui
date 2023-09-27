export class InstanceLoader{
    constructor(private context: Object) {}

    getInstance(name: string, ...args: any[]) {
        const instance = Object.create(this.context[name].prototype)
        instance.constructor.apply(instance, args)
        return instance
    }
}