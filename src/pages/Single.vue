<template>
    <div v-for="section in view.sections">
            <ENav
            navType="y-tab"
            :menuList="processMenus(view).yMenus"></ENav>
        <template v-if="isType(section, View)">
            <template v-if="section.navType === 'x-section' || section.navType === 'y-section'">
                <EView v-if="isType(section, View)" :view="view"></EView>
                <EDataView :data="section" v-else-if="isType(section, DataType)"></EDataView>
                <EDataView :questions="section" v-else-if="isType(section, QuestionForm)"></EDataView>
            </template>
            <ENav
            navType="x-tab"
            :menuList="processMenus(view).xMenus"></ENav>
            <RouterView></RouterView>
        </template>
    </div>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { QuestionForm, DataType, View, NavLink, isType } from '../utils/types';
import { viewResolver } from "../../edifiles.config";
import { useRoute } from "vue-router";
import ENav from "../components/ENav.vue";
import EDataView from "../components/EDataView.vue";
import EView from "../components/EView.vue";
import { onMounted } from 'vue';

let view: View = new View({
    id: 'listView',
    layout: 'Grid',
    sections: [],
    navType: 'x-section',
    size: 12
})
let id: string | number
let type: string
let categories: string[]

const checkId = (id: string) => {
    // Regular expression to check for UUID pattern
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (uuidPattern.test(id)) {
        return 'UUID'
    } else {
    // It's a string
    return 'string';
    }
}
const processMenus = (view: View) => {
  const filteredSections = view.sections.filter(section =>
    isType(section, View) &&
    (section.navType === 'x-tab' || section.navType === 'y-tab')
  ) as View[];

  const extractlink = (section: View): NavLink => ({
    path: section.id,
    name: section.id,
    params: {
        type: useRoute().params.type,
        categories: useRoute().params.categories
    }
  });

  const xMenus: NavLink[] = filteredSections
    .filter(section => section.navType === 'x-tab')
    .map(extractlink);

  const yMenus: NavLink[] = filteredSections
    .filter(section => section.navType === 'y-tab')
    .map(extractlink);

  return { xMenus, yMenus };
};

onMounted(async () => {
        type = useRoute().params.type as string
        categories = useRoute().params.categories as string[]
        const lastItem = categories[categories.length - 1]
        if (checkId(lastItem) === 'UUID' || typeof lastItem === 'number') {
            id = lastItem
            await viewResolver.single(type, id, categories[0])
        }
            view = new View({
                id: categories ? categories[categories.length - 1] : type,
                layout: 'Grid',
                sections: [],
                navType: 'x-section',
                size: 12
            })
        //console.log("Single")
    })
</script>