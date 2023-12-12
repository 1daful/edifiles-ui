import { HorizontalPosition } from "./DataTypes";
import { Action, DataItem } from "./types";

const decoFunc = (position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) => {
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
        let items: DataItem[] = target.constructor.items || (target.constructor.items = []);
        //let items: DataItem[] = this["items"]
        const item: DataItem = {
            content: []
        }
        items.push(item)

        const originalSet = descriptor.set;
        const originalGet = descriptor.get;

        descriptor.set = function (value: any) {
            originalSet.call(this, value);
            if (keyLabel && prop) {
                item.content.push({
                    icon: dataContent?.icon,
                    [prop]: `${keyLabel} : ${value}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            else if(prop) {
                item.content.push({
                    icon: dataContent?.icon,
                    [prop]: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class,
                    position: position
                })
            }

            else if (keyLabel){
                item.content.push({
                    icon: dataContent?.icon,
                    label: `${keyLabel} : ${value}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            else {
                item.content.push({
                    icon: dataContent?.icon,
                    label: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }

            this["items"] = items;
        };
        descriptor.get = function () {
        // Call the original getter and return its value
        return originalGet.call(this);
        };
    }
}

export function content (index: number, prop?: string, keyLabel?: string, dataContent?: {
        icon?: string;
        action?: Action
        horizontal?: boolean
        class?: string
}) {
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
        let items: DataItem[] = target.constructor.items || (target.constructor.items = []);
        //let items: DataItem[] = this["items"]
        const item: DataItem = {
            content: []
        }
        items[index] = item

        const originalSet = descriptor.set;
        const originalGet = descriptor.get;

        descriptor.set = function (value: any) {
            originalSet.call(this, value);
            if(prop) {
                item.content.push({
                    icon: dataContent?.icon,
                    [prop]: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }

            else {
                item.content.push({
                    icon: dataContent?.icon,
                    label: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }

            if (keyLabel && prop) {
                items[index].content.push({
                    icon: dataContent?.icon,
                    [prop]: `${keyLabel} : ${prop}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }

            else {
                items[index].content.push({
                    icon: dataContent?.icon,
                    label: `${keyLabel} : ${prop}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            this["items"] = items;
        };
        descriptor.get = function () {
        // Call the original getter and return its value
        return originalGet.call(this);
        };
    }
}

export function header(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function footer(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function left(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function right(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function center(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}