import { Repository, Recommender, EAuth } from '@edifiles/services';
import { ViewSection } from "./src/utils/types";
import { View } from "./src/utils/types";
import { WidgetName, useWidgets } from "./src/utils/useWidgets";
import Search from "../ui/src/components/ESearch.vue";

const repo = new Repository()
const recom = new Recommender()
const auth = new EAuth()

const search: ViewSection = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'x-nav',
    size: 12,
    sections: [{
        content: Search
    }]
})


const Global: Record<WidgetName, ViewSection[]> = {
    Header: [
        search,
    ],
    Footer: [],
    Main: [],
    SidebarLeft: [],
    SidebarRight: []
}

const setGlobal = () => {
    Object.keys(Global).forEach((key) => {
        const widgetKey = key as WidgetName;
        useWidgets().get(widgetKey).insert(...Global[widgetKey])
      });
}

function register(viewId: string, ...actions: string[]) {
    
}

const MusicView: View = new View({
    id: 'musicView',
    layout: 'Grid',
    navType: 'x-section',
    size: 12,
    getState() {
      return this.id;
    },
    async prep(prepOptions: Record<string, any>) {
        const latest = await recom.getLatest(this.id, prepOptions.category)
        const popular = await recom.getPopular(this.id, prepOptions.category)
        const user = await auth.getUser()
        let recommended
        if(user) {
            recommended = await recom.getRecommended(this.id, user.id, prepOptions.category)
        }
        return {
            latest,
            popular,
            user,
            recommended
        }
    }
})

export const config = {
    template: {
        views: [
            MusicView
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