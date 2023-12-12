const decoFunc = (position, prop, keyLabel, dataContent) => {
    return (target, key, descriptor) => {
        let items = target.constructor.items || (target.constructor.items = []);
        const item = {
            content: []
        };
        items.push(item);
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;
        descriptor.set = function (value) {
            originalSet.call(this, value);
            if (keyLabel && prop) {
                item.content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    [prop]: `${keyLabel} : ${value}`,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            else if (prop) {
                item.content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    [prop]: value,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class,
                    position: position
                });
            }
            else if (keyLabel) {
                item.content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    label: `${keyLabel} : ${value}`,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            else {
                item.content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    label: value,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            this["items"] = items;
        };
        descriptor.get = function () {
            return originalGet.call(this);
        };
    };
};
export function content(index, prop, keyLabel, dataContent) {
    return (target, key, descriptor) => {
        let items = target.constructor.items || (target.constructor.items = []);
        const item = {
            content: []
        };
        items[index] = item;
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;
        descriptor.set = function (value) {
            originalSet.call(this, value);
            if (prop) {
                item.content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    [prop]: value,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            else {
                item.content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    label: value,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            if (keyLabel && prop) {
                items[index].content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    [prop]: `${keyLabel} : ${prop}`,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            else {
                items[index].content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    label: `${keyLabel} : ${prop}`,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            this["items"] = items;
        };
        descriptor.get = function () {
            return originalGet.call(this);
        };
    };
}
export function header(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function footer(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function left(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function right(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function center(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
