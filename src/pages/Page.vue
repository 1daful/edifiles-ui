<template>
    <div v-for="(view, key) in layout">
        <EView :view="view" :key="view.id"></EView>
    </div>
    <!--RouterView></RouterView>-->
</template>

<script setup lang="ts">
import { View, isType, NavList, PageView } from '../utils/types';
import { GlobalView } from "../../config/edifiles.config";
import { useRoute } from "vue-router";
import EView from "../components/EView.vue";
import { onBeforeMount, ref } from 'vue';

const layout = {
    top: new View({
        id: '',
        layout: 'Grid',
        navType: 'top',
        size: '',
        sections: []
    }),
    left: new View({
        id: '',
        layout: 'Grid',
        navType: 'top',
        size: '',
        sections: []
    }),
    bottom: new View({
        id: '',
        layout: 'Grid',
        navType: 'bottom',
        size: '',
        sections: []
    }),
    center: new View({
        id: '',
        layout: 'Grid',
        navType: 'center',
        size: '',
        sections: []
    }),
    right: new View({
        id: '',
        layout: 'Grid',
        navType: 'top',
        size: '',
        sections: []
    })
}

let view: PageView = new PageView({
    id: 'listView',
    layout: 'Grid',
    sections: [],
})

const view2 = new PageView({
    id: 'listView',
    layout: 'Grid',
    sections: [
    {
          //icon: "schedule",
          img: "../../public/hero_sunset.jpeg",
          overlay: "g",
          meta: {
            title: "The Black Skirt",
            description: "This is about man's fallacy and illusion that leads to infactuation.",
            created: "27-03-34",
            author: "Wonders Ayanfe",
          },
          actions: [
            {
              name: "Create",
              type: "Create",
              label: "Create",
              icon: "whatshot",
              event: "Create",
              onResult: [],
              onError: []
            },
            {
              name: "Read",
              type: "Read",
              label: "Read",
              icon: "bluetooth",
              event: "",
              onResult: [],
              onError: []
            },
          ],
          setHeader: true,
        }
    ],
})

let id: string | number
//let type: string[]
let categories: string[]

/*const processMenus = (view: View) => {
    const filteredSections = view.sections.filter(section =>
    isType(section, View) && section.navType !== 'center') as View[];

    const extractlink = (section: View): NavLink => ({
    path: section.id,
    name: section.id,
    params: {
        type: useRoute().params.type,
        categories: useRoute().params.categories
    },
    query: {}
    });

    const top: NavLink[] = filteredSections
    .filter(section => section.navType === 'top')
    .map(extractlink);

    const left: NavLink[] = filteredSections
    .filter(section => section.navType === 'y-tab')
    .map(extractlink);

    return { top, left };
};*/

const processMenus = () => {
    view.sections.forEach(section => {
        if(isType(section, View) || isType(section, NavList)) {
            layout[section.navType].sections.push(section)
        }
        else {
            layout.center.sections.push(section)
        }
    });
}
onBeforeMount(async () => {
    //type = useRoute().params.type as string
    categories = useRoute().params.categories as string[]
    if(categories) {
        view = GlobalView.mainLayout.children.find((child) => {
            console.log('Categories: ', categories)
            return child.id === categories[categories.length-1]
        })
    }
    else {
        view = GlobalView.mainLayout.children.find((child) => {
            console.log('Home category: ', categories)
            return child.id === 'home'
        })
    }
    console.log('view', view)
    processMenus()
})
</script>