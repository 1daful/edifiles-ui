import { Repository, Recommender, EAuth, Utility } from '@edifiles/services';
import { NavLink, ViewSection } from "./src/utils/types";
import { View } from "./src/utils/types";
import { WidgetName, useWidgets } from "./src/utils/useWidgets";
import { gql, useQuery } from '@urql/vue';
import Search from "../ui/src/components/ESearch.vue";

const postQuery = `
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      title
      content
      author
      createdAt
    }
  }`;

/*const { data, fetching, error } = useQuery({
    query: postQuery,
    variables: { postId: 'your-post-id' },
});*/

const repo = new Repository()
const recom = new Recommender()
const auth = new EAuth()

const search: View = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'x-tab',
    size: 12,
    sections: [{
        content: Search
    }]
})

const GlobalServ = {
    auth
}

const GlobalView: Record<WidgetName, ViewSection[]> = {
    Header: [
        search,
    ],
    Footer: [],
    Main: [],
    SidebarLeft: [],
    SidebarRight: []
}

export const setGlobal = () => {
    Object.keys(GlobalView).forEach((key) => {
        const widgetKey = key as WidgetName;
        useWidgets().get(widgetKey).insert(...GlobalView[widgetKey])
      });
}

function register(viewId: string, ...actions: string[]) {
    
}

export const viewResolver = {
    async list(id: string, foreignTable?: {coll: string, key: string, fKey: string}, filters?: {prop: string, operator: any, value: string}[], range?: {lower: number, upper: number}, limit?: number, category?: string) {
        const latest = await recom.getLatest(id, category)
        const popular = await recom.getPopular(id, category)
        //const recommended = await recom.getRecommended(id, id, prepOptions.category)
        return {
            latest,
            popular,
            data: await repo.readItems(id, foreignTable, filters, range, limit )
        }
    },
    async single(type: string, id: string, category?: string) {
        return {
            data: await repo.readItem(type, 'id', id),
            related: await recom.getRelated(type, id, category)
        }
    }
}

const filters = (...filters: any[]) => {

}

/*const resolver = (type: string) => {
    repo.readItems('',{type, })
    return {
        id: '',
        name: ''
    }
}*/

export const config = {
    template: {
        views: [
        ],
        xlinks: [],
        ylinks: [],
        style: {
            background: {},
            foreground: {},
            visuals: {}, //buttons, headers etc
            cards: {}
        },
        services: {}
    }
}