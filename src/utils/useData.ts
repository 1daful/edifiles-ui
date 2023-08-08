import { Recommender } from "@edifiles/services";
import { DataType, Recommendation, View } from "./types";
import { config } from "../../edifiles.config";
import mitt from "mitt";
import { defineStore } from "pinia";
import { useWidgets } from "./useWidgets";

const emitter = mitt()
const Main = useWidgets().get('Main')

export const useService = defineStore({
    id: "useData",
    state: () => ({
        services: config.template.services,
    }),
    actions: {
        async exec(name: string, action: string, ...args: any) {
            const service = this.services[name]
            if (service[name] instanceof Function) {
              // Synchronous function
            service[action](args);
            } else if (service[name] instanceof Promise) {
              // Asynchronous function
              await service[action](args);
            } else {
              throw new Error('Invalid function');
            }
            emitter.emit(action, args)
        },
        getService(name: string) {
            return this.services[name]
        },
        register(viewId: string, ...actions: Function[]) {
            
        }
    }
})

const recomm = new Recommender()

/*export const getRecommendations =  async (section: Recommendation, navType: navType, category?: string, userId?: string, itemId?: string) => {
    let res
    let resSection: View = new View ({
        id: "",
        navType: "x-nav",
        layout: "Grid",
        size: 5
    })
    switch (section) {
        case 'latest':
            let res = await recomm.getLatest(category) as unknown as DataType[]
            resSection = {
                name: section,
                content: res,
                navType: navType
            }
            break;
        case 'related':
            if (itemId){
                res = await recomm.getRelated(itemId, category) as unknown as DataType[]
            }
            else {
                return
            }
            resSection = {
                name: section,
                content: res,
                navType: navType
            }
            break;
        case 'popular':
            res = await recomm.getPopular(category) as unknown as DataType[]
            resSection = {
                name: section,
                content: res,
                navType: navType
            }
            break;
        case 'recommended':
            if(userId) {
                res = await recomm.getRecommended(userId, category) as unknown as DataType[]
            }
            else {
                return
            }
            resSection = {
                name: section,
                content: res,
                navType: navType
            }
            break;
        default:
            break;
    }
    return resSection
}

export const getDataSource = (name: string) => {
    let dataS: DataSource = {
        name: '',
        content: [],
        navType: 'x-nav'
    }
    config.template.dataviews.forEach(dataView => {
        dataView.datasouces.forEach(datasource => {
            if (datasource.name = name) {
                return datasource
            }
        })
    })
    return dataS
}

export const addRecommendation = (name: string) => {
    const recomSection: Recommendation[] = ['latest', 'popular', 'related', 'recommended']
    const datasource = getDataSource(name)
    recomSection.forEach(async section => {
        const recom = await getRecommendations(section, datasource.navType) || {
            name: '',
            content: [],
            navType: 'x-nav'
        }
        datasource.content.push(recom)
    });
}*/