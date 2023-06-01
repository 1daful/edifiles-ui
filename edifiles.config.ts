import { Repository } from '@edifiles/services';
import { DataSource } from "./src/utils/types";

const repo = new Repository
const product = repo.readItems('product')
export const config = {
    template: {
        dataviews: [{
            datasouces: [product],
            views: ['Home']
        }],
        style: {
            background: {},
            foreground: {},
            visuals: {}, //buttons, headers etc
            cards: {}
        }
    }
}