<template>
    <EView :view="view"></EView>
</template>

<script setup lang="ts">
import { ViewSection, View } from '../utils/types';
import { viewResolver } from "../../edifiles.config";
import { useRoute } from "vue-router";
import EView from "../components/EView.vue";
import { onMounted, ref, watch } from 'vue';

/*let view: TabView = new TabView({
    id: 'listView',
    layout: 'Grid',
    sections: [],
    size: 12,
    navType: 'header'
})*/
let view: View
let id = ref('')
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


watch(id, (newValue, oldValue) => {

})

onMounted(async () => {
        type = useRoute().params.type as string
        categories = useRoute().params.categories as string[]
        const lastItem = categories[categories.length - 1]
        let sections: ViewSection[]
        if (checkId(lastItem) === 'UUID' || typeof lastItem === 'number') {
            id.value = lastItem
            sections = await viewResolver.single(type, id.value, categories[0])
            view = new View({
                id: categories ? categories[categories.length - 1] : type,
                layout: 'Grid',
                navType: 'center',
                sections: sections
            })
        }
        //console.log("Single")
    })
</script>