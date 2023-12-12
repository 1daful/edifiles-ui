function styles (styles: Object) {
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
      
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;

        descriptor.set = function (value: any) {
            originalSet.call(this, value);
            this["style"].styles = styles
        };

        descriptor.get = function () {
            // Call the original getter and return its value
            return originalGet.call(this);
        };
    }
}

function className (classNames: string) {
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
      

        const originalSet = descriptor.set;
        const originalGet = descriptor.get;

        descriptor.set = function (value: any) {
            originalSet.call(this, value);
            this["class"] = classNames
        };

        descriptor.get = function () {
            // Call the original getter and return its value
            return originalGet.call(this);
        };
    }
}

function style (type: string, args: any) {
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;

        descriptor.set = function (value: any) {
            originalSet.call(this, value);
            this[type] = args
        };

        descriptor.get = function () {
            // Call the original getter and return its value
            return originalGet.call(this);
        };
    }
}


