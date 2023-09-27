const heade = (originalMethod: any, context: ClassMethodDecoratorContext) => {
    const methodName = String(context.name)

}

const decoFunc = (decoName: any, label?: string) => {
    return (target: any, key: any) => {
        let deco = target.constructor[decoName] || (target.constructor[decoName] = []);
        if(label) {
            deco.push(
                {
                    label: `${label} : ${key}`
                }
            )
        }
        
        else {
            deco.push(
                {
                    label: key
                }
            )
        }
}
}

export function header(label?: string) {
    decoFunc('header', label)
}

export function footer(label?: string) {
    return (target: any, key: any) => {
        let footer = target.constructor.footer || (target.constructor.footer = []);
        if(label) {
            footer.push(
                {
                    label: `${label} : ${key}`
                }
            )
        }
        
        else {
            footer.push(
                {
                    label: key
                }
            )
        }
}
}

export function left(label?: string) {
    return decoFunc('left', label)
}

export function right(label?: string) {
    decoFunc('right', label)
}

export function center(label?: string) {
    return decoFunc('center', label)
}