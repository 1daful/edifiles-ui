import { useRoute } from 'vue-router';
export function getRoute(name) {
    let url;
    const r = useRoute().matched;
    if (r) {
        r.forEach(route => {
            if (route.name === name && route.children)
                url = route?.children;
        });
    }
    console.log("rouet", url);
    return url;
}
