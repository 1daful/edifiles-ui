import { IMediaApi } from "../../src (1)/api/IMediaApi"

export class Api {
    resource = {
        request: {
            url: ""
        },

        response(data: Record<string, any>) {
            return {}
        }
    }
}

class gooBoks {
    baseUrl = ''
    data!: Record<string, any>
    volumeRes = new Resource(
        this,
        "",
        {},
        (data: Record<string, any>) => ({
            title: data.title
        })
        //this.resource.response = new Response(fag)
    )
}

class Resource {
    api: IMediaApi
    type: string
    request: Request
    response: Function
    constructor(api: IMediaApi, type: string, request: Request, response: Function) {
        this.api = api;
        this.type = type;
        this.request = request;
        //this.response = new Response(respName);
        this.response = response
        this.api.resources.push(this);
    }
    createResource(props: {}) {
        Object.assign(this, props)
        this.api.resources.push(this);
    }
    async getUrl() {
        //const ApiBaseURL = this.api.BASE_URL + this.request.baseUrl;
        try {
            return this.api.baseUrl + this.request.baseUrl;
        }
        catch (err) {
            console.log(err)
        }
    }

    getBaseParams() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config.api[apiName].config
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }
    private isObject(obj: Record<string, any>){
        return obj instanceof Object && obj.constructor === Object;
    }

    getRequestParam(resData: Record<string, any>) {
        let newParam = '';
        //const param = resData; //Request parameters

        Object.keys(resData).forEach(key => {
            if (this.isObject(resData[key])){
                const keyse = Object.keys(resData[key])
                let i = 0; //index has a base value of 0.
                Object.keys(resData[key]).forEach((key2) => {
                    if (i < 1 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2]
                        }
                        else
                        newParam = newParam + `${keyse[i]}:${resData[key][key2]}`
                    }

                    if (i > 0 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2]
                        }
                        else
                        newParam = newParam + '&' + `${keyse[i]}:${resData[key][key2]}`
                    }
                    i++;
                    resData[key] =  newParam;
                })
                //console.log("params: ", newParam)
            }
            if (!resData[key])
            {
                delete resData[key]
            }
        });
        //NetworkLocal.test("request param: ", resData)
        return resData
    }

}

class Response {
    constructor(props = {}) {
        Object.assign(this, props)
    }
    data = {}
}

class Axios {
    get() {

    }
}

export class Request {
    constructor(name: string, url: string , params: Record<string, any>){
        this.name = name;
        this.baseUrl = url;
        this.params = params;
    }
    name: string;
    baseUrl: string;
    params: Record<string , any>;
    data?: Record<string , any>;
}