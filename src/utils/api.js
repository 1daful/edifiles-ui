var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor() {
        this.resource = {
            request: {
                url: ""
            },
            response(data) {
                return {};
            }
        };
    }
}
class gooBoks {
    constructor() {
        this.baseUrl = '';
        this.volumeRes = new Resource(this, "", {}, (data) => ({
            title: data.title
        }));
    }
}
class Resource {
    constructor(api, type, request, response) {
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
    getUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.api.baseUrl + this.request.baseUrl;
            }
            catch (err) {
                console.log(err);
            }
        });
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
        this.data = {};
        Object.assign(this, props);
    }
}
class Axios {
    get() {
    }
}
export class Request {
    constructor(name, url, params) {
        this.name = name;
        this.baseUrl = url;
        this.params = params;
    }
}
