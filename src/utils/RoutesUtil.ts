import { RouteRecordRaw, useRoute } from 'vue-router';

/*export function getRoute(name: string, routes: RouteRecordRaw[]): RouteRecordRaw {
    let el: RouteRecordRaw
    if (routes) {
        routes.forEach(element => {
            if (element.name === name) {
                el = element;
                console.log(element.name, el)
            }
    
            else if(element?.children){
                getRoute(name, element.children)
            }
            });
    }

    console.log(name, el)
    return el
}*/
export function getRoute(name?: string): RouteRecordRaw[] {
    let url
    //const routes = useRoute().matched[0]?.children;
    const r = useRoute().matched
    if(r) {
        r.forEach(route => {
            if(route.name === name && route.children)
            url = route?.children
        });
    }
    /*if (routes) {
    routes.forEach(route => {
        if(route.path === useRoute().path && route.name === name) {
            url = useRoute().matched[1]?.children
        }
        else {
            url = routes
        }
    });
    }*/
    console.log("rouet", url)
        return url
}