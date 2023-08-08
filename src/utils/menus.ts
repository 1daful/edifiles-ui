import { NavLink, VComponent, View } from "./types";
import Home from "../pages/Home.vue";
import Billing from "../pages/Billing.vue";

const HomeComponent: VComponent = new VComponent({
    content: Home
}
)
const BillingComponent: VComponent = new VComponent({
    content: Billing
}
)

export const menus: NavLink[] = [{
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
}]