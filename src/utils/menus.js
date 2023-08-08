import { VComponent } from "./types";
import Home from "../pages/Home.vue";
import Billing from "../pages/Billing.vue";
const HomeComponent = new VComponent({
    content: Home
});
const BillingComponent = new VComponent({
    content: Billing
});
export const menus = [{
        path: '/',
        name: 'Home',
        query: {},
        params: {}
    },
    {
        path: '/billing',
        name: 'Billing',
        query: {},
        params: {}
    }];
