import { Repository } from '@edifiles/services';
import { DataSource } from "./src/utils/types";

const repo = new Repository
const product = repo.readItems('product')
const products: DataSource = {
    name: 'product',
    sections: [],
    navType: 'x-tabbed'
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
        }
    }
}