export class Api {
    constructor() {
        Object.defineProperty(this, "resource", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                request: {
                    url: ""
                },
                response(data) {
                    return {};
                }
            }
        });
    }
}
class gooBoks {
    constructor() {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "volumeRes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Resource(this, "", {}, (data) => ({
                title: data.title
            }))
        });
    }
}
class Resource {
    constructor(api, type, request, response) {
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "request", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.api = api;
        this.type = type;
        this.request = request;
        this.response = response;
        this.api.resources.push(this);
    }
    createResource(props) {
        Object.assign(this, props);
        this.api.resources.push(this);
    }
    async getUrl() {
        try {
            return this.api.baseUrl + this.request.baseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        try {
            const apiBaseParams = config.api[apiName].config;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    isObject(obj) {
        return obj instanceof Object && obj.constructor === Object;
    }
    getRequestParam(resData) {
        let newParam = '';
        Object.keys(resData).forEach(key => {
            if (this.isObject(resData[key])) {
                const keyse = Object.keys(resData[key]);
                let i = 0;
                Object.keys(resData[key]).forEach((key2) => {
                    if (i < 1 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2];
                        }
                        else
                            newParam = newParam + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    if (i > 0 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2];
                        }
                        else
                            newParam = newParam + '&' + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    i++;
                    resData[key] = newParam;
                });
            }
            if (!resData[key]) {
                delete resData[key];
            }
        });
        return resData;
    }
}
class Response {
    constructor(props = {}) {
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.assign(this, props);
    }
}
class Axios {
    get() {
    }
}
export class Request {
    constructor(name, url, params) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name;
        this.baseUrl = url;
        this.params = params;
    }
}
