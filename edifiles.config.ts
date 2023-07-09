import { Repository } from '@edifiles/services';
import { DataSource } from "./src/utils/types";
import { getRecommendations } from "./src/utils/useData";
import { View } from "./src/utils/types";
import { WidgetName, useWidgets } from "./src/utils/useWidgets";
import Search from "../components/ESearch.vue";

const repo = new Repository()
const Header = useWidgets().get('Header')
const search: View = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'x-nav',
    size: 12,
    sections: {
        content: Search
    }
})
useWidgets().widgets

function setGlobal(parent: WidgetName, ...views: any[]) {
    useWidgets().get(parent).insert(views)
}

function register(viewId: string, ...actions: string[]) {
    
}

const header = Header.insert(search)
//const product = repo.readItems('product')
const products: DataSource = await getRecommendations('latest', 'x-nav') || {
    name: '',
    content: [],
    navType: 'x-nav'
}
export const config = {
    template: {
        dataviews: [{
            datasouces: [products],
            views: ['Home']
        }],
        style: {
            background: {},
            foreground: {},
            visuals: {}, //buttons, headers etc
            cards: {}
        },
        services: {}
    }
}