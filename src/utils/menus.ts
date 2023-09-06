import { NavList, VComponent } from "./types";
import Home from "../pages/Home.vue";
import Billing from "../pages/Billing.vue";

const HomeComponent: VComponent = {
    content: Home
}

const BillingComponent: VComponent = {
    content: Billing
}

export const menus: NavList = new NavList({
    id: "",
    content: [
        {
            path: '/',
            name: 'Home',
            //query: {},
            //params: {}
        },
        {
            path: '/billing',
            name: 'Billing',
            //query: {},
            //params: {}
        },
        {
            path: '/tools',
            name: 'Tools',
            //query: {},
            //params: {}
        },
        {
            path: '/signin',
            name: 'Sign In',
            //query: {},
            //params: {}
        }
    ],
    navType: "top"
})