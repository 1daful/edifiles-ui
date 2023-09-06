import { NavList } from "./types";
import Home from "../pages/Home.vue";
import Billing from "../pages/Billing.vue";
const HomeComponent = {
    content: Home
};
const BillingComponent = {
    content: Billing
};
export const menus = new NavList({
    id: "",
    content: [
        {
            path: '/',
            name: 'Home',
        },
        {
            path: '/billing',
            name: 'Billing',
        },
        {
            path: '/tools',
            name: 'Tools',
        },
        {
            path: '/signin',
            name: 'Sign In',
        }
    ],
    navType: "top"
});
