import { Repository, Recommender, EAuth } from '@edifiles/services';
import { View } from "./src/utils/types";
import { useWidgets } from "./src/utils/useWidgets";
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
const repo = new Repository();
const recom = new Recommender();
const auth = new EAuth();
const search = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'x-tab',
    size: 12,
    sections: [{
            content: Search
        }]
});
const GlobalServ = {
    auth
};
const GlobalView = {
    Header: [
        search,
    ],
    Footer: [],
    Main: [],
    SidebarLeft: [],
    SidebarRight: []
};
export const setGlobal = () => {
    Object.keys(GlobalView).forEach((key) => {
        const widgetKey = key;
        useWidgets().get(widgetKey).insert(...GlobalView[widgetKey]);
    });
};
function register(viewId, ...actions) {
}
export const viewResolver = {
    async list(id, foreignTable, filters, range, limit, category) {
        const latest = await recom.getLatest(id, category);
        const popular = await recom.getPopular(id, category);
        return {
            latest,
            popular,
            data: await repo.readItems(id, foreignTable, filters, range, limit)
        };
    },
    async single(type, id, category) {
        return {
            data: await repo.readItem(type, 'id', id),
            related: await recom.getRelated(type, id, category)
        };
    }
};
const filters = (...filters) => {
};
export const config = {
    template: {
        views: [],
        xlinks: [],
        ylinks: [],
        style: {
            background: {},
            foreground: {},
            visuals: {},
            cards: {}
        },
        services: {}
    }
};
